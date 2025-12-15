import {
  DetailBox,
  DetailLayout,
  DetailSection,
  LeftColumn,
  RightColumn,
} from '@/components/common/detail'
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
    <DetailLayout>
      <LeftColumn>
        <DetailSection title="스터디 그룹 정보">
          <DetailBox label="스터디 그룹명">
            <p className="text-base font-medium">
              {reviewDetail.study_group?.name || '-'}
            </p>
          </DetailBox>

          <div className="grid grid-cols-2 gap-4">
            <DetailBox label="스터디 시작일자">
              <p className="text-base">
                {reviewDetail.study_group?.start_at || '-'}
              </p>
            </DetailBox>

            <DetailBox label="스터디 종료일자">
              <p className="text-base">
                {reviewDetail.study_group?.end_at || '-'}
              </p>
            </DetailBox>
          </div>

          <DetailBox label="스터디 소개">
            <p className="text-base leading-relaxed text-gray-600">
              {reviewDetail.study_group?.introduction ||
                '스터디 소개가 없습니다.'}
            </p>
          </DetailBox>
        </DetailSection>
      </LeftColumn>

      <RightColumn>
        <DetailSection title="리뷰 정보">
          <DetailBox label="리뷰 ID">
            <p className="text-base font-medium">#{reviewDetail.id}</p>
          </DetailBox>

          <div className="grid grid-cols-2 gap-4">
            <DetailBox label="작성자 닉네임">
              <p className="text-base">
                {reviewDetail.author?.nickname || '-'}
              </p>
            </DetailBox>

            <DetailBox label="작성자 이메일">
              <p className="text-base">{reviewDetail.author?.email || '-'}</p>
            </DetailBox>
          </div>

          <DetailBox label="별점">
            <ReviewRating value={reviewDetail.star_rating} />
          </DetailBox>

          <DetailBox label="리뷰 내용">
            <p className="text-base leading-relaxed text-gray-600">
              {reviewDetail.content || '리뷰 내용이 없습니다.'}
            </p>
          </DetailBox>

          <div className="grid grid-cols-2 gap-4">
            <DetailBox label="생성일시">
              <p className="text-base">
                {formatDateTime(reviewDetail.created_at)}
              </p>
            </DetailBox>

            <DetailBox label="수정일시">
              <p className="text-base">
                {formatDateTime(reviewDetail.updated_at)}
              </p>
            </DetailBox>
          </div>
        </DetailSection>
      </RightColumn>
    </DetailLayout>
  )
}
