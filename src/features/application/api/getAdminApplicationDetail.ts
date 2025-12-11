import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { ApplicationsDetail } from '@/types/api'

export async function getAdminApplicationDetail(
  id: number
): Promise<ApplicationsDetail> {
  const res = await authFetch(`${SERVICE_URLS.APPLICATIONS.DETAIL(id)}`)

  if (!res.ok) {
    throw new Error('구인공고 상세 정보를 불러오지 못했습니다.')
  }

  return res.json()
}
