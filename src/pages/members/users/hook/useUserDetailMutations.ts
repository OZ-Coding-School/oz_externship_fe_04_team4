import { useQueryClient } from '@tanstack/react-query'

import { handleApiError } from '@/api/handleApiError'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'

export function useUserDetailMutations(userId: number, onClose: () => void) {
  const queryClient = useQueryClient()

  const updateMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId),
    method: 'patchForm',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (e) => handleApiError(e, USER_API_ERROR_MESSAGE.edit),
  })

  const deleteMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DELETE(userId),
    method: 'delete',
    onSuccess: () => {
      alert('회원 삭제가 완료되었습니다.')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (e) => handleApiError(e, USER_API_ERROR_MESSAGE.delete),
  })

  return {
    updateMutation,
    deleteMutation,
  }
}
