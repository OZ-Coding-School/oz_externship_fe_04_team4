import { useQuery } from '@tanstack/react-query'

import { getAccountsMe } from '@/api/getAccountsMe'
import { useAuthStore } from '@/store/authStore'
import type { AccountsMe } from '@/types/api'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery<AccountsMe>({
    queryKey: ['account', 'me'],
    queryFn: getAccountsMe,
    enabled: !!accessToken,
  })
}
