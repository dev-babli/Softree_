"use client";

import type { NexusCardFace } from "./data";

function SquiggleIcon({ type }: { type: NexusCardFace["icon"] }) {
  if (type === "dollar") {
    return (
      <span className="nexus-card-face__dollar" aria-hidden>
        $
      </span>
    );
  }
  return (
    <svg className="nexus-card-face__squiggle" viewBox="0 0 64 40" fill="none" aria-hidden>
      <path
        d="M4 28C18 8 28 6 42 14c6 10 14 12 22 8-4 12-16 18-32 14S6 40 4 28Z"
        fill="#F15A24"
      />
      {type === "bolt" ? (
        <path
          d="M30 10 22 24h8l-6 14 16-20h-9l5-8Z"
          fill="#F15A24"
          opacity="0.9"
        />
      ) : null}
    </svg>
  );
}

function NexusCardFacePanel({ card }: { card: NexusCardFace }) {
  return (
    <div className="nexus-card-face">
      <div className="nexus-card-face__head">
        <p className="nexus-card-face__label">{card.title}</p>
        <span className="nexus-card-face__number">{card.number}</span>
      </div>
      <hr className="nexus-card-face__rule" />
      <SquiggleIcon type={card.icon} />
    </div>
  );
}

export function NexusCardStack({
  cards,
  activeIndex,
}: {
  cards: NexusCardFace[];
  activeIndex: number;
}) {
  return (
    <div className="nexus-card-stack" aria-hidden>
      {cards.map((card, i) => {
        const rel = i - activeIndex;
        if (rel < 0 || rel > 1) return null;
        if (rel === 1 && activeIndex === 0) return null;
        return (
          <div
            key={card.number}
            className="nexus-card-stack__item"
            data-rel={rel}
            style={{ zIndex: 10 - rel }}
          >
            <NexusCardFacePanel card={card} />
          </div>
        );
      })}
    </div>
  );
}

export function NexusPhoneFinale({ visible }: { visible: boolean }) {
  return (
    <div className={`nexus-phones${visible ? " nexus-phones--visible" : ""}`} aria-hidden>
      {/* Reference composite from follow.art finale frame */}
      <div className="nexus-phones__frame">
        <div className="nexus-phones__device nexus-phones__device--orange">
          <div className="nexus-phones__screen nexus-phones__screen--orange">
            <div className="nexus-phones__avatar nexus-phones__avatar--sm" />
            <p className="nexus-phones__name">Venus Nwaokoro</p>
            <p className="nexus-phones__meta">Phone · E-mail</p>
            <div className="nexus-phones__qr" />
          </div>
        </div>
        <div className="nexus-phones__device nexus-phones__device--profile">
          <div className="nexus-phones__screen nexus-phones__screen--profile">
            <div className="nexus-phones__floral" />
            <div className="nexus-phones__avatar" />
            <p className="nexus-phones__name">Venus Nwaokoro</p>
            <p className="nexus-phones__meta">Artist | CA, Ajax</p>
            <button type="button" className="nexus-phones__cta">
              Support Me
            </button>
            <button type="button" className="nexus-phones__cta nexus-phones__cta--ghost">
              Add to Apple Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
