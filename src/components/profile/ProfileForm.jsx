import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

function ProfileForm({ user, onSave, onCancel }) {
  const { updateProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    location: user?.location || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    level: user?.level || '',
    availability: user?.availability || '',
    city: user?.city || ''
  })

  const badmintonLevels = [
    'N1',
    'N2',
    'N3',
    'R4',
    'R5',
    'R6',
    'D7',
    'D8',
    'D9',
    'P10',
    'P11',
    'P12',
    'NC'
  ]

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        location: user.location || '',
        bio: user.bio || '',
        phone: user.phone || '',
        level: user.level || 'NC',
        availability: user.availability || '',
        city: user.city || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }
    
    if (formData.age && (isNaN(formData.age) || formData.age < 13 || formData.age > 100)) {
      newErrors.age = 'L\'âge doit être entre 13 et 100 ans'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      const profileData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : null
      }
      
      await updateProfile(profileData)
      navigate('/profile')
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      setErrors({ submit: 'Erreur lors de la sauvegarde du profil' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-form-container">
      <h2>Modifier mon profil</h2>
      {errors.submit && (
        <div className="error-message submit-error">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h3>Informations personnelles</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Votre nom complet"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Âge</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={`form-input ${errors.age ? 'error' : ''}`}
                placeholder="25"
                min="13"
                max="100"
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Localisation</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Paris, France"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">À propos de vous</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
              placeholder="Parlez de vous, de votre passion pour le badminton..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Badminton</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="level">Niveau de jeu</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="form-input"
              >
                {badmintonLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Disponibilités</label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="Ex: Mardi et jeudi soir, weekend matin..."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Paris, France"
          />
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
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </form>
    </div>
  )
}

ProfileForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    bio: PropTypes.string,
    phone: PropTypes.string,
    level: PropTypes.string,
    availability: PropTypes.string,
    city: PropTypes.string
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func.isRequired
}

export default ProfileForm 