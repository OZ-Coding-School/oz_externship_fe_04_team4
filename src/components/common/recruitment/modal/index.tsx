import Modal from '@/components/common/Modal'
import SelectedTagList from '@/components/common/recruitment/modal/SelectedTagList'
import TagFilterActionButtons from '@/components/common/recruitment/modal/TagFilterActionButtons'
import TagOptionList from '@/components/common/recruitment/modal/TagOptionList'
import TagSearchInput from '@/components/common/recruitment/modal/TagSearchInput'
import { useRecruitmentModalStore } from '@/store/recruitment/useRecruitmentModalStore'

export default function RecruitmentModal() {
  const { isOpen, closeModal } = useRecruitmentModalStore()

  return (
    <Modal
      isOpen={isOpen}
      title="태그 필터 선택"
      contentClassName="p-0"
      footer={<TagFilterActionButtons />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeModal}
    >
      <TagSearchInput />
      <SelectedTagList />
      <TagOptionList />
    </Modal>
  )
}
