import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'
import { LuArrowRight } from 'react-icons/lu'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!password) { setError('Please enter your password.'); return }
    setError(''); setLoading(true)
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password })
      if (data.token) {
        localStorage.setItem('token', data.token)
        updateUser(data.user)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-text-muted text-sm">Sign in to your Trackify account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-1">
          <Input label="Email Address" type="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{error}</div>}
          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <LuArrowRight size={16} /></>}
            </button>
          </div>
        </form>
        <p className="text-text-muted text-sm mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-light font-semibold transition-colors">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login
