import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Analyzer from './pages/Analyzer'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import About from './pages/About'
import JobRecommendations from './pages/JobRecommendations'
import JobPortals from './pages/JobPortals'

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<About />} />
          <Route path="/job-recommendations" element={<JobRecommendations />} />
          <Route path="/job-portals" element={<JobPortals />} />
        </Routes>
      </Layout>
    </div>
  )
}
