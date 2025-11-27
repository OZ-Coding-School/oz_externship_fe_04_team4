import type { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

export function MainPageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
      {children}
    </div>
  )
}
