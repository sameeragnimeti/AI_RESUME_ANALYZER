import bcrypt
from backend.database import users_col


async def register(fullname, email, username, password):
    try:
        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        doc = {
            "fullname": fullname.strip(),
            "email": email.strip(),
            "username": username.strip(),
            "password": hashed.decode("utf-8"),
        }
        await users_col.insert_one(doc)
        return True, "Account created successfully!"
    except Exception as e:
        err = str(e).lower()
        if "duplicate" in err or "already exists" in err:
            return False, "Username already exists. Please choose another."
        return False, "Registration failed. Please try again."


async def login(username, password):
    row = await users_col.find_one({"username": username.strip()})
    if row is None:
        return None, "Invalid username or password."
    stored_hash = row["password"]
    if bcrypt.checkpw(password.encode("utf-8"), stored_hash.encode("utf-8")):
        row.pop("password", None)
        row.pop("_id", None)
        return row, None
    return None, "Invalid username or password."
