'use client'

// The preloader owns the first paint; hero animations wait until it starts leaving.
let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
  listeners.clear()
}

export function isIntroDone() {
  return done
}

export function onIntroDone(listener: () => void) {
  if (done) {
    listener()
    return () => {}
  }
  listeners.add(listener)
  return () => listeners.delete(listener)
}
