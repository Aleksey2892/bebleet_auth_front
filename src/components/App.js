import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProtectedPage } from '../pages/ProtectedPage'
import { Layout } from './Layout/Layout'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'
import { AuthProvider, useAuth } from './AuthProvider/AuthProvider'

import { ToastContainer } from 'react-toastify'
import s from './App.module.scss'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { setToken } = useAuth()

  useEffect(() => {
    return () => {
      setToken(null)
    }
  }, [])

  return (
    <div className={s.App}>
      <div className={s.container}>
        <AuthProvider>
          <Routes>
            <Route path={'/'} element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<ProtectedPage />} />}
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App
