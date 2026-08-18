import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FileText, Home, LogIn, BarChart3, FileArchive, Info, LogOut, User, Rocket, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/analyzer', label: 'Analyzer', icon: FileText },
  { path: '/job-recommendations', label: 'Jobs', icon: Rocket },
  { path: '/job-portals', label: 'Portals', icon: Globe },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/reports', label: 'Reports', icon: FileArchive },
  { path: '/about', label: 'About', icon: Info },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Floating pill navbar */}
        <nav className="hidden md:flex items-center justify-between glass-strong rounded-[22px] px-3 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="font-extrabold text-[15px] gradient-text hidden lg:block">
              Resume Analyzer
            </span>
          </Link>

          {/* Nav Items — pill style */}
          <div className="flex items-center gap-0.5 glass-subtle rounded-[18px] px-1.5 py-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[14px] text-[13px] font-medium transition-all duration-300 ${
                    active
                      ? 'bg-white/80 text-[#007AFF] shadow-sm'
                      : 'text-[#8e8e93] hover:text-[#1c1c1e] hover:bg-white/40'
                  }`}
                >
                  <item.icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2 px-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 glass-subtle rounded-[14px] px-3 py-1.5">
                  <User size={14} className="text-[#007AFF]" />
                  <span className="text-[13px] font-medium text-[#3a3a3c] hidden lg:block">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[14px] text-[13px] font-medium text-[#8e8e93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.06)] transition-all duration-300"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-[14px] text-[13px] font-semibold transition-all duration-300 ${
                  location.pathname === '/login'
                    ? 'bg-[#007AFF] text-white shadow-md'
                    : 'bg-white/50 text-[#1c1c1e] hover:bg-white/70 border border-white/50'
                }`}
              >
                <LogIn size={14} />
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile: Floating bottom-style nav */}
        <nav className="md:hidden fixed bottom-4 left-3 right-3 z-50">
          <div className="glass-strong rounded-[22px] px-2 py-2 flex items-center justify-around">
            {navItems.slice(0, 5).map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[14px] transition-all duration-300 ${
                    active
                      ? 'bg-white/70 text-[#007AFF] shadow-sm'
                      : 'text-[#8e8e93]'
                  }`}
                >
                  <item.icon size={18} strokeWidth={active ? 2.2 : 1.6} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between glass-strong rounded-[18px] px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">AI</span>
            </div>
            <span className="font-extrabold text-sm gradient-text">Resume Analyzer</span>
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-white/40 transition-all"
            >
              <LogOut size={16} className="text-[#8e8e93]" />
            </button>
          ) : (
            <Link to="/login" className="p-2 rounded-xl hover:bg-white/40 transition-all">
              <LogIn size={16} className="text-[#007AFF]" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
