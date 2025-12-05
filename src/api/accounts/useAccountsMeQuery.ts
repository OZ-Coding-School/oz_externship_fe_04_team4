import { useQuery } from '@tanstack/react-query'

import { getAccountsMe } from '@/api/getAccountsMe'
import type { AccountsMe } from '@/mocks/types/accounts'
import { useAuthStore } from '@/store/authStore'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery<AccountsMe>({
    queryKey: ['account', 'me'],
    queryFn: getAccountsMe,
    enabled: !!accessToken,
  })
}
