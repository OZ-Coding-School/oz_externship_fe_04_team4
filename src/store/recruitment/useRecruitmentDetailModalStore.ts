import { create } from 'zustand'

type DetailModalState = {
  isDetailModalOpen: boolean
  selectedRecruitmentId: number | null

  openDetailModal: (value: number) => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

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
