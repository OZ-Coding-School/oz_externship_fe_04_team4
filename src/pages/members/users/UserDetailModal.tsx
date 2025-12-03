import { useQueryClient } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { STATUS_LABEL } from '@/config/status'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { formatDataTimeForUserDetail } from '@/utils/formatDataTimeForUserDetail'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
  footer?: ReactNode
}

interface UserDetailUser {
  id: number | string
  birthday: string
  created_at: string
  email: string
  gender: string
  name: string
  nickname: string
  phone_number: string
  profile_img_url: string
  role: string
  status: string
}

interface UserFormType {
  id: number | string
  name: string
  nickname: string
  phone: string
  status: string
  email: string
  gender: string
  birthday: string
  role: string
  joinDateTime: string
}

export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useFetchQuery<UserDetailUser>({
    queryKey: ['user-detail', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
    refetchOnMount: 'always',
  })
  const queryClient = useQueryClient()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [profileImg, setProfileImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [role, setRole] = useState('')
  const [form, setForm] = useState<UserFormType>({
    id: userId ?? 0,
    name: '',
    nickname: '',
    phone: '',
    status: '',
    email: '',
    gender: '',
    birthday: '',
    role: '',
    joinDateTime: '',
  })

  useEffect(() => {
    if (!user) return
    setForm({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone_number ? formatPhoneNumber(user.phone_number) : '',
      status: STATUS_LABEL[user.status as keyof typeof STATUS_LABEL] ?? '',
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL] ?? '',
      joinDateTime: user.created_at
        ? formatDataTimeForUserDetail(user.created_at)
        : '',
    })
  }, [user])

  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false)
    }
    if (!isRoleModalOpen) {
      setRole('')
    } else if (isRoleModalOpen && user) {
      setRole(user.role)
    }
  }, [isOpen, isRoleModalOpen, user])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '')
      setForm((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneBlur = () => {
    setForm((prev) => ({
      ...prev,
      phone: formatPhoneNumber(prev.phone),
    }))
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setProfileImg(previewUrl)
  }

  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'patch',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      refetch()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
      queryClient.refetchQueries({
        queryKey: ['users-list'],
        type: 'active',
      })
    },
  })
  const handleFormEditOk = () => {
    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('nickname', form.nickname)
    formData.append('phone_number', form.phone)
    formData.append('gender', form.gender)

    const statusMap: Record<string, string> = {
      활성: 'active',
      비활성: 'inactive',
      탈퇴: 'withdraw',
    }
    formData.append('status', statusMap[form.status])

    const originalRoleKey = Object.keys(ROLE_LABEL).find(
      (key) => ROLE_LABEL[key as keyof typeof ROLE_LABEL] === form.role
    )
    if (originalRoleKey) {
      formData.append('role', originalRoleKey)
    }
    if (file) {
      formData.append('profile_img', file)
    }
    updateUserMutation.mutate(formData)
  }
  console.log('회원정보 data', user)

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>
  {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="회원 상세 정보"
        className="z-50"
        contentClassName="h-130 overflow-y-auto"
        topCloseButton
        footerClassName="bg-[#F9FAFB]"
        footer={
          <div className="flex w-full items-center justify-between">
            <Button
              variant="custom"
              className="bg-primary-green text-white"
              onClick={() => {
                if (!isEditMode) setIsRoleModalOpen(true)
              }}
            >
              권한 변경하기
            </Button>
            <div className="flex justify-end gap-3">
              {isEditMode ? (
                <Button
                  variant="custom"
                  className="bg-primary-blue text-white"
                  onClick={handleFormEditOk}
                >
                  수정완료
                </Button>
              ) : (
                <Button
                  variant="custom"
                  className="bg-primary-blue text-white"
                  onClick={() => setIsEditMode((prev) => !prev)}
                >
                  수정하기
                </Button>
              )}

              <Button variant="delete">삭제하기</Button>
            </div>
          </div>
        }
      >
        {user && (
          <div>
            <div className="flex items-center justify-start gap-4">
              <div className="relative px-2 pb-6 text-center">
                <label htmlFor="file-input">
                  <img
                    src={profileImg || user.profile_img_url}
                    alt=""
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </label>
                {isEditMode && (
                  <>
                    <button
                      className="absolute right-0 bottom-0 left-0 z-60 cursor-pointer text-base leading-none font-medium whitespace-nowrap text-[#2563EB]"
                      onClick={() => fileInput.current?.click()}
                    >
                      프로필 사진 변경
                    </button>
                    <input
                      ref={fileInput}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      id="file-input"
                      onChange={handleImgChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="-mt-6 flex flex-col">
                <span className="text-xl font-semibold">{user.role}</span>
                <span className="text-base">{user.email}</span>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div className="flex flex-col gap-6">
                <Input label="회원ID" name="id" value={form.id} />
                <Input
                  label="이름"
                  name="name"
                  value={form.name}
                  editable={isEditMode}
                  onChange={handleFormChange}
                />
                <Input
                  label="닉네임"
                  name="nickname"
                  value={form.nickname}
                  editable={isEditMode}
                  onChange={handleFormChange}
                />
                <Input
                  label="연락처"
                  name="phone"
                  value={form.phone}
                  editable={isEditMode}
                  onChange={handleFormChange}
                  onBlur={handlePhoneBlur}
                />
                {isEditMode ? (
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#374151]">
                      상태
                    </span>
                    <div className="relative">
                      <select
                        className={`h-9 w-full appearance-none rounded-lg bg-[#F9FAFB] px-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      >
                        <option value="active">활성</option>
                        <option value="inactive">비활성</option>
                        <option value="withdraw">탈퇴</option>
                      </select>
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                        <ChevronDown size={12} />
                      </span>
                    </div>
                  </label>
                ) : (
                  <Input
                    label="상태"
                    name="status"
                    value={form.status}
                    editable={false}
                  />
                )}
              </div>
              <div className="flex flex-col gap-6">
                <Input label="이메일" name="email" value={form.email} />
                <Input label="성별" value={form.gender} />
                <Input label="생년월일" name="birthday" value={form.birthday} />
                <Input
                  label="권한"
                  name="role"
                  className="cursor-default"
                  value={form.role}
                />
                <Modal
                  isOpen={isRoleModalOpen}
                  onClose={() => setIsRoleModalOpen(false)}
                  title="권한 변경"
                  className="z-60"
                  titleClassName="border-b-0"
                  footerClassName="border-t-0"
                  footer={
                    <div className="flex w-full items-center justify-end gap-2">
                      <Button
                        className="bg-primary-blue text-white"
                        onClick={() => {
                          console.log('선택된 역할:', role)
                          setForm((prev) => ({
                            ...prev,
                            role: ROLE_LABEL[role as keyof typeof ROLE_LABEL],
                          }))
                          setIsRoleModalOpen(false)
                        }}
                      >
                        저장
                      </Button>
                      <Button
                        variant="cancel"
                        onClick={() => setIsRoleModalOpen(false)}
                      >
                        취소
                      </Button>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="admin"
                      className="flex h-full w-full rounded-lg text-base text-black"
                    >
                      <input
                        type="radio"
                        id="admin"
                        name="role-choice"
                        className="peer sr-only"
                        value="admin"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                        관리자
                      </span>
                    </label>
                    <label
                      htmlFor="staff"
                      className="flex h-full w-full rounded-lg text-base text-black"
                    >
                      <input
                        type="radio"
                        id="staff"
                        value="staff"
                        name="role-choice"
                        className="peer sr-only"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                        스태프
                      </span>
                    </label>
                    <label
                      htmlFor="user"
                      className="flex h-full w-full rounded-lg text-base text-black"
                    >
                      <input
                        type="radio"
                        id="user"
                        name="role-choice"
                        className="peer sr-only"
                        value="user"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                        일반회원
                      </span>
                    </label>
                  </div>
                </Modal>
                <Input
                  label="회원가입 일시"
                  name="created_at"
                  value={form.joinDateTime}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    )
  }
}
