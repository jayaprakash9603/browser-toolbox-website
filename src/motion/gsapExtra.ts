'use client'

import { CustomEase } from 'gsap/CustomEase'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Observer } from 'gsap/Observer'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

import { gsap } from './gsap'

// Only the tool pages need these, so they stay out of the shared `gsap.ts` bundle.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    CustomEase,
    DrawSVGPlugin,
    MorphSVGPlugin,
    MotionPathPlugin,
    Observer,
    Physics2DPlugin,
    ScrambleTextPlugin,
    TextPlugin,
  )
}

export * from './gsap'
export {
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Observer,
  Physics2DPlugin,
  ScrambleTextPlugin,
  TextPlugin,
}
