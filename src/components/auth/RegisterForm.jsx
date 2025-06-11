import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import Button from '../ui/Button'
import Input from '../ui/Input'

function RegisterForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      await register(formData.name, formData.email, formData.password)
      onClose?.()
    } catch (error) {
      setErrors({ general: error.message || 'Une erreur s\'est produite' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Inscription</h2>
      
      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <Input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <Button 
        type="submit" 
        disabled={loading}
        className="btn-primary btn-full-width"
      >
        {loading ? 'Inscription...' : 'S\'inscrire'}
      </Button>

      <p className="form-footer">
        Déjà un compte ? 
        <button type="button" className="link-button">
          Se connecter
        </button>
      </p>
    </form>
  )
}

export default RegisterForm 