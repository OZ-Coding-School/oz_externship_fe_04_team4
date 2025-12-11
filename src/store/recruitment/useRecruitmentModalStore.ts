import { create } from 'zustand'

type TagFilterModalState = {
  isTagFilterModalOpen: boolean

  openTagFilterModalModal: () => void
  closeTagFilterModalModal: () => void
  toggleTagFilterModalModal: () => void
}

export const useTagFilterModalStore = create<TagFilterModalState>((set) => ({
  isTagFilterModalOpen: false,

  openTagFilterModalModal: () => set({ isTagFilterModalOpen: true }),
  closeTagFilterModalModal: () => set({ isTagFilterModalOpen: false }),
  toggleTagFilterModalModal: () =>
    set((state) => ({ isTagFilterModalOpen: !state.isTagFilterModalOpen })),
}))
