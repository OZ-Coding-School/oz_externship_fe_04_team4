import Input from '@/components/common/Input'
import type { WithDrawwDetailFormType } from '@/pages/types/withdraw'

type WithdrawalDetailUserContentProps = {
  form: WithDrawwDetailFormType
}
export function WithdrawalDetailUserContent({
  form,
}: WithdrawalDetailUserContentProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Input label="이름" name="name" value={form.name} editable={false} />
        <Input
          label="닉네임"
          name="nickname"
          value={form.nickname}
          editable={false}
        />
        <Input
          label="권한"
          name="role"
          className="cursor-default"
          value={form.role}
          editable={false}
        />
        <Input
          label="회원가입 일시"
          name="created_at"
          value={form.created_at}
          editable={false}
        />
      </div>
      <div className="flex flex-col gap-6">
        <Input
          label="성별"
          value={form.gender}
          editable={false}
          name="gender"
        />
        <Input
          label="이메일"
          name="email"
          value={form.email}
          editable={false}
        />
        <Input
          label="상태"
          name="status"
          value={form.status}
          editable={false}
        />
      </div>
    </>
  )
}
