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

const TITLE_BASE_STYLE =
  'flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3'
const LINK_BASE_STYLE =
  'flex w-[200px] items-center rounded-lg px-2 py-3 hover:bg-[#FEF9C3] hover:text-[#854D0E] active:font-semibold active:bg-[#FDE38A] group aria-[current=true]:bg-[#FEF9C3] aria-[current=true]:text-[#854D0E]'
const ICON_STYLE =
  'group-hover:stroke-[#854D0E] group-active:scale-[1.2] aria-[current=true]:stroke-[#854D0E]'

export default function SideBar() {
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
              to={'/members/users'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/members/users'}
            >
              <User
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/members/users'}
              />
              <div className="ml-3">유저 관리</div>
            </Link>
            <Link
              to={'/members/withdrawals'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/members/withdrawals'}
            >
              <UserRoundX
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/members/withdrawals'}
              />
              <div className="ml-3">탈퇴 관리</div>
            </Link>
            <Link
              to={'/members/dashboard'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/members/dashboard'}
            >
              <LayoutDashboard
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/members/dashboard'}
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
              to={'/study/courses'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/study/courses'}
            >
              <GraduationCap
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/study/courses'}
              />
              <div className="ml-3">강의 관리</div>
            </Link>
            <Link
              to={'/study/groups'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/study/groups'}
            >
              <Users
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/study/groups'}
              />
              <div className="ml-3">스터디 그룹 관리</div>
            </Link>
            <Link
              to={'/study/reviews'}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/study/reviews'}
            >
              <Star
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/study/reviews'}
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
              to={'/recruitment/recruitment'}
              onClick={() => setRecruitmentToggle(true)}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/recruitment/recruitment'}
            >
              <ReceiptText
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/recruitment/recruitment'}
              />
              <div className="ml-3">공고 관리</div>
            </Link>
            <Link
              to={'/recruitment/applications'}
              onClick={() => setRecruitmentToggle(true)}
              className={LINK_BASE_STYLE}
              aria-current={pathname === '/recruitment/applications'}
            >
              <UserRoundPlus
                size={16}
                color="#4B5563"
                className={ICON_STYLE}
                aria-current={pathname === '/recruitment/applications'}
              />
              <div className="ml-3">지원 내역 관리</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
