import { LoginSignup } from 'cmps/login-signup'
import { setUser, setUserMsg } from 'features/user.slice'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-store/store'
import { userService } from 'services/user.service'
import Logo from '../assets/imgs/logo.png'

export const LoginSignupPage = () => {
  const loggedinUser = useSelector(
    (storeState: RootState) => storeState.user.loggedinUser
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!!loggedinUser) navigate('/')
  }, [])

  const onSignup = async (credentials: UserCredSignup) => {
    // await userService.signup(credentials)
    // TODO: implement real signup with server
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
    dispatch(
      setUser({
        _id: '1',
        fullname: 'Sasuke uchiha',
        role: 'admin',
        orders: [],
        username,
      })
    )
    // await userService.login(credentials)
  }

  return (
    <section className="login-signup-page full-screen flex align-center">
      <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    </section>
  )
}
