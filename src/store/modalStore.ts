import { create } from 'zustand'

interface ModalState {
  // 각 모달의 상태를 key-value로 관리
  modals: Record<string, { isOpen: boolean; value: unknown }>

  openModal: (modalId: string, value?: unknown) => void

  closeModal: (modalId: string) => void

  isModalOpen: (modalId: string) => boolean

  getModalValue: <T = unknown>(modalId: string) => T | undefined
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},

  openModal: (modalId, value) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { isOpen: true, value },
      },
    })),

  closeModal: (modalId) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { isOpen: false, value: undefined },
      },
    })),

  isModalOpen: (modalId) => {
    const modal = get().modals[modalId]
    return modal?.isOpen ?? false
  },

  getModalValue: <T = unknown>(modalId: string): T | undefined => {
    const modal = get().modals[modalId]
    return modal?.value as T | undefined
  },
}))
