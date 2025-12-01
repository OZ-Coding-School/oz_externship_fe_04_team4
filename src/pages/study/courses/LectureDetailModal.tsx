import { ExternalLink } from 'lucide-react'

import Modal from '@/components/common/Modal'
import { PlatformBadge } from '@/components/common/PlatformBadge'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { Lecture } from '@/pages/study/courses'
import { formatDateTime } from '@/utils'
import { twClassName } from '@/utils/getTwClassName'

interface LectureDetailModalProps {
  isOpen: boolean
  onClose: () => void
  lectureId: number | null
}
type DifficultyProps = {
  desc: string
  style: string
}
const DIFFICULTY: Record<string, DifficultyProps> = {
  HARD: { desc: '어려움', style: 'bg-red-100 text-red-700' },
  NORMAL: { desc: '보통', style: 'bg-yellow-100 text-yellow-700' },
  EASY: { desc: '쉬움', style: 'bg-green-100 text-green-700' },
}
const getDifficulty = ({
  difficulty,
  className,
}: {
  difficulty: string
  className?: string
}) => {
  const baseClass = 'inline-block rounded px-2 py-1 text-lg'

  const difficultyData = DIFFICULTY[difficulty] || {
    desc: '-',
    style: 'bg-gray-100 text-gray-700',
  }
  const difficultyStyle = difficultyData.style
  const difficultyDesc = difficultyData.desc

  return (
    <span className={twClassName(baseClass, difficultyStyle, className)}>
      {difficultyDesc}
    </span>
  )
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
  } = useFetchQuery<Lecture>({
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
      {lecture && !error && (
        <div className="flex gap-8">
          <div className="w-96 shrink-0">
            <img
              src={lecture.thumbnail_img_url || ''}
              alt={lecture.title}
              className="h-56 w-full rounded-lg object-cover"
            />
            <div className="mt-4 space-y-3">
              <div>
                <p className="mb-1 text-sm text-gray-500">고유 ID</p>
                <p className="font-medium">{lecture.id}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">강의명</p>
                <p className="text-lg leading-tight font-semibold">
                  {lecture.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1 text-sm text-gray-500">강사명</p>
                  <p className="text-lg font-medium">{lecture.instructor}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">평점</p>
                  <p className="text-lg font-medium">
                    {lecture.average_rating?.toFixed(1) || '-'}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">플랫폼</p>
                <PlatformBadge platform={lecture.platform} />
              </div>

              {lecture.url_link && (
                <div>
                  <p className="mb-1 text-sm text-gray-500">바로가기 링크</p>
                  <a
                    className="flex items-center gap-1 text-sm text-yellow-600"
                    href={lecture.url_link}
                  >
                    {lecture.url_link.length > 40
                      ? `${lecture.url_link.substring(0, 40)}...`
                      : lecture.url_link}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                강의 설명
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                {lecture.description || '설명이 제공되지 않았습니다.'}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">강의 난이도</p>
                  <p className="text-sm font-medium">
                    {lecture.difficulty
                      ? getDifficulty({ difficulty: lecture.difficulty })
                      : '-'}
                  </p>
                </div>
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">총 강의 길이</p>
                  <p className="text-lg font-medium">
                    {lecture.total_class_time || '-'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">원가격</p>
                  <p className="text-sm font-medium line-through">
                    {lecture.original_price
                      ? `${lecture.original_price.toLocaleString()}원`
                      : '-'}
                  </p>
                </div>
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">할인된 가격</p>
                  <p className="text-2xl font-medium text-orange-600">
                    {lecture.discounted_price
                      ? `${lecture.discounted_price.toLocaleString()}원`
                      : '-'}
                  </p>
                </div>
              </div>
            </div>

            {lecture.categories && lecture.categories.length > 0 && (
              <div className="p-3">
                <p className="mb-1 text-sm text-gray-500">해당 카테고리</p>
                <div className="flex flex-wrap gap-2">
                  {lecture.categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">생성일시</p>
                  <p className="text-lg">
                    {formatDateTime(lecture.created_at)}
                  </p>
                </div>
                <div className="p-3">
                  <p className="mb-1 text-sm text-gray-500">수정일시</p>
                  <p className="text-lg">
                    {formatDateTime(lecture.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
