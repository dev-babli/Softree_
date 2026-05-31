"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { STORY_TOKENS } from "../tokens"

const CUBES = [
  { x: 12, y: 28, z: 0, size: 44, delay: 0 },
  { x: 58, y: 18, z: 1, size: 52, delay: 0.1 },
  { x: 38, y: 42, z: 2, size: 38, delay: 0.15 },
  { x: 72, y: 36, z: 0, size: 40, delay: 0.2 },
  { x: 22, y: 52, z: 1, size: 36, delay: 0.25 },
  { x: 48, y: 8, z: 2, size: 48, delay: 0.05 },
  { x: 82, y: 22, z: 1, size: 34, delay: 0.3 },
]

type Props = { className?: string }

export function VoxelCubes({ className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cubes = gsap.utils.toArray<HTMLElement>("[data-voxel]", rootRef.current)
      cubes.forEach((cube, i) => {
        gsap.to(cube, {
          y: `+=${8 + (i % 3) * 4}`,
          rotationY: 12,
          duration: 2.4 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className={`relative h-full min-h-[200px] w-full ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(${STORY_TOKENS.primaryMuted} 1px, transparent 1px),
            linear-gradient(90deg, ${STORY_TOKENS.primaryMuted} 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          transform: "perspective(400px) rotateX(58deg)",
          transformOrigin: "center bottom",
        }}
      />
      {CUBES.map((cube, i) => (
        <div
          key={i}
          data-voxel
          className="absolute rounded-lg shadow-[0_12px_40px_rgba(109,93,246,0.25)]"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: cube.size,
            height: cube.size,
            transform: `translateZ(${cube.z * 12}px)`,
            background:
              i % 2 === 0
                ? `linear-gradient(145deg, #fff 0%, ${STORY_TOKENS.primaryMuted} 100%)`
                : `linear-gradient(145deg, ${STORY_TOKENS.primary} 0%, #8B7CF8 100%)`,
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        />
      ))}
    </div>
  )
}
