import { useEffectUpdate } from 'hooks/useEffectUpdate'
import { useForm } from 'hooks/useForm'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { utilService } from 'services/utils'

interface Credentials {
  username: string
  password: string
  fullname?: string
}

interface LoginSignupProps {
  onLogin: (credentials: UserCredLogin) => void
  onSignup: (credentials: UserCredSignup) => void
}

export const LoginSignup = (props: LoginSignupProps) => {
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  let [register, credentials, resetFields, changeFields] = useForm({
    username: '',
    password: '',
  } as Credentials)
  const navigate = useNavigate()

  useEffectUpdate(() => {
    const cred = isSignup
      ? {
          fullname: '',
          username: '',
          password: '',
        }
      : {
          username: '',
          password: '',
        }

    changeFields(cred)
  }, [isSignup])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (isSignup) {
      try {
        await props.onSignup(credentials)
        navigate('/')
      } catch (err) {
        setError('Cannot signup, please try again with a different username')
      }
    } else {
      try {
        await props.onLogin(credentials)
        navigate('/')
      } catch (err) {
        setError('Wrong username or password, please try again')
      }
    }
  }

  return (
    <form onSubmit={ev => handleSubmit(ev)} className="login-signup">
      {error && <div className="error">{error}</div>}
      {Object.keys(credentials).map((field: string) => {
        return (
          <div key={field} className="form-group">
            <input required {...register(field, ' ')} autoComplete="no" />
            <label htmlFor={field}>{utilService.capitalize(field) + ' '}</label>
          </div>
        )
      })}

      <button className="btn-submit" type="submit">
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>

      <div className="horizontal-rule"></div>

      <button
        type="button"
        className="btn-toggle-login"
        onClick={() => {
          setIsSignup(prevIsSignup => !prevIsSignup)
          setError('')
        }}
      >
        {isSignup ? 'Already have an account? log in' : 'Create new account'}
      </button>
    </form>
  )
}
