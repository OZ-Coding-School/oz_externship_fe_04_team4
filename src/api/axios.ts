import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

import { API_URL, SERVICE_URLS } from '@/config'
import { useAuthStore } from '@/store/authStore'

function redirectToLogin() {
  const loginPath = '/'
  if (window.location.pathname === loginPath) return

  const from = encodeURIComponent(
    window.location.pathname + window.location.search
  )
  window.location.replace(`${loginPath}?from=${from}`)
}

const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const token = useAuthStore.getState().accessToken
  if (!token) {
    throw new AxiosError('토큰이 없어 refresh 불가')
  }

  const res = await refreshClient.post<{ access_token: string }>(
    SERVICE_URLS.ACCOUNTS.REFRESH,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data.access_token
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((config) => {
  const isAuthFree =
    config.url?.includes(SERVICE_URLS.ACCOUNTS.LOGIN) ||
    config.url?.includes(SERVICE_URLS.ACCOUNTS.REFRESH)

  if (isAuthFree) return config

  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const originalConfig = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (!originalConfig) return Promise.reject(error)

    const url = originalConfig.url ?? ''

    const isAuthFree =
      url.includes(SERVICE_URLS.ACCOUNTS.LOGIN) ||
      url.includes(SERVICE_URLS.ACCOUNTS.REFRESH)

    if (status !== 401 || isAuthFree) return Promise.reject(error)

    if (originalConfig._retry) {
      useAuthStore.getState().clearAuth()
      redirectToLogin()
      return Promise.reject(error)
    }
    originalConfig._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }

      const newAccessToken = await refreshPromise
      useAuthStore.getState().setAccessToken(newAccessToken)

      originalConfig.headers = {
        ...(originalConfig.headers ?? {}),
        Authorization: `Bearer ${newAccessToken}`,
      }

      return axiosInstance(originalConfig)
    } catch (refreshError) {
      useAuthStore.getState().clearAuth()
      redirectToLogin()
      return Promise.reject(refreshError)
    }
  }
)
