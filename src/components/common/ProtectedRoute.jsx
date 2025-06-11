import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProtectedRoute 