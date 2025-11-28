// 스터디관리 / 강의관리

import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'

type Lecture = {
  id: number
  thimbnail: string
  title: string
  instructor: string
  platform: string
  createAt: string
  updateAt: string
}
export default function LectureManagementPage() {
  const [search, setSearch] = useState<string>('')
  // const [currentPage, setCurrentPage] = useState<number>(1)

  // const columns: Column<Lecture>[] = [
  //   { key: 'id', header: 'ID', width: '60px' },
  //   {
  //     key: 'thumbnail',
  //     header: '썸네일',
  //     width: '120px',
  //     render: (value: string) => (
  //       <img
  //         src={value}
  //         alt="강의 썸네일"
  //         className="h-12 w-16 rounded object-cover"
  //       />
  //     ),
  //   },
  //   {
  //     key: 'title',
  //     header: '강의명',
  //     width: '350px',
  //   },
  //   {
  //     key: 'instructor',
  //     header: '강사명',
  //     width: '120px',
  //   },
  //   {
  //     key: 'platform',
  //     header: '플랫폼',
  //     width: '100px',
  //     render: (value) => (
  //       <span
  //         className={`inline-block rounded px-2 py-1 text-xs ${
  //           value === 'Udemy'
  //             ? 'bg-purple-100 text-purple-700'
  //             : 'bg-green-100 text-green-700'
  //         }`}
  //       >
  //         {value}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'createdAt',
  //     header: '생성일시',
  //     width: '150px',
  //   },
  //   {
  //     key: 'updatedAt',
  //     header: '수정일시',
  //     width: '150px',
  //   },
  // ]
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <FilterBar
        searchConfig={{
          label: '검색',
          placeholder: '강의명, 강사명 검색...',
          value: search,
          onChange: (value) => {
            setSearch(value)
            // setCurrentPage(1)
          },
        }}
      />

      <div className="border-t border-gray-200" />
    </div>
  )
}
