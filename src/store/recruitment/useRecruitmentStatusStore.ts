import { create } from 'zustand'

type statusType = 'all' | 'false' | 'true' | string

type StatusState = {
  status: statusType

  setStatus: (value: statusType) => void
  resetStatus: () => void
}

export const ueeRecruitmentStatusStore = create<StatusState>((set) => ({
  status: 'all',

  setStatus: (value) => set({ status: value }),
  resetStatus: () => set({ status: 'all' }),
}))
