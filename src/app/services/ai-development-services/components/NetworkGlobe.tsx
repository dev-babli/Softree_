"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Fragment,
} from "react";

interface GlobeLocation {
  name: string;
  lat: number;
  lon: number;
}

type RelayLeg = [number, number];

interface Point3D {
  x: number;
  y: number;
  z: number;
  visibleScale: number;
}

interface PinStyle {
  visible: boolean;
  left: number;
  top: number;
}

interface NetworkGlobeProps {
  heading?: string;
  locations?: GlobeLocation[];
  legs?: RelayLeg[];
  caption?: string;
  storesLabel?: string;
}

const DEFAULT_LOCATIONS: GlobeLocation[] = [
  { name: "United States", lat: 39.82, lon: -98.57 }, // Central US
  { name: "Canada", lat: 56.13, lon: -106.34 }, // Central Canada
  { name: "Netherlands", lat: 52.37, lon: 4.89 }, // Amsterdam
  { name: "England", lat: 51.51, lon: -0.13 }, // London
  { name: "UAE", lat: 25.20, lon: 55.27 }, // Dubai
  { name: "India", lat: 28.61, lon: 77.20 }, // New Delhi
  { name: "Singapore", lat: 1.35, lon: 103.81 }, // Singapore
  { name: "South Korea", lat: 37.56, lon: 126.97 }, // Seoul
];

const DEFAULT_LEGS: RelayLeg[] = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
];

const LANDMASK_B64 = [
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAH/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf//8AAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAB////D//////n/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gf/x////////wAAAAAbgAAB4AAAAAAPwAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAf//8A///////+AAAAB/ngAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAcH3Hv/5////////8AAAAA/gAAAAAAAAAAAAD4AAAAAAAAAAAA",
  "AAAAAAAAAAcIAAQP/AH///////+AAAAAPCAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAADwDAc+f+AP///////4AAAAAAAAAAAAAB4AAAAB/8AAAAAAAAAAA",
  "AAAAAAAAAAH9wc374AAAf/////8AAAAAAAAAAAAH4AAAA////AAAB/gAAAAAAAAAAAAAAAAwAAA/QAAAH/////8AAAAAAAAAAAAOAAAAP///wAAAAAAAAAAA",
  "AAAAAAAAAP8AYe+c3AAAD/////4AAAAAAAAAAAA4AAAH////++HgAOAAAAAAAAAAAAAAAfv+4+w/4gAAB/////wAAAAAAAAAAADwAHgH///////4AfgAAAAA",
  "gAAAAAAAAPf/4O4//9AAB/////wAAAAAAAAAAADwAPb////////4m//gAAAAAAAf+AAAAAA/+A8f//4AB////8gAAAAAAA/gAAAAAfv/////////////8AAA",
  "AAB///+H//H/+PeDwf+AA3////AAAAAAA//4AAAA8fv///////////////P8gAf////////A4CPz4H8AAP///wAAAAAAD///wADH/n3/////////////////",
  "8AD////////////34Z/wA///4AAAAAAAP///+M////n/////////////////+4E/////////////gD/8Af//gAAAAAAAf//5+P////f/////////////////",
  "fw/////////////6AD8YAf/wAAf8AAAA/8f+D///////////////////////AgEf///////////zw7/AAP/gAAP4AAAB/4/+f//////////////////////8",
  "AMAf//////////+DIA/gAH/gAAAAAAAH/z/////////////////////////+AAH///////////8AwgOAAD+AAAAAAAA//H/////////////////////////6",
  "AAP///////////wAA/AAAB+AAAAAAAB/+H//////////////////////nP+AAAH//z////////wAA/wAAAOAAAAAAAB//D/////////////////////+A/4A",
  "AAA/zAD///////gAA/4wAAAAAAAAAAB//Ab///////////////////+eDgAAAAABwAA///////4AA/94AAAAAAAAAYA5+A///////////////////4AAHAAA",
  "AAAAAAADcAAD//////4AAf/8AAAAAAAAA8AC+C///////////////////wAAfgAAAAAMAAAA///////wAf/8AAAAAAAAA4AO8H///////////////////AAA/gAA",
  "AABgAAAA///////8A///AAAAAAAAA8ANwH//////////////////8AAB/AAAAAEAAAAAf///////z///4AAAAAAAHOAEDv//////////////////+AAA+AAA",
  "AAAAAAABH///////x///8AAAAAAAHHAf/////////////////////6AA8AAAAAAAAAAAD///////x///8AAAAAAAGPz//////////////////////6AAwAAA",
  "AAAAAAAAD///////9///6AAAAAAAAPj//////////////////////6AAQAAAAAAAAAAAC///////////MAAAAAAAAYf//////////////////////7AAAAAA",
  "AAAAAAAABv////////+MNAAAAAAAAD///////////////////////zAAAAAAAAAAAAAAAH////////7gfgAAAAAAAf///////////////////////yAAAAAA",
  "AAAAAAAAAL/////////gCgAAAAAAAH///////////////////////iAAAAAAAAAAAAAAAP/////////pAAAAAAAAAD/////uP/x//////////////DAAAAAA",
  "AAAAAAAAAP/////////+AAAAAAAAAB//v//Gf/B/////////////+AAAAAAAAAAAAAAAAP////////8wAAAAAAAAAB//H/+AP+P/////////////8CAAAAAA",
  "AAAAAAAAAP////////wAAAAAAAAADj/jz/8AD/H/////////////4HgAAAAAAAAAAAAAAP////////gAAAAAAAAAH/4Bw/8AA/B////////////+APAAAAAA",
  "AAAAAAAAAP////////gAAAAAAAAAH/wA8f8Ph/g////////////8AAAAAAAAAAAAAAAAAP///////8AAAAAAAAAAH/gMHfJ///x///////////v4AMAAAAAA",
  "AAAAAAAAAP///////8AAAAAAAAAAH/AMCOP///h//////////+JwAMAAAAAAAAAAAAAAAH///////4AAAAAAAAAAH/AAAHH///g//////////8BwAIAAAAAA",
  "AAAAAAAAAH///////wAAAAAAAAAAH+AAYGH///w//////////+w4A4AAAAAAAAAAAAAAAD///////wAAAAAAAAAAAgf+ACBs//////////////g4D4AAAAAA",
  "AAAAAAAAAB///////wAAAAAAAAAAAj/+AAAA//////////////AYf4AAAAAAAAAAAAAAAA///////gAAAAAAAAAAB//8AAAA//////////////Ah2AAAAAAA",
  "AAAAAAAAAAP/////+AAAAAAAAAAAD//+AAAB//////////////gDwAAAAAAAAAAAAAAAAAH/////8AAAAAAAAAAAH///4GAB//////////////gDAAAAAAAA",
  "AAAAAAAAAAG/////4AAAAAAAAAAAP///8P4h//////////////wCAAAAAAAAAAAAAAAAAACf////4AAAAAAAAAAAP////v////////////////gAAAAAAAAA",
  "AAAAAAAAAABP//hgYAAAAAAAAAAAP//////3//P///////////wAAAAAAAAAAAAAAAAAAAAv//AAYAAAAAAAAAAAf//////9//H///////////wAAAAAAAAA",
  "AAAAAAAAAAB3/+AAcAAAAAAAAAAB///////4//h///////////gAAAAAAAAAAAAAAAAAAAAR/+AANAAAAAAAAAAD///////8//wH//////////AAAAAAAAAA",
  "AAAAAAAAAAAJ/+AAEAAAAAAAAAAH///////+f/0B/////////+AAAAAAAAAAAAAAAAAAAAAI/8AAAAAAAAAAAAAH///////+f/44Af///////+QAAAAAAAAA",
  "AAAAAAAAAAAAf8AAAAAAAAAAAAAP////////H//+AP///////4gAAAAAAAAAAAAAAAAAAAAAP8AAuAAAAAAAAAAP////////H///AD///v///ggAAAAAAAAA",
  "AAAAAAAAAAAAH+AABgAAAAAAAAAf////////n//+AD//4P//YAAAAAAAAAAAAAAAAAAAAAAAP+A4AYAAAAAAAAAP////////j//+AAf/4H/+AAAAAAAAAAAA",
  "AAAAgAAAAAAAH/B4ABwAAAAAAAAP////////h//8AAf/gD/8YAAAAAAAAAAAAAAAAAAAAAAAD/nwAD9AAAAAAAAP////////x//4AAf/AD/8QAAAAAAAAAAA",
  "AAAAAAAAAAAAAf/wAAAAAAAAAAAP////////4//gAAf+AD/+AAwAAAAAAAAAAAAAAAAAAAAAAH/wAAAAAAAAAAAf////////4f+AAAf8AD//AAwAAAAAAAAA",
  "AAAAAAAAAAAAAAH/AAAAAAAAAAAf////////8f8AAAPwAAP/gAwAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAf////////+fgAAAPwAAP/gAwAAAAAAAAA",
  "AAAAAAAAAAAAAAA/AAAAAAAAAAAf/////////eAAAAHwAAP/gAMAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAf/////////gAAAAHwAAM/gACAAAAAAAAA",
  "AAAAAAAAAAAAAAADABAAAAAAAAAP/////////gYAAADwAAEfgAJAAAAAAAAAAAAAAAAAAAAAAAADgPfKAAAAAAAH/////////34AAADwAAIOABAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAyPf+AAAAAAAD//////////4AAADoAAIEACBAAAAAAAAAAAAAAAAAAAAAAAAA8///AAAAAAAB//////////wAAABIAAMAAAFAAAAAAAAA",
  "AAAAAAAAAAAAAAAAE///gAAAAAAB//////////wAAAAMAAEAAALgAAAAAAAAAAAAAAAAAAAAAAAAAf//wAAAAAAAf/////////gAAAAMAADAAMCAAAAAAAAA",
  "AAAAAAAAAAAAAAAAA////gAAAAAAP/B///////gAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAf///wAAAAAACAA///////AAAAAAAAxgA+AAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAf///4AAAAAAAAAD/////+AAAAAAAAZgB4AAAAAAAAAAAAAAAAAAAAAAAAAAB////4AAAAAAAAAD/////8AAAAAAAAMwH8AAAAAAAAAA",
  "AAAAAAAAAAAAAAAAB////8AAAAAAAAAH/////4AAAAAAAAHQf8AIAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAH/////gAAAAAAAAHgf88IAAAAAAAA",
  "AAAAAAAAAAAAAAAAD////+AAAAAAAAAH/////AAAAAAAAADwf8AAgAAAAAAAAAAAAAAAAAAAAAAAH/////4AAAAAAAAH/////AAAAAAAAABwP5wBwAAAAAAA",
  "AAAAAAAAAAAAAAAAH/////6AAAAAAAAD////+AAAAAAAAAB8P5wATwAAAAAAAAAAAAAAAAAAAAAAD//////4AAAAAAAB////8AAAAAAAAAA8AxQif+AAAAAA",
  "AAAAAAAAAAAAAAAAH//////8AAAAAAAB////4AAAAAAAAAAcAAIAD/gAAAAAAAAAAAAAAAAAAAAAH///////gAAAAAAA////4AAAAAAAAAAMAAIAI/ywAAAA",
  "AAAAAAAAAAAAAAAAH///////gAAAAAAA////4AAAAAAAAAADgAAAI/8BAAAAAAAAAAAAAAAAAAAAD///////gAAAAAAAf///4AAAAAAAAAAB+AAAA/4AIAAA",
  "AAAAAAAAAAAAAAAAB///////gAAAAAAAf///4AAAAAAAAAAAAmogAOMAAAAAAAAAAAAAAAAAAAAAB///////AAAAAAAAf///8AAAAAAAAAAAABCAAAGADAAA",
  "AAAAAAAAAAAAAAAAA///////AAAAAAAAf///8AAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAf/////+AAAAAAAAP///8AAAAAAAAAAAAAAAgCAAAAAA",
  "AAAAAAAAAAAAAAAAAf/////8AAAAAAAAf///+AQAAAAAAAAAAAAB+CAAAAAAAAAAAAAAAAAAAAAAAP/////4AAAAAAAAf///+AQAAAAAAAAAAAAD8DAAAAAA",
  "AAAAAAAAAAAAAAAAAP/////4AAAAAAAA////+AwAAAAAAAAAAAA38DgAAAAAAAAAAAAAAAAAAAAAAH/////4AAAAAAAA////8BwAAAAAAAAAAAD/8DgAAAAA",
  "AAAAAAAAAAAAAAAAAB/////4AAAAAAAA////8PwAAAAAAAAAAAD//HwAABABAAAAAAAAAAAAAAAAAAf////4AAAAAAAA////wPgAAAAAAAAAAAP//3wAAAAC",
  "AAAAAAAAAAAAAAAAAAP////wAAAAAAAA////APgAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAP////wAAAAAAAAf//+APgAAAAAAAAAAAf///4AAAAA",
  "AAAAAAAAAAAAAAAAAAP////wAAAAAAAAf//+APgAAAAAAAAAAD////+AAIAAAAAAAAAAAAAAAAAAAAP////gAAAAAAAAP//+AfAAAAAAAAAAAf////+AAEAA",
  "AAAAAAAAAAAAAAAAAAP////AAAAAAAAAP///AfAAAAAAAAAAA//////AAAAAAAAAAAAAAAAAAAAAAAP///4AAAAAAAAAP//+APAAAAAAAAAAA//////gAAAA",
  "AAAAAAAAAAAAAAAAAAf///gAAAAAAAAAH//+AOAAAAAAAAAAB//////wAAAAAAAAAAAAAAAAAAAAAAf///AAAAAAAAAAH//4AEAAAAAAAAAAA//////4AAAA",
  "AAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAH//4AAAAAAAAAAAAB//////4AAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAH//4AAAAAAAAAAAAA//////4AAAA",
  "AAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAD//wAAAAAAAAAAAAAf/////8AAAAAAAAAAAAAAAAAAAAAAf//8AAAAAAAAAAB//gAAAAAAAAAAAAAf/////4AAAA",
  "AAAAAAAAAAAAAAAAAA///8AAAAAAAAAAB//gAAAAAAAAAAAAAf/////4AAAAAAAAAAAAAAAAAAAAAA///4AAAAAAAAAAA//AAAAAAAAAAAAAAP/////4AAAA",
  "AAAAAAAAAAAAAAAAAAf//wAAAAAAAAAAA/+AAAAAAAAAAAAAAP/AP//wAAAAAAAAAAAAAAAAAAAAAA///gAAAAAAAAAAA/4AAAAAAAAAAAAAAf8AG//gAAAA",
  "AAAAAAAAAAAAAAAAAA//3AAAAAAAAAAAAYAAAAAAAAAAAAAAAOAAF//gAAAAAAAAAAAAAAAAAAAAAB//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAABA",
  "AAAAAAAAAAAAAAAAAB//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAgAAAAAAAAAAAAAAAAAD//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAQ",
  "AAAAAAAAAAAAAAAAAB//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAAcAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4",
  "AAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAADQ",
  "AAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAHAAAAAAAAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAOA",
  "AAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4A",
  "AAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAA",
  "AAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAH4AAAAAAB4HgAD8AAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAA//AAAD//////////wAAAAA",
  "AAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAf///4Af///////////AAAAAAAAAAAAAAAAAAAAAAAz4AAAAAAAAAAAAAAAPz////8B/////////////wAAA",
  "AAAAAAAAAAAAAAAAAA78AAAAAAAAAAA8/8///////wf/////////////+AAAAAAAAAAAAAAAAAAAAH9+AAAAAAAAZ////////////w////////////////4A",
  "AAAAAAAAAAAAAAAAAAB+AAAAAAAB//////////////////////////////4AAAAAAAAABmAAB8f+HB/+AAAAAAAP//////////////////////////////gA",
  "AAAAAAAP/c/oAf/////4AAAAAAAP/////////////////////////////8AAAAAAAD/////////////gAAAAAAB//////////////////////////////wAA",
  "AAAAAD////////////wAAAAAAP///////////////////////////////wAAAAAD/////////////4AAAAAAD////////////////////////////////wAA",
  "AADh/////////////AAAAB8A/////////////////////////////////+AAAAA4Af///////////gAAAH+AA///////////////////////////////+AAA",
  "AAAAAH///////////+A/A/wAA///////////////////////////////8AAAAAAAf//////////////gAAAf////////////////////////////////+AAA",
  "AAAAH///////////////h////////////////////////////////////wAAAAAAP/////////////////////////////////////////////////////gA",
  "+/gAAH/////////////////////////////////////////////////////8/////v//////////////////////////////////////////////////////",
  "////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////",
  "////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////",
].join("");

const LANDMASK_W = 360;
const LANDMASK_H = 180;

function base64ToBytes(b64: string): Uint8Array {
  const binary =
    typeof atob === "function"
      ? atob(b64)
      : Buffer.from(b64, "base64").toString("binary");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

let landBits: Uint8Array | null = null;
function getLandBits(): Uint8Array {
  if (!landBits) landBits = base64ToBytes(LANDMASK_B64);
  return landBits;
}

function isLand(lat: number, lon: number): boolean {
  const bits = getLandBits();
  // The provided landmask is shifted ~28 degrees east. 
  // We offset the lookup to shift the drawn landmass west by 28 degrees.
  let col = Math.floor(lon + 180 + 28);
  col = col % LANDMASK_W;
  if (col < 0) col += LANDMASK_W;
  
  let row = Math.floor(90 - lat);
  if (row < 0) row = 0;
  if (row >= LANDMASK_H) row = LANDMASK_H - 1;
  const idx = row * LANDMASK_W + col;
  const byte = bits[idx >> 3];
  return ((byte >> (7 - (idx % 8))) & 1) === 1;
}

function buildDots(): { lat: number; lon: number }[] {
  const dots: { lat: number; lon: number }[] = [];
  const latStep = 1.6;
  for (let lat = -89; lat <= 89; lat += latStep) {
    const circumferenceFactor = Math.max(Math.cos((lat * Math.PI) / 180), 0.05);
    const lonStep = Math.min(1.6 / circumferenceFactor, 6);
    for (let lon = -180; lon < 180; lon += lonStep) {
      if (isLand(lat, lon)) dots.push({ lat, lon });
    }
  }
  return dots;
}

const DOTS = buildDots();

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,500&display=swap');

.globe-section{
  --panel:#141311;
  --pill-bg:#2a2724;
  --pill-bg-active:#f2ede7;
  --pill-text-active:#141311;
  --text:#f2ede7;
  --text-dim:#a89f95;

  width:100%;
  background: radial-gradient(circle at 50% 40%, #1c1510 0%, #0a0908 100%);
  border: 1px solid rgba(255, 107, 0, 0.08);
  padding:32px 24px 40px;
  position:relative;
  overflow:hidden;
  font-family:'Inter',sans-serif;
  box-sizing:border-box;
  border-radius: 32px;
}
.globe-section *{ box-sizing:border-box; }

.globe-container{
  max-width: 1200px;
  margin: 0 auto;
}

.globe-heading{
  font-family: 'Playfair Display', Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  font-size:42px;
  line-height:1.15;
  font-weight:400;
  color:var(--text);
  margin:0 0 24px;
  letter-spacing: 0;
  text-transform: none;
}

.globe-layout{
  display:flex;
  justify-content:center;
  position:relative;
  margin-bottom: 32px;
}

.globe-canvas-wrap{
  position:relative;
  width:400px;
  height:400px;
  max-width:100%;
}

.globe-canvas-wrap canvas{
  width:100%;
  height:100%;
  display:block;
  cursor:grab;
  touch-action:none;
}
.globe-canvas-wrap canvas:active{ cursor:grabbing; }

.pin-label{
  position:absolute;
  transform:translate(-50%,-100%);
  background:var(--pill-bg);
  color:var(--text);
  font-size:11px;
  font-weight:600;
  padding:4px 10px;
  border-radius:24px;
  white-space:nowrap;
  pointer-events:none;
  opacity:0;
  transition:opacity .25s ease, background .25s ease, color .25s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.pin-label.visible{ opacity:1; }
.pin-label.active{ background:var(--pill-bg-active); color:var(--pill-text-active); }
.pin-label::after{
  content:'';
  position:absolute;
  left:50%;
  bottom:-14px;
  width:1px;
  height:14px;
  background:rgba(255,255,255,0.2);
  transform:translateX(-50%);
}
.pin-label::before{
  content:'';
  position:absolute;
  left:50%;
  bottom:-16px;
  width:6px;
  height:6px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,0.4);
  background:var(--panel);
  transform:translate(-50%,50%);
}
.pin-label.active::after{ background:#FF6B00; }
.pin-label.active::before{ border-color:#FF6B00; background:#FF6B00; }

.globe-footer{
  display:flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  gap:16px;
}

.globe-footer-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
}

.stores-count{
  color:var(--text-dim);
  font-size:14px;
  font-weight: 500;
  white-space: nowrap;
}

.switcher{
  display:flex;
  align-items:center;
  gap:16px;
  background:var(--panel);
  padding:4px 8px;
  border-radius:40px;
  border: 1px solid rgba(255,255,255,0.05);
  white-space: nowrap;
}
.switcher button{
  background:transparent;
  border:none;
  color:var(--text);
  cursor:pointer;
  width:32px;
  height:32px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  transition: background 0.2s;
}
.switcher button:hover{ background:#2a2620; }
.switcher .store-name{
  min-width:140px;
  text-align:center;
  color:var(--text);
  font-size:14px;
  font-weight:600;
}

.caption{
  width:100%;
  color:var(--text-dim);
  font-size:12px;
  line-height:1.4;
  text-align: left;
  white-space: normal;
}

@media (max-width:768px){
  .globe-heading{font-size:36px; margin-bottom: 40px;}
  .globe-canvas-wrap{width: 100%; height: 100vw;}
  .globe-footer{flex-direction:column; align-items:center; text-align: center;}
  .caption{text-align: center; max-width: 100%;}
}
`;

export default function NetworkGlobe({
  heading = "Where we operate",
  locations = DEFAULT_LOCATIONS,
  legs = DEFAULT_LEGS,
  caption = "Global presence, local excellence. Delivering world-class AI engineering across 8 key technology hubs.",
  storesLabel = "8 global locations",
}: NetworkGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimsRef = useRef({ W: 0, H: 0, R: 0 });
  const rotationRef = useRef(0);
  const autoSpeedRef = useRef(0.015);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragVelRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pinStyles, setPinStyles] = useState<PinStyle[]>(() =>
    locations.map(() => ({ visible: false, left: 0, top: 0 }))
  );

  const project = useCallback((lat: number, lon: number): Point3D => {
    const { W, H, R } = dimsRef.current;
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = (lon * Math.PI) / 180 + rotationRef.current;
    
    let x3 = Math.sin(phi) * Math.sin(theta);
    let y3 = Math.cos(phi);
    let z3 = Math.sin(phi) * Math.cos(theta);

    // 1. Tilt X (forward/back) to achieve the 75-degree viewing angle
    const tiltX = (15 * Math.PI) / 180;
    let y3_x = y3 * Math.cos(tiltX) - z3 * Math.sin(tiltX);
    let z3_x = y3 * Math.sin(tiltX) + z3 * Math.cos(tiltX);

    // 2. Tilt Z (left/right) to bend the axis towards the right, matching Earth's natural tilt
    const tiltZ = (-23.5 * Math.PI) / 180;
    let x3_z = x3 * Math.cos(tiltZ) - y3_x * Math.sin(tiltZ);
    let y3_z = x3 * Math.sin(tiltZ) + y3_x * Math.cos(tiltZ);

    return {
      x: W / 2 + x3_z * R,
      y: H / 2 - y3_z * R,
      z: z3_x,
      visibleScale: (z3_x + 1) / 2,
    };
  }, []);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const rect = wrap.getBoundingClientRect();
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctxRef.current = ctx;
    dimsRef.current = {
      W: rect.width,
      H: rect.height,
      R: Math.min(rect.width, rect.height) * 0.46,
    };
  }, []);

  const drawGlobe = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { W, H, R } = dimsRef.current;

    ctx.clearRect(0, 0, W, H);

    // Draw sphere background shadow & subtle glow
    const sphereGrad = ctx.createRadialGradient(
      W / 2 - R * 0.3,
      H / 2 - R * 0.3,
      0,
      W / 2,
      H / 2,
      R
    );
    sphereGrad.addColorStop(0, "rgba(255, 107, 0, 0.12)"); // warm core glow
    sphereGrad.addColorStop(0.6, "rgba(255, 107, 0, 0.02)");
    sphereGrad.addColorStop(1, "rgba(10, 9, 8, 0.65)");

    ctx.beginPath();
    ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    // Removed horizontal latitude lines (lines circling the globe in a row)
    /*
    for (let l = -60; l <= 60; l += 30) {
      ctx.beginPath();
      let started = false;
      for (let lo = -180; lo <= 180; lo += 4) {
        const p = project(l, lo);
        if (p.z < -0.05) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(p.x, p.y);
          started = true;
        } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    */
    for (let lo = -150; lo <= 180; lo += 30) {
      ctx.beginPath();
      let started = false;
      for (let l = -89; l <= 89; l += 3) {
        const p = project(l, lo);
        if (p.z < -0.05) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(p.x, p.y);
          started = true;
        } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (const d of DOTS) {
      const p = project(d.lat, d.lon);
      if (p.z < -0.1) continue;
      const alpha = 0.3 + p.visibleScale * 0.7;
      const size = 1.4 + p.visibleScale * 1.3;
      ctx.fillStyle = `rgba(255,107,0,${alpha.toFixed(2)})`; // Softree orange #FF6B00
      ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
    }

    const now = performance.now() / 1000;
    legs.forEach(([aIdx, bIdx], i) => {
      const a = locations[aIdx];
      const b = locations[bIdx];
      if (!a || !b) return;
      const pa = project(a.lat, a.lon);
      const pb = project(b.lat, b.lon);
      if (pa.z < -0.2 || pb.z < -0.2) return;

      const mx = (pa.x + pb.x) / 2;
      const my = (pa.y + pb.y) / 2;
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist;
      const ny = dx / dist;
      const bulge = Math.min(dist * 0.35, 60);
      const cx = mx - nx * bulge;
      const cy = my - ny * bulge - bulge * 0.3;

      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.quadraticCurveTo(cx, cy, pb.x, pb.y);
      // Removed the permanent white line as requested
      // ctx.strokeStyle = "rgba(255,255,255,0.4)";
      // ctx.lineWidth = 1;
      // ctx.stroke();

      const loopDuration = 1.7; // t goes up to 1.7 so the tail can fully reach the destination
      const t = (now * 0.45 + i * 0.15) % loopDuration; // Increased speed (0.25 -> 0.45)
      
      const headT = Math.min(t, 1);
      const tailT = Math.max(0, t - 0.7); // 70% tail distance
      
      if (tailT >= 1) return; // The shooting star has fully entered the destination
      
      // Draw comet tail (shooting star effect)
      const steps = 30; // Smoothness of the tail
      
      for (let j = 0; j < steps; j++) {
        const fraction1 = j / steps;
        const fraction2 = (j + 1) / steps;
        
        const t1 = headT - fraction1 * (headT - tailT);
        const t2 = headT - fraction2 * (headT - tailT);
        
        if (t1 <= 0 && t2 <= 0) break; // Before start
        
        const st1 = Math.max(0, t1);
        const st2 = Math.max(0, t2);

        const omt1 = 1 - st1;
        const x1 = omt1 * omt1 * pa.x + 2 * omt1 * st1 * cx + st1 * st1 * pb.x;
        const y1 = omt1 * omt1 * pa.y + 2 * omt1 * st1 * cy + st1 * st1 * pb.y;

        const omt2 = 1 - st2;
        const x2 = omt2 * omt2 * pa.x + 2 * omt2 * st2 * cx + st2 * st2 * pb.x;
        const y2 = omt2 * omt2 * pa.y + 2 * omt2 * st2 * cy + st2 * st2 * pb.y;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        
        // Fade out and thin out towards the end of the tail
        const alpha = Math.max(0, 1 - fraction1);
        const thickness = Math.max(0.2, 2.5 - (fraction1 * 2.3));
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      
      // Leading small dot
      if (headT > 0 && headT < 1) { // Disappears right as it hits destination, tail follows
        const omt = 1 - headT;
        const tx = omt * omt * pa.x + 2 * omt * headT * cx + headT * headT * pb.x;
        const ty = omt * omt * pa.y + 2 * omt * headT * cy + headT * headT * pb.y;
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    });
  }, [project, legs, locations]);

  const updatePinStyles = useCallback(() => {
    setPinStyles(
      locations.map((loc) => {
        const p = project(loc.lat, loc.lon);
        return {
          visible: p.z > 0.05,
          left: p.x,
          top: p.y - 14,
        };
      })
    );
  }, [project, locations]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    function tick() {
      if (!draggingRef.current) {
        rotationRef.current += autoSpeedRef.current + dragVelRef.current;
        dragVelRef.current *= 0.92;
      }
      drawGlobe();
      updatePinStyles();
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawGlobe, updatePinStyles, resize]);

  const focusLocation = useCallback(
    (index: number) => {
      const nextIndex = (index + locations.length) % locations.length;
      setActiveIndex(nextIndex);
      const target = (-locations[nextIndex].lon * Math.PI) / 180;

      let diff = target - (rotationRef.current % (Math.PI * 2));
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const start = rotationRef.current;
      const goal = rotationRef.current + diff;
      const duration = 700;
      const t0 = performance.now();
      autoSpeedRef.current = 0;

      function step(now: number) {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        rotationRef.current = start + (goal - start) * eased;
        if (t < 1) requestAnimationFrame(step);
        else setTimeout(() => (autoSpeedRef.current = 0.0016), 1500);
      }
      requestAnimationFrame(step);
    },
    [locations]
  );

  useEffect(() => {
    focusLocation(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    rotationRef.current += dx * 0.005;
    dragVelRef.current = dx * 0.0006;
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const headingLines = heading ? heading.split("\n") : [];

  return (
    <>
      <style>{STYLES}</style>
      <section className="globe-section">
        <div className="globe-container">
          {heading && (
            <h2 className="globe-heading">
              {headingLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
          )}

          <div className="globe-layout">
            <div className="globe-canvas-wrap" ref={wrapRef}>
              <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
              />
              {locations.map((loc, i) => (
                <div
                  key={loc.name}
                  className={`pin-label${
                    pinStyles[i]?.visible ? " visible" : ""
                  }${i === activeIndex ? " active" : ""}`}
                  style={{
                    left: pinStyles[i]?.left ?? 0,
                    top: pinStyles[i]?.top ?? 0,
                  }}
                >
                  {loc.name}
                </div>
              ))}
            </div>
          </div>

          <div className="globe-footer">
            <div className="globe-footer-top">
              <div className="stores-count">
                {storesLabel}
              </div>
              <div className="switcher">
                <button
                  aria-label="Previous location"
                  onClick={() => focusLocation(activeIndex - 1)}
                >
                  &#8249;
                </button>
                <div className="store-name">{locations[activeIndex]?.name}</div>
                <button
                  aria-label="Next location"
                  onClick={() => focusLocation(activeIndex + 1)}
                >
                  &#8250;
                </button>
              </div>
            </div>
            <div className="caption">{caption}</div>
          </div>
        </div>
      </section>
    </>
  );
}
