import { useModalStore } from '@/store/modalStore'

/**
 * 모달 상태를 관리하는 커스텀 훅
 *
 * @param modalId - 모달의 고유 식별자
 * @returns 모달 상태와 제어 함수들
 *
 * @example
 * // 기본 사용법
 * const { isOpen, open, close } = useModal('lecture-detail')
 *
 * @example
 * const { isOpen, open, close, value } = useModal<number>('lecture-detail')
 *
 * open(lectureId)
 *
 * <LectureDetailModal lectureId={value} />
 */
export function useModal<T = unknown>(modalId: string) {
  const { openModal, closeModal, isModalOpen, getModalValue } = useModalStore()

  return {
    isOpen: isModalOpen(modalId),
    value: getModalValue<T>(modalId),
    open: (value?: T) => openModal(modalId, value),
    close: () => closeModal(modalId),
  }
}
