import { ListFilter, Search } from 'lucide-react'

import { useState, type KeyboardEvent } from 'react'

import { FilterSelect } from '@/components/common/filter'
import TagFilterPreview from '@/features/recruitment/ui/TagFilterPreview/TagFilterPreview'
import { tM } from '@/lib/twMerge'
import { useTagFilterModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentSearchStore } from '@/store/recruitment/useRecruitmentSearchStore'
import { ueeRecruitmentStatusStore } from '@/store/recruitment/useRecruitmentStatusStore'
import { useRecruitmentTagListStore } from '@/store/recruitment/useRecruitmentTagsStore'

const LABEL_STYLE = 'text-sm text-[#374151]'
const BOX_BASE_STYLE = 'h-[38px] w-[256px]'

export default function RecruitmentFilter() {
  const { openTagFilterModalModal } = useTagFilterModalStore()

  const [search, setSearch] = useState('')
  const { setKeyword } = useRecruitmentSearchStore()
  const { status, setStatus } = ueeRecruitmentStatusStore()
  const { selectedTagsResult } = useRecruitmentTagListStore()

  const handleSearchSubmit = () => {
    setKeyword(search.trim())
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  return (
    <div className="mb-6 space-y-4 rounded-lg bg-white p-6">
      <div className="flex items-center">
        <div className="mr-4 flex flex-col">
          <div
            className={
              'mb-2 cursor-default text-sm font-medium text-[##374151]'
            }
          >
            검색
          </div>
          <div
            className={tM(
              BOX_BASE_STYLE,
              'flex items-center rounded-lg border border-[#D1D5DB] px-3 py-2'
            )}
          >
            <Search className="mr-3 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="공고명 검색 후 엔터"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleKeyDown}
              className="h-5 text-sm outline-0"
            />
          </div>
        </div>

        <FilterSelect
          className="mr-4 flex flex-col gap-2"
          key={status}
          label="공고 상태"
          labelClassName={LABEL_STYLE}
          selectClassName={tM(
            BOX_BASE_STYLE,
            'focus:ring-0 focus:border-gray-300'
          )}
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
            className={
              'mb-2 cursor-default text-sm font-medium text-[##374151]'
            }
          >
            태그 필터
          </div>
          <div
            onClick={openTagFilterModalModal}
            className={tM(
              BOX_BASE_STYLE,
              'flex cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-3 py-2'
            )}
          >
            <TagFilterPreview tags={selectedTagsResult} />
            <ListFilter className="w-4 text-[#9CA3AF]" />
          </div>
        </div>
      </div>
    </div>
  )
}
