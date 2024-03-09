import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthProvider/AuthProvider'

export const PrivateRoute = ({ element }) => {
  const { token } = useAuth()

  return token ? element : <Navigate to="/login" replace />
}
