import { tM } from '@/lib/twMerge'

const S_STYLE = 'inline-block rounded-full  px-2 py-1 text-xs'
const M_STYLE = 'inline-block rounded-lg px-3 py-2 text-sm'

export const ApplicationStatusBadge = {
  ACCEPTED: (
    <div className={tM('text-state-permission-txt bg-[#DCFCE7]', S_STYLE)}>
      승인
    </div>
  ),
  PENDING: (
    <div className={tM('bg-[#FEF9C3] text-[#854D0E]', S_STYLE)}>검토중</div>
  ),
  REJECTED: (
    <div className={tM('bg-[#FEE2E2] text-[#991B1B]', S_STYLE)}>거절</div>
  ),
  CANCELED: (
    <div className={tM('bg-[#E5E7EB] text-[#374151]', S_STYLE)}>취소</div>
  ),
}

export const ApplicationStatusMediumBadge = {
  ACCEPTED: (
    <div className={tM('text-state-permission-txt bg-[#DCFCE7]', M_STYLE)}>
      승인
    </div>
  ),
  PENDING: (
    <div className={tM('bg-[#FEF9C3] text-[#854D0E]', M_STYLE)}>검토중</div>
  ),
  REJECTED: (
    <div className={tM('bg-[#FEE2E2] text-[#991B1B]', M_STYLE)}>거절</div>
  ),
  CANCELED: (
    <div className={tM('bg-[#E5E7EB] text-[#374151]', M_STYLE)}>취소</div>
  ),
}
