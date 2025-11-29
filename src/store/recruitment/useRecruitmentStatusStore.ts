import { create } from 'zustand'

type StatusState = {
  status: string

  setStatus: (value: string) => void
  resetStatus: () => void
}

export const ueeRecruitmentStatusStore = create<StatusState>((set) => ({
  status: '',

  setStatus: (value) => set({ status: value }),
  resetStatus: () => set({ status: '' }),
}))
