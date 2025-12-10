import dayjs from 'dayjs'

import { ApplicationStatusBadge } from '@/components/common/badge'
import type { ApplicationsStatus } from '@/mocks/types/accounts'

type recruitmentRowType = {
  id: number
  title: string
}
type applicantRowType = {
  id: number
  nickname: string
  email: string
}

export const ApplicationColumns = [
  {
    key: 'id',
    header: 'ID',
    width: '60px',
  },
  {
    key: 'recruitment',
    header: '공고명',
    width: '420px',
    render: (row: recruitmentRowType) => row.title,
  },
  {
    key: 'applicant',
    header: '지원자 정보',
    width: '260px',
    render: (row: applicantRowType) => (
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">{row?.nickname}</p>
        <p className="text-xs text-gray-500">{row?.email}</p>
      </div>
    ),
  },
  {
    key: 'status',
    header: '지원 상태',
    width: '120px',
    render: (row: ApplicationsStatus) => (
      <div className="rounded-full px-2 py-1 text-xs">
        {ApplicationStatusBadge[row]}
      </div>
    ),
  },
  {
    key: 'created_at',
    header: '지원일시',
    width: '160px',

    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '160px',
    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  },
]
