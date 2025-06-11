import { apiClient } from './api'

// Mode mock pour le développement
const MOCK_MODE = true // Changez à false quand l'API backend sera prête

// Données mock pour les tests
const mockUsers = [
  {
    id: 1,
    name: 'Marie Dubois',
    email: 'marie@example.com',
    level: 'Intermédiaire',
    city: 'Paris',
    phone: '0123456789'
  }
]

// Fonctions mock
const mockAuth = {
  async login(email, password) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === 'test@example.com' && password === 'password') {
      return {
        user: mockUsers[0],
        token: 'mock-jwt-token'
      }
    }
    throw new Error('Email ou mot de passe incorrect')
  },

  async register(userData) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Vérifier si l'email existe déjà
    const existingUser = mockUsers.find(user => user.email === userData.email)
    if (existingUser) {
      throw new Error('Un compte existe déjà avec cet email')
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    }
    mockUsers.push(newUser)
    
    return {
      user: newUser,
      token: 'mock-jwt-token'
    }
  },

  async verifyToken(token) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (token === 'mock-jwt-token') {
      return mockUsers[0]
    }
    throw new Error('Token invalide')
  },

  async updateProfile(profileData) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const updatedUser = { ...mockUsers[0], ...profileData }
    mockUsers[0] = updatedUser
    return updatedUser
  },

  async requestPasswordReset(email) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // En mode mock, on simule toujours un succès
    return { message: 'Email de récupération envoyé' }
  }
}

export const authService = {
  async login(email, password) {
    if (MOCK_MODE) {
      return await mockAuth.login(email, password)
    }
    
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async register(userData) {
    if (MOCK_MODE) {
      return await mockAuth.register(userData)
    }
    
    try {
      const response = await apiClient.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async verifyToken(token) {
    if (MOCK_MODE) {
      return await mockAuth.verifyToken(token)
    }
    
    try {
      const response = await apiClient.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateProfile(profileData) {
    if (MOCK_MODE) {
      return await mockAuth.updateProfile(profileData)
    }
    
    try {
      const response = await apiClient.put('/auth/profile', profileData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async requestPasswordReset(email) {
    if (MOCK_MODE) {
      return await mockAuth.requestPasswordReset(email)
    }
    
    try {
      const response = await apiClient.post('/auth/password-reset', { email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/password-reset/confirm', {
        token,
        password: newPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
} 