SKILL_SPECIFIC_SUGGESTIONS = {
    "python": "List specific Python libraries you have used (Pandas, NumPy, Flask, etc.).",
    "sql": "Mention specific SQL dialects and complex query experience (joins, CTEs, window functions).",
    "machine learning": "Describe specific ML projects with model types, datasets, and performance metrics.",
    "deep learning": "Mention frameworks (TensorFlow, PyTorch) and architectures (CNNs, RNNs, Transformers).",
    "docker": "Include examples of containerizing applications and multi-service setups.",
    "aws": "List specific AWS services used (EC2, S3, Lambda, SageMaker, etc.).",
    "git": "Mention collaboration workflows (branching, pull requests, code review).",
    "react": "Describe component architecture, state management, and hooks you have used.",
    "java": "Mention Java frameworks (Spring, Hibernate) and versions.",
    "javascript": "Specify modern JS features and frameworks (ES6+, TypeScript, Node.js).",
}

MISSING_SKILL_SUGGESTIONS = {
    "python": "Learning Python is highly recommended it is the most in-demand skill across AI/ML roles.",
    "sql": "SQL is essential for data roles. Start with basic queries and progress to complex joins.",
    "machine learning": "Consider taking an ML course (Andrew Ng on Coursera is excellent).",
    "docker": "Docker is increasingly important for deployment. Start with containerizing a simple app.",
    "aws": "AWS skills are highly valued. Start with the AWS Certified Cloud Practitioner.",
    "git": "Version control is expected. Learn Git basics: clone, commit, push, pull, branching.",
    "api": "Learn to build and consume REST APIs. Start with FastAPI or Flask.",
    "cloud": "Cloud skills are in high demand. Choose AWS, Azure, or GCP to start.",
}

SECTION_MAX_SCORES = {
    "Contact Info": 5, "Education": 10, "Experience": 20, "Skills": 25,
    "Certifications": 5, "Summary/Objective": 5, "Projects": 5,
    "Formatting": 10, "Keyword Match": 10, "Length": 5,
}


def generate_suggestions(parsed_data, ats_result, job_prediction):
    suggestions = []
    score = ats_result["score"]

    if score < 50:
        suggestions.append("Your resume needs significant improvement. Focus on adding clear sections and relevant keywords.")
    elif score < 70:
        suggestions.append("Your resume is average. Add more technical skills and quantify your achievements.")
    elif score < 85:
        suggestions.append("Your resume is good. Fine-tune it by adding more industry-specific keywords.")
    else:
        suggestions.append("Your resume is excellent! Keep it updated with your latest work.")

    breakdown = ats_result.get("breakdown", {})
    for section, section_score in breakdown.items():
        max_score = SECTION_MAX_SCORES.get(section, 10)
        if max_score > 0 and section_score / max_score < 0.5:
            suggestions.append(f"Improve your {section.lower()} section — it scored {section_score}/{max_score}.")

    for skill in parsed_data.get("skills", []):
        tip = SKILL_SPECIFIC_SUGGESTIONS.get(skill.lower())
        if tip:
            suggestions.append(tip)

    for skill in ats_result.get("missing_keywords", [])[:5]:
        tip = MISSING_SKILL_SUGGESTIONS.get(skill.lower())
        if tip:
            suggestions.append(tip)
        else:
            suggestions.append(f"Consider adding {skill} to your skill section.")

    primary = job_prediction.get("primary", {})
    if primary and primary.get("score", 0) > 0:
        suggestions.append(f"Tailor your resume for {primary['role'].title()} roles by emphasizing relevant technologies and projects.")

    suggestions.extend(ats_result.get("feedback", []))

    wc = parsed_data.get("word_count", 0)
    if wc < 200 and wc > 0:
        suggestions.append("Your resume is too short. Add more details about your experience and projects.")
    elif wc > 800:
        suggestions.append("Your resume is too long. Try to keep it concise and remove irrelevant details.")

    seen = set()
    unique = []
    for s in suggestions:
        if s not in seen:
            seen.add(s)
            unique.append(s)

    return unique[:12]
