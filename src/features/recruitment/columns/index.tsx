import TagFilterPreview from '@/components/common/tag/TagFilterPreview'
import type { RecruitmentTag } from '@/mocks/types/accounts'
import { sliceDateTime } from '@/utils/format'

export const RecruitmentColumns = [
  { key: 'id', header: 'ID', width: '10px' },
  { key: 'title', header: '공고 제목', width: '400px' },
  {
    key: 'tags',
    header: '태그',
    width: '100px',
    render: (row: RecruitmentTag[]) => {
      const tags = row

      return (
        <div className="flex flex-wrap gap-1">
          <TagFilterPreview tags={tags} koreanLength={16} englishLength={30} />
        </div>
      )
    },
  },
  {
    key: 'close_at',
    header: '마감 기한',
    width: '100px',
    render: (row: string) => sliceDateTime(row, 10),
  },
  {
    key: 'is_closed',
    header: '상태',
    width: '100px',
    render: (row: string) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs ${
          row
            ? 'bg-[#F3F4F6] text-[#1F2937]'
            : 'text-state-permission-txt bg-[#DCFCE7]'
        }`}
      >
        {row ? '마감' : '모집중'}
      </span>
    ),
  },
  {
    key: 'views_count',
    header: '조회수',
    width: '10px',
  },
  {
    key: 'bookmark_count',
    header: '북마크',
    width: '10px',
  },
  {
    key: 'created_at',
    header: '생성일시',
    width: '100px',
    sortable: { asc: 'created_asc', desc: 'created_desc' },
    render: (row: string) => sliceDateTime(row, 16),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '100px',
    render: (row: string) => sliceDateTime(row, 16),
  },
]
