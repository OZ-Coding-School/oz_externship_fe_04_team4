import React from 'react'

import { WithdrawalDetailProfile } from '@/pages/members/withdrawals/WithdrawalDetailProfile'
import { WithdrawalDetailUserContent } from '@/pages/members/withdrawals/WithdrawalDetailUserContent'
import { WithdrawalDetailWithdrawalContent } from '@/pages/members/withdrawals/WithdrawalDetailWithdrawalContent'
import type { WithDrawwDetailFormType } from '@/pages/types/withdraw'

interface WithdrawlDetailFormProps {
  form: WithDrawwDetailFormType
}
function WithdrawalDetailFormComponent({ form }: WithdrawlDetailFormProps) {
  return (
    <div>
      <p className="text-color-primary-black text-lg font-semibold">
        회원 정보
      </p>
      <WithdrawalDetailProfile form={form} />
      <div className="flex justify-between pt-6">
        <WithdrawalDetailUserContent form={form} />
      </div>
      <div className="mt-8">
        <p className="text-color-primary-black text-lg font-semibold">
          탈퇴 정보
        </p>
        <WithdrawalDetailWithdrawalContent form={form} />
      </div>
    </div>
  )
}
export const WithdrawalDetailForm = React.memo(WithdrawalDetailFormComponent)
