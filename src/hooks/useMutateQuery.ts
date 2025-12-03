import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { axiosInstance } from '@/lib/axios'

interface UseMutateQueryParams<TData, TVariables, TError = Error>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  url: string
  method?: 'post' | 'patch' | 'put' | 'delete'
}

export function useMutateQuery<TData, TVariables = unknown>({
  url,
  method = 'patch',
  ...options
}: UseMutateQueryParams<TData, TVariables>) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await axiosInstance.request<TData>({
        url,
        method,
        data: variables,
      })
      return response.data
    },
    ...options,
  })
}
