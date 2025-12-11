import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { AccountsMe } from '@/types/api'

export async function getAccountsMe(): Promise<AccountsMe> {
  const res = await authFetch(`${SERVICE_URLS.ACCOUNTS.ME}`)

  return res.json()
}
