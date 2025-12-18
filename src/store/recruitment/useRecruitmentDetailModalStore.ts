import { create } from 'zustand'

type DetailModalState = {
  isDetailModalOpen: boolean
  recruitmentId: number | null

  openDetailModal: (value: number) => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

export const useRecruitmentDetailModalStore = create<DetailModalState>(
  (set) => ({
    isDetailModalOpen: false,
    recruitmentId: null,

    openDetailModal: (id) =>
      set({ isDetailModalOpen: true, recruitmentId: id }),
    closeDetailModal: () => set({ isDetailModalOpen: false }),
    toggleDetailModal: () =>
      set((state) => ({ isDetailModalOpen: !state.isDetailModalOpen })),
  })
)
