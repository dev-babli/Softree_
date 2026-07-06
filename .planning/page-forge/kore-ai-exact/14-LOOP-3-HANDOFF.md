# Loop 3 — Hero spacing & alignment fix

**Result:** 13/13 gates PASS · layout leftDelta 0px

## Fixes

1. **Opacity-only handoff stagger** — removed GSAP `y` offsets that broke vertical rhythm
2. **Stagger containers** not individual text nodes — `[data-stagger='300']`, `.k2-hero-2` as units
3. **Loader heading matches hero** — same `h1` variant for 1:1 FLIP typography
4. **No inline style pollution** — `finalizeHeroReveal()` clears GSAP props only; CSS locks visibility
5. **`kore-hero-handoff.css`** — surgical post-intro typography lock without `transform:none` on wrappers
6. **Artemis `--w` sync** — copied from loader sup to hero sup at FLIP swap
7. **New gate `hero_layout`** — pill → flip → h1 vertical order + left alignment

**Replay:** http://localhost:3000/kore-ai-component?replay-loader=1
