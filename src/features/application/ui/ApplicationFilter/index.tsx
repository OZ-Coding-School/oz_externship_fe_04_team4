import { type Dispatch, type SetStateAction } from 'react'

import { ApplicationFilterSelect } from '@/components/common/filter/ApplicationFilterSelect'
import { ApplicationSearchInput } from '@/components/common/filter/ApplicationSearchInput'
import type { GetAdminApplicationParams } from '@/features/application/api/getAdminApplication'

type ApplicationFilterProps = {
  setQueryParams: Dispatch<SetStateAction<GetAdminApplicationParams>>
  queryParams: GetAdminApplicationParams
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
      { label: '승인', value: 'ACCEPTED' },
      { label: '검토중', value: 'PENDING' },
      { label: '거절', value: 'REJECTED' },
      { label: '취소', value: 'CANCELED' },
    ],
    value: queryParams.status,
    onChange: (value: string) =>
      setQueryParams((prev) => ({
        ...prev,
        status: value,
      })),
  }
  const sort = {
    label: '정렬',
    options: [
      { label: '최신순', value: 'latest' },
      { label: '오래된순', value: 'oldest' },
    ],
    value: queryParams.sort,
    onChange: (value: string) =>
      setQueryParams((prev) => ({
        ...prev,
        sort: value,
      })),
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
          key={application.label}
          label={application.label}
          labelClassName="font-medium"
          options={application.options}
          value={application.value}
          onChange={application.onChange}
          placeholder="전체"
        />
        <ApplicationFilterSelect
          key={sort.label}
          label={sort.label}
          labelClassName="font-medium"
          options={sort.options}
          value={sort.value}
          onChange={sort.onChange}
        />
      </div>
    </div>
  )
}
