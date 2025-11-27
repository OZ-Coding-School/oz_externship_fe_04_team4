import { useMutation } from '@tanstack/react-query'

import { loginAdmin, type LoginRequest, type LoginResponse } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<LoginResponse, Error, LoginRequest>({
    // 로그인 작업할 건데, loginAdmin(variables)함수를 mutation으로 쓸거야.
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      // 로그인 성공 시 토큰 + 유저 상태 저장
      setAuth(data)
    },
  })
}
