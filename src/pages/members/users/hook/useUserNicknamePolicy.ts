import { useMemo } from 'react'

import { useCheckNickname } from '@/hooks/useCheckNickname'

export function useUserNicknamePolicy(
  nickname: string,
  originalNickname: string,
  isEditMode: boolean
) {
  const nicknameChanged = nickname !== originalNickname
  const hasNickname = nickname.trim().length > 0

  const nicknameRegex = /^[A-Za-z가-힣0-9]{1,10}$/
  const isNicknameValid = nicknameRegex.test(nickname)

  const nicknameToCheck = useMemo(() => {
    if (!isEditMode) return ''
    if (!hasNickname) return ''
    if (!nicknameChanged) return ''
    if (!isNicknameValid) return ''
    return nickname
  }, [nickname, isEditMode, hasNickname, nicknameChanged, isNicknameValid])
  const query = useCheckNickname(nicknameToCheck)

  return {
    nicknameChanged,
    isNicknameValid,
    ...query,
  }
}
