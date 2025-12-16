import Input from '@/components/common/Input'
import type { WithDrawwDetailFormType } from '@/pages/types/withdraw'

type WithdrawalDetailWithdrawalContentProps = {
  form: WithDrawwDetailFormType
}
export function WithdrawalDetailWithdrawalContent({
  form,
}: WithdrawalDetailWithdrawalContentProps) {
  return (
    <>
      <div className="mt-4 flex justify-between">
        <div className="flex flex-col gap-6">
          <Input
            label="탈퇴요청 고유 ID"
            name="id"
            value={String(form.id)}
            editable={false}
          />
          <Input
            label="탈퇴사유"
            name="reason"
            value={form.reason}
            editable={false}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label="탈퇴요청 일시"
            name="withdrawn_at"
            value={form.withdrawn_at}
            editable={false}
          />
          <Input
            label="삭제 예정 일시"
            name="due_date"
            value={form.due_date}
            editable={false}
          />
        </div>
      </div>
      <div className="mt-4 flex w-full">
        <Input
          label="탈퇴 상세 사유"
          name="reason"
          wrapperClassName="w-full"
          inputClassName="w-full"
          value={form.reason_detail}
          editable={false}
        />
      </div>
    </>
  )
}
