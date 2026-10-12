/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import { useMemo, type CSSProperties } from "react";

export type FluidFieldBackgroundProps = {
  mode?: "dark" | "light";
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const DEFAULTS = {
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

// Softree deep near-black background
const BACKGROUND = "#050508";
const TARGET_SELECTOR = "#bg-canvas";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

// WebGL/three.js simplex-noise fluid shader adapted with Softree orange (#FF5812) & red (#E31E24) brand colors
const FLUID_SOURCE = `<!doctype html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Softree Fluid Field</title>
    <!-- Three.js r128 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
      html, body { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; background: #050508; }
      canvas { display: block; width: 100% !important; height: 100% !important; }
    </style>
</head>
<body class="antialiased min-h-screen flex flex-col relative overflow-x-hidden bg-[#050508] text-white">

    <!-- WebGL Background Canvas Layer -->
    <canvas id="bg-canvas" class="fixed inset-0 z-0 pointer-events-none w-full h-full"></canvas>
    
    <!-- Texture Layer: Grain Overlay -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.07]" style="mix-blend-mode: overlay; background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    
    <!-- Texture Layer: Blueprint Grid -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-20" style="background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px);"></div>

    <script>
        // WebGL Dynamic Fluid Fragment Shader Background
        const canvas = document.querySelector('#bg-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const scene = new THREE.Scene();

        const geometry = new THREE.PlaneGeometry(2, 2);

        const vertexShader = \`
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        \`;

        // Softree branded shader: Orange (#FF5812) & Red (#E31E24) with warm amber undertones
        const fragmentShader = \`
            uniform float u_time;
            uniform vec2 u_resolution;

            // Compact 2D Simplex Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m;
                m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                uv.x *= u_resolution.x / u_resolution.y;

                // Deep near-black background
                vec3 baseColor = vec3(0.02, 0.02, 0.035);
                
                vec2 st = uv * 0.75;
                st += vec2(snoise(st + u_time * 0.05), snoise(st - u_time * 0.05)) * 0.32;

                float beam = smoothstep(0.12, 0.85, snoise(vec2(st.x + st.y * 1.5 - u_time * 0.15, u_time * 0.02)));
                
                // Softree Brand Colors:
                // Primary glow: Softree Orange #FF5812 -> vec3(1.0, 0.345, 0.07)
                // Secondary glow: Softree Red #E31E24 -> vec3(0.89, 0.118, 0.141)
                // Supporting warm amber/dark-red tones
                vec3 colorOrange = vec3(1.0, 0.345, 0.07);
                vec3 colorRed = vec3(0.89, 0.118, 0.141);
                
                float noiseMix = snoise(uv * 1.5 + u_time * 0.1) * 0.5 + 0.5;
                vec3 glow = mix(colorOrange, colorRed, noiseMix);

                gl_FragColor = vec4(baseColor + (glow * beam * 0.82), 1.0);
            }
        \`;

        const uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const clock = new THREE.Clock();
        let animId;
        function animate() {
            uniforms.u_time.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        }
        animate();

        function handleResize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h);
            uniforms.u_resolution.value.set(w, h);
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('beforeunload', () => {
            if (animId) cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        });
    </script>

</body></html>`;

function buildFocusedDocument() {
  const targetJson = JSON.stringify([
    { selector: TARGET_SELECTOR, role: "background" },
  ]).replace(/</g, "\\u003c");
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${BACKGROUND} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return FLUID_SOURCE.replace(/<\/head>/i, `${focusStyle}</head>`).replace(
    /<\/body>/i,
    `${focusScript}</body>`,
  );
}

export function FluidFieldBackground({
  mode = "dark",
  hue = DEFAULTS.hue,
  saturation = DEFAULTS.saturation,
  brightness = DEFAULTS.brightness,
  className,
  style,
}: FluidFieldBackgroundProps) {
  const source = useMemo(() => buildFocusedDocument(), []);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={mode}
      title="Softree Fluid Field Background"
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: BACKGROUND,
        filter,
        ...style,
      }}
    />
  );
}

export default FluidFieldBackground;
