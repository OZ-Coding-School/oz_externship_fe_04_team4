import { twClassName } from '@/utils/getTwClassName'

interface PlatformBadgeProps {
  platform: string
  className?: string
}

const PLATFORM_STYLES: Record<string, string> = {
  UDEMY: 'bg-purple-100 text-purple-700',
  INFLEARN: 'bg-green-100 text-green-700',
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const baseClass = 'inline-block rounded px-2 py-1 text-xs'
  const platformStyle = PLATFORM_STYLES[platform] || 'bg-gray-100 text-gray-700'

  return (
    <span className={twClassName(baseClass, platformStyle, className)}>
      {platform}
    </span>
  )
}
