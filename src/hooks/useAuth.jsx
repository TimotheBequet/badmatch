import { useState, useEffect, createContext, useContext } from 'react'
import { authService } from '../services/auth'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authService.verifyToken(token)
        setUser(userData)
      }
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      const { user: userData, token } = response
      
      localStorage.setItem('token', token)
      setUser(userData)
      
      return userData
    } catch (error) {
      throw new Error(error.message || 'Erreur de connexion')
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      const { user: userResponse, token } = response
      
      localStorage.setItem('token', token)
      setUser(userResponse)
      
      return userResponse
    } catch (error) {
      throw new Error(error.message || 'Erreur d\'inscription')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData)
      setUser(updatedUser)
      return updatedUser
    } catch (error) {
      throw new Error(error.message || 'Erreur de mise à jour du profil')
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 