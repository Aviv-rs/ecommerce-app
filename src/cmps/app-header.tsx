import { setUser } from 'features/user.slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from 'redux-store/store'
import { mainAppRoutes as routes } from 'routes'
import { userService } from 'services/user.service'
import { ReactComponent as Logo } from '../assets/imgs/logo.svg'
// import Logo from '../assets/imgs/logo.png'

export function AppHeader() {
  const loggedinUser = useSelector(
    (state: RootState) => state.user.loggedinUser
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onLogout = async () => {
    // await userService.logout()
    dispatch(setUser(null))
    // navigate('/')
  }

  return (
    <header className="app-header flex ">
      <NavLink to={'/'} className="logo-container flex align-center column">
        <Logo />
        <span className="brand-name">T-shop</span>
      </NavLink>

      <ul className="links clean-list flex align-center">
        {routes.map(route => {
          if (route.path === '/admin' && loggedinUser?.role !== 'admin') return
          return (
            <li key={route.title} className="link">
              <NavLink end to={route.path} title={route.title}>
                <route.icon className="icon" />
              </NavLink>
            </li>
          )
        })}
        {loggedinUser && (
          <li className="logout">
            <button className="clean-btn btn-logout" onClick={onLogout}>
              Logout
            </button>
          </li>
        )}
        <li className="flex align-center column">
          <span className="name-container">{loggedinUser?.fullname}</span>
        </li>
      </ul>
    </header>
  )
}
