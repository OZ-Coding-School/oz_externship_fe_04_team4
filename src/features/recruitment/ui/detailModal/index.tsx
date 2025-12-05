import Modal from '@/components/common/Modal'
import RecruitmentDetailContent from '@/features/recruitment/ui/detailModal/RecruitmentDetailContent'
import RecruitmentDetailFooterActions from '@/features/recruitment/ui/detailModal/RecruitmentDetailFooterActions'
import { useRecruitmentDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'

export default function RecruitmentDetailModal() {
  const { isDetailModalOpen, closeDetailModal } =
    useRecruitmentDetailModalStore()

  return (
    <Modal
      className="h-[826px] max-w-6xl"
      isOpen={isDetailModalOpen}
      title="스터디 구인 공고 상세 정보"
      titleClassName="p-6 text-xl"
      contentClassName="p-0"
      footer={<RecruitmentDetailFooterActions />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeDetailModal}
    >
      <RecruitmentDetailContent />
    </Modal>
  )
}
