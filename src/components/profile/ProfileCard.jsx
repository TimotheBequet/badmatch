import { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

const getBadmintonEmoji = (level) => {
  const levelEmojis = {
    'débutant': '🏸',
    'intermédiaire': '🏸🏸',
    'avancé': '🏸🏸🏸',
    'expert': '🏸🏸🏸🏸'
  }
  return levelEmojis[level?.toLowerCase()] || '🏸'
}

function ProfileCard({ user, isOwnProfile = false, onEdit }) {
  const { user: currentUser } = useAuth()
  const [showContact, setShowContact] = useState(false)

  const handleContactToggle = () => {
    setShowContact(!showContact)
  }

  if (!user) {
    return (
      <div className="profile-card">
        <div className="profile-loading">
          <div className="profile-skeleton">
            <div className="avatar-skeleton"></div>
            <div className="info-skeleton">
              <div className="line-skeleton"></div>
              <div className="line-skeleton short"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={`${user.name} avatar`} />
          ) : (
            <div className="avatar-placeholder">
              {user.name?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name || 'Nom non renseigné'}</h2>
          <p className="profile-location">
            📍 {user.location || 'Localisation non renseignée'}
          </p>
          {user.age && (
            <p className="profile-age">
              🎂 {user.age} ans
            </p>
          )}
        </div>
        {isOwnProfile && (
          <button 
            onClick={onEdit}
            className="btn btn-outline btn-sm edit-profile-btn"
          >
            Modifier
          </button>
        )}
      </div>

      <div className="profile-body">
        {user.bio && (
          <div className="profile-section">
            <h3>À propos</h3>
            <p className="profile-bio">{user.bio}</p>
          </div>
        )}

        <div className="profile-section">
          <h3>Niveau de badminton</h3>
          {user.level ? (
            <div className="badminton-level">
              <div className="level-emoji">
                {getBadmintonEmoji(user.level)}
              </div>
              <div className="level-info">
                <span className="level-badge">
                  {user.level}
                </span>
              </div>
            </div>
          ) : (
            <p className="no-level">Niveau non renseigné</p>
          )}
        </div>

        {user.availability && (
          <div className="profile-section">
            <h3>Disponibilités</h3>
            <p className="availability">{user.availability}</p>
          </div>
        )}
      </div>

      {!isOwnProfile && currentUser && (
        <div className="profile-actions">
          <button 
            onClick={handleContactToggle}
            className="btn btn-primary contact-btn"
          >
            {showContact ? 'Masquer contact' : 'Contacter'}
          </button>
          
          {showContact && user.email && (
            <div className="contact-info">
              <p>📧 {user.email}</p>
              {user.phone && <p>📱 {user.phone}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    location: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bio: PropTypes.string,
    level: PropTypes.string,
    availability: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  }),
  isOwnProfile: PropTypes.bool,
  onEdit: PropTypes.func
}

export default ProfileCard 