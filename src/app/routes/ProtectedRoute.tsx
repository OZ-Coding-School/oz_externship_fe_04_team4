import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
