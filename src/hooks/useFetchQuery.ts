import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { AxiosError } from 'axios'

import { axiosInstance } from '@/api/axios'

interface UseFetchQueryParams<
  TData,
  TError = AxiosError,
  TParams extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<UseQueryOptions<TData, TError>, 'queryFn'> {
  url: string
  params?: TParams
}

export function useFetchQuery<TData>({
  queryKey,
  url,
  params,
  ...options
}: UseFetchQueryParams<TData>) {
  const query = useQuery<TData, AxiosError>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await axiosInstance.get<TData>(url, { params })

      return response.data
    },
    ...options,
  })

  return query
}
