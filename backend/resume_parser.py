import re
from io import BytesIO

try:
    import pdfplumber
    HAS_PDFPLUMBER = True
except ImportError:
    HAS_PDFPLUMBER = False

try:
    import PyPDF2
    HAS_PYPDF2 = True
except ImportError:
    HAS_PYPDF2 = False

SKILLS_DB = sorted({
    "python", "java", "javascript", "typescript", "c++", "c#", "go", "rust",
    "swift", "kotlin", "ruby", "php", "html", "css", "sql", "nosql", "mongodb",
    "postgresql", "mysql", "sqlite", "redis", "aws", "azure", "gcp", "docker",
    "kubernetes", "git", "linux", "tensorflow", "pytorch", "scikit-learn", "pandas",
    "numpy", "matplotlib", "seaborn", "flask", "django", "fastapi", "spring boot",
    "react", "angular", "vue", "node.js", "express", "machine learning", "deep learning",
    "nlp", "computer vision", "data science", "data analysis", "statistics",
    "tableau", "power bi", "excel", "agile", "jira", "jenkins", "terraform",
    "ansible", "prompt engineering", "llm", "rag", "langchain", "opencv",
    "api", "rest api", "graphql", "oop", "data structures", "algorithms",
    "communication", "teamwork", "leadership", "problem solving", "critical thinking",
    "time management", "project management", "attention to detail", "adaptability",
    "creativity", "collaboration", "decision making", "analytical skills",
    "research", "writing", "presentation", "public speaking", "mentoring",
}, key=lambda x: -len(x))

def extract_text_from_pdf(file_bytes):
    text = ""
    if HAS_PDFPLUMBER:
        try:
            with pdfplumber.open(BytesIO(file_bytes)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception:
            pass

    if not text.strip() and HAS_PYPDF2:
        try:
            reader = PyPDF2.PdfReader(BytesIO(file_bytes))
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        except Exception:
            pass

    return text.strip()

def extract_contact_info(text):
    emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    phones = re.findall(r"(\+?\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}", text)
    return {"emails": emails, "phones": phones}

def extract_skills(text):
    text_lower = text.lower()
    found = set()
    for skill in SKILLS_DB:
        escaped = re.escape(skill)
        if re.search(r'(?<!\w)' + escaped + r'(?!\w)', text_lower):
            found.add(skill)
    return sorted(found)

def extract_education(text):
    keywords = [
        "b.tech", "b.e", "b.sc", "b.a", "b.com", "b.b.a", "b.c.a",
        "m.tech", "m.e", "m.sc", "m.a", "m.com", "m.b.a", "m.c.a",
        "phd", "ph.d", "doctorate", "bachelor", "master", "graduate",
        "post graduate", "diploma", "high school", "12th", "10th"
    ]
    text_lower = text.lower()
    found = set()
    for kw in keywords:
        if kw in text_lower:
            found.add(kw)
    return sorted(found)

def extract_experience(text):
    matches = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)', text.lower())
    if matches:
        return max(int(m) for m in matches)
    return 0

def extract_certifications(text):
    cert_keywords = [
        "certified", "certification", "certificate", "aws certified",
        "google", "microsoft certified", "oracle", "cisco", "comptia",
        "pmp", "scrum", "six sigma", "ibm", "red hat"
    ]
    text_lower = text.lower()
    found = set()
    for kw in cert_keywords:
        if kw in text_lower:
            found.add(kw)
    return sorted(found)

def parse_resume(file_bytes):
    text = extract_text_from_pdf(file_bytes)
    return {
        "text": text,
        "contact": extract_contact_info(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience_years": extract_experience(text),
        "certifications": extract_certifications(text),
        "word_count": len(text.split()) if text else 0,
        "has_summary": any(w in text.lower() for w in ["summary", "profile", "objective", "about me"]),
        "has_projects": "project" in text.lower(),
        "has_education_section": "education" in text.lower(),
        "has_experience_section": "experience" in text.lower() or "work history" in text.lower(),
    }
