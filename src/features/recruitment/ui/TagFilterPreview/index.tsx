import { useLayoutEffect, useRef, useState } from 'react'

import { tM } from '@/lib/twMerge'
import type { TagType } from '@/types'

const WRAPPER_STYLE = 'flex truncate text-sm text-[#374151] w-[180px]'
const TAG_STYLE = 'rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700'

type TagFilterPreviewProps = {
  usage: 'filter' | 'table'
  tags: TagType[]
}

export default function TagFilterPreview({
  usage,
  tags,
}: TagFilterPreviewProps) {
  const measureRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  const emptyView =
    usage === 'filter' ? (
      <div className={WRAPPER_STYLE}>태그 입력</div>
    ) : (
      <div className={TAG_STYLE}>선택된 태그가 없습니다.</div>
    )

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
      const gapRight = parseFloat(style.marginRight || '0')

      const totalChildWidth = childWidth + gapRight

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
          <div key={el.id} className={tM('mr-0.5', TAG_STYLE)}>
            {el.name}
          </div>
        ))}
      </div>

      {/* 2) 실제 화면에 보이는 영역 */}
      {tags.length === 0 ? (
        emptyView
      ) : (
        <div className={WRAPPER_STYLE}>
          {tags.slice(0, visibleCount).map((el) => (
            <div key={el.id} className={tM('mr-0.5', TAG_STYLE)}>
              {el.name}
            </div>
          ))}
        </div>
      )}

      {tags.length > visibleCount && (
        <div className={tM('ml-1 w-[30px]', TAG_STYLE)}>
          +{tags.length - visibleCount}
        </div>
      )}
    </div>
  )
}
