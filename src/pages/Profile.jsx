import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import ProfileCard from '../components/profile/ProfileCard'
import ProfileForm from '../components/profile/ProfileForm'
import Button from '../components/ui/Button'

function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setError(null)
    setSuccess(null)
  }

  const handleProfileUpdate = async (profileData) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await updateProfile(profileData)
      setSuccess('Profil mis à jour avec succès !')
      setIsEditing(false)
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du profil')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    setSuccess(null)
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-state">
            <h2>Erreur</h2>
            <p>Impossible de charger les informations du profil.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <header className="page-header">
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles et vos préférences</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="profile-content">
          {isEditing ? (
            <div className="profile-edit-section">
              <div className="section-header">
                <h2>Modifier le profil</h2>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Annuler
                </Button>
              </div>
              
              <ProfileForm
                user={user}
                onSubmit={handleProfileUpdate}
                onCancel={handleCancel}
                loading={loading}
              />
            </div>
          ) : (
            <div className="profile-view-section">
              <div className="section-header">
                <h2>Informations du profil</h2>
                <Button
                  variant="primary"
                  onClick={handleEditToggle}
                >
                  Modifier
                </Button>
              </div>

              <ProfileCard user={user} />
            </div>
          )}
        </div>

        <div className="profile-stats">
          <h3>Mes statistiques</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{user.stats?.totalAnnouncements || 0}</div>
              <div className="stat-label">Annonces créées</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user.stats?.totalParticipations || 0}</div>
              <div className="stat-label">Participations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user.stats?.rating || 'N/A'}</div>
              <div className="stat-label">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 