import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import Button from '../ui/Button'
import Input from '../ui/Input'

function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      await login(formData.email, formData.password)
      onClose?.()
    } catch (error) {
      setErrors({ general: error.message || 'Une erreur s\'est produite' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Connexion</h2>
      
      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

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

      <Button 
        type="submit" 
        disabled={loading}
        className="btn-primary btn-full-width"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>

      <p className="form-footer">
        Pas encore de compte ? 
        <button type="button" className="link-button">
          S'inscrire
        </button>
      </p>
    </form>
  )
}

export default LoginForm 