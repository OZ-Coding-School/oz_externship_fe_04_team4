import { useRecruitmentDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'

export default function RecruitmentDetailFooterActions() {
  const { closeDetailModal } = useRecruitmentDetailModalStore()

  return (
    <div className="flex h-[73px] w-full items-center justify-end bg-[#F9FAFB] px-6 py-4">
      <div className="flex h-10 w-full items-center justify-between">
        <div
          onClick={closeDetailModal}
          className="cursor-pointer rounded-lg bg-[#DC2626] px-4 py-2 text-white hover:bg-red-700 hover:font-semibold active:font-bold"
        >
          삭제하기
        </div>
        <div
          onClick={closeDetailModal}
          className="cursor-pointer rounded-lg bg-[#6B7280] px-4 py-2 text-white hover:bg-[#585e6a] hover:font-semibold active:font-bold"
        >
          닫기
        </div>
      </div>
    </div>
  )
}
