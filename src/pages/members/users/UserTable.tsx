import { useEffect, useState } from 'react'

import { handleApiError } from '@/api/handleApiError'
import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import type { RoleType } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { StatusType } from '@/config/status'
import { useTableFilters } from '@/hooks'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
import { UploadTest } from '@/pages/members/users/UploadTest'
import { UserDetailModal } from '@/pages/members/users/UserDetailModal'
import { getRole } from '@/pages/members/withdrawals/utils/getRole'
import { getStatus } from '@/pages/members/withdrawals/utils/getStatus'
import type { UserApiRawItem } from '@/pages/types/users'
import { formatDateTime } from '@/utils'

const COLUMNS: Column<UserApiRawItem>[] = [
  { key: 'id', header: '회원 ID', width: '100px' },
  { key: 'email', header: '이메일', width: '160px' },
  { key: 'nickname', header: '닉네임', width: '120px' },
  {
    key: 'name',
    header: '이름',
    width: '90px',
  },
  {
    key: 'birthday',
    header: '생년월일',
    width: '120px',
  },
  {
    key: 'role',
    header: '권한',
    width: '110px',
    render: (value: RoleType) => getRole(value),
  },
  {
    key: 'status',
    header: '상태',
    width: '110px',
    render: (value: StatusType) => getStatus(value),
  },
  {
    key: 'created_at',
    header: '가입일',
    width: '120px',
    render: (value: string) => formatDateTime(value),
  },
  {
    key: 'withdraw_at',
    header: '탈퇴요청일',
    width: '120px',
    render: (value: string) => formatDateTime(value),
  },
]

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

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<UserApiRawItem>
  >({
    queryKey: ['users-list', filters],
    url: SERVICE_URLS.ACCOUNTS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      role: filters.role,
      sort: filters.sort,
    },
  })

  console.log('data', data)

  useEffect(() => {
    if (error) {
      handleApiError(error, USER_API_ERROR_MESSAGE.list)
    }
  }, [error])

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
    <div className="space-y-4 p-6">
      <UploadTest />
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
            options: [
              { label: '활성', value: 'active' },
              { label: '비활성', value: 'inactive' },
              { label: '탈퇴요청', value: 'withdrew' },
            ],
            value: filters.status,
            onChange: (value) => updateFilter('status', value),
            placeholder: '상태',
          },
          {
            label: '권한',
            options: [
              { label: '관리자', value: 'admin' },
              { label: '스태프', value: 'staff' },
              { label: '일반회원', value: 'user' },
            ],
            value: filters.role,
            onChange: (value) => updateFilter('role', value),
            placeholder: '권한',
          },
        ]}
      />
      <div className="border-t border-gray-200" />
      <Table
        columns={COLUMNS}
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
    </div>
  )
}
