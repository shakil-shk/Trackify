import { useState } from 'react'
import SideMenu from './SideMenu'
import { LuMenu } from 'react-icons/lu'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-surface overflow-hidden bg-mesh">
      <SideMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 border-b border-border bg-surface-2">
          <button onClick={() => setSidebarOpen(true)} className="text-text-secondary hover:text-text-primary transition-colors">
            <LuMenu size={22} />
          </button>
          <span className="font-display font-bold text-lg text-gradient">Trackify</span>
        </header>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
