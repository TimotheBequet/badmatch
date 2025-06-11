import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuth } from '../../hooks/useAuth.jsx'
import './Header.css'

function Header() {
  const { user, logout } = useAuth()

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
                <span className="user-greeting">Bonjour, {user.name}</span>
                <button onClick={logout} className="btn btn-outline btn-sm">
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