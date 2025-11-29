import { create } from 'zustand'

type SearchState = {
  keyword: string

  setKeyword: (value: string) => void
  resetKeyword: () => void
}

export const useRecruitmentSearchStore = create<SearchState>((set) => ({
  keyword: '',

  setKeyword: (value) => set({ keyword: value }),
  resetKeyword: () => set({ keyword: '' }),
}))
