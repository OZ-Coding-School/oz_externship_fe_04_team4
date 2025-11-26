import { useDebounce } from '@/hooks'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputProps {
  label?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  debounceDelay?: number
}

export function SearchInput({
  label = '검색',
  placeholder,
  value,
  onChange,
  debounceDelay = 500,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const debounceValue = useDebounce(localValue, debounceDelay)

  useEffect(() => {
    setLocalValue(value)
  }, [value])
  useEffect(() => {
    onChange(debounceValue)
  }, [debounceValue, onChange])
  return (
    <div className="flex flex-1 flex-col gap-1">
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
