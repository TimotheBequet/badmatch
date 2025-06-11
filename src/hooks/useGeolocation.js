import { useState, useEffect, useCallback } from 'react'

export function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par ce navigateur')
      return
    }

    setLoading(true)
    setError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000 // 10 minutes
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
        setLoading(false)
      },
      (error) => {
        let errorMessage = ''
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'L\'accès à la géolocalisation a été refusé'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'La localisation n\'est pas disponible'
            break
          case error.TIMEOUT:
            errorMessage = 'Délai d\'attente dépassé pour la localisation'
            break
          default:
            errorMessage = 'Une erreur inconnue s\'est produite'
            break
        }
        setError(errorMessage)
        setLoading(false)
      },
      options
    )
  }, [])

  const watchPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par ce navigateur')
      return null
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
        setError(null)
      },
      (error) => {
        let errorMessage = ''
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'L\'accès à la géolocalisation a été refusé'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'La localisation n\'est pas disponible'
            break
          case error.TIMEOUT:
            errorMessage = 'Délai d\'attente dépassé pour la localisation'
            break
          default:
            errorMessage = 'Une erreur inconnue s\'est produite'
            break
        }
        setError(errorMessage)
      },
      options
    )

    return watchId
  }, [])

  const clearWatch = useCallback((watchId) => {
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371 // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    return Math.round(distance * 100) / 100 // Arrondi à 2 décimales
  }, [])

  // Auto-fetch location on mount if needed
  useEffect(() => {
    // Uncomment if you want to auto-fetch location on mount
    // getCurrentPosition()
  }, [])

  return {
    location,
    error,
    loading,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    calculateDistance,
    isSupported: !!navigator.geolocation
  }
} 