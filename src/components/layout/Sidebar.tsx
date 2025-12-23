import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  ReceiptText,
  Star,
  User,
  UserRoundCog,
  UserRoundPlus,
  UserRoundX,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'
import { useLogout } from '@/hooks'

const TITLE_BASE_STYLE =
  'flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3'

const LINK_BASE_STYLE =
  'flex w-[200px] items-center rounded-lg px-2 py-3 hover:bg-[#FEF9C3] hover:text-[#854D0E] active:font-semibold active:bg-[#FDE38A] group aria-[current=page]:bg-[#FEF9C3] aria-[current=page]:text-[#854D0E]'

const ICON_STYLE =
  'group-hover:stroke-[#854D0E] group-active:scale-[1.2] aria-[current=page]:stroke-[#854D0E]'

export default function Sidebar() {
  type OpenMenu = 'users' | 'study' | 'recruitment' | null
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)

  const location = useLocation()
  const pathname = location.pathname
  const isUserOpen = openMenu === 'users'
  const isStudyOpen = openMenu === 'study'
  const isRecruitmentOpen = openMenu === 'recruitment'

  const logout = useLogout()
  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
  }
  useEffect(() => {
    if (pathname.startsWith(ROUTE_PATHS.MEMBERS.DASHBOARD)) {
      setOpenMenu('users')
    } else if (pathname.startsWith(ROUTE_PATHS.MEMBERS.USERS)) {
      setOpenMenu('users')
    } else if (pathname.startsWith(ROUTE_PATHS.MEMBERS.WITHDRAWALS)) {
      setOpenMenu('users')
    } else if (pathname.startsWith('/study')) {
      setOpenMenu('study')
    } else if (pathname.startsWith('/recruitment')) {
      setOpenMenu('recruitment')
    }
  }, [pathname])
  return (
    <div className="flex h-dvh w-[256px] flex-col items-center justify-between border-r border-[#E5E7EB]">
      <div className="flex flex-col items-center">
        <div className="text-bold flex h-7 w-[256px] cursor-default items-center p-6 text-xl font-bold">
          관리자 패널
        </div>

        <div className="flex w-[223px] flex-col">
          <div className={TITLE_BASE_STYLE} onClick={() => toggleMenu('users')}>
            <div className="flex items-center">
              <UserRoundCog color="#374151" size={20} />
              <div className="ml-3">회원관리</div>
            </div>
            {isUserOpen ? (
              <ChevronRight size={16} color="#374151" />
            ) : (
              <ChevronDown size={16} color="#374151" />
            )}
          </div>

          <div
            className={`grid transition-all duration-200 ease-out ${isUserOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
          >
            <div className="flex flex-col items-end overflow-hidden">
              <Link
                to={ROUTE_PATHS.MEMBERS.USERS}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.MEMBERS.USERS ? 'page' : undefined
                }
              >
                <User
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.MEMBERS.USERS ? 'page' : undefined
                  }
                />
                <div className="ml-3">유저 관리</div>
              </Link>
              <Link
                to={ROUTE_PATHS.MEMBERS.WITHDRAWALS}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.MEMBERS.WITHDRAWALS
                    ? 'page'
                    : undefined
                }
              >
                <UserRoundX
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.MEMBERS.WITHDRAWALS
                      ? 'page'
                      : undefined
                  }
                />
                <div className="ml-3">탈퇴 관리</div>
              </Link>
              <Link
                to={ROUTE_PATHS.MEMBERS.DASHBOARD}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.MEMBERS.DASHBOARD
                    ? 'page'
                    : undefined
                }
              >
                <LayoutDashboard
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.MEMBERS.DASHBOARD
                      ? 'page'
                      : undefined
                  }
                />
                <div className="ml-3">대시보드</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-[223px] flex-col">
          <div className={TITLE_BASE_STYLE} onClick={() => toggleMenu('study')}>
            <div className="flex items-center">
              <BookOpen color="#374151" size={20} />
              <div className="ml-3">스터디 관리</div>
            </div>
            {isStudyOpen ? (
              <ChevronRight size={16} color="#374151" />
            ) : (
              <ChevronDown size={16} color="#374151" />
            )}
          </div>

          <div
            className={`grid transition-all duration-200 ease-out ${isStudyOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
          >
            <div className="flex flex-col items-end overflow-hidden">
              <Link
                to={ROUTE_PATHS.STUDY.COURSES}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.STUDY.COURSES ? 'page' : undefined
                }
              >
                <GraduationCap
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.STUDY.COURSES ? 'page' : undefined
                  }
                />
                <div className="ml-3">강의 관리</div>
              </Link>
              <Link
                to={ROUTE_PATHS.STUDY.GROUPS}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.STUDY.GROUPS ? 'page' : undefined
                }
              >
                <Users
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.STUDY.GROUPS ? 'page' : undefined
                  }
                />
                <div className="ml-3">스터디 그룹 관리</div>
              </Link>
              <Link
                to={ROUTE_PATHS.STUDY.REVIEWS}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.STUDY.REVIEWS ? 'page' : undefined
                }
              >
                <Star
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.STUDY.REVIEWS ? 'page' : undefined
                  }
                />
                <div className="ml-3">리뷰 관리</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-[223px] flex-col">
          <div
            className={TITLE_BASE_STYLE}
            onClick={() => toggleMenu('recruitment')}
          >
            <div className="flex items-center">
              <Megaphone color="#374151" size={20} />
              <div className="ml-3">스터디 구인 공고 관리</div>
            </div>
            {isRecruitmentOpen ? (
              <ChevronRight size={16} color="#374151" />
            ) : (
              <ChevronDown size={16} color="#374151" />
            )}
          </div>

          <div
            className={`grid transition-all duration-200 ease-out ${isRecruitmentOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
          >
            <div className="flex flex-col items-end overflow-hidden">
              <Link
                to={ROUTE_PATHS.RECRUITMENT.LIST}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.RECRUITMENT.LIST ? 'page' : undefined
                }
              >
                <ReceiptText
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.RECRUITMENT.LIST
                      ? 'page'
                      : undefined
                  }
                />
                <div className="ml-3">공고 관리</div>
              </Link>
              <Link
                to={ROUTE_PATHS.RECRUITMENT.APPLICATIONS}
                className={LINK_BASE_STYLE}
                aria-current={
                  pathname === ROUTE_PATHS.RECRUITMENT.APPLICATIONS
                    ? 'page'
                    : undefined
                }
              >
                <UserRoundPlus
                  size={16}
                  color="#4B5563"
                  className={ICON_STYLE}
                  aria-current={
                    pathname === ROUTE_PATHS.RECRUITMENT.APPLICATIONS
                      ? 'page'
                      : undefined
                  }
                />
                <div className="ml-3">지원 내역 관리</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={logout}
        className="m-5 cursor-pointer rounded-lg border-2 border-gray-400 px-10 py-2 hover:bg-gray-400 hover:font-bold hover:text-white"
      >
        로그아웃
      </div>
    </div>
  )
}
