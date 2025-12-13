import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import ReviewRating from '@/components/common/ReviewRating'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useTableFilters } from '@/hooks'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { ReviewDetailModal } from '@/pages/study/reviews/ReviewDetailModal'
import type { StudyReviewListResults } from '@/types/api/response'
import { formatDateTime } from '@/utils'

type ReviewProps = StudyReviewListResults
const COLUMNS: Column<ReviewProps>[] = [
  {
    key: 'id',
    header: 'ID',
    width: '50px',
  },
  {
    key: 'study_group.name',
    header: '스터디 그룹 명',
    width: '300px',
    render: (_, row) => row.study_group.name,
  },
  {
    key: 'author',
    header: '작성자 정보',
    width: '300px',
    render: (_, row) => (
      <div>
        <p className="font-medium text-gray-900">{row.author.nickname}</p>
        <p className="text-sm text-gray-500">{row.author.email}</p>
      </div>
    ),
  },
  {
    key: 'content',
    header: '리뷰 내용',
    width: '600px',
  },
  {
    key: 'star_rating',
    header: '별점',
    width: '200px',
    render: (_, row) => <ReviewRating value={row.star_rating} />,
  },

  {
    key: 'created_at',
    header: '생성일시',
    width: '150px',
    render: (value: string) => formatDateTime(value),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '150px',
    render: (value: string) => formatDateTime(value),
  },
]
export default function ReviewManagementPage() {
  const { filters, updateSearch, updatePage } = useTableFilters({
    initialFilters: {
      search: '',
      page: 1,
    },
  })

  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<ReviewProps>
  >({
    queryKey: ['reviews', filters],
    url: SERVICE_URLS.STUDY_REVIEWS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
    },
  })

  const handleRowClick = (review: ReviewProps) => {
    setSelectedReviewId(review.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedReviewId(null)
  }
  return (
    <>
      <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '사용자 닉네임, 이메일 검색 ...',
            value: filters.search,
            onChange: updateSearch,
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={COLUMNS}
          response={
            data || { count: 0, results: [], next: null, previous: null }
          }
          currentPage={filters.page}
          onPageChange={updatePage}
          isLoading={isLoading}
          error={error?.message}
          onRetry={refetch}
          onRowClick={handleRowClick}
        />
      </div>
      <ReviewDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reviewId={selectedReviewId}
      />
    </>
  )
}
