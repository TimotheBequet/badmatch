export const geolocationService = {
  /**
   * Obtenir la position actuelle de l'utilisateur
   */
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('La géolocalisation n\'est pas supportée par ce navigateur'))
        return
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          })
        },
        (error) => {
          let message = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'L\'accès à la géolocalisation a été refusé'
              break
            case error.POSITION_UNAVAILABLE:
              message = 'La localisation n\'est pas disponible'
              break
            case error.TIMEOUT:
              message = 'Délai d\'attente dépassé pour la localisation'
              break
            default:
              message = 'Une erreur inconnue s\'est produite'
              break
          }
          reject(new Error(message))
        },
        options
      )
    })
  },

  /**
   * Calculer la distance entre deux points géographiques
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Rayon de la Terre en kilomètres
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    
    return Math.round(distance * 100) / 100 // Arrondi à 2 décimales
  },

  /**
   * Convertir des degrés en radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180)
  },

  /**
   * Convertir des radians en degrés
   */
  toDegrees(radians) {
    return radians * (180 / Math.PI)
  },

  /**
   * Obtenir l'adresse à partir des coordonnées (geocoding inverse)
   * Utilise l'API de géocodage (à remplacer par une vraie API)
   */
  async reverseGeocode(latitude, longitude) {
    try {
      // Simulation d'un appel API de géocodage inverse
      // À remplacer par une vraie API comme Google Maps, OpenStreetMap, etc.
      
      const response = await fetch(
        `https://api.example.com/geocode?lat=${latitude}&lon=${longitude}`
      )
      
      if (!response.ok) {
        throw new Error('Erreur lors du géocodage')
      }
      
      const data = await response.json()
      return {
        address: data.address || 'Adresse non trouvée',
        city: data.city || '',
        country: data.country || '',
        postalCode: data.postalCode || ''
      }
    } catch (error) {
      // Fallback avec des données simulées
      return {
        address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        city: 'Ville inconnue',
        country: 'France',
        postalCode: ''
      }
    }
  },

  /**
   * Obtenir les coordonnées à partir d'une adresse (geocoding)
   */
  async geocodeAddress(address) {
    try {
      // Simulation d'un appel API de géocodage
      // À remplacer par une vraie API
      
      const response = await fetch(
        `https://api.example.com/geocode?address=${encodeURIComponent(address)}`
      )
      
      if (!response.ok) {
        throw new Error('Erreur lors du géocodage')
      }
      
      const data = await response.json()
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy || 'medium'
      }
    } catch (error) {
      throw new Error('Impossible de géocoder cette adresse')
    }
  },

  /**
   * Vérifier si la géolocalisation est supportée
   */
  isSupported() {
    return 'geolocation' in navigator
  },

  /**
   * Formater une distance pour l'affichage
   */
  formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)} m`
    } else if (distanceKm < 10) {
      return `${distanceKm.toFixed(1)} km`
    } else {
      return `${Math.round(distanceKm)} km`
    }
  },

  /**
   * Obtenir la zone géographique approximative
   */
  getApproximateZone(latitude, longitude) {
    // Simplification pour définir des zones géographiques
    // À adapter selon les besoins de l'application
    
    if (latitude >= 48.5 && latitude <= 49.0 && longitude >= 2.0 && longitude <= 2.8) {
      return 'Île-de-France'
    } else if (latitude >= 45.5 && latitude <= 46.0 && longitude >= 4.5 && longitude <= 5.2) {
      return 'Rhône-Alpes'
    } else if (latitude >= 43.0 && latitude <= 44.0 && longitude >= 1.0 && longitude <= 3.5) {
      return 'Occitanie'
    }
    
    return 'France'
  }
} 