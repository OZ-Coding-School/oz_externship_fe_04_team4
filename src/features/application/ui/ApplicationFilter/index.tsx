import { type Dispatch, type SetStateAction } from 'react'

import { ApplicationSearchInput } from '@/components/common/filter'
import { ApplicationFilterSelect } from '@/components/common/filter/ApplicationFilterSelect'
import type { ApplicationsStatus, SortType } from '@/types'
import type { GetAdminApplicationQuery } from '@/types/api/query'

type ApplicationFilterProps = {
  setQueryParams: Dispatch<SetStateAction<GetAdminApplicationQuery>>
  queryParams: GetAdminApplicationQuery
}

export default function ApplicationFilter({
  setQueryParams,
  queryParams,
}: ApplicationFilterProps) {
  const searchConfig = {
    label: '검색',
    placeholder: '공고명, 지원자 닉네임, 이메일 검색 후 엔터',
    value: queryParams.search,
    onChange: (value: string) =>
      setQueryParams((prev) => ({ ...prev, search: value })),
  }

  const application = {
    label: '지원 상태',
    options: [
      { label: '전체', value: '' },
      { label: '승인', value: 'ACCEPTED' },
      { label: '검토중', value: 'PENDING' },
      { label: '거절', value: 'REJECTED' },
      { label: '취소', value: 'CANCELED' },
    ],
    value: queryParams.status,
    onChange: (value: ApplicationsStatus) =>
      setQueryParams((prev) => ({ ...prev, status: value })),
  }
  const sort = {
    label: '정렬',
    options: [
      { label: '최신순', value: 'latest' },
      { label: '오래된순', value: 'oldest' },
    ],
    value: queryParams.sort,
    onChange: (value: SortType) =>
      setQueryParams((prev) => ({ ...prev, sort: value })),
  }

  return (
    <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4 bg-white">
        <ApplicationSearchInput
          label={searchConfig.label}
          labelClassName="font-medium"
          placeholder={searchConfig.placeholder}
          value={searchConfig.value}
          onChange={searchConfig.onChange}
          inputClassName="text-sm"
        />

        <ApplicationFilterSelect
          label={application.label}
          className="flex flex-col gap-2"
          labelClassName="font-medium text-sm text-[#374151]"
          selectClassName="h-[38px] border-[#D1D5DB] px-3 py-2 focus:border-[#D1D5DB] focus:ring-0"
          options={application.options}
          value={application.value}
          onChange={application.onChange}
        />
        <ApplicationFilterSelect
          label={sort.label}
          className="flex flex-col gap-2"
          labelClassName="font-medium text-sm text-[#374151]"
          selectClassName="h-[38px] border-[#D1D5DB] px-3 py-2 focus:border-[#D1D5DB] focus:ring-0"
          options={sort.options}
          value={sort.value}
          onChange={sort.onChange}
        />
      </div>
    </div>
  )
}
