'use client'

export type NavigationKind = 'initial' | 'curtain' | 'view-transition' | 'plain'

let kind: NavigationKind = 'initial'

export function setNavigationKind(next: NavigationKind) {
  kind = next
}

export function getNavigationKind() {
  return kind
}
