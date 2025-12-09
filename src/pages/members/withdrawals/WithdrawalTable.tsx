import axios from 'axios'
import dayjs from 'dayjs'
import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import type { PaginationResponse } from '@/components/common/table'
import { Table } from '@/components/common/table/Table'
import { REASON_LABEL, type ReasonKey } from '@/config/reason'
import { type RoleType } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { getRole } from '@/pages/members/withdrawals/utils/getRole'
import { WithdrawalDetailModal } from '@/pages/members/withdrawals/WithdrawalDetailModal'
import type { filtersProps } from '@/pages/types/withdraw'
import 'dayjs/locale/ko'

export interface WithdrawalsApiRawItem {
  id: number
  email: string
  name: string
  role: RoleType
  birthday: string
  reason: string
  withdrawn_at: string
}

export default function WithdrawalTable() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [role, setRole] = useState('')
  const [filters, setFilters] = useState<filtersProps>({
    search: '',
    page: 1,
    status: '',
    sort: '',
    role: '',
  })

  const [sortConfig, setSortConfig] = useState<{
    key: string
    value: string
    direction: 'asc' | 'desc'
  } | null>(null)

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
      sort: filters.sort,
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const handleSort = (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => {
    setFilters((prev) => ({ ...prev, sort: sortValue, page: 1 }))
    setSortConfig({ key, value: sortValue, direction })
  }

  const columns = [
    { key: 'id', header: '탈퇴요청 ID', width: '100px' },
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
      width: '90px',
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

  const handleRowClick = (user: WithdrawalsApiRawItem) => {
    setSelectedUser(user.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(0)
  }

  if (isLoading) return <div>Loading</div>
  if (axios.isAxiosError(error)) {
    console.log(error.response?.status)
    console.log(error.response?.data)
    console.log(error.message)
  }
  return (
    <div className="space-y-4 p-6">
      <FilterBar
        searchConfig={{
          label: '검색',
          value: search,
          onChange: setSearch,
          placeholder: '이메일, 닉네임, 이름, ID 검색...',
        }}
        filters={[
          {
            label: '상태',
            options: [
              { label: '활성', value: 'active' },
              { label: '비활성', value: 'inactive' },
              { label: '탈퇴요청', value: 'withdrew' },
            ],
            value: status,
            onChange: setStatus,
            placeholder: '상태',
          },
          {
            label: '권한',
            options: [
              { label: '관리자', value: 'admin' },
              { label: '스태프', value: 'staff' },
              { label: '일반회원', value: 'user' },
            ],
            value: role,
            onChange: setRole,
            placeholder: '권한',
          },
        ]}
      />
      <div className="border-t border-gray-200" />
      <Table
        columns={columns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
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
        userId={selectedUser}
      />
    </div>
  )
}
