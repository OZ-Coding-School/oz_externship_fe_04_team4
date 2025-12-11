import { authFetch } from '@/api/client'
import type { AccountsMe } from '@/types/api'

export async function getAccountsMe(): Promise<AccountsMe> {
  const res = await authFetch(`/accounts/me`, {
    method: 'GET',
  })

  return res.json()
}
