import { create } from 'zustand'

import type { TagType } from '@/types/api'

type TagsState = {
  selectedTags: TagType[]

  setSelectedTags: (tags: TagType[]) => void
  toggleTag: (tag: TagType) => void
  deleteSelectedTag: (tag: TagType) => void
  resetSelectedTags: () => void
}

export const useRecruitmentTagsStore = create<TagsState>((set) => ({
  selectedTags: [],

  setSelectedTags: (tags) => set({ selectedTags: tags }),

  toggleTag: (tag) =>
    set((state) => {
      const isSelectedID = state.selectedTags.find((t) => t.id === tag.id)

      if (isSelectedID) {
        return {
          selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
        }
      }

      return {
        selectedTags: [...state.selectedTags, tag],
      }
    }),

  deleteSelectedTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t.id !== tag.id),
    })),

  resetSelectedTags: () => set({ selectedTags: [] }),
}))
