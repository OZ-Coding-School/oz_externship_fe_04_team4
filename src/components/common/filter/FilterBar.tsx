import {
  FilterSelect,
  type FilterOption,
} from '@/components/common/filter/FilterSelect'
import { SearchInput } from '@/components/common/filter/SearchInput'

interface FilterConfig {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
interface FilterBarProps {
  searchConfig: {
    placeholder: string
    value: string
    onChange: (value: string) => void
  }
  filters?: FilterConfig[]
}

export function FilterBar({ searchConfig, filters = [] }: FilterBarProps) {
  return (
    <div className="flex gap-2 pr-4 pl-4">
      <SearchInput
        placeholder={searchConfig.placeholder}
        value={searchConfig.value}
        onChange={searchConfig.onChange}
      />
      {filters.map((filter, index) => (
        <FilterSelect
          key={index}
          options={filter.options}
          value={filter.value}
          onChange={filter.onChange}
          placeholder={filter.placeholder}
        />
      ))}
    </div>
  )
}
