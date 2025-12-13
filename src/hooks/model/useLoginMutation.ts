import { type UseMutationOptions } from '@tanstack/react-query'

import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { useAuthStore } from '@/store/authStore'
import type { CreateLoginResponse } from '@/types/api/response'

type CreateLoginBody = {
  email: string
  password: string
}

export function useLoginMutation(
  options?: UseMutationOptions<CreateLoginResponse, Error, CreateLoginBody>
) {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutateQuery<CreateLoginResponse, CreateLoginBody>({
    url: SERVICE_URLS.LOGIN,
    method: 'post',
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      setAuth(data)

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context, mutation)
      }
    },
  })
}
