import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { checkNicknameAPI } from '@/api/checkNickname'

export function useCheckNickname(nickname: string) {
  const [debouncedNickname, setDebouncedNickname] = useState(nickname)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNickname(nickname)
    }, 500)

    return () => clearTimeout(timer)
  }, [nickname])
  return useQuery({
    queryKey: ['check-nickname', debouncedNickname],
    queryFn: () => checkNicknameAPI(debouncedNickname),
    enabled: debouncedNickname.trim().length > 0,
    retry: false,
    select: (data) => data,
  })
}
