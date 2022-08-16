import { setUser } from 'features/user.slice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from 'redux-store/store'
import { mainAppRoutes as routes } from 'routes'
import { userService } from 'services/user.service'
import { ReactComponent as Logo } from '../assets/imgs/logo.svg'
import { OptionsMenu } from './options-menu'
import { HiOutlineUser } from 'react-icons/hi'
// import Logo from '../assets/imgs/logo.png'

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const loggedinUser = useSelector(
    (state: RootState) => state.user.loggedinUser
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const optionsMenuRef = useRef<HTMLDivElement>(null)
  const userMenuOptions = [
    {
      name: 'Logout',
      action: () => {
        onLogout()
        setIsMenuOpen(false)
      },
    },
  ]

  useEffect(() => {
    const handleClickOutsideMenu = (ev: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(ev.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideMenu)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
    }
  }, [optionsMenuRef])

  const onLogout = async () => {
    // await userService.logout()
    dispatch(setUser(null))
    navigate('/login')
  }

  return (
    <header className="app-header flex ">
      <NavLink to={'/'} className="logo-container flex align-center column">
        <Logo />
        <span className="brand-name">T-shop</span>
      </NavLink>

      <ul className="links clean-list flex align-center">
        {loggedinUser && (
          <>
            <li className="link">
              <button
                className="btn-user-menu clean-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <HiOutlineUser className="icon" />
              </button>
            </li>
            <div ref={optionsMenuRef}>
              <OptionsMenu
                className="user-menu"
                isOpen={isMenuOpen}
                options={userMenuOptions}
                title={`Hi ${loggedinUser.fullname}`}
              />
            </div>
          </>
        )}
        {routes.map(route => {
          if (route.path === '/admin' && loggedinUser?.role !== 'admin') return
          if (route.path === '/login' && loggedinUser) return

          return (
            <li key={route.title} className="link">
              <NavLink end to={route.path} title={route.title}>
                <route.icon className="icon" />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </header>
  )
}
