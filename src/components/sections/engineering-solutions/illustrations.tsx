"use client";

/* ============================================================================
 * Isometric SVG illustrations — v2 (high-fidelity rebuild).
 *
 * Geometry rules (so every illustration shares one visual language):
 *   • Iso projection — top face is a 2:1 rhombus (dx:dy = 2:1)
 *   • Three-tone shading per solid: TOP > RIGHT > LEFT (dark)
 *   • 1px inner highlight on top-front edges via lighter stroke
 *   • Glow halos sit under the stack, never above
 *   • Connector lines: 2 5 dasharray, animated dashoffset
 * ========================================================================= */

import * as React from "react";
import { motion } from "framer-motion";

/* ────────────────────────────  ISO BLOCK ATOMS  ──────────────────────────── */

/** Diamond top face — drawn from (cx,cy) of the top.
 *  w = half-width on x axis (in px on top face).
 *  Top face vertices: (cx, cy-w/2), (cx+w, cy), (cx, cy+w/2), (cx-w, cy). */
function IsoBlock({
    cx,
    cy,
    w,
    h,
    topFill,
    rightFill,
    leftFill,
    edge = "rgba(255,255,255,0.08)",
}: {
    cx: number;
    cy: number;
    w: number;
    h: number;
    topFill: string;
    rightFill: string;
    leftFill: string;
    edge?: string;
}) {
    const halfW = w;
    const halfH = w / 2;
    // Top face
    const top = [
        [cx, cy - halfH],
        [cx + halfW, cy],
        [cx, cy + halfH],
        [cx - halfW, cy],
    ];
    // Right face
    const right = [
        [cx, cy + halfH],
        [cx + halfW, cy],
        [cx + halfW, cy + h],
        [cx, cy + halfH + h],
    ];
    // Left face
    const left = [
        [cx, cy + halfH],
        [cx - halfW, cy],
        [cx - halfW, cy + h],
        [cx, cy + halfH + h],
    ];
    const toStr = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
    return (
        <g>
            <polygon points={toStr(left)} fill={leftFill} />
            <polygon points={toStr(right)} fill={rightFill} />
            <polygon points={toStr(top)} fill={topFill} stroke={edge} strokeWidth="0.5" />
        </g>
    );
}

/* ─────────────────────  ENGINEERING PLATFORM (HERO)  ─────────────────────── */
/* Single visual primitive shared by the central 3-tier stack AND every
 * satellite chip — a rounded-corner square projected into 2:1 isometric.
 *
 * Math notes
 * ──────────
 * • Iso projection uses matrix(1, 0.5, -1, 0.5, cx, cy). With this matrix,
 *   a square (2a × 2a) becomes a rhombus 4a wide × 2a tall. So if the caller
 *   wants a rhombus that spans `halfW` pixels from the center on the x-axis,
 *   the input rect must be halfW/2 × halfW/2.
 *
 * • The two visible side faces are drawn as parallelograms with rounded
 *   bottom corners using a sheared rect transform. Top corners are kept
 *   sharp because they meet the rounded top face cleanly there.
 */
function RoundedIsoTile({
    cx, cy, halfW, depth,
    topFill, rightFill, leftFill,
    edge = "rgba(255,255,255,0.10)",
    edgeWidth = 0.6,
    radius = 14,
    topOpacity = 1,
}: {
    cx: number; cy: number; halfW: number; depth: number;
    topFill: string; rightFill: string; leftFill: string;
    edge?: string; edgeWidth?: number; radius?: number; topOpacity?: number;
}) {
    const halfD = halfW / 2; // top face vertical half-extent (2:1 iso)
    return (
        <g>
            {/* RIGHT face — sheared rect: top edge goes from front-bottom
             *   point of top face → right point of top face. */}
            <g transform={`matrix(1,-0.5,0,1,${cx},${cy + halfD})`}>
                <rect
                    x="0" y="0" width={halfW} height={depth}
                    rx={radius * 0.5}
                    fill={rightFill}
                />
            </g>
            {/* LEFT face — sheared rect: top edge goes from left point of
             *   top face → front-bottom point of top face. */}
            <g transform={`matrix(1,0.5,0,1,${cx - halfW},${cy})`}>
                <rect
                    x="0" y="0" width={halfW} height={depth}
                    rx={radius * 0.5}
                    fill={leftFill}
                />
            </g>
            {/* TOP face — full iso projection of a rounded square. */}
            <g transform={`matrix(1,0.5,-1,0.5,${cx},${cy})`}>
                <rect
                    x={-halfW / 2} y={-halfW / 2}
                    width={halfW} height={halfW}
                    rx={radius}
                    fill={topFill}
                    fillOpacity={topOpacity}
                    stroke={edge}
                    strokeWidth={edgeWidth}
                />
            </g>
        </g>
    );
}

/* Connector wire — dotted line + small terminal node disks at both ends. */
function ConnectorWire({
    from, to, delay = 0,
}: {
    from: [number, number];
    to: [number, number];
    delay?: number;
}) {
    return (
        <g>
            <motion.line
                x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}
                stroke="rgba(180,170,255,0.55)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeDasharray="2 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
                cx={from[0]} cy={from[1]} r="2" fill="#A89BFF"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: delay + 0.55 }}
            />
            <motion.circle
                cx={to[0]} cy={to[1]} r="2.5" fill="#C9C2FF"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: delay + 0.65 }}
            />
        </g>
    );
}

/* Satellite — dark-navy rounded iso chip + centered white-outline glyph,
 * with an idle vertical float loop. */
function FloatingNode({
    x, y, delay = 0, kind,
}: {
    x: number; y: number; delay?: number;
    kind: "cloud" | "cube" | "code" | "db";
}) {
    return (
        <motion.g
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.g
                animate={{ y: [0, -4, 0] }}
                transition={{
                    duration: 4 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + 0.4,
                }}
            >
                {/* The chip itself */}
                <RoundedIsoTile
                    cx={x} cy={y}
                    halfW={32} depth={11}
                    topFill="#1F1B4A"
                    rightFill="#16133A"
                    leftFill="#100E2C"
                    edge="rgba(168,155,255,0.22)"
                    edgeWidth={0.8}
                    radius={9}
                />
                {/* Centered glyph on the top face */}
                <g
                    transform={`translate(${x},${y - 2})`}
                    stroke="#EAE4FF"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {kind === "cloud" && (
                        <path d="M-9 3 q-6 0 -6 -6 q0 -6 6 -6 q1 -5 7 -5 q6 0 7 5 q6 0 6 6 q0 6 -6 6 z" />
                    )}
                    {kind === "cube" && (
                        <g>
                            <polygon points="0,-9 8,-5 8,4 0,9 -8,4 -8,-5" />
                            <polyline points="-8,-5 0,-1 8,-5" />
                            <line x1="0" y1="-1" x2="0" y2="9" />
                        </g>
                    )}
                    {kind === "code" && (
                        <g>
                            <polyline points="-5,-5 -10,0 -5,5" />
                            <polyline points="5,-5 10,0 5,5" />
                            <line x1="-2" y1="6" x2="2" y2="-6" />
                        </g>
                    )}
                    {kind === "db" && (
                        <g>
                            <ellipse cx="0" cy="-7" rx="8" ry="2.6" />
                            <path d="M-8 -7 V-1 a8 2.6 0 0 0 16 0 V-7" />
                            <path d="M-8 -1 V5 a8 2.6 0 0 0 16 0 V-1" />
                        </g>
                    )}
                </g>
            </motion.g>
        </motion.g>
    );
}

/* The bright cobalt brand cube on top of the white tile — a small rounded
 * iso cube with the stylized white softree mark on its top face. */
function BrandCube({ cx, cy }: { cx: number; cy: number }) {
    return (
        <g>
            <RoundedIsoTile
                cx={cx} cy={cy}
                halfW={42} depth={12}
                topFill="url(#ep-mark-blue-top)"
                rightFill="#3B4DCB"
                leftFill="#2E3DAE"
                edge="rgba(255,255,255,0.30)"
                edgeWidth={0.8}
                radius={9}
            />
            {/* Subtle top sheen — radial highlight on the top face */}
            <ellipse
                cx={cx - 6} cy={cy - 8}
                rx="22" ry="8"
                fill="rgba(255,255,255,0.22)"
                transform={`rotate(-25 ${cx} ${cy})`}
            />
            {/* Stylized white "softree S" mark — two offset rounded blades. */}
            <g transform={`translate(${cx},${cy})`}>
                {/* Upper blade — slants down-left to up-right */}
                <path
                    d="M -10 -8 q -3 0 -3 3 q 0 3 3 3 h 12 q 3 0 3 -3 q 0 -3 -3 -3 z"
                    fill="#FFFFFF"
                />
                {/* Lower blade — offset right, slightly smaller */}
                <path
                    d="M -7 1 q -3 0 -3 3 q 0 3 3 3 h 12 q 3 0 3 -3 q 0 -3 -3 -3 z"
                    fill="#FFFFFF"
                    opacity="0.95"
                />
            </g>
        </g>
    );
}

export function EngineeringPlatformIllustration({
    className = "",
}: { className?: string }) {
    return (
        <div className={`relative aspect-[1/0.55] w-full ${className}`}>
            <svg
                viewBox="0 0 600 470"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    {/* Bottom tier — solid bright purple, biggest */}
                    <linearGradient id="ep-base-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5E50EC" />
                        <stop offset="100%" stopColor="#3F30C0" />
                    </linearGradient>
                    {/* Middle tier — frosted lavender, prominent glow */}
                    <linearGradient id="ep-mid-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4C9FF" />
                        <stop offset="100%" stopColor="#A38FF2" />
                    </linearGradient>
                    {/* Top tier — pure frosted white */}
                    <linearGradient id="ep-top-frost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#F0E9FF" />
                    </linearGradient>
                    {/* Cobalt brand cube top face */}
                    <linearGradient id="ep-mark-blue-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5E7BF7" />
                        <stop offset="100%" stopColor="#3F58E0" />
                    </linearGradient>

                    {/* Halo under stack */}
                    <radialGradient id="ep-glow" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#8B7BFF" stopOpacity="0.50" />
                        <stop offset="100%" stopColor="#5947E0" stopOpacity="0" />
                    </radialGradient>

                    {/* Faint dotted iso-grid — pattern in input space, then
                     *  skewed via the iso matrix for the floor pattern. */}
                    <pattern
                        id="ep-grid"
                        x="0" y="0" width="26" height="26"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="0.85" fill="rgba(180,170,255,0.18)" />
                    </pattern>
                </defs>

                {/* Background dotted grid — projected into iso plane */}
                <g transform="matrix(1,0.5,-1,0.5,300,230)" opacity="0.7">
                    <rect x="-450" y="-450" width="900" height="900" fill="url(#ep-grid)" />
                </g>

                {/* Glow under the bottom tier */}
                <ellipse cx="300" cy="345" rx="220" ry="48" fill="url(#ep-glow)" />

                {/* === Connector wires (drawn before satellites so the
                 *     terminal node dots overlay the dashed line cleanly) */}
                <ConnectorWire from={[195, 270]} to={[110, 240]} delay={0.45} />
                <ConnectorWire from={[345, 195]} to={[440, 130]} delay={0.55} />
                <ConnectorWire from={[395, 250]} to={[490, 240]} delay={0.65} />
                <ConnectorWire from={[225, 320]} to={[150, 360]} delay={0.75} />
                <ConnectorWire from={[375, 320]} to={[450, 360]} delay={0.85} />

                {/* === Central 3-tier stack ============================== */}
                {/* Bottom — solid deep purple */}
                <motion.g
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={300} cy={300}
                        halfW={130} depth={26}
                        topFill="url(#ep-base-top)"
                        rightFill="#3327A8"
                        leftFill="#291E92"
                        radius={22}
                    />
                </motion.g>

                {/* Middle — translucent frosted lavender (sits on top of bottom) */}
                <motion.g
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={300} cy={250}
                        halfW={98} depth={20}
                        topFill="url(#ep-mid-top)"
                        rightFill="#7C6BE8"
                        leftFill="#6353D0"
                        edge="rgba(255,255,255,0.40)"
                        edgeWidth={0.8}
                        radius={18}
                        topOpacity={0.78}
                    />
                </motion.g>

                {/* Top — frosted white tile with the cobalt brand cube */}
                <motion.g
                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={300} cy={210}
                        halfW={70} depth={20}
                        topFill="url(#ep-top-frost)"
                        rightFill="#D9D0F2"
                        leftFill="#BAAEDA"
                        edge="rgba(123,107,255,0.22)"
                        radius={14}
                    />
                </motion.g>

                {/* Brand cube — sits proud on the top tile */}
                <motion.g
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <BrandCube cx={300} cy={188} />
                </motion.g>

                {/* === Satellite nodes ==================================
                 *  Layout matches reference:
                 *    – top-right cloud
                 *    – mid-right cube
                 *    – bottom-right db
                 *    – bottom-left code
                 *    – mid-left cloud
                 */}
                <FloatingNode x={440} y={130} delay={0.45} kind="cloud" />
                <FloatingNode x={490} y={240} delay={0.55} kind="cube" />
                <FloatingNode x={450} y={360} delay={0.65} kind="db" />
                <FloatingNode x={150} y={360} delay={0.75} kind="code" />
                <FloatingNode x={110} y={240} delay={0.85} kind="cloud" />
            </svg>
        </div>
    );
}

/* ─────────────────────  AI & INTELLIGENT SYSTEMS  ────────────────────────── */
/* Round white pill chip — used for the 4 capability satellites around the
 * stack. Each chip carries an inline glyph payload. */
function AIChip({
    cx, cy, delay = 0, children,
}: {
    cx: number; cy: number; delay?: number; children: React.ReactNode;
}) {
    return (
        // Static positioning wrapper — kept outside motion components so
        // Framer's `y` keyframes can't override the translate.
        <g transform={`translate(${cx},${cy})`}>
            <motion.g
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.g
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                        duration: 4.5 + delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: delay + 0.4,
                    }}
                >
                    {/* Soft contact shadow — Gaussian-blurred radial puddle
                     *  centered slightly below the chip for a real "floating
                     *  on glass" feel (replaces the flat ellipse). */}
                    <ellipse
                        cx="0" cy="14"
                        rx="16" ry="3"
                        fill="url(#ai-chip-contact)"
                    />
                    {/* The chip — uses a proper soft drop-shadow filter */}
                    <g filter="url(#ai-chip-shadow)">
                        <circle
                            cx="0" cy="0" r="20"
                            fill="#FFFFFF"
                            stroke="rgba(91,109,236,0.10)"
                            strokeWidth="1"
                        />
                    </g>
                    {/* Inner top highlight — subtle 1px bevel that catches
                     *  light. Drawn as a thin arc on the upper rim. */}
                    <path
                        d="M -14 -6 a 14 14 0 0 1 28 0"
                        fill="none"
                        stroke="rgba(255,255,255,0.95)"
                        strokeWidth="0.7"
                        opacity="0.85"
                    />
                    {/* Inner bottom shading — 1px shadow on lower rim */}
                    <path
                        d="M -14 6 a 14 14 0 0 0 28 0"
                        fill="none"
                        stroke="rgba(91,109,236,0.10)"
                        strokeWidth="0.6"
                    />
                    {children}
                </motion.g>
            </motion.g>
        </g>
    );
}

/* Right-angle dotted connector — line from stack edge to chip with a single
 * 90° bend, chamfered with a small arc for a polished finish. Terminates in
 * a small node dot at the chip side. */
function AIConnector({
    from, to, bend, delay = 0,
}: {
    from: [number, number];
    to: [number, number];
    /** "h" → horizontal-then-vertical, "v" → vertical-then-horizontal */
    bend: "h" | "v";
    delay?: number;
}) {
    const corner: [number, number] =
        bend === "h" ? [to[0], from[1]] : [from[0], to[1]];
    // Chamfer radius — small arc at the bend so the corner reads as
    // "professionally drawn" rather than digitally aliased.
    const r = 6;
    const sx = Math.sign(corner[0] - from[0]) || 1;
    const sy = Math.sign(corner[1] - from[1]) || 1;
    // Pre-corner point: pull back by r along the from→corner axis.
    // Post-corner point: advance by r along the corner→to axis.
    const pre: [number, number] =
        bend === "h"
            ? [corner[0] - r * sx, corner[1]]
            : [corner[0], corner[1] - r * sy];
    const post: [number, number] =
        bend === "h"
            ? [corner[0], corner[1] + r * Math.sign(to[1] - corner[1] || 1)]
            : [corner[0] + r * Math.sign(to[0] - corner[0] || 1), corner[1]];
    const d =
        `M ${from[0]} ${from[1]} ` +
        `L ${pre[0]} ${pre[1]} ` +
        `Q ${corner[0]} ${corner[1]} ${post[0]} ${post[1]} ` +
        `L ${to[0]} ${to[1]}`;
    return (
        <g>
            <motion.path
                d={d}
                fill="none"
                stroke="rgba(120,135,220,0.45)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="2 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
                cx={to[0]} cy={to[1]} r="2" fill="#7B8FE8"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: delay + 0.7 }}
            />
        </g>
    );
}

export function AICubeIllustration({ className = "" }: { className?: string }) {
    return (
        <div className={`relative aspect-[1/0.48] w-full ${className}`}>
            <svg
                viewBox="0 0 520 320"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    {/* Frosted glass tile fills — pale blue/white, very translucent */}
                    <linearGradient id="ai-base-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E5EBFF" />
                        <stop offset="100%" stopColor="#C9D3F5" />
                    </linearGradient>
                    <linearGradient id="ai-mid-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D7E0FF" />
                        <stop offset="100%" stopColor="#B6C3F2" />
                    </linearGradient>
                    <linearGradient id="ai-top-frost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#EEF1FF" />
                    </linearGradient>
                    {/* Cobalt AI cube — refined three-stop gradient for depth */}
                    <linearGradient id="ai-cube-top" x1="0" y1="0" x2="0.7" y2="1">
                        <stop offset="0%" stopColor="#7B92FA" />
                        <stop offset="55%" stopColor="#4F6AEA" />
                        <stop offset="100%" stopColor="#3A50D8" />
                    </linearGradient>
                    {/* Diagonal sheen — soft white-to-transparent overlay
                     *  for a polished glass highlight on the AI cube top */}
                    <linearGradient id="ai-cube-sheen" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.10)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>

                    {/* Soft floor halo */}
                    <radialGradient id="ai-floor" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#A6B7F0" stopOpacity="0.42" />
                        <stop offset="100%" stopColor="#A6B7F0" stopOpacity="0" />
                    </radialGradient>

                    {/* Stack contact shadow — large, soft, very low alpha */}
                    <filter
                        id="ai-tile-shadow"
                        x="-30%" y="-20%" width="160%" height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dy="5" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.20" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Cube shadow — tighter, slightly stronger */}
                    <filter
                        id="ai-cube-shadow"
                        x="-30%" y="-20%" width="160%" height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                        <feOffset dy="4" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.30" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Round chip shadow — large soft contact patch */}
                    <filter
                        id="ai-chip-shadow"
                        x="-50%" y="-50%" width="200%" height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                        <feOffset dy="3" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.16" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Soft elliptical contact shadow under chip — drawn
                     *  separately so we can blur it properly */}
                    <radialGradient id="ai-chip-contact" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(80,90,200,0.18)" />
                        <stop offset="100%" stopColor="rgba(80,90,200,0)" />
                    </radialGradient>
                </defs>

                {/* Floor halo under stack */}
                <ellipse cx="260" cy="252" rx="180" ry="22" fill="url(#ai-floor)" />

                {/* === Connectors (chamfered L-bends) ====================
                 *  Anchored to the actual back/front corners of the stack
                 *  tiles so they read as physically wired. */}
                <AIConnector
                    from={[226, 165]} to={[120, 80]}
                    bend="v" delay={0.45}
                />
                <AIConnector
                    from={[294, 165]} to={[400, 80]}
                    bend="v" delay={0.55}
                />
                <AIConnector
                    from={[180, 235]} to={[80, 200]}
                    bend="h" delay={0.65}
                />
                <AIConnector
                    from={[340, 235]} to={[440, 230]}
                    bend="h" delay={0.75}
                />

                {/* === Central 3-tier stack (translucent frosted) ========= */}
                {/* Bottom — very pale, mostly transparent (ghost) */}
                <motion.g
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={260} cy={232}
                        halfW={120} depth={12}
                        topFill="url(#ai-base-top)"
                        rightFill="#A8B6E0"
                        leftFill="#94A3D2"
                        edge="rgba(150,170,230,0.30)"
                        edgeWidth={0.6}
                        radius={20}
                        topOpacity={0.40}
                    />
                </motion.g>

                {/* Middle — translucent floating layer */}
                <motion.g
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={260} cy={198}
                        halfW={94} depth={10}
                        topFill="url(#ai-mid-top)"
                        rightFill="#9DA9D5"
                        leftFill="#8794C4"
                        edge="rgba(180,195,240,0.50)"
                        edgeWidth={0.7}
                        radius={16}
                        topOpacity={0.50}
                    />
                </motion.g>

                {/* Top — frosted white tile with drop shadow */}
                <motion.g
                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <g filter="url(#ai-tile-shadow)">
                        <RoundedIsoTile
                            cx={260} cy={165}
                            halfW={70} depth={12}
                            topFill="url(#ai-top-frost)"
                            rightFill="#D5DDF2"
                            leftFill="#BBC5E0"
                            edge="rgba(135,150,220,0.25)"
                            edgeWidth={0.8}
                            radius={13}
                        />
                    </g>
                </motion.g>

                {/* Cobalt AI cube — sits proud on the top tile */}
                <motion.g
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <g filter="url(#ai-cube-shadow)">
                        <RoundedIsoTile
                            cx={260} cy={138}
                            halfW={44} depth={14}
                            topFill="url(#ai-cube-top)"
                            rightFill="#3B4DCB"
                            leftFill="#2E3DAE"
                            edge="rgba(255,255,255,0.40)"
                            edgeWidth={1}
                            radius={10}
                        />
                    </g>
                    {/* Diagonal sheen — clipped to the top face shape via
                     *  a matrix-skewed group, so it stays inside the cube */}
                    <g transform="matrix(1,0.5,-1,0.5,260,138)">
                        <rect
                            x={-22} y={-22} width={44} height={44}
                            rx={10}
                            fill="url(#ai-cube-sheen)"
                            opacity="0.6"
                        />
                    </g>
                    {/* Top-edge inner highlight — 1px white at the very top
                     *  of the top face for the polished glass look */}
                    <g transform="matrix(1,0.5,-1,0.5,260,138)">
                        <path
                            d="M -12 -22 a 10 10 0 0 1 24 0"
                            fill="none"
                            stroke="rgba(255,255,255,0.55)"
                            strokeWidth="1"
                        />
                    </g>
                    {/* "AI" wordmark — optically centered on the iso top face */}
                    <text
                        x="260" y="147"
                        textAnchor="middle"
                        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                        fontWeight={800}
                        fontSize={24}
                        fill="#FFFFFF"
                        letterSpacing="-1.2"
                        style={{
                            textRendering: "geometricPrecision",
                            paintOrder: "stroke fill",
                        }}
                    >
                        AI
                    </text>
                </motion.g>

                {/* === 4 capability chips ================================ */}
                <AIChip cx={120} cy={80} delay={0.5}>
                    <g
                        stroke="#5B7BE8"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        fill="none"
                    >
                        <line x1="-7" y1="6" x2="-7" y2="2" />
                        <line x1="0" y1="6" x2="0" y2="-3" />
                        <line x1="7" y1="6" x2="7" y2="-7" />
                    </g>
                </AIChip>

                <AIChip cx={400} cy={80} delay={0.6}>
                    <g
                        fill="none"
                        stroke="#5B7BE8"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    >
                        <path d="M -10 -7 h 20 a 4 4 0 0 1 4 4 v 6 a 4 4 0 0 1 -4 4 h -10 l -5 5 v -5 h -5 a 4 4 0 0 1 -4 -4 v -6 a 4 4 0 0 1 4 -4 z" />
                    </g>
                    <g fill="#5B7BE8">
                        <circle cx="-5" cy="-1" r="1.4" />
                        <circle cx="0" cy="-1" r="1.4" />
                        <circle cx="5" cy="-1" r="1.4" />
                    </g>
                </AIChip>

                <AIChip cx={80} cy={200} delay={0.7}>
                    <g
                        fill="none"
                        stroke="#5B7BE8"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    >
                        <path d="M -11 -7 h 18 a 4 4 0 0 1 4 4 v 6 a 4 4 0 0 1 -4 4 h -7 l -5 5 v -5 h -6 a 4 4 0 0 1 -4 -4 v -6 a 4 4 0 0 1 4 -4 z" />
                    </g>
                    <g fill="#5B7BE8">
                        <circle cx="-3" cy="-1" r="1.4" />
                        <circle cx="2" cy="-1" r="1.4" />
                    </g>
                </AIChip>

                <AIChip cx={440} cy={230} delay={0.8}>
                    <g
                        fill="none"
                        stroke="#5B7BE8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M -8 -3 a 8 8 0 0 1 16 0" />
                        <polyline points="5,-5 8,-3 6,1" />
                        <path d="M 8 3 a 8 8 0 0 1 -16 0" />
                        <polyline points="-5,5 -8,3 -6,-1" />
                    </g>
                </AIChip>
            </svg>
        </div>
    );
}

/* ─────────────────────  DATA & ANALYTICS (SCULPTURAL OBJECT)  ────────────── */
/* Premium sculptural data object — 5 translucent glass columns rising from a
 * floating mint/cyan platform. Each column emits internal soft light through
 * a vertical gradient and a top cap rim highlight. NOT a BI chart. */

/** A single sculptural glass column.
 *  - cx, cy : center of the BASE (top face) of the column
 *  - halfW  : half-width on iso x-axis
 *  - h      : height (positive integer; column extends UP from cy by h)
 *  - delay  : entrance stagger
 *  - tone   : "mint" | "cyan" — alternates so the row reads as composed,
 *             not striped
 */
function SculpturalColumn({
    cx, cy, halfW, h, delay = 0, tone,
}: {
    cx: number; cy: number; halfW: number; h: number;
    delay?: number; tone: "mint" | "cyan";
}) {
    const topId = tone === "mint" ? "da-col-mint-top" : "da-col-cyan-top";
    const sideR = tone === "mint" ? "url(#da-col-mint-right)" : "url(#da-col-cyan-right)";
    const sideL = tone === "mint" ? "url(#da-col-mint-left)" : "url(#da-col-cyan-left)";
    return (
        <motion.g
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${cx}px ${cy + h / 2}px` }}
        >
            {/* Idle float — gentle vertical drift, slight per-column phase */}
            <motion.g
                animate={{ y: [0, -1.5, 0] }}
                transition={{
                    duration: 5 + delay * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + 0.6,
                }}
            >
                {/* The column body — drawn as iso block with translucent
                 *  GLASS fills and an internal vertical light gradient. */}
                <RoundedIsoTile
                    cx={cx} cy={cy - h}
                    halfW={halfW} depth={h}
                    topFill={`url(#${topId})`}
                    rightFill={sideR}
                    leftFill={sideL}
                    edge="rgba(255,255,255,0.55)"
                    edgeWidth={0.8}
                    radius={Math.max(halfW * 0.45, 4)}
                    topOpacity={0.92}
                />

                {/* Internal LIGHT EMISSION — a vertical gradient overlay
                 *  drawn on the right/left side faces, brighter at top,
                 *  softer at bottom. We re-draw the side faces as parallel-
                 *  ograms with the emission gradient on top of the base
                 *  fill, opacity-controlled to keep the column readable. */}
                {/* Right face emission */}
                <g transform={`matrix(1,-0.5,0,1,${cx},${cy - h + halfW / 2})`}>
                    <rect
                        x="0" y="0" width={halfW} height={h}
                        rx={Math.max(halfW * 0.45, 4) * 0.5}
                        fill="url(#da-col-emission)"
                        opacity="0.55"
                    />
                </g>
                {/* Left face emission — flipped */}
                <g transform={`matrix(1,0.5,0,1,${cx - halfW},${cy - h})`}>
                    <rect
                        x="0" y="0" width={halfW} height={h}
                        rx={Math.max(halfW * 0.45, 4) * 0.5}
                        fill="url(#da-col-emission)"
                        opacity="0.40"
                    />
                </g>

                {/* Top RIM HIGHLIGHT — bright cyan stroke around the top
                 *  face for the "polished glass cap" finish */}
                <g transform={`matrix(1,0.5,-1,0.5,${cx},${cy - h})`}>
                    <rect
                        x={-halfW / 2} y={-halfW / 2}
                        width={halfW} height={halfW}
                        rx={Math.max(halfW * 0.45, 4)}
                        fill="none"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="0.9"
                        opacity="0.75"
                    />
                </g>

                {/* Top SHEEN — soft diagonal highlight on the top face */}
                <g transform={`matrix(1,0.5,-1,0.5,${cx},${cy - h})`}>
                    <rect
                        x={-halfW / 2} y={-halfW / 2}
                        width={halfW} height={halfW}
                        rx={Math.max(halfW * 0.45, 4)}
                        fill="url(#da-col-sheen)"
                        opacity="0.7"
                    />
                </g>

                {/* Soft bloom under the top cap — color-spilling glow that
                 *  reads as light leaking out of the glass column */}
                <ellipse
                    cx={cx} cy={cy - h - 1}
                    rx={halfW * 0.85} ry={halfW * 0.30}
                    fill={tone === "mint" ? "rgba(120,240,210,0.45)" : "rgba(70,210,230,0.40)"}
                    opacity="0.55"
                />
            </motion.g>
        </motion.g>
    );
}

export function DataAnalyticsIllustration({
    className = "",
}: { className?: string }) {
    return (
        <div className={`relative aspect-[1/0.65] w-full ${className}`}>
            <svg
                viewBox="0 0 260 240"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    {/* PLATFORM — mint-cyan rounded iso tile */}
                    <linearGradient id="da-platform-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C7F4EA" />
                        <stop offset="100%" stopColor="#7BDCC9" />
                    </linearGradient>

                    {/* COLUMN — mint variant */}
                    <linearGradient id="da-col-mint-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E5FCF6" />
                        <stop offset="100%" stopColor="#9DECDA" />
                    </linearGradient>
                    <linearGradient id="da-col-mint-right" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(170,240,220,0.85)" />
                        <stop offset="100%" stopColor="rgba(80,200,180,0.55)" />
                    </linearGradient>
                    <linearGradient id="da-col-mint-left" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(150,225,205,0.75)" />
                        <stop offset="100%" stopColor="rgba(60,170,150,0.55)" />
                    </linearGradient>

                    {/* COLUMN — cyan variant */}
                    <linearGradient id="da-col-cyan-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DEFAFF" />
                        <stop offset="100%" stopColor="#8EDDEE" />
                    </linearGradient>
                    <linearGradient id="da-col-cyan-right" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(155,230,245,0.85)" />
                        <stop offset="100%" stopColor="rgba(60,180,210,0.55)" />
                    </linearGradient>
                    <linearGradient id="da-col-cyan-left" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(135,210,225,0.75)" />
                        <stop offset="100%" stopColor="rgba(50,160,185,0.55)" />
                    </linearGradient>

                    {/* INTERNAL LIGHT EMISSION — applied to side faces */}
                    <linearGradient id="da-col-emission" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                        <stop offset="40%" stopColor="rgba(180,250,235,0.40)" />
                        <stop offset="100%" stopColor="rgba(100,200,200,0)" />
                    </linearGradient>

                    {/* TOP SHEEN — diagonal white-to-transparent for cap polish */}
                    <linearGradient id="da-col-sheen" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>

                    {/* FLOOR HALO */}
                    <radialGradient id="da-floor" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#5BD3BD" stopOpacity="0.42" />
                        <stop offset="100%" stopColor="#5BD3BD" stopOpacity="0" />
                    </radialGradient>

                    {/* PLATFORM SHADOW — soft drop */}
                    <filter
                        id="da-platform-shadow"
                        x="-30%" y="-20%" width="160%" height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                        <feOffset dy="6" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.20" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Floor halo — punchy cyan glow under platform */}
                <ellipse cx="130" cy="200" rx="115" ry="20" fill="url(#da-floor)" />

                {/* PLATFORM — sits the columns sculpturally */}
                <motion.g
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <g filter="url(#da-platform-shadow)">
                        <RoundedIsoTile
                            cx={130} cy={180}
                            halfW={100} depth={12}
                            topFill="url(#da-platform-top)"
                            rightFill="#3FBFA9"
                            leftFill="#33A793"
                            edge="rgba(255,255,255,0.40)"
                            edgeWidth={0.8}
                            radius={18}
                        />
                    </g>
                </motion.g>

                {/* === 5 SCULPTURAL COLUMNS ============================
                 *  Heights: short, tall, mid, tallest, mid → asymmetric
                 *  rhythm, sculptural composition, not chart-like.
                 *
                 *  Iso layout: column centers offset along iso x-axis
                 *  with z-order from back (deepest) to front so painter's
                 *  algorithm gives correct overlap.
                 */}
                {/* Back-most column — top of stack rendering order */}
                <SculpturalColumn cx={90} cy={180} halfW={11} h={42} tone="cyan" delay={0.20} />
                <SculpturalColumn cx={110} cy={180} halfW={11} h={66} tone="mint" delay={0.30} />
                <SculpturalColumn cx={130} cy={180} halfW={11} h={50} tone="cyan" delay={0.40} />
                <SculpturalColumn cx={150} cy={180} halfW={11} h={88} tone="mint" delay={0.50} />
                <SculpturalColumn cx={170} cy={180} halfW={11} h={58} tone="cyan" delay={0.60} />
            </svg>
        </div>
    );
}

/* ─────────────────────  CLOUD & INFRASTRUCTURE (CLUSTER)  ────────────────── */
/* Premium sculptural cloud cluster — 5 floating glass cubes arranged as a
 * distributed system with elegant thin pathways between them. Warm orange
 * tinted glass, internal light emission, soft enterprise-grade composure. */

/** A single cluster cube — frosted orange glass with a top-face glyph and
 *  per-cube float phase. */
function ClusterCube({
    cx, cy, halfW, depth, glyph, delay = 0, floatPhase = 0,
}: {
    cx: number; cy: number; halfW: number; depth: number;
    glyph: "compute" | "storage" | "network" | "security" | "monitoring";
    delay?: number;
    floatPhase?: number;
}) {
    return (
        <motion.g
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.g
                animate={{ y: [0, -2.5, 0] }}
                transition={{
                    duration: 4.5 + floatPhase,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + 0.5 + floatPhase * 0.3,
                }}
            >
                {/* Soft contact shadow under cube */}
                <ellipse
                    cx={cx} cy={cy + depth + 6}
                    rx={halfW * 0.85} ry={halfW * 0.22}
                    fill="rgba(180,80,20,0.18)"
                />

                {/* Cube body — translucent orange glass */}
                <g filter="url(#ci-cube-shadow)">
                    <RoundedIsoTile
                        cx={cx} cy={cy}
                        halfW={halfW} depth={depth}
                        topFill="url(#ci-cube-top)"
                        rightFill="url(#ci-cube-right)"
                        leftFill="url(#ci-cube-left)"
                        edge="rgba(255,255,255,0.55)"
                        edgeWidth={0.9}
                        radius={Math.max(halfW * 0.30, 5)}
                        topOpacity={0.92}
                    />
                </g>

                {/* Top edge inner highlight — bright rim catches light */}
                <g transform={`matrix(1,0.5,-1,0.5,${cx},${cy})`}>
                    <path
                        d={`M ${-halfW * 0.45} ${-halfW / 2} a ${halfW * 0.45} ${halfW * 0.45} 0 0 1 ${halfW * 0.9} 0`}
                        fill="none"
                        stroke="rgba(255,255,255,0.75)"
                        strokeWidth="0.9"
                    />
                </g>

                {/* Diagonal sheen on top face */}
                <g transform={`matrix(1,0.5,-1,0.5,${cx},${cy})`}>
                    <rect
                        x={-halfW / 2} y={-halfW / 2}
                        width={halfW} height={halfW}
                        rx={Math.max(halfW * 0.30, 5)}
                        fill="url(#ci-cube-sheen)"
                        opacity="0.65"
                    />
                </g>

                {/* Top-face glyph — white outline, optically centered */}
                <g
                    transform={`translate(${cx},${cy})`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {glyph === "compute" && (
                        // Stacked horizontal bars — reads as "compute / processor"
                        <g>
                            <rect x="-7" y="-5" width="14" height="3" rx="1" />
                            <rect x="-7" y="-1" width="14" height="3" rx="1" />
                            <rect x="-7" y="3" width="14" height="3" rx="1" />
                        </g>
                    )}
                    {glyph === "storage" && (
                        // Stacked database cylinders
                        <g>
                            <ellipse cx="0" cy="-4" rx="6" ry="1.8" />
                            <path d="M-6 -4 V0 a6 1.8 0 0 0 12 0 V-4" />
                            <path d="M-6 0 V4 a6 1.8 0 0 0 12 0 V0" />
                        </g>
                    )}
                    {glyph === "network" && (
                        // Three connected nodes — reads as "network / mesh"
                        <g>
                            <circle cx="0" cy="-5" r="1.6" fill="#FFFFFF" />
                            <circle cx="-5" cy="3" r="1.6" fill="#FFFFFF" />
                            <circle cx="5" cy="3" r="1.6" fill="#FFFFFF" />
                            <line x1="0" y1="-5" x2="-5" y2="3" />
                            <line x1="0" y1="-5" x2="5" y2="3" />
                            <line x1="-5" y1="3" x2="5" y2="3" />
                        </g>
                    )}
                    {glyph === "security" && (
                        // Shield with check
                        <g>
                            <path d="M0 -6 l5 2 v4 c0 3 -2 4 -5 6 c-3 -2 -5 -3 -5 -6 v-4 z" />
                            <path d="M-2 0 l1.5 1.5 l3 -3" />
                        </g>
                    )}
                    {glyph === "monitoring" && (
                        // Pulse / heartbeat line in a small frame
                        <g>
                            <polyline points="-7,0 -3,0 -1,-4 1,4 3,-2 5,0 7,0" />
                        </g>
                    )}
                </g>
            </motion.g>
        </motion.g>
    );
}

/** Elegant curved pathway between two cubes — quadratic Bézier with mid
 *  point lifted upward, animated dasharray, terminal node dots. */
function ClusterPath({
    from, to, lift = 12, delay = 0,
}: {
    from: [number, number];
    to: [number, number];
    /** How much to lift the curve mid-point (px). Negative dips below. */
    lift?: number;
    delay?: number;
}) {
    const mid: [number, number] = [
        (from[0] + to[0]) / 2,
        (from[1] + to[1]) / 2 - lift,
    ];
    const d = `M ${from[0]} ${from[1]} Q ${mid[0]} ${mid[1]} ${to[0]} ${to[1]}`;
    return (
        <g>
            <motion.path
                d={d}
                fill="none"
                stroke="rgba(220,120,50,0.40)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="2 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
                cx={from[0]} cy={from[1]} r="1.6" fill="#F97316"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: delay + 0.6 }}
            />
            <motion.circle
                cx={to[0]} cy={to[1]} r="1.6" fill="#F97316"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: delay + 0.7 }}
            />
        </g>
    );
}

export function CloudInfraIllustration({
    className = "",
}: { className?: string }) {
    /* Cube positions (top-face centers).
     * Compute is the "core" — slightly larger, raised highest.
     * The 4 satellites form a diamond around it: storage back-left,
     * network back-right, security front-left, monitoring front-right. */
    const compute: [number, number] = [130, 110];
    const storage: [number, number] = [70, 95];
    const network: [number, number] = [190, 95];
    const security: [number, number] = [80, 175];
    const monitoring: [number, number] = [200, 175];

    return (
        <div className={`relative aspect-[1/0.62] w-full ${className}`}>
            <svg
                viewBox="0 0 260 240"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    {/* Cube glass — warm orange three-stop gradient */}
                    <linearGradient id="ci-cube-top" x1="0" y1="0" x2="0.7" y2="1">
                        <stop offset="0%" stopColor="#FFD3AC" />
                        <stop offset="55%" stopColor="#FFA76A" />
                        <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                    <linearGradient id="ci-cube-right" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,160,90,0.92)" />
                        <stop offset="100%" stopColor="rgba(220,90,20,0.85)" />
                    </linearGradient>
                    <linearGradient id="ci-cube-left" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(225,135,75,0.90)" />
                        <stop offset="100%" stopColor="rgba(190,75,12,0.85)" />
                    </linearGradient>

                    {/* Diagonal sheen on cube top */}
                    <linearGradient id="ci-cube-sheen" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                        <stop offset="55%" stopColor="rgba(255,255,255,0.10)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>

                    {/* Floor halo — warm orange */}
                    <radialGradient id="ci-floor" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F97316" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                    </radialGradient>

                    {/* Drop shadow under each cube */}
                    <filter
                        id="ci-cube-shadow"
                        x="-30%" y="-20%" width="160%" height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                        <feOffset dy="4" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.22" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Floor halo — grounds the cluster */}
                <ellipse cx="135" cy="220" rx="135" ry="16" fill="url(#ci-floor)" />

                {/* === ELEGANT CONNECTING PATHWAYS ======================
                 *  Drawn BEFORE cubes so the cubes overlay endpoints.
                 *  Compute connects to all 4 satellites; perimeter ring
                 *  links satellite-to-neighbor for the mesh look. */}
                {/* Compute → satellites (radial) */}
                <ClusterPath from={compute} to={storage} lift={6} delay={0.55} />
                <ClusterPath from={compute} to={network} lift={6} delay={0.65} />
                <ClusterPath from={compute} to={security} lift={-8} delay={0.75} />
                <ClusterPath from={compute} to={monitoring} lift={-8} delay={0.85} />
                {/* Perimeter mesh — neighbor links */}
                <ClusterPath from={storage} to={network} lift={14} delay={0.95} />
                <ClusterPath from={security} to={monitoring} lift={-14} delay={1.05} />
                <ClusterPath from={storage} to={security} lift={0} delay={1.15} />
                <ClusterPath from={network} to={monitoring} lift={0} delay={1.25} />

                {/* === 5 FLOATING CUBES =================================
                 *  Render order back-to-front so painter's algorithm
                 *  produces correct overlap (smaller y = farther back). */}
                {/* Back-left — Storage */}
                <ClusterCube
                    cx={storage[0]} cy={storage[1]}
                    halfW={20} depth={18}
                    glyph="storage"
                    delay={0.1}
                    floatPhase={0.2}
                />
                {/* Back-right — Network */}
                <ClusterCube
                    cx={network[0]} cy={network[1]}
                    halfW={20} depth={18}
                    glyph="network"
                    delay={0.18}
                    floatPhase={0.5}
                />
                {/* Center — Compute (largest, "core") */}
                <ClusterCube
                    cx={compute[0]} cy={compute[1]}
                    halfW={26} depth={22}
                    glyph="compute"
                    delay={0.0}
                    floatPhase={0}
                />
                {/* Front-left — Security */}
                <ClusterCube
                    cx={security[0]} cy={security[1]}
                    halfW={20} depth={18}
                    glyph="security"
                    delay={0.26}
                    floatPhase={0.7}
                />
                {/* Front-right — Monitoring */}
                <ClusterCube
                    cx={monitoring[0]} cy={monitoring[1]}
                    halfW={20} depth={18}
                    glyph="monitoring"
                    delay={0.34}
                    floatPhase={1.0}
                />
            </svg>
        </div>
    );
}

/* ─────────────────────  DIGITAL PRODUCTS (PRODUCT ECOSYSTEM)  ────────────── */
/* Premium product engineering visual — front-on laptop + standing phone on a
 * subtle shared platform, with two pedestal accents in the back to imply a
 * wider product family. Cool silver-lavender wash (NOT purple-dominant),
 * proper Apple-style proportions, sparse abstract UI. */
export function DigitalProductsIllustration({
    className = "",
}: { className?: string }) {
    return (
        <div className={`relative aspect-[1/0.48] w-full ${className}`}>
            <svg
                viewBox="0 0 520 320"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    {/* Screen — pure white with the faintest lavender tint */}
                    <linearGradient id="dp-screen-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FAF8FF" />
                    </linearGradient>
                    {/* Laptop bezel — premium cool silver with subtle vertical
                     *  light-to-dark for the real machined-aluminum feel */}
                    <linearGradient id="dp-bezel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F4F0FA" />
                        <stop offset="55%" stopColor="#E5DFF0" />
                        <stop offset="100%" stopColor="#CFC8E0" />
                    </linearGradient>
                    {/* Laptop deck (keyboard surface) — slightly cooler */}
                    <linearGradient id="dp-deck" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EAE4F2" />
                        <stop offset="100%" stopColor="#C7BFDB" />
                    </linearGradient>
                    {/* Laptop deck front edge — darkest sliver for thickness */}
                    <linearGradient id="dp-deck-edge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#BAB1CE" />
                        <stop offset="100%" stopColor="#9D93B8" />
                    </linearGradient>
                    {/* Hinge crease — narrow dark band where lid meets deck */}
                    <linearGradient id="dp-hinge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9D93B8" />
                        <stop offset="50%" stopColor="#7E74A0" />
                        <stop offset="100%" stopColor="#9D93B8" />
                    </linearGradient>
                    {/* Phone bezel — same silver family */}
                    <linearGradient id="dp-phone-bezel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EEE7F7" />
                        <stop offset="55%" stopColor="#DDD3EC" />
                        <stop offset="100%" stopColor="#C2B7DE" />
                    </linearGradient>
                    {/* Shared platform — pale lavender base */}
                    <linearGradient id="dp-platform-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EAE3F7" />
                        <stop offset="100%" stopColor="#CCC0E5" />
                    </linearGradient>
                    {/* Pedestal accents (slightly more saturated) */}
                    <linearGradient id="dp-pedestal-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E2DAF2" />
                        <stop offset="100%" stopColor="#B6A9D8" />
                    </linearGradient>
                    {/* Brand title bar — saturated purple */}
                    <linearGradient id="dp-titlebar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B6BFF" />
                        <stop offset="100%" stopColor="#5C4BE0" />
                    </linearGradient>
                    {/* Soft indigo for in-screen UI accents (less saturated
                     *  than the brand purple — sits better on silver) */}
                    <linearGradient id="dp-accent-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8278E8" />
                        <stop offset="100%" stopColor="#6353D8" />
                    </linearGradient>
                    {/* Floor halo — very soft */}
                    <radialGradient id="dp-floor" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#9B89F0" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#9B89F0" stopOpacity="0" />
                    </radialGradient>
                    {/* Near-contact shadow under devices (sharper, darker) */}
                    <radialGradient id="dp-contact" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(60,55,90,0.22)" />
                        <stop offset="100%" stopColor="rgba(60,55,90,0)" />
                    </radialGradient>
                    {/* Drop shadows */}
                    <filter id="dp-laptop-shadow" x="-20%" y="-10%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                        <feOffset dy="10" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.14" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="dp-phone-shadow" x="-30%" y="-10%" width="160%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                        <feOffset dy="10" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.18" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Floor halo — very subtle wash */}
                <ellipse cx="260" cy="296" rx="240" ry="14" fill="url(#dp-floor)" />
                {/* Sharper contact patch — darker, tighter, sits right under devices */}
                <ellipse cx="220" cy="275" rx="150" ry="8" fill="url(#dp-contact)" />
                <ellipse cx="415" cy="275" rx="60" ry="6" fill="url(#dp-contact)" />

                {/* Back-left pedestal accent (cube on top of low platform) */}
                <motion.g
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={50} cy={245}
                        halfW={26} depth={6}
                        topFill="url(#dp-pedestal-top)"
                        rightFill="#A89AC8" leftFill="#9385B5"
                        edge="rgba(255,255,255,0.30)" edgeWidth={0.6}
                        radius={5}
                    />
                    <RoundedIsoTile
                        cx={50} cy={228}
                        halfW={13} depth={16}
                        topFill="url(#dp-pedestal-top)"
                        rightFill="#9485C2" leftFill="#7E70AB"
                        edge="rgba(255,255,255,0.40)" edgeWidth={0.7}
                        radius={3}
                    />
                </motion.g>

                {/* Back-right pedestal accent (smaller) */}
                <motion.g
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={478} cy={252}
                        halfW={22} depth={5}
                        topFill="url(#dp-pedestal-top)"
                        rightFill="#A89AC8" leftFill="#9385B5"
                        edge="rgba(255,255,255,0.30)" edgeWidth={0.6}
                        radius={4}
                    />
                    <RoundedIsoTile
                        cx={478} cy={238}
                        halfW={11} depth={12}
                        topFill="url(#dp-pedestal-top)"
                        rightFill="#9485C2" leftFill="#7E70AB"
                        edge="rgba(255,255,255,0.40)" edgeWidth={0.7}
                        radius={3}
                    />
                </motion.g>

                {/* Shared platform — subtle, very wide */}
                <motion.g
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RoundedIsoTile
                        cx={260} cy={278}
                        halfW={200} depth={6}
                        topFill="url(#dp-platform-top)"
                        rightFill="#A89AC8" leftFill="#9385B5"
                        edge="rgba(255,255,255,0.40)" edgeWidth={0.7}
                        radius={14}
                        topOpacity={0.85}
                    />
                </motion.g>

                {/* === LAPTOP — front-on view, premium silver finish ===== */}
                <motion.g
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    <g filter="url(#dp-laptop-shadow)" transform="translate(195,160)">
                        {/* Lid (bezel) — rounded rect with subtle perspective.
                         *  rx=8 gives the proper Apple device corner radius. */}
                        <rect
                            x="-126" y="-72" width="252" height="146" rx="8"
                            fill="url(#dp-bezel)"
                            stroke="rgba(160,150,200,0.40)"
                            strokeWidth="0.8"
                        />
                        {/* Inner bezel highlight — 1px white-rim catch */}
                        <rect
                            x="-124.5" y="-70.5" width="249" height="143" rx="6.5"
                            fill="none"
                            stroke="rgba(255,255,255,0.55)"
                            strokeWidth="0.5"
                        />
                        {/* Inner screen — proper rounded corners (rx=4.5) */}
                        <rect
                            x="-118" y="-62" width="236" height="124" rx="4.5"
                            fill="url(#dp-screen-top)"
                        />
                        {/* Webcam dot */}
                        <circle cx="0" cy="-66" r="0.9" fill="#9D93B8" />

                        {/* Title bar — saturated brand purple, top-clipped to
                         *  the screen rect via a single rect (no overlap noise) */}
                        <path
                            d="M -118 -62 h 236 v 13 h -236 z"
                            fill="url(#dp-titlebar)"
                        />
                        {/* Re-clip the bottom of the title bar so it follows
                         *  the screen's top corner radius — clean edge */}
                        <rect
                            x="-118" y="-62" width="236" height="13"
                            fill="url(#dp-titlebar)"
                        />
                        <circle cx="-110" cy="-55.5" r="1.6" fill="rgba(255,255,255,0.70)" />
                        <rect x="-102" y="-57" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.40)" />
                        <rect x="100" y="-57" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.40)" />

                        {/* TOP ROW — 3 cards with breathing room.
                         *  Cards use the soft indigo accent, not heavy purple. */}
                        <UICard x={-110} y={-40} w={70} h={42}>
                            <rect x="0" y="0" width="22" height="2.5" rx="1.2" fill="#D4CDED" />
                            {/* 5 ascending bars — cleaner spacing */}
                            <rect x="0" y="22" width="6" height="14" rx="1" fill="#A99CFF" />
                            <rect x="10" y="14" width="6" height="22" rx="1" fill="#8278E8" />
                            <rect x="20" y="20" width="6" height="16" rx="1" fill="#A99CFF" />
                            <rect x="30" y="10" width="6" height="26" rx="1" fill="#6353D8" />
                            <rect x="40" y="18" width="6" height="18" rx="1" fill="#8278E8" />
                        </UICard>
                        <UICard x={-32} y={-40} w={64} h={42}>
                            <rect x="0" y="0" width="22" height="2.5" rx="1.2" fill="#D4CDED" />
                            {/* Big circular check ring */}
                            <circle cx="28" cy="22" r="14" fill="#A99CFF" opacity="0.25" />
                            <circle cx="28" cy="22" r="9" fill="#7B6BFF" />
                            <path
                                d="M 24 22 l 3 3 l 6 -6"
                                stroke="#FFFFFF" strokeWidth="1.5" fill="none"
                                strokeLinecap="round" strokeLinejoin="round"
                            />
                        </UICard>
                        <UICard x={40} y={-40} w={70} h={42}>
                            <rect x="0" y="0" width="22" height="2.5" rx="1.2" fill="#D4CDED" />
                            {/* Avatar + 2 lines — sparse */}
                            <circle cx="6" cy="22" r="6" fill="#7B6BFF" />
                            <rect x="16" y="18" width="36" height="3" rx="1.5" fill="#D8CEEC" />
                            <rect x="16" y="24" width="22" height="3" rx="1.5" fill="#EFE9FB" />
                        </UICard>

                        {/* BOTTOM ROW — 2 cards (split 40/60) */}
                        <UICard x={-110} y={10} w={88} h={48}>
                            <rect x="0" y="0" width="30" height="2.5" rx="1.2" fill="#D4CDED" />
                            <text
                                x="0" y="22"
                                fontFamily="Inter, sans-serif"
                                fontSize="9"
                                fontWeight="700"
                                fill="#5C4BE0"
                            >
                                12.4K
                            </text>
                            <text
                                x="40" y="22"
                                fontFamily="Inter, sans-serif"
                                fontSize="8"
                                fontWeight="700"
                                fill="#A99CFF"
                            >
                                +8%
                            </text>
                            <rect x="0" y="30" width="76" height="2" rx="1" fill="#E5DDF8" />
                            <rect x="0" y="35" width="50" height="2" rx="1" fill="#EFE9FB" />
                        </UICard>
                        <UICard x={-14} y={10} w={124} h={48}>
                            <rect x="0" y="0" width="30" height="2.5" rx="1.2" fill="#D4CDED" />
                            {/* Soft area fill under the line */}
                            <path
                                d="M 0 38 L 14 30 L 28 34 L 42 18 L 56 24 L 70 10 L 84 14 L 98 4 L 112 8 L 112 40 L 0 40 Z"
                                fill="url(#dp-accent-line)" opacity="0.10"
                            />
                            <polyline
                                points="0,38 14,30 28,34 42,18 56,24 70,10 84,14 98,4 112,8"
                                fill="none"
                                stroke="url(#dp-accent-line)"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="98" cy="4" r="2" fill="#6353D8" />
                        </UICard>
                    </g>

                    {/* Hinge crease — thin dark band between lid and deck */}
                    <rect
                        x="69" y="231" width="252" height="1.5" rx="0.7"
                        fill="url(#dp-hinge)"
                    />

                    {/* Laptop deck (keyboard base) — wider than lid, with
                     *  subtle taper. Drawn as a path so the front bottom
                     *  edge has rounded corners. */}
                    <g transform="translate(195,232)">
                        {/* Top deck surface — perspective taper inwards.
                         *  Path: rounded bottom corners (rx≈3 via cubic). */}
                        <path
                            d="M -130 0
                               L 130 0
                               L 134 12
                               Q 134 14 132 14
                               L -132 14
                               Q -134 14 -134 12 Z"
                            fill="url(#dp-deck)"
                            stroke="rgba(140,130,180,0.30)" strokeWidth="0.6"
                            strokeLinejoin="round"
                        />
                        {/* Front edge — darker sliver for thickness */}
                        <path
                            d="M -132 14
                               L 132 14
                               L 135 18
                               Q 135 20 132 20
                               L -132 20
                               Q -135 20 -135 18 Z"
                            fill="url(#dp-deck-edge)"
                            stroke="rgba(120,110,160,0.30)" strokeWidth="0.5"
                            strokeLinejoin="round"
                        />
                        {/* Trackpad — soft inset rect, slightly off-center */}
                        <rect
                            x="-26" y="4" width="52" height="6" rx="1.5"
                            fill="rgba(120,110,160,0.10)"
                            stroke="rgba(120,110,160,0.18)"
                            strokeWidth="0.4"
                        />
                    </g>
                </motion.g>

                {/* === PHONE — standing right, premium proportions ======= */}
                <motion.g
                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Anchor at the platform top so the tilt rotates the
                     *  phone around its base, not its center */}
                    <g filter="url(#dp-phone-shadow)" transform="translate(415,170)">
                        <g transform="rotate(3.5 0 102)">
                            {/* Bezel — rounded with proper iPhone proportions */}
                            <rect
                                x="-34" y="-94" width="68" height="196" rx="14"
                                fill="url(#dp-phone-bezel)"
                                stroke="rgba(160,150,200,0.45)" strokeWidth="0.8"
                            />
                            {/* Inner bezel highlight */}
                            <rect
                                x="-32.5" y="-92.5" width="65" height="193" rx="12.5"
                                fill="none"
                                stroke="rgba(255,255,255,0.55)" strokeWidth="0.5"
                            />
                            {/* Screen */}
                            <rect
                                x="-29" y="-89" width="58" height="186" rx="9"
                                fill="url(#dp-screen-top)"
                            />
                            {/* Dynamic island notch */}
                            <rect
                                x="-12" y="-87" width="24" height="4" rx="2"
                                fill="#1C1B2E"
                            />

                            {/* Header */}
                            <circle cx="-19" cy="-72" r="6" fill="#7B6BFF" />
                            <rect x="-10" y="-75" width="28" height="3" rx="1.5" fill="#D8CEEC" />
                            <rect x="-10" y="-69" width="18" height="2.5" rx="1.2" fill="#EFE9FB" />

                            {/* Card 1 — line chart */}
                            <UICard x={-25} y={-60} w={50} h={36}>
                                <rect x="0" y="0" width="22" height="2.5" rx="1.2" fill="#D4CDED" />
                                <polyline
                                    points="0,26 8,20 16,22 24,12 32,16 40,8 44,10"
                                    fill="none"
                                    stroke="url(#dp-accent-line)"
                                    strokeWidth="1.4"
                                    strokeLinecap="round" strokeLinejoin="round"
                                />
                                <circle cx="44" cy="10" r="1.6" fill="#6353D8" />
                            </UICard>

                            {/* Card 2 — list */}
                            <UICard x={-25} y={-18} w={50} h={36}>
                                <circle cx="6" cy="6" r="6" fill="#A99CFF" opacity="0.40" />
                                <circle cx="6" cy="6" r="4" fill="#7B6BFF" />
                                <rect x="16" y="3" width="24" height="2.5" rx="1.2" fill="#D8CEEC" />
                                <rect x="16" y="8" width="16" height="2" rx="1" fill="#EFE9FB" />
                                <rect x="0" y="20" width="42" height="2" rx="1" fill="#E5DDF8" />
                                <rect x="0" y="25" width="28" height="2" rx="1" fill="#EFE9FB" />
                            </UICard>

                            {/* Card 3 — bars */}
                            <UICard x={-25} y={24} w={50} h={36}>
                                <rect x="0" y="0" width="22" height="2.5" rx="1.2" fill="#D4CDED" />
                                <rect x="0" y="20" width="5" height="8" rx="1" fill="#A99CFF" />
                                <rect x="8" y="14" width="5" height="14" rx="1" fill="#7B6BFF" />
                                <rect x="16" y="22" width="5" height="6" rx="1" fill="#A99CFF" />
                                <rect x="24" y="10" width="5" height="18" rx="1" fill="#6353D8" />
                                <rect x="32" y="16" width="5" height="12" rx="1" fill="#A99CFF" />
                                <rect x="40" y="6" width="5" height="22" rx="1" fill="#7B6BFF" />
                            </UICard>

                            {/* Home indicator */}
                            <rect x="-10" y="89" width="20" height="2" rx="1" fill="#9D93B8" />
                        </g>
                    </g>
                </motion.g>
            </svg>
        </div>
    );
}

/** Abstract UI card placeholder used inside both devices. Renders a white
 *  rounded rect with a hairline lavender border + a 4px inner padding so
 *  child coords are relative to the card's content origin. */
function UICard({
    x, y, w, h, children,
}: {
    x: number; y: number; w: number; h: number; children: React.ReactNode;
}) {
    return (
        <g transform={`translate(${x},${y})`}>
            <rect
                x="0" y="0" width={w} height={h}
                rx="3"
                fill="#FFFFFF"
                stroke="rgba(140,128,200,0.18)"
                strokeWidth="0.5"
            />
            <g transform="translate(4,4)">
                {children}
            </g>
        </g>
    );
}
