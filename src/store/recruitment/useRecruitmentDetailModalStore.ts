import { create } from 'zustand'

type DetailModalState = {
  isDetailModalOpen: boolean
  recruitment_id: number | null

  openDetailModal: (value: number) => void
  closeDetailModal: () => void
  toggleDetailModal: () => void
}

export const useRecruitmentDetailModalStore = create<DetailModalState>(
  (set) => ({
    isDetailModalOpen: false,
    recruitment_id: null,

    openDetailModal: (id) =>
      set({ isDetailModalOpen: true, recruitment_id: id }),
    closeDetailModal: () => set({ isDetailModalOpen: false }),
    toggleDetailModal: () =>
      set((state) => ({ isDetailModalOpen: !state.isDetailModalOpen })),
  })
)
