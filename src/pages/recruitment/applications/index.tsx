import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import { Table, type PaginationResponse } from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { ApplicationColumns } from '@/features/application/columns'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { ApplicationsListResults } from '@/mocks/types/accounts'
import { StudyGroupDetailModal } from '@/pages/study/groups/StudyGroupDetailModal'

type Application = ApplicationsListResults
export default function ApplicationManagementPage() {
  const [filters, setFilters] = useState<{
    search: string
    page: number
    status: string
    sort: string
  }>({
    search: '',
    page: 1,
    status: '',
    sort: 'latest',
  })
  const [selectedApplication, setSelectedApplication] = useState<number | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<Application>
  >({
    queryKey: ['applications', filters],
    url: SERVICE_URLS.APPLICATIONS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      sort: filters.sort,
    },
  })

  const handleRowClick = (application: Application) => {
    setSelectedApplication(application.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedApplication(null)
  }
  return (
    <>
      <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '공고명, 지원자 닉네임, 이메일 검색...',
            value: filters.search,
            onChange: (value) =>
              setFilters((prev) => ({ ...prev, search: value, page: 1 })),
          }}
          filters={[
            {
              label: '지원 상태',
              options: [
                { label: '승인', value: 'ACCEPTED' },
                { label: '대기', value: 'PENDING' },
                { label: '거절', value: 'REJECTED' },
                { label: '취소됨', value: 'CANCELED' },
              ],
              value: filters.status,
              onChange: (value) =>
                setFilters((prev) => ({ ...prev, status: value, page: 1 })),
            },
            {
              label: '정렬',
              options: [
                { label: '최신순', value: 'latest' },
                { label: '오래된순', value: 'oldest' },
              ],
              value: filters.sort,
              onChange: (value) =>
                setFilters((prev) => ({ ...prev, sort: value, page: 1 })),
            },
          ]}
        />
      </div>
      <Table
        columns={ApplicationColumns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      />
      <StudyGroupDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studyGroupId={selectedApplication}
      />
    </>
  )
}
