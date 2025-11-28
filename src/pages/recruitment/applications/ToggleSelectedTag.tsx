import clsx from 'clsx'
import { ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { FilterSelect, SearchInput } from '@/components/common/filter'
import ApplicationsButton from '@/components/common/filter/applications/applicationsButton'
import ApplicationSearch from '@/components/common/filter/applications/applicationSearch'
import GetSelectedTags from '@/components/common/filter/applications/getSelectedTags'
import ToggleSelectedTag from '@/components/common/filter/applications/toggleSelectedTag'
import Modal from '@/components/common/Modal'

const LABEL_STYLE = 'text-sm text-[#374151]'
const BOX_STYLE = 'w-[256px] h-9 focus:ring-0 focus:border-0'

export default function ApplicationManagementPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
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
    <div className="space-y-4 rounded-lg bg-white p-6">
      <Modal
        isOpen={open}
        title="태그 필터 선택"
        contentClassName="p-0"
        footer={<ApplicationsButton setOpen={setOpen} />}
        footerClassName="p-0"
        topCloseButton
        onClose={() => setOpen(false)}
      >
        <ApplicationSearch />
        <GetSelectedTags />
        <ToggleSelectedTag />
      </Modal>

      <div className="flex items-center">
        <SearchInput
          className="mr-4"
          labelClassName={LABEL_STYLE}
          searchClassName={BOX_STYLE}
          inputClassName="outline-0 focus:ring-0 focus:border-gray-300"
          placeholder="공고명 검색"
          value={search}
          onChange={setSearch}
        />
        <FilterSelect
          className="mr-4"
          key={status}
          label="공고 상태"
          labelClassName={LABEL_STYLE}
          selectClassName={BOX_STYLE}
          options={[
            { label: '모집중', value: 'open' },
            { label: '마감', value: 'close' },
          ]}
          value={status}
          onChange={setStatus}
          placeholder="전체"
        />
        <div className="flex flex-col">
          <div
            className={twMerge(
              clsx('mb-2 text-sm font-medium text-[##374151]')
            )}
          >
            태그 필터
          </div>
          <div
            onClick={() => setOpen(true)}
            className={twMerge(
              clsx(
                'flex cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-3 py-2',
                BOX_STYLE
              )
            )}
          >
            <div className="text-sm text-[#374151]">태그 입력</div>
            <ListFilter className="w-4 text-[#9CA3AF]" />
          </div>
        </div>
      </div>
    </div>
  )
}
