import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

const Input = ({ label, type = 'text', placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? 'border-danger focus:border-danger' : ''} ${isPassword ? 'pr-11' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
          >
            {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Input
