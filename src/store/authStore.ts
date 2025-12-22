import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AUTH_PERSIST_KEY } from '@/config'
import type { CreateLoginResponse } from '@/types/api/response'

type AuthState = {
  accessToken: string | null
  isLoggedIn: boolean
  setAuth: (payload: CreateLoginResponse) => void
  setAccessToken: (token: string | null) => void
  clearAuth: () => void
}

// 로그인 성공 결과를 store에 저장
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,

      setAuth: (payload) =>
        set({
          accessToken: payload.access_token,
          isLoggedIn: true,
        }),
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: Boolean(token),
        }),
      clearAuth: () => {
        set({
          accessToken: null,
          isLoggedIn: false,
        })
      },
    }),
    {
      name: AUTH_PERSIST_KEY,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
