import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { GetAdminApplicationParams } from '@/types'

export async function getAdminApplication(params: GetAdminApplicationParams) {
  const searchParams = new URLSearchParams()

  searchParams.set('page', String(params.page))
  searchParams.set('page_size', String(params.page_size))

  if (params.search?.trim()) {
    searchParams.set('search', params.search.trim())
  }

  if (params.status !== 'all') {
    searchParams.set('status', params.status)
  }

  if (params.sort) {
    searchParams.set('sort', params.sort)
  }

  const res = await authFetch(
    `${SERVICE_URLS.APPLICATIONS.LIST}?${searchParams.toString()}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch Application')
  }

  return res.json()
}
