import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing user on app start
  useEffect(() => {
    const user = authService.getCurrentUser()
    setCurrentUser(user)
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    setCurrentUser(response.user)
    return response
  }

  // Register function
  const register = async (userData) => {
    const response = await authService.register(userData)
    setCurrentUser(response.user)
    return response
  }

  // Logout function
  const logout = () => {
    authService.logout()
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}