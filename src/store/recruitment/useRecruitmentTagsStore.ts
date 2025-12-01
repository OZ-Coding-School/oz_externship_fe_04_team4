import { create } from 'zustand'

type TagsState = {
  selectedTags: string[]

  setSelectedTags: (tags: string[]) => void
  toggleTag: (tag: string) => void
  deleteSelectedTag: (tag: string) => void
  resetSelectedTags: () => void
}

export const useRecruitmentTagsStore = create<TagsState>((set) => ({
  selectedTags: [],

  setSelectedTags: (tags) => set({ selectedTags: tags }),

  toggleTag: (tag) =>
    set((state) => {
      const isSelected = state.selectedTags.includes(tag)

      if (isSelected) {
        return {
          selectedTags: state.selectedTags.filter((t) => t !== tag),
        }
      }

      return {
        selectedTags: [...state.selectedTags, tag],
      }
    }),

  deleteSelectedTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    })),

  resetSelectedTags: () => set({ selectedTags: [] }),
}))

type TagsResultState = {
  selectedTagsResult: string[]

  setSelectedTagsResult: (tags: string[]) => void
}

export const useRecruitmentTagListStore = create<TagsResultState>((set) => ({
  selectedTagsResult: [],

  setSelectedTagsResult: (tags) => set({ selectedTagsResult: tags }),
}))
