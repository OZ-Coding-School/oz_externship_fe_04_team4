import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { GetStudyGroupDetailResponse } from '@/types/api/response'

import { StudyGroupDetailContent } from './StudyGroupDetailContent'

interface StudyGroupDetailModalProps {
  isOpen: boolean
  onClose: () => void
  studyGroupId: number | null
}

export function StudyGroupDetailModal({
  isOpen,
  onClose,
  studyGroupId,
}: StudyGroupDetailModalProps) {
  const {
    data: studyGroup,
    isLoading,
    error,
  } = useFetchQuery<GetStudyGroupDetailResponse>({
    queryKey: ['studygroup-detail', studyGroupId],
    url: SERVICE_URLS.STUDY_GROUPS.DETAIL(studyGroupId || 0),
    enabled: !!studyGroupId && isOpen,
  })

  if (!studyGroupId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 그룹 상세 정보"
      topCloseButton
      footer={
        <button
          onClick={onClose}
          className="ml-auto rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          닫기
        </button>
      }
      className="max-w-5xl"
    >
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        </div>
      )}
      {!isLoading && error && (
        <div className="py-12 text-center text-red-600">
          <p>스터디 그룹 정보를 불러오는데 실패했습니다.</p>
          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        </div>
      )}
      {studyGroup && !error && (
        <StudyGroupDetailContent studyGroup={studyGroup} />
      )}
    </Modal>
  )
}
