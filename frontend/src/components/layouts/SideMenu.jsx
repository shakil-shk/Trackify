import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { SIDE_MENU_DATA } from '../../utils/data'
import { getInitials } from '../../utils/helper'
import Logo from '../Logo'

const SideMenu = ({ isOpen, onClose }) => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (item) => {
    if (item.isLogout) {
      localStorage.removeItem('token')
      clearUser()
      navigate('/login')
    } else {
      navigate(item.path)
    }
    if (onClose) onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full z-30 w-64 bg-surface-2 border-r border-border flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="px-6 py-6 border-b border-border">
          <Logo size={57} />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {SIDE_MENU_DATA.map((item) => {
            const Icon = item.icon
            const isActive = !item.isLogout && location.pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`sidebar-item w-full text-left ${isActive ? 'active' : ''} ${item.isLogout ? 'mt-4 hover:bg-red-500/10 hover:text-red-400' : ''}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            )
          })}
        </nav>
        {user && (
          <div className="px-3 py-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-surface-card">
              {user.profileImageUrl ? (
                <img src={`http://localhost:8080${user.profileImageUrl}`} alt={user.fullName} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-display font-bold">{getInitials(user.fullName)}</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-text-primary text-sm font-display font-semibold truncate">{user.fullName}</p>
                <p className="text-text-muted text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default SideMenu
