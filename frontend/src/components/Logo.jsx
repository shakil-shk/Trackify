import React from 'react'
import logo from '../assets/logo.png'
const Logo = ({ size = 36, showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      
      {/* ── LOGO IMAGE CONTAINER ── */}
      <div
        style={{ width: size, height: size }}
        className="flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow"
      >
        <img 
          src={logo} 
          alt="Trackify Logo"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* ── WORDMARK ── */}
      {showText && (
        <span className="font-display font-bold text-3xl tracking-tight 
  text-transparent bg-clip-text 
  bg-gradient-to-r from-orange-500 to-cyan-300">
  Trackify
</span>
      )}
    </div>
  )
}

export default Logo