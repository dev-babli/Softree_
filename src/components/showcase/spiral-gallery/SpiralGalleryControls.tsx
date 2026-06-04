"use client";

import { FRAMER_DEFAULT_TUNING, type SpiralGalleryTuning, type SpiralLayoutMode } from "./tuning";

type Props = {
  tuning: SpiralGalleryTuning;
  onChange: (next: SpiralGalleryTuning) => void;
  onReset: () => void;
};

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[11px] text-white/75">
      <span>{label}</span>
      <span className="tabular-nums text-white/45">{value.toFixed(step < 0.01 ? 3 : step < 0.1 ? 2 : 1)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="col-span-2 h-1 w-full cursor-pointer accent-white"
      />
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

export default function SpiralGalleryControls({ tuning, onChange, onReset }: Props) {
  const set = <K extends keyof SpiralGalleryTuning>(key: K, value: SpiralGalleryTuning[K]) => {
    onChange({ ...tuning, [key]: value });
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(tuning, null, 2));
  };

  return (
    <aside className="pointer-events-auto absolute right-3 top-3 z-20 flex max-h-[calc(100%-24px)] w-[min(100%,280px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
        <p className="text-[11px] font-medium text-white/90">Spiral tuning</p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onReset}
            className="rounded-md px-2 py-1 text-[10px] text-white/55 hover:bg-white/10 hover:text-white"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="rounded-md px-2 py-1 text-[10px] text-white/55 hover:bg-white/10 hover:text-white"
          >
            Copy JSON
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto px-3 py-3">
        <Section title="Layout mode">
          <div className="flex gap-1">
            {(["helix", "rings"] as SpiralLayoutMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => set("layoutMode", mode)}
                className={`flex-1 rounded-md px-2 py-1.5 text-[10px] capitalize ${tuning.layoutMode === mode
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <p className="text-[10px] leading-relaxed text-white/35">
            Use <strong className="text-white/55">rings</strong> to kill the S-shape. Lower{" "}
            <strong className="text-white/55">revolutions</strong> on helix to reduce twist.
          </p>
        </Section>

        <Section title="Curve & gap">
          <SliderRow label="Revolutions (S-curve)" value={tuning.revolutions} min={0} max={3} step={0.05} onChange={(v) => set("revolutions", v)} />
          <SliderRow label="Spiral height" value={tuning.spiralHeight} min={8} max={50} step={0.5} onChange={(v) => set("spiralHeight", v)} />
          <SliderRow label="Vertical compression" value={tuning.verticalCompression} min={0.3} max={2} step={0.05} onChange={(v) => set("verticalCompression", v)} />
          <SliderRow label="Angular gap" value={tuning.angularGap} min={0.4} max={2} step={0.05} onChange={(v) => set("angularGap", v)} />
          <SliderRow label="Cylinder radius" value={tuning.radius} min={3} max={14} step={0.1} onChange={(v) => set("radius", v)} />
          <SliderRow label="Ring count" value={tuning.ringCount} min={1} max={6} step={1} onChange={(v) => set("ringCount", v)} />
          <SliderRow label="Ring stagger" value={tuning.ringStagger} min={0} max={6.28} step={0.05} onChange={(v) => set("ringStagger", v)} />
          <SliderRow label="Image count" value={tuning.imageCount} min={4} max={24} step={1} onChange={(v) => set("imageCount", v)} />
        </Section>

        <Section title="Card size">
          <SliderRow label="Card width" value={tuning.itemWidth} min={2} max={10} step={0.1} onChange={(v) => set("itemWidth", v)} />
          <SliderRow label="Card height" value={tuning.itemHeight} min={1.5} max={8} step={0.1} onChange={(v) => set("itemHeight", v)} />
          <SliderRow label="Corner radius" value={tuning.borderRadius} min={0} max={1} step={0.05} onChange={(v) => set("borderRadius", v)} />
          <SliderRow label="Scale min (back)" value={tuning.cardScaleMin} min={0.3} max={1.2} step={0.02} onChange={(v) => set("cardScaleMin", v)} />
          <SliderRow label="Scale max (front)" value={tuning.cardScaleMax} min={0.5} max={2} step={0.02} onChange={(v) => set("cardScaleMax", v)} />
        </Section>

        <Section title="Camera & depth (Z)">
          <SliderRow label="Camera distance" value={tuning.cameraDistance} min={10} max={40} step={0.5} onChange={(v) => set("cameraDistance", v)} />
          <SliderRow label="Camera FOV" value={tuning.cameraFov} min={30} max={90} step={1} onChange={(v) => set("cameraFov", v)} />
          <SliderRow label="Global Z offset" value={tuning.globalZOffset} min={-8} max={8} step={0.1} onChange={(v) => set("globalZOffset", v)} />
          <SliderRow label="Depth multiplier" value={tuning.depthMultiplier} min={0.2} max={2} step={0.05} onChange={(v) => set("depthMultiplier", v)} />
          <SliderRow label="Band threshold" value={tuning.bandThreshold} min={0.1} max={0.8} step={0.05} onChange={(v) => set("bandThreshold", v)} />
        </Section>

        <Section title="Top band">
          <SliderRow label="Top Z push" value={tuning.topZPush} min={-6} max={6} step={0.1} onChange={(v) => set("topZPush", v)} />
          <SliderRow label="Top scale" value={tuning.topScale} min={0.4} max={2} step={0.05} onChange={(v) => set("topScale", v)} />
          <SliderRow label="Top Y offset" value={tuning.topYOffset} min={-8} max={8} step={0.1} onChange={(v) => set("topYOffset", v)} />
        </Section>

        <Section title="Center band">
          <SliderRow label="Center Z push" value={tuning.centerZPush} min={-6} max={6} step={0.1} onChange={(v) => set("centerZPush", v)} />
          <SliderRow label="Center scale" value={tuning.centerScale} min={0.4} max={2} step={0.05} onChange={(v) => set("centerScale", v)} />
          <SliderRow label="Center Y offset" value={tuning.centerYOffset} min={-8} max={8} step={0.1} onChange={(v) => set("centerYOffset", v)} />
        </Section>

        <Section title="Bottom band">
          <SliderRow label="Bottom Z push" value={tuning.bottomZPush} min={-6} max={6} step={0.1} onChange={(v) => set("bottomZPush", v)} />
          <SliderRow label="Bottom scale" value={tuning.bottomScale} min={0.4} max={2} step={0.05} onChange={(v) => set("bottomScale", v)} />
          <SliderRow label="Bottom Y offset" value={tuning.bottomYOffset} min={-8} max={8} step={0.1} onChange={(v) => set("bottomYOffset", v)} />
        </Section>

        <Section title="Motion & vignette">
          <SliderRow label="Autoplay speed" value={tuning.autoPlaySpeed} min={0} max={0.002} step={0.00005} onChange={(v) => set("autoPlaySpeed", v)} />
          <SliderRow label="Edge fade" value={tuning.edgeFadeStrength} min={0} max={1} step={0.05} onChange={(v) => set("edgeFadeStrength", v)} />
        </Section>
      </div>
    </aside>
  );
}

export { FRAMER_DEFAULT_TUNING };
