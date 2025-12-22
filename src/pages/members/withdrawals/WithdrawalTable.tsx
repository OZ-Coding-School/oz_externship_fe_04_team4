import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import { Table } from '@/components/common/table/Table'
import { useTableFilters } from '@/hooks'
import { WITHDRAWAL_COLUMNS } from '@/pages/members/withdrawals/constants/withdrawalColumns'
import {
  REASON_FILTER_OPTIONS,
  ROLE_FILTER_OPTIONS,
} from '@/pages/members/withdrawals/constants/withdrawalFilters'
import { useWithdrawalsTable } from '@/pages/members/withdrawals/hook/useWithdrawalsTable'
import { WithdrawalDetailModal } from '@/pages/members/withdrawals/WithdrawalDetailModal'
import type { WithdrawalsApiRawItem } from '@/pages/types/users'
import 'dayjs/locale/ko'

export default function WithdrawalTable() {
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
      reason: '',
      sort: 'id_asc',
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const { data, isLoading, error, refetch } = useWithdrawalsTable(filters)
  const handleRowClick = (user: WithdrawalsApiRawItem) => {
    setSelectedUser(user.id)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }
  return (
    <>
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-xs">
        <FilterBar
          searchConfig={{
            label: '검색',
            value: filters.search,
            onChange: updateSearch,
            placeholder: '탈퇴요청 ID,이메일,이름 검색...',
          }}
          filters={[
            {
              label: '권한',
              options: ROLE_FILTER_OPTIONS,
              value: filters.role,
              onChange: (value) => updateFilter('role', value),
              placeholder: '권한 선택',
            },
            {
              label: '탈퇴사유',
              options: REASON_FILTER_OPTIONS,
              value: filters.reason,
              onChange: (value) => updateFilter('reason', value),
              placeholder: '탈퇴사유 선택',
            },
          ]}
        />
      </div>
      <Table
        columns={WITHDRAWAL_COLUMNS}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={updatePage}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <WithdrawalDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        withdrawalId={selectedUser}
      />
    </>
  )
}
