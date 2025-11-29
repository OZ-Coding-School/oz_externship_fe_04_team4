import clsx from 'clsx'
import { ListFilter } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { FilterSelect, SearchInput } from '@/components/common/filter'
import { useRecruitmentModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentSearchStore } from '@/store/recruitment/useRecruitmentSearchStore'
import { ueeRecruitmentStatusStore } from '@/store/recruitment/useRecruitmentStatusStore'

const LABEL_STYLE = 'text-sm text-[#374151]'
const BOX_STYLE = 'w-[256px] h-9 focus:ring-0 focus:border-0'

export default function RecruitmentFilter() {
  const { openModal } = useRecruitmentModalStore()
  const { keyword, setKeyword } = useRecruitmentSearchStore()
  const { status, setStatus } = ueeRecruitmentStatusStore()

  return (
    <>
      <SearchInput
        className="mr-4"
        labelClassName={LABEL_STYLE}
        searchClassName={BOX_STYLE}
        inputClassName="outline-0 focus:ring-0 focus:border-gray-300"
        placeholder="공고명 검색"
        value={keyword}
        onChange={setKeyword}
      />

      <FilterSelect
        className="mr-4"
        key={status}
        label="공고 상태"
        labelClassName={LABEL_STYLE}
        selectClassName={BOX_STYLE}
        options={[
          { label: '모집중', value: 'false' },
          { label: '마감', value: 'true' },
        ]}
        value={status}
        onChange={setStatus}
        placeholder="전체"
      />

      <div className="flex flex-col">
        <div
          className={twMerge(clsx('mb-2 text-sm font-medium text-[##374151]'))}
        >
          태그 필터
        </div>
        <div
          onClick={openModal}
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
    </>
  )
}
