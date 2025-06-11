import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { useAnnouncements } from '../hooks/useAnnouncements'
import AnnouncementCard from '../components/announcements/AnnouncementCard'
import Button from '../components/ui/Button'

function Dashboard() {
  const { user } = useAuth()
  const { announcements, loading, error, fetchAnnouncements, deleteAnnouncement } = useAnnouncements()
  const [activeTab, setActiveTab] = useState('my-announcements')
  const [userAnnouncements, setUserAnnouncements] = useState([])
  const [participations, setParticipations] = useState([])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user, fetchAnnouncements])

  const fetchUserData = async () => {
    try {
      // Récupérer les annonces de l'utilisateur
      await fetchAnnouncements({ userId: user.id })
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err)
    }
  }

  useEffect(() => {
    if (announcements && user) {
      // Filtrer les annonces de l'utilisateur
      const myAnnouncements = announcements.filter(
        announcement => announcement.userId === user.id
      )
      setUserAnnouncements(myAnnouncements)

      // Simuler les participations (à remplacer par une vraie API)
      const mockParticipations = announcements.filter(
        announcement => announcement.participants?.includes(user.id)
      )
      setParticipations(mockParticipations)
    }
  }, [announcements, user])

  const handleDeleteAnnouncement = async (announcementId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await deleteAnnouncement(announcementId)
        // Rafraîchir la liste
        fetchUserData()
      } catch (err) {
        console.error('Erreur lors de la suppression:', err)
      }
    }
  }

  const tabs = [
    { id: 'my-announcements', label: 'Mes annonces', count: userAnnouncements.length },
    { id: 'participations', label: 'Mes participations', count: participations.length }
  ]

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="error-state">
            <h2>Accès refusé</h2>
            <p>Vous devez être connecté pour accéder à cette page.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <div>
              <h1>Tableau de bord</h1>
              <p>Bienvenue, {user.name} !</p>
            </div>
            <Link to="/create-announcement">
              <Button variant="primary">
                Créer une annonce
              </Button>
            </Link>
          </div>
        </header>

        {error && (
          <div className="error-message">
            Une erreur s'est produite : {error}
          </div>
        )}

        <div className="dashboard-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{userAnnouncements.length}</div>
              <div className="stat-label">Annonces créées</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{participations.length}</div>
              <div className="stat-label">Participations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {userAnnouncements.filter(a => a.status === 'active').length}
              </div>
              <div className="stat-label">Annonces actives</div>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <div className="tabs-header">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Chargement...</p>
              </div>
            ) : (
              <>
                {activeTab === 'my-announcements' && (
                  <div className="announcements-section">
                    {userAnnouncements.length > 0 ? (
                      <div className="announcements-grid">
                        {userAnnouncements.map(announcement => (
                          <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            onDelete={handleDeleteAnnouncement}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3>Aucune annonce créée</h3>
                        <p>Créez votre première annonce pour trouver des partenaires de badminton !</p>
                        <Link to="/create-announcement">
                          <Button variant="primary">
                            Créer une annonce
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'participations' && (
                  <div className="participations-section">
                    {participations.length > 0 ? (
                      <div className="announcements-grid">
                        {participations.map(announcement => (
                          <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <div className="empty-icon">🏃‍♂️</div>
                        <h3>Aucune participation</h3>
                        <p>Rejoignez des annonces pour commencer à jouer au badminton avec d&apos;autres !</p>
                        <Link to="/announcements">
                          <Button variant="primary">
                            Voir les annonces
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 