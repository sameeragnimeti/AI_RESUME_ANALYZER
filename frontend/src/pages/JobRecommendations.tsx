import { useState } from 'react'
import {
  Loader2, AlertCircle, Briefcase, TrendingUp, ExternalLink,
  CheckCircle2, ChevronDown, ChevronUp, Rocket, Map,
} from 'lucide-react'
import { jobRecommendationApi, JobRecommendation, CareerPathItem } from '../api/client'
import FileUpload from '../components/FileUpload'

function MatchScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? '#059669' : score >= 50 ? '#2563eb' : score >= 30 ? '#d97706' : '#dc2626'
  return (
    <div className="relative flex-shrink-0">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="30" fill="none" stroke="#f1f5f9" strokeWidth="6" />
        <circle
          cx="36" cy="36" r="30" fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${(score / 100) * 188.5} 188.5`}
          strokeLinecap="round" transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold" style={{ color }}>
        {score}
      </span>
    </div>
  )
}

function SkillBadge({ skill, type }: { skill: string; type: 'matched' | 'missing' | 'nice' }) {
  const cls = type === 'matched'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : type === 'missing'
    ? 'bg-red-50 text-red-600 border-red-200'
    : 'bg-blue-50 text-blue-700 border-blue-200'
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-medium border ${cls}`}>
      {skill}
    </span>
  )
}

function PortalLink({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all"
    >
      {name} <ExternalLink size={10} />
    </a>
  )
}

function RecommendationCard({ rec, index }: { rec: JobRecommendation; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="flex items-start gap-4">
        <MatchScoreRing score={rec.match_score} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-slate-800">{rec.title}</h3>
            {rec.user_experience_match && (
              <span className="badge-green text-[10px]">Experience Match</span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{rec.description}</p>

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span className="text-sm font-semibold text-emerald-600">{rec.salary_range}</span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">
              {rec.matched_skills.length} core skills matched
            </span>
            {rec.missing_skills.length > 0 && (
              <>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-red-500">
                  {rec.missing_skills.length} skills to develop
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
      >
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {expanded ? 'Show less' : 'View details & portals'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
          {rec.matched_skills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Matched Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.matched_skills.map((s) => <SkillBadge key={s} skill={s} type="matched" />)}
              </div>
            </div>
          )}

          {rec.matched_nice_skills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Bonus Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.matched_nice_skills.map((s) => <SkillBadge key={s} skill={s} type="nice" />)}
              </div>
            </div>
          )}

          {rec.missing_skills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                Skills to Develop
              </p>
              <div className="flex flex-wrap gap-1.5">
                {rec.missing_skills.map((s) => <SkillBadge key={s} skill={s} type="missing" />)}
              </div>
            </div>
          )}

          {rec.related_roles.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Related Roles</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.related_roles.map((r) => (
                  <span key={r} className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-600 border border-purple-200">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              Search this role on
            </p>
            <div className="flex flex-wrap gap-2">
              {rec.portal_links.map((p) => (
                <PortalLink key={p.name} name={p.name} url={p.url} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CareerPathSection({ path }: { path: CareerPathItem[] }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Map size={20} className="text-purple-600" />
        <h3 className="font-bold text-slate-800">Career Growth Path</h3>
      </div>
      <div className="space-y-4">
        {path.map((item, i) => (
          <div key={i} className="relative pl-6 border-l-2 border-primary-200 last:border-transparent">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500 border-2 border-white" />
            <p className="text-sm font-bold text-slate-700 mb-2">{item.level}</p>
            <ul className="space-y-1.5">
              {item.suggestions.map((s, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function JobRecommendations() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([])
  const [careerPath, setCareerPath] = useState<CareerPathItem[]>([])
  const [topRole, setTopRole] = useState('')
  const [totalMatches, setTotalMatches] = useState(0)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const data = await jobRecommendationApi.getRecommendations(file)
      setRecommendations(data.recommendations)
      setCareerPath(data.career_path)
      setTopRole(data.top_role)
      setTotalMatches(data.total_matches)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to get recommendations')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setRecommendations([])
    setCareerPath([])
    setTopRole('')
    setTotalMatches(0)
    setError('')
  }

  if (recommendations.length === 0) {
    return (
      <div className="page-transition max-w-2xl mx-auto">
        <div className="gradient-banner text-center mb-8">
          <h1 className="text-xl font-bold">Job Recommendations</h1>
          <p className="text-white/80 text-sm mt-1">Upload your resume to discover perfect job matches</p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Rocket size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">How it works</h3>
              <p className="text-xs text-slate-500">
                Our AI analyzes your skills, experience, and education to find the best job matches
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['1', 'Upload', 'Share your resume PDF'],
              ['2', 'Analyze', 'AI matches your profile'],
              ['3', 'Discover', 'Get job recommendations'],
            ].map(([num, title, desc]) => (
              <div key={num} className="text-center p-3 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {num}
                </div>
                <p className="text-sm font-bold text-slate-700">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <FileUpload onFileSelect={setFile} />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Finding your perfect jobs...
            </>
          ) : (
            <>
              <Rocket size={18} /> Get Job Recommendations
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
            <AlertCircle size={16} /> {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page-transition">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">Your Job Matches</h1>
        <p className="text-white/80 text-sm mt-1">
          Found {totalMatches} matching roles | Top match: {topRole}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card !p-4 text-center">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Matches</p>
          <p className="text-2xl font-extrabold text-primary-600">{totalMatches}</p>
        </div>
        <div className="card !p-4 text-center">
          <p className="text-xs text-slate-500 font-medium mb-1">Best Match</p>
          <p className="text-2xl font-extrabold text-emerald-600">
            {recommendations[0]?.match_score || 0}%
          </p>
        </div>
        <div className="card !p-4 text-center">
          <p className="text-xs text-slate-500 font-medium mb-1">Top Role</p>
          <p className="text-lg font-bold text-slate-800 leading-tight">{topRole}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-primary-600" />
          Recommended Jobs
        </h2>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.role_key} rec={rec} index={i} />
          ))}
        </div>
      </div>

      {careerPath.length > 0 && (
        <div className="mb-8">
          <CareerPathSection path={careerPath} />
        </div>
      )}

      <div className="flex justify-center">
        <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
          <TrendingUp size={16} /> Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
