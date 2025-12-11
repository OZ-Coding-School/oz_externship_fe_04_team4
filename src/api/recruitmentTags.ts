import { authFetch } from '@/api/client'
import type { RecruitmentTags } from '@/types/api'

type fetchRecruitmentTagsParams = {
  page?: number
  pageSize?: number
  search?: string
}

export async function fetchRecruitmentTags({
  page = 1,
  pageSize = 20,
  search = '',
}: fetchRecruitmentTagsParams): Promise<RecruitmentTags> {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('page_size', String(pageSize))

  if (search.trim()) {
    params.set('search', search.trim())
  }

  const res = await authFetch(`/recruitment-tags?${params.toString()}`, {
    method: 'GET',
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(
      errorBody.error_detail ?? '태그 목록을 불러오는데 실패했습니다.'
    )
  }

  return res.json()
}
