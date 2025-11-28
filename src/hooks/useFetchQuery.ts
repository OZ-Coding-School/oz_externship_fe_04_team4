import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { axiosInstance } from '@/lib/axios'

interface UseFetchQueryParams<TData, TError = Error>
  extends Omit<UseQueryOptions<TData, TError>, 'queryFn'> {
  url: string
  params?: Record<string, any>
}

export function useFetchQuery<TData>({
  queryKey,
  url,
  params,
  ...options
}: UseFetchQueryParams<TData>) {
  const query = useQuery<TData, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await axiosInstance.get<TData>(url, { params })
      return response.data
    },
    ...options,
  })

  return query
}
