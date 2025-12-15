import { Loader } from 'lucide-react'
type LoadingProps = {
  size?: number
  className?: string
  label?: string
}
export function Loading({
  size = 20,
  className = '',
  label = '로딩 중...',
}: LoadingProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Loader className="animate-spin" size={size} aria-hidden="true" />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}
