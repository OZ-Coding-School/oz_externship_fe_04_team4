export interface FilterOption {
  label: string
  value: string
}
export interface FilterConfig {
  label?: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
export interface SearchConfig {
  className?: string
  label?: string
  labelClassName?: string
  searchClassName?: string
  inputClassName?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}
