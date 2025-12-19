import { useEffect, useState } from 'react'

import { SERVICE_URLS } from '@/config'
import { useFetchQuery } from '@/hooks/useFetchQuery'

export function useCheckNickname(nickname: string) {
  const [debouncedNickname, setDebouncedNickname] = useState(nickname)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNickname(nickname)
    }, 500)

    return () => clearTimeout(timer)
  }, [nickname])
  const query = useFetchQuery<{ detail: string }>({
    queryKey: ['check-nickname', debouncedNickname],
    url: SERVICE_URLS.ACCOUNTS.CHECK_NICKNAME,
    params: { nickname: debouncedNickname },
    enabled: debouncedNickname.trim().length > 0,
    retry: false,
  })

  return {
    ...query,
    data: query.data ?? null,
  }
}
