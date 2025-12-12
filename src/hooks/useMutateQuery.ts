import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { axiosInstance } from '@/api/axios'

type HttpMethod = 'post' | 'patch' | 'put' | 'delete' | 'postForm'

interface UseMutateQueryParams<TData, TVariables, TError = Error> extends Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
> {
  url: string
  method?: HttpMethod
}

export function useMutateQuery<TData, TVariables = unknown>({
  url,
  method = 'patch',
  ...options
}: UseMutateQueryParams<TData, TVariables>) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      switch (method) {
        case 'post':
          return (await axiosInstance.post<TData>(url, variables)).data

        case 'patch':
          return (await axiosInstance.patch<TData>(url, variables)).data

        case 'put':
          return (await axiosInstance.put<TData>(url, variables)).data

        case 'delete':
          return (
            await axiosInstance.delete<TData>(url, {
              data: variables,
            })
          ).data

        case 'postForm':
          return (await axiosInstance.postForm<TData>(url, variables)).data

        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    },
    ...options,
  })
}
