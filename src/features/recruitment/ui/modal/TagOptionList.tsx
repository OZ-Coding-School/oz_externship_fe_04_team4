import { Check } from 'lucide-react'

import type { RecruitmentTag } from '@/mocks/types/accounts'
import { useRecruitmentTagsStore } from '@/store/recruitment/useRecruitmentTagsStore'

type Props = {
  tags?: RecruitmentTag[]
  isLoading: boolean
  isError: boolean
}

const ITEMS_STYLE =
  'mb-2 flex h-[38px] w-[202px] cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-2 py-3 hover:border-[#FDE047] hover:bg-[#FEF9C3] hover:text-[#854D0E] active:font-bold aria-[current=true]:border-[#FDE047] aria-[current=true]:bg-[#FEF9C3] aria-[current=true]:text-[#854D0E]'

export default function TagOptionList({ tags, isLoading, isError }: Props) {
  const { selectedTags, toggleTag } = useRecruitmentTagsStore()

  if (isLoading) {
    return (
      <div className="max-h-96 w-full border-b border-[#E5E7EB] p-6 text-sm text-gray-500">
        태그를 불러오는 중입니다...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-h-96 w-full border-b border-[#E5E7EB] p-6 text-sm text-red-500">
        태그 목록을 불러오는데 실패했습니다.
      </div>
    )
  }

  if (!tags) {
    return (
      <div className="max-h-96 w-full border-b border-[#E5E7EB] p-6 text-sm text-gray-500">
        검색어를 입력하고 Enter를 눌러 태그를 검색해보세요.
      </div>
    )
  }
  if (tags.length === 0) {
    return (
      <div className="max-h-96 w-full border-b border-[#E5E7EB] p-6 text-sm text-gray-500">
        일치한 검색 결과가 없습니다. 다시 검색하세요.
      </div>
    )
  }

  return (
    <div className="max-h-96 w-full overflow-scroll border-b border-[#E5E7EB] p-6">
      <div className="flex flex-wrap gap-2">
        {tags?.map((el) => (
          <div
            key={el.id}
            onClick={() => toggleTag(el)}
            aria-current={Boolean(selectedTags.find((tag) => tag.id === el.id))}
            className={ITEMS_STYLE}
          >
            <div className="max-w-[165px] truncate"> {el.name}</div>
            {selectedTags.find((tag) => tag.id === el.id) && (
              <Check className="w-4 text-[#CA8A04]" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
