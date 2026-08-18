import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.detail || err.message || 'Something went wrong'
    return Promise.reject(new Error(msg))
  },
)

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  fullname: string
  email: string
  username: string
  password: string
}

export interface User {
  username: string
  fullname: string
  email: string
}

export interface ATSResult {
  score: number
  rating: string
  breakdown: Record<string, number>
  feedback: string[]
  missing_keywords: string[]
  skills_found: string[]
}

export interface JobRole {
  role: string
  score: number
  matched_skills: string[]
  matched_keywords: number
}

export interface JobPrediction {
  primary: JobRole
  alternatives: JobRole[]
  all_results: { role: string; score: number }[]
}

export interface ParsedData {
  skills: string[]
  education: string[]
  experience_years: number
  certifications: string[]
  word_count: number
  has_summary: boolean
  has_projects: boolean
  contact: { emails: string[]; phones: string[] }
  text_preview: string
}

export interface AnalyzeResponse {
  ats: ATSResult
  job_prediction: JobPrediction
  suggestions: string[]
  parsed: ParsedData
}

export interface ResumeRecord {
  id: number
  username: string
  filename: string
  ats_score: number
  rating: string
  predicted_role: string
  skills: string
  suggestions: string
  date: string
}

export interface PortalLink {
  name: string
  url: string
}

export interface JobRecommendation {
  role_key: string
  title: string
  description: string
  match_score: number
  matched_skills: string[]
  matched_nice_skills: string[]
  missing_skills: string[]
  required_match_pct: number
  salary_range: string
  related_roles: string[]
  portal_links: PortalLink[]
  experience_levels: string[]
  user_experience_match: boolean
  has_education: boolean
  has_certs: boolean
}

export interface CareerPathItem {
  level: string
  suggestions: string[]
}

export interface JobRecommendationsResponse {
  recommendations: JobRecommendation[]
  total_matches: number
  career_path: CareerPathItem[]
  top_role: string
}

export interface Portal {
  name: string
  url: string
  description: string
  icon: string
}

export interface PortalCategory {
  label: string
  description: string
  portals: Portal[]
}

export interface JobPortalsResponse {
  [key: string]: PortalCategory
}

export const authApi = {
  login: (data: LoginRequest): Promise<User> =>
    api.post('/auth/login', data).then((r) => r.data),
  register: (data: RegisterRequest): Promise<{ message: string }> =>
    api.post('/auth/register', data).then((r) => r.data),
}

export const analyzeApi = {
  upload: (file: File, username?: string): Promise<AnalyzeResponse> => {
    const form = new FormData()
    form.append('file', file)
    if (username) form.append('username', username)
    return api.post('/analyze', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
}

export const resumeApi = {
  list: (username?: string): Promise<ResumeRecord[]> =>
    api.get('/resumes', { params: { username } }).then((r) => r.data),
  get: (id: number): Promise<ResumeRecord> =>
    api.get(`/reports/${id}`).then((r) => r.data),
  download: (id: number, format: 'txt' | 'pdf' = 'txt'): Promise<void> =>
    api.get(`/reports/${id}/download`, {
      params: { format },
      responseType: 'blob',
    }).then((r) => {
      const url = window.URL.createObjectURL(new Blob([r.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `report_${id}.${format}`
      a.click()
      window.URL.revokeObjectURL(url)
    }),
}

export const jobRecommendationApi = {
  getRecommendations: (file: File, topN: number = 8): Promise<JobRecommendationsResponse> => {
    const form = new FormData()
    form.append('file', file)
    form.append('top_n', String(topN))
    return api.post('/job-recommendations', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
}

export const jobPortalApi = {
  getAll: (): Promise<JobPortalsResponse> =>
    api.get('/job-portals').then((r) => r.data),
  getByCategory: (category: string): Promise<{ category: PortalCategory }> =>
    api.get('/job-portals', { params: { category } }).then((r) => r.data),
  getSearchUrl: (portal: string, query: string): Promise<{ url: string }> =>
    api.get('/job-portals/search-url', { params: { portal, query } }).then((r) => r.data),
  getRoleSearchUrls: (role: string): Promise<Record<string, string>> =>
    api.get('/job-portals/role-search', { params: { role } }).then((r) => r.data),
}