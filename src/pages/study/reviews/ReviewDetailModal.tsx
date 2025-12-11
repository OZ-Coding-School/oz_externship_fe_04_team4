import Modal from '@/components/common/Modal'
import ReviewRating from '@/components/common/ReviewRating'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { StudyReviewDetail } from '@/types/api'
import { formatDateTime } from '@/utils'

interface ReviewDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reviewId: number | null
}
type StudyReviewDetailProps = StudyReviewDetail

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
        <div className="flex gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="mb-4 text-base font-semibold text-gray-700">
                스터디 그룹 정보
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-500">스터디 그룹명</p>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <p className="text-base font-medium">
                      {reviewDetail.study_group?.name || '-'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">
                      스터디 시작일자
                    </p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {reviewDetail.study_group?.start_at || '-'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">
                      스터디 종료일자
                    </p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {reviewDetail.study_group?.end_at || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">스터디 소개</p>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <p className="text-base leading-relaxed text-gray-600">
                      {reviewDetail.study_group?.introduction ||
                        '스터디 소개가 없습니다.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h3 className="mb-4 text-base font-semibold text-gray-700">
                리뷰 정보
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-500">리뷰 ID</p>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <p className="text-base font-medium">#{reviewDetail.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">작성자 닉네임</p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {reviewDetail.author?.nickname || '-'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">작성자 이메일</p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {reviewDetail.author?.email || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm text-gray-500">별점</p>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <ReviewRating value={reviewDetail.star_rating} />
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">리뷰 내용</p>
                  <div className="rounded-lg bg-gray-100 p-3">
                    <p className="text-base leading-relaxed text-gray-600">
                      {reviewDetail.content || '리뷰 내용이 없습니다.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">생성일시</p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {formatDateTime(reviewDetail.created_at)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">수정일시</p>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <p className="text-base">
                        {formatDateTime(reviewDetail.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
