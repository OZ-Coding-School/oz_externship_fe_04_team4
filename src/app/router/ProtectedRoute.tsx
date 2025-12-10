import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuthStore } from '@/store/authStore'

export function ProtectedRoute() {
  const location = useLocation()

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn)
    return <Navigate to="/" state={{ from: location.pathname }} replace />

  return <Outlet />
}
