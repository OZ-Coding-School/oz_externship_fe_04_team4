import { useState } from 'react'

import { useRecruitmentTagsQuery } from '@/api/recruitment/useRecruitmentTagsQuery'
import Modal from '@/components/common/Modal'
import SelectedTagList from '@/components/common/recruitment/modal/SelectedTagList'
import TagFilterActionButtons from '@/components/common/recruitment/modal/TagFilterActionButtons'
import TagOptionList from '@/components/common/recruitment/modal/TagOptionList'
import TagSearchInput from '@/components/common/recruitment/modal/TagSearchInput'
import { useRecruitmentModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentTagsStore } from '@/store/recruitment/useRecruitmentTagsStore'

export default function RecruitmentModal() {
  const { isOpen, closeModal } = useRecruitmentModalStore()

  const [inputSearch, setInputSearch] = useState('')
  const [keywordSearch, setKeywordSearch] = useState('')

  const { selectedTags } = useRecruitmentTagsStore()

  const { data, isLoading, isError } = useRecruitmentTagsQuery({
    page: 1,
    pageSize: 100,
    search: keywordSearch,
  })

  const handleSearchSubmit = () => {
    setKeywordSearch(inputSearch.trim())
  }

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
      <TagSearchInput
        search={inputSearch}
        setSearch={setInputSearch}
        onSubmit={handleSearchSubmit}
      />

      {Boolean(selectedTags.length) && <SelectedTagList />}

      <TagOptionList
        tags={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </Modal>
  )
}
