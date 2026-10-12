"use client";

import React, { useEffect, useRef, type CSSProperties } from "react";

export type BallStudyProps = {
  mode?: "dark" | "light" | "transparent";
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=?#§¶△◊×÷%@&*/<>+-$¥£ΑΒΓΔΕΖΗΘΛΞΠΣΦΨΩαβγδεζηθλμξπστυφχψω«»‹›";
const N = 1900;
const TILT = 0.17;
const ct = Math.cos(TILT);
const st = Math.sin(TILT);
/* Larger sphere radius and font size so the ball is grand, bold, and prominent */
const RR = 0.46;
const FS = 0.034;
const CYOFF = 0.01;
const MONO = '"Courier New", Courier, monospace';

function rng(seed: number) {
  let s = seed >>> 0;
  return function () {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function BallStudy({
  scale = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
  style,
}: BallStudyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Initialize stable points on sphere */
    const r = rng(77712345);
    const pts: Array<{
      x: number;
      y: number;
      z: number;
      c: string;
      back: number;
    }> = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - 2 * r();
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = r() * Math.PI * 2;
      pts.push({
        x: Math.cos(th) * rad,
        y,
        z: Math.sin(th) * rad,
        c: CHARS.charAt(Math.floor(r() * CHARS.length)),
        back: 0,
      });
    }

    let spin = 0;
    let vel = 0.22;
    let isHovered = false;
    const parts: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vr: number;
      size: number;
      c: string;
      t: number;
      life: number;
    }> = [];
    const proj = new Float32Array(N * 4);

    let curWidth = 0;
    let curHeight = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (w === canvas.width && h === canvas.height && curWidth === rect.width) return;
      canvas.width = w;
      canvas.height = h;
      curWidth = rect.width;
      curHeight = rect.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    /* Pointer listeners for hover acceleration */
    const onEnter = () => {
      isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };
    const onMove = () => {
      isHovered = true;
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      const size = Math.min(curWidth, curHeight);
      const fs = size * FS;
      const now = performance.now();
      const hitR = size * 0.08;
      const hit = hitR * hitR;

      for (let i = 0; i < N; i++) {
        if (pts[i].back > now) continue;
        if (proj[i * 4 + 3] < 0.7) continue;
        const dx = proj[i * 4] - px;
        const dy = proj[i * 4 + 1] - py;
        if (dx * dx + dy * dy > hit) continue;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        pts[i].back = now + 1600 + Math.random() * 300;
        parts.push({
          x: proj[i * 4],
          y: proj[i * 4 + 1],
          vx:
            (dx / d) * size * (0.14 + Math.random() * 0.20) +
            (Math.random() - 0.5) * size * 0.07,
          vy: (dy / d) * size * 0.10 - size * (0.04 + Math.random() * 0.14),
          rot: 0,
          vr: (Math.random() - 0.5) * 6.5,
          size: fs * (0.9 + 0.15 * proj[i * 4 + 2]),
          c: pts[i].c,
          t: now,
          life: 2200,
        });
      }
      if (parts.length > 450) parts.splice(0, parts.length - 450);
    };

    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);

    let prev = performance.now();
    let animId: number;

    const frame = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;

      ctx.clearRect(0, 0, curWidth, curHeight);

      /* Hover acceleration */
      const target = isHovered ? 1.45 : 0.22;
      vel += (target - vel) * Math.min(1, dt / 220);
      spin += vel * (dt / 1000);

      const size = Math.min(curWidth, curHeight);
      const cx = curWidth / 2;
      const cy = curHeight / 2 + size * CYOFF;
      const R = size * RR;
      const fs = size * FS;
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);

      const order: number[] = [];
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x1 = p.x * cs - p.z * sn;
        const z1 = p.x * sn + p.z * cs;
        const y2 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        const d = (z2 + 1) * 0.5;
        const sc = 0.12 + 0.88 * Math.pow(d, 1.8);
        const px = cx + x1 * R;
        const py = cy + y2 * R;
        proj[i * 4] = px;
        proj[i * 4 + 1] = py;
        proj[i * 4 + 2] = sc;
        proj[i * 4 + 3] = d;
        if (p.back > now) continue;
        order.push(i);
      }
      order.sort((a, b) => proj[a * 4 + 3] - proj[b * 4 + 3]);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let lastFont = "";
      for (let k = 0; k < order.length; k++) {
        const j = order[k];
        const z2b = proj[j * 4 + 3];
        const scb = proj[j * 4 + 2];
        let a = 0.45 + 0.55 * Math.pow(z2b, 1.15);
        const grow = pts[j].back ? Math.min(1, (now - pts[j].back) / 420) : 1;
        if (grow < 1) a *= grow;
        const f = "bold " + (Math.round(fs * scb * 4) / 4) + "px " + MONO;
        if (f !== lastFont) {
          ctx.font = f;
          lastFont = f;
        }

        /* Orange and Red Palette */
        const col =
          j % 3 === 0
            ? "239,68,68"
            : j % 3 === 1
            ? "255,107,44"
            : "255,145,55";
        ctx.fillStyle = "rgba(" + col + "," + a.toFixed(3) + ")";
        ctx.fillText(pts[j].c, proj[j * 4], proj[j * 4 + 1]);
      }

      /* Flying scattered embers */
      const g = size * 0.8;
      for (let m = parts.length - 1; m >= 0; m--) {
        const q = parts[m];
        const age = now - q.t;
        if (age > q.life || q.y > curHeight + 40) {
          parts.splice(m, 1);
          continue;
        }
        q.vy += g * (dt / 1000);
        q.x += q.vx * (dt / 1000);
        q.y += q.vy * (dt / 1000);
        q.rot += q.vr * (dt / 1000);
        const af = Math.max(0, 1 - age / q.life);
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(q.rot);
        ctx.font = "bold " + q.size.toFixed(2) + "px " + MONO;
        const pcol = m % 2 === 0 ? "255,107,44" : "239,68,68";
        ctx.fillStyle =
          "rgba(" + pcol + "," + (0.95 * Math.pow(af, 0.5)).toFixed(3) + ")";
        ctx.fillText(q.c, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const boundedScale = clamp(scale, 0.65, 1.5);
  const boundedOpacity = clamp(opacity, 0.1, 1);
  const boundedHue = clamp(hue, -180, 180);
  const boundedSaturation = clamp(saturation, 0, 2);
  const boundedBrightness = clamp(brightness, 0.4, 1.8);
  const filter =
    boundedHue === 0 && boundedSaturation === 1 && boundedBrightness === 1
      ? undefined
      : `hue-rotate(${boundedHue}deg) saturate(${boundedSaturation}) brightness(${boundedBrightness})`;

  return (
    <div
      className={["relative w-full h-full bg-transparent overflow-visible", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        backgroundColor: "transparent",
        opacity: boundedOpacity,
        filter,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent cursor-grab active:cursor-grabbing touch-none"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          backgroundColor: "transparent",
          transform: boundedScale === 1 ? undefined : `scale(${boundedScale})`,
        }}
      />
    </div>
  );
}
