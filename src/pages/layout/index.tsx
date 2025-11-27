import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

import Sidebar from '@/components/layout/Sidebar'

type Props = { children: ReactNode }

const PATHNAME_TITLE_MAP: Record<string, string> = {
  '/members/users': '유저 관리',
  '/members/withdrawals': '탈퇴 관리',
  '/members/dashboard': '대시 보드',
  '/study/courses': '강의 관리',
  '/study/groups': '스터디 그룹 관리',
  '/study/reviews': '리뷰 관리',
  '/recruitment/applications': '스터디 구인 공고 관리',
  '/recruitment/posts': '지원 내역 관리',
}

const getPageTitle = (pathname: string): string => {
  return PATHNAME_TITLE_MAP[pathname]
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen">
      {pathname === '/' ? (
        <div className="flex-1 bg-gray-50">{children}</div>
      ) : (
        <>
          <Sidebar />
          <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              {getPageTitle(pathname)}
            </h1>
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default Layout
