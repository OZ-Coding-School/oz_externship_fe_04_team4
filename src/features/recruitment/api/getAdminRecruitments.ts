import { authFetch } from '@/api/client'
import { ADMIN_TEXT } from '@/config/api'
import type { GetAdminRecruitmentsParams } from '@/types/recrument.types'

export async function getAdminRecruitments(params: GetAdminRecruitmentsParams) {
  const searchParams = new URLSearchParams()

  searchParams.set('page', String(params.page))
  searchParams.set('page_size', String(params.page_size))

  if (params.search?.trim()) {
    searchParams.set('search', params.search.trim())
  }

  // 서버 스펙에 맞춰서 매핑 (예: is_closed=true/false/all)
  if (params.status !== 'all') {
    // 예시: status === 'true' → is_closed=true
    searchParams.set('is_closed', params.status === 'true' ? 'true' : 'false')
  }

  if (params.tags && params.tags.length > 0) {
    // 예시: "python,react" 형식으로 보냄
    searchParams.set('tags', params.tags.map((el) => el.name).join(','))
  }

  if (params.sort) {
    searchParams.set(
      'sort',
      params.sort === 'created_asc' ? 'oldest' : 'latest'
    )
  } else {
    searchParams.set('sort', (params.sort = 'latest'))
  }

  const res = await authFetch(
    `${ADMIN_TEXT}/recruitments?${searchParams.toString()}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch recruitments')
  }

  return res.json()
}
