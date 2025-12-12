import { useAuthStore } from '@/store/authStore'

type AdminFetchOptions = Omit<RequestInit, 'headers'> & {
  skipAuth?: boolean
  headers?: Record<string, string>
}

export async function authFetch(path: string, options: AdminFetchOptions = {}) {
  const { skipAuth, headers, ...rest } = options

  const accessToken = useAuthStore.getState().accessToken

  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (!skipAuth && accessToken) {
    mergedHeaders.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(`${path}`, {
    ...rest,
    headers: mergedHeaders,
  })

  return res
}
