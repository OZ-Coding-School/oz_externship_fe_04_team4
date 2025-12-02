import { create } from 'zustand'

type SortState = {
  sort: string

  setSort: (value: string) => void
  resetSort: () => void
}

export const ueeRecruitmentSortStore = create<SortState>((set) => ({
  sort: '',

  setSort: (value) => set({ sort: value }),
  resetSort: () => set({ sort: '' }),
}))
