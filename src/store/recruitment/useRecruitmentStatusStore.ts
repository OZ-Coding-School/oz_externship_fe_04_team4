import { create } from 'zustand'

type StatusType = 'all' | 'false' | 'true'

type StatusState = {
  status: StatusType

  setStatus: (value: StatusType) => void
  resetStatus: () => void
}

export const ueeRecruitmentStatusStore = create<StatusState>((set) => ({
  status: 'all',

  setStatus: (value) => set({ status: value }),
  resetStatus: () => set({ status: 'all' }),
}))
