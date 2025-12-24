import type { UserDetailUser } from '@/pages/types/users'

type UserDetailProfile = {
  isEditMode: boolean
  profileImg: string
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  user: UserDetailUser
  errors: Record<string, string>
}
export function UserDetailProfile({
  isEditMode,
  profileImg,
  handleImgChange,
  user,
  errors,
}: UserDetailProfile) {
  const inputId = `profile-input-${user.id}`
  const DEFAULT_PROFILE = 'https://placehold.co/80'

  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 text-center">
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center gap-1 pb-6 ${
              isEditMode ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <img
              src={profileImg || user.profile_img_url || DEFAULT_PROFILE}
              alt="회원 프로필 사진"
              className="h-20 w-20 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE
              }}
            />

            {isEditMode && (
              <span className="absolute -bottom-2 left-0 text-base font-medium whitespace-nowrap text-[#2563EB]">
                프로필 사진 변경
              </span>
            )}
          </label>

          {isEditMode && (
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              className="hidden"
            />
          )}
        </div>

        <div className="-mt-6 flex flex-col">
          <span className="text-xl font-semibold">{user.role}</span>
          <span className="text-base">{user.email}</span>
        </div>
      </div>
      {isEditMode && !profileImg && !user.profile_img_url && (
        <span className="text-xs text-gray-400">
          프로필 사진을 등록해 주세요
        </span>
      )}
      {isEditMode && errors.profile_img && (
        <span className="text-sm text-red-500">{errors.profile_img}</span>
      )}
    </>
  )
}
