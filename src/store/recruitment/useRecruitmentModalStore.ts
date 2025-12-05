import { create } from 'zustand'

type TagFilterModalState = {
  isTagFilterModalOpen: boolean

  openTagFilterModalModal: () => void
  closeTagFilterModalModal: () => void
  toggleTagFilterModalModal: () => void
}
type DetailModalState = {
  isDetailModalOpen: boolean
  selectedRecruitmentId: number | null

  openDetailModal: (value: number) => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

export const useTagFilterModalStore = create<TagFilterModalState>((set) => ({
  isTagFilterModalOpen: false,

  openTagFilterModalModal: () => set({ isTagFilterModalOpen: true }),
  closeTagFilterModalModal: () => set({ isTagFilterModalOpen: false }),
  toggleTagFilterModalModal: () =>
    set((state) => ({ isTagFilterModalOpen: !state.isTagFilterModalOpen })),
}))

export const useRecruitmentDetailModalStore = create<DetailModalState>(
  (set) => ({
    isDetailModalOpen: false,
    selectedRecruitmentId: null,

    openDetailModal: (id) =>
      set({ isDetailModalOpen: true, selectedRecruitmentId: id }),
    closeDetailModal: () => set({ isDetailModalOpen: false }),
    toggleDetailModal: () =>
      set((state) => ({ isDetailModalOpen: !state.isDetailModalOpen })),
  })
)
