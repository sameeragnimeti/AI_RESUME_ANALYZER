import os
from datetime import datetime, timezone
from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_USER = os.getenv("MONGO_USER", "airesume")
MONGO_PASS = os.getenv("MONGO_PASS", "ai@resume@123")
MONGO_HOST = os.getenv("MONGO_HOST", "cluster0.6soxja6.mongodb.net")
DB_NAME = os.getenv("MONGO_DB_NAME", "ai_resume_analyzer")

MONGO_URI = f"mongodb+srv://{quote_plus(MONGO_USER)}:{quote_plus(MONGO_PASS)}@{MONGO_HOST}/{DB_NAME}?retryWrites=true&w=majority"

client = None
db = None
users_col = None
resumes_col = None
counters_col = None


def _get_db():
    global client, db, users_col, resumes_col, counters_col
    if client is None:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client[DB_NAME]
        users_col = db["users"]
        resumes_col = db["resumes"]
        counters_col = db["counters"]
    return db, users_col, resumes_col, counters_col


async def init_db():
    _, ucol, rcol, _ = _get_db()
    await ucol.create_index("username", unique=True)
    await rcol.create_index("username")
    await rcol.create_index([("date", -1)])
    await rcol.create_index("id", unique=True)


async def _next_id(collection_name):
    _, _, _, ccol = _get_db()
    counter = await ccol.find_one_and_update(
        {"_id": collection_name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True,
    )
    return counter["seq"]


async def save_resume(username, filename, ats_score, rating, predicted_role, skills, suggestions):
    _, _, rcol, _ = _get_db()
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
    await rcol.insert_one(doc)


async def get_user_resumes(username, limit=50):
    _, _, rcol, _ = _get_db()
    cursor = rcol.find(
        {"username": username},
        {"_id": 0},
    ).sort("date", -1).limit(limit)
    results = []
    async for doc in cursor:
        doc["date"] = doc["date"].isoformat()
        results.append(doc)
    return results


async def get_all_resumes(limit=20):
    _, _, rcol, _ = _get_db()
    cursor = rcol.find(
        {},
        {"_id": 0},
    ).sort("date", -1).limit(limit)
    results = []
    async for doc in cursor:
        doc["date"] = doc["date"].isoformat()
        results.append(doc)
    return results


async def get_resume_by_id(rid):
    _, _, rcol, _ = _get_db()
    doc = await rcol.find_one({"id": rid}, {"_id": 0})
    if doc:
        doc["date"] = doc["date"].isoformat()
    return doc
