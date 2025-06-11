// Service pour gérer les annonces de badminton
import { apiClient as api } from './api'

// Données de démonstration pour les annonces de badminton
const mockAnnouncements = [
  {
    id: 1,
    title: 'Partie de badminton en double',
    description: 'Recherche 2 joueurs pour une partie de double mixte. Niveau intermédiaire souhaité.',
    location: 'Gymnase Municipal, Paris 15e',
    date: '2024-02-15',
    time: '19:00',
    level: 'Intermédiaire',
    type: 'Double',
    gameType: 'Mixte',
    maxPlayers: 4,
    currentPlayers: 2,
    price: 15,
    organizer: {
      id: 1,
      name: 'Marie Dubois',
      level: 'Intermédiaire'
    },
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 2,
    title: 'Tournoi de badminton amateur',
    description: 'Tournoi amical ouvert à tous les niveaux. Inscription gratuite, lots à gagner !',
    location: 'Club de Badminton de Versailles',
    date: '2024-02-20',
    time: '14:00',
    level: 'Débutant',
    type: 'Simple',
    gameType: 'Homme',
    maxPlayers: 16,
    currentPlayers: 8,
    price: 0,
    organizer: {
      id: 2,
      name: 'Jean Martin',
      level: 'Avancé'
    },
    createdAt: '2024-02-08T15:30:00Z',
    updatedAt: '2024-02-08T15:30:00Z'
  },
  {
    id: 3,
    title: 'Séance d&apos;entraînement badminton',
    description: 'Entraînement technique et tactique pour joueurs avancés. Coaching professionnel.',
    location: 'Centre Sportif Léo Lagrange, Lyon',
    date: '2024-02-18',
    time: '18:30',
    level: 'Avancé',
    type: 'Double',
    gameType: 'Femme',
    maxPlayers: 8,
    currentPlayers: 6,
    price: 25,
    organizer: {
      id: 3,
      name: 'Sophie Laurent',
      level: 'Expert'
    },
    createdAt: '2024-02-09T12:00:00Z',
    updatedAt: '2024-02-09T12:00:00Z'
  },
  {
    id: 4,
    title: 'Match de badminton décontracté',
    description: 'Partie amicale pour passer un bon moment. Tous niveaux bienvenus !',
    location: 'Gymnase Saint-Exupéry, Toulouse',
    date: '2024-02-22',
    time: '20:00',
    level: 'Débutant',
    type: 'Simple',
    gameType: 'Mixte',
    maxPlayers: 6,
    currentPlayers: 3,
    price: 10,
    organizer: {
      id: 4,
      name: 'Pierre Durand',
      level: 'Intermédiaire'
    },
    createdAt: '2024-02-11T09:15:00Z',
    updatedAt: '2024-02-11T09:15:00Z'
  }
]

// Simuler un délai d'API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Récupérer toutes les annonces
export const getAllAnnouncements = async () => {
  try {
    // Simuler un appel API
    await delay(500)
    
    // En production, utiliser l'API réelle :
    // const response = await api.get('/announcements')
    // return response.data
    
    return mockAnnouncements
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error)
    throw new Error('Impossible de charger les annonces')
  }
}

// Récupérer une annonce par ID
export const getAnnouncementById = async (id) => {
  try {
    await delay(300)
    
    // En production :
    // const response = await api.get(`/announcements/${id}`)
    // return response.data
    
    const announcement = mockAnnouncements.find(ann => ann.id === parseInt(id))
    if (!announcement) {
      throw new Error('Annonce non trouvée')
    }
    return announcement
  } catch (error) {
    console.error('Erreur lors de la récupération de l&apos;annonce:', error)
    throw error
  }
}

// Créer une nouvelle annonce
export const createAnnouncement = async (announcementData) => {
  try {
    await delay(500)
    
    // En production :
    // const response = await api.post('/announcements', announcementData)
    // return response.data
    
    const newAnnouncement = {
      id: mockAnnouncements.length + 1,
      ...announcementData,
      currentPlayers: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organizer: {
        id: 1, // ID de l'utilisateur connecté
        name: 'Utilisateur', // Nom de l'utilisateur connecté
        level: announcementData.level
      }
    }
    
    mockAnnouncements.push(newAnnouncement)
    return newAnnouncement
  } catch (error) {
    console.error('Erreur lors de la création de l&apos;annonce:', error)
    throw new Error('Impossible de créer l&apos;annonce')
  }
}

// Mettre à jour une annonce
export const updateAnnouncement = async (id, announcementData) => {
  try {
    await delay(500)
    
    // En production :
    // const response = await api.put(`/announcements/${id}`, announcementData)
    // return response.data
    
    const index = mockAnnouncements.findIndex(ann => ann.id === parseInt(id))
    if (index === -1) {
      throw new Error('Annonce non trouvée')
    }
    
    mockAnnouncements[index] = {
      ...mockAnnouncements[index],
      ...announcementData,
      updatedAt: new Date().toISOString()
    }
    
    return mockAnnouncements[index]
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l&apos;annonce:', error)
    throw error
  }
}

// Supprimer une annonce
export const deleteAnnouncement = async (id) => {
  try {
    await delay(300)
    
    // En production :
    // await api.delete(`/announcements/${id}`)
    
    const index = mockAnnouncements.findIndex(ann => ann.id === parseInt(id))
    if (index === -1) {
      throw new Error('Annonce non trouvée')
    }
    
    mockAnnouncements.splice(index, 1)
    return { success: true }
  } catch (error) {
    console.error('Erreur lors de la suppression de l&apos;annonce:', error)
    throw error
  }
}

// Rejoindre une annonce
export const joinAnnouncement = async (id) => {
  try {
    await delay(300)
    
    // En production :
    // const response = await api.post(`/announcements/${id}/join`)
    // return response.data
    
    const announcement = mockAnnouncements.find(ann => ann.id === parseInt(id))
    if (!announcement) {
      throw new Error('Annonce non trouvée')
    }
    
    if (announcement.currentPlayers >= announcement.maxPlayers) {
      throw new Error('Cette annonce est complète')
    }
    
    announcement.currentPlayers += 1
    announcement.updatedAt = new Date().toISOString()
    
    return announcement
  } catch (error) {
    console.error('Erreur lors de l&apos;inscription à l&apos;annonce:', error)
    throw error
  }
}

// Quitter une annonce
export const leaveAnnouncement = async (id) => {
  try {
    await delay(300)
    
    // En production :
    // const response = await api.post(`/announcements/${id}/leave`)
    // return response.data
    
    const announcement = mockAnnouncements.find(ann => ann.id === parseInt(id))
    if (!announcement) {
      throw new Error('Annonce non trouvée')
    }
    
    if (announcement.currentPlayers <= 1) {
      throw new Error('Impossible de quitter cette annonce')
    }
    
    announcement.currentPlayers -= 1
    announcement.updatedAt = new Date().toISOString()
    
    return announcement
  } catch (error) {
    console.error('Erreur lors du désistement de l&apos;annonce:', error)
    throw error
  }
}

// Récupérer les annonces d'un utilisateur
export const getUserAnnouncements = async (userId) => {
  try {
    await delay(400)
    
    // En production :
    // const response = await api.get(`/users/${userId}/announcements`)
    // return response.data
    
    return mockAnnouncements.filter(ann => ann.organizer.id === parseInt(userId))
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces utilisateur:', error)
    throw new Error('Impossible de charger vos annonces')
  }
}

// Rechercher des annonces avec filtres
export const searchAnnouncements = async (filters) => {
  try {
    await delay(400)
    
    // En production :
    // const response = await api.get('/announcements/search', { params: filters })
    // return response.data
    
    let filtered = [...mockAnnouncements]
    
    if (filters.location) {
      filtered = filtered.filter(ann => 
        ann.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    if (filters.level) {
      filtered = filtered.filter(ann => ann.level === filters.level)
    }
    
    if (filters.type) {
      filtered = filtered.filter(ann => ann.type === filters.type)
    }
    
    if (filters.gameType) {
      filtered = filtered.filter(ann => ann.gameType === filters.gameType)
    }
    
    if (filters.date) {
      filtered = filtered.filter(ann => ann.date === filters.date)
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(ann => ann.price <= parseInt(filters.maxPrice))
    }
    
    return filtered
  } catch (error) {
    console.error('Erreur lors de la recherche d&apos;annonces:', error)
    throw new Error('Erreur lors de la recherche')
  }
} 