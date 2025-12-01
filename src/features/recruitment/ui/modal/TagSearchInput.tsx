import { CircleX, Search } from 'lucide-react'
import type { KeyboardEvent } from 'react'

type Props = {
  search: string
  setSearch: (value: string) => void
  onSubmit: () => void
}

export default function TagSearchInput({ search, setSearch, onSubmit }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex h-[87px] w-full items-center justify-center border-b border-[#E5E7EB]">
      <div className="flex h-[38px] w-[624px] items-center rounded-lg border border-[#D1D5DB] p-3">
        <Search className="mr-3 w-4 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="태그를 입력하고 Enter를 눌러 검색하세요."
          className="h-5 w-[566px] outline-0"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <CircleX
          className="w-4 cursor-pointer text-[#9CA3AF] hover:text-gray-800"
          onClick={() => setSearch('')}
        />
      </div>
    </div>
  )
}
