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

  if (params.status !== 'all') {
    searchParams.set('is_closed', params.status === 'true' ? 'true' : 'false')
  }

  if (params.tags && params.tags.length > 0) {
    searchParams.set('tags', params.tags.map((el) => el.name).join(','))
  }

  if (params.sort) {
    searchParams.set('sort', params.sort === 'oldest' ? 'oldest' : 'latest')
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
