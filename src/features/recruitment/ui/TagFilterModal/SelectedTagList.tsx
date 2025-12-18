import { X } from 'lucide-react'

import { useRecruitmentTagsStore } from '@/store/recruitment'

export default function SelectedTagList() {
  const { selectedTags, resetSelectedTags, deleteSelectedTag } =
    useRecruitmentTagsStore()

  return (
    <div className="min-h-[109px] border-b border-[#E5E7EB] bg-[#F9FAFB] px-6 py-2">
      <div className="flex w-full justify-between">
        <div className="cursor-default">
          선택된 태그 <span>{`(${selectedTags.length})`}</span>
        </div>
        <div
          onClick={() => resetSelectedTags()}
          className="cursor-pointer text-[#CA8A04] hover:text-[#ab925b]"
        >
          전체 해제
        </div>
      </div>
      <div className="flex flex-wrap gap-1 py-3">
        {selectedTags.map((el) => (
          <div
            key={el.id}
            className="mr-2 flex cursor-default items-center rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E] hover:bg-[#f1e779] active:bg-[#8b6921] active:text-white"
          >
            <div className="max-w-[90px] truncate">{el.name}</div>
            <div className="text-[#CA8A04]">
              <X
                onClick={() => deleteSelectedTag(el)}
                className="ml-2 w-4 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
