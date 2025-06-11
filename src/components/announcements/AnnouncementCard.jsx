import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { joinAnnouncement } from '../../services/announcementService'

function AnnouncementCard({ announcement, onJoin }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [hasJoined, setHasJoined] = useState(
    announcement.participants?.some(p => p.id === user?.id) || false
  )

  const getBadmintonTypeEmoji = (type) => {
    const typeEmojis = {
      'simple': '🏸',
      'double': '🏸🏸', 
      'mixte': '🏸👫'
    }
    return typeEmojis[type?.toLowerCase()] || '🏸'
  }

  const getLevelColor = (level) => {
    const levelColors = {
      'débutant': '#22c55e',
      'intermédiaire': '#f59e0b',
      'avancé': '#ef4444',
      'expert': '#8b5cf6'
    }
    return levelColors[level?.toLowerCase()] || '#6b7280'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : ''
  }

  const handleJoin = async () => {
    if (!user) {
      alert('Vous devez être connecté pour rejoindre une annonce')
      return
    }

    setLoading(true)
    try {
      await joinAnnouncement(announcement.id)
      setHasJoined(true)
      onJoin && onJoin(announcement.id)
    } catch (error) {
      console.error('Erreur lors de la participation:', error)
      alert('Erreur lors de la participation à l\'annonce')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="announcement-card">
      <div className="card-header">
        <div className="type-info">
          <span className="type-emoji">{getBadmintonTypeEmoji(announcement.type)}</span>
          <h3 className="type-name">{announcement.type || 'Badminton'}</h3>
        </div>
        <div 
          className="level-badge"
          style={{ backgroundColor: getLevelColor(announcement.level) }}
        >
          {announcement.level}
        </div>
      </div>

      <div className="card-body">
        <h4 className="announcement-title">{announcement.title}</h4>
        <p className="announcement-description">
          {announcement.description.length > 100 
            ? `${announcement.description.slice(0, 100)}...`
            : announcement.description
          }
        </p>

        <div className="announcement-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{announcement.location}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(announcement.date)}</span>
          </div>
          
          {announcement.time && (
            <div className="detail-item">
              <span className="detail-icon">🕐</span>
              <span className="detail-text">{formatTime(announcement.time)}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-icon">👥</span>
            <span className="detail-text">
              {announcement.participants?.length || 0}/{announcement.maxParticipants || 2} joueurs
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="author-info">
          <div className="author-avatar">
            {announcement.author?.avatar ? (
              <img src={announcement.author.avatar} alt={announcement.author.name} />
            ) : (
              <div className="avatar-placeholder">
                {announcement.author?.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          <span className="author-name">
            {announcement.author?.name || 'Anonyme'}
          </span>
        </div>

        <div className="card-actions">
          {user && user.id !== announcement.author?.id && (
            <>
              {hasJoined ? (
                <span className="joined-indicator">✅ Inscrit</span>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  onClick={handleJoin}
                  loading={loading}
                  disabled={
                    loading || 
                    (announcement.participants?.length >= announcement.maxParticipants)
                  }
                >
                  {loading ? 'Inscription...' : 'Rejoindre'}
                </Button>
              )}
            </>
          )}
          
          <Link 
            to={`/announcements/${announcement.id}`}
            className="btn btn-outline btn-sm"
          >
            Détails
          </Link>
        </div>
      </div>
    </div>
  )
}

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
    level: PropTypes.string,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    maxParticipants: PropTypes.number,
    participants: PropTypes.array,
    author: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  onJoin: PropTypes.func
}

export default AnnouncementCard 