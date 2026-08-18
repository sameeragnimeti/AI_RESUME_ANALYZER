import { Link } from 'react-router-dom'
import { Sparkles, BarChart3, Target, Lightbulb, CheckCircle2, ArrowRight, Rocket, Globe } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'ATS Analysis',
    desc: 'Get a detailed ATS compatibility score with breakdown across 10 categories.',
  },
  {
    icon: Target,
    title: 'Job Prediction',
    desc: 'AI-powered role prediction across 13 career paths with match percentage.',
  },
  {
    icon: Lightbulb,
    title: 'Smart Suggestions',
    desc: 'Personalized recommendations to improve your resume and boost your score.',
  },
  {
    icon: Rocket,
    title: 'Job Recommendations',
    desc: 'AI matches your resume to perfect job roles with skill gap analysis and salary ranges.',
  },
  {
    icon: Globe,
    title: 'Job Portals',
    desc: 'Access 50+ curated job platforms across general, tech, remote, and freelance categories.',
  },
  {
    icon: Sparkles,
    title: 'Career Path',
    desc: 'Get personalized career growth suggestions based on your experience and skills.',
  },
]

const highlights = [
  'ATS Score Calculation',
  'Skill Detection & Analysis',
  'Missing Keyword Identification',
  'Job Role Prediction',
  'Experience & Education Parsing',
  'Personalized AI Suggestions',
  'Interactive Dashboard',
  'Resume History Tracking',
  'Downloadable Reports (PDF/TXT)',
  'Job Recommendations by Resume',
  'Skill Gap Analysis',
  'Career Growth Path',
  '50+ Job Finding Portals',
  'Quick Job Search',
  'Salary Range Estimates',
]

export default function Home() {
  return (
    <div className="page-transition">
      <div className="text-center pt-8 pb-6">
        <Sparkles size={48} className="mx-auto text-primary-500 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text leading-tight">
          AI Resume Analyzer Pro
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Upload your resume and instantly receive an ATS Score, Skill Analysis,
          Missing Keywords, AI Suggestions, and Job Predictions.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link to="/analyzer" className="btn-primary inline-flex items-center gap-2">
            Analyze Your Resume <ArrowRight size={18} />
          </Link>
          <Link to="/job-recommendations" className="btn-primary inline-flex items-center gap-2 !bg-purple-600 hover:!bg-purple-700">
            Get Job Matches <Rocket size={18} />
          </Link>
          <Link to="/job-portals" className="btn-secondary inline-flex items-center gap-2">
            Browse Portals <Globe size={18} />
          </Link>
          <Link to="/about" className="btn-secondary inline-flex items-center gap-2">
            Learn More
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {features.map((f) => (
          <div key={f.title} className="card text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mb-4">
              <f.icon size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {highlights.map((h) => (
            <div key={h} className="card !p-4 flex items-center gap-3 hover:border-primary-200 group">
              <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all">
                <CheckCircle2 size={16} />
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                {h}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 mb-6 text-center">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400">Built with Python, FastAPI, React & AI</p>
      </div>
    </div>
  )
}
