import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { authApi, User } from '../api/client'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (fullname: string, email: string, username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user))
    } else {
      sessionStorage.removeItem('user')
    }
  }, [user])

  const login = useCallback(async (username: string, password: string) => {
    const data = await authApi.login({ username, password })
    setUser(data)
  }, [])

  const register = useCallback(async (fullname: string, email: string, username: string, password: string) => {
    await authApi.register({ fullname, email, username, password })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.clear()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
