import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Table } from '@/components/common/table'
import { getAdminApplication } from '@/features/application/api'
import { ApplicationColumns } from '@/features/application/columns'
import ApplicationDetailModal from '@/features/application/ui/ApplicationDetailModal'
import ApplicationFilter from '@/features/application/ui/ApplicationFilter'
import { useApplicationDetailModalStore } from '@/store/application/useApplicationModalStore'
import type { GetAdminApplicationParams } from '@/types'
import type { ApplicationsList, ApplicationsListResults } from '@/types/api'

export default function ApplicationManagementPage() {
  const { openDetailModal } = useApplicationDetailModalStore()

  const [queryParams, setQueryParams] = useState<GetAdminApplicationParams>({
    search: '',
    page: 1,
    page_size: 10,
    status: 'all',
    sort: 'latest',
  })

  const { data, isLoading, error, refetch } = useQuery<ApplicationsList>({
    queryKey: ['applications', queryParams],
    queryFn: () => getAdminApplication(queryParams),
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
