import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { UserDetailUser } from '@/pages/types/users'

export function useUserDetailQuery(userId?: number, isOpen?: boolean) {
  return useFetchQuery<UserDetailUser>({
    queryKey: ['user-detail', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId ?? 0),
    enabled: Boolean(userId && isOpen),
  })
}
