export const ApplicationStatusBadge = {
  ACCEPTED: (
    <div className="text-state-permission-txt inline-block rounded-full bg-[#DCFCE7] px-2 py-1 text-xs">
      승인
    </div>
  ),
  PENDING: (
    <div className="inline-block rounded-full bg-[#FEF9C3] px-2 py-1 text-xs text-[#854D0E]">
      검토중
    </div>
  ),
  REJECTED: (
    <div className="inline-block rounded-full bg-[#FEE2E2] px-2 py-1 text-xs text-[#991B1B]">
      거절
    </div>
  ),
  CANCELED: (
    <div className="inline-block rounded-full bg-[#E5E7EB] px-2 py-1 text-xs text-[#374151]">
      취소
    </div>
  ),
}
