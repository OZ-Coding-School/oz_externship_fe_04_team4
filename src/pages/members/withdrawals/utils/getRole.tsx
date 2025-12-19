import { ROLE, ROLE_LABEL, type RoleType } from '@/config'
import { twClassName } from '@/utils/getTwClassName'

export const getRole = (role: RoleType) => {
  const baseClass = 'inline-block px-2 py-1 text-xs rounded-[999px]'

  const style =
    role === ROLE.ADMIN
      ? 'bg-[#F3E8FF] text-[#6B21A8]'
      : role === ROLE.STAFF
        ? 'bg-[#DBEAFE] text-[#1E40AF]'
        : 'bg-[#F3F4F6] text-[#1F2937]'

  return (
    <span className={twClassName([baseClass, style])}>{ROLE_LABEL[role]}</span>
  )
}
