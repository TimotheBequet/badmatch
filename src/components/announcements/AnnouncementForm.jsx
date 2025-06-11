import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

function AnnouncementForm({ announcement, onSubmit, onCancel, loading = false }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    level: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: 2,
    contact: ''
  })
  
  const [errors, setErrors] = useState({})

  const badmintonTypes = [
    'Simple',
    'Double',
    'Mixte'
  ]

  const levels = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Expert'
  ]

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title || '',
        description: announcement.description || '',
        type: announcement.type || '',
        level: announcement.level || '',
        location: announcement.location || '',
        date: announcement.date || '',
        time: announcement.time || '',
        maxParticipants: announcement.maxParticipants || 2,
        contact: announcement.contact || user?.email || ''
      })
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        contact: user.email || ''
      }))
    }
  }, [announcement, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise'
    }
    
    if (!formData.type) {
      newErrors.type = 'Le type de jeu est requis'
    }
    
    if (!formData.level) {
      newErrors.level = 'Le niveau est requis'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise'
    }
    
    if (!formData.date) {
      newErrors.date = 'La date est requise'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé'
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'L&apos;heure est requise'
    }
    
    if (!formData.maxParticipants || formData.maxParticipants < 2 || formData.maxParticipants > 10) {
      newErrors.maxParticipants = 'Le nombre de participants doit être entre 2 et 10'
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Le contact est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.contact)) {
      newErrors.contact = 'L&apos;email de contact n&apos;est pas valide'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="announcement-form">
      <div className="form-section">
        <h3>Informations générales</h3>
        
        <div className="form-group">
          <label htmlFor="title">Titre de l&apos;annonce *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Ex: Recherche partenaire badminton niveau intermédiaire"
            maxLength="100"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            rows="4"
            placeholder="Décrivez votre recherche de partenaire, vos objectifs, votre style de jeu..."
            maxLength="500"
          />
          <small className="char-count">
            {formData.description.length}/500 caractères
          </small>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Détails du badminton</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type de jeu *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`form-input ${errors.type ? 'error' : ''}`}
            >
              <option value="">Sélectionnez un type</option>
              {badmintonTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="level">Niveau recherché *</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={`form-input ${errors.level ? 'error' : ''}`}
            >
              <option value="">Sélectionnez un niveau</option>
              {levels.map(level => (
                <option key={level} value={level.toLowerCase()}>
                  {level}
                </option>
              ))}
            </select>
            {errors.level && <span className="error-message">{errors.level}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Lieu et horaires</h3>
        
        <div className="form-group">
          <label htmlFor="location">Lieu de rencontre *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`form-input ${errors.location ? 'error' : ''}`}
            placeholder="Ex: Gymnase Jean Moulin, 15e arrondissement, Paris"
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'error' : ''}`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Heure *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`form-input ${errors.time ? 'error' : ''}`}
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Participants</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="maxParticipants">Nombre maximum de participants *</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              className={`form-input ${errors.maxParticipants ? 'error' : ''}`}
              min="2"
              max="10"
            />
            <small className="form-help">
              Vous inclus (entre 2 et 10 joueurs)
            </small>
            {errors.maxParticipants && <span className="error-message">{errors.maxParticipants}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact">Email de contact *</label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`form-input ${errors.contact ? 'error' : ''}`}
              placeholder="votre@email.com"
            />
            {errors.contact && <span className="error-message">{errors.contact}</span>}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Publication...' : announcement ? 'Modifier' : 'Publier l&apos;annonce'}
        </Button>
      </div>
    </form>
  )
}

AnnouncementForm.propTypes = {
  announcement: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    level: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    maxParticipants: PropTypes.number,
    contact: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default AnnouncementForm 