/** Portable Text block builders for Sanity storyBlockContent / blockContent seeding. */

export function ptKey() {
  return Math.random().toString(36).slice(2, 12);
}

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = {
  _type: "block";
  _key: string;
  style: string;
  children: Span[];
  markDefs?: unknown[];
  listItem?: "bullet" | "number";
  level?: number;
};

function span(text: string, marks: string[] = []): Span {
  return { _type: "span", _key: ptKey(), text, marks };
}

function block(
  style: string,
  children: Span[],
  options?: { listItem?: "bullet" | "number"; level?: number },
): Block {
  return {
    _type: "block",
    _key: ptKey(),
    style,
    children,
    markDefs: [],
    ...options,
  };
}

export function ptP(text: string): Block {
  return block("normal", [span(text)]);
}

export function ptH3(text: string): Block {
  return block("h3", [span(text)]);
}

export function ptQuote(text: string): Block {
  return block("blockquote", [span(text)]);
}

export function ptBullet(lead: string, rest: string): Block {
  return block("normal", [span(lead, ["strong"]), span(rest)], { listItem: "bullet", level: 1 });
}

export function ptStrongLead(lead: string, rest: string): Block {
  return block("normal", [span(lead, ["strong"]), span(rest)]);
}
