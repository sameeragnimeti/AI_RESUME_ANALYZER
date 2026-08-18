import { Code2, Database, Brain, Layout } from 'lucide-react'

const techs = [
  { icon: Code2, name: 'Python', desc: 'Core language & AI logic' },
  { icon: Layout, name: 'React', desc: 'Modern frontend framework' },
  { icon: Brain, name: 'NLP & ML', desc: 'Intelligent analysis engine' },
  { icon: Database, name: 'SQLite', desc: 'Data persistence' },
]

const features = [
  {
    icon: '📄',
    title: 'Resume Parsing',
    desc: 'Extract text from PDFs, identify skills, experience, education, and certifications.',
  },
  {
    icon: '📊',
    title: 'ATS Scoring',
    desc: 'Comprehensive ATS compatibility scoring with breakdown across 10 categories.',
  },
  {
    icon: '🎯',
    title: 'Job Prediction',
    desc: 'AI-powered job role prediction across 13 career paths with match percentage.',
  },
  {
    icon: '💡',
    title: 'Smart Suggestions',
    desc: 'Personalized improvement suggestions based on missing keywords and section analysis.',
  },
  {
    icon: '📈',
    title: 'Dashboard',
    desc: 'Interactive analytics dashboard with charts, trends, and skill frequency analysis.',
  },
  {
    icon: '🔐',
    title: 'User Accounts',
    desc: 'Secure authentication with bcrypt hashing and personal history tracking.',
  },
  {
    icon: '🚀',
    title: 'Job Recommendations',
    desc: 'AI matches your resume to 18+ job roles with skill gap analysis, salary ranges, and career path guidance.',
  },
  {
    icon: '🌐',
    title: 'Job Finding Portals',
    desc: 'Access 50+ curated job platforms across general, tech, remote, freelance, and government categories.',
  },
]

export default function About() {
  return (
    <div className="page-transition">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">About AI Resume Analyzer Pro</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 card">
          <h3 className="font-bold text-slate-800 mb-3">Project Overview</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            AI Resume Analyzer Pro is a production-ready web application that leverages artificial
            intelligence and natural language processing to analyze resumes. It provides job seekers
            with actionable insights to improve their resumes for better ATS (Applicant Tracking
            System) compatibility.
          </p>
        </div>
        <div className="card text-center">
          <h3 className="font-bold text-slate-800 mb-2">Developer</h3>
          <p className="text-lg font-bold text-slate-800">Sameer Agnimeti</p>
          <p className="text-sm text-slate-500">B.Tech CSE (AI & ML)</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Technology Stack</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {techs.map((t) => (
          <div key={t.name} className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-3">
              <t.icon size={24} />
            </div>
            <p className="font-bold text-slate-800">{t.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Features</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {features.map((f) => (
          <div key={f.title} className="card">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
