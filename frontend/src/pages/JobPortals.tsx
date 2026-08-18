import { useState, useEffect } from 'react'
import {
  Search, ExternalLink, Globe, Briefcase, Code2, Wifi, MapPin,
  Building2, GraduationCap, Brain, DollarSign, Loader2,
} from 'lucide-react'
import { jobPortalApi, PortalCategory } from '../api/client'

const CATEGORY_ICONS: Record<string, typeof Globe> = {
  general: Briefcase,
  tech: Code2,
  remote: Wifi,
  india: MapPin,
  government: Building2,
  freelance: DollarSign,
  internships: GraduationCap,
  ai_ml: Brain,
}

const CATEGORY_COLORS: Record<string, string> = {
  general: 'from-blue-500 to-blue-600',
  tech: 'from-violet-500 to-purple-600',
  remote: 'from-emerald-500 to-green-600',
  india: 'from-orange-500 to-red-600',
  government: 'from-slate-500 to-slate-600',
  freelance: 'from-amber-500 to-orange-600',
  internships: 'from-pink-500 to-rose-600',
  ai_ml: 'from-indigo-500 to-blue-600',
}

const CATEGORY_BG: Record<string, string> = {
  general: 'bg-blue-50 text-blue-600 border-blue-200',
  tech: 'bg-violet-50 text-violet-600 border-violet-200',
  remote: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  india: 'bg-orange-50 text-orange-600 border-orange-200',
  government: 'bg-slate-50 text-slate-600 border-slate-200',
  freelance: 'bg-amber-50 text-amber-600 border-amber-200',
  internships: 'bg-pink-50 text-pink-600 border-pink-200',
  ai_ml: 'bg-indigo-50 text-indigo-600 border-indigo-200',
}

export default function JobPortals() {
  const [portals, setPortals] = useState<Record<string, PortalCategory>>({})
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{ portal: string; url: string }>>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    jobPortalApi.getAll().then(setPortals).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const categories = Object.entries(portals)

  const filteredCategories = activeCategory === 'all'
    ? categories
    : categories.filter(([key]) => key === activeCategory)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const results = await Promise.all(
        ['LinkedIn Jobs', 'Indeed', 'Glassdoor', 'Naukri', 'Google'].map(async (portal) => {
          try {
            if (portal === 'Google') {
              return { portal, url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' jobs near me')}` }
            }
            const data = await jobPortalApi.getSearchUrl(portal, searchQuery)
            return { portal, url: data.url }
          } catch {
            return { portal, url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' ' + portal + ' jobs')}` }
          }
        })
      )
      setSearchResults(results)
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  if (loading) {
    return (
      <div className="page-transition max-w-2xl mx-auto">
        <div className="gradient-banner text-center mb-8">
          <h1 className="text-xl font-bold">Job Finding Portals</h1>
          <p className="text-white/80 text-sm mt-1">Discover the best job platforms for your career</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">Job Finding Portals</h1>
        <p className="text-white/80 text-sm mt-1">
          {categories.reduce((acc, [, cat]) => acc + cat.portals.length, 0)}+ curated job platforms
        </p>
      </div>

      <div className="card mb-8">
        <h3 className="font-bold text-slate-800 mb-3">Quick Job Search</h3>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a job role (e.g., Data Scientist, React Developer)..."
              className="input-field !pl-10"
            />
          </div>
          <button onClick={handleSearch} disabled={searching || !searchQuery.trim()} className="btn-primary flex items-center gap-2">
            {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-slate-500">
              Results for "{searchQuery}" - click to search on each portal:
            </p>
            <div className="flex flex-wrap gap-2">
              {searchResults.map((r) => (
                <a
                  key={r.portal}
                  href={r.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 transition-all shadow-sm"
                >
                  {r.portal} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Portals
        </button>
        {categories.map(([key, cat]) => {
          const Icon = CATEGORY_ICONS[key] || Globe
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-8">
        {filteredCategories.map(([key, cat]) => {
          const Icon = CATEGORY_ICONS[key] || Globe
          return (
            <div key={key} className="animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[key] || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white shadow-lg`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{cat.label}</h2>
                  <p className="text-sm text-slate-500">{cat.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.portals.map((portal) => (
                  <a
                    key={portal.name}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group hover:border-primary-300 !p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${CATEGORY_BG[key] || 'bg-slate-50 text-slate-600 border-slate-200'} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon size={18} />
                      </div>
                      <ExternalLink size={14} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                      {portal.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {portal.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 card text-center">
        <h3 className="font-bold text-slate-800 mb-2">Need personalized job recommendations?</h3>
        <p className="text-sm text-slate-500 mb-4">
          Upload your resume and let our AI find the perfect job matches for your skills
        </p>
        <a href="/job-recommendations" className="btn-primary inline-flex items-center gap-2">
          Get AI Job Recommendations <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
