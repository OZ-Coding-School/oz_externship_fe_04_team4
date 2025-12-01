import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { FilterBar } from '@/components/common/filter'
import type { PaginationResponse } from '@/components/common/table'
import { Table } from '@/components/common/table/Table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { formatDateTime } from '@/utils'

export interface UserApiRawItem {
  id: number
  email: string
  nickname: string
  name: string
  birthday: string
  status: string
  role: string
  withdraw_at: string
  created_at: string
}

const ROLE = {
  USER: 'user',
  STAFF: 'staff',
  ADMIN: 'admin',
} as const

const ROLE_LABEL = {
  admin: '관리자',
  staff: '스태프',
  user: '일반회원',
} as const

const STATUS = {
  active: 'active',
  inactive: 'inactive',
  withdrew: 'withdrew',
} as const

const STATUS_LABEL = {
  active: '활성',
  inactive: '비활성',
  withdrew: '탈퇴요청',
} as const

export default function UserTable() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    setPage(1)
  }, [search, status, role])
  const mappedStatus = status === 'withdraw' ? 'withdrew' : status

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<UserApiRawItem>
  >({
    queryKey: ['users', page, search, mappedStatus, role],
    url: SERVICE_URLS.ACCOUNTS.LIST,
    params: {
      page,
      page_size: 10,
      search,
      status: mappedStatus,
      role,
    },
  })

  console.log('📌 API 응답:', data)
  const twClassName = (classes: ClassValue[]) => {
    return twMerge(clsx(classes))
  }
  const getRole = (role: string) => {
    const baseClass = 'inline-block px-2 py-1 text-xs rounded-[999px]'

    switch (role) {
      case ROLE.ADMIN:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#F3E8FF] text-[#6B21A8]'])}
          >
            {ROLE_LABEL.admin}
          </span>
        )
      case ROLE.STAFF:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#DBEAFE] text-[#1E40AF]'])}
          >
            {ROLE_LABEL.staff}
          </span>
        )

      case ROLE.USER:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#F3F4F6] text-[#1F2937]'])}
          >
            {ROLE_LABEL.user}
          </span>
        )

      default:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#F3F4F6] text-[#1F2937]'])}
          >
            {role}
          </span>
        )
    }
  }

  const getStatus = (status: string) => {
    const baseClass = 'inline-block px-2 py-1 text-xs rounded-[999px]'

    switch (status) {
      case STATUS.active:
        return (
          <span
            className={twClassName([
              baseClass,
              'text-state-permission-txt bg-[#DCFCE7]',
            ])}
          >
            {STATUS_LABEL.active}
          </span>
        )
      case STATUS.inactive:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#F3F4F6] text-[#1F2937]'])}
          >
            {STATUS_LABEL.inactive}
          </span>
        )

      case STATUS.withdrew:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#FEF9C3] text-[#854D0E]'])}
          >
            {STATUS_LABEL.withdrew}
          </span>
        )

      default:
        return (
          <span
            className={twClassName([baseClass, 'bg-[#F3F4F6] text-[#1F2937]'])}
          >
            {status}
          </span>
        )
    }
  }

  const columns = [
    { key: 'id', header: '회원 ID', width: '100px' },
    { key: 'email', header: '이메일', width: '160px' },
    { key: 'nickname', header: '닉네임', width: '120px' },
    {
      key: 'name',
      header: '이름',
      width: '90px',
      sortable: { asc: 'id_asc', desc: 'id_desc' },
    },
    {
      key: 'birthday',
      header: '생년월일',
      width: '120px',
      sortable: { asc: 'oldest', desc: 'latest' },
    },
    {
      key: 'role',
      header: '권한',
      width: '110px',
      render: (value: string) => getRole(value),
    },
    {
      key: 'status',
      header: '상태',
      width: '110px',
      render: (value: string) => getStatus(value),
    },
    {
      key: 'withdraw_at',
      header: '탈퇴요청일',
      width: '120px',
      render: (value: string) => formatDateTime(value),
    },
    {
      key: 'created_at',
      header: '가입일',
      width: '120px',
      render: (value: string) => formatDateTime(value),
    },
  ]

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
              { label: '탈퇴요청', value: 'withdraw' },
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
        currentPage={page}
        onPageChange={setPage}
        isLoading={isLoading}
        error={typeof error === 'string' ? error : error?.message}
        onRetry={refetch}
      />
    </div>
  )
}
