import dayjs from 'dayjs'

import type { ChangeEvent } from 'react'

import { ApplicationStatusMediumBadge } from '@/components/common/badge'
import { GENDER_LABEL, QUERY_KEY, SERVICE_URLS } from '@/config'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { tM } from '@/lib/twMerge'
import { useApplicationDetailModalStore } from '@/store/application/useApplicationModalStore'
import type { GetApplicationsDetailResponse } from '@/types/api/response'

const TEXT_STYLE = 'text-sm text-[#374151] cursor-default'
const TEXT_BOX =
  'rounded-lg bg-[#F9FAFB] p-3 text-sm text-[#111827] cursor-default'
const WRAPPER_BOX = 'flex flex-col gap-1 cursor-default'

export default function ApplicationDetailContent() {
  const { application_id } = useApplicationDetailModalStore()

  const { data, isLoading, error } =
    useFetchQuery<GetApplicationsDetailResponse>({
      queryKey: [QUERY_KEY.APPLICATIONS.DETAIL, application_id],
      url: SERVICE_URLS.APPLICATIONS.DETAIL(application_id!),
    })

  if (!data) return null
  if (isLoading) {
    return <div className="p-6">불러오는 중...</div>
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">상세 정보를 불러오지 못했습니다.</div>
    )
  }
  return (
    <div className="w-full p-6">
      <div className="flex justify-between">
        {/* 왼쪽 === 스터디 구인 공고 정보 */}
        <div className="flex w-[472px] flex-col gap-4">
          <div className="cursor-default text-lg font-semibold">
            스터디 구인 공고 정보
          </div>
          {/* 공고명 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>공고명</div>
            <div className={TEXT_BOX}>{data.recruitment.title}</div>
          </div>

          {/* 모집 인원 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>모집 인원</div>
            <div className={TEXT_BOX}>
              {data.recruitment.expected_headcount}명
            </div>
          </div>

          {/* 마감 기한 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>마감 기한</div>
            <div className={TEXT_BOX}>
              {dayjs(data.recruitment.close_at).format('YYYY-MM-DD')}
            </div>
          </div>

          {/* 강의 목록 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>강의 목록</div>
            {data?.recruitment.lectures.length === 0 && (
              <div className={tM(TEXT_BOX, 'text-gray-400')}>
                현재 이 스터디와 연동된 강의가 없습니다.{' '}
              </div>
            )}
            {data.recruitment.lectures.map((e) => (
              <div key={e.id} className={TEXT_BOX}>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-[#4B5563]">
                  강사: {e.instructor}
                </div>
              </div>
            ))}
          </div>

          {/* 사용자 정의 태그 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>사용자 정의 태그</div>
            <div className="flex flex-wrap items-center gap-2">
              {data?.recruitment.tags.length === 0 && (
                <div className="cursor-default rounded-full bg-[#F9FAFB] px-3 py-1 text-gray-400">
                  이 스터디에 설정된 태그가 없습니다.
                </div>
              )}
              {data.recruitment.tags.map((e) => (
                <div
                  key={e.id}
                  className="cursor-default rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E]"
                >
                  {e.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 === 지원자 정보 */}
        <div className="flex w-[472px] flex-col gap-4">
          <div className="cursor-default text-lg font-semibold">
            지원자 정보
          </div>

          {/* 지원자 정보 */}
          <div className="flex cursor-default items-center gap-4">
            <img
              src={data.applicant.profile_img_url}
              alt={data.applicant.nickname}
              className="h-16 w-16 rounded-full"
              onError={(e: ChangeEvent<HTMLImageElement>) => {
                e.currentTarget.className =
                  'h-16 w-16 rounded-full bg-gray-100 object-contain'
                e.currentTarget.src = '/public/logo.png'
              }}
            />
            <div className="flex flex-col">
              <div className="text-lg font-medium">
                {data.applicant.nickname}
              </div>
              <div className="text-[#4B5563]">{data.applicant.email}</div>
              <div className="text-[#4B5563]">
                {GENDER_LABEL[data.applicant.gender]}
              </div>
            </div>
          </div>

          {/* 지원 내역 ID */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>지원 내역 ID</div>
            <div className={TEXT_BOX}>{data.id}</div>
          </div>

          {/* 자기 소개 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>자기소개</div>
            <div className={TEXT_BOX}>{data.self_introduction}</div>
          </div>

          {/* 지원 동기 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>지원 동기</div>
            <div className={TEXT_BOX}>{data.objective}</div>
          </div>

          {/* 스터디 목표 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>스터디 목표</div>
            <div className={TEXT_BOX}>{data.motivation}</div>
          </div>

          {/* 가능한 시간대 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>가능한 시간대</div>
            <div className={TEXT_BOX}>{data.available_time}</div>
          </div>

          {/* 스터디 경험 유무 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>스터디 경험 유무</div>
            <div className={TEXT_BOX}>
              {data.has_study_experience ? '있음' : '없음'}
            </div>
          </div>

          {/* 구체적인 스터디 경험 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>구체적인 스터디 경험</div>
            <div className={TEXT_BOX}>{data.study_experience}</div>
          </div>

          {/* 지원 일시 / 수정 일시 */}
          <div className="flex items-center justify-between">
            <div className={tM('w-[228px]', WRAPPER_BOX)}>
              <div className={TEXT_STYLE}>지원 일시</div>
              <div className={TEXT_BOX}>
                {dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
            <div className={tM('w-[228px]', WRAPPER_BOX)}>
              <div className={TEXT_STYLE}>수정일시</div>
              <div className={TEXT_BOX}>
                {dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
          </div>

          {/* 지원 상태 */}
          <div className={WRAPPER_BOX}>
            <div className={TEXT_STYLE}>지원 상태</div>
            <div>{ApplicationStatusMediumBadge[data.status]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
