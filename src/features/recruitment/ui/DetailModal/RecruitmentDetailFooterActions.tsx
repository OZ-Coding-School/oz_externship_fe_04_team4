import { useQueryClient } from '@tanstack/react-query'

import { useRecruitmentDeleteMutation } from '@/hooks/model/useRecruitmentDeleteMutation'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useRecruitmentDetailModalStore } from '@/store/recruitment'

export default function RecruitmentDetailFooterActions() {
  const { closeDetailModal, recruitmentId } = useRecruitmentDetailModalStore()
  const { isAdmin } = useAuthRole()

  const queryClient = useQueryClient()

  const { mutate } = useRecruitmentDeleteMutation(recruitmentId!, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRecruitments'] })
      closeDetailModal()
    },
  })

  const handleDelete = () => {
    if (!Number.isFinite(recruitmentId)) return

    const ok = window.confirm('삭제하시겠습니끼?')
    if (!ok) return

    mutate()
  }

  return (
    <div className="flex h-[73px] w-full items-center justify-end bg-[#F9FAFB] px-6 py-4">
      <div className="flex h-10 w-full flex-row-reverse items-center justify-between">
        <div
          onClick={closeDetailModal}
          className="cursor-pointer rounded-lg bg-[#6B7280] px-4 py-2 text-white hover:bg-[#585e6a] hover:font-semibold active:font-bold"
        >
          닫기
        </div>

        {isAdmin && (
          <div
            onClick={handleDelete}
            className="cursor-pointer rounded-lg bg-[#DC2626] px-4 py-2 text-white hover:bg-red-700 hover:font-semibold active:font-bold"
          >
            삭제하기
          </div>
        )}
      </div>
    </div>
  )
}
