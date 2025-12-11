import dayjs from 'dayjs'

import { RecruitmentStatusBadge } from '@/components/common/badge/RecruitmentStatusBadge'
import TagFilterPreview from '@/features/recruitment/ui/TagFilterPreview/TagFilterPreview'
import type { TagType } from '@/mocks/types/accounts'

export const RecruitmentColumns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '공고 제목', width: '320px' },
  {
    key: 'tags',
    header: '태그',
    width: '260px',
    render: (row: TagType[]) => {
      const tags = row

      return (
        <div className="flex flex-wrap gap-1">
          <TagFilterPreview tags={tags} />
        </div>
      )
    },
  },
  {
    key: 'close_at',
    header: '마감 기한',
    width: '110px',
    render: (row: string) => dayjs(row).format('YYYY-MM-DD'),
  },
  {
    key: 'is_closed',
    header: '상태',
    width: '80px',
    render: (row: boolean) => (
      <RecruitmentStatusBadge is_closed={row} className="flex items-center" />
    ),
  },
  {
    key: 'views_count',
    header: '조회수',
    width: '80px',
  },
  {
    key: 'bookmark_count',
    header: '북마크',
    width: '80px',
  },
  {
    key: 'created_at',
    header: '생성일시',
    width: '160px',
    sortable: { asc: 'created_asc', desc: 'created_desc' },
    render: (row: string) => dayjs(row).format('YYYY-MM-DD HH:mm'),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '160px',
    render: (row: string) => dayjs(row).format('YYYY-MM-DD HH:mm'),
  },
]
