import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { GetLecturesDetailResponse } from '@/types/api/response'

import { LectureDetailContent } from './LectureDetailContent'

interface LectureDetailModalProps {
  isOpen: boolean
  onClose: () => void
  lectureId: number | null
}

export function LectureDetailModal({
  isOpen,
  onClose,
  lectureId,
}: LectureDetailModalProps) {
  const {
    data: lecture,
    isLoading,
    error,
  } = useFetchQuery<GetLecturesDetailResponse>({
    queryKey: ['lecture', lectureId],
    url: SERVICE_URLS.LECTURES.DETAIL(lectureId || 0),
    enabled: !!lectureId && isOpen,
  })

  if (!lectureId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="강의 상세 정보"
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
          <p>강의 정보를 불러오는데 실패했습니다.</p>
          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        </div>
      )}
      {lecture && !error && <LectureDetailContent lecture={lecture} />}
    </Modal>
  )
}
