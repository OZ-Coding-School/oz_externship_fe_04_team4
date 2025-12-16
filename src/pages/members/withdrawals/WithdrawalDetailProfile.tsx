import type { WithDrawwDetailFormType } from '@/pages/types/withdraw'

type WithdrawalDetailProfileProps = {
  form: WithDrawwDetailFormType
}

export function WithdrawalDetailProfile({
  form,
}: WithdrawalDetailProfileProps) {
  return (
    <div className="mt-4 flex items-center justify-start gap-4">
      <div className="items relative px-2 pb-6 text-center">
        <label htmlFor="file-input">
          <img
            src={form.profile_img_url}
            alt="회원 프로필 사진"
            className="border-b-primary-light-gray h-20 w-20 rounded-full border object-cover"
          />
        </label>
      </div>
      <div className="-mt-6 flex flex-col">
        <span className="text-xl font-semibold">{form.name}</span>
        <span className="text-base">{form.email}</span>
      </div>
    </div>
  )
}
