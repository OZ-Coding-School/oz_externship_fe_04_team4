import { adminFetch } from '@/api/client'
import { ADMIN_TEXT } from '@/config/api'
import type { RecruitmentDetail } from '@/mocks/types/accounts'

export async function getAdminRecruitmentDetail(
  id: number
): Promise<RecruitmentDetail> {
  const res = await adminFetch(`${ADMIN_TEXT}/recruitments/${id}`)

  if (!res.ok) {
    throw new Error('구인공고 상세 정보를 불러오지 못했습니다.')
  }

  return res.json()
}
