import { FilterSelect } from '@/components/common/filter/FilterSelect'
import { SearchInput } from '@/components/common/filter/SearchInput'
import type { FilterConfig } from '@/components/common/filter/types'

interface FilterBarProps {
  searchConfig: {
    label?: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    debounceDelay?: number
  }
  filters?: FilterConfig[]
}
/**
 * 조회필터바 컴포넌트
 * @description 페이징 테이블 상단에 위치하여 검색 및 필터링 기능을 제공
 * @howto 자세한 사용법은 filter/example.tsx 참고
 * SearchInput : 텍스트 필터
 *  - SearchConfig 타입 참고하여 담당자가 직접 설정
 *  - debounce 내장
 * FilterSelect : select 필터
 *   - 해당 select 필터에 대한 설정을 FilterConfig 타입 참고하여 배열로 전달
 *
 * Select 필터를 선택할 때 마다, SearchInput에서 입력할 때 마다 조회 API 전달용 쿼리 파라미터 구성 > 전달
 * @returns 조회필터바
 */
export function FilterBar({ searchConfig, filters = [] }: FilterBarProps) {
  return (
    <div className="mb-2 grid grid-cols-3 gap-2 px-4">
      <SearchInput
        label={searchConfig.label}
        placeholder={searchConfig.placeholder}
        value={searchConfig.value}
        onChange={searchConfig.onChange}
      />

      {filters.map((filter) => (
        <FilterSelect
          key={filter.value}
          label={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={filter.onChange}
          placeholder={filter.placeholder}
        />
      ))}
    </div>
  )
}
