import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const S_STYLE = 'inline-block rounded-full  px-2 py-1 text-xs'
const M_STYLE = 'inline-block rounded-lg px-3 py-2 text-sm'

export const ApplicationStatusBadge = {
  ACCEPTED: (
    <div
      className={twMerge(
        clsx('text-state-permission-txt bg-[#DCFCE7]', S_STYLE)
      )}
    >
      승인
    </div>
  ),
  PENDING: (
    <div className={twMerge(clsx('bg-[#FEF9C3] text-[#854D0E]', S_STYLE))}>
      검토중
    </div>
  ),
  REJECTED: (
    <div className={twMerge(clsx('bg-[#FEE2E2] text-[#991B1B]', S_STYLE))}>
      거절
    </div>
  ),
  CANCELED: (
    <div className={twMerge(clsx('bg-[#E5E7EB] text-[#374151]', S_STYLE))}>
      취소
    </div>
  ),
}

// 스터디 구인 공고 정보 (상세페이지)
export const ApplicationStatusMediumBadge = {
  ACCEPTED: (
    <div
      className={twMerge(
        clsx('text-state-permission-txt bg-[#DCFCE7]', M_STYLE)
      )}
    >
      승인
    </div>
  ),
  PENDING: (
    <div className={twMerge(clsx('bg-[#FEF9C3] text-[#854D0E]', M_STYLE))}>
      검토중
    </div>
  ),
  REJECTED: (
    <div className={twMerge(clsx('bg-[#FEE2E2] text-[#991B1B]', M_STYLE))}>
      거절
    </div>
  ),
  CANCELED: (
    <div className={twMerge(clsx('bg-[#E5E7EB] text-[#374151]', M_STYLE))}>
      취소
    </div>
  ),
}

export const GenderBadge = {
  M: '남성',
  F: '여성',
}
