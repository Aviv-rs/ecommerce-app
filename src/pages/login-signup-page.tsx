import { LoginSignup } from 'cmps/login-signup'
import { setUser, setUserMsg } from 'features/user.slice'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { useDispatch } from 'react-redux'
import { userService } from 'services/user.service'
import Logo from '../assets/imgs/logo.png'

export const LoginSignupPage = () => {
  const dispatch = useDispatch()
  const onSignup = async (credentials: UserCredSignup) => {
    // await userService.signup(credentials)
    dispatch(
      setUser({
        _id: '1',
        fullname: 'Sasuke uchiha',
        role: 'visitor',
        orders: [],
        username: 'Sasuke',
      })
    )
    dispatch(setUserMsg({ txt: 'Signed up successfuly!', type: 'success' }))
  }

  const onLogin = async (credentials: UserCredLogin) => {
    const { username } = credentials
    setUser({
      _id: '1',
      fullname: 'Sasuke uchiha',
      role: 'visitor',
      orders: [],
      username,
    })
    // await userService.login(credentials)
  }

  return (
    <section className="login-signup-page full-screen flex align-center">
      <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    </section>
  )
}
