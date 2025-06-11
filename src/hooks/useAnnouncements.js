import { useState, useCallback } from 'react'
import { apiClient } from '../services/api'

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAnnouncements = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })
      
      const endpoint = `/announcements${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await apiClient.get(endpoint)
      
      setAnnouncements(response.data)
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement des annonces:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createAnnouncement = useCallback(async (announcementData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiClient.post('/announcements', announcementData)
      const newAnnouncement = response.data
      
      setAnnouncements(prev => [newAnnouncement, ...prev])
      return newAnnouncement
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateAnnouncement = useCallback(async (id, announcementData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiClient.put(`/announcements/${id}`, announcementData)
      const updatedAnnouncement = response.data
      
      setAnnouncements(prev => 
        prev.map(announcement => 
          announcement.id === id ? updatedAnnouncement : announcement
        )
      )
      
      return updatedAnnouncement
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteAnnouncement = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    
    try {
      await apiClient.delete(`/announcements/${id}`)
      
      setAnnouncements(prev => 
        prev.filter(announcement => announcement.id !== id)
      )
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getAnnouncementById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiClient.get(`/announcements/${id}`)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementById
  }
} 