import { Search } from 'lucide-react'

import { useState, type KeyboardEvent } from 'react'

import type { ApplicationSearchConfig } from '@/components/common/filter/types'
import { tM } from '@/lib/twMerge'

export function ApplicationSearchInput({
  className,
  label = '검색',
  labelClassName,
  searchClassName,
  inputClassName,
  placeholder,
  onChange,
}: ApplicationSearchConfig) {
  const [search, setSearch] = useState('')

  const handleSearchSubmit = () => {
    onChange(search.trim())
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  return (
    <div className={tM('flex flex-col gap-2', className)}>
      {label && (
        <label className={tM('text-sm text-[#374151]', labelClassName)}>
          {label}
        </label>
      )}
      <div
        className={tM(
          'flex h-[38px] w-full items-center rounded-lg border border-[#D1D5DB] bg-white p-3 text-sm',
          searchClassName
        )}
      >
        <Search className="mr-3 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearch(e.target.value)}
          className={tM('w-full text-sm outline-0', inputClassName)}
        />
      </div>
    </div>
  )
}
