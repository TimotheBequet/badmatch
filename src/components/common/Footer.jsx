import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BadMatch</h3>
            <p>La plateforme dédiée au badminton pour trouver votre partenaire de jeu idéal.</p>
          </div>
          <div className="footer-section">
            <h3>Liens rapides</h3>
            <ul>
              <li><a href="/about">À propos</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/help">Aide</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Légal</h3>
            <ul>
              <li><a href="/privacy">Confidentialité</a></li>
              <li><a href="/terms">Conditions d&apos;utilisation</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BadMatch. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 