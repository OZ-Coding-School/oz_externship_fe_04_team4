import { create } from 'zustand'

export type TagsType = {
  id: number
  name: string
}

type TagsState = {
  selectedTags: TagsType[]

  setSelectedTags: (tags: TagsType[]) => void
  toggleTag: (tag: TagsType) => void
  deleteSelectedTag: (tag: TagsType) => void
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

type TagsResultState = {
  selectedTagsResult: TagsType[]

  setSelectedTagsResult: (tags: TagsType[]) => void
}

export const useRecruitmentTagListStore = create<TagsResultState>((set) => ({
  selectedTagsResult: [],

  setSelectedTagsResult: (tags) => set({ selectedTagsResult: tags }),
}))
