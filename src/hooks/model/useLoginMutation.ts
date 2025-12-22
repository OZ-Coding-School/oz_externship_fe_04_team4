import { useQueryClient, type UseMutationOptions } from '@tanstack/react-query'

import { QUERY_KEY, SERVICE_URLS } from '@/config'
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

      queryClient.removeQueries({
        queryKey: QUERY_KEY.ACCOUNTS.ME,
        exact: false,
      })

      options?.onSuccess?.(data, variables, context, mutation)
    },
  })
}
