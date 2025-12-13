import { create } from 'zustand'

import type { TagType } from '@/types'

type TagsResultState = {
  selectedTagsResult: TagType[]

  setSelectedTagsResult: (tags: TagType[]) => void
}

export const useRecruitmentTagListStore = create<TagsResultState>((set) => ({
  selectedTagsResult: [],

  setSelectedTagsResult: (tags) => set({ selectedTagsResult: tags }),
}))
