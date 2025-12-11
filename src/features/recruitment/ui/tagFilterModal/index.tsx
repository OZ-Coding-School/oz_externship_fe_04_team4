import { useState } from 'react'

import Modal from '@/components/common/Modal'
import SelectedTagList from '@/features/recruitment/ui/tagFilterModal/SelectedTagList'
import TagFilterActionButtons from '@/features/recruitment/ui/tagFilterModal/TagFilterActionButtons'
import TagOptionList from '@/features/recruitment/ui/tagFilterModal/TagOptionList'
import TagSearchInput from '@/features/recruitment/ui/tagFilterModal/TagSearchInput'
import {
  useRecruitmentTagsStore,
  useTagFilterModalStore,
} from '@/store/recruitment'

export default function RecruitmentTagFilterModal() {
  const { isTagFilterModalOpen, closeTagFilterModalModal } =
    useTagFilterModalStore()

  const [inputValue, setInputValue] = useState('')
  const [submittedValue, setSubmittedValue] = useState('')

  const { selectedTags } = useRecruitmentTagsStore()

  const handleSearchSubmit = () => {
    setSubmittedValue(inputValue.trim())
  }

  return (
    <Modal
      isOpen={isTagFilterModalOpen}
      title="태그 필터 선택"
      contentClassName="p-0"
      footer={<TagFilterActionButtons />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeTagFilterModalModal}
    >
      <TagSearchInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearchSubmit={handleSearchSubmit}
      />

      {Boolean(selectedTags.length) && <SelectedTagList />}

      <TagOptionList submittedValue={submittedValue} />
    </Modal>
  )
}
