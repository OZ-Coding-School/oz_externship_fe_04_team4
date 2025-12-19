import { QUERY_KEY } from '@/config/queyrKey'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useAuthStore } from '@/store/authStore'
import type { GetAccountsMeResponse } from '@/types/api/response'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useFetchQuery<GetAccountsMeResponse>({
    queryKey: QUERY_KEY.ACCOUNTS.ME,
    url: SERVICE_URLS.ACCOUNTS.ME,
    enabled: Boolean(accessToken),
  })
}
