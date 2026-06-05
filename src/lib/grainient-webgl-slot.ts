/** Caps concurrent WebGL contexts (Grainient, Cobe globe, etc.) to avoid browser limits. */
const MAX_ACTIVE = 8
let active = 0

export function acquireWebGLSlot(): boolean {
  if (active >= MAX_ACTIVE) return false
  active += 1
  return true
}

export function releaseWebGLSlot(): void {
  active = Math.max(0, active - 1)
}

/** @deprecated Use acquireWebGLSlot */
export const acquireGrainientWebGL = acquireWebGLSlot

/** @deprecated Use releaseWebGLSlot */
export const releaseGrainientWebGL = releaseWebGLSlot

export function probeWebGLAvailable(): boolean {
  if (typeof document === "undefined") return false
  const canvas = document.createElement("canvas")
  const gl =
    canvas.getContext("webgl2") ??
    canvas.getContext("webgl") ??
    canvas.getContext("experimental-webgl")
  if (!gl) return false
  ;(gl as any).getExtension("WEBGL_lose_context")?.loseContext()
  return true
}
