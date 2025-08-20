import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('groomy_solutions_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('groomy_solutions_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now().toString(), // Simple ID generation
      loginTime: new Date().toISOString()
    }
    setUser(userWithId)
    localStorage.setItem('groomy_solutions_user', JSON.stringify(userWithId))
    return userWithId
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('groomy_solutions_user')
    localStorage.removeItem('groomy_solutions_cart')
    // Keep orders for demo purposes
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('groomy_solutions_user', JSON.stringify(updatedUser))
  }

  const isAuthenticated = !!user

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
