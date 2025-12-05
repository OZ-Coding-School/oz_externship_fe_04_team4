import Modal from '@/components/common/Modal'
import ApplicationDetailContent from '@/features/application/ui/ApplicationDetailModal/ApplicationDetailContent'
import ApplicationDetailFooterActions from '@/features/application/ui/ApplicationDetailModal/ApplicationDetailFooterActions'
import { useApplicationDetailModalStore } from '@/store/application/useApplicationModalStore'

export default function ApplicationDetailModal() {
  const { closeDetailModal, isDetailModalOpen } =
    useApplicationDetailModalStore()

  return (
    <Modal
      className="max-h-[95vh] max-w-5xl overflow-y-auto"
      title="지원 내역 상세 정보"
      titleClassName="p-6 text-xl"
      contentClassName="p-0"
      footer={<ApplicationDetailFooterActions />}
      footerClassName="p-0"
      topCloseButton
      isOpen={isDetailModalOpen}
      onClose={closeDetailModal}
    >
      <ApplicationDetailContent />
    </Modal>
  )
}
