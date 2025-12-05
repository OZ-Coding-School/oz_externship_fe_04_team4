let layer = 0

export function acquireModalLayer() {
  layer += 1
  return layer
}

export function releaseModalLayer() {
  layer -= 1
}
