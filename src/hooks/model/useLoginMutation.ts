import { useMutation } from '@tanstack/react-query'

import {
  loginAdmin,
  type LoginRequest,
  type LoginResponse,
} from '@/api/adminAuth'
import { useAuthStore } from '@/store/authStore'

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      setAuth(data)
    },
  })
}
