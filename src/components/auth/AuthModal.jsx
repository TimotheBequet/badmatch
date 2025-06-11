import { useState } from 'react'
import Modal from '../ui/Modal'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)

  const handleClose = () => {
    onClose()
    // Reset to login mode when closing
    setTimeout(() => setMode('login'), 200)
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="auth-modal">
      <div className="auth-modal-content">
        {mode === 'login' ? (
          <LoginForm onClose={handleClose} onSwitchMode={switchMode} />
        ) : (
          <RegisterForm onClose={handleClose} onSwitchMode={switchMode} />
        )}
        
        <div className="auth-switch">
          {mode === 'login' ? (
            <p>
              Pas encore de compte ?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={switchMode}
              >
                S'inscrire
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte ?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={switchMode}
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default AuthModal 