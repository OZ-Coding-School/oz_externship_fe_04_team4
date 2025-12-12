import { useQuery } from '@tanstack/react-query'

import { fetchRecruitmentTags } from '@/features/recruitment/api'
import type { RecruitmentTags } from '@/types/api'

type useRecruitmentTagsQueryParams = {
  page: number
  pageSize: number
  search: string
}

export function useRecruitmentTagsQuery({
  page = 1,
  pageSize = 20,
  search = '',
}: useRecruitmentTagsQueryParams) {
  return useQuery<RecruitmentTags, Error>({
    queryKey: ['recruitment-tags', { page, pageSize, search }],
    queryFn: () => fetchRecruitmentTags({ page, pageSize, search }),
  })
}
