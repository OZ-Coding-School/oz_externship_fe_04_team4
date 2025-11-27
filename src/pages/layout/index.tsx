import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

import Sidebar from '@/components/layout/Sidebar'

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen">
      {pathname !== '/' && <Sidebar />}
      <div className="flex-1 bg-gray-50">{children}</div>
    </div>
  )
}

export default Layout
