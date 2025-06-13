import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

function Navigation() {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            Accueil
          </Link>
        </li>
        {user && (
          <li className="nav-item">
            <Link 
              to="/announcements" 
              className={isActive('/announcements') ? 'active' : ''}
            >
              Annonces
            </Link>
          </li>
        )}
        {user && (
          <>
            <li className="nav-item">
              <Link 
                to="/create-announcement" 
                className={isActive('/create-announcement') ? 'active' : ''}
              >
                Créer une annonce
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'active' : ''}
              >
                Tableau de bord
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/profile" 
                className={isActive('/profile') ? 'active' : ''}
              >
                Profil
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navigation 