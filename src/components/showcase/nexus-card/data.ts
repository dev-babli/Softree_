export type NexusCardFace = {
  number: string;
  title: string;
  icon: "bolt" | "wave" | "dollar";
};

export type NexusSlide = {
  id: string;
  step: number | null;
  /** Phrase that gets the hand-drawn underline */
  highlight: string;
  /** Text before highlight (optional) */
  prefix?: string;
  /** Text after highlight */
  suffix: string;
  card?: NexusCardFace;
  variant?: "cards" | "phones";
};

export const NEXUS_SLIDES: NexusSlide[] = [
  {
    id: "setup",
    step: 1,
    prefix: "Set up your Card",
    highlight: "in minutes",
    suffix: "and add it to your Wallet",
    card: { number: "1", title: "Create quickly", icon: "bolt" },
    variant: "cards",
  },
  {
    id: "share",
    step: 2,
    highlight: "Share it",
    suffix:
      "in person or online, giving people context and an easy way to stay connected",
    card: { number: "2", title: "Share it", icon: "wave" },
    variant: "cards",
  },
  {
    id: "earn",
    step: 3,
    highlight: "Receive",
    suffix: "direct support through your Card and see how people interact with it",
    card: { number: "3", title: "Earn & Track Success", icon: "dollar" },
    variant: "cards",
  },
  {
    id: "cta",
    step: null,
    highlight: "Let your Card",
    suffix: "do the talking and open the door to support",
    variant: "phones",
  },
];

/** Muted blue-gray from follow.art ui-blue */
export const NEXUS_BG = "#8fa3b3";
