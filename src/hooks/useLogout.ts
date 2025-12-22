import { useQueryClient } from '@tanstack/react-query'

import { useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'
import { useAuthStore } from '@/store/authStore'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearAuthHard = useAuthStore((s) => s.clearAuthHard)

  return () => {
    if (!confirm('로그아웃 하시겠습니까?')) return

    clearAuthHard()
    queryClient.clear()
    navigate(ROUTE_PATHS.LOGIN, { replace: true })
  }
}
