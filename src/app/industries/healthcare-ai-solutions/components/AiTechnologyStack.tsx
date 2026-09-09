'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, useGSAP);

/**
 * detail-drawer
 * --------------
 * The full-bleed hero (image + headline) is the trigger. Clicking it slides
 * in a detail panel with a parallax-x + clip-path reveal, while the hero
 * image translates away, scales up, and darkens under an overlay.
 *
 * Panel content reveals starting halfway through the entrance: text blocks
 * wipe in via a per-line mask reveal (GSAP SplitText, mask: 'lines'), image
 * blocks simply fade in. Closing reverses the whole choreography by
 * scrubbing the same timeline backwards.
 */

export interface DrawerTextBlock {
  type: 'text';
  content: string;
  as?: 'p' | 'h2' | 'h3';
}
export interface DrawerImageBlock {
  type: 'image';
  src: string;
  alt?: string;
}
export type DrawerBlock = DrawerTextBlock | DrawerImageBlock;

export interface DetailDrawerProps {
  heroImage: string;
  heroImageAlt?: string;
  heroHeadline: string;
  panelTitle?: string;
  blocks: DrawerBlock[];
  /** panel width, any CSS length, default 'min(480px, 45vw)' */
  panelWidth?: string;
  className?: string;
}

export default function DetailDrawer({
  heroImage,
  heroImageAlt = '',
  heroHeadline,
  panelTitle,
  blocks,
  panelWidth = '50%',
  className = '',
}: DetailDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const blockEls = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const heroImg = heroImgRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const mask = maskRef.current;
      const statsLeft = rootRef.current?.querySelector('.cs_stats_left');
      const statsRight = rootRef.current?.querySelector('.cs_stats_right');
      if (!heroImg || !overlay || !panel || !mask) return;

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { xPercent: 100 });
      gsap.set(mask, { clipPath: 'inset(0 0% 0 32%)' });

      const splits: SplitText[] = [];
      const targets: (HTMLElement[] | HTMLElement)[] = [];

      blocks.forEach((block, i) => {
        const el = blockEls.current[i];
        if (!el) return;
        if (block.type === 'text') {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
          gsap.set(split.lines, { yPercent: 110 });
          splits.push(split);
          targets[i] = split.lines as HTMLElement[];
        } else {
          gsap.set(el, { autoAlpha: 0 });
          targets[i] = el;
        }
      });

      const tl = gsap.timeline({ paused: true, reversed: true });

      tl.to(overlay, { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to(panel, { xPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.05)
        .to(mask, { clipPath: 'inset(0 0% 0 0%)', duration: 0.9, ease: 'power3.out' }, 0.1)
        .to(heroImg, { x: () => -rootRef.current!.clientWidth * 0.25, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to([statsLeft, statsRight], { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, 0);

      const contentStart = 0.5; // reveal begins halfway through the entrance
      blocks.forEach((block, i) => {
        const target = targets[i];
        if (!target) return;
        const at = contentStart + i * 0.05;
        if (block.type === 'text') {
          tl.to(target, { yPercent: 0, duration: 0.6, stagger: 0.045, ease: 'power3.out' }, at);
        } else {
          tl.to(target, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, at);
        }
      });

      tlRef.current = tl;

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: rootRef, dependencies: [blocks] }
  );

  const open = useCallback(
    contextSafe(() => {
      tlRef.current?.play();
      setIsOpen(true);
    }),
    [contextSafe]
  );

  const close = useCallback(
    contextSafe(() => {
      tlRef.current?.reverse();
      setIsOpen(false);
    }),
    [contextSafe]
  );

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    triggerRef.current?.focus();
  }, [isOpen, close]);

  return (
    <div ref={rootRef} className={`anm-detail-drawer ${className}`} style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C94716',
        }}
      >
        {/* Faded Solid Noise/Grain Texture Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.22,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Left Side: Core capabilities checklist */}
        <div
          className="hidden lg:flex flex-col gap-4 text-left cs_stats_left"
          style={{
            position: 'absolute',
            left: '6%',
            zIndex: 2,
            maxWidth: '280px',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255, 255, 255, 0.70)' }}>
            Core AI Capabilities
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
              <span>Enterprise LLMOps Automation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
              <span>Multi-Agent Swarm Orchestration</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
              <span>Hybrid Vector Search (RAG)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
              <span>Secure Offshore AI Pods</span>
            </div>
          </div>
        </div>

        {/* Square Image Box (centered, floating, no inner card frames) */}
        <div
          ref={heroImgRef}
          aria-hidden={!heroImageAlt}
          role={heroImageAlt ? 'img' : undefined}
          aria-label={heroImageAlt || undefined}
          style={{
            position: 'relative',
            height: '80%',
            aspectRatio: '1 / 1',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 2,
          }}
        />

        {/* Right Side: Technical stack metrics */}
        <div
          className="hidden lg:flex flex-col gap-4 text-left cs_stats_right"
          style={{
            position: 'absolute',
            right: '6%',
            zIndex: 2,
            maxWidth: '280px',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255, 255, 255, 0.70)' }}>
            System Architecture
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', fontFamily: 'monospace', fontWeight: 600 }}>
            <div>
              <span style={{ opacity: 0.55 }}>[MODELS]</span> GPT-4o / Claude 3.5
            </div>
            <div>
              <span style={{ opacity: 0.55 }}>[INFRA]</span> Databricks on Azure
            </div>
            <div>
              <span style={{ opacity: 0.55 }}>[VECTOR]</span> Pinecone DB Nodes
            </div>
            <div>
              <span style={{ opacity: 0.55 }}>[MLOPS]</span> Kubernetes & Airflow
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            padding: '24px 32px',
            background: 'linear-gradient(to top, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.4) 60%, rgba(10,10,12,0) 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
            zIndex: 3,
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              textShadow: '0 1px 8px rgba(0,0,0,0.2)',
            }}
          >
            {heroHeadline}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '99px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            <span>Explore Stack</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* dimming overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 5,
        }}
      />

      {/* sliding panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={panelTitle || heroHeadline}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: panelWidth,
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 10,
        }}
      >
        {/* clip-path mask layer that reveals at a different rate than the
            panel's own slide-in, producing the parallax feel */}
        <div
          ref={maskRef}
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            background: '#fff',
            overflowY: 'auto',
            padding: '48px 40px',
          }}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close panel"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.15)',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            &#10005;
          </button>

          {panelTitle && (
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: '1.5rem', fontWeight: 500 }}>
              {panelTitle}
            </h2>
          )}

          {blocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => {
                blockEls.current[i] = el;
              }}
              style={{ marginBottom: 20 }}
            >
              {block.type === 'text' ? (
                (() => {
                  const Tag = block.as ?? 'p';
                  return (
                    <Tag style={{ margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                      {block.content}
                    </Tag>
                  );
                })()
              ) : (
                <img
                  src={block.src}
                  alt={block.alt ?? ''}
                  style={{ width: '100%', display: 'block', borderRadius: 4 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}