import Sidebar from '@/components/layout/Sidebar'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

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
