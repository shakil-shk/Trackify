import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, UserContext } from './context/UserContext'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'

// Spinner shown while the initial auth check runs
const LoadingScreen = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-text-muted text-sm font-display">Loading Trackify…</p>
    </div>
  </div>
)

// Wraps routes that require auth
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext)
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

// Wraps routes that should NOT be accessible when logged in
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext)
  if (loading) return <LoadingScreen />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
    <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
)

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </UserProvider>
)

export default App
