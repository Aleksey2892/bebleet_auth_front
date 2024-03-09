import { NavLink, Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../AuthProvider/AuthProvider'
import s from './Layout.module.scss'

export const Layout = () => {
  const { token, setToken } = useAuth()

  const handleLogout = () => {
    setToken(null)
  }

  return (
    <>
      <header className={s.appHeader}>
        Auth example with technologies: React, Node, Express, SQLite.
      </header>

      <nav className={s.nav}>
        {!token && (
          <>
            <NavLink
              to={'/register'}
              className={({ isActive }) => (isActive ? s.active : '')}
            >
              Register
            </NavLink>

            <NavLink
              to={'/login'}
              className={({ isActive }) => (isActive ? s.active : '')}
            >
              Login
            </NavLink>
          </>
        )}

        {token && (
          <>
            <Button className={s.logout} onClick={handleLogout}>
              Logout
            </Button>

            <NavLink
              to={'/dashboard'}
              className={({ isActive }) => (isActive ? s.active : '')}
            >
              Protected page
            </NavLink>
          </>
        )}
      </nav>

      <Outlet />
    </>
  )
}
