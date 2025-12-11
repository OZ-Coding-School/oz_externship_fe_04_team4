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
import { useState } from 'react'
import { Link, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'

const TITLE_BASE_STYLE =
  'flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3'
const LINK_BASE_STYLE =
  'flex w-[200px] items-center rounded-lg px-2 py-3 hover:bg-[#FEF9C3] hover:text-[#854D0E] active:font-semibold active:bg-[#FDE38A] group aria-[current=true]:bg-[#FEF9C3] aria-[current=true]:text-[#854D0E]'
const ICON_STYLE =
  'group-hover:stroke-[#854D0E] group-active:scale-[1.2] aria-[current=true]:stroke-[#854D0E]'

export default function Sidebar() {
  const [userToggle, setUserToggle] = useState(false)
  const [studyToggle, setStudyToggle] = useState(false)
  const [recruitmentToggle, setRecruitmentToggle] = useState(false)

  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="flex h-dvh w-[256px] flex-col items-center border-r border-[#E5E7EB]">
      <div className="text-bold flex h-7 w-[256px] cursor-default items-center p-6 text-xl font-bold">
        관리자 패널
      </div>

      <div className="flex w-[223px] flex-col">
        <div
          className={TITLE_BASE_STYLE}
          onClick={() => setUserToggle(!userToggle)}
        >
          <div className="flex items-center">
            <UserRoundCog color="#374151" size={20} />
            <div className="ml-3">회원관리</div>
          </div>
          {userToggle ? (
            <ChevronRight size={16} color="#374151" />
          ) : (
            <ChevronDown size={16} color="#374151" />
          )}
        </div>

        <div
          className={`grid transition-all duration-200 ease-out ${userToggle ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
        >
          <div className="flex flex-col items-end overflow-hidden">
            <Link
              to={ROUTE_PATHS.MEMBERS.USERS}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.MEMBERS.USERS}
            >
              <User
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.MEMBERS.USERS}
              />
              <div className="ml-3">유저 관리</div>
            </Link>
            <Link
              to={ROUTE_PATHS.MEMBERS.WITHDRAWALS}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.MEMBERS.WITHDRAWALS}
            >
              <UserRoundX
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.MEMBERS.WITHDRAWALS}
              />
              <div className="ml-3">탈퇴 관리</div>
            </Link>
            <Link
              to={ROUTE_PATHS.MEMBERS.DASHBOARD}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.MEMBERS.DASHBOARD}
            >
              <LayoutDashboard
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.MEMBERS.DASHBOARD}
              />
              <div className="ml-3">대시보드</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-[223px] flex-col">
        <div
          className={TITLE_BASE_STYLE}
          onClick={() => setStudyToggle(!studyToggle)}
        >
          <div className="flex items-center">
            <BookOpen color="#374151" size={20} />
            <div className="ml-3">스터디 관리</div>
          </div>
          {studyToggle ? (
            <ChevronRight size={16} color="#374151" />
          ) : (
            <ChevronDown size={16} color="#374151" />
          )}
        </div>

        <div
          className={`grid transition-all duration-200 ease-out ${studyToggle ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
        >
          <div className="flex flex-col items-end overflow-hidden">
            <Link
              to={ROUTE_PATHS.STUDY.COURSES}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.STUDY.COURSES}
            >
              <GraduationCap
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.STUDY.COURSES}
              />
              <div className="ml-3">강의 관리</div>
            </Link>
            <Link
              to={ROUTE_PATHS.STUDY.GROUPS}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.STUDY.GROUPS}
            >
              <Users
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.STUDY.GROUPS}
              />
              <div className="ml-3">스터디 그룹 관리</div>
            </Link>
            <Link
              to={ROUTE_PATHS.STUDY.REVIEWS}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.STUDY.REVIEWS}
            >
              <Star
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.STUDY.REVIEWS}
              />
              <div className="ml-3">리뷰 관리</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-[223px] flex-col">
        <div
          className={TITLE_BASE_STYLE}
          onClick={() => setRecruitmentToggle(!recruitmentToggle)}
        >
          <div className="flex items-center">
            <Megaphone color="#374151" size={20} />
            <div className="ml-3">스터디 구인 공고 관리</div>
          </div>
          {recruitmentToggle ? (
            <ChevronRight size={16} color="#374151" />
          ) : (
            <ChevronDown size={16} color="#374151" />
          )}
        </div>

        <div
          className={`grid transition-all duration-200 ease-out ${recruitmentToggle ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} `}
        >
          <div className="flex flex-col items-end overflow-hidden">
            <Link
              to={ROUTE_PATHS.RECRUITMENT.LIST}
              onClick={() => setRecruitmentToggle(true)}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.RECRUITMENT.LIST}
            >
              <ReceiptText
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.RECRUITMENT.LIST}
              />
              <div className="ml-3">공고 관리</div>
            </Link>
            <Link
              to={ROUTE_PATHS.RECRUITMENT.APPLICATIONS}
              onClick={() => setRecruitmentToggle(true)}
              className={LINK_BASE_STYLE}
              aria-current={pathname === ROUTE_PATHS.RECRUITMENT.APPLICATIONS}
            >
              <UserRoundPlus
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === ROUTE_PATHS.RECRUITMENT.APPLICATIONS}
              />
              <div className="ml-3">지원 내역 관리</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
