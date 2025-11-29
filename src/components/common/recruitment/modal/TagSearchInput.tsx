import { Search } from 'lucide-react'

export default function TagSearchInput() {
  return (
    <div className="flex h-[87px] w-full items-center justify-center border-b border-[#E5E7EB]">
      <div className="flex h-[38px] w-[624px] items-center rounded-lg border border-[#D1D5DB] p-3">
        <Search className="mr-3 w-4 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="태그 검색"
          className="h-5 w-[566px] outline-0"
        />
      </div>
    </div>
  )
}
