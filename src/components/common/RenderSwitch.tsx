export type RenderCase = {
  when: boolean
  render: React.ReactNode
}

interface RenderWitchProps {
  cases: RenderCase[]
  fallback?: React.ReactNode
}

import React from 'react'

export function RenderSwitch({ cases, fallback = null }: RenderWitchProps) {
  const matched = cases.find((c) => c.when)
  return matched?.render ?? fallback
}
