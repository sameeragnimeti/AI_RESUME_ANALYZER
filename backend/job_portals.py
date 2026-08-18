from urllib.parse import quote_plus

JOB_PORTALS = {
    "general": {
        "label": "General Job Portals",
        "description": "Large job boards with listings across all industries and roles",
        "portals": [
            {
                "name": "LinkedIn Jobs",
                "url": "https://www.linkedin.com/jobs/",
                "description": "World's largest professional network with millions of job listings",
                "icon": "linkedin",
            },
            {
                "name": "Indeed",
                "url": "https://www.indeed.com/",
                "description": "One of the largest job search engines with global reach",
                "icon": "search",
            },
            {
                "name": "Glassdoor",
                "url": "https://www.glassdoor.com/",
                "description": "Job listings with company reviews, salaries, and interview insights",
                "icon": "building",
            },
            {
                "name": "Monster",
                "url": "https://www.monster.com/",
                "description": "Global employment website with resume services and career advice",
                "icon": "briefcase",
            },
            {
                "name": "ZipRecruiter",
                "url": "https://www.ziprecruiter.com/",
                "description": "AI-powered job matching with one-click application",
                "icon": "zap",
            },
            {
                "name": "SimplyHired",
                "url": "https://www.simplyhired.com/",
                "description": "Job search engine aggregating from thousands of sources",
                "icon": "search",
            },
            {
                "name": "CareerBuilder",
                "url": "https://www.careerbuilder.com/",
                "description": "Job search with career advice and resume tools",
                "icon": "target",
            },
            {
                "name": "Snagajob",
                "url": "https://www.snagajob.com/",
                "description": "Hourly and part-time job listings",
                "icon": "clock",
            },
        ],
    },
    "tech": {
        "label": "Tech-Specific Portals",
        "description": "Platforms focused on technology, engineering, and IT roles",
        "portals": [
            {
                "name": "Hired",
                "url": "https://hired.com/",
                "description": "Tech-focused marketplace where companies apply to you",
                "icon": "code",
            },
            {
                "name": "Stack Overflow Jobs",
                "url": "https://stackoverflow.com/jobs",
                "description": "Developer-focused jobs from top tech companies",
                "icon": "code",
            },
            {
                "name": "AngelList",
                "url": "https://angel.co/jobs",
                "description": "Startup jobs with equity and salary transparency",
                "icon": "rocket",
            },
            {
                "name": "Dice",
                "url": "https://www.dice.com/",
                "description": "Tech career hub for IT and engineering professionals",
                "icon": "cpu",
            },
            {
                "name": "GitHub Jobs",
                "url": "https://jobs.github.com/",
                "description": "Jobs for developers, designers, and tech talent",
                "icon": "code",
            },
            {
                "name": "Turing",
                "url": "https://www.turing.com/jobs",
                "description": "Remote software engineering jobs with top US companies",
                "icon": "globe",
            },
            {
                "name": "Toptal",
                "url": "https://www.toptal.com/careers",
                "description": "Exclusive network of freelance software developers and designers",
                "icon": "star",
            },
            {
                "name": "Hired",
                "url": "https://hired.com/",
                "description": "Curated job matching for tech professionals",
                "icon": "award",
            },
        ],
    },
    "remote": {
        "label": "Remote Work Portals",
        "description": "Platforms specializing in remote and work-from-home opportunities",
        "portals": [
            {
                "name": "Remote OK",
                "url": "https://remoteok.com/",
                "description": "Remote jobs in programming, design, marketing, and more",
                "icon": "wifi",
            },
            {
                "name": "We Work Remotely",
                "url": "https://weworkremotely.com/",
                "description": "Remote jobs in programming, design, and business",
                "icon": "home",
            },
            {
                "name": "FlexJobs",
                "url": "https://www.flexjobs.com/",
                "description": "Screened remote, part-time, and freelance jobs",
                "icon": "shield",
            },
            {
                "name": "Remote.co",
                "url": "https://remote.co/",
                "description": "Remote job listings with resources for remote workers",
                "icon": "globe",
            },
            {
                "name": "Remotive",
                "url": "https://remotive.com/",
                "description": "Remote jobs in tech, customer support, and marketing",
                "icon": "wifi",
            },
            {
                "name": "Working Nomads",
                "url": "https://www.workingnomads.com/",
                "description": "Remote job listings curated for digital nomads",
                "icon": "map",
            },
            {
                "name": "Arc",
                "url": "https://arc.dev/",
                "description": "Remote developer jobs with top companies",
                "icon": "code",
            },
            {
                "name": "Himalayas",
                "url": "https://himalayas.app/jobs",
                "description": "Remote jobs with detailed company profiles and salary data",
                "icon": "mountain",
            },
        ],
    },
    "india": {
        "label": "India-Focused Portals",
        "description": "Job platforms popular in the Indian market",
        "portals": [
            {
                "name": "Naukri",
                "url": "https://www.naukri.com/",
                "description": "India's largest job portal with millions of listings",
                "icon": "briefcase",
            },
            {
                "name": "LinkedIn India",
                "url": "https://www.linkedin.com/jobs/",
                "description": "Professional network with strong India presence",
                "icon": "linkedin",
            },
            {
                "name": "Monster India",
                "url": "https://www.monsterindia.com/",
                "description": "Job search with resume services for Indian market",
                "icon": "briefcase",
            },
            {
                "name": "Shine",
                "url": "https://www.shine.com/",
                "description": "Job portal with AI-powered job matching in India",
                "icon": "star",
            },
            {
                "name": "TimesJobs",
                "url": "https://www.timesjobs.com/",
                "description": "Job listings from the Times Group with company insights",
                "icon": "newspaper",
            },
            {
                "name": "Freshersworld",
                "url": "https://www.freshersworld.com/",
                "description": "Jobs and internships for fresh graduates in India",
                "icon": "graduation-cap",
            },
            {
                "name": "Internshala",
                "url": "https://internshala.com/",
                "description": "Internships and entry-level jobs for students and freshers",
                "icon": "book-open",
            },
            {
                "name": "Foundit (formerly Monster)",
                "url": "https://www.foundit.in/",
                "description": "AI-powered job search platform for India",
                "icon": "search",
            },
        ],
    },
    "government": {
        "label": "Government & Public Sector",
        "description": "Government job listings and public sector opportunities",
        "portals": [
            {
                "name": "USAJOBS",
                "url": "https://www.usajobs.gov/",
                "description": "Official US federal government job portal",
                "icon": "landmark",
            },
            {
                "name": "India Gov",
                "url": "https://www.india.gov.in/my-government/jobs",
                "description": "Indian government job listings and notifications",
                "icon": "landmark",
            },
            {
                "name": "Sarkari Result",
                "url": "https://www.sarkariresult.com/",
                "description": "Government exam results and job notifications in India",
                "icon": "file-text",
            },
            {
                "name": "Govt Job Alert",
                "url": "https://www.govtjobalert.com/",
                "description": "Latest government job notifications and updates",
                "icon": "bell",
            },
        ],
    },
    "freelance": {
        "label": "Freelance & Contract Work",
        "description": "Platforms for freelancers and independent contractors",
        "portals": [
            {
                "name": "Upwork",
                "url": "https://www.upwork.com/",
                "description": "World's largest freelancing marketplace",
                "icon": "briefcase",
            },
            {
                "name": "Fiverr",
                "url": "https://www.fiverr.com/",
                "description": "Freelance services marketplace starting at $5",
                "icon": "dollar-sign",
            },
            {
                "name": "Freelancer",
                "url": "https://www.freelancer.com/",
                "description": "Crowdsourcing platform for freelance work",
                "icon": "users",
            },
            {
                "name": "Toptal",
                "url": "https://www.toptal.com/",
                "description": "Top 3% of freelance talent for software and design",
                "icon": "award",
            },
            {
                "name": "Guru",
                "url": "https://www.guru.com/",
                "description": "Freelance jobs across tech, writing, and design",
                "icon": "briefcase",
            },
            {
                "name": "PeoplePerHour",
                "url": "https://www.peopleperhour.com/",
                "description": "Freelance jobs in web development, design, and marketing",
                "icon": "clock",
            },
        ],
    },
    "internships": {
        "label": "Internships & Entry-Level",
        "description": "Platforms for students and recent graduates",
        "portals": [
            {
                "name": "Internshala",
                "url": "https://internshala.com/",
                "description": "India's largest internship platform",
                "icon": "book-open",
            },
            {
                "name": "LinkedIn Internships",
                "url": "https://www.linkedin.com/jobs/search/?keywords=internship",
                "description": "Internship listings on LinkedIn",
                "icon": "linkedin",
            },
            {
                "name": "Indeed Internships",
                "url": "https://www.indeed.com/q-internship-jobs.html",
                "description": "Internship opportunities across industries",
                "icon": "search",
            },
            {
                "name": "WayUp",
                "url": "https://www.wayup.com/",
                "description": "Entry-level jobs and internships for college students",
                "icon": "graduation-cap",
            },
            {
                "name": "Handshake",
                "url": "https://joinhandshake.com/",
                "description": "Career platform for college students",
                "icon": "handshake",
            },
            {
                "name": "Freshersworld",
                "url": "https://www.freshersworld.com/",
                "description": "Jobs for fresh graduates in India",
                "icon": "user-plus",
            },
        ],
    },
    "ai_ml": {
        "label": "AI & Machine Learning",
        "description": "Specialized portals for AI/ML and data science roles",
        "portals": [
            {
                "name": "AI Jobs",
                "url": "https://ai-jobs.net/",
                "description": "AI, ML, and data science job listings",
                "icon": "brain",
            },
            {
                "name": "ML Conf Jobs",
                "url": "https://jobs.mlconf.com/",
                "description": "Machine learning and AI conference job board",
                "icon": "brain",
            },
            {
                "name": "Kaggle Jobs",
                "url": "https://www.kaggle.com/jobs",
                "description": "Data science jobs from the Kaggle community",
                "icon": "bar-chart",
            },
            {
                "name": "DataJobs",
                "url": "https://datajobs.com/",
                "description": "Data science and analytics job board",
                "icon": "database",
            },
        ],
    },
}


def get_all_portals():
    return JOB_PORTALS


def get_portals_by_category(category):
    return JOB_PORTALS.get(category, None)


def get_search_url(portal_name, query):
    encoded = quote_plus(query)
    base_urls = {
        "LinkedIn Jobs": f"https://www.linkedin.com/jobs/search/?keywords={encoded}",
        "Indeed": f"https://www.indeed.com/jobs?q={encoded}",
        "Glassdoor": f"https://www.glassdoor.com/Job/jobs.htm?sc.keyword={encoded}",
        "Naukri": f"https://www.naukri.com/{encoded}-jobs",
        "Monster": f"https://www.monster.com/jobs/search?q={encoded}",
        "Remote OK": f"https://remoteok.com/remote-{encoded}-jobs",
        "We Work Remotely": f"https://weworkremotely.com/remote-jobs/search?term={encoded}",
        "Dice": f"https://www.dice.com/jobs?q={encoded}",
        "SimplyHired": f"https://www.simplyhired.com/search?q={encoded}",
        "ZipRecruiter": f"https://www.ziprecruiter.com/jobs-search?search={encoded}",
        "Hired": f"https://hired.com/search?q={encoded}",
        "AngelList": f"https://angel.co/jobs?query={encoded}",
        "Upwork": f"https://www.upwork.com/search/jobs/?q={encoded}",
        "Fiverr": f"https://www.fiverr.com/search/gigs?query={encoded}",
        "Freelancer": f"https://www.freelancer.com/jobs/?keyword={encoded}",
        "Internshala": f"https://internshala.com/jobs?keyword={encoded}",
        "Freshersworld": f"https://www.freshersworld.com/jobs/search/?keyword={encoded}",
        "Turing": f"https://www.turing.com/jobs?q={encoded}",
        "Toptal": f"https://www.toptal.com/careers?query={encoded}",
        "Arc": f"https://arc.dev/jobs?q={encoded}",
        "FlexJobs": f"https://www.flexjobs.com/search?search={encoded}",
    }
    return base_urls.get(portal_name, f"https://www.google.com/search?q={encoded}+jobs")


def get_role_search_urls(role_title):
    encoded = quote_plus(role_title)
    return {
        "linkedin": f"https://www.linkedin.com/jobs/search/?keywords={encoded}",
        "indeed": f"https://www.indeed.com/jobs?q={encoded}",
        "glassdoor": f"https://www.glassdoor.com/Job/jobs.htm?sc.keyword={encoded}",
        "naukri": f"https://www.naukri.com/{encoded}-jobs",
        "google": f"https://www.google.com/search?q={encoded}+jobs+near+me",
    }
