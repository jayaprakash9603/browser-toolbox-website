'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'

import { buildHeroShapes } from './shapes'

export interface HeroProgress {
  /** 0 → nebula, 1 → toolbox. Driven by the intro timeline. */
  intro: number
  /** 0 → toolbox, 1 → side panel. Driven by scroll. */
  morph: number
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uMorph;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  attribute vec3 aScatter;
  attribute vec3 aPanel;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float r = aRandom;
    float intro = smoothstep(r * 0.45, r * 0.45 + 0.55, uIntro);
    float morph = smoothstep(r * 0.4, r * 0.4 + 0.6, uMorph);

    vec3 p = mix(aScatter, position, intro);
    p = mix(p, aPanel, morph);

    float t = uTime * 0.55;
    float drift = 0.022 + (1.0 - intro) * 0.25;
    p += vec3(
      sin(t + r * 41.0 + p.y * 1.7),
      cos(t * 0.87 + r * 29.0 + p.x * 1.3),
      sin(t * 0.73 + r * 17.0)
    ) * drift;

    vec2 away = p.xy - uPointer.xy;
    float distance = length(away);
    float force = smoothstep(1.25, 0.0, distance) * uPointerStrength;
    p.xy += normalize(away + 0.0001) * force * 0.5;
    p.z += force * 0.7;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (0.5 + r * 1.0) * uPixelRatio * (1.0 + force * 1.8) / -mvPosition.z;

    float gradient = smoothstep(-3.0, 3.0, p.x + p.y * 0.6);
    vColor = mix(uColorA, uColorB, gradient);
    vColor = mix(vColor, uColorC, step(0.9, r));
    vColor += force * 0.35;
    float twinkle = 0.5 + 0.5 * sin(uTime * 1.6 + r * 60.0);
    vAlpha = (0.42 + twinkle * 0.38) * (0.35 + intro * 0.65) + force * 0.4;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`

function Particles({ progress, count }: { progress: RefObject<HeroProgress>; count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera, gl, viewport, size } = useThree()
  const pointerWorld = useRef(new THREE.Vector3())
  const scratch = useRef(new THREE.Vector3())
  const pointerActive = useRef(0)
  const lastMove = useRef(0)

  const geometry = useMemo(() => {
    const shapes = buildHeroShapes(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(shapes.toolbox, 3))
    g.setAttribute('aPanel', new THREE.BufferAttribute(shapes.panel, 3))
    g.setAttribute('aScatter', new THREE.BufferAttribute(shapes.scatter, 3))
    g.setAttribute('aRandom', new THREE.BufferAttribute(shapes.randoms, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12)
    return g
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uIntro: { value: 0 },
          uMorph: { value: 0 },
          uPointer: { value: new THREE.Vector3(99, 99, 0) },
          uPointerStrength: { value: 0 },
          uPixelRatio: { value: 1 },
          uSize: { value: 26 },
          uColorA: { value: new THREE.Color('#6366f1') },
          uColorB: { value: new THREE.Color('#22d3ee') },
          uColorC: { value: new THREE.Color('#c4b5fd') },
        },
      }),
    [],
  )

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  useEffect(() => {
    const shader = pointsRef.current?.material as THREE.ShaderMaterial | undefined
    if (shader) shader.uniforms.uPixelRatio.value = gl.getPixelRatio()
  }, [gl, material, size])

  useEffect(() => {
    const onMove = () => {
      lastMove.current = performance.now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points) return
    const uniforms = (points.material as THREE.ShaderMaterial).uniforms
    const { intro, morph } = progress.current
    uniforms.uTime.value += delta
    uniforms.uIntro.value = intro
    uniforms.uMorph.value = THREE.MathUtils.damp(uniforms.uMorph.value, morph, 5, delta)

    const wide = viewport.aspect > 1.15
    const targetScale = wide ? Math.min(0.86, viewport.width / 13) : Math.min(0.62, viewport.width / 6.6)
    points.scale.setScalar(THREE.MathUtils.damp(points.scale.x, targetScale, 4, delta))
    const settled = uniforms.uMorph.value
    const targetX = wide ? THREE.MathUtils.lerp(viewport.width * 0.27, 0, settled) : 0
    const targetY = wide ? THREE.MathUtils.lerp(-0.1, -0.2, settled) : -viewport.height * 0.24
    points.position.x = THREE.MathUtils.damp(points.position.x, targetX, 4, delta)
    points.position.y = THREE.MathUtils.damp(points.position.y, targetY, 4, delta)

    const time = state.clock.elapsedTime
    const idle = 1 - settled
    points.rotation.y = THREE.MathUtils.damp(
      points.rotation.y,
      (Math.sin(time * 0.18) * 0.45 + state.pointer.x * 0.35) * idle,
      3,
      delta,
    )
    points.rotation.x = THREE.MathUtils.damp(points.rotation.x, (0.22 - state.pointer.y * 0.15) * idle, 3, delta)

    // Project the pointer onto the z=0 plane, then into the cloud's local space.
    const ray = scratch.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(camera).sub(camera.position).normalize()
    const distance = -camera.position.z / ray.z
    const local = pointerWorld.current.copy(camera.position).addScaledVector(ray, distance)
    points.worldToLocal(local)
    uniforms.uPointer.value.copy(local)

    const recentlyMoved = performance.now() - lastMove.current < 1600 ? 1 : 0
    pointerActive.current = THREE.MathUtils.damp(pointerActive.current, recentlyMoved, 3, delta)
    uniforms.uPointerStrength.value = pointerActive.current
  })

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
}

export default function HeroScene({
  progress,
  active,
  onReady,
}: {
  progress: RefObject<HeroProgress>
  active: boolean
  onReady?: () => void
}) {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 7000 : 15000
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 7.5], fov: 40, near: 0.1, far: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <Particles progress={progress} count={count} />
    </Canvas>
  )
}
