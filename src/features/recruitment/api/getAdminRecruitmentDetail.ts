import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { RecruitmentDetail } from '@/types/api'

export async function getAdminRecruitmentDetail(
  id: number
): Promise<RecruitmentDetail> {
  const res = await authFetch(`${SERVICE_URLS.RECRUITMENTS.DETAIL(id)}`)

  if (!res.ok) {
    throw new Error('구인공고 상세 정보를 불러오지 못했습니다.')
  }

  return res.json()
}
