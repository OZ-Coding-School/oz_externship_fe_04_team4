let lockCount = 0
let scrollY = 0

export const lockScroll = () => {
  if (lockCount === 0) {
    scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    document.body.style.width = '100%'
  }
  lockCount += 1
}

export const unlockScroll = () => {
  lockCount -= 1
  if (lockCount <= 0) {
    lockCount = 0

    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    document.body.style.width = ''

    window.scrollTo(0, scrollY)
  }
}
