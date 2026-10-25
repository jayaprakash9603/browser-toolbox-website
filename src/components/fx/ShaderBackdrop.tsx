'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/cn'
import { prefersReducedMotion } from '@/motion/gsap'

export type ShaderVariant = 'flow' | 'waves' | 'plasma' | 'rings' | 'grid'

const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const HEADER = `precision mediump float;uniform vec2 r;uniform float t;uniform vec3 c;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}`

const BODIES: Record<ShaderVariant, string> = {
  flow: `void main(){vec2 u=gl_FragCoord.xy/r;vec2 q=u*vec2(r.x/r.y,1.)*2.;float f=fbm(q+fbm(q+t*.06)+t*.03);vec3 col=mix(vec3(.03,.03,.05),c,smoothstep(.35,.95,f))*.85;gl_FragColor=vec4(col*(1.-length(u-.5)*.9),1.);}`,
  waves: `void main(){vec2 u=gl_FragCoord.xy/r;float v=0.;for(float i=1.;i<5.;i++){v+=.012/abs(u.y-.5-.18*sin(u.x*3.*i+t*.4*i)*(.4/i));}vec3 col=c*v*.5;gl_FragColor=vec4(col*(1.-abs(u.x-.5)),1.);}`,
  plasma: `void main(){vec2 u=(gl_FragCoord.xy-.5*r)/r.y;float v=sin(u.x*6.+t*.5)+sin(u.y*5.-t*.4)+sin((u.x+u.y)*4.+t*.3)+sin(length(u)*8.-t*.6);v=v*.25+.5;vec3 col=mix(vec3(.02,.02,.04),c,pow(v,3.))*.9;gl_FragColor=vec4(col*(1.-length(u)*.9),1.);}`,
  rings: `void main(){vec2 u=(gl_FragCoord.xy-.5*r)/r.y;float d=length(u);float v=smoothstep(.02,0.,abs(fract(d*6.-t*.15)-.5)-.46);vec3 col=c*v*(1.-d*1.3)+c*.06*(1.-d);gl_FragColor=vec4(max(col,0.),1.);}`,
  grid: `void main(){vec2 u=(gl_FragCoord.xy-.5*r)/r.y;vec2 g=abs(fract(u*8.+vec2(0.,t*.08))-.5);float l=smoothstep(.48,.5,max(g.x,g.y));float pulse=n(floor(u*8.+vec2(0.,t*.08))+floor(t*.5));vec3 col=c*(l*.35+step(.82,pulse)*.18)*(1.-length(u)*1.1);gl_FragColor=vec4(max(col,0.),1.);}`,
}

function hexToRgb(hex: string) {
  const value = parseInt(hex.replace('#', ''), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

/**
 * Full-bleed fragment shader in a raw WebGL context (no library). Renders only while visible,
 * caps the pixel ratio, and draws a single still frame under reduced motion.
 */
export function ShaderBackdrop({ variant = 'flow', color, className, opacity = 0.6 }: { variant?: ShaderVariant; color: string; className?: string; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' })
    if (!canvas || !gl) return
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, HEADER + BODIES[variant]))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const location = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(program, 'r')
    const uTime = gl.getUniformLocation(program, 't')
    gl.uniform3fv(gl.getUniformLocation(program, 'c'), hexToRgb(color))

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio * 0.6))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio * 0.6))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    const draw = (time: number) => {
      gl.uniform1f(uTime, time / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    resize()
    const still = prefersReducedMotion()
    let frame = 0
    let visible = false
    const loop = (time: number) => {
      draw(time)
      if (visible && !still && !document.hidden) frame = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)
    const onVisibility = () => visible && start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      // Don't lose the context here: a remount (StrictMode, fast refresh) reuses the same canvas.
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [variant, color])

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 size-full', className)} style={{ opacity }} />
}
