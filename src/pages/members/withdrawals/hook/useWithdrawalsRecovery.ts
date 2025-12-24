import { useQueryClient } from '@tanstack/react-query'

import { handleApiError } from '@/api/handleApiError'
import { SERVICE_URLS } from '@/config'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'

export function useWithdrawalsRecovery(userId: number) {
  const queryClient = useQueryClient()

  return useMutateQuery<void, void>({
    url: SERVICE_URLS.ACCOUNTS.ACTIVATE(userId),
    method: 'patch',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Withdraw-list'],
        exact: false,
      })
      queryClient.invalidateQueries({
        queryKey: ['users-list'],
        exact: false,
      })
    },
    onError: (error) => handleApiError(error, USER_API_ERROR_MESSAGE.recovery),
  })
}
