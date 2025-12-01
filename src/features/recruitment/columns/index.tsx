import { mockRecruitmentList } from '@/mocks/data/accounts'
import { sliceDateTime } from '@/utils/format'

export const RecruitmentListData = mockRecruitmentList.results.map((el) => ({
  id: el.id,
  title: el.title,
  tags: el.tags,
  is_closed: el.is_closed ? '마감' : '모집중',
  views_count: el.views_count,
  bookmark_count: el.bookmark_count,
  close_at: el.close_at,
  created_at: el.created_at,
  updated_at: el.updated_at,
}))

export const RecruitmentColumns = () => {
  return [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'title', header: '공고 제목', width: '250px' },
    {
      key: 'tags',
      header: '태그',
      width: '150px',
      render: (value: { id: number; name: string }[]) => {
        const tags = value

        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )
      },
    },
    {
      key: 'close_at',
      header: '마감 기한',
      width: '100px',
      render: (value: string) => sliceDateTime(value, 10),
    },
    {
      key: 'is_closed',
      header: '상태',
      width: '80px',
      render: (value: string) => (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs ${
            value === '마감'
              ? 'bg-[#F3F4F6] text-[#1F2937]'
              : 'text-state-permission-txt bg-[#DCFCE7]'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'views_count',
      header: '조회수',
      width: '80px',
      sortable: { asc: 'oldest', desc: 'latest' },
    },
    {
      key: 'bookmark_count',
      header: '북마크',
      width: '80px',
      sortable: { asc: 'closed_asc', desc: 'closed_desc' },
    },
    {
      key: 'created_at',
      header: '생성일시',
      width: '100px',
      sortable: { asc: 'closed_asc', desc: 'closed_desc' },
      render: (value: string) => sliceDateTime(value, 16),
    },
    {
      key: 'updated_at',
      header: '수정일시',
      width: '100px',
      sortable: { asc: 'closed_asc', desc: 'closed_desc' },
      render: (value: string) => sliceDateTime(value, 16),
    },
  ]
}
