import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Lock, Mail, UserPlus, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { user, login, register } = useAuth()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [regForm, setRegForm] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  })

  if (user) {
    return (
      <div className="page-transition max-w-md mx-auto mt-12 text-center">
        <div className="card !p-8 liquid-border">
          <div className="w-16 h-16 mx-auto mb-4 rounded-[20px] bg-[rgba(52,199,89,0.1)] flex items-center justify-center">
            <span className="text-3xl">👋</span>
          </div>
          <h1 className="text-xl font-bold text-[#1c1c1e]">Welcome Back!</h1>
          <p className="text-[#8e8e93] mt-1 text-[14px]">
            Logged in as <strong className="text-[#1c1c1e]">{user.username}</strong>
          </p>
          <button
            onClick={() => navigate('/analyzer')}
            className="btn-primary mt-6 w-full"
          >
            Go to Analyzer
          </button>
        </div>
      </div>
    )
  }

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      setError('Fill all fields')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await login(loginForm.username, loginForm.password)
      navigate('/analyzer')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    const f = regForm
    if (!f.fullname || !f.email || !f.username || !f.password) {
      setError('Fill all fields')
      return
    }
    if (f.password !== f.confirm) {
      setError('Passwords do not match')
      return
    }
    if (f.password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await register(f.fullname, f.email, f.username, f.password)
      setSuccess('Account created! You can now login.')
      setTab('login')
      setLoginForm({ username: f.username, password: '' })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-transition max-w-md mx-auto mt-8">
      <div className="gradient-banner text-center mb-8">
        <h1 className="text-xl font-bold">Account</h1>
        <p className="text-white/70 text-sm mt-1">Login or create an account</p>
      </div>

      <div className="card !p-8">
        {/* Tab Switcher — iOS segmented control */}
        <div className="flex glass-subtle rounded-[16px] p-1 mb-6">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess('') }}
            className={`flex-1 py-2.5 rounded-[13px] text-[13px] font-semibold transition-all duration-400 ${
              tab === 'login'
                ? 'bg-white/80 text-[#1c1c1e] shadow-sm'
                : 'text-[#8e8e93] hover:text-[#3a3a3c]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); setSuccess('') }}
            className={`flex-1 py-2.5 rounded-[13px] text-[13px] font-semibold transition-all duration-400 ${
              tab === 'register'
                ? 'bg-white/80 text-[#1c1c1e] shadow-sm'
                : 'text-[#8e8e93] hover:text-[#3a3a3c]'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="text-[13px] p-3.5 rounded-[14px] mb-4 bg-[rgba(255,59,48,0.06)] text-[#d70015] border border-[rgba(255,59,48,0.1)] font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="text-[13px] p-3.5 rounded-[14px] mb-4 bg-[rgba(52,199,89,0.06)] text-[#248a3d] border border-[rgba(52,199,89,0.1)] font-medium">
            {success}
          </div>
        )}

        {tab === 'login' ? (
          <div className="space-y-3.5">
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c7cc]" />
              <input
                className="input-field !pl-11"
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c7cc]" />
              <input
                className="input-field !pl-11 !pr-11"
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c7c7cc] hover:text-[#8e8e93] transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button onClick={handleLogin} disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {[
              { placeholder: 'Full Name', icon: UserPlus, key: 'fullname' as const },
              { placeholder: 'Email', icon: Mail, key: 'email' as const, type: 'email' },
              { placeholder: 'Username', icon: User, key: 'username' as const },
            ].map((f) => (
              <div key={f.key} className="relative">
                <f.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c7cc]" />
                <input
                  className="input-field !pl-11"
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  value={regForm[f.key]}
                  onChange={(e) => setRegForm({ ...regForm, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c7cc]" />
              <input
                className="input-field !pl-11 !pr-11"
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c7c7cc] hover:text-[#8e8e93] transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c7cc]" />
              <input
                className="input-field !pl-11 !pr-11"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={regForm.confirm}
                onChange={(e) => setRegForm({ ...regForm, confirm: e.target.value })}
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c7c7cc] hover:text-[#8e8e93] transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button onClick={handleRegister} disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
