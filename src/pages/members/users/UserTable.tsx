import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import { Table } from '@/components/common/table'
import { useTableFilters } from '@/hooks'
import { USER_COLUMNS } from '@/pages/members/users/constants/userColumns'
import {
  ROLE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '@/pages/members/users/constants/userFilters'
import { useUserTable } from '@/pages/members/users/hook/useUserTable'
import { UserDetailModal } from '@/pages/members/users/UserDetailModal'
import type { UserApiRawItem } from '@/pages/types/users'

export default function UserTable() {
  const {
    filters,
    sortConfig,
    updateSearch,
    updateFilter,
    updatePage,
    handleSort,
  } = useTableFilters({
    initialFilters: {
      search: '',
      page: 1,
      status: '',
      role: '',
      sort: 'id_asc',
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const { data, isLoading, error, refetch } = useUserTable(filters)

  const handleRowClick = (user: UserApiRawItem) => {
    setSelectedUser(user.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }
  const sortedResults = data?.results
    ? [...data.results].sort((a, b) => a.id - b.id)
    : []
  if (isLoading) return <div>Loading</div>
  return (
    <>
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-xs">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '이메일, 닉네임, 이름, ID 검색...',
            value: filters.search,
            onChange: updateSearch,
          }}
          filters={[
            {
              label: '상태',
              options: STATUS_FILTER_OPTIONS,
              value: filters.status,
              onChange: (value) => updateFilter('status', value),
              placeholder: '상태',
            },
            {
              label: '권한',
              options: ROLE_FILTER_OPTIONS,
              value: filters.role,
              onChange: (value) => updateFilter('role', value),
              placeholder: '권한',
            },
          ]}
        />
      </div>
      <Table
        columns={USER_COLUMNS}
        response={
          data
            ? { ...data, results: sortedResults }
            : { count: 0, results: [], next: null, previous: null }
        }
        currentPage={filters.page}
        onPageChange={updatePage}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={selectedUser}
      />
    </>
  )
}
