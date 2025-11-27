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
  label?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  debounceDelay?: number
}
