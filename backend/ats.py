import re

SCORING_WEIGHTS = {
    "contact_info": 5,
    "education": 10,
    "experience": 20,
    "skills": 25,
    "certifications": 5,
    "summary": 5,
    "projects": 5,
    "formatting": 10,
    "keywords": 10,
    "length": 5,
}

REQUIRED_KEYWORDS = [
    "python", "sql", "machine learning", "data", "teamwork", "communication",
    "problem solving", "leadership", "analytical", "project management",
    "agile", "git", "api", "cloud", "docker", "linux", "database",
]


def calculate_ats_score(parsed_data):
    text = parsed_data.get("text", "")
    score = 0
    breakdown = {}
    feedback = []
    missing_keywords = []

    if parsed_data.get("contact", {}).get("emails") or parsed_data.get("contact", {}).get("phones"):
        score += SCORING_WEIGHTS["contact_info"]
        breakdown["Contact Info"] = SCORING_WEIGHTS["contact_info"]
    else:
        feedback.append("Add contact information (email, phone).")
        breakdown["Contact Info"] = 0

    if parsed_data.get("education"):
        score += SCORING_WEIGHTS["education"]
        breakdown["Education"] = SCORING_WEIGHTS["education"]
    else:
        feedback.append("Include education details.")
        breakdown["Education"] = 0

    exp = parsed_data.get("experience_years", 0)
    if exp == 0:
        exp_score = 5
        feedback.append("Add work experience details.")
    elif exp <= 1:
        exp_score = 10
    elif exp <= 3:
        exp_score = 15
    else:
        exp_score = 20
    score += exp_score
    breakdown["Experience"] = exp_score

    skills = parsed_data.get("skills", [])
    n_skills = len(skills)
    if n_skills == 0:
        skill_score = 0
        feedback.append("Add technical skills to your resume.")
    elif n_skills <= 5:
        skill_score = 10
        feedback.append("Consider adding more relevant skills.")
    elif n_skills <= 10:
        skill_score = 18
    else:
        skill_score = 25
    score += skill_score
    breakdown["Skills"] = skill_score

    certs = parsed_data.get("certifications", [])
    if certs:
        score += SCORING_WEIGHTS["certifications"]
        breakdown["Certifications"] = SCORING_WEIGHTS["certifications"]
    else:
        feedback.append("Consider adding certifications to boost your profile.")
        breakdown["Certifications"] = 0

    if parsed_data.get("has_summary"):
        score += SCORING_WEIGHTS["summary"]
        breakdown["Summary/Objective"] = SCORING_WEIGHTS["summary"]
    else:
        feedback.append("Include a professional summary or career objective.")
        breakdown["Summary/Objective"] = 0

    if parsed_data.get("has_projects"):
        score += SCORING_WEIGHTS["projects"]
        breakdown["Projects"] = SCORING_WEIGHTS["projects"]
    else:
        feedback.append("Add project experience to showcase your work.")
        breakdown["Projects"] = 0

    text_lower = text.lower()
    found_kw_count = 0
    for kw in REQUIRED_KEYWORDS:
        escaped = re.escape(kw)
        if re.search(r'(?<!\w)' + escaped + r'(?!\w)', text_lower):
            found_kw_count += 1
        else:
            missing_keywords.append(kw)

    kw_score = round((found_kw_count / len(REQUIRED_KEYWORDS)) * SCORING_WEIGHTS["keywords"])
    score += kw_score
    breakdown["Keyword Match"] = kw_score
    if kw_score < 5:
        feedback.append("Improve keyword optimization for ATS. Use more industry-specific terms.")

    wc = parsed_data.get("word_count", 0)
    if 200 <= wc <= 800:
        length_score = SCORING_WEIGHTS["length"]
    elif 150 <= wc <= 1000:
        length_score = 3
    else:
        length_score = 1
        feedback.append("Adjust resume length (aim for 250-600 words).")
    score += length_score
    breakdown["Length"] = length_score

    formatting_score = SCORING_WEIGHTS["formatting"]
    formatting_issues = []
    if not parsed_data.get("has_education_section"):
        formatting_score -= 2
        formatting_issues.append("education section")
    if not parsed_data.get("has_experience_section"):
        formatting_score -= 2
        formatting_issues.append("experience section")
    if not parsed_data.get("has_projects"):
        formatting_score -= 2
    formatting_score = max(formatting_score, 0)
    if formatting_issues:
        feedback.append(f"Add clear sections: {', '.join(formatting_issues)}.")
    score += formatting_score
    breakdown["Formatting"] = formatting_score

    score = min(score, 100)

    return {
        "score": score,
        "rating": get_rating(score),
        "breakdown": breakdown,
        "feedback": feedback,
        "missing_keywords": missing_keywords,
        "skills_found": skills,
    }


def get_rating(score):
    if score >= 90:
        return "Excellent"
    if score >= 75:
        return "Good"
    if score >= 55:
        return "Average"
    return "Poor"


def get_rating_color(rating):
    return {
        "Excellent": "#059669",
        "Good": "#2563eb",
        "Average": "#d97706",
        "Poor": "#dc2626",
    }.get(rating, "#64748b")
