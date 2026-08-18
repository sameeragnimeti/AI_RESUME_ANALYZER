import re

JOB_DATABASE = {
    "data scientist": {
        "title": "Data Scientist",
        "description": "Analyze complex data sets to identify trends, build predictive models, and provide actionable business insights using statistical methods and machine learning.",
        "required_skills": {"python", "sql", "machine learning", "statistics", "pandas", "numpy", "tensorflow", "data analysis", "tableau", "r"},
        "nice_to_have": {"deep learning", "nlp", "spark", "hadoop", "a/b testing", "data visualization"},
        "salary_range": "$95,000 - $165,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["data+scientist", "machine+learning+scientist", "data+analytics+scientist"],
        "related_roles": ["Machine Learning Engineer", "Data Analyst", "Research Scientist"],
    },
    "ai engineer": {
        "title": "AI Engineer",
        "description": "Design and build AI-powered applications, integrate large language models, develop intelligent systems, and deploy ML pipelines at scale.",
        "required_skills": {"python", "machine learning", "deep learning", "nlp", "tensorflow", "pytorch", "docker", "aws"},
        "nice_to_have": {"llm", "langchain", "rag", "prompt engineering", "kubernetes", "transformers"},
        "salary_range": "$110,000 - $180,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["ai+engineer", "artificial+intelligence+engineer", "ml+engineer"],
        "related_roles": ["Machine Learning Engineer", "Software Engineer", "Data Scientist"],
    },
    "software engineer": {
        "title": "Software Engineer",
        "description": "Design, develop, and maintain software applications. Write clean, scalable code and collaborate with cross-functional teams to deliver robust solutions.",
        "required_skills": {"python", "java", "javascript", "sql", "git", "docker", "aws"},
        "nice_to_have": {"react", "node.js", "kubernetes", "ci/cd", "microservices", "c++"},
        "salary_range": "$85,000 - $155,000",
        "experience_levels": ["entry", "mid", "senior"],
        "search_keywords": ["software+engineer", "software+developer", "sde"],
        "related_roles": ["Full Stack Developer", "Backend Developer", "Frontend Developer"],
    },
    "web developer": {
        "title": "Web Developer",
        "description": "Build and maintain websites and web applications. Work with front-end and back-end technologies to create responsive, user-friendly interfaces.",
        "required_skills": {"html", "css", "javascript", "react", "node.js", "sql", "git"},
        "nice_to_have": {"typescript", "vue", "angular", "php", "rest api", "mongodb"},
        "salary_range": "$70,000 - $130,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["web+developer", "frontend+developer", "full+stack+web+developer"],
        "related_roles": ["Frontend Developer", "Full Stack Developer", "UI/UX Developer"],
    },
    "data analyst": {
        "title": "Data Analyst",
        "description": "Collect, process, and perform statistical analyses of data. Create visualizations and dashboards to help organizations make data-driven decisions.",
        "required_skills": {"python", "sql", "excel", "tableau", "data analysis", "statistics", "communication"},
        "nice_to_have": {"power bi", "pandas", "numpy", "r", "sas", "data visualization"},
        "salary_range": "$60,000 - $110,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["data+analyst", "business+analyst", "analytics+analyst"],
        "related_roles": ["Business Analyst", "Data Scientist", "BI Analyst"],
    },
    "machine learning engineer": {
        "title": "Machine Learning Engineer",
        "description": "Build and deploy machine learning models at scale. Design ML pipelines, optimize model performance, and bridge the gap between research and production.",
        "required_skills": {"python", "machine learning", "deep learning", "tensorflow", "pytorch", "docker", "sql", "aws"},
        "nice_to_have": {"kubernetes", "mlops", "spark", "scikit-learn", "mlflow", "airflow"},
        "salary_range": "$105,000 - $175,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["machine+learning+engineer", "ml+engineer", "mlops+engineer"],
        "related_roles": ["AI Engineer", "Data Scientist", "Software Engineer"],
    },
    "devops engineer": {
        "title": "DevOps Engineer",
        "description": "Manage and improve CI/CD pipelines, automate infrastructure, ensure system reliability, and bridge development and operations teams.",
        "required_skills": {"docker", "kubernetes", "aws", "linux", "git", "python", "ci/cd"},
        "nice_to_have": {"terraform", "ansible", "jenkins", "azure", "gcp", "bash", "monitoring"},
        "salary_range": "$95,000 - $160,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["devops+engineer", "site+reliability+engineer", "sre", "infrastructure+engineer"],
        "related_roles": ["Cloud Engineer", "Systems Engineer", "Platform Engineer"],
    },
    "backend developer": {
        "title": "Backend Developer",
        "description": "Design and build server-side logic, databases, and APIs. Ensure high performance, scalability, and security of backend systems.",
        "required_skills": {"python", "java", "sql", "mongodb", "api", "rest api", "docker"},
        "nice_to_have": {"go", "rust", "node.js", "express", "django", "flask", "graphql", "postgresql"},
        "salary_range": "$85,000 - $150,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["backend+developer", "backend+engineer", "server+side+developer"],
        "related_roles": ["Software Engineer", "Full Stack Developer", "API Developer"],
    },
    "frontend developer": {
        "title": "Frontend Developer",
        "description": "Build user interfaces using modern frameworks. Ensure responsive design, accessibility, and smooth user experiences across devices.",
        "required_skills": {"html", "css", "javascript", "react", "git", "responsive design"},
        "nice_to_have": {"typescript", "angular", "vue", "ui/ux", "tailwind css", "next.js"},
        "salary_range": "$75,000 - $140,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["frontend+developer", "front+end+developer", "ui+developer", "react+developer"],
        "related_roles": ["Web Developer", "Full Stack Developer", "UI/UX Developer"],
    },
    "full stack developer": {
        "title": "Full Stack Developer",
        "description": "Develop both client and server-side software. Handle database management, API development, and responsive front-end design.",
        "required_skills": {"html", "css", "javascript", "react", "node.js", "sql", "mongodb", "git"},
        "nice_to_have": {"typescript", "python", "java", "docker", "aws", "express", "next.js"},
        "salary_range": "$80,000 - $150,000",
        "experience_levels": ["entry", "mid", "senior"],
        "search_keywords": ["full+stack+developer", "full+stack+engineer", "full+stack+web+developer"],
        "related_roles": ["Frontend Developer", "Backend Developer", "Software Engineer"],
    },
    "cloud engineer": {
        "title": "Cloud Engineer",
        "description": "Design, implement, and manage cloud infrastructure. Migrate on-premise systems to the cloud and ensure security, scalability, and cost optimization.",
        "required_skills": {"aws", "docker", "kubernetes", "linux", "python", "terraform"},
        "nice_to_have": {"azure", "gcp", "jenkins", "ansible", "ci/cd", "networking"},
        "salary_range": "$100,000 - $170,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["cloud+engineer", "cloud+architect", "aws+engineer", "cloud+infrastructure+engineer"],
        "related_roles": ["DevOps Engineer", "Solutions Architect", "Systems Engineer"],
    },
    "cybersecurity analyst": {
        "title": "Cybersecurity Analyst",
        "description": "Protect organizations from cyber threats. Monitor networks, investigate security breaches, and implement security measures and protocols.",
        "required_skills": {"python", "linux", "networking", "security", "firewall", "risk assessment"},
        "nice_to_have": {"encryption", "penetration testing", "compliance", "siem", "incident response"},
        "salary_range": "$80,000 - $140,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["cybersecurity+analyst", "information+security+analyst", "security+analyst"],
        "related_roles": ["Security Engineer", "Network Security Engineer", "SOC Analyst"],
    },
    "product manager": {
        "title": "Product Manager",
        "description": "Define product vision, strategy, and roadmap. Work with engineering, design, and business teams to deliver products that solve customer problems.",
        "required_skills": {"project management", "agile", "leadership", "communication", "data analysis", "problem solving"},
        "nice_to_have": {"jira", "sql", "a/b testing", "market research", "ux research", "presentation"},
        "salary_range": "$95,000 - $165,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["product+manager", "technical+product+manager", "digital+product+manager"],
        "related_roles": ["Program Manager", "Scrum Master", "Business Analyst"],
    },
    "mobile developer": {
        "title": "Mobile App Developer",
        "description": "Design and build mobile applications for iOS and Android. Optimize performance, user experience, and ensure cross-platform compatibility.",
        "required_skills": {"javascript", "react", "git", "api"},
        "nice_to_have": {"react native", "flutter", "swift", "kotlin", "dart", "xcode", "android studio"},
        "salary_range": "$80,000 - $145,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["mobile+developer", "android+developer", "ios+developer", "react+native+developer"],
        "related_roles": ["Frontend Developer", "Full Stack Developer", "UI Developer"],
    },
    "database administrator": {
        "title": "Database Administrator (DBA)",
        "description": "Manage and maintain database systems. Ensure data integrity, security, performance optimization, and backup/recovery procedures.",
        "required_skills": {"sql", "python"},
        "nice_to_have": {"postgresql", "mongodb", "mysql", "oracle", "linux", "database design"},
        "salary_range": "$75,000 - $130,000",
        "experience_levels": ["mid", "senior"],
        "search_keywords": ["database+administrator", "dba", "database+engineer", "data+engineer"],
        "related_roles": ["Data Engineer", "Backend Developer", "Data Analyst"],
    },
    "technical writer": {
        "title": "Technical Writer",
        "description": "Create clear documentation for software, APIs, and technical products. Write user guides, tutorials, and internal knowledge base articles.",
        "required_skills": {"communication", "problem solving"},
        "nice_to_have": {"html", "css", "python", "markdown", "git", "api"},
        "salary_range": "$60,000 - $110,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["technical+writer", "technical+documentation+writer", "documentation+specialist"],
        "related_roles": ["Content Developer", "UX Writer", "Knowledge Base Manager"],
    },
    "qa engineer": {
        "title": "QA / Test Engineer",
        "description": "Design and execute test plans, automate testing workflows, and ensure software quality across the development lifecycle.",
        "required_skills": {"python", "git", "problem solving"},
        "nice_to_have": {"selenium", "pytest", "junit", "cypress", "ci/cd", "api testing", "sql"},
        "salary_range": "$70,000 - $130,000",
        "experience_levels": ["entry", "mid"],
        "search_keywords": ["qa+engineer", "quality+assurance+engineer", "test+engineer", "automation+engineer"],
        "related_roles": ["Software Engineer", "DevOps Engineer", "SDET"],
    },
}


def _calculate_match(user_skills, user_text, job_info):
    user_skill_set = set(s.lower() for s in user_skills)
    required = job_info["required_skills"]
    nice = job_info["nice_to_have"]

    required_matched = user_skill_set & required
    nice_matched = user_skill_set & nice
    missing_required = required - user_skill_set

    required_score = len(required_matched) / max(len(required), 1)
    nice_score = len(nice_matched) / max(len(nice), 1)

    keyword_matches = sum(1 for kw in job_info.get("search_keywords", []) if kw.replace("+", " ") in user_text.lower())
    keyword_score = min(keyword_matches / 2, 1.0)

    total = (required_score * 0.55) + (nice_score * 0.25) + (keyword_score * 0.20)
    total = round(min(total * 100, 100), 1)

    return {
        "match_score": total,
        "matched_required": sorted(required_matched),
        "matched_nice": sorted(nice_matched),
        "missing_required": sorted(missing_required),
        "required_match_pct": round(required_score * 100, 1),
    }


def get_job_recommendations(parsed_data, ats_result=None, job_prediction=None, top_n=8):
    user_skills = parsed_data.get("skills", [])
    user_text = parsed_data.get("text", "")
    experience_years = parsed_data.get("experience_years", 0)
    education = parsed_data.get("education", [])
    certifications = parsed_data.get("certifications", [])

    recommendations = []

    for role_key, job_info in JOB_DATABASE.items():
        match = _calculate_match(user_skills, user_text, job_info)

        if match["match_score"] < 10:
            continue

        experience_level = "entry"
        if experience_years >= 5:
            experience_level = "senior"
        elif experience_years >= 2:
            experience_level = "mid"

        portal_links = _build_portal_links(job_info["search_keywords"])

        recommendations.append({
            "role_key": role_key,
            "title": job_info["title"],
            "description": job_info["description"],
            "match_score": match["match_score"],
            "matched_skills": match["matched_required"],
            "matched_nice_skills": match["matched_nice"],
            "missing_skills": match["missing_required"],
            "required_match_pct": match["required_match_pct"],
            "salary_range": job_info["salary_range"],
            "related_roles": job_info["related_roles"],
            "portal_links": portal_links,
            "experience_levels": job_info["experience_levels"],
            "user_experience_match": experience_level in job_info["experience_levels"],
            "has_education": len(education) > 0,
            "has_certs": len(certifications) > 0,
        })

    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    top_recs = recommendations[:top_n]

    career_path = _build_career_path(user_skills, experience_years)

    return {
        "recommendations": top_recs,
        "total_matches": len(recommendations),
        "career_path": career_path,
        "top_role": top_recs[0]["title"] if top_recs else "General / Entry Level",
    }


def _build_portal_links(search_keywords):
    portals = []

    portal_configs = [
        ("LinkedIn", "https://www.linkedin.com/jobs/search/?keywords={kw}"),
        ("Indeed", "https://www.indeed.com/jobs?q={kw}"),
        ("Glassdoor", "https://www.glassdoor.com/Job/jobs.htm?sc.keyword={kw}"),
        ("Naukri", "https://www.naukri.com/{kw}-jobs"),
        ("Hired", "https://hired.com/search?q={kw}"),
        ("AngelList", "https://angel.co/jobs?query={kw}"),
        ("Remote OK", "https://remoteok.com/remote-{kw}-jobs"),
        ("We Work Remotely", "https://weworkremotely.com/remote-jobs/search?term={kw}"),
        ("Dice", "https://www.dice.com/jobs?q={kw}"),
        ("Monster", "https://www.monster.com/jobs/search?q={kw}"),
        ("SimplyHired", "https://www.simplyhired.com/search?q={kw}"),
        ("ZipRecruiter", "https://www.ziprecruiter.com/jobs-search?search={kw}"),
    ]

    primary_kw = search_keywords[0] if search_keywords else ""

    for name, url_template in portals:
        encoded_kw = primary_kw.replace("+", "+")
        final_url = url_template.format(kw=encoded_kw)
        portals_out = {"name": name, "url": final_url}
        portals.append(portals_out)

    return portals


def _build_career_path(user_skills, experience_years):
    user_skill_set = set(s.lower() for s in user_skills)
    path = []

    if experience_years <= 1:
        path.append({
            "level": "Entry Level (0-2 years)",
            "suggestions": [
                "Focus on building foundational skills in your domain",
                "Contribute to open-source projects to build your portfolio",
                "Complete online certifications to validate your skills",
                "Build 2-3 personal projects to showcase on GitHub",
            ],
        })

    if 1 <= experience_years <= 5:
        path.append({
            "level": "Mid Level (2-5 years)",
            "suggestions": [
                "Take ownership of features or modules end-to-end",
                "Mentor junior developers to build leadership skills",
                "Specialize in a high-demand niche area",
                "Contribute to architecture and design decisions",
            ],
        })

    if experience_years > 3:
        path.append({
            "level": "Senior Level (5+ years)",
            "suggestions": [
                "Lead cross-functional projects and technical initiatives",
                "Drive architectural decisions and technology strategy",
                "Build expertise in system design and scalability",
                "Consider transitioning to Staff/Principal Engineer or Engineering Manager",
            ],
        })

    if not path:
        path.append({
            "level": "Getting Started",
            "suggestions": [
                "Upload your resume to get personalized career path recommendations",
                "Build foundational skills through courses and certifications",
            ],
        })

    skill_suggestions = []
    if "python" in user_skill_set or "javascript" in user_skill_set:
        skill_suggestions.append("Consider learning cloud platforms (AWS/Azure/GCP) to expand your profile")
    if "machine learning" in user_skill_set or "deep learning" in user_skill_set:
        skill_suggestions.append("Explore MLOps and model deployment for production readiness")
    if "react" in user_skill_set or "angular" in user_skill_set:
        skill_suggestions.append("Learn backend technologies (Node.js/Python) to become full-stack")
    if not skill_suggestions:
        skill_suggestions.append("Build a strong foundation in programming fundamentals and problem-solving")

    if skill_suggestions:
        path.append({
            "level": "Skill Growth",
            "suggestions": skill_suggestions,
        })

    return path
