import { useState, useEffect } from 'react'
import AnnouncementCard from '../components/announcements/AnnouncementCard'
import FilterBar from '../components/announcements/FilterBar'
import { getAllAnnouncements } from '../services/announcementService'

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([])
  const [filters, setFilters] = useState({
    location: '',
    level: '',
    badminton: '',
    date: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAllAnnouncements()
        setAnnouncements(data)
        setFilteredAnnouncements(data)
      } catch (error) {
        console.error('Erreur lors du chargement des annonces:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    
    let filtered = announcements
    
    if (newFilters.location) {
      filtered = filtered.filter(ann => 
        ann.location.toLowerCase().includes(newFilters.location.toLowerCase())
      )
    }
    
    if (newFilters.level) {
      filtered = filtered.filter(ann => ann.level === newFilters.level)
    }
    
    if (newFilters.date) {
      filtered = filtered.filter(ann => ann.date === newFilters.date)
    }

    setFilteredAnnouncements(filtered)
  }

  if (loading) {
    return <div className="loading">Chargement des annonces...</div>
  }

  return (
    <div className="announcements-page">
      <div className="container">
        <h1>Annonces de badminton</h1>
        
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange}
        />

        <div className="announcements-grid">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map(announcement => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
              />
            ))
          ) : (
            <div className="no-announcements">
              <p>Aucune annonce ne correspond à vos critères.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Announcements 