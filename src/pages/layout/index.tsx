import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useState, type ReactNode } from 'react'
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
  const [isClose, setIsClose] = useState(false)

  if (pathname === '/')
    return <div className="flex-1 bg-gray-50">{children}</div>

  return (
    <div className="relative flex">
      {isClose ? (
        <div className="group absolute inline-block">
          <PanelLeftOpen
            className="top-1 inline-block cursor-pointer hover:scale-105"
            onClick={() => setIsClose(false)}
          />
          <div className="pointer-events-none absolute top-[25px] left-[25px] z-10 rounded-md bg-black px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
            사이드바 펼치기
          </div>
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="group absolute inline-block">
            <PanelLeftClose
              className="absolute top-1 left-[245px] cursor-pointer hover:scale-105"
              onClick={() => setIsClose(true)}
            />
            <div className="pointer-events-none absolute top-[25px] left-[270px] z-10 rounded-md bg-black px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              사이드바 접기
            </div>
          </div>
        </>
      )}

      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {getPageTitle(pathname)}
        </h1>
        {children}
      </div>
    </div>
  )
}

export default Layout
