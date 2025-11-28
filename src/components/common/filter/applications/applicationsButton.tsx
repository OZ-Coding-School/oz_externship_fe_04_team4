type Props = {
  setOpen: (value: boolean) => void
}

export default function ApplicationsButton({ setOpen }: Props) {
  return (
    <div className="flex h-[73px] w-full items-center justify-end px-6 py-4">
      <div className="flex h-10 w-auto items-center">
        <div
          onClick={() => setOpen(false)}
          className="mr-3 cursor-pointer rounded-lg bg-[#6B7280] px-4 py-2 text-white hover:bg-[#585e6a] active:font-bold"
        >
          취소
        </div>
        <div className="cursor-pointer rounded-lg bg-[#EAB308] px-4 py-2 text-white hover:bg-[#854D0E] active:font-bold">
          적용하기
        </div>
      </div>
    </div>
  )
}
