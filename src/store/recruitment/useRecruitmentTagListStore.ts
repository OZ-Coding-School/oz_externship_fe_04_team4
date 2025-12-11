import { create } from 'zustand'

import type { TagType } from '@/types/api'

type TagsResultState = {
  selectedTagsResult: TagType[]

  setSelectedTagsResult: (tags: TagType[]) => void
}

export const useRecruitmentTagListStore = create<TagsResultState>((set) => ({
  selectedTagsResult: [],

  setSelectedTagsResult: (tags) => set({ selectedTagsResult: tags }),
}))
