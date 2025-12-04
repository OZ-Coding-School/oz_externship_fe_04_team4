type RecruitmentStatusBadgeProps = {
  is_closed: boolean | undefined
  className: string
}

export const RecruitmentStatusBadge = ({
  is_closed,
  className,
}: RecruitmentStatusBadgeProps) => {
  return (
    <div className={className}>
      {is_closed ? (
        <div className="inline-block rounded-full bg-[#F3F4F6] px-2 py-1 text-xs text-[#1F2937]">
          마감
        </div>
      ) : (
        <div className="text-state-permission-txt inline-block rounded-full bg-[#DCFCE7] px-2 py-1 text-xs">
          모집중
        </div>
      )}
    </div>
  )
}
