import { X } from 'lucide-react'

const dummyTags = ['Frontend', 'PHP', 'Django', 'Express']

export default function SelectedTagList() {
  return (
    <div className="h-[109px] border-b border-[#E5E7EB] bg-[#F9FAFB] p-6">
      <div className="flex w-full justify-between">
        <div className="cursor-default">
          선택된 태그 <span>{`(${'4'})`}</span>
        </div>
        <div className="cursor-pointer text-[#CA8A04] hover:text-[#ab925b]">
          전체 해제
        </div>
      </div>
      <div className="flex py-3">
        {dummyTags.map((el) => (
          <div
            key={el}
            className="mr-2 flex cursor-pointer items-center rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E] hover:bg-[#f1e779] active:bg-[#8b6921] active:text-white"
          >
            {el}
            <div className="text-[#CA8A04]">
              <X className="ml-2 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
