import { useRecruitmentTagListStore } from '@/store/recruitment/useRecruitmentTagsStore'

export default function TagFilterPreview() {
  const { selectedTagsResult } = useRecruitmentTagListStore()

  const joined = selectedTagsResult.join('')
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(selectedTagsResult.join(''))
  const hasTags = selectedTagsResult.length > 0
  const isMultiTag = selectedTagsResult.length > 1

  if (!hasTags) {
    return (
      <div className="flex gap-0.5 truncate text-sm text-[#374151]">
        {selectedTagsResult.length
          ? selectedTagsResult.map((el) => (
              <div
                key={el}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {el}
              </div>
            ))
          : '태그 입력'}
      </div>
    )
  }
  if (!isKorean) {
    const isLong = joined.length > 30
    if (isLong && isMultiTag) {
      const englishVisible = selectedTagsResult
        .join('&^')
        .slice(0, 25)
        .split('&^')

      const restCount = selectedTagsResult.length - englishVisible.length

      return (
        <div className="flex gap-0.5 text-sm text-[#374151]">
          {englishVisible.map((el) => (
            <div
              key={el}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el}
            </div>
          ))}
          {restCount > 0 && (
            <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {`+ ${restCount}`}
            </div>
          )}
        </div>
      )
    } // (2) 한 개만 있고 길이 김 → 한 개만 길이 제한해서 보여주기
    if (isLong && !isMultiTag) {
      return (
        <div className="flex gap-0.5 text-sm text-[#374151]">
          {selectedTagsResult.map((el) => (
            <div
              key={el}
              className="max-w-[210px] truncate rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el}
            </div>
          ))}
        </div>
      )
    }

    // (3) 길이도 안 김 → 전부 그대로 노출
    return (
      <div className="flex gap-0.5 truncate text-sm text-[#374151]">
        {selectedTagsResult.map((el) => (
          <div
            key={el}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el}
          </div>
        ))}
      </div>
    )
  }

  // -----------------------------
  // 2) 한글이 포함된 경우
  // -----------------------------
  const isLongKorean = joined.length > 16

  if (isLongKorean) {
    const koreanVisible = selectedTagsResult.join('&^').slice(0, 16).split('&^')

    const restCount = selectedTagsResult.length - koreanVisible.length

    return (
      <div className="flex gap-0.5 truncate text-sm text-[#374151]">
        {koreanVisible.map((el) => (
          <div
            key={el}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el}
          </div>
        ))}
        {restCount > 0 && (
          <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {`+ ${restCount}`}
          </div>
        )}
      </div>
    )
  }

  // (한글인데 전체 길이는 안 김) → 그대로 노출
  return (
    <div className="flex gap-0.5 truncate text-sm text-[#374151]">
      {selectedTagsResult.map((el) => (
        <div
          key={el}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
        >
          {el}
        </div>
      ))}
    </div>
  )
}
