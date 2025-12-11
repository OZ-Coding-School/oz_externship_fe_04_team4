import { useAccountsMeQuery } from '@/hooks/model/useAccountsMeQuery'
import type { AccountsMe } from '@/types/api'

type Role = AccountsMe['role']

export const useAuthRole = () => {
  const { data } = useAccountsMeQuery()

  const role: Role | null = data?.role ?? null
  const isAdmin = role === 'admin'
  const isStaff = role === 'staff'
  const isUser = role === 'user'

  return { role, isAdmin, isStaff, isUser }
}
