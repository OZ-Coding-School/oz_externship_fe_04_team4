import { useState } from 'react'

import { Table } from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { ApplicationColumns } from '@/features/application/columns'
import ApplicationDetailModal from '@/features/application/ui/ApplicationDetailModal'
import ApplicationFilter from '@/features/application/ui/ApplicationFilter'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useApplicationDetailModalStore } from '@/store/application/useApplicationModalStore'
import type { GetAdminApplicationQuery } from '@/types/api/query'
import type {
  ApplicationsListResults,
  GetApplicationsListResponse,
} from '@/types/api/response'

export default function ApplicationManagementPage() {
  const { openDetailModal } = useApplicationDetailModalStore()

  const [queryParams, setQueryParams] = useState<GetAdminApplicationQuery>({
    page: 1,
    page_size: 10,
    sort: 'latest',
  })

  const { data, isLoading, error, refetch } =
    useFetchQuery<GetApplicationsListResponse>({
      queryKey: ['applications', queryParams],
      url: SERVICE_URLS.APPLICATIONS.LIST,
      params: queryParams,
    })
  return (
    <>
      <ApplicationDetailModal />

      <ApplicationFilter
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />

      <Table
        columns={ApplicationColumns}
        response={
          data ?? {
            count: 0,
            next: null,
            previous: null,
            results: [],
          }
        }
        currentPage={queryParams.page}
        onPageChange={(page) => setQueryParams((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={(row: ApplicationsListResults) => openDetailModal(row.id)}
      />
    </>
  )
}
