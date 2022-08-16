import { AdminPage } from 'pages/admin-page'
import { HomePage } from 'pages/home-page'
import { LoginSignupPage } from 'pages/login-signup-page'
import { RiAdminLine } from 'react-icons/ri'
import { AiOutlineHome } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'

export const mainAppRoutes = [
  { path: '/', element: <HomePage />, title: 'Home', icon: AiOutlineHome },
  {
    path: '/login',
    element: <LoginSignupPage />,
    title: 'Login',
    icon: FiLogIn,
  },
  { path: '/admin', element: <AdminPage />, title: 'Admin', icon: RiAdminLine },
]
