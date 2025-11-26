import type { FilterOption } from '@/components/common/filter/types'
import { ChevronDown } from 'lucide-react'

interface FilterSelectProps {
  label?: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select',
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
