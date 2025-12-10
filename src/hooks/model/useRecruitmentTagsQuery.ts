import { useQuery } from '@tanstack/react-query'

import { fetchRecruitmentTags } from '@/api/recruitmentTags'
import type { RecruitmentTags } from '@/mocks/types/accounts'

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
