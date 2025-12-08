export const REASON_LABEL = {
  NO_LONGER_NEEDED: '더 이상 필요하지 않음',
  LACK_OF_INTEREST: '흥미 감소',
  TOO_DIFFICULT: '사용이 너무 어려움',
  FOUND_BETTER_SERVICE: '더 좋은 서비스 발견',
  PRIVACY_CONCERNS: '개인정보 우려',
  POOR_SERVICE_QUALITY: '서비스 품질 불만',
  TECHNICAL_ISSUES: '기술적 문제',
  LACK_OF_CONTENT: '콘텐츠 부족',
  OTHER: '기타',
} as const

export type ReasonKey = keyof typeof REASON_LABEL
