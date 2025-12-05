import { useApplicationDetailModalStore } from '@/store/application/useApplicationModalStore'

export default function ApplicationDetailFooterActions() {
  const { closeDetailModal } = useApplicationDetailModalStore()

  return (
    <div className="flex h-[73px] w-full items-center justify-end px-6 py-4">
      <div
        onClick={closeDetailModal}
        className="cursor-pointer rounded-lg bg-[#6B7280] px-4 py-2 text-white hover:bg-[#585e6a] hover:font-semibold active:font-bold"
      >
        닫기
      </div>
    </div>
  )
}
