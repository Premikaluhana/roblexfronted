import { Navigate, Route, Routes } from 'react-router-dom'
import { Admin, AdminLogin, Dashboard, Home } from '../pages'
import ProtectedRoute from '../components/ProtectedRoute';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import OnboardingStepper from '../components/onboarding';
import Settings from '../pages/Settings';
const Navigator = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      
      {/* Protected admin routes */}
      <Route
        path='/admin'
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />
      
      {/* Protected user routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingStepper />
          </ProtectedRoute>
        }
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Navigator
