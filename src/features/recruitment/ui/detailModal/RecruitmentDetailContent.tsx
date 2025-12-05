import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import dayjs from 'dayjs'
import {
  Bookmark,
  Eye,
  FileText,
  SquareArrowOutUpRight,
  User,
} from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { ApplicationStatusBadge } from '@/components/common/badge'
import { getAdminRecruitmentDetail } from '@/features/recruitment/api/getAdminRecruitmentDetail'
import { markdownToHtml } from '@/lib/markdown'
import { useDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { formatPrice } from '@/utils/price'

const LEFT_BOX_STYLE = 'flex flex-col gap-1 mb-4 cursor-default'
const RIGHT_LEFT_BOX_STYLE = 'flex flex-col gap-1 mb-6 cursor-default'
const TEXT_STYLE = 'text-sm text-[#374151] cursor-default'

export default function RecruitmentDetailContent() {
  const { selectedRecruitmentId } = useDetailModalStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminRecruitmentDetail', selectedRecruitmentId],
    queryFn: () => {
      if (selectedRecruitmentId === null) {
        throw new Error('선택한 공고가 없습니다.')
      }
      return getAdminRecruitmentDetail(selectedRecruitmentId)
    },
    enabled: selectedRecruitmentId != null,
  })

  if (isLoading) {
    return <div className="p-6">불러오는 중...</div>
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">상세 정보를 불러오지 못했습니다.</div>
    )
  }
  return (
    <div className="max-h-[676px] w-full overflow-scroll p-6">
      <div className="flex justify-between">
        {/* 왼쪽 */}
        <div className="w-[536px]">
          {/* 고유 ID */}
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>고유 ID</div>
            <div className={TEXT_STYLE}>#{data?.id}</div>
          </div>

          {/* 고유 UUID */}
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>UUID</div>
            <div className={TEXT_STYLE}>{data?.uuid}</div>
          </div>

          {/* 공고 제목 */}
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 제목</div>
            <div className="text-primary-black text-lg font-bold">
              {data?.title}
            </div>
          </div>

          {/* 예상 모집 인원, 예상 결제 비용 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                예상 모집 인원
              </div>
              <div className={TEXT_STYLE}>{data?.expected_headcount}</div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                예상 결제 비용
              </div>
              <div className={TEXT_STYLE}>
                {formatPrice(data?.expected_payment_amount)}원
              </div>
            </div>
          </div>

          {/* 마감기한 */}
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>마감 기한</div>
            <div className={TEXT_STYLE}>
              {dayjs(data?.close_at).format('YYYY-MM-DD')}
            </div>
          </div>

          {/* 공고 상태 */}
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 상태</div>
            <div className={TEXT_STYLE}>
              {data?.is_closed ? (
                <div className="inline-block rounded-full bg-[#F3F4F6] px-2 py-1 text-xs text-[#1F2937]">
                  마감
                </div>
              ) : (
                <div className="text-state-permission-txt inline-block rounded-full bg-[#DCFCE7] px-2 py-1 text-xs">
                  모집중
                </div>
              )}
            </div>
          </div>

          {/* 조회수, 북마크 순 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                조회수
              </div>
              <div
                className={twMerge(clsx('flex items-center', { TEXT_STYLE }))}
              >
                <Eye className="mr-1 w-4 text-[#9CA3AF]" />
                {data?.views_count}
              </div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                북마크 수
              </div>
              <div
                className={twMerge(clsx('flex items-center', { TEXT_STYLE }))}
              >
                <Bookmark className="mr-1 w-4 text-[#9CA3AF]" />
                {data?.bookmark_count}
              </div>
            </div>
          </div>

          {/* 공고 등록일시, 마지막 수정일시 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                공고 등록일시
              </div>
              <div className={TEXT_STYLE}>
                {dayjs(data?.created_at).format('YYYY-MM-DD HH:mm')}
              </div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                마지막 수정일시
              </div>
              <div className={TEXT_STYLE}>
                {dayjs(data?.updated_at).format('YYYY-MM-DD HH:mm')}
              </div>
            </div>
          </div>

          {/* 사용자 정의 태그 */}
          <div className={'mb-4 flex flex-col gap-3'}>
            <div className={TEXT_STYLE}>사용자 정의 태그</div>
            <div className="flex flex-wrap items-center gap-1">
              {data?.tags.map((el) => (
                <div
                  key={el.id}
                  className="mr-2 cursor-default rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E]"
                >
                  {el.name}
                </div>
              ))}
              {data?.tags.length === 0 && (
                <div className="mr-2 cursor-default rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-500">
                  선택된 태그가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 공고 첨부 파일 */}
          <div className={'mb-4 flex flex-col gap-3'}>
            <div className={TEXT_STYLE}>공고 첨부 파일</div>
            <div className="flex flex-col">
              {data?.files.map((el) => (
                <div
                  key={el.id}
                  className="mb-2 flex w-full cursor-default items-center rounded-lg bg-[#F9FAFB] p-3 text-[#2563EB]"
                >
                  <FileText className="mr-2 w-5 text-[#9CA3AF]" />
                  <div className="cursor-pointer">{el.file_name}</div>
                </div>
              ))}
              {data?.files.length === 0 && (
                <div className="flex w-full cursor-default items-center justify-center rounded-lg bg-[#F9FAFB] p-3 text-sm text-gray-500">
                  첨부된 파일이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="w-[536px]">
          {/* 공고 내용 */}
          <div className={RIGHT_LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 내용</div>
            <div
              className="text-custom-gray-900 markdown-content max-h-64 w-full list-inside overflow-scroll rounded-lg border-0 bg-[#F9FAFB] p-4"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(
                  data ? data.content.trim() : '정보를 불러오지 못했습니다.'
                ),
              }}
              style={{ listStyle: 'decimal' }}
            />
          </div>

          {/* 스터디 강의 목록 */}
          <div className={RIGHT_LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>스터디 강의 목록</div>
            {data?.lectures.map((el) => (
              <div key={el.id} className="rounded-lg bg-[#F9FAFB] p-4">
                <div className="flex">
                  <img
                    className="mr-4 h-14 w-20 rounded-md bg-white object-cover"
                    src={el.thumbnail_img_url}
                    alt={el.thumbnail_img_url}
                    onError={(e: ChangeEvent<HTMLImageElement>) => {
                      e.currentTarget.className =
                        'mr-4 h-14 w-20 rounded-md bg-white object-contain'
                      e.currentTarget.src = '/public/logo.png'
                    }}
                  />
                  <div>
                    <div className="text-primary-black mb-1 text-sm font-semibold">
                      {el.title}
                    </div>
                    <div className="mb-1 text-[12px] text-[#4B5563]">
                      강사: {el.instructor}
                    </div>
                    <Link to={el.instructor} className="flex items-center">
                      <SquareArrowOutUpRight className="mr-1 w-3 text-[#CA8A04]" />
                      <div className="text-[12px] text-[#CA8A04]">
                        강의 바로가기
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {data?.lectures.length === 0 && (
              <div className="flex items-center justify-center rounded-lg bg-[#F9FAFB] p-4 text-sm text-gray-500">
                선택된 강의가 없습니다.
              </div>
            )}
          </div>

          {/* 지원 내역 */}
          <div className="w-[536px]">
            <div className={RIGHT_LEFT_BOX_STYLE}>
              <div className={TEXT_STYLE}>
                지원 내역 ({data?.applications.length}명)
              </div>
              {data?.applications.map((el) => (
                <div
                  key={el.id}
                  className="flex items-center justify-center rounded-lg bg-[#F9FAFB] p-4"
                >
                  <div className="rounded-md bg-white p-3">
                    <div className="flex w-[480px] justify-between">
                      <div className="flex items-center">
                        <User className="mr-2 w-4" />
                        <div className="text-ms text-primary-black font-semibold">
                          {el.applicant.nickname}
                        </div>
                      </div>

                      {ApplicationStatusBadge[el.status]}
                    </div>

                    <div className="text-[12px] text-[#4B5563]">
                      이메일: {el.applicant.email}
                    </div>
                    <div className="text-[12px] text-[#4B5563]">
                      지원일시:{' '}
                      {dayjs(el.created_at).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
              {data?.applications.length === 0 && (
                <div className="flex items-center justify-center rounded-lg bg-[#F9FAFB] p-4 text-sm text-gray-500">
                  지원자가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
