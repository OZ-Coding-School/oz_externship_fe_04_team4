import { X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  selectedTags: string[]

  setSelectedTags: Dispatch<SetStateAction<string[]>>
}

export default function SelectedTagList({
  selectedTags,
  setSelectedTags,
}: Props) {
  return (
    <div className="h-[109px] border-b border-[#E5E7EB] bg-[#F9FAFB] p-6">
      <div className="flex w-full justify-between">
        <div className="cursor-default">
          선택된 태그 <span>{`(${selectedTags.length})`}</span>
        </div>
        <div
          onClick={() => setSelectedTags([])}
          className="cursor-pointer text-[#CA8A04] hover:text-[#ab925b]"
        >
          전체 해제
        </div>
      </div>
      <div className="flex py-3">
        {selectedTags.map((el) => (
          <div
            key={el}
            className="mr-2 flex cursor-default items-center rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E] hover:bg-[#f1e779] active:bg-[#8b6921] active:text-white"
          >
            {el}
            <div className="text-[#CA8A04]">
              <X
                onClick={() =>
                  setSelectedTags((prev) => prev.filter((name) => name !== el))
                }
                className="ml-2 w-4 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
