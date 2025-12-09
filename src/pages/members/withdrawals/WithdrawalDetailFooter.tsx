import Button from '@/components/common/Button'

// interface WithdrawalDetailFooterProps {}
export function WithdrawalDetailFooter() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex justify-end gap-3">
        <Button variant="close">닫기</Button>
      </div>
    </div>
  )
}
