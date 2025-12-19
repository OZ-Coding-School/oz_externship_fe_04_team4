import type { UseMutationOptions } from '@tanstack/react-query'

import { SERVICE_URLS } from '@/config'
import { useMutateQuery } from '@/hooks/useMutateQuery'

type DeleteRecruitmentResponse = {
  detail: string
}

export function useRecruitmentDeleteMutation(
  recruitmentId: number,
  options?: UseMutationOptions<DeleteRecruitmentResponse, Error, void>
) {
  return useMutateQuery<DeleteRecruitmentResponse, void>({
    url: SERVICE_URLS.RECRUITMENTS.DELETE(recruitmentId),
    method: 'delete',
    ...options,
  })
}
