// useWithdrawalsTable.ts
import { useEffect } from 'react'

import { handleApiError } from '@/api/handleApiError'
import type { PaginationResponse } from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { WITHDRAWALS_API_ERROR_MESSAGE } from '@/pages/members/withdrawals/api/withdrawalsErrorMessageMap'

import type { WithdrawalsApiRawItem } from '@/pages/types/users'

export function useWithdrawalsTable(filters: {
  page: number
  search?: string
  role?: string
  reason?: string
  sort?: string
}) {
  const query = useFetchQuery<PaginationResponse<WithdrawalsApiRawItem>>({
    queryKey: ['Withdraw-list', filters],
    url: SERVICE_URLS.WITHDRAWALS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      role: filters.role,
      reason: filters.reason,
      sort: filters.sort,
    },
  })

  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, WITHDRAWALS_API_ERROR_MESSAGE.list)
    }
  }, [query.error])

  return query
}
