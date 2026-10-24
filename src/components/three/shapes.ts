// Point-cloud targets for the hero: a scattered nebula, the toolbox mark, and a browser window
// with the side panel open. All three share one particle count so the shader can morph between them.

type Vec3 = [number, number, number]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function onSegment(random: () => number, from: Vec3, to: Vec3, jitter: number): Vec3 {
  const t = random()
  return [
    lerp(from[0], to[0], t) + (random() - 0.5) * jitter,
    lerp(from[1], to[1], t) + (random() - 0.5) * jitter,
    lerp(from[2], to[2], t) + (random() - 0.5) * jitter,
  ]
}

function pickWeighted<T>(random: () => number, items: { weight: number; value: T }[]) {
  const total = items.reduce((sum, item) => sum + item.weight, 0)
  let roll = random() * total
  for (const item of items) {
    roll -= item.weight
    if (roll <= 0) return item.value
  }
  return items[items.length - 1].value
}

function boxEdges(min: Vec3, max: Vec3): [Vec3, Vec3][] {
  const [x0, y0, z0] = min
  const [x1, y1, z1] = max
  const c: Vec3[] = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ]
  const pairs: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ]
  return pairs.map(([a, b]) => [c[a], c[b]])
}

function rectOutline(x0: number, y0: number, x1: number, y1: number, z: number): [Vec3, Vec3][] {
  return [
    [[x0, y0, z], [x1, y0, z]],
    [[x1, y0, z], [x1, y1, z]],
    [[x1, y1, z], [x0, y1, z]],
    [[x0, y1, z], [x0, y0, z]],
  ]
}

function segmentsPoint(random: () => number, segments: [Vec3, Vec3][], jitter: number) {
  const lengths = segments.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]))
  const segment = pickWeighted(
    random,
    segments.map((value, index) => ({ value, weight: lengths[index] })),
  )
  return onSegment(random, segment[0], segment[1], jitter)
}

function toolboxPoint(random: () => number): Vec3 {
  const min: Vec3 = [-2.2, -1.45, -0.85]
  const max: Vec3 = [2.2, 0.35, 0.85]
  const part = pickWeighted(random, [
    { weight: 44, value: 'edges' },
    { weight: 22, value: 'faces' },
    { weight: 8, value: 'seam' },
    { weight: 14, value: 'handle' },
    { weight: 4, value: 'latch' },
    { weight: 8, value: 'orbit' },
  ])
  switch (part) {
    case 'edges':
      return segmentsPoint(random, boxEdges(min, max), 0.035)
    case 'faces': {
      const face = Math.floor(random() * 3)
      const u = lerp(min[0], max[0], random())
      const v = lerp(min[1], max[1], random())
      const w = lerp(min[2], max[2], random())
      if (face === 0) return [u, v, random() > 0.5 ? max[2] : min[2]]
      if (face === 1) return [u, max[1], w]
      return [random() > 0.5 ? max[0] : min[0], v, w]
    }
    case 'seam': {
      const y = -0.2
      return segmentsPoint(
        random,
        [
          [[min[0], y, max[2]], [max[0], y, max[2]]],
          [[max[0], y, max[2]], [max[0], y, min[2]]],
          [[max[0], y, min[2]], [min[0], y, min[2]]],
          [[min[0], y, min[2]], [min[0], y, max[2]]],
        ],
        0.02,
      )
    }
    case 'handle': {
      // Rounded-rectangle handle rising out of the lid.
      const t = random()
      const r = 0.32
      const x0 = -0.85
      const x1 = 0.85
      const yBase = max[1]
      const yTop = 1.25
      const straightUp = yTop - r - yBase
      const across = x1 - x0 - 2 * r
      const arc = (Math.PI / 2) * r
      const total = straightUp * 2 + across + arc * 2
      let d = t * total
      let point: Vec3
      if (d < straightUp) point = [x0, yBase + d, 0]
      else if ((d -= straightUp) < arc) {
        const a = Math.PI - (d / arc) * (Math.PI / 2)
        point = [x0 + r + Math.cos(a) * r, yTop - r + Math.sin(a) * r, 0]
      } else if ((d -= arc) < across) point = [x0 + r + d, yTop, 0]
      else if ((d -= across) < arc) {
        const a = Math.PI / 2 - (d / arc) * (Math.PI / 2)
        point = [x1 - r + Math.cos(a) * r, yTop - r + Math.sin(a) * r, 0]
      } else {
        d -= arc
        point = [x1, yTop - r - d, 0]
      }
      return [point[0] + (random() - 0.5) * 0.06, point[1] + (random() - 0.5) * 0.06, (random() - 0.5) * 0.18]
    }
    case 'latch':
      return segmentsPoint(random, rectOutline(-0.32, -0.42, 0.32, 0.02, max[2] + 0.02), 0.02)
    default: {
      const a = random() * Math.PI * 2
      const radius = 3.3 + (random() - 0.5) * 0.12
      const x = Math.cos(a) * radius
      const z = Math.sin(a) * radius * 0.42
      return [x, Math.sin(a) * 0.5 - 0.4 + (random() - 0.5) * 0.05, z]
    }
  }
}

function panelPoint(random: () => number): Vec3 {
  const W = 2.9
  const H = 1.75
  const barY = 1.38
  const dividerX = 1.05
  const z = (random() - 0.5) * 0.06
  const part = pickWeighted(random, [
    { weight: 20, value: 'frame' },
    { weight: 6, value: 'bar' },
    { weight: 4, value: 'dots' },
    { weight: 5, value: 'divider' },
    { weight: 30, value: 'panelRows' },
    { weight: 22, value: 'page' },
    { weight: 13, value: 'dust' },
  ])
  switch (part) {
    case 'frame':
      return segmentsPoint(random, rectOutline(-W, -H, W, H, 0), 0.03)
    case 'bar':
      return onSegment(random, [-W, barY, 0], [W, barY, 0], 0.02)
    case 'dots': {
      const dot = Math.floor(random() * 3)
      const a = random() * Math.PI * 2
      const r = Math.sqrt(random()) * 0.07
      return [-W + 0.25 + dot * 0.22 + Math.cos(a) * r, (H + barY) / 2 + Math.sin(a) * r, z]
    }
    case 'divider':
      return onSegment(random, [dividerX, -H, 0], [dividerX, barY, 0], 0.02)
    case 'panelRows': {
      const row = Math.floor(random() * 7)
      const y = barY - 0.38 - row * 0.4
      if (random() < 0.3) {
        // Tool icon square.
        return [dividerX + 0.22 + random() * 0.2, y + (random() - 0.5) * 0.2, z]
      }
      const length = 0.7 + ((row * 37) % 10) / 10 * 0.7
      return [dividerX + 0.55 + random() * length, y + (random() - 0.5) * 0.05, z]
    }
    case 'page': {
      const line = Math.floor(random() * 8)
      if (line === 0) {
        return [-W + 0.35 + random() * 2.2, barY - 0.45 + (random() - 0.5) * 0.16, z]
      }
      const y = barY - 0.75 - line * 0.32
      const length = 1.6 + ((line * 53) % 10) / 10 * 1.9
      return [-W + 0.35 + random() * length, y + (random() - 0.5) * 0.04, z]
    }
    default:
      return [dividerX + random() * (W - dividerX), lerp(-H, barY, random()), z + (random() - 0.5) * 0.2]
  }
}

function scatterPoint(random: () => number): Vec3 {
  const u = random()
  const v = random()
  const theta = u * Math.PI * 2
  const phi = Math.acos(2 * v - 1)
  const r = 4 + Math.cbrt(random()) * 5
  return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.7, r * Math.cos(phi) - 2]
}

export function buildHeroShapes(count: number, seed = 7) {
  const random = mulberry32(seed)
  const toolbox = new Float32Array(count * 3)
  const panel = new Float32Array(count * 3)
  const scatter = new Float32Array(count * 3)
  const randoms = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    toolbox.set(toolboxPoint(random), i * 3)
    panel.set(panelPoint(random), i * 3)
    scatter.set(scatterPoint(random), i * 3)
    randoms[i] = random()
  }
  return { toolbox, panel, scatter, randoms }
}
