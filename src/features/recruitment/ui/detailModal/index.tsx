import Modal from '@/components/common/Modal'
import RecruitmentDetailContent from '@/features/recruitment/ui/detailModal/RecruitmentDetailContent'
import RecruitmentDetailFooterActions from '@/features/recruitment/ui/detailModal/RecruitmentDetailFooterActions'
import { useDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'

export default function RecruitmentDetailModal() {
  const { isDetailModalOpen, closeDetailModal } = useDetailModalStore()

  return (
    <Modal
      className="h-[826px] max-w-6xl"
      isOpen={isDetailModalOpen}
      title="스터디 구인 공고 상세 정보"
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
