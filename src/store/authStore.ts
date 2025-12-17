import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CreateLoginResponse } from '@/types/api/response'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: CreateLoginResponse['user'] | null
  clearAuth: () => void
  isLoggedIn: boolean
  setAuth: (payload: CreateLoginResponse) => void
}

// 로그인 성공 결과를 store에 저장
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLoggedIn: false,
      setAuth: (payload) =>
        set({
          accessToken: payload.access_token,
          refreshToken: payload.refresh_token,
          user: payload.user,
          isLoggedIn: true,
        }),
      clearAuth: () => {
        set({
          accessToken: null,
          user: null,
          isLoggedIn: false,
        })
        try {
          sessionStorage.removeItem('admin-auth')
        } catch (error) {
          alert(error)
        }
      },
    }),
    { name: 'admin-auth' }
  )
)
