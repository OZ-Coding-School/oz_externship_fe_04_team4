import dayjs from 'dayjs'

import { ApplicationStatusBadge } from '@/components/common/badge'

type recruitmentRowType = {
  id: number
  title: string
}
type applicantRowType = {
  id: number
  nickname: string
  email: string
}

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'

export const ApplicationColumns = [
  {
    key: 'id',
    header: 'ID',
    width: '100px',
  },
  {
    key: 'recruitment',
    header: '공고명',
    width: '300px',
    render: (row: recruitmentRowType) => row.title,
  },
  {
    key: 'applicant',
    header: '지원자 정보',
    width: '250px',
    render: (row: applicantRowType) => (
      <div className="flex flex-col">
        <p className="font-medium text-gray-900">{row?.nickname}</p>
        <p className="text-sm text-gray-500">{row?.email}</p>
      </div>
    ),
  },
  {
    key: 'status',
    header: '지원 상태',
    width: '100px',
    render: (row: ApplicationStatus) => (
      <div className="rounded-full px-2 py-1 text-xs">
        {ApplicationStatusBadge[row]}
      </div>
    ),
  },
  {
    key: 'created_at',
    header: '지원일시',
    width: '180px',

    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm'),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '180px',
    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm'),
  },
]
