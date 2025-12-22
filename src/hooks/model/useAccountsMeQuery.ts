import { QUERY_KEY, SERVICE_URLS } from '@/config'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useAuthStore } from '@/store/authStore'
import type { GetAccountsMeResponse } from '@/types/api/response'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)
  const authVersion = useAuthStore((s) => s.authVersion)

  return useFetchQuery<GetAccountsMeResponse>({
    queryKey: QUERY_KEY.ACCOUNTS.ME_AUTH(authVersion),
    url: SERVICE_URLS.ACCOUNTS.ME,
    enabled: Boolean(accessToken),
  })
}
