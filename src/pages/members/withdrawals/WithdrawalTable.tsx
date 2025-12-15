import dayjs from 'dayjs'
import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import type { Column, PaginationResponse } from '@/components/common/table'
import { Table } from '@/components/common/table/Table'
import { REASON_LABEL, type ReasonKey } from '@/config/reason'
import { type RoleType } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useTableFilters } from '@/hooks'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { getRole } from '@/pages/members/withdrawals/utils/getRole'
import { WithdrawalDetailModal } from '@/pages/members/withdrawals/WithdrawalDetailModal'
import type { WithdrawalsApiRawItem } from '@/pages/types/users'
import 'dayjs/locale/ko'

const COLUMNS: Column<WithdrawalsApiRawItem>[] = [
  {
    key: 'id',
    header: '탈퇴요청 ID',
    width: '130px',
    sortable: { asc: 'id_asc', desc: 'id_desc' },
  },
  { key: 'email', header: '이메일', width: '160px' },
  {
    key: 'name',
    header: '이름',
    width: '80px',
    sortable: { asc: 'name_asc', desc: 'name_desc' },
  },
  {
    key: 'role',
    header: '권한',
    width: '100px',
    render: (value: RoleType) => getRole(value),
  },
  {
    key: 'birthday',
    header: '생년월일',
    width: '110px',
  },
  {
    key: 'reason',
    header: '탈퇴사유',
    width: '160px',
    render: (value: ReasonKey) => REASON_LABEL[value],
  },
  {
    key: 'withdrawn_at',
    header: '탈퇴일시',
    width: '200px',
    render: (value: string) =>
      dayjs(value).locale('ko').format('YYYY. M. D. A h:mm:ss'),
    sortable: { asc: 'withdrawn_asc', desc: 'withdrawn_desc' },
  },
]

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

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<WithdrawalsApiRawItem>
  >({
    queryKey: ['Withdraw-list', filters],
    url: SERVICE_URLS.WITHDRAWALS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      role: filters.role,
      reason: filters.reason,
      sort: filters.sort,
    },
  })

  const handleRowClick = (user: WithdrawalsApiRawItem) => {
    setSelectedUser(user.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-4 p-6">
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
            options: [
              { label: '일반회원', value: 'user' },
              { label: '스태프', value: 'staff' },
              { label: '관리자', value: 'admin' },
            ],
            value: filters.role,
            onChange: (value) => updateFilter('role', value),
            placeholder: '권한 선택',
          },
          {
            label: '탈퇴사유',
            options: [
              { label: '더 이상 필요하지 않음', value: 'NO_LONGER_NEEDED' },
              { label: '흥미 감소', value: 'LACK_OF_INTEREST' },
              { label: '사용이 너무 어려움', value: 'TOO_DIFFICULT' },
              { label: '더 좋은 서비스 발견', value: 'FOUND_BETTER_SERVICE' },
              { label: '개인정보 우려', value: 'PRIVACY_CONCERNS' },
              { label: '서비스 품질 불만', value: 'POOR_SERVICE_QUALITY' },
              { label: '기술적 문제', value: 'TECHNICAL_ISSUES' },
              { label: '콘텐츠 부족', value: 'LACK_OF_CONTENT' },
              { label: '기타', value: 'OTHER' },
            ],
            value: filters.reason,
            onChange: (value) => updateFilter('reason', value),
            placeholder: '탈퇴사유 선택',
          },
        ]}
      />
      <div className="border-t border-gray-200" />
      <Table
        columns={COLUMNS}
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
    </div>
  )
}
