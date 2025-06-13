import { Link, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuth } from '../../hooks/useAuth.jsx'
import './Header.css'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>BadMatch</h1>
        </Link>
        <Navigation />
        <div className="header-actions">
          <ThemeToggle />
          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Bonjour,<br /> {user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">Connexion</Link>
                <Link to="/register" className="btn btn-sm">Inscription</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 