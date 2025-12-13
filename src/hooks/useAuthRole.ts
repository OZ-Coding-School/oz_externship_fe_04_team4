import { useAccountsMeQuery } from '@/hooks/model'
import type { GetAccountsMeResponse } from '@/types/api/response'

type Role = GetAccountsMeResponse['role']

export const useAuthRole = () => {
  const { data } = useAccountsMeQuery()

  const role: Role | null = data?.role ?? null
  const isAdmin = role === 'admin'
  const isStaff = role === 'staff'
  const isUser = role === 'user'

  return { role, isAdmin, isStaff, isUser }
}
