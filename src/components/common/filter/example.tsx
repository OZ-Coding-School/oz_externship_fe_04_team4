import { useEffect, useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import ExampleTable from '@/components/common/table/example'

export default function ExampleFilter() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [role, setRole] = useState('')
  const [queryParams, setQueryParams] = useState({
    page: 1,
    page_size: 10,
    search: '',
    role: '',
    sort: '',
  })
  useEffect(() => {
    setQueryParams((prev) => {
      return { ...prev, search, role, status, page: 1 }
    })
  }, [search, status, role])

  return (
    <div className="space-y-4 p-6">
      {`queryParams: ${JSON.stringify(queryParams)}`}
      <FilterBar
        searchConfig={{
          // SearchInput의 label 기본값은 검색
          placeholder: '이메일, 닉네임, 이름, ID 검색...',
          value: search,
          onChange: setSearch,
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

      <ExampleTable />
    </div>
  )
}
