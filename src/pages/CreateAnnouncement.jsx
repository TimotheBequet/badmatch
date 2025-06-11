import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnnouncementForm from '../components/announcements/AnnouncementForm'
import { useAnnouncements } from '../hooks/useAnnouncements'

function CreateAnnouncement() {
  const navigate = useNavigate()
  const { createAnnouncement } = useAnnouncements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (announcementData) => {
    setLoading(true)
    setError(null)

    try {
      await createAnnouncement(announcementData)
      navigate('/announcements', { 
        state: { message: 'Annonce créée avec succès !' }
      })
    } catch (err) {
      setError(err.message || 'Erreur lors de la création de l\'annonce')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/announcements')
  }

  return (
    <div className="create-announcement-page">
      <div className="container">
        <header className="page-header">
          <h1>Créer une annonce</h1>
          <p>Trouvez votre partenaire de badminton idéal</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-container">
          <AnnouncementForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateAnnouncement 