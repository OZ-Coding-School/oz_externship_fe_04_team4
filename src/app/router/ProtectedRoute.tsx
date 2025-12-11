import { Navigate, Outlet, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'
import { useAuthStore } from '@/store/authStore'

export function ProtectedRoute() {
  const location = useLocation()

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn)
    return (
      <Navigate
        to={ROUTE_PATHS.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    )

  return <Outlet />
}
