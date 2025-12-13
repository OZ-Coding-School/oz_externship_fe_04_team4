import { useLayoutEffect, useRef, useState } from 'react'

import type { TagType } from '@/types'

const WRAPPER_STYLE = 'flex truncate text-sm text-[#374151] w-[180px]'

type TagFilterPreviewProps = {
  tags: TagType[]
}

export default function TagFilterPreview({ tags }: TagFilterPreviewProps) {
  const measureRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  useLayoutEffect(() => {
    const parent = measureRef.current
    if (!parent) return

    const children = Array.from(parent.children) as HTMLDivElement[]

    const parentWidth = parent.getBoundingClientRect().width
    let widthSum = 0
    let count = 0

    for (const child of children) {
      const rect = child.getBoundingClientRect()
      const style = window.getComputedStyle(child)

      const childWidth = rect.width
      const marginRight = parseFloat(style.marginRight || '0')

      const totalChildWidth = childWidth + marginRight

      if (widthSum + totalChildWidth > parentWidth) break

      widthSum += totalChildWidth
      count += 1
    }

    setVisibleCount(count || tags.length)
  }, [tags])

  return (
    <div className="relative flex items-center overflow-hidden">
      {/* 1) 측정용: 전체 태그 렌더 (보이지 않게) */}
      <div
        ref={measureRef}
        className={`${WRAPPER_STYLE} pointer-events-none invisible absolute top-0 left-0`}
        aria-hidden
      >
        {tags.map((el) => (
          <div
            key={el.id}
            className="mr-0.5 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el.name}
          </div>
        ))}
      </div>

      {/* 2) 실제 화면에 보이는 영역 */}
      {visibleCount === 0 ? (
        <div className={WRAPPER_STYLE}>태그 입력</div>
      ) : (
        <div className={WRAPPER_STYLE}>
          {tags.slice(0, visibleCount).map((el) => (
            <div
              key={el.id}
              className="mr-0.5 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el.name}
            </div>
          ))}
        </div>
      )}

      {tags.length > visibleCount && (
        <div className="ml-1 w-[30px] rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          +{tags.length - visibleCount}
        </div>
      )}
    </div>
  )
}
