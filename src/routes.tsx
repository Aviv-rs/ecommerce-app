import { AdminPage } from 'pages/admin-page'
import { HomePage } from 'pages/home-page'
import { LoginSignupPage } from 'pages/login-signup-page'

export const mainAppRoutes = [
  { path: '/', element: <HomePage />, title: 'Home' },
  { path: '/login', element: <LoginSignupPage />, title: 'Login' },
]

// export const chatAppRoutes = [
//   { path: '', element: <HomePage />, title: 'Home' },
//   { path: 'admin', element: <AdminPage />, title: 'Admin' },
// ]
