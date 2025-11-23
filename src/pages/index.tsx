import Sidebar from '@/components/layout/Sidebar'
import type { ReactNode } from 'react'

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div className="">
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout
