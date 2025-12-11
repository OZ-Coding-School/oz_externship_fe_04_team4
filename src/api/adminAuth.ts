import { authFetch } from '@/api/client'
import { ADMIN_TEXT } from '@/config/api'

export type LoginRequest = {
  email: string
  password: string
}
export type LoginResponse = {
  access_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    name: string
    role: 'admin' | 'staff' | 'user'
  }
}

export async function loginAdmin(body: LoginRequest): Promise<LoginResponse> {
  const res = await authFetch(`${ADMIN_TEXT}/login`, {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.error_detail ?? '로그인에 실패했습니다.')
  }

  return res.json()
}
