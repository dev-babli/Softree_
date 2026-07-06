# Loop error correction — hero background invisible

## Symptom

After hero text visibility fix, hero background image disappeared — page showed flat black behind copy.

## Root cause

`kore-ai-page-fix.css` set `.k2-bg { z-index: -1 }` to keep text above the image. Without an isolated stacking context on `#meet-artemis`, the negative z-index painted the background **behind** the black `.kore-ai-exact-shell`, so the WebP never showed.

Secondary: handoff used `opacity: unset` on `.k2-bg` during `kore-ai-k2-handoff-running`, and GSAP could leave inline `opacity: 0` on `.k2-bg` after the cinematic timeline.

## Fix (shipped)

| File | Change |
| --- | --- |
| `kore-ai-page-fix.css` | `#meet-artemis { isolation: isolate; overflow: hidden }`; `.k2-bg { z-index: 0 }`; `.k2-overlay { z-index: 1 }`; containers `{ z-index: 2 }`; force `opacity: 1` during handoff + intro-complete |
| `heroHandoffSelectors.ts` | `revealHeroContent()` clears inline styles on `.k2-bg`, `.k2-img`, `.k2-overlay` |
| `k2CinematicHandoff.ts` | `gsap.set(heroBgRoot, { clearProps: ... })` before finalize |
| `handoff-loop-verify.mjs` | New gate `hero_bg_visible` (opacity, size, src, z-index) |

## Verify gate (no full loop required)

```bash
# After handoff settles — checks bg node only
node -e "
const p=require('puppeteer');
(async()=>{
  const b=await p.launch({headless:true,args:['--no-sandbox']});
  const page=await b.newPage();
  await page.evaluateOnNewDocument(()=>localStorage.removeItem('k2LoaderPlayedAt'));
  await page.goto('http://localhost:3001/kore-ai-component?replay-loader=1',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('.kore-ai-exact-shell')?.classList.contains('kore-ai-intro-complete'),{timeout:25000});
  const r=await page.evaluate(()=>{
    const img=document.querySelector('#meet-artemis .k2-bg .k2-img');
    const bg=document.querySelector('#meet-artemis .k2-bg');
    if(!img||!bg) return {ok:false};
    const s=getComputedStyle(bg), i=getComputedStyle(img), rect=img.getBoundingClientRect();
    return {ok:Number(s.opacity)>=.85&&Number(i.opacity)>=.85&&rect.width>200&&rect.height>200,rect:{w:rect.width,h:rect.height},z:s.zIndex,op:s.opacity};
  });
  console.log(r); await b.close(); process.exit(r.ok?0:1);
})();
```

## Regression rule

Never use `z-index: -1` on `#meet-artemis .k2-bg` unless `#meet-artemis` has `isolation: isolate`. Prefer `z-index: 0` on bg + `z-index: 2` on copy containers.
