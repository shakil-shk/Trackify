import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'
import { LuArrowRight } from 'react-icons/lu'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!fullName) { setError('Please enter your name'); return }
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!password || password.length < 6) { setError('Password must be at least 6 characters'); return }
    setError(''); setLoading(true)

    try {
      let profileImageUrl = ''
      if (profilePic) {
        const formData = new FormData()
        formData.append('image', profilePic)
      }
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password, profileImageUrl })
      if (data.token) {
        localStorage.setItem('token', data.token)

        if (profilePic) {
          const formData = new FormData()
          formData.append('image', profilePic)
          await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        }
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
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 tracking-tight">Create account</h1>
          <p className="text-text-muted text-sm">Join Trackify and take control of your finances</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-1">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <Input label="Full Name" placeholder="" value={fullName} onChange={e => setFullName(e.target.value)} />
          <Input label="Email Address" type="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{error}</div>}
          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <LuArrowRight size={16} /></>}
            </button>
          </div>
        </form>
        <p className="text-text-muted text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-light font-semibold transition-colors">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default SignUp
