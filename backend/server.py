import io
import json
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel

from backend.database import init_db, save_resume, get_user_resumes, get_all_resumes, get_resume_by_id
from backend.auth import register as auth_register, login as auth_login
from backend.resume_parser import parse_resume
from backend.ats import calculate_ats_score
from backend.predictor import predict_job_role
from backend.suggestions import generate_suggestions
from backend.report_gen import generate_report_text, generate_pdf
from backend.job_recommendations import get_job_recommendations
from backend.job_portals import get_all_portals, get_portals_by_category, get_search_url, get_role_search_urls

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await init_db()


class RegisterRequest(BaseModel):
    fullname: str
    email: str
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


@app.get("/api/health")
def health():
    return {"status": "ok", "version": "1.0.0"}


@app.post("/api/auth/register")
async def register(req: RegisterRequest):
    ok, msg = await auth_register(req.fullname, req.email, req.username, req.password)
    if not ok:
        raise HTTPException(status_code=400, detail=msg)
    return {"message": msg}


@app.post("/api/auth/login")
async def login(req: LoginRequest):
    user, err = await auth_login(req.username, req.password)
    if user is None:
        raise HTTPException(status_code=401, detail=err)
    return {
        "username": user["username"],
        "fullname": user["fullname"],
        "email": user["email"],
    }


@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...), username: str = Form("")):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    file_bytes = await file.read()
    parsed = parse_resume(file_bytes)

    if not parsed["text"]:
        raise HTTPException(status_code=400, detail="Could not extract text from this PDF")

    ats_result = calculate_ats_score(parsed)
    job_prediction = predict_job_role(parsed)
    suggestions = generate_suggestions(parsed, ats_result, job_prediction)

    if username:
        try:
            await save_resume(
                username=username,
                filename=file.filename,
                ats_score=ats_result["score"],
                rating=ats_result["rating"],
                predicted_role=job_prediction["primary"]["role"],
                skills=", ".join(parsed["skills"][:20]),
                suggestions="; ".join(suggestions[:5]),
            )
        except Exception:
            pass

    return {
        "ats": ats_result,
        "job_prediction": job_prediction,
        "suggestions": suggestions,
        "parsed": {
            "skills": parsed["skills"],
            "education": parsed["education"],
            "experience_years": parsed["experience_years"],
            "certifications": parsed["certifications"],
            "word_count": parsed["word_count"],
            "has_summary": parsed["has_summary"],
            "has_projects": parsed["has_projects"],
            "contact": parsed["contact"],
            "text_preview": parsed["text"][:500],
        },
    }


@app.get("/api/resumes")
async def resumes(username: str = ""):
    if username:
        rows = await get_user_resumes(username)
    else:
        rows = await get_all_resumes()
    return rows


@app.get("/api/reports/{report_id}")
async def report_detail(report_id: int):
    report = await get_resume_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@app.get("/api/reports/{report_id}/download")
async def download_report(report_id: int, format: str = "txt"):
    report = await get_resume_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    parsed = {
        "skills": [s.strip() for s in (report["skills"] or "").split(",") if s.strip()],
        "text": "",
        "contact": {"emails": [], "phones": []},
        "education": [],
        "experience_years": 0,
        "certifications": [],
        "word_count": 0,
        "has_summary": False,
        "has_projects": False,
        "has_education_section": False,
        "has_experience_section": False,
    }
    ats = {"score": report["ats_score"], "rating": report["rating"],
           "breakdown": {}, "feedback": [], "missing_keywords": []}
    pred = {"primary": {"role": report["predicted_role"], "score": 0, "matched_skills": [], "matched_keywords": 0}, "alternatives": []}
    sugs = [s.strip() for s in (report["suggestions"] or "").split(";") if s.strip()]

    if format == "pdf":
        pdf_data = generate_pdf(parsed, ats, pred, sugs)
        if pdf_data is None:
            raise HTTPException(status_code=500, detail="PDF generation not available")
        return Response(content=pdf_data, media_type="application/pdf",
                        headers={"Content-Disposition": f"attachment; filename=report_{report_id}.pdf"})
    else:
        text_data = generate_report_text(parsed, ats, pred, sugs)
        return Response(content=text_data, media_type="text/plain",
                        headers={"Content-Disposition": f"attachment; filename=report_{report_id}.txt"})


@app.post("/api/job-recommendations")
async def job_recommendations(file: UploadFile = File(...), top_n: int = Form(8)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    file_bytes = await file.read()
    parsed = parse_resume(file_bytes)

    if not parsed["text"]:
        raise HTTPException(status_code=400, detail="Could not extract text from this PDF")

    ats_result = calculate_ats_score(parsed)
    job_prediction = predict_job_role(parsed)

    recommendations = get_job_recommendations(parsed, ats_result, job_prediction, top_n=top_n)

    return {
        "recommendations": recommendations["recommendations"],
        "total_matches": recommendations["total_matches"],
        "career_path": recommendations["career_path"],
        "top_role": recommendations["top_role"],
    }


@app.get("/api/job-portals")
async def job_portals(category: str = ""):
    if category:
        portals = get_portals_by_category(category)
        if portals is None:
            raise HTTPException(status_code=404, detail=f"Category '{category}' not found")
        return {"category": portals}
    return get_all_portals()


@app.get("/api/job-portals/search-url")
async def job_portal_search_url(portal: str, query: str):
    url = get_search_url(portal, query)
    return {"portal": portal, "query": query, "url": url}


@app.get("/api/job-portals/role-search")
async def role_search_urls(role: str):
    return get_role_search_urls(role)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
