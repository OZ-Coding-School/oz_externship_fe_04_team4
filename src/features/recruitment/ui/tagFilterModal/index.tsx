import { useState } from 'react'

import { useRecruitmentTagsQuery } from '@/api/recruitment/useRecruitmentTagsQuery'
import Modal from '@/components/common/Modal'
import SelectedTagList from '@/features/recruitment/ui/tagFilterModal/SelectedTagList'
import TagFilterActionButtons from '@/features/recruitment/ui/tagFilterModal/TagFilterActionButtons'
import TagOptionList from '@/features/recruitment/ui/tagFilterModal/TagOptionList'
import TagSearchInput from '@/features/recruitment/ui/tagFilterModal/TagSearchInput'
import { useTagFilterModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentTagsStore } from '@/store/recruitment/useRecruitmentTagsStore'

export default function RecruitmentTagFilterModal() {
  const { isTagFilterModalOpen, closeTagFilterModalModal } =
    useTagFilterModalStore()

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
      isOpen={isTagFilterModalOpen}
      title="태그 필터 선택"
      contentClassName="p-0"
      footer={<TagFilterActionButtons />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeTagFilterModalModal}
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
