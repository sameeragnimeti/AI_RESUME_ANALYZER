import re

SKILL_JOB_MAP = {
    "data scientist": {
        "skills": {"python", "sql", "machine learning", "deep learning", "statistics",
                   "pandas", "numpy", "tensorflow", "pytorch", "data science",
                   "nlp", "computer vision", "scikit-learn", "data analysis", "tableau"},
        "keywords": ["data scientist", "data science", "machine learning", "statistics",
                     "analytics", "prediction", "modeling"]
    },
    "ai engineer": {
        "skills": {"python", "machine learning", "deep learning", "nlp", "computer vision",
                   "tensorflow", "pytorch", "llm", "langchain", "rag", "prompt engineering",
                   "docker", "kubernetes", "aws", "azure", "gcp"},
        "keywords": ["ai engineer", "artificial intelligence", "ai", "llm", "generative ai",
                     "machine learning", "deep learning"]
    },
    "software engineer": {
        "skills": {"python", "java", "javascript", "c++", "c#", "go", "rust",
                   "react", "angular", "vue", "node.js", "express", "django", "flask",
                   "sql", "mongodb", "git", "docker", "aws"},
        "keywords": ["software engineer", "software developer", "full stack", "backend",
                     "frontend", "api", "microservices"]
    },
    "web developer": {
        "skills": {"html", "css", "javascript", "typescript", "react", "angular", "vue",
                   "node.js", "express", "python", "php", "sql", "git", "api", "rest api"},
        "keywords": ["web developer", "web development", "frontend", "backend", "full stack",
                     "responsive", "ui/ux", "website"]
    },
    "data analyst": {
        "skills": {"python", "sql", "excel", "tableau", "power bi", "pandas", "numpy",
                   "data analysis", "statistics", "visualization", "communication"},
        "keywords": ["data analyst", "data analysis", "analytics", "dashboard", "report",
                     "business intelligence", "business analyst"]
    },
    "machine learning engineer": {
        "skills": {"python", "machine learning", "deep learning", "tensorflow", "pytorch",
                   "scikit-learn", "docker", "kubernetes", "mlops", "aws", "azure",
                   "sql", "pandas", "numpy", "api", "flask"},
        "keywords": ["machine learning", "ml engineer", "mlops", "model deployment",
                     "deep learning", "model training", "inference"]
    },
    "devops engineer": {
        "skills": {"docker", "kubernetes", "jenkins", "terraform", "ansible", "aws",
                   "azure", "gcp", "linux", "git", "ci/cd", "python", "bash"},
        "keywords": ["devops", "ci/cd", "infrastructure", "automation", "deployment",
                     "cloud", "sre", "site reliability"]
    },
    "backend developer": {
        "skills": {"python", "java", "go", "rust", "node.js", "express", "django", "flask",
                   "spring boot", "sql", "mongodb", "postgresql", "api", "rest api",
                   "graphql", "docker", "aws"},
        "keywords": ["backend", "api", "server", "database", "microservices", "rest"]
    },
    "frontend developer": {
        "skills": {"html", "css", "javascript", "typescript", "react", "angular", "vue",
                   "git", "api", "responsive design", "ui/ux"},
        "keywords": ["frontend", "ui", "react", "angular", "vue", "web development",
                     "responsive", "css"]
    },
    "full stack developer": {
        "skills": {"html", "css", "javascript", "typescript", "react", "angular", "vue",
                   "node.js", "express", "python", "java", "sql", "mongodb", "git",
                   "docker", "aws", "api"},
        "keywords": ["full stack", "frontend", "backend", "web development", "api",
                     "react", "node.js"]
    },
    "cloud engineer": {
        "skills": {"aws", "azure", "gcp", "docker", "kubernetes", "terraform", "linux",
                   "python", "bash", "jenkins", "ansible", "ci/cd", "networking"},
        "keywords": ["cloud", "aws", "azure", "gcp", "infrastructure", "cloud architect",
                     "cloud engineer"]
    },
    "cybersecurity analyst": {
        "skills": {"python", "linux", "networking", "security", "encryption", "firewall",
                   "penetration testing", "risk assessment", "compliance"},
        "keywords": ["security", "cybersecurity", "analyst", "threat", "vulnerability",
                     "risk", "compliance", "penetration testing"]
    },
    "product manager": {
        "skills": {"project management", "agile", "jira", "leadership", "communication",
                   "problem solving", "analytical", "decision making", "data analysis",
                   "presentation", "teamwork"},
        "keywords": ["product manager", "product management", "product owner", "strategy",
                     "roadmap", "stakeholder", "product development"]
    },
}


def predict_job_role(parsed_data):
    text = parsed_data.get("text", "").lower()
    user_skills = set(s.lower() for s in parsed_data.get("skills", []))

    results = []
    for role, info in SKILL_JOB_MAP.items():
        required_skills = info["skills"]
        matched_skills = user_skills & required_skills
        skill_score = len(matched_skills) / max(len(required_skills), 1)

        keyword_matches = sum(1 for kw in info["keywords"] if kw in text)
        keyword_score = keyword_matches / max(len(info["keywords"]), 1)

        total_score = (skill_score * 0.6) + (keyword_score * 0.4)
        total_score = round(total_score * 100, 1)

        results.append({
            "role": role,
            "score": total_score,
            "matched_skills": list(matched_skills),
            "matched_keywords": keyword_matches,
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    top_3 = results[:3]

    return {
        "primary": top_3[0] if top_3 else {"role": "General / Entry Level", "score": 0, "matched_skills": [], "matched_keywords": 0},
        "alternatives": top_3[1:] if top_3 else [],
        "all_results": results,
    }
