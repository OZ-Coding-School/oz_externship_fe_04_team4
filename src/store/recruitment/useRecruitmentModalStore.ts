import { create } from 'zustand'

type ModalState = {
  isOpen: boolean

  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

export const useRecruitmentModalStore = create<ModalState>((set) => ({
  isOpen: false,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}))
