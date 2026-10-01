'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const STYLES = `
.agentic-factory-3d { position: absolute; inset: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; font-family: sans-serif; }
.agentic-factory-3d #scene { position: absolute; inset: 0; }
.agentic-factory-3d .debug-ui { position: absolute; color: white; z-index: 10; }
.agentic-factory-3d .topbar { top: 20px; left: 20px; display: flex; gap: 20px; align-items: center; }
.agentic-factory-3d .controls { bottom: 120px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: 10px; align-items: center; }
.agentic-factory-3d .mode-bar, .agentic-factory-3d .camera-row { display: flex; gap: 5px; background: rgba(0,0,0,0.5); padding: 5px; border-radius: 8px; }
.agentic-factory-3d button { background: #333; border: none; color: white; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
.agentic-factory-3d button[aria-pressed="true"] { background: #ff7a1a; }
.agentic-factory-3d .footer { bottom: 20px; right: 20px; display: flex; flex-direction: column; align-items: flex-end; }
.agentic-factory-3d #loading { display: none !important; }
.agentic-factory-3d #error { display: none; position: absolute; inset: 0; background: #000; z-index: 100; flex-direction: column; align-items: center; justify-content: center; color: #fff; }
.agentic-factory-3d .coordinates, .agentic-factory-3d .scene-heading, .agentic-factory-3d #journey, .agentic-factory-3d #labels, .agentic-factory-3d #tooltip { display: none; }
`;

export type AgenticFactory3DProps = {
  height?: number | string
  className?: string
  embed?: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
}

export default function AgenticFactory3D({
  height = '100vh',
  className,
  embed = false,
  onStation,
  onReady,
}: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStation, onReady })

  useEffect(() => {
    handlers.current = { onStation, onReady }
  }, [onStation, onReady])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      
      // Defer to prevent blocking LCP
      const startInit = () => {
        if (cancelled) return;
        dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
          embedded: embed,
          onStation: (id) => handlers.current.onStation?.(id),
          onReady: () => handlers.current.onReady?.(),
        })
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(startInit, { timeout: 1000 });
      } else {
        setTimeout(startInit, 100);
      }
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [embed])

  return (
    <div
      ref={rootRef}
      className={['agentic-factory-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Interactive 3D machine with five stations: Engine, Admin, Storefront, Cabinet and Checkout."
      />
      <div className="vignette" />

      <div className="scene-heading debug-ui">
        The machine you will build <span className="index">5 MODULES / 1 SYSTEM</span>
      </div>
      <div className="coordinates debug-ui">PROTOTYPE 01 — FROM IDEA TO PAYMENT</div>
      <div id="journey" className="debug-ui">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">New order</strong>
          <small id="journey-detail">Cabinet · an order from Anna</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>


      <div id="loading">
        <i />
        <span>Assembling your machine</span>
      </div>
      <div id="error" role="alert">
        <strong>Could not start the 3D scene</strong>
        <p>Check that WebGL is turned on in your browser.</p>
        <button onClick={() => location.reload()}>Try again</button>
      </div>
    </div>
  )
}

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type MachineCamera = 'overview' | 'side' | 'top' | 'station' | 'flight'
export type StationId = 'engine' | 'admin' | 'storefront' | 'cabinet' | 'cashdesk'

export type MachineApi = {
  setMode: (name: string) => boolean
  focusStation: (id: string) => boolean
  setCamera: (name: string) => boolean
  play: () => boolean
  pause: () => boolean
}

declare global {
  interface Window {
    __machine?: MachineApi
    __machineDebug?: { getState: () => Record<string, unknown> }
  }
}

export type MachineSceneOptions = {
  embedded: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
}

function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  options: MachineSceneOptions
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function $<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector<T>('#' + id)
    if (!el) throw new Error('Scene markup is missing #' + id)
    return el
  }
  function showError(message?: string) {
    $('loading').classList.add('done')
    $('error').style.display = 'block'
    if (message) $('error').querySelector('p')!.textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const embedded = options.embedded
    const palette = { amber: 0xff7a1a, white: 0xf4f1ea, dark: 0x171b21, steel: 0x59616b }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (e) {
      showError('WebGL is not available. Turn on hardware acceleration in your browser settings.')
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    if (embedded) {
      controls.enableZoom = false
      if (matchMedia('(pointer:coarse)').matches) controls.enableRotate = false
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.62
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xdbe5f4, 0x29211a, 2))
    const key = new THREE.DirectionalLight(0xfff1d8, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    Object.assign(key.shadow.camera, {
      left: -10, right: 10, top: 9, bottom: -9, near: 0.5, far: 35,
    })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc4d4ed, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const warm = new THREE.PointLight(0xffbd42, 28, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (
      color: number,
      metalness = 0.1,
      roughness = 0.4,
      extra: THREE.MeshStandardMaterialParameters = {}
    ) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    const M = {
      body: mat(0x30363f, 0.75, 0.29),
      base: mat(0x292f37, 0.85, 0.32),
      edge: mat(0x707986, 0.85, 0.24),
      chrome: mat(0xc3cad0, 0.92, 0.18),
      dark: mat(0x12171d, 0.45, 0.38),
      rubber: mat(0x0b1015, 0.1, 0.6),
      amber: mat(palette.amber, 0.52, 0.28),
      ivory: mat(0xe0ded4, 0.48, 0.26),
      copper: mat(0xc57e45, 0.85, 0.3),
      black: mat(0x050909, 0, 0.6),
      light: mat(0xff7a1a, 0.2, 0.25, { emissive: 0xff7a1a, emissiveIntensity: 1.5 }),
      whiteLight: mat(0xfff3d7, 0.1, 0.3, { emissive: 0xfff0d0, emissiveIntensity: 1.8 }),
      green: mat(0xc6d9a1, 0.1, 0.3, { emissive: 0x91b364, emissiveIntensity: 0.7 }),
      glass: mat(0x81949e, 0.45, 0.16, { transparent: true, opacity: 0.19, depthWrite: false }),
      paper: mat(0xf4f1ea, 0, 0.85),
    }
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = 'b' + [w,h,d,r].join(',')
      if (!geometries.has(k))
        geometries.set(
          k,
          r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d)
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, m: Material = M.body, r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D, r: number, h: number, x: number, y: number, z: number, m: Material = M.chrome, r2: number = r, segments = 24
    ) {
      const k = 'c' + [r,r2,h,segments].join(',')
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(parent: THREE.Object3D, r: number, x: number, y: number, z: number, m: Material = M.chrome) {
      const k = 's' + r
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent: THREE.Object3D, pts: Vec3[], r: number, m: Material = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false), m)
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent: THREE.Object3D, x: number, y: number, z: number) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }

    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.ShadowMaterial({ opacity: 0.23 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
  
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.01)
    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.dark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)
  
    for (let i = 0; i < 16; i++)
      box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.edge, 0)
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x69717a,
      transparent: true,
      opacity: 0.12,
    })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU, r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)), -0.395, Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72)
      )
    }
    drafting.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat))

    type StationDef = { id: StationId; name: string; step: number; output: string; pos: Vec3; desc: string }
    type Station = StationDef & { group: THREE.Group; base: THREE.Vector3; glowMat: THREE.MeshStandardMaterial; label: HTMLDivElement; index: number; anchor: THREE.Vector3 }
    const definitions: StationDef[] = [
      { id: 'engine', name: 'Engine', step: 2, output: 'script', pos: [-4.15, 0.29, -0.65], desc: 'Script, voice, subtitles, and a finished video.' },
      { id: 'admin', name: 'Admin', step: 3, output: 'video', pos: [-1.65, 0.29, -2.03], desc: 'The video queue and control over the whole system.' },
      { id: 'storefront', name: 'Storefront', step: 4, output: 'post', pos: [1.5, 0.29, -2.08], desc: 'The finished video becomes part of the product.' },
      { id: 'cabinet', name: 'Cabinet', step: 1, output: 'order', pos: [4.03, 0.29, 0.12], desc: 'Customers, new orders and the work history.' },
      { id: 'cashdesk', name: 'Checkout', step: 5, output: 'payment', pos: [0.93, 0.29, 1.85], desc: 'Payment received. Receipt printed. The machine runs.' },
    ]
    const stations: Station[] = [], cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10), shellMaterials: THREE.Material[] = []
    function shell<T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      shellMaterials.push(s)
      return s
    }
    const S = { body: shell(M.body), ivory: shell(M.ivory), amber: shell(M.amber), edge: shell(M.edge) }
    const gears: Array<{ g: THREE.Group; vertical: boolean }> = []
    function gear(parent: THREE.Object3D, x: number, y: number, z: number, r = 0.3, vertical = false) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      if (vertical) g.rotation.x = Math.PI / 2
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.copper)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU, b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.copper, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push({ g, vertical })
      return g
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)
      for (const x of [-0.85, 0.85]) for (const z of [-0.7, 0.7]) screw(group, x, 0.311, z)
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++) box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(group, [[-0.7, 0.4, -0.4], [-0.55, 0.48, 0.4], [0.35, 0.45, 0.6], [0.7, 0.58, 0.23]], 0.023, M.light)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = '<div class="stem"></div><div class="label-card"><div class="label-title"><span>' + String(i + 1).padStart(2, '0') + '</span>' + d.name + '</div><div class="label-meta">Step ' + d.step + ' · ' + d.output + '</div></div>'
      $('labels')?.appendChild(label)
      cleanups.push(() => label.remove())
      stations.push({ ...d, group, base: new THREE.Vector3(...d.pos), glowMat, label, index: i, anchor: new THREE.Vector3(0, 2.5, 0) })
    })
    const engine = stations[0].group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, S.ivory, 0.13)
    box(engine, 1.5, 0.1, 1.16, 0, 0.99, -0.04, S.body, 0.025)
    for (const x of [-0.68, 0.68]) {
      cyl(engine, 0.065, 1.73, x, 1.35, -0.18, M.chrome)
      box(engine, 0.22, 1.8, 0.22, x, 1.37, -0.44, S.ivory, 0.035)
    }
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, S.amber, 0.045)
    box(engine, 1.55, 0.06, 0.06, 0, 2.13, -0.115, M.chrome, 0.01)
    const printhead = new THREE.Group()
    engine.add(printhead)
    printhead.position.set(0, 1.9, -0.08)
    printhead.userData.moving = true
    box(printhead, 0.45, 0.36, 0.44, 0, 0, 0, M.body, 0.05)
    cyl(printhead, 0.11, 0.13, 0, -0.24, 0.03, M.chrome, 0.04)
    box(printhead, 0.24, 0.045, 0.022, 0, 0.09, 0.23, M.light, 0.01)
    tube(engine, [[-0.68, 2.1, -0.35], [-0.42, 2.52, -0.4], [0.25, 2.5, -0.4], [0.35, 2.01, -0.12]], 0.032, M.dark)
    const reels: THREE.Group[] = []
    for (const [x, y] of [[-1.03, 1.82], [-0.94, 2.78]]) {
      const reel = new THREE.Group()
      reel.position.set(x, y, -0.48)
      engine.add(reel)
      reel.userData.moving = true
      const core = cyl(reel, 0.4, 0.22, 0, 0, 0, M.dark)
      core.rotation.x = Math.PI / 2
      for (const z of [-0.14, 0.14]) {
        const disc = cyl(reel, 0.46, 0.045, 0, 0, z, M.chrome)
        disc.rotation.x = Math.PI / 2
        for (let j = 0; j < 6; j++) {
          const a = (j / 6) * TAU
          const hole = cyl(reel, 0.1, 0.006, Math.cos(a) * 0.29, Math.sin(a) * 0.29, z + (z > 0 ? 0.026 : -0.026), M.dark, undefined, 14)
          hole.rotation.x = Math.PI / 2
        }
      }
      const axle = cyl(reel, 0.095, 0.37, 0, 0, 0, M.amber)
      axle.rotation.x = Math.PI / 2
      reels.push(reel)
    }
    tube(engine, [[-1.36, 2.66, -0.48], [-1.5, 2.34, -0.48], [-1.34, 1.92, -0.48]], 0.045, M.dark)
    const outputVideo = new THREE.Group()
    outputVideo.userData.moving = true
    engine.add(outputVideo)
    box(outputVideo, 0.62, 1.08, 0.055, 0, 1.36, 0.61, M.dark, 0.035)
    box(engine, 1.14, 0.12, 0.2, 0, 0.83, 0.66, M.dark, 0.025)
    for (const x of [-0.42, 0.42]) {
      const r = cyl(engine, 0.115, 0.18, x, 0.92, 0.6, M.chrome)
      r.rotation.z = Math.PI / 2
    }
    for (let i = 0; i < 5; i++) box(engine, 0.08, 0.03, 0.22, -0.38 + i * 0.19, 1.011, -0.02, M.edge, 0.005)

    const admin = stations[1].group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, S.body, 0.11)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)
    box(consoleTop, 1.76, 0.12, 1.27, 0, 0, 0, S.ivory, 0.04)
    const toggles: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const x = -0.57 + i * 0.38
      cyl(consoleTop, 0.074, 0.035, x, 0.1, 0.45, M.dark)
      const t = cyl(consoleTop, 0.025, 0.15, x, 0.19, 0.45, M.chrome)
      t.rotation.x = -0.4
      t.userData.moving = true
      toggles.push(t)
      ball(consoleTop, 0.04, x, 0.275, 0.421, M.ivory)
    }
    cyl(admin, 0.075, 0.06, 0.77, 1.05, -0.62, M.green)
    for (let i = 0; i < 7; i++) box(admin, 0.55, 0.027, 0.02, 0, 0.46 + i * 0.05, 0.655, M.dark, 0.003)

    const storefront = stations[2].group
    box(storefront, 1.35, 0.18, 0.88, 0, 0.44, 0, S.ivory, 0.045)
    cyl(storefront, 0.095, 1.04, 0, 0.93, -0.31, M.chrome)
    box(storefront, 0.56, 0.91, 0.14, 0, 0.99, -0.34, S.body, 0.04)
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, S.ivory, 0.08)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)
    ball(storefront, 0.024, 0, 2.747, -0.05, M.dark)
    box(storefront, 0.21, 0.019, 0.008, 0, 1.149, 0.013, M.light, 0.003)
    const flyPost = new THREE.Group()
    flyPost.userData.moving = true
    storefront.add(flyPost)
    box(flyPost, 0.59, 0.77, 0.045, 0.94, 0.81, 0.55, M.ivory, 0.025)

    const cabinet = stations[3].group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, S.body, 0.12)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, S.amber, 0.04)
    box(cabinet, 1.47, 1.38, 0.055, 0, 1.31, 0.405, M.dark, 0.025)
    box(cabinet, 1.27, 0.075, 0.29, 0, 0.57, 0.55, M.chrome, 0.02)
    for (let i = 0; i < 3; i++) box(cabinet, 1.15, 0.021, 0.12, 0, 0.58 + i * 0.15, -0.35, M.copper, 0.006)
    tube(cabinet, [[0.69, 0.43, -0.2], [0.89, 0.65, -0.2], [0.89, 1.8, -0.2], [0.65, 1.99, -0.2]], 0.033, M.chrome)
    const incoming = new THREE.Group()
    incoming.userData.moving = true
    cabinet.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.035)

    const cashdesk = stations[4].group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, S.ivory, 0.12)
    box(cashdesk, 1.96, 0.19, 1.38, 0, 0.42, -0.04, S.body, 0.04)
    box(cashdesk, 1.37, 0.09, 0.038, 0, 0.44, 0.66, M.dark, 0.01)
    box(cashdesk, 0.37, 0.042, 0.03, 0, 0.45, 0.687, M.chrome, 0.009)
    box(cashdesk, 1.02, 0.25, 0.91, -0.33, 1.04, -0.03, S.body, 0.045)
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        box(cashdesk, 0.19, 0.085, 0.17, -0.62 + col * 0.27, 1.21, 0.27 - row * 0.24, col === 2 && row === 2 ? M.amber : M.ivory, 0.022)
    box(cashdesk, 0.64, 0.6, 0.52, 0.58, 1.04, -0.15, S.body, 0.045)
    box(cashdesk, 0.48, 0.07, 0.09, 0.59, 1.37, -0.1, M.dark, 0.01)
    cyl(cashdesk, 0.06, 0.65, -0.35, 1.6, -0.56, M.chrome)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, S.body, 0.045)
    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)
    const coin = new THREE.Group()
    coin.userData.moving = true
    cashdesk.add(coin)
    const coinDisc = cyl(coin, 0.22, 0.065, 0, 0, 0, M.amber, undefined, 32)
    coinDisc.rotation.x = Math.PI / 2
    const coinRing = new THREE.Mesh(new THREE.TorusGeometry(0.174, 0.014, 6, 32), M.light)
    coinRing.position.z = 0.037
    coin.add(coinRing)
    cyl(cashdesk, 0.33, 0.09, 1.04, 0.39, 0.55, M.dark)
    cyl(cashdesk, 0.26, 0.025, 1.04, 0.445, 0.55, M.copper)

    const path = new THREE.CatmullRomCurve3(
      [[-3.95, 0.84, 0.65], [-3.1, 0.84, -0.12], [-1.45, 0.84, -0.79], [1.32, 0.84, -0.8], [3.3, 0.84, 0.19], [3.43, 0.84, 1.21], [1.35, 0.84, 2.7], [-1.4, 0.84, 2.52], [-3.54, 0.84, 1.65]].map((p) => new THREE.Vector3(...p)),
      true, 'catmullrom', 0.25
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.35, 8, true), M.dark)
    frameMesh.scale.y = 0.3
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 148, beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.012), M.body, beltCount)
    beltSlats.receiveShadow = true
    beltSlats.castShadow = false
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D(), pVec = new THREE.Vector3(), tVec = new THREE.Vector3()
    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)
    for (const side of [-1, 1]) {
      const pts = []
      for (let i = 0; i <= 160; i++) {
        path.getPointAt(i / 160, pVec)
        path.getTangentAt(i / 160, tVec)
        pts.push(pVec.clone().add(new THREE.Vector3(-tVec.z * 0.36 * side, 0.09, tVec.x * 0.36 * side)))
      }
      const railPath = new THREE.CatmullRomCurve3(pts)
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(railPath, 160, 0.028, 6, false), M.chrome))
    }
    for (let i = 0; i < 16; i++) {
      const p = path.getPointAt(i / 16)
      cyl(belt, 0.045, 0.43, p.x, 0.53, p.z, M.chrome)
    }
    const pipes = new THREE.Group()
    machine.add(pipes)
    const connectors = []
    for (let i = 0; i < 4; i++) {
      const a = stations[i].base, b = stations[i + 1].base
      const points = [
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a.clone().lerp(b, 0.35).add(new THREE.Vector3(0, 0.1, -0.6)),
        a.clone().lerp(b, 0.65).add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ]
      const curve = new THREE.CatmullRomCurve3(points)
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.054, 8, false), M.copper)
      pipes.add(mesh)
      connectors.push({ mesh, a: i, b: i + 1 })
    }

    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {



        const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & { isInstancedMesh?: boolean }
        if (!child.isMesh || child.isInstancedMesh || child.userData.moving || Array.isArray(child.material)) continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    ;[incoming, receipt, coin, outputVideo, flyPost, printhead, ...reels].forEach((g) => (g.userData.moving = true))
    compact(machine)
    stations.forEach((s) => s.group.traverse((o) => { o.userData.station = s.id }))

    let mode: MachineMode = 'assembled', cameraMode: MachineCamera = 'overview', playing = true, simTime = 0, selected: string = 'engine'
    let width = frameWidth(), height = frameHeight(), mobile = width <= 900
    let cameraAnimating = true
    const desiredPosition = new THREE.Vector3(), desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25, sized = false

    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.setViewOffset(width, height, 0, mobile || embedded ? 0 : height * 0.025, width, height)
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : Math.min(0.55, aspect > 2 ? 0.54 : 0.57)
      const horizontalFit = 17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit = 11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.85 : 0.62))
      baseDistance = (Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 1)) / (embedded ? (mobile ? 1.15 : 1.45) : 1)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side') desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)))
      root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode)))
      $('journey')?.classList.toggle('visible', mode === 'order')
    }
    const modeAliases: Record<string, MachineMode> = { Assembled: 'assembled', Cutaway: 'cutaway', Stations: 'stations', 'One order': 'order', assembled: 'assembled', cutaway: 'cutaway', stations: 'stations', order: 'order' }
    const cameraAliases: Record<string, MachineCamera> = { Overview: 'overview', Side: 'side', Top: 'top', Station: 'station', Flight: 'flight', overview: 'overview', side: 'side', top: 'top', station: 'station', flight: 'flight' }
  
    function setMode(name: string) {
      if (!Object.hasOwn(modeAliases, name)) return false
      mode = modeAliases[name]
      if (mode === 'order') { simTime = 0; play(); cameraMode = 'overview' }
      else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id: string) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function setCamera(name: string) {
      if (!Object.hasOwn(cameraAliases, name)) return false
      cameraMode = cameraAliases[name]
      if (mode === 'order') mode = 'assembled'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function play() { playing = true; return true }
    function pause() { playing = false; return true }
  
    root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => listen(b, 'click', () => setMode(b.dataset.mode ?? '')))
    root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => listen(b, 'click', () => setCamera(b.dataset.camera ?? '')))
  
    let lastTime = 0;
    function render(time: number) {
        requestAnimationFrame(render);
        const dt = Math.min((time - lastTime)/1000, 0.1);
        lastTime = time;
        if (playing) {
            simTime += dt;
            updateBelt(simTime);
        }
        if (cameraAnimating) {
            camera.position.lerp(desiredPosition, 0.05);
            controls.target.lerp(desiredTarget, 0.05);
            if (camera.position.distanceTo(desiredPosition) < 0.1) cameraAnimating = false;
        }
        controls.update();
        renderer.render(scene, camera);
    }
  
    layoutCamera();
    $('loading')?.classList.add('done');
    requestAnimationFrame(render);
  
    return () => {
        dispose();
        renderer.dispose();
    };
  
  } catch (err) {
    showError();
    return dispose;
  }
}
