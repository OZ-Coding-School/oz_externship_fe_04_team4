import { ExternalLink } from 'lucide-react'

import { DifficultyBadge, PlatformBadge } from '@/components/common/badge'
import {
  DetailItem,
  DetailLayout,
  DetailSection,
  LeftColumn,
  RightColumn,
} from '@/components/common/detail'
import type { GetLecturesDetailResponse } from '@/types/api/response'
import { formatDateTime } from '@/utils'

interface LectureDetailContentProps {
  lecture: GetLecturesDetailResponse
}

export function LectureDetailContent({ lecture }: LectureDetailContentProps) {
  return (
    <DetailLayout>
      <LeftColumn>
        <img
          src={lecture.thumbnail_img_url || ''}
          alt={lecture.title}
          className="h-56 w-full rounded-lg object-cover"
        />

        <div className="mt-4 space-y-3">
          <DetailItem label="고유 ID">
            <p className="font-medium">{lecture.id}</p>
          </DetailItem>

          <DetailItem label="강의명">
            <p className="text-lg leading-tight font-semibold">
              {lecture.title}
            </p>
          </DetailItem>

          <div className="grid grid-cols-2 gap-3">
            <DetailItem label="강사명">
              <p className="text-lg font-medium">{lecture.instructor}</p>
            </DetailItem>

            <DetailItem label="평점">
              <p className="text-lg font-medium">
                {lecture.average_rating?.toFixed(1) || '-'}
              </p>
            </DetailItem>
          </div>

          <DetailItem label="플랫폼">
            <PlatformBadge platform={lecture.platform} />
          </DetailItem>

          {lecture.url_link && (
            <DetailItem label="바로가기 링크">
              <a
                className="flex items-center gap-1 text-sm text-yellow-600"
                href={lecture.url_link}
              >
                {lecture.url_link.length > 40
                  ? `${lecture.url_link.substring(0, 40)}...`
                  : lecture.url_link}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </DetailItem>
          )}
        </div>
      </LeftColumn>

      <RightColumn>
        <div className="space-y-6">
          <DetailSection title="강의 설명">
            <p className="text-lg leading-relaxed text-gray-600">
              {lecture.description || '설명이 제공되지 않았습니다.'}
            </p>
          </DetailSection>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="강의 난이도" className="p-3">
              <DifficultyBadge difficulty={lecture.difficulty} />
            </DetailItem>

            <DetailItem label="총 강의 길이" className="p-3">
              <p className="text-lg font-medium">
                {lecture.total_class_time || '-'}
              </p>
            </DetailItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="원가격" className="p-3">
              <p className="text-sm font-medium line-through">
                {lecture.original_price
                  ? `${lecture.original_price.toLocaleString()}원`
                  : '-'}
              </p>
            </DetailItem>

            <DetailItem label="할인된 가격" className="p-3">
              <p className="text-2xl font-medium text-orange-600">
                {lecture.discounted_price
                  ? `${lecture.discounted_price.toLocaleString()}원`
                  : '-'}
              </p>
            </DetailItem>
          </div>

          {lecture.categories && lecture.categories.length > 0 && (
            <DetailItem label="해당 카테고리" className="p-3">
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
            </DetailItem>
          )}

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="생성일시" className="p-3">
              <p className="text-lg">{formatDateTime(lecture.created_at)}</p>
            </DetailItem>

            <DetailItem label="수정일시" className="p-3">
              <p className="text-lg">{formatDateTime(lecture.updated_at)}</p>
            </DetailItem>
          </div>
        </div>
      </RightColumn>
    </DetailLayout>
  )
}
