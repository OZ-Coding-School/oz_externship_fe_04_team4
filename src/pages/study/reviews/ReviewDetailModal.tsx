import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'

import type { GetStudyReviewDetailResponse } from '@/types/api/response'

import { ReviewDetailContent } from './ReviewDetailContent'

interface ReviewDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reviewId: number | null
}

type StudyReviewDetailProps = GetStudyReviewDetailResponse

export function ReviewDetailModal({
  isOpen,
  onClose,
  reviewId,
}: ReviewDetailModalProps) {
  const {
    data: reviewDetail,
    isLoading,
    error,
  } = useFetchQuery<StudyReviewDetailProps>({
    queryKey: ['review-detail', reviewId],
    url: SERVICE_URLS.STUDY_REVIEWS.DETAIL(reviewId || 0),
    enabled: !!reviewId && isOpen,
  })

  if (!reviewId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="리뷰 상세 정보"
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
          <p>리뷰 정보를 불러오는데 실패했습니다.</p>
          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        </div>
      )}
      {reviewDetail && !error && (
        <ReviewDetailContent reviewDetail={reviewDetail} />
      )}
    </Modal>
  )
}
