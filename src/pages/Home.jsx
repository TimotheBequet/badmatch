import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Home.css'

function Home() {
  const { user } = useAuth()

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">BadMatch</h1>
              <h2 className="hero-subtitle">Trouvez votre partenaire de badminton idéal</h2>
              <p className="hero-description">
                Connectez-vous avec des joueurs de badminton près de chez vous et découvrez 
                de nouveaux partenaires d&apos;entraînement pour perfectionner votre jeu.
              </p>
              <div className="hero-actions">
                {user ? (
                  <>
                    <Link to="/announcements" className="btn btn-lg">
                      Voir les annonces
                    </Link>
                    <Link to="/create-announcement" className="btn btn-secondary btn-lg">
                      Créer une annonce
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="hero-auth-message">
                      Rejoignez notre communauté de passionnés de badminton pour trouver des partenaires de jeu et participer à des matchs réguliers.
                    </p>
                    <div className="hero-auth-buttons">
                      <Link to="/login" className="btn btn-lg">
                        Se connecter
                      </Link>
                      <Link to="/register" className="btn btn-secondary btn-lg">
                        Créer un compte
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-placeholder">
                <div className="hero-icon">🏸</div>
                <p>Badminton & Partenaires</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="page-header">
            <h2 className="page-title">Pourquoi choisir BadMatch ?</h2>
            <p className="page-subtitle">
              Découvrez les avantages de notre plateforme dédiée au badminton
            </p>
          </div>
          <div className="grid grid-3">
            <div className="card feature-card">
              <div className="feature-icon">🏸</div>
              <h3 className="card-title">Tous niveaux</h3>
              <p className="card-content">
                Débutant, intermédiaire ou expert... 
                Trouvez des partenaires de badminton adaptés à votre niveau de jeu.
              </p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="card-title">Près de chez vous</h3>
              <p className="card-content">
                Géolocalisation intelligente pour trouver des terrains de badminton 
                et des partenaires dans votre zone géographique.
              </p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="card-title">Communauté active</h3>
              <p className="card-content">
                Rejoignez une communauté de passionnés de badminton et 
                participez à des matchs réguliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!user && (
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Prêt à jouer ?</h2>
              <p className="cta-description">
                Inscrivez-vous gratuitement et trouvez votre prochain partenaire de badminton !
              </p>
              <Link to="/register" className="btn btn-lg">
                Commencer maintenant
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home 