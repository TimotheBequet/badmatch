import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/auth'
import './Auth.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Veuillez saisir votre adresse email')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez saisir une adresse email valide')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      await authService.requestPasswordReset(email)
      setSuccess(true)
    } catch (error) {
      setError(error.message || 'Une erreur s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="auth-container">
            <div className="auth-header">
              <div className="auth-icon">📧</div>
              <h1 className="auth-title">Email envoyé</h1>
              <p className="auth-subtitle">
                Un email de récupération a été envoyé à {email}
              </p>
            </div>

            <div className="success-message">
              <p>
                Vérifiez votre boîte email et suivez les instructions pour réinitialiser votre mot de passe.
              </p>
              <p>
                Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier spam.
              </p>
            </div>

            <div className="auth-footer">
              <p className="auth-link">
                <Link to="/login" className="link">
                  Retour à la connexion
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">Mot de passe oublié</h1>
            <p className="auth-subtitle">
              Saisissez votre adresse email pour recevoir un lien de récupération
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="votre@email.com"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="auth-actions">
              <button
                type="submit"
                className="btn btn-lg btn-full"
                disabled={isLoading}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de récupération'}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p className="auth-link">
              <Link to="/login" className="link">
                Retour à la connexion
              </Link>
            </p>
            <p className="auth-link">
              Pas encore de compte ? {' '}
              <Link to="/register" className="link">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 