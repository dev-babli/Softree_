"use client";

import type { NexusCardFace } from "./data";

function CardIcon({ type }: { type: NexusCardFace["icon"] }) {
  if (type === "bolt") {
    return (
      <svg className="nexus-card-face__icon" viewBox="0 0 48 32" fill="none" aria-hidden>
        <path
          d="M8 24c8-14 14-20 22-22 2 6-1 10-6 12 8-2 12 2 14 10-10-4-18-2-24 0 6-6 10-12 12-18-8 6-12 14-18 18Z"
          fill="#FF5C2B"
          stroke="#FF5C2B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "wave") {
    return (
      <svg className="nexus-card-face__icon" viewBox="0 0 48 32" fill="none" aria-hidden>
        <path
          d="M6 18c6-8 12-10 18-8 4 8 10 10 18 6-2 8-10 12-20 10S8 26 6 18Z"
          fill="#FF5C2B"
        />
      </svg>
    );
  }
  return (
    <svg className="nexus-card-face__icon nexus-card-face__icon--dollar" viewBox="0 0 32 40" aria-hidden>
      <text x="2" y="32" fill="#FF5C2B" fontSize="32" fontFamily="Georgia, serif" fontWeight="700">
        $
      </text>
    </svg>
  );
}

function NexusCardFacePanel({ card, active }: { card: NexusCardFace; active: boolean }) {
  return (
    <div className={`nexus-card-face${active ? " nexus-card-face--active" : ""}`}>
      <div className="nexus-card-face__top">
        <p className="nexus-card-face__label">{card.title}</p>
        <span className="nexus-card-face__number">{card.number}</span>
      </div>
      <hr className="nexus-card-face__rule" />
      <CardIcon type={card.icon} />
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
      <div className="nexus-card-stack__scene">
        {cards.map((card, i) => {
          const offset = i - activeIndex;
          const isActive = i === activeIndex;
          return (
            <div
              key={card.number}
              className="nexus-card-stack__item"
              style={{
                ["--stack-offset" as string]: offset,
                ["--stack-abs" as string]: Math.abs(offset),
                zIndex: 10 - Math.abs(offset),
              }}
              data-active={isActive ? "true" : undefined}
            >
              <NexusCardFacePanel card={card} active={isActive} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NexusPhoneFinale({ visible }: { visible: boolean }) {
  return (
    <div className={`nexus-phones${visible ? " nexus-phones--visible" : ""}`} aria-hidden>
      <div className="nexus-phones__device nexus-phones__device--orange">
        <div className="nexus-phones__screen">
          <p className="nexus-phones__name">Venus Nwaokoro</p>
          <p className="nexus-phones__meta">Artist · CA, Ajax</p>
          <div className="nexus-phones__qr" />
          <p className="nexus-phones__tiny">Scan to connect</p>
        </div>
      </div>
      <div className="nexus-phones__device nexus-phones__device--dark">
        <div className="nexus-phones__screen nexus-phones__screen--profile">
          <div className="nexus-phones__avatar" />
          <p className="nexus-phones__name">Venus Nwaokoro</p>
          <p className="nexus-phones__meta">Artist | CA, Ajax</p>
          <button type="button" className="nexus-phones__pill">
            Support Me
          </button>
          <button type="button" className="nexus-phones__pill nexus-phones__pill--ghost">
            Add to Apple Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
