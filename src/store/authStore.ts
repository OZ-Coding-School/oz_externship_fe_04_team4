import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AUTH_PERSIST_KEY } from '@/config'
import type { CreateLoginResponse } from '@/types/api/response'

type AuthState = {
  accessToken: string | null
  isLoggedIn: boolean
  authVersion: number

  setAuth: (payload: CreateLoginResponse) => void
  setAccessToken: (token: string | null) => void

  bumpAuthVersion: () => void
  clearAuth: () => void
  clearAuthHard: () => void
}

// 로그인 성공 결과를 store에 저장
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      authVersion: 0,

      bumpAuthVersion: () => set((s) => ({ authVersion: s.authVersion + 1 })),

      setAuth: (payload) =>
        set((s) => ({
          accessToken: payload.access_token,
          isLoggedIn: true,
          authVersion: s.authVersion + 1,
        })),

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: Boolean(token),
        }),

      clearAuth: () => {
        set((s) => ({
          accessToken: null,
          isLoggedIn: false,
          authVersion: s.authVersion + 1,
        }))
      },

      clearAuthHard: () => {
        set((s) => ({
          accessToken: null,
          isLoggedIn: false,
          authVersion: s.authVersion + 1,
        }))

        try {
          sessionStorage.removeItem(AUTH_PERSIST_KEY)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('sessionStorage 삭제 실패', err)
        }
      },
    }),
    {
      name: AUTH_PERSIST_KEY,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
