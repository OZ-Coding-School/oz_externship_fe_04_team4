import type { RoleStatus } from '@/types/common.types'

export type CreateLoginResponse = {
  access_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    name: string
    role: RoleStatus
  }
}
