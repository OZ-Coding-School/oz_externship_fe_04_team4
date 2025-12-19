import { useQueryClient, type UseMutationOptions } from '@tanstack/react-query'

import { QUERY_KEY } from '@/config/queyrKey'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { useAuthStore } from '@/store/authStore'
import type { CreateLoginBody, CreateLoginResponse } from '@/types/api/response'

export function useLoginMutation(
  options?: UseMutationOptions<CreateLoginResponse, Error, CreateLoginBody>
) {
  const queryClient = useQueryClient()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutateQuery<CreateLoginResponse, CreateLoginBody>({
    url: SERVICE_URLS.ACCOUNTS.LOGIN,
    method: 'post',
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      setAuth(data)

      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ACCOUNTS.ME })

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context, mutation)
      }
    },
  })
}
