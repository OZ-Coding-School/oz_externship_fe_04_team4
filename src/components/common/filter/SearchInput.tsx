import { Search } from 'lucide-react'

import { useDeferredValue, useEffect, useState } from 'react'

import type { SearchConfig } from '@/components/common/filter/types'

export function SearchInput({
  label = '검색',
  placeholder,
  value,
  onChange,
}: SearchConfig) {
  const [localValue, setLocalValue] = useState(value)
  const debounceValue = useDeferredValue(localValue)

  useEffect(() => {
    setLocalValue(value)
  }, [value])
  useEffect(() => {
    onChange(debounceValue)
  }, [debounceValue, onChange])
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
