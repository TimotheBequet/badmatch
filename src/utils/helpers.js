import { SPORTS, SKILL_LEVELS } from './constants'

/**
 * Formater une date pour l'affichage
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return new Date(date).toLocaleDateString('fr-FR', defaultOptions)
}

/**
 * Formater une date avec l'heure
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Obtenir le temps relatif (il y a X minutes/heures/jours)
 */
export const getRelativeTime = (date) => {
  const now = new Date()
  const target = new Date(date)
  const diffMs = now - target
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) {
    return 'À l\'instant'
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
  } else {
    return formatDate(date)
  }
}

/**
 * Obtenir l'emoji correspondant à un sport
 */
export const getSportEmoji = (sportName) => {
  const sport = SPORTS.find(s => 
    s.name.toLowerCase() === sportName.toLowerCase() ||
    s.id.toLowerCase() === sportName.toLowerCase()
  )
  return sport ? sport.emoji : '🏃‍♂️'
}

/**
 * Obtenir la couleur correspondant à un niveau
 */
export const getLevelColor = (levelName) => {
  const level = SKILL_LEVELS.find(l => 
    l.name.toLowerCase() === levelName.toLowerCase() ||
    l.id.toLowerCase() === levelName.toLowerCase()
  )
  return level ? level.color : 'gray'
}

/**
 * Valider une adresse email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Générer un ID unique
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Debounce une fonction
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle une fonction
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Capitaliser la première lettre d'une chaîne
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Tronquer un texte
 */
export const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Supprimer les accents d'une chaîne
 */
export const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Recherche fuzzy dans un tableau d'objets
 */
export const fuzzySearch = (items, query, searchFields) => {
  if (!query) return items
  
  const normalizedQuery = removeAccents(query.toLowerCase())
  
  return items.filter(item => {
    return searchFields.some(field => {
      const value = getNestedValue(item, field)
      if (!value) return false
      const normalizedValue = removeAccents(value.toString().toLowerCase())
      return normalizedValue.includes(normalizedQuery)
    })
  })
}

/**
 * Obtenir une valeur imbriquée d'un objet
 */
export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Vérifier si un objet est vide
 */
export const isEmpty = (obj) => {
  if (obj == null) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  if (typeof obj === 'string') return obj.trim().length === 0
  return false
}

/**
 * Copier du texte dans le presse-papiers
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback pour les navigateurs plus anciens
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

/**
 * Formater un numéro de téléphone français
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  }
  return phone
}

/**
 * Calculer l'âge à partir d'une date de naissance
 */
export const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * Formater une taille de fichier
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Octets'
  
  const k = 1024
  const sizes = ['Octets', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Vérifier si une URL est valide
 */
export const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Générer une couleur aléatoire
 */
export const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#54B435', '#FF6348', '#B33771', '#3D5C8A', '#6C5CE7'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Obtenir les initiales d'un nom
 */
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Vérifier si l'utilisateur est sur mobile
 */
export const isMobile = () => {
  return window.innerWidth <= 768
}

/**
 * Faire défiler vers un élément
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Retarder l'exécution
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
} 