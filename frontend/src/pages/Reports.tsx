import { useState, useEffect } from 'react'
import { resumeApi, ResumeRecord } from '../api/client'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { FileText, FileArchive, Loader2 } from 'lucide-react'

export default function Reports() {
  const { user } = useAuth()
  const [records, setRecords] = useState<ResumeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<number | null>(null)

  useEffect(() => {
    resumeApi
      .list(user?.username || undefined)
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const handleDownload = async (id: number, format: 'txt' | 'pdf') => {
    setDownloading(id)
    try {
      await resumeApi.download(id, format)
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Download failed')
    } finally {
      setDownloading(null)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="page-transition">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">Reports</h1>
        <p className="text-white/80 text-sm mt-1">View and download your analysis reports</p>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📑</span>
          <h2 className="text-xl font-bold text-slate-600 mb-2">No Reports Yet</h2>
          <p className="text-slate-400">Analyze a resume to generate reports.</p>
        </div>
      ) : (
        <div className="card !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Filename</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-700 font-medium">{r.filename}</td>
                    <td className="py-3 px-4">
                      <span
                        className="font-bold text-lg"
                        style={{
                          color:
                            r.rating === 'Excellent'
                              ? '#059669'
                              : r.rating === 'Good'
                              ? '#2563eb'
                              : r.rating === 'Average'
                              ? '#d97706'
                              : '#dc2626',
                        }}
                      >
                        {r.ats_score}
                      </span>
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-slate-600">{r.predicted_role}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownload(r.id, 'txt')}
                          disabled={downloading === r.id}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-primary-600"
                          title="Download TXT"
                        >
                          {downloading === r.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <FileText size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownload(r.id, 'pdf')}
                          disabled={downloading === r.id}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-primary-600"
                          title="Download PDF"
                        >
                          {downloading === r.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <FileArchive size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}