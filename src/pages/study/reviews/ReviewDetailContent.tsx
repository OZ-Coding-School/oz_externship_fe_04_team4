import ReviewRating from '@/components/common/ReviewRating'
import type { GetStudyReviewDetailResponse } from '@/types/api/response'
import { formatDateTime } from '@/utils'

interface ReviewDetailContentProps {
  reviewDetail: GetStudyReviewDetailResponse
}

export function ReviewDetailContent({
  reviewDetail,
}: ReviewDetailContentProps) {
  return (
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
                <p className="mb-1 text-sm text-gray-500">스터디 시작일자</p>
                <div className="rounded-lg bg-gray-100 p-3">
                  <p className="text-base">
                    {reviewDetail.study_group?.start_at || '-'}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">스터디 종료일자</p>
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
  )
}
