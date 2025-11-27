import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

import Sidebar from '@/components/layout/Sidebar'

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()
  return (
    <div className="flex">
      {pathname !== '/' && <Sidebar />}
      {children}
    </div>
  )
}

export default Layout
