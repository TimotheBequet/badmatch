// Configuration de l'application
export const APP_CONFIG = {
  name: 'BadMatch',
  version: '1.0.0',
  description: 'Plateforme pour trouver des partenaires de sport',
  author: 'BadMatch Team'
}

// URLs et endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verify: '/auth/verify',
    profile: '/auth/profile',
    passwordReset: '/auth/password-reset',
    passwordResetConfirm: '/auth/password-reset/confirm'
  },
  announcements: {
    list: '/announcements',
    create: '/announcements',
    update: (id) => `/announcements/${id}`,
    delete: (id) => `/announcements/${id}`,
    details: (id) => `/announcements/${id}`,
    join: (id) => `/announcements/${id}/join`,
    leave: (id) => `/announcements/${id}/leave`
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
    stats: '/users/stats'
  }
}

// Types de sports disponibles
export const SPORTS = [
  {
    id: 'tennis',
    name: 'Tennis',
    emoji: '🎾',
    category: 'Raquette'
  },
  {
    id: 'football',
    name: 'Football',
    emoji: '⚽',
    category: 'Collectif'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    emoji: '🏀',
    category: 'Collectif'
  },
  {
    id: 'running',
    name: 'Running',
    emoji: '🏃‍♂️',
    category: 'Course'
  },
  {
    id: 'musculation',
    name: 'Musculation',
    emoji: '💪',
    category: 'Fitness'
  },
  {
    id: 'natation',
    name: 'Natation',
    emoji: '🏊‍♂️',
    category: 'Aquatique'
  },
  {
    id: 'cyclisme',
    name: 'Cyclisme',
    emoji: '🚴‍♂️',
    category: 'Cyclisme'
  },
  {
    id: 'badminton',
    name: 'Badminton',
    emoji: '🏸',
    category: 'Raquette'
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    emoji: '🏐',
    category: 'Collectif'
  },
  {
    id: 'ping-pong',
    name: 'Ping-pong',
    emoji: '🏓',
    category: 'Raquette'
  }
]

// Niveaux de compétence
export const SKILL_LEVELS = [
  {
    id: 'debutant',
    name: 'Débutant',
    description: 'Je commence tout juste',
    color: 'green'
  },
  {
    id: 'intermediaire',
    name: 'Intermédiaire',
    description: 'J\'ai quelques bases',
    color: 'orange'
  },
  {
    id: 'avance',
    name: 'Avancé',
    description: 'Je maîtrise bien',
    color: 'red'
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Niveau compétition',
    color: 'purple'
  }
]

// Genres disponibles
export const GENDERS = [
  { id: 'homme', name: 'Homme' },
  { id: 'femme', name: 'Femme' },
  { id: 'autre', name: 'Autre' },
  { id: 'non-specifie', name: 'Non spécifié' }
]

// Jours de la semaine
export const DAYS_OF_WEEK = [
  { id: 'lundi', name: 'Lundi', short: 'Lun' },
  { id: 'mardi', name: 'Mardi', short: 'Mar' },
  { id: 'mercredi', name: 'Mercredi', short: 'Mer' },
  { id: 'jeudi', name: 'Jeudi', short: 'Jeu' },
  { id: 'vendredi', name: 'Vendredi', short: 'Ven' },
  { id: 'samedi', name: 'Samedi', short: 'Sam' },
  { id: 'dimanche', name: 'Dimanche', short: 'Dim' }
]

// Créneaux horaires
export const TIME_SLOTS = [
  {
    id: 'matin',
    name: 'Matin (6h-12h)',
    start: '06:00',
    end: '12:00'
  },
  {
    id: 'apres-midi',
    name: 'Après-midi (12h-18h)',
    start: '12:00',
    end: '18:00'
  },
  {
    id: 'soir',
    name: 'Soir (18h-22h)',
    start: '18:00',
    end: '22:00'
  }
]

// Messages de validation
export const VALIDATION_MESSAGES = {
  required: 'Ce champ est requis',
  email: 'Veuillez entrer une adresse email valide',
  minLength: (min) => `Minimum ${min} caractères requis`,
  maxLength: (max) => `Maximum ${max} caractères autorisés`,
  minAge: 'Vous devez avoir au moins 13 ans',
  maxAge: 'Âge maximum autorisé : 120 ans',
  passwordMatch: 'Les mots de passe ne correspondent pas',
  futureDate: 'La date doit être dans le futur',
  invalidFile: 'Format de fichier non supporté',
  fileSize: 'La taille du fichier dépasse la limite autorisée'
}

// Configuration des fichiers
export const FILE_CONFIG = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    acceptedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  }
}

// Configuration de pagination
export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 50,
  defaultPage: 1
}

// États des annonces
export const ANNOUNCEMENT_STATUS = {
  draft: { name: 'Brouillon', color: 'gray' },
  active: { name: 'Active', color: 'green' },
  full: { name: 'Complète', color: 'orange' },
  completed: { name: 'Terminée', color: 'blue' },
  cancelled: { name: 'Annulée', color: 'red' }
}

// Routes de l'application
export const ROUTES = {
  home: '/',
  announcements: '/announcements',
  createAnnouncement: '/create-announcement',
  profile: '/profile',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register'
}

// Configuration de localStorage
export const STORAGE_KEYS = {
  token: 'badmatch_token',
  user: 'badmatch_user',
  preferences: 'badmatch_preferences',
  location: 'badmatch_location'
}

// Configuration de l'API
export const API_CONFIG = {
  timeout: 10000, // 10 secondes
  retryAttempts: 3,
  retryDelay: 1000 // 1 seconde
} 