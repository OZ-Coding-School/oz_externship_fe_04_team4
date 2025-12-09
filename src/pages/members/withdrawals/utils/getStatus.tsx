import clsx from 'clsx'

import { STATUS_LABEL, STATUS_STYLE, type StatusType } from '@/config/status'

export const getStatus = (status: StatusType) => {
  const baseClass = 'inline-block px-2 py-1 text-xs rounded-[999px]'
  const style = STATUS_STYLE[status] ?? STATUS_STYLE.inactive

  return <span className={clsx(baseClass, style)}>{STATUS_LABEL[status]}</span>
}
