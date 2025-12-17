import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useAuthStore } from '@/store/authStore'
import type { GetAccountsMeResponse } from '@/types/api/response'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useFetchQuery<GetAccountsMeResponse>({
    queryKey: ['account', 'me', accessToken],
    url: SERVICE_URLS.ACCOUNTS.ME,
    enabled: !!accessToken,
  })
}
