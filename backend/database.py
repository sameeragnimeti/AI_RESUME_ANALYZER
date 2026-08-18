import os
from datetime import datetime, timezone
from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_USER = os.getenv("MONGO_USER", "airesume")
MONGO_PASS = os.getenv("MONGO_PASS", "ai@resume@123")
MONGO_HOST = os.getenv("MONGO_HOST", "cluster0.6soxja6.mongodb.net")
DB_NAME = os.getenv("MONGO_DB_NAME", "ai_resume_analyzer")

MONGO_URI = f"mongodb+srv://{quote_plus(MONGO_USER)}:{quote_plus(MONGO_PASS)}@{MONGO_HOST}/{DB_NAME}?appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

users_col = db["users"]
resumes_col = db["resumes"]
counters_col = db["counters"]


async def init_db():
    await users_col.create_index("username", unique=True)
    await resumes_col.create_index("username")
    await resumes_col.create_index([("date", -1)])
    await resumes_col.create_index("id", unique=True)


async def _next_id(collection_name):
    counter = await counters_col.find_one_and_update(
        {"_id": collection_name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True,
    )
    return counter["seq"]


async def save_resume(username, filename, ats_score, rating, predicted_role, skills, suggestions):
    doc = {
        "id": await _next_id("resumes"),
        "username": username,
        "filename": filename,
        "ats_score": ats_score,
        "rating": rating,
        "predicted_role": predicted_role,
        "skills": skills,
        "suggestions": suggestions,
        "date": datetime.now(timezone.utc),
    }
    await resumes_col.insert_one(doc)


async def get_user_resumes(username, limit=50):
    cursor = resumes_col.find(
        {"username": username},
        {"_id": 0},
    ).sort("date", -1).limit(limit)
    results = []
    async for doc in cursor:
        doc["date"] = doc["date"].isoformat()
        results.append(doc)
    return results


async def get_all_resumes(limit=20):
    cursor = resumes_col.find(
        {},
        {"_id": 0},
    ).sort("date", -1).limit(limit)
    results = []
    async for doc in cursor:
        doc["date"] = doc["date"].isoformat()
        results.append(doc)
    return results


async def get_resume_by_id(rid):
    doc = await resumes_col.find_one({"id": rid}, {"_id": 0})
    if doc:
        doc["date"] = doc["date"].isoformat()
    return doc
