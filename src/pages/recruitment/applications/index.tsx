import { useState } from 'react'

import ApplicationDetailModal from '@/features/application/ui/ApplicationDetailModal'
import ApplicationFilter from '@/features/application/ui/ApplicationFilter'

// type Application = ApplicationsListResults

export default function ApplicationManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // const handleRowClick = () => {
  //   setIsModalOpen(true)
  // }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // const [filters, setFilters] = useState<{
  //   search: string
  //   page: number
  //   status: string
  //   sort: string
  // }>({
  //   search: '',
  //   page: 1,
  //   status: '',
  //   sort: 'latest',
  // })

  // const { data, isLoading, error, refetch } = useFetchQuery<
  //   PaginationResponse<Application>
  // >({
  //   queryKey: ['applications', filters],
  //   url: SERVICE_URLS.APPLICATIONS.LIST,
  //   params: {
  //     page_size: 10,
  //     ...filters,
  //   },
  // })

  return (
    <>
      <ApplicationDetailModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />

      <ApplicationFilter />

      {/* <Table
        columns={ApplicationColumns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      /> */}
    </>
  )
}
