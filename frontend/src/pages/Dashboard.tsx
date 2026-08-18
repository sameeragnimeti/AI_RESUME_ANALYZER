import { useState, useEffect } from 'react'
import { resumeApi, ResumeRecord } from '../api/client'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  PieChart, Pie, LineChart, Line, ResponsiveContainer,
} from 'recharts'

const DIST_COLORS: Record<string, string> = {
  Excellent: '#059669',
  Good: '#2563eb',
  Average: '#d97706',
  Poor: '#dc2626',
}

export default function Dashboard() {
  const { user } = useAuth()
  const [records, setRecords] = useState<ResumeRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    resumeApi
      .list(user?.username || undefined)
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <LoadingSpinner />

  if (records.length === 0) {
    return (
      <div className="page-transition text-center py-16">
        <span className="text-6xl block mb-4">📊</span>
        <h2 className="text-xl font-bold text-slate-600 mb-2">No Data Yet</h2>
        <p className="text-slate-400">Analyze a resume to see dashboard analytics.</p>
      </div>
    )
  }

  const scores = records.map((r) => r.ats_score)
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  const ratings = records.map((r) => r.rating)
  const excellent = ratings.filter((r) => r === 'Excellent').length
  const good = ratings.filter((r) => r === 'Good').length

  const distData = Object.keys(DIST_COLORS).map((name) => ({
    name,
    value: ratings.filter((r) => r === name).length,
  }))

  const trendData = [...records].reverse().map((r, i) => ({
    name: "#" + (i + 1),
    score: r.ats_score,
  }))

  const allSkills: string[] = []
  records.forEach((r) => {
    if (r.skills) {
      r.skills
        .split(',')
        .map((s) => s.trim())
        .forEach((s) => s && allSkills.push(s))
    }
  })
  const skillCounts: Record<string, number> = {}
  allSkills.forEach((s) => {
    skillCounts[s] = (skillCounts[s] || 0) + 1
  })
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, freq]) => ({ skill, freq }))

  return (
    <div className="page-transition">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-white/80 text-sm mt-1">Resume analytics & performance</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          ['Total Resumes', records.length, '#0f172a'],
          ['Average ATS', `${avgScore}%`, '#2563eb'],
          ['Excellent', excellent, '#059669'],
          ['Good', good, '#2563eb'],
        ].map(([label, value, color]) => (
          <div key={String(label)} className="card !p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">{String(label)}</p>
            <p className="text-2xl font-extrabold mt-1" style={{ color: String(color) }}>
              {value as string | number}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="font-bold text-slate-800 mb-4">Resume Quality Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {distData.map((d) => (
                  <Cell key={d.name} fill={DIST_COLORS[d.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-bold text-slate-800 mb-4">Score Trend</h3>
          {trendData.length > 1 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ fill: '#2563eb', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[280px] text-slate-400 text-sm">
              Analyze more resumes to see trends
            </div>
          )}
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="font-bold text-slate-800 mb-4">Resume History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Filename</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Score</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Rating</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Role</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 text-slate-700">{r.filename}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className="font-bold"
                      style={{ color: DIST_COLORS[r.rating] || '#64748b' }}
                    >
                      {r.ats_score}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={
                        r.rating === 'Excellent'
                          ? 'badge-green'
                          : r.rating === 'Good'
                          ? 'badge-blue'
                          : r.rating === 'Average'
                          ? 'badge-yellow'
                          : 'badge-red'
                      }
                    >
                      {r.rating}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{r.predicted_role}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-xs">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {topSkills.length > 0 && (
        <div className="card">
          <h3 className="font-bold text-slate-800 mb-4">Top Skills Across Resumes</h3>
          <ResponsiveContainer width="100%" height={Math.max(200, topSkills.length * 35)}>
            <BarChart data={topSkills} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} width={130} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="freq" radius={[0, 4, 4, 0]}>
                {topSkills.map((_, i) => (
                  <Cell key={i} fill={`hsl(217, ${75 + i * 2}%, ${55 - i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}