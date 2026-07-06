try { if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger); if (window.gsap && window.ScrollToPlugin) window.gsap.registerPlugin(window.ScrollToPlugin); } catch (e) {}
(function () {
            var isZooming = false;
            var originalScrollTo = window.scrollTo;

            window.addEventListener("resize", function () {
                isZooming = true;
                clearTimeout(window.__zoomTimer);
                window.__zoomTimer = setTimeout(function () {
                    isZooming = false;
                }, 300);
            });

            window.scrollTo = function () {
                if (isZooming) return;
                return originalScrollTo.apply(window, arguments);
            };
        })();

const html = document.documentElement, loader = html.querySelector(".loader"), chatBotElement = html.querySelector(".chatbot-element"); let lenis; const wait = e => new Promise(t => setTimeout(t, e)); async function handleLoader({ loaderEl: e = loader, htmlEl: t = document.documentElement, lenisInstance: r = void 0 !== lenis ? lenis : null, chatBotEl: a = void 0 !== chatBotElement ? chatBotElement : null, resumeLenis: i = !0, t0: n = 1, tLogo1: l = 700, tBetween: o = 700, tLogo2: s = 700, tHtmlAfter: c = 250, tBotDelay: d = 450 } = {}) { if (!e) return; "scrollRestoration" in history && (history.scrollRestoration = "manual"), window.scrollTo(0, 0); let u = !!r; u && r.stop?.(), t.classList.add("loading"); let g = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches; if (g) { t.classList.remove("loading"), t.classList.add("ready"), a?.classList.add("ready"), u && i && r.start?.(); return } await wait(n), e.classList.add("logo-1"), await wait(l), e.classList.remove("logo-1"), await wait(o), e.classList.add("logo-2"), await wait(s), e.classList.remove("logo-2"), await wait(c), t.classList.remove("loading"), t.classList.add("ready"), await wait(d), a?.classList.add("ready"), u && i && r.start?.(), setTimeout(() => { try { document.documentElement.style.overflow = "auto" } catch (t) { } try { document.body.style.overflow = "auto" } catch (r) { } try { document.documentElement.style.height = "" } catch (a) { } try { document.body.style.height = "" } catch (n) { } try { e && (e.style.pointerEvents = "none", e.style.display = "none", e.style.visibility = "hidden") } catch (l) { } try { "scrollRestoration" in history && (history.scrollRestoration = "auto") } catch (o) { } if (i && void 0 !== lenis && lenis) try { lenis.start?.() } catch (s) { } try { lenis?.resize?.() } catch (c) { } try { window.ScrollTrigger?.refresh?.(!0) } catch (d) { } try { window.dispatchEvent(new Event("resize")) } catch (u) { } }, 120) } function init() { handleLenis(), handleStagger(), handleGlobalAnimation(), initModal() } function initModal() { document.querySelectorAll("[data-modal-trigger]").forEach(e => { e.addEventListener("click", () => { let t = e.getAttribute("data-modal-trigger"); console.log(t), document.getElementById(t)?.classList.add("open"), lenis.stop() }) }); document.querySelectorAll("[data-modal-close]").forEach(e => { e.addEventListener("click", () => { let t = e.closest("dialog"); console.log(t), t.classList.remove("open"), lenis.start() }) }) } document.addEventListener("DOMContentLoaded", () => { let e = new Date().toISOString().slice(0, 10), t = window.location.hash.length > 0; !t && localStorage.getItem("loaderDate") !== e && loader ? (localStorage.setItem("loaderDate", e), handleLoader(), init()) : (loader?.remove(), html.classList.add("ready"), setTimeout(() => { chatBotElement?.classList.add("ready") }, 700), init()) }); let __lenisWrappers = [], __lenisRafId = null, __lenisInitialized = !1, __lenisVelocity = 0; const resizeLenisAndRefreshST = (() => { let e = !1; return () => { e || (e = !0, requestAnimationFrame(() => { lenis?.resize?.(); for (let t = 0, r = __lenisWrappers.length; t < r; t++)__lenisWrappers[t]?.resize?.(); window.ScrollTrigger?.refresh?.(!0), e = !1 })) } })(); window.resizeLenisAndRefreshST = resizeLenisAndRefreshST; const scheduleStableRefresh = (() => { let e = null, t = e => window.requestIdleCallback ? window.requestIdleCallback(e) : e(), r = () => { __lenisVelocity > .15 ? requestAnimationFrame(r) : t(resizeLenisAndRefreshST) }; return () => { e && clearTimeout(e), e = setTimeout(r, 120) } })(); document.querySelectorAll(".w-pagination-next").forEach(e => { e.addEventListener("click", () => { scheduleStableRefresh() }) }); const handleLenis = () => { if (__lenisInitialized || window.Webflow?.env?.("editor") !== void 0 || "function" != typeof window.Lenis) return; __lenisInitialized = !0; let e = document, t = window, r = t.ScrollTrigger; lenis = new t.Lenis, __lenisWrappers = []; let a = e.querySelectorAll("[data-lenis]"); for (let i = 0, n = a.length; i < n; i++) { let l = a[i], o = l.getAttribute("data-lenis"), s = "horizontal" === o || "x" === o, c = new t.Lenis({ wrapper: l, content: l, orientation: s ? "horizontal" : void 0, gestureOrientation: s ? "horizontal" : void 0 }); l._lenis = c, __lenisWrappers.push(c) } let d = 0, u = !1; if (lenis.on("scroll", t => { let { direction: r, velocity: a } = t || {}; __lenisVelocity = Math.abs(a || 0), r !== d && (d = r, e.documentElement.setAttribute("data-dir", r)), u = !0 }), r) { let g = e.documentElement; r.scrollerProxy(g, { scrollTop(e) { if (arguments.length) { lenis.scrollTo(e, { immediate: !0 }); return } return t.pageYOffset || 0 }, getBoundingClientRect: () => ({ top: 0, left: 0, width: t.innerWidth, height: t.innerHeight }), pinType: g.style.transform ? "transform" : "fixed" }); for (let h = 0, f = __lenisWrappers.length; h < f; h++) { let p = __lenisWrappers[h], m = p.options.wrapper; r.scrollerProxy(m, { scrollTop(e) { return arguments.length && p.scrollTo(e, { immediate: !0 }), m.scrollTop }, getBoundingClientRect() { let e = m.getBoundingClientRect(); return { top: 0, left: 0, width: e.width, height: e.height } }, pinType: m.style.transform ? "transform" : "fixed" }) } let y = e.querySelector("footer"), b = e.querySelector("main section:last-of-type") || e.querySelector("section:last-of-type"), $ = []; y && $.push(y), b && $.push(b); for (let A = 0; A < $.length; A++)r.create({ trigger: $[A], scroller: e.documentElement, start: "top bottom-=1", end: "bottom top+=1", onEnter: scheduleStableRefresh, onEnterBack: scheduleStableRefresh }); let S = () => t.requestIdleCallback ? t.requestIdleCallback(resizeLenisAndRefreshST) : resizeLenisAndRefreshST(); t.addEventListener("load", S, { once: !0 }), e.fonts?.ready && e.fonts.ready.then(S).catch(() => { }) } let v = e => { lenis?.raf(e); for (let r = 0, a = __lenisWrappers.length; r < a; r++)__lenisWrappers[r].raf(e); u && (window.ScrollTrigger?.update?.(), u = !1), __lenisRafId = t.requestAnimationFrame(v) }; __lenisRafId = t.requestAnimationFrame(v); let w = () => { e.hidden ? __lenisRafId && (t.cancelAnimationFrame(__lenisRafId), __lenisRafId = null) : __lenisRafId || (__lenisRafId = t.requestAnimationFrame(v), t.setTimeout(scheduleStableRefresh, 32)) }; e.addEventListener("visibilitychange", w, { passive: !0 }) }; function handleGlobalAnimation() { let e = { duration: 1.5, ease: "power4.out" }; function t(e, t, r) { e.forEach(e => { gsap.fromTo(e, t.from, { ...t.to, scrollTrigger: { trigger: e, ...r } }) }) } gsap.utils.toArray("[anim-scale]").forEach(e => { gsap.fromTo(e, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "expo.out", scrollTrigger: e }) }), function t() { let r = document.querySelectorAll("[anim-stagger]:not([modal] [anim-stagger])"); 0 !== r.length && r.forEach(t => { let r = t.getAttribute("anim-stagger"), a = t.querySelectorAll(r); 0 !== a.length && (gsap.set(a, { y: t.getAttribute("from-y") || "0.75rem", opacity: 0 }), ScrollTrigger.batch(a, { onEnter(r) { gsap.to(r, { autoAlpha: 1, duration: t.getAttribute("data-duration") || e.duration, y: "0rem", opacity: 1, stagger: { from: t.getAttribute("stagger-from") || "start", each: t.getAttribute("stagger-amount") || .2 }, ease: t.getAttribute("data-easing") || e.ease, scrollTrigger: { trigger: t, start: t.getAttribute("scrollTrigger-start") || "top 95%", markers: t.getAttribute("anim-markers") || !1 }, delay: t.getAttribute("data-delay") || .35, clearProps: "all" }) } })) }) }(), function r() { let a = document.querySelectorAll("[anim-element]:not([modal] [anim-element]), .anim-element:not([modal] .anim-element), .w-pagination-next:not([modal] .w-pagination-next)"); 0 !== a.length && a.forEach(r => { let a = { y: r.getAttribute("from-y") || "0.75rem", x: r.getAttribute("from-x") || 0, opacity: 0 }, i = { y: "0%", x: "0%", opacity: 1, duration: r.getAttribute("data-duration") || e.duration, ease: r.getAttribute("data-easing") || e.ease, delay: r.getAttribute("data-delay") || .35, clearProps: "all" }; t([r], { from: a, to: i }, { start: "top 95%" }) }) }(), function e() { if (window.innerWidth <= 768) return; let r = document.querySelectorAll("[parallax-element]"); 0 !== r.length && t(r, { from: { y: "-10%", scale: 1.1 }, to: { y: "10%", scale: 1.1 } }, { start: "top bottom", end: "bottom -50%", scrub: .2 }) }(), (() => { let e = document.querySelectorAll("[count-up]"); if (e.length) { e.forEach(e => { let t, r = e.textContent.trim().match(/^([\\$\\\u00a3\\\u20ac]?)(\\d+(?:\\.\\d+)?)(.*)$/); if (r) { let a = r[1], i = r[2], n = r[3]; e.innerHTML = `${a}<span number>${i}</span>${n}` } }); document.querySelectorAll("[count-up] [number]").forEach(e => { var t, r, a; let i = parseInt(e.innerHTML, 10), n = e.getAttribute("data-delay") || 0; e.innerHTML = "0", t = e, r = i, a = n, ScrollTrigger.create({ trigger: t, start: "top 80%", onEnter() { gsap.to({ count: 0 }, { count: r, delay: a ? parseFloat(a) : 0, duration: 2, ease: "expo.out", onUpdate: function () { t.innerText = Math.round(this.targets()[0].count) } }) }, once: !0 }) }) } })() } function handleStagger() { document.querySelector("[data-stagger]") && document.querySelectorAll("[data-stagger]").forEach(e => { let t = e.getAttribute("data-stagger"), r = e.hasAttribute("data-stagger-delay"), a = e.getAttribute("data-stagger-delay"), i = t && t > 1 ? Number(t) : 100, n; n = r ? a && "" !== a ? Number(a) : i : 0, Array.from(e.querySelectorAll("[data-anim]")).forEach(e => { n > 0 && (e.style.transitionDelay = n + "ms"), n += i }) }) } function loadScript(e, t) { return new Promise((r, a) => { let i = document.createElement("script"); i.src = e, i.onload = r, i.onerror = a, void 0 === t ? document.querySelector("body").appendChild(i) : document.querySelector(t) && document.querySelector("body").appendChild(i) }) } function copyPageLink() { let e = document.querySelectorAll("[link-copy-toltip-wrapper]"); 0 != e.length && e.forEach(e => { let t = e.querySelector("[copy-link-btn]"), r = e.querySelector("[link-copy-toltip]"); t.addEventListener("click", () => { let e = window.location.href, t = document.createElement("input"); t.value = e, document.body.appendChild(t), t.select(), t.setSelectionRange(0, 99999), document.execCommand("copy"), document.body.removeChild(t), r.classList.add("copied"), setTimeout(() => { r.classList.remove("copied") }, 2e3) }) }) } (() => { let e = document.querySelector("[nav]"); if (!e) return; let t = document.querySelector("[menu-btn]"); t.addEventListener("click", t => { t.stopPropagation(), e.classList.toggle("open"), e.classList.contains("open") ? lenis.stop() : lenis.start() }), document.addEventListener("click", r => { e.contains(r.target) || t.contains(r.target) || (e.classList.remove("open"), lenis.start()) }) })(), (() => { let e = document.querySelector(".nav-outer"); if (!e) return; let t = e.querySelectorAll("[nav-dropdown-toggle]"), r = e.querySelectorAll("[close-nav-dropdown]"), a = e.querySelectorAll("[nav-dropdown]"); function i() { return Array.from(a).some(e => e.classList.contains("open")) } function n() { a.forEach(e => e.classList.remove("open")), e.classList.remove("dropdown-open"), lenis.start() } a.length && e && (t.forEach(t => { t.addEventListener("click", () => { let r = t.closest("[nav-dropdown]"), a = r && r.classList.contains("open"); n(), r && !a && (r.classList.add("open"), e.classList.add("dropdown-open"), lenis.stop()) }) }), r.forEach(e => { e.addEventListener("click", n) }), document.addEventListener("click", e => { let t = e.target.closest("[nav-dropdown]"), r = e.target.closest("[nav-dropdown-toggle]"); !t && !r && i() && n() })) })(), loadScript("https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js", "[fs-cmsload-element]"), loadScript("https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js", "[fs-cmsfilter-element]"), loadScript("https://cdn.jsdelivr.net/npm/@finsweet/attributes-socialshare@1/socialshare.js", "[fs-socialshare-element]"), loadScript("https://cdn.jsdelivr.net/npm/@finsweet/attributes-richtext@1/richtext.js", "[fs-richtext-element]"), copyPageLink(), (() => { let e = document.querySelectorAll('a[href^="#"][data-scroll]'); e.length && e.forEach(e => { e.addEventListener("click", t => { let r = document.querySelector(e.getAttribute("data-scroll")); if (!r) return; t.preventDefault(); let a = 100, i = r.getBoundingClientRect().top + window.pageYOffset - a; window.scrollTo({ top: i, left: 0, behavior: "smooth" }) }) }) })(); let toggles = document.querySelectorAll(".toggle"); toggles.length > 0 && toggles.forEach(e => { e.addEventListener("click", () => { e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active") }) }); let btns = document.querySelectorAll(".button"), buttonAnimating = !1, btnHoverIN = e => { buttonAnimating = !0; gsap.timeline({ defaults: { ease: "easeOut" } }).to(e.querySelector(".btn_dot-line"), { duration: .15, x: "0" }).to(e.querySelector(".btn_dot-line"), { duration: .15, x: "0.5rem", delay: .25 }).to(e.querySelector(".btn_dot-line"), { duration: .2, opacity: 0 }).fromTo(e.querySelector(".btn-dot"), { opacity: 0 }, { duration: .25, opacity: 1, onComplete: function () { buttonAnimating = !1, gsap.set(e.querySelectorAll(".btn_dot-line , .btn-dot"), { duration: 0, clearProps: "all" }) } }, "<") }; function waitForSwiper(e, t = 6e3) { return new Promise((r, a) => { let i = performance.now(), n = () => { e && e.swiper ? r(e.swiper) : performance.now() - i > t ? a(Error("Timed out waiting for Swiper instance")) : requestAnimationFrame(n) }; n() }) } function wireSlider(e, t, { activeClass: r = "active" } = {}) { if (!e) return; let a = e.matches(".swiper") ? e : e.querySelector(".swiper"); if (!a) { console.warn("wireSlider: No .swiper container inside", e); return } let i = Array.from(e.querySelectorAll(t)); if (!i.length) { console.warn("wireSlider: No buttons found with", t, "inside", e); return } waitForSwiper(a).then(e => { let t = () => e.params?.loop ? e.realIndex : e.activeIndex, a = t => e.params?.loop ? e.slideToLoop(t) : e.slideTo(t), n = e => { i.forEach((t, a) => { let i = a === e; t.classList.toggle(r, i), t.setAttribute("aria-selected", i ? "true" : "false") }) }; i.forEach((e, t) => { if ("1" === e.dataset.wired) return; e.dataset.wired = "1"; let r = e.getAttribute("data-slide"), i = null === r || "" === r || Number.isNaN(+r) ? t : Math.max(0, +r); e.addEventListener("click", e => { e.preventDefault(), a(i), n(i) }) }), n(Math.min(t(), i.length - 1)), e.on("slideChange", () => n(Math.min(t(), i.length - 1))) }).catch(e => { console.warn("wireSlider error:", e) }) } function handleSwiper() { document.querySelector(".swiper .swiper-slide") && loadScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js").then(() => { document.querySelector("[swiper-slider]") && document.querySelectorAll("[swiper-slider]").forEach(e => { let t = e.querySelector(".swiper"), r = e.querySelector("[swiper-next-btn]"), a = e.querySelector("[swiper-prev-btn]"), i = (e, t) => { let r = parseInt(e, 10); return Number.isFinite(r) ? r : t }, n = i(e.getAttribute("data-space"), 24), l = i(e.getAttribute("data-space-mobile"), 10), o = e.hasAttribute("data-center"), s = e.hasAttribute("data-center-bounds"), c = e.hasAttribute("data-click-center"); function d(e) { a && (a.style.pointerEvents = e.isBeginning ? "none" : "auto", a.style.opacity = e.isBeginning ? "0.5" : "1", a.setAttribute("aria-disabled", String(e.isBeginning))), r && (r.style.pointerEvents = e.isEnd ? "none" : "auto", r.style.opacity = e.isEnd ? "0.5" : "1", r.setAttribute("aria-disabled", String(e.isEnd))) } new Swiper(t, { slidesPerView: "auto", spaceBetween: n, grabCursor: !0, speed: 700, centeredSlides: o, centeredSlidesBounds: s, slideToClickedSlide: o || c, watchOverflow: !0, navigation: { nextEl: r, prevEl: a }, breakpoints: { 0: { spaceBetween: l }, 768: { spaceBetween: n } }, on: { init() { d(this) }, slideChange() { d(this) }, reachBeginning() { d(this) }, reachEnd() { d(this) } } }) }) }).catch(e => { console.error("Error loading Swiper:", e) }) } function initTabs() { let e = document.querySelectorAll("[tabs-component]"); e.length && e.forEach((e, t) => { let r = e.querySelectorAll("[tabs-btn]"), a = e.querySelectorAll("[tabs-content]"); r.forEach((e, r) => { let i = `tab-${t}-${r}`, n = `panel-${t}-${r}`; e.setAttribute("role", "tab"), e.setAttribute("id", i), e.setAttribute("aria-controls", n), e.setAttribute("aria-selected", "false"), a[r] && (a[r].setAttribute("role", "tabpanel"), a[r].setAttribute("id", n), a[r].setAttribute("aria-labelledby", i), a[r].setAttribute("hidden", "")) }), r.length && a.length && (r[0].classList.add("active"), r[0].setAttribute("aria-selected", "true"), a[0].classList.add("active"), a[0].removeAttribute("hidden")), r.forEach((e, t) => { e.addEventListener("click", () => { r.forEach(e => { e.classList.remove("active"), e.setAttribute("aria-selected", "false") }), a.forEach(e => { e.classList.remove("active"), e.setAttribute("hidden", "") }), e.classList.add("active"), e.setAttribute("aria-selected", "true"), a[t] && (a[t].classList.add("active"), a[t].removeAttribute("hidden")) }) }) }) } function initAccordionCSS() { let e = document.querySelectorAll('[data-accordion-list="css"]'); if (!e.length) return; let t = 0, r = e => `${e}-${++t}`; e.forEach(e => { let t = "true" === e.getAttribute("data-accordion-close-siblings"), a = "true" === e.getAttribute("data-accordion-collapsible"), i = e.getAttribute("data-accordion-event") || "click", n = "true" === e.getAttribute("data-accordion-autoplay"), l = parseInt(e.getAttribute("data-accordion-duration"), 10) || 4e3, o = "true" === e.getAttribute("data-accordion-pause-on-hover"), s = e => { let t = e.getAttribute("data-accordion-pause-on-hover"); return "true" === t || "false" !== t && o }, c = Array.from(e.querySelectorAll("[data-accordion]")); e.setAttribute("role", "presentation"); let d = null, u = null, g = !1, h = !1, f = []; c.forEach(e => { let t = e.querySelector("[data-accordion-toggle]") || e.firstElementChild; if (!t) return; let a = e.querySelector("[data-accordion-panel]") || (t ? t.nextElementSibling : null); t.id || (t.id = r("acc-header")), a && !a.id && (a.id = r("acc-panel")), "BUTTON" !== t.tagName && (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0")), t.setAttribute("aria-controls", a ? a.id : ""), t.setAttribute("aria-expanded", "false"), a && (a.setAttribute("role", "region"), a.setAttribute("aria-labelledby", t.id), a.setAttribute("aria-hidden", "true"), a.hidden = !0); let i = e.querySelector("[data-accordion-progress-bar]"); i && (i.style.width = "0%", i.style.transition = "none"), f.push(t) }); let p = c[0]; function m() { return e.querySelector('[data-accordion="active"]') } function y() { d && (clearTimeout(d), d = null) } function b(t) { let r = t ? t.nextElementSibling : null; for (; r && !r.matches("[data-accordion]");)r = r.nextElementSibling; if (r) return r; let a = e.firstElementChild; for (; a && !a.matches("[data-accordion]");)a = a.nextElementSibling; return a || null } function $(e, t = l) { n && g && (y(), d = setTimeout(() => { let t = b(e || m()); t && w(t, !0) }, Math.max(0, t))) } function A(e, t, r = !1) { let a = e.querySelector("[data-accordion-progress-bar]"); a && (a._accState = null, a.style.transition = "none", a.style.width = "0%", a.offsetHeight, t && !r && (a.style.transition = `width ${l}ms linear`, a.style.width = "100%", a._accState = { start: performance.now(), duration: l, paused: !1, remaining: l })) } function S(e) { if (!n) return; let t = e && e.querySelector("[data-accordion-progress-bar]"); if (!t || !t._accState || t._accState.paused) return; y(); let r = t._accState, a = performance.now(), i = Math.max(0, a - r.start); r.remaining = Math.max(0, r.duration - i), function e(t) { let r = parseFloat(getComputedStyle(t).width) || 0, a = t.parentElement || t.offsetParent || t, i = a && a.clientWidth ? a.clientWidth : r || 1, n = Math.max(0, Math.min(100, r / i * 100)); return t.style.transition = "none", t.style.width = n + "%", t.offsetHeight, n }(t), r.paused = !0 } function v(e) { if (!n || !g) return; let t = e && e.querySelector("[data-accordion-progress-bar]"); if (!t || !t._accState) return; let r = t._accState; if (r.paused) { if (r.remaining <= 0) { t.style.transition = "none", t.style.width = "100%"; let a = b(e); a && w(a, !0); return } t.style.transition = `width ${r.remaining}ms linear`, t.offsetHeight, t.style.width = "100%", $(e, r.remaining), r.start = performance.now(), r.duration = r.remaining, r.paused = !1 } } function w(r, i, l = !1) { let o = r.querySelector("[data-accordion-toggle]") || r.firstElementChild, s = r.querySelector("[data-accordion-panel]") || (o ? o.nextElementSibling : null); if (!i && !a) { let d = e.querySelectorAll('[data-accordion="active"]').length; if (d <= 1) return } if (r.setAttribute("data-accordion", i ? "active" : "not-active"), o && o.setAttribute("aria-expanded", i ? "true" : "false"), s && (s.hidden = !i, s.setAttribute("aria-hidden", i ? "false" : "true")), i && t && c.forEach(e => { if (e !== r && "active" === e.getAttribute("data-accordion")) { let t = e.querySelector("[data-accordion-toggle]") || e.firstElementChild, a = e.querySelector("[data-accordion-panel]") || (t ? t.nextElementSibling : null); e.setAttribute("data-accordion", "not-active"), t && t.setAttribute("aria-expanded", "false"), a && (a.hidden = !0, a.setAttribute("aria-hidden", "true")), A(e, !1, !0) } }), i && (u = r), i ? (A(r, !0, !1), n && g && $(r)) : (A(r, !1, !0), n && y()), !l) { let h = new CustomEvent("accordion:toggle", { bubbles: !0, detail: { item: r, open: i } }); r.dispatchEvent(h) } } p && (t ? (c.forEach((e, t) => w(e, 0 === t, !0)), u = c[0]) : (w(p, !0, !0), u = p)), "hover" === i ? f.forEach(e => { let t = e.closest("[data-accordion]"); t && e.addEventListener("mouseenter", () => { y(), w(t, !0) }) }) : e.addEventListener("click", t => { let r = t.target.closest("[data-accordion-toggle]"); if (!r || !e.contains(r)) return; let a = r.closest("[data-accordion]"); if (!a) return; let i = "active" === a.getAttribute("data-accordion"); y(), w(a, !i) }), f.forEach((e, t) => { e.addEventListener("keydown", r => { let a = e.closest("[data-accordion]"); if (!a) return; let i = r.key; if ("Enter" === i || " " === i) { r.preventDefault(); let n = "active" === a.getAttribute("data-accordion"); y(), w(a, !n); return } if ("ArrowDown" === i || "ArrowUp" === i || "Home" === i || "End" === i) { r.preventDefault(); let l = t; "ArrowDown" === i && (l = (t + 1) % f.length), "ArrowUp" === i && (l = (t - 1 + f.length) % f.length), "Home" === i && (l = 0), "End" === i && (l = f.length - 1); let o = f[l]; o && o.focus() } }), "BUTTON" !== e.tagName && e.addEventListener("keyup", t => { " " === t.key && (t.preventDefault(), e.click()) }) }), c.forEach(e => { e.addEventListener("mouseenter", () => { s(e) && "active" === e.getAttribute("data-accordion") && S(e) }), e.addEventListener("mouseleave", () => { s(e) && "active" === e.getAttribute("data-accordion") && v(e) }) }); let E = () => { if (!n || !g) return; let e = m() || c[0]; if (!e) return; let t = e.querySelector("[data-accordion-progress-bar]"), r = t && t._accState && !t._accState.paused; r || (t && t._accState || A(e, !0, !1), v(e), d || $(e)) }, L = () => { if (!n) return; y(); let e = m(); e && S(e) }; if ("IntersectionObserver" in window) { let q = new IntersectionObserver(t => { t.forEach(t => { t.target === e && ((g = t.isIntersecting && t.intersectionRatio > 0) ? (h = !0, E()) : L()) }) }, { root: null, threshold: .1 }); q.observe(e) } else if (g = !0, h = !0, n) { let _ = m() || c[0]; _ && (A(_, !0, !1), $(_)) } c.forEach(e => { let t = "active" === e.getAttribute("data-accordion"); A(e, !1, !0), w(e, t, !0), t && (u = e) }) }) } function initAccordionImages() { document.querySelector("[data-accordion-imgs]") && document.querySelectorAll("[data-accordion-imgs]").forEach(e => { let t = e.querySelectorAll('[data-accordion-list="css"] [data-accordion]'), r = e.querySelectorAll("[data-accordion-img]"); if (!t.length || !r.length) return; let a = e => { r.forEach((t, r) => t.setAttribute("data-accordion-img", r === e ? "active" : "not-active")) }; (() => { let e = Array.from(t).findIndex(e => "active" === e.getAttribute("data-accordion")); e >= 0 && a(e) })(), t.forEach((e, t) => { e.addEventListener("accordion:toggle", e => { e.detail.open && a(t) }) }) }) } btns.forEach(e => { e.addEventListener("mouseenter", () => { buttonAnimating || btnHoverIN(e) }) }), document.querySelectorAll("[tabs-btns-slider]").forEach(e => { wireSlider(e, "[tab-btn-slider]", { activeClass: "active" }) }), handleSwiper(), setTimeout(() => { initTabs(), initAccordionCSS(), initAccordionImages() }, 700);

///// Flip /////
        const k2Flip = name => {
            const key = CSS.escape(name);
            const fromEl = document.querySelector(`[data-flip="${key}"]`);
            const toEl = document.querySelector(`[data-flip-target="${key}"]`);

            if (!fromEl || !toEl) return Promise.resolve();

            const from = fromEl.getBoundingClientRect();
            const to = toEl.getBoundingClientRect();

            const dx = from.left - to.left;
            const dy = from.top - to.top;
            const scale = from.width / to.width;

            const clone = toEl.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");

            Object.assign(clone.style, {
                position: "fixed",
                left: `${to.left}px`,
                top: `${to.top}px`,
                width: `${to.width}px`,
                margin: "0",
                zIndex: "9999",
                pointerEvents: "none",
                transformOrigin: "top left",
            });

            document.body.appendChild(clone);

            fromEl.style.visibility = "hidden";
            toEl.style.visibility = "hidden";

            const anim = clone.animate(
                [
                    { transform: `translate3d(${dx}px,${dy}px,0) scale(${scale})` },
                    { transform: "translate3d(0,0,0) scale(1)" },
                ],
                {
                    duration: 1500,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "forwards",
                }
            );

            return anim.finished.then(() => {
                toEl.style.visibility = "visible";
                clone.remove();
            });
        };

        ///// Loader /////
        const k2Loader = (onDone = () => { }) => {
            const loader = document.querySelector(".k2-loader");

            if (!loader) {
                onDone();
                return;
            }

            const key = "k2LoaderPlayedAt";
            const now = Date.now();
            const last = Number(localStorage.getItem(key)) || 0;
            const hour = 60 * 60 * 1000;

            if (now - last < hour) {
                loader.remove();
                onDone();
                return;
            }

            localStorage.setItem(key, now);

            if ("scrollRestoration" in history) history.scrollRestoration = "manual";
            lenis?.stop?.();

            const sup = loader.querySelector("sup");
            const flipEl = loader.querySelector("[data-flip]");

            const setWidth = () => {
                if (!sup) return;

                const target = sup.firstElementChild || sup;
                const width = Math.ceil(target.getBoundingClientRect().width);

                sup.style.setProperty("--w", `${width}px`);
            };

            const done = () => {
                const finish = () => {
                    window.removeEventListener("resize", setWidth);
                    loader.remove();
                    lenis?.start?.();
                };

                if (flipEl) {
                    k2Flip(flipEl.dataset.flip).then(finish);
                } else {
                    finish();
                }
            };

            let step = 0;
            const firstOverlap = 500;

            const runStep = () => {
                const prev = new Set(loader.getAnimations({ subtree: true }));

                loader.classList.add(`step-${step}`);

                if (step === 3) {
                    requestAnimationFrame(onDone);
                    requestAnimationFrame(done);
                    return;
                }

                requestAnimationFrame(() => {
                    const animations = loader
                        .getAnimations({ subtree: true })
                        .filter(anim => !prev.has(anim));

                    if (!animations.length) {
                        done();
                        return;
                    }

                    const end = Math.max(
                        ...animations.map(anim => anim.effect.getComputedTiming().endTime)
                    );

                    const overlap = step === 0 ? firstOverlap : 0;

                    setTimeout(() => {
                        step++;
                        runStep();
                    }, Math.max(0, end - overlap));
                });
            };

            const start = () => {
                setTimeout(() => window.scrollTo(0, 0), 200);
                setWidth();
                window.addEventListener("resize", setWidth);
                runStep();
            };

            window.addEventListener("load", start);
        };

        ///// CSS Units /////
        const k2Px = (value) => `${Math.round(value * 100) / 100}px`;

        ///// Media Queries /////
        const k2Media = (query, init) => {
            if (
                typeof query !== "string" ||
                typeof init !== "function" ||
                typeof matchMedia === "undefined"
            ) {
                return () => { };
            }

            const mq = matchMedia(query);
            let destroy = () => { };

            const update = () => {
                destroy();
                destroy = () => { };

                if (mq.matches) {
                    const nextDestroy = init();
                    if (typeof nextDestroy === "function") destroy = nextDestroy;
                }
            };

            mq.addEventListener("change", update);
            update();

            return () => {
                destroy();
                mq.removeEventListener("change", update);
            };
        };

        ///// Group Children /////
        const k2GroupChildren = () => {
            const roots = document.querySelectorAll("[data-group-children]");
            if (!roots.length) return;

            for (const root of roots) {
                const rawSize = parseInt(root.dataset.groupChildren, 10);
                const size = rawSize > 0 ? rawSize : 2;
                const kids = [...root.children];

                for (let i = 0; i < kids.length; i += size) {
                    const group = document.createElement("div");
                    root.insertBefore(group, kids[i]);
                    kids.slice(i, i + size).forEach(el => group.append(el));
                }
            }
        };

        ///// Scramble /////
        const k2Scrambles = new WeakMap();

        const k2Scramble = (el) => {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const skip = " {}";
            const duration = 450;
            const final = el.dataset.scrambleText || el.textContent.trim();
            const letters = [...final];

            el.dataset.scrambleText = final;

            const prev = k2Scrambles.get(el);
            if (prev) cancelAnimationFrame(prev);

            const start = performance.now();

            const tick = (time) => {
                const p = Math.min((time - start) / duration, 1);
                const done = Math.floor(p * letters.length);

                el.textContent = letters
                    .map((char, i) => {
                        if (skip.includes(char)) return char;
                        return i < done ? char : chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                if (p < 1) {
                    k2Scrambles.set(el, requestAnimationFrame(tick));
                } else {
                    el.textContent = final;
                    k2Scrambles.delete(el);
                }
            };

            k2Scrambles.set(el, requestAnimationFrame(tick));
        };

        ///// Scroll Nav /////
        const k2ScrollNav = () => k2Media("(min-width: 992px)", () => {
            const nav = document.querySelector(".k2-scroll-nav");
            const sections = document.querySelectorAll(".k2-main .k2-section[id]");

            if (nav && sections.length) {
                const ol = document.createElement("ol");

                for (const section of sections) {
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    a.href = `#${section.id}`;
                    a.setAttribute("aria-label", section.id.replaceAll("-", " "));

                    li.append(a);
                    ol.append(li);
                }

                nav.append(ol);
            }
        });

        ///// Tabs /////
        const k2Tabs = () => {
            const roots = document.querySelectorAll(".k2-tabs");
            if (!roots.length) return;

            const groups = [];
            const usedGroups = new Map();

            const cleanId = (value, fallback) => {
                const id = (value || "").trim().replace(/^#/, "").replace(/\\s+/g, "-");
                return id || fallback;
            };

            const getHash = () => {
                const hash = window.location.hash.slice(1);
                if (!hash) return "";

                try {
                    return decodeURIComponent(hash);
                } catch {
                    return hash;
                }
            };

            const getSlotChildren = (el) => {
                const slot = [...el.children].find((child) => child.hasAttribute("data-slot"));
                return [...(slot || el).children];
            };

            roots.forEach((root, gi) => {
                if (root.dataset.k2Init) return;

                const own = (selector) =>
                    [...root.querySelectorAll(selector)].find(
                        (el) => el.closest(".k2-tabs") === root
                    );

                const menu = own(".k2-tabs-menu");
                const panelsWrap = own(".k2-tabs-panels");
                if (!menu || !panelsWrap) return;

                const rawTabs = getSlotChildren(menu);
                const rawPanels = getSlotChildren(panelsWrap);
                const n = Math.min(rawTabs.length, rawPanels.length);

                if (!n) {
                    root.dataset.k2Init = "true";
                    rawTabs.forEach((tab) => (tab.hidden = true));
                    rawPanels.forEach((panel) => (panel.hidden = true));
                    return;
                }

                root.dataset.k2Init = "true";

                const tabs = rawTabs.slice(0, n);
                const panels = rawPanels.slice(0, n);

                rawTabs.slice(n).forEach((tab) => (tab.hidden = true));
                rawPanels.slice(n).forEach((panel) => (panel.hidden = true));

                const groupKey = cleanId(root.getAttribute("data-tabs-id"), `tabs-${gi + 1}`);
                const groupCount = (usedGroups.get(groupKey) || 0) + 1;
                usedGroups.set(groupKey, groupCount);

                const groupId = groupCount > 1 ? `${groupKey}-${groupCount}` : groupKey;
                const usedTabs = new Map();

                menu.setAttribute("role", "tablist");

                tabs.forEach((tab, i) => {
                    const panel = panels[i];
                    const tabKey = cleanId(tab.getAttribute("data-tab-id"), `tab-${i + 1}`);
                    const baseTabId = tabKey.startsWith(`${groupId}-`) ? tabKey : `${groupId}-${tabKey}`;
                    const tabCount = (usedTabs.get(baseTabId) || 0) + 1;
                    usedTabs.set(baseTabId, tabCount);

                    const tabId = tabCount > 1 ? `${baseTabId}-${tabCount}` : baseTabId;

                    tab.id = tabId;
                    panel.id = `${tabId}-panel`;

                    tab.setAttribute("role", "tab");
                    tab.setAttribute("aria-controls", panel.id);

                    panel.setAttribute("role", "tabpanel");
                    panel.setAttribute("aria-labelledby", tab.id);
                });

                groups.push({ root, menu, tabs, panels, n });
            });

            groups.forEach((group) => {
                const { root, menu, tabs, panels, n } = group;

                let active = tabs.findIndex(
                    (tab, i) => tab.classList.contains("on") || panels[i].classList.contains("on")
                );
                if (active < 0) active = 0;

                const getHashIndex = () => {
                    const id = getHash();
                    if (!id) return -1;

                    const directIndex = tabs.findIndex(
                        (tab, i) => tab.id === id || panels[i].id === id
                    );
                    if (directIndex >= 0) return directIndex;

                    const target = document.getElementById(id);
                    if (!target) return -1;

                    return panels.findIndex((panel) => panel.contains(target));
                };

                const hashIndex = getHashIndex();
                if (hashIndex >= 0) active = hashIndex;

                const scrambleTab = (tab) => {
                    const el = tab.querySelector("[data-scramble]");
                    if (el && typeof k2Scramble === "function") k2Scramble(el);
                };

                const setProgress = (i, p) => {
                    tabs[i].style.setProperty("--p", p.toFixed(3));
                };

                const resetProgress = () => {
                    tabs.forEach((tab) => tab.style.setProperty("--p", 0));
                };

                const scrollMenuToTab = (tab, smooth = true) => {
                    if (menu.scrollWidth <= menu.clientWidth || !menu.clientWidth) return;

                    const menuBox = menu.getBoundingClientRect();
                    const tabBox = tab.getBoundingClientRect();
                    const left =
                        menu.scrollLeft +
                        tabBox.left -
                        menuBox.left -
                        (menuBox.width - tabBox.width) / 2;

                    menu.scrollTo({
                        left,
                        behavior: smooth ? "smooth" : "auto",
                    });
                };

                const scrollRootToTop = (smooth = true) => {
                    const offset = -100;

                    if (window.lenis) {
                        window.lenis.scrollTo(root, {
                            offset,
                            immediate: !smooth,
                        });
                    } else {
                        const top = Math.max(0, window.scrollY + root.getBoundingClientRect().top + offset);

                        window.scrollTo({
                            top,
                            behavior: smooth ? "smooth" : "auto",
                        });
                    }
                };

                const setActive = (
                    i,
                    { focus = false, scramble = true, scroll = true, smooth = true } = {}
                ) => {
                    resetProgress();

                    for (let k = 0; k < n; k++) {
                        const on = k === i;

                        tabs[k].classList.toggle("on", on);
                        tabs[k].setAttribute("aria-selected", String(on));
                        tabs[k].tabIndex = on ? 0 : -1;

                        panels[k].classList.toggle("on", on);
                        panels[k].toggleAttribute("inert", !on);
                    }

                    active = i;

                    if (scramble) scrambleTab(tabs[i]);
                    if (focus) tabs[i].focus();
                    if (scroll) requestAnimationFrame(() => scrollMenuToTab(tabs[i], smooth));

                    requestAnimationFrame(() => {
                        groups.forEach((group) => group.syncAutoplay?.());
                    });
                };

                setActive(active, {
                    scramble: false,
                    smooth: false,
                });

                if (hashIndex >= 0) {
                    requestAnimationFrame(() => {
                        root.scrollIntoView({ block: "start" });
                    });
                }

                let autoplayFrame;
                let autoplayTimer;
                let autoplayStart = 0;
                let autoplayElapsed = 0;
                let autoplayPaused = true;
                let autoplayStopped = false;
                let autoplayInView = false;
                let autoplayHeld = false;

                const delayAttr = parseFloat(root.getAttribute("data-autoplay"));
                const delay = Number.isFinite(delayAttr) && delayAttr > 0 ? delayAttr : 10000;

                const canAutoplay =
                    root.hasAttribute("data-autoplay") &&
                    n > 1 &&
                    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                const getObserveTarget = () => {
                    let target = root;
                    let parent = root.parentElement?.closest(".k2-tabs");

                    while (parent) {
                        target = parent;
                        parent = parent.parentElement?.closest(".k2-tabs");
                    }

                    return target;
                };

                const pauseAutoplay = (reset = false) => {
                    if (!autoplayPaused) autoplayElapsed = performance.now() - autoplayStart;

                    autoplayPaused = true;
                    root.classList.remove("playing");
                    cancelAnimationFrame(autoplayFrame);

                    if (reset) {
                        autoplayElapsed = 0;
                        resetProgress();
                    }
                };

                const stopAutoplay = () => {
                    autoplayStopped = true;
                    clearTimeout(autoplayTimer);
                    pauseAutoplay(true);
                };

                const shouldAutoplay = () => {
                    return autoplayInView && !autoplayHeld && !root.closest("[inert]");
                };

                const updateAutoplay = (time) => {
                    if (autoplayPaused || autoplayStopped) return;

                    if (!shouldAutoplay()) {
                        pauseAutoplay();
                        return;
                    }

                    const p = Math.min((time - autoplayStart) / delay, 1);
                    setProgress(active, p);

                    if (p >= 1) {
                        setActive((active + 1) % n);
                        autoplayElapsed = 0;
                        autoplayStart = time;
                    }

                    autoplayFrame = requestAnimationFrame(updateAutoplay);
                };

                const playAutoplay = () => {
                    if (autoplayStopped || !autoplayPaused) return;

                    autoplayPaused = false;
                    autoplayStart = performance.now() - autoplayElapsed;
                    root.classList.add("playing");

                    autoplayFrame = requestAnimationFrame(updateAutoplay);
                };

                const syncAutoplay = () => {
                    if (shouldAutoplay()) playAutoplay();
                    else pauseAutoplay();
                };

                group.syncAutoplay = syncAutoplay;

                const resumeAutoplayAfterIdle = () => {
                    if (!canAutoplay) return;

                    clearTimeout(autoplayTimer);
                    pauseAutoplay();

                    autoplayTimer = setTimeout(() => {
                        autoplayHeld = false;

                        if (autoplayInView && !autoplayStopped && !root.closest("[inert]")) {
                            playAutoplay();
                        }
                    }, 4000);
                };

                group.handleHash = () => {
                    const i = getHashIndex();
                    if (i < 0) return;

                    stopAutoplay();

                    if (i !== active) {
                        setActive(i, { scramble: false });
                    } else {
                        scrollMenuToTab(tabs[i]);
                    }
                };

                tabs.forEach((tab, i) => {
                    tab.addEventListener("click", (e) => {
                        e.preventDefault();

                        const sameTab = i === active;

                        resumeAutoplayAfterIdle();

                        if (sameTab) return;

                        setActive(i);
                        requestAnimationFrame(() => scrollRootToTop());
                        autoplayElapsed = 0;
                    });

                    tab.addEventListener("keydown", (e) => {
                        let t = null;

                        if (e.key === "ArrowRight") t = (active + 1) % n;
                        else if (e.key === "ArrowLeft") t = (active - 1 + n) % n;
                        else if (e.key === "Home") t = 0;
                        else if (e.key === "End") t = n - 1;

                        if (t !== null) {
                            e.preventDefault();

                            if (t === active) return;

                            clearTimeout(autoplayTimer);
                            pauseAutoplay();
                            setActive(t, { focus: true });
                            autoplayElapsed = 0;
                        }
                    });
                });

                if (canAutoplay) {
                    const startAt = 0.25;
                    const stopAt = 0.05;
                    const observeTarget = getObserveTarget();

                    resetProgress();

                    root.addEventListener("focusin", () => {
                        autoplayHeld = true;
                        syncAutoplay();
                    });

                    root.addEventListener("focusout", () => {
                        requestAnimationFrame(() => {
                            if (!root.contains(document.activeElement)) {
                                autoplayHeld = false;
                                syncAutoplay();
                            }
                        });
                    });

                    const observer = new IntersectionObserver(
                        ([entry]) => {
                            const ratio = entry.intersectionRatio;
                            const leavingTop = entry.boundingClientRect.top < 0;

                            if (leavingTop && ratio <= stopAt) autoplayInView = false;
                            else autoplayInView = ratio >= startAt;

                            syncAutoplay();
                        },
                        {
                            threshold: [0, startAt, stopAt, 1],
                        }
                    );

                    observer.observe(observeTarget);
                }
            });

            if (groups.length) {
                window.addEventListener("hashchange", () => {
                    groups.forEach((group) => group.handleHash());
                });
            }
        };

        ///// Split Type /////
        const k2Split = () => {
            const setSplitIndex = (splitInstance, byParent) => {
                if (splitInstance.lines?.length) {
                    splitInstance.lines.forEach((line, i) => {
                        line.style.setProperty("--i", i);
                    });
                }

                if (splitInstance.chars?.length) {
                    let parent;
                    let parentIndex = 0;

                    splitInstance.chars.forEach((char, i) => {
                        if (byParent) {
                            if (char.parentElement !== parent) {
                                parent = char.parentElement;
                                parentIndex = 0;
                            }

                            char.style.setProperty("--i", parentIndex);
                            parentIndex++;
                        } else {
                            char.style.setProperty("--i", i);
                        }
                    });
                }
            };

            const setSplitCount = el => {
                el.style.setProperty("--n", el.querySelectorAll(".char").length);
            };

            const init = () => {
                const els = document.querySelectorAll("[data-split]");
                if (!els.length || typeof SplitType !== "function") return;

                for (const el of els) {
                    const splitType = (el.dataset.split || "lines").trim();
                    const hasChars = /char/i.test(splitType);
                    const targets = el.classList.contains("w-richtext") ? el.children : [el];

                    for (const target of targets) {
                        if (!target.textContent.trim()) continue;

                        const byParent = [...el.attributes, ...target.attributes].some(attr =>
                            attr.name.startsWith("data-flip")
                        );

                        const splitInstance = new SplitType(target, {
                            types: splitType,
                            tagName: "span",
                        });

                        setSplitIndex(splitInstance, byParent);

                        if (hasChars && !byParent) {
                            setSplitCount(el);
                        }

                        if (!/line/i.test(splitType)) continue;

                        let width = target.clientWidth;
                        let scheduled = false;

                        new ResizeObserver(([entry]) => {
                            const w = entry.contentRect.width;
                            if (w === width) return;

                            width = w;
                            if (scheduled) return;

                            scheduled = true;

                            requestAnimationFrame(() => {
                                splitInstance.split();
                                setSplitIndex(splitInstance, byParent);

                                if (hasChars && !byParent) {
                                    setSplitCount(el);
                                }

                                scheduled = false;
                            });
                        }).observe(target);
                    }
                }
            };

            if (document.fonts) {
                document.fonts.ready.then(init);
            } else {
                init();
            }
        };

        ///// Cards /////
        const k2Cards = () => k2Media("(min-width: 992px)", () => {
            const groups = [...document.querySelectorAll(".k2-cards")];
            if (!groups.length) return () => { };

            let raf = 0;

            const update = () => {
                raf = 0;

                for (const group of groups) {
                    const section = group.closest(".k2-section-cards") || group;
                    const cards = [...group.querySelectorAll(".k2-card-item")];
                    const firstCard = cards[0];

                    section.style.setProperty("--n", cards.length || 1);

                    if (firstCard) {
                        const box = firstCard.querySelector(".k2-card");
                        const copy = firstCard.querySelector(".k2-card-copy");

                        section.style.setProperty("--h", k2Px(firstCard.getBoundingClientRect().height));

                        if (box && copy) {
                            const copyTop =
                                copy.getBoundingClientRect().top - box.getBoundingClientRect().top;

                            section.style.setProperty("--copy-top", k2Px(copyTop));
                        }
                    }

                    cards.forEach((card, i) => {
                        card.style.setProperty("--i", i);
                    });
                }
            };

            const request = () => {
                if (!raf) raf = requestAnimationFrame(update);
            };

            const ro = new ResizeObserver(request);

            for (const group of groups) {
                ro.observe(group);

                const cards = group.querySelectorAll(".k2-card-item");

                for (const card of cards) {
                    ro.observe(card);
                }

                const firstCard = cards[0];

                if (firstCard) {
                    const box = firstCard.querySelector(".k2-card");
                    const copy = firstCard.querySelector(".k2-card-copy");

                    if (box) ro.observe(box);
                    if (copy) ro.observe(copy);
                }
            }

            window.addEventListener("resize", request);
            window.addEventListener("load", request, { once: true });

            request();

            return () => {
                ro.disconnect();
                window.removeEventListener("resize", request);
                window.removeEventListener("load", request);
                if (raf) cancelAnimationFrame(raf);
            };
        });

        ///// Scroll Progress /////
        const k2ScrollProgress = () => {
            const els = [...document.querySelectorAll("[data-scroll-progress]")];
            if (!els.length) return () => { };

            let wh = innerHeight,
                ticking = false;

            const active = new Set();

            const getOffset = (value) => {
                if (!value) return 0;

                const str = value.trim().toLowerCase();
                const n = parseFloat(str);

                if (Number.isNaN(n)) return 0;
                if (str.endsWith("vh")) return (n / 100) * wh;
                if (str.endsWith("px")) return n;

                return 0;
            };

            const update = () => {
                for (const el of active) {
                    const r = el.getBoundingClientRect();
                    const h = r.height || 1;
                    const mult = parseFloat(el.dataset.scrollProgress) || 1;
                    const off = wh * 0.25 * mult;
                    const end = getOffset(el.dataset.scrollEnd);
                    const targetH = Math.max(1, h - end);

                    let p = (wh - r.top - off) / targetH;

                    if (p < 0) p = 0;
                    else if (p > 1) p = 1;

                    el.style.setProperty("--p", p.toFixed(4));
                }

                ticking = false;
            };

            const request = () => {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(update);
                }
            };

            const onResize = () => {
                wh = innerHeight;
                request();
            };

            const io = new IntersectionObserver(
                (es) => {
                    for (const e of es)
                        e.isIntersecting ? active.add(e.target) : active.delete(e.target);
                    request();
                },
                { rootMargin: "200px 0px", threshold: 0 }
            );

            for (const el of els) io.observe(el);

            addEventListener("scroll", request, { passive: true });
            addEventListener("resize", onResize, { passive: true });
            request();

            return () => {
                io.disconnect();
                removeEventListener("scroll", request);
                removeEventListener("resize", onResize);
            };
        };

        ///// Scroll /////
        const k2Scroll = () => {
            const items = document.querySelectorAll("[data-scroll]");
            if (!items.length) return () => { };

            const data = new WeakMap();
            const thresholds = new Set([0]);

            for (const el of items) {
                const value = parseFloat(el.getAttribute("data-scroll"));
                const offset = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 1;
                const minRatio = Math.min(offset / 100, 0.999);
                const selector = el.getAttribute("data-scroll-target");
                let target = el;

                if (selector) {
                    try {
                        target = document.querySelector(selector) || el;
                    } catch {
                        target = el;
                    }
                }

                data.set(el, {
                    minRatio,
                    target,
                    repeat: el.hasAttribute("data-scroll-repeat"),
                });

                thresholds.add(minRatio);
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        const item = data.get(entry.target);
                        if (!item) continue;

                        const isVisible =
                            entry.isIntersecting && entry.intersectionRatio >= item.minRatio;

                        if (isVisible) {
                            item.target.classList.add("on");
                            if (!item.repeat) observer.unobserve(entry.target);
                        } else if (item.repeat) {
                            item.target.classList.remove("on");
                        }
                    }
                },
                {
                    threshold: [...thresholds].sort((a, b) => a - b),
                }
            );

            for (const el of items) observer.observe(el);

            return () => observer.disconnect();
        };

        ///// Sticky Orbit /////
        const k2StickyOrbit = () => {
            const sticky = document.querySelector(".k2-orbit-sticky");
            const steps = [...document.querySelectorAll(".k2-orbit-step")];

            if (!sticky || !steps.length) return;

            let ticking = false;

            const updateStickyStep = () => {
                const scrollPosition = window.scrollY + window.innerHeight / 2;
                let currentStep = 0;

                steps.forEach((step, i) => {
                    const top = step.getBoundingClientRect().top + window.scrollY;

                    if (scrollPosition >= top) {
                        currentStep = i + 1;
                    }
                });

                sticky.dataset.step = currentStep;
                ticking = false;
            };

            const requestUpdate = () => {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(updateStickyStep);
                }
            };

            window.addEventListener("scroll", requestUpdate, { passive: true });
            window.addEventListener("resize", requestUpdate);
            window.addEventListener("load", requestUpdate, { once: true });

            updateStickyStep();
        };

        ///// Stagger /////
        const k2Stagger = () => {
            const list = document.querySelectorAll("[data-stagger]");
            if (!list.length) return;

            for (const el of list) {
                let s = el.dataset.stagger || "100";
                if (s[0] === "/") s = "100" + s;

                const [interval, base = 0] = s.split("/").map(Number);

                const kids = el.classList.contains("w-richtext")
                    ? [...el.children].flatMap((child) => [...child.children])
                    : el.children;

                for (let i = 0; i < kids.length; i++) {
                    const d = base + i * interval;

                    if (d > 0) {
                        kids[i].style.transitionDelay = `${d}ms`;
                        kids[i].style.animationDelay = `${d}ms`;
                    }
                }
            }
        };

        ///// Modal /////
        const k2Modal = () => {
            const modal = document.querySelector(".k2-modal");
            const openBtns = document.querySelectorAll("[data-modal-open]");
            const closeBtns = document.querySelectorAll("[data-modal-close]");
            const panels = document.querySelectorAll("[data-modal-panel]");

            if (!modal || !openBtns.length || !panels.length) return;

            for (const btn of openBtns) {
                btn.setAttribute("aria-haspopup", "dialog");
            }

            const open = (id) => {
                if (!id) return;

                let activePanel;

                for (const panel of panels) {
                    const active = panel.dataset.modalPanel === id;
                    panel.hidden = !active;
                    if (active) activePanel = panel;
                }

                modal.scrollTop = 0;
                if (activePanel) activePanel.scrollTop = 0;

                if (!modal.open) modal.showModal();

                modal.scrollTop = 0;
                if (activePanel) activePanel.scrollTop = 0;
            };

            const close = () => {
                if (modal.open) modal.close();
            };

            for (const btn of openBtns) {
                btn.addEventListener("click", () => open(btn.dataset.modalOpen));
            }

            for (const btn of closeBtns) {
                btn.addEventListener("click", close);
            }

            modal.addEventListener("click", (e) => {
                if (e.target === modal) close();
            });
        };

        ///// Theme /////
        const k2Theme = () => {
            const root = document.body;
            const useDataTheme = root.hasAttribute("data-theme");
            const themeTriggers = root.querySelectorAll(".k2-theme-light");

            if (!themeTriggers.length) return;

            let raf = 0;
            let prev = null;

            const setTheme = (light) => {
                if (useDataTheme) {
                    root.dataset.theme = light ? "light" : "";
                } else {
                    root.classList.toggle("k2-light", light);
                }
            };

            const check = () => {
                raf = 0;

                const line = useDataTheme ? innerHeight * 0.6 : innerHeight * 0;
                let light = false;

                for (const trigger of themeTriggers) {
                    const r = trigger.getBoundingClientRect();

                    if (r.top <= line && r.bottom >= line) {
                        light = true;
                        break;
                    }
                }

                if (light !== prev) {
                    prev = light;
                    setTheme(light);
                }
            };

            const onScroll = () => {
                if (!raf) raf = requestAnimationFrame(check);
            };

            addEventListener("scroll", onScroll, { passive: true });
            addEventListener("resize", onScroll);

            check();
        };

        ///// Init /////
        const k2Init = () => {
            k2GroupChildren();
            k2ScrollNav();
            k2Tabs();
            k2Split();
            k2Cards();
            k2ScrollProgress();
            k2StickyOrbit();
            k2Stagger();
            k2Modal();
            k2Theme();
            k2Loader(k2Scroll);
        };

        ///// Ready /////
        document.addEventListener("DOMContentLoaded", () => {
            k2Init();
        });

(function () {
            var wrap = document.getElementById('radar-wrap');
            var radarLoaded = false;
            var startRadarGlobal = null;
            // =========================================
            // LOAD RADAR ONCE
            // =========================================
            function loadRadar() {
                if (radarLoaded || !wrap) return;
                radarLoaded = true;
                fetch('https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a1d2a4d25a0a23d15414f4a_integrations-radar-new.svg').then(function (r) {
                    return r.text();
                }).then(function (svgText) {
                    wrap.innerHTML = svgText;
                    setTimeout(initRadar, 50);
                }).catch(function (err) {
                    console.error('Radar SVG failed:', err);
                });
            }
            // =========================================
            // CHECK ACTIVE TAB
            // =========================================
            function checkRadarTab() {
                var panel = document.querySelector('.radar-panel');
                if (panel && panel.classList.contains('on')) {
                    if (!radarLoaded) {
                        loadRadar();
                    } else if (startRadarGlobal) {
                        startRadarGlobal();
                    }
                }
            }
            var observer = new MutationObserver(checkRadarTab);
            observer.observe(document.body, {
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
            checkRadarTab();

            function initRadar() {
                var RADAR_DURATION = 10;
                var RADAR_OFFSET = 95;
                var LOGO_RANGE = 1;
                var LOGO_MIN_OPACITY = .05;
                var LOGO_ACTIVE_OPACITY = 1;
                var DOT_ACTIVE_COLOR = '#5CC83A';
                var DOT_INACTIVE_COLOR = '#3a3a3a';
                var DOT_ACTIVE_GLOW = 'drop-shadow(0 0 6px rgba(92,200,58,0.85))';
                var DOT_FADE_IN = 0.3;
                var DOT_FADE_OUT = 0.3;
                var QUADRANTS = [{
                    dotId: 'dot-tl',
                    startDeg: 270,
                    endDeg: 360
                }, {
                    dotId: 'dot-tr',
                    startDeg: 0,
                    endDeg: 90
                }, {
                    dotId: 'dot-br',
                    startDeg: 90,
                    endDeg: 180
                }, {
                    dotId: 'dot-bl',
                    startDeg: 180,
                    endDeg: 270
                }];
                var SVG_NS = 'http://www.w3.org/2000/svg';
                var svg = wrap.querySelector('svg');
                if (!svg) {
                    console.error('SVG not found');
                    return;
                }

                function createSVG(tag) {
                    return document.createElementNS(SVG_NS, tag);
                }
                QUADRANTS.forEach(function (q) {
                    var el = document.getElementById(q.dotId);
                    var path = el && el.querySelector('path');
                    if (path) path.setAttribute('fill', DOT_INACTIVE_COLOR);
                });
                // =========================================
                // BUILD CARD GROUPS
                // =========================================
                var cardGroups = [];
                svg.querySelectorAll('foreignObject').forEach(function (f) {
                    var sib = f.nextSibling;
                    while (sib && sib.nodeType !== 1) {
                        sib = sib.nextSibling;
                    }
                    if (sib && sib.tagName.toLowerCase() === 'g') {
                        var wrapG = createSVG('g');
                        f.parentNode.insertBefore(wrapG, f);
                        wrapG.appendChild(f);
                        wrapG.appendChild(sib);
                        wrapG._cx = parseFloat(f.getAttribute('x')) + parseFloat(f.getAttribute('width')) / 2;
                        wrapG._cy = parseFloat(f.getAttribute('y')) + parseFloat(f.getAttribute('height')) / 2;
                        cardGroups.push(wrapG);
                    }
                });
                // =========================================
                // RADAR BUILD
                // =========================================
                var radar = createSVG('g');
                var defs = svg.querySelector('defs') || svg.insertBefore(createSVG('defs'), svg.firstChild);

                function makeStop(offset, opacity) {
                    var s = createSVG('stop');
                    s.setAttribute('offset', offset);
                    s.setAttribute('stop-color', '#5CC83A');
                    s.setAttribute('stop-opacity', opacity);
                    return s;
                }
                if (!svg.querySelector('#userRadarFill')) {
                    var g1 = createSVG('linearGradient');
                    g1.id = 'userRadarFill';
                    g1.setAttribute('x1', '149.829');
                    g1.setAttribute('y1', '190.969');
                    g1.setAttribute('x2', '264.829');
                    g1.setAttribute('y2', '359.969');
                    g1.setAttribute('gradientUnits', 'userSpaceOnUse');
                    g1.append(makeStop('0%', '0'), makeStop('100%', '.4'));
                    defs.appendChild(g1);
                }
                if (!svg.querySelector('#userRadarStroke')) {
                    var g2 = createSVG('linearGradient');
                    g2.id = 'userRadarStroke';
                    g2.setAttribute('x1', '108.829');
                    g2.setAttribute('y1', '133.469');
                    g2.setAttribute('x2', '351.829');
                    g2.setAttribute('y2', '372.469');
                    g2.setAttribute('gradientUnits', 'userSpaceOnUse');
                    g2.append(makeStop('0%', '0'), makeStop('100%', '1'));
                    defs.appendChild(g2);
                }
                var sector = createSVG('path');
                sector.setAttribute('d', 'M1.5 1.5C47.4626 1.5 92.9753 10.553 135.439 28.1422C177.903 45.7313 216.487 71.5121 248.987 104.013C281.488 136.513 307.269 175.097 324.858 217.561C342.447 260.025 351.5 305.537 351.5 351.5L75.9483 351.5C75.9483 341.723 74.0226 332.042 70.2812 323.01C66.5399 313.977 61.0561 305.77 54.1429 298.857C47.2297 291.944 39.0226 286.46 29.9901 282.719C20.9576 278.977 11.2767 277.052 1.5 277.052V1.5Z');
                sector.setAttribute('fill', 'url(#userRadarFill)');
                sector.setAttribute('stroke', 'url(#userRadarStroke)');
                sector.setAttribute('stroke-width', '3');
                sector.setAttribute('transform', 'translate(454 470) scale(1) translate(-1.5 -351.5)');
                radar.appendChild(sector);
                // =========================================
                // GREEN CENTER CIRCLE
                // =========================================
                var greenCircle = createSVG('circle');
                greenCircle.setAttribute('cx', '454');
                greenCircle.setAttribute('cy', '470');
                greenCircle.setAttribute('r', '76');
                greenCircle.setAttribute('fill', 'none');
                greenCircle.setAttribute('stroke', '#5CC83A');
                greenCircle.setAttribute('stroke-width', '3');
                greenCircle.style.filter = 'drop-shadow(0 0 10px rgba(92,200,58,.8))';
                svg.append(greenCircle, radar);
                // =========================================
                // LOGO ANGLES
                // =========================================
                var logos = cardGroups.map(function (g) {
                    var cx = g._cx;
                    var cy = g._cy;
                    var angle = (Math.atan2(cy - 470, cx - 454) * (180 / Math.PI) + RADAR_OFFSET + 360) % 360;
                    g.style.willChange = 'opacity';
                    return {
                        el: g,
                        angle: angle,
                        setOpacity: gsap.quickSetter(g, 'opacity'),
                        prev: -1
                    };
                });
                // =========================================
                // QUADRANTS
                // =========================================
                var quadrantStates = QUADRANTS.map(function (q) {
                    var el = document.getElementById(q.dotId);
                    return {
                        startDeg: q.startDeg,
                        endDeg: q.endDeg,
                        g: el,
                        path: el && el.querySelector('path'),
                        active: false
                    };
                });
                // =========================================
                // UPDATE HIGHLIGHT
                // =========================================
                function updateHighlight(rot) {
                    logos.forEach(function (l) {
                        var diff = Math.abs(rot - l.angle);
                        if (diff > 180) {
                            diff = 360 - diff;
                        }
                        var strength = Math.max(0, 1 - diff / LOGO_RANGE);
                        // PERMANENT ACTIVE
                        if (strength > .15) {
                            l.activated = true;
                        }
                        var opacity = l.activated ? LOGO_MIN_OPACITY + LOGO_ACTIVE_OPACITY : LOGO_MIN_OPACITY;
                        if (Math.abs(opacity - (l.prevOpacity || -1)) < 0.005) return;
                        l.prevOpacity = opacity;
                        gsap.to(l.el, {
                            opacity: opacity,
                            duration: opacity > LOGO_MIN_OPACITY ? 0.10 // fade in
                                : 0.25, // fade out/reset
                            ease: 'power2.out',
                            overwrite: true
                        });
                    });
                    // QUADRANT DOTS
                    quadrantStates.forEach(function (q) {
                        if (!q.path) return;
                        var nowIn = q.startDeg < q.endDeg ? rot >= q.startDeg && rot < q.endDeg : rot >= q.startDeg || rot < q.endDeg;
                        if (nowIn === q.active) return;
                        q.active = nowIn;
                        gsap.to(q.path, {
                            attr: {
                                fill: nowIn ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR
                            },
                            duration: nowIn ? DOT_FADE_IN : DOT_FADE_OUT,
                            overwrite: true
                        });
                        gsap.to(q.g, {
                            filter: nowIn ? DOT_ACTIVE_GLOW : 'none',
                            duration: nowIn ? DOT_FADE_IN : DOT_FADE_OUT,
                            overwrite: true
                        });
                    });
                }
                // =========================================
                // RADAR RESET + START
                // =========================================
                var radarTween;

                function startRadar() {
                    // kill old
                    if (radarTween) {
                        radarTween.kill();
                    }
                    // 12 O CLOCK START
                    gsap.set(radar, {
                        rotation: -90,
                        svgOrigin: '454 470'
                    });
                    // reset logos
                    logos.forEach(function (l) {
                        l.prevOpacity = -1;
                        l.activated = false;
                        l.setOpacity(LOGO_MIN_OPACITY);
                    });
                    // reset dots
                    quadrantStates.forEach(function (q) {
                        q.active = false;
                        if (q.path) {
                            q.path.setAttribute('fill', DOT_INACTIVE_COLOR);
                        }
                        if (q.g) {
                            q.g.style.filter = 'none';
                        }
                    });
                    // start radar
                    radarTween = gsap.to(radar, {
                        rotation: 270,
                        svgOrigin: '454 470',
                        duration: RADAR_DURATION,
                        repeat: -1,
                        ease: 'none',
                        onUpdate: function () {
                            updateHighlight(
                                (this.progress() * 360) % 360);
                        }
                    });
                }
                // FIRST START
                startRadar();
                // GLOBAL STARTER
                startRadarGlobal = startRadar;
                // =========================================
                // AMBIENT RINGS
                // =========================================
                Array.from(svg.querySelectorAll('circle')).filter(function (c) {
                    return (parseFloat(c.getAttribute('r')) > 120);
                }).forEach(function (r, i) {
                    gsap.to(r, {
                        rotation: i % 2 ? 360 : -360,
                        svgOrigin: '454 470',
                        duration: 150 + i * 35,
                        repeat: -1,
                        ease: 'none'
                    });
                });
            }
        })();

gsap.registerPlugin(ScrollTrigger);
        window.addEventListener("load", () => {
            const section = document.querySelector(".k2-section-scroll-tabs");
            const tabs = document.querySelector(".k2-scroll-tabs");
            if (!section || !tabs) return;
            const menu = tabs.querySelector(".k2-scroll-tabs-menu");
            const links = gsap.utils.toArray(tabs.querySelectorAll(".k2-scroll-tabs-menu-link"));
            const panes = gsap.utils.toArray(tabs.querySelectorAll(".k2-scroll-tabs-content-pane"));
            const isMobile = () => window.matchMedia("(max-width:479px)").matches;
            const total = links.length - 1;
            let current = -1;
            let isJumping = false;
            const paneData = panes.map(pane => ({
                block: pane.querySelector(".k2-scroll-tabs-content-block"),
                bg: pane.querySelector(".k2-scroll-tabs-content-bg")
            }));
            /* INITIAL STATE */
            paneData.forEach(item => {
                if (item.block) {
                    gsap.set(item.block, {
                        autoAlpha: 0
                    });
                }
                if (item.bg) {
                    gsap.set(item.bg, {
                        autoAlpha: 0,
                        scale: 1.12
                    });
                }
            });
            /* ACTIVATE TAB */
            function activate(index) {
                if (index === current) return;
                const prev = current;
                current = index;
                links[index]?.click();
                requestAnimationFrame(() => {
                    const active = menu.querySelector(".w--current");
                    if (!active) return;
                    /* MENU POSITION */
                    if (isMobile()) {
                        const left = active.offsetLeft - (menu.clientWidth / 2) + (active.offsetWidth / 2);
                        menu.scrollTo({
                            left,
                            behavior: "smooth"
                        });
                    } else {
                        const menuRect = menu.getBoundingClientRect();
                        const activeRect = active.getBoundingClientRect();
                        const y = menuRect.height / 2 - (activeRect.top - menuRect.top) - activeRect.height / 2;
                        gsap.killTweensOf(menu);
                        gsap.to(menu, {
                            y,
                            duration: 1,
                            ease: "power3.out"
                        });
                    }
                    /* HIDE PREVIOUS */
                    if (prev >= 0) {
                        const prevItem = paneData[prev];
                        if (prevItem.block) {
                            gsap.killTweensOf(prevItem.block);
                            gsap.set(prevItem.block, {
                                autoAlpha: 0
                            });
                        }
                        if (prevItem.bg) {
                            gsap.killTweensOf(prevItem.bg);
                            gsap.set(prevItem.bg, {
                                autoAlpha: 0,
                                scale: 1.12
                            });
                        }
                    }
                    /* CURRENT ITEM */
                    const item = paneData[index];
                    /* BG SCALE */
                    if (item.bg) {
                        gsap.killTweensOf(item.bg);
                        gsap.fromTo(item.bg, {
                            autoAlpha: 0,
                            scale: 1.12
                        }, {
                            autoAlpha: 1,
                            scale: 1,
                            duration: 1.2,
                            ease: "power3.out"
                        });
                    }
                    /* CARD FADE */
                    if (item.block) {
                        gsap.killTweensOf(item.block);
                        gsap.fromTo(item.block, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1,
                            duration: 0.45,
                            delay: 0.25,
                            ease: "power2.out"
                        });
                    }
                });
            }
            /* FIRST TAB */
            activate(0);
            /* SCROLLTRIGGER */
            const st = ScrollTrigger.create({
                trigger: section,
                //start: "top top-=80px",
                start: () => isMobile() ? "top top-=180px" : "top top-=80px",
                end: () => `+=${window.innerHeight * total}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (isJumping) return;
                    const index = Math.round(self.progress * total);
                    activate(index);
                }
            });
            /* CLICK = DIRECT JUMP */
            links.forEach((link, index) => {
                link.addEventListener("click", (e) => {
                    if (!e.isTrusted) return;
                    e.preventDefault();
                    isJumping = true;
                    const progress = index / total;
                    const targetScroll = st.start + ((st.end - st.start) * progress);
                    /* activate immediately */
                    current = -1;
                    activate(index);
                    /* mobile-safe jump */
                    gsap.set(window, {
                        scrollTo: targetScroll
                    });
                    ScrollTrigger.update();
                    setTimeout(() => {
                        isJumping = false;
                    }, 100);
                });
            });
        });" as const

export const KORE_AI_HEADER = {"tag": "header", "attrs": {"className": "k2-header"}, "html": "<a data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1609d"
                data-wf-ao-click-engagement-tracking="true" data-wf-element-id="72ec922b-ce4e-cff8-6ff5-e0b904c1609d"
                href="/" class="k2-logo-link w-inline-block">
                <div class="k2-logo w-embed"><svg viewBox="0 0 103 26" fill="none">
                        <path d="M97.9872 5.60919H94.2336V18.993H97.9872V5.60919Z" fill="currentColor"></path>
                        <path
                            d="M72.1218 18.9921C70.572 18.9921 69.2957 20.2168 69.2957 21.8183C69.2957 23.4197 70.572 24.6445 72.1218 24.6445C73.6717 24.6445 74.948 23.4197 74.948 21.8183C74.948 20.2168 73.717 18.9921 72.1218 18.9921Z"
                            fill="currentColor"></path>
                        <path
                            d="M87.0853 5.64823V6.68774C86.0786 6.00986 84.8879 5.64823 83.4238 5.64823C79.8529 5.64823 76.9688 8.58783 76.9688 12.3401C76.9688 16.0924 79.8529 18.9867 83.4238 18.9867C84.8879 18.9867 86.0786 18.5797 87.0853 17.9472V18.9867H90.8389V5.64697H87.0853V5.64823ZM87.0853 14.375C86.2613 15.4599 85.1626 15.8669 84.0638 15.8669C82.0957 15.8669 80.7223 14.239 80.7223 12.3401C80.7223 10.4413 82.0957 8.76801 84.0638 8.76801C85.1172 8.76801 86.2159 9.12963 87.0853 10.2599V14.375Z"
                            fill="currentColor"></path>
                        <path
                            d="M98.8991 0.694265C100.778 0.694265 102.307 2.22265 102.307 4.10258V20.4991C102.307 22.3777 100.779 23.9074 98.8991 23.9074H77.6113C77.8545 23.2471 77.9805 22.5415 77.9805 21.8195C77.9805 20.2193 77.3795 18.7363 76.287 17.6464C75.3559 16.7165 74.1412 16.1445 72.8119 15.9958V4.10258C72.8119 2.22391 74.3403 0.694265 76.2203 0.694265H98.9003M98.8991 0.00126124H76.219C73.9548 0.00126124 72.1177 1.83709 72.1177 4.10258V16.6497C75.0358 16.6497 77.2862 18.89 77.2862 21.8183C77.2862 22.8553 76.9989 23.8041 76.505 24.5991H98.8991C101.163 24.5991 103 22.7633 103 20.4978V4.10132C103 1.83709 101.165 0 98.8991 0V0.00126124Z"
                            fill="currentColor"></path>
                        <path
                            d="M11.2544 14.7345L17.9878 7.50586H11.7281L5.0312 14.7711V0H0V24.9847H5.0312V21.3697L7.82085 18.4163L12.4148 24.9847H18.7464L11.2544 14.7345Z"
                            fill="currentColor"></path>
                        <path
                            d="M42.0312 9.72134V7.49365H37.0781V24.9813H42.0312V14.7135C43.4588 13.1334 45.345 12.3422 48.0162 12.2388V7.49743C45.4874 7.49743 43.5621 8.28746 42.0312 9.72134Z"
                            fill="currentColor"></path>
                        <path
                            d="M20.4763 9.98048C23.203 7.30549 27.2388 6.70446 30.6194 8.45209C31.383 8.83388 32.0923 9.38072 32.7463 9.98048C34.601 11.7823 35.4729 14.1851 35.3633 16.588C35.1453 15.1679 34.4359 13.8033 33.346 12.7109C30.5098 9.87212 25.9297 9.87212 23.0934 12.7109C21.1845 14.6223 21.1845 17.7887 23.0934 19.7544C23.8028 20.4637 24.6747 20.9551 25.602 21.119C23.7473 21.2828 21.8397 20.6817 20.4209 19.263C17.8581 16.7518 17.8581 12.6013 20.3667 10.0901L20.4209 10.0359L20.4751 9.98174L20.4763 9.98048Z"
                            fill="currentColor"></path>
                        <path
                            d="M32.739 22.4845C31.1035 24.1225 28.867 25.0511 26.5763 25.0511C24.2857 25.0511 22.0504 24.1225 20.3595 22.4845C18.724 20.8465 17.7966 18.6075 17.7966 16.2601V15.8229C18.0146 17.2429 18.724 18.6616 19.8139 19.7541C21.1772 21.1187 22.9765 21.8835 24.9396 21.8835C26.6305 21.8835 28.266 21.2825 29.521 20.2455C29.6848 20.0817 29.9028 19.9179 30.0666 19.7541L30.1207 19.6999C32.0296 17.7343 32.0296 14.6762 30.1207 12.7648C29.4668 12.1096 28.7032 11.6724 27.8301 11.4544H28.266C30.0111 11.4544 31.5924 12.1638 32.792 13.42C35.191 15.877 35.2464 19.8083 32.9016 22.3207C32.9016 22.3207 32.9016 22.3749 32.8474 22.3749L32.7378 22.4845H32.739Z"
                            fill="currentColor"></path>
                        <path
                            d="M57.3477 20.8487C54.926 20.8487 53.6559 19.5358 53.1834 17.7957C53.0637 17.39 52.9138 16.6428 52.9717 15.5604C53.0927 13.3264 54.4308 10.9413 57.8291 10.9413C59.9018 10.9413 61.6532 11.691 63.0341 13.1689C64.395 14.6255 64.9872 16.3694 65.2278 17.3383C65.2984 16.8381 65.3311 16.3328 65.3261 15.8276C65.3261 10.6943 61.8195 7.33636 57.1109 7.33636C51.9146 7.33636 48.3752 11.0433 48.3752 16.1715C48.3752 21.2998 51.9486 24.979 57.2419 24.979C61.1303 24.979 64.2248 22.7916 65.1169 19.6H60.1374C59.6195 20.4329 58.6896 20.8499 57.3477 20.8499V20.8487Z"
                            fill="currentColor"></path>
                        <path
                            d="M59.0159 11.7973C59.8664 12.3177 60.4094 13.2476 60.5795 14.5391H53.9003C53.7831 14.9738 53.7415 15.3581 53.7289 15.5987C53.6848 16.4152 53.7717 17.0112 53.8574 17.3791H64.4591C63.8064 14.8944 62.0663 12.329 59.0159 11.7973Z"
                            fill="currentColor"></path>
                    </svg></div>
            </a>
            <nav class="k2-nav">
                <div class="k2-nav-menu"><a data-wf--nav---link--variant="base"
                        data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c160a1:c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-ao-click-engagement-tracking="true"
                        data-wf-element-id="c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c911016a-5b22-2438-69bd-885df12076f4%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c160a1%22%7D%5D"
                        href="/ai-agent-platform" aria-current="page" class="k2-nav-link w-inline-block w--current">
                        <div class="k2-nav-link-text">Agent Platform { Artemis }</div>
                    </a><a data-wf--nav---link--variant="base"
                        data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c160a3:c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-ao-click-engagement-tracking="true"
                        data-wf-element-id="c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c911016a-5b22-2438-69bd-885df12076f4%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c160a3%22%7D%5D"
                        href="/" class="k2-nav-link w-inline-block">
                        <div class="k2-nav-link-text">AI Applications</div>
                    </a><a data-wf--nav---link--variant="base"
                        data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c160a4:c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-ao-click-engagement-tracking="true"
                        data-wf-element-id="c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c911016a-5b22-2438-69bd-885df12076f4%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c160a4%22%7D%5D"
                        href="https://marketplace.kore.ai/" target="_blank" class="k2-nav-link w-inline-block">
                        <div class="k2-nav-link-text">Agent Marketplace</div>
                    </a></div>
                <div class="k2-nav-cta"><a data-wf--nav---link--variant="demo"
                        data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c160a9:c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-ao-click-engagement-tracking="true"
                        data-wf-element-id="c911016a-5b22-2438-69bd-885df12076f4"
                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c911016a-5b22-2438-69bd-885df12076f4%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c160a9%22%7D%5D"
                        href="/get-a-demo-artemis"
                        class="k2-nav-link w-variant-c0493466-7ca2-e73d-7689-b8924b656df0 w-inline-block">
                        <div class="k2-nav-link-text">Request a demo</div>
                        <div data-wf--icon---arrow--variant="small"
                            class="k2-icon-arrow w-variant-2b097f0c-b7fa-038e-fb84-69826bb9685b w-embed"><svg
                                viewBox="0 0 22 19" fill="currentColor">
                                <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                            </svg></div>
                    </a></div>
            </nav>
        "} as const

export const KORE_AI_SCROLL_NAV = {"tag": "nav", "attrs": {"className": "k2-scroll-nav"}, "html": "
            <div class="w-embed">
                <style>
                    .k2-scroll-nav ol {
                        display: grid;
                        gap: .75rem
                    }

                    .k2-scroll-nav a {
                        display: block;
                        width: 1rem;
                        border-bottom: 2px solid;
                        opacity: .1;
                        transition: opacity .3s, color .3s, transform .5s;
                        transform-origin: left;
                        transform: scaleX(1.001)
                    }

                    .k2-scroll-nav a.w--current {
                        color: #5cc83a;
                        opacity: 1;
                        transform: scaleX(1.75)
                    }

                    .k2-scroll-nav li:has(+ li > a.w--current)>a,
                    .k2-scroll-nav li:has(> a.w--current)+li>a {
                        opacity: .4;
                    }

                    .k2-scroll-nav li:has(+ li + li > a.w--current)>a,
                    .k2-scroll-nav li:has(> a.w--current)+li+li>a {
                        opacity: .3;
                    }

                    .k2-scroll-nav li:has(+ li + li + li > a.w--current)>a,
                    .k2-scroll-nav li:has(> a.w--current)+li+li+li>a {
                        opacity: .2;
                    }
                </style>
            </div>
            <ol>
                <li><a href="#meet-artemis" aria-label="meet artemis" class=""></a></li>
                <li><a href="#enterprise-ai-outcomes" aria-label="enterprise ai outcomes" class="w--current"></a></li>
                <li><a href="#ai-agents" aria-label="ai agents" class=""></a></li>
                <li><a href="#ai-programmable" aria-label="ai programmable" class=""></a></li>
                <li><a href="#pillars" aria-label="pillars"></a></li>
                <li><a href="#build-scale-optimize" aria-label="build scale optimize"></a></li>
                <li><a href="#get-started" aria-label="get started"></a></li>
            </ol>
        "} as const

export const KORE_AI_FOOTER = {"tag": "footer", "attrs": {"className": "k2-footer"}, "html": "
            <div class="k2-container-footer">
                <div class="k2-footer-top-panel k2-grid-border-white">
                    <div id="w-node-_72ec922b-ce4e-cff8-6ff5-e0b904c1643e-f2d55857"
                        class="k2-footer-tp-left k2-border-bottom"><img
                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6912fff1b1afa39bfaa28615_Kore%20Logo%20White.svg"
                            loading="lazy" alt="Kore ai white logo in display." class="k2-footer-logo"></div>
                    <div id="w-node-_72ec922b-ce4e-cff8-6ff5-e0b904c16440-f2d55857"
                        class="k2-footer-tp-middle k2-border-left k2-border-right k2-border-bottom"><img
                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0b2404de65e356a7b841ab_line-bars-img.svg"
                            loading="lazy" alt="" class="img-contain max-height-10">
                        <div class="k2-text">Agentic AI for the enterprise</div>
                    </div>
                    <div class="k2-footer-tp-right k2-border-bottom"></div>
                </div>
                <div class="k2-footer-middle-panel k2-grid-border-white">
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Pre-built applications</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-menu-item-list"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1644c:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1644c%22%7D%5D"
                                href="/ai-for-service/ai-for-banking" class="k2-footer-nav-link">Banking</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1644e:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1644e%22%7D%5D"
                                href="/ai-for-service/ai-for-healthcare" class="k2-footer-nav-link">Healthcare</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16450:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16450%22%7D%5D"
                                href="/ai-for-service/ai-for-retail" class="k2-footer-nav-link">Retail</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16452:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16452%22%7D%5D"
                                href="/ai-for-work/ai-for-recruiting" class="k2-footer-nav-link">Recruiting</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16454:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16454%22%7D%5D"
                                href="/ai-for-work/ai-for-hr" class="k2-footer-nav-link">HR</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16456:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16456%22%7D%5D"
                                href="/ai-for-work/ai-for-it" class="k2-footer-nav-link">IT</a></div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Agent Platform</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-menu-item-list"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1645e:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1645e%22%7D%5D"
                                href="/ai-agent-platform" aria-current="page"
                                class="k2-footer-nav-link w--current">Agent Platform { Artemis }</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16460:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16460%22%7D%5D"
                                href="/ai-for-service" class="k2-footer-nav-link">AI for Service</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16462:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16462%22%7D%5D"
                                href="/ai-for-work" class="k2-footer-nav-link">AI for Work</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16464:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16464%22%7D%5D"
                                href="https://marketplace.kore.ai" target="_blank" class="k2-footer-nav-link">Agent
                                Marketplace</a></div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom"></div>
                    <div class="k2-footer-grid-box k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="np-list-square"></div>
                            <div class="k2-footer-menu-title-text">Support</div>
                        </div>
                        <div class="k2-footer-support-panel">
                            <div class="k2-footer-support-heading">Let's work together</div>
                            <div class="k2-footer-support-text">Get in touch with the team.</div><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16471"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="72ec922b-ce4e-cff8-6ff5-e0b904c16471" href="/request-for-proposal"
                                class="np-button secondary w-inline-block">
                                <div class="np-btn-text">Submit RFP</div>
                                <div class="np-btn-arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="22"
                                        height="19" viewBox="0 0 22 19" fill="none">
                                        <path d="M0.75 9.7007H20.4643M12.3993 17.8929L20.4643 9.7007L11.6526 0.75"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-dasharray="0.09 3.58"></path>
                                    </svg>
                                    <style>
                                        /* Arrow Wrapper */
                                        .np-btn-arrow {
                                            overflow: hidden;
                                        }

                                        /* SVG */
                                        .np-btn-arrow svg {
                                            overflow: visible;
                                        }

                                        /* Animate Arrow */
                                        .np-btn-arrow path {
                                            transform-box: fill-box;
                                            transform-origin: center;
                                        }

                                        /* Hover Animation */
                                        .np-button:hover .np-btn-arrow path {
                                            animation: npArrowMove .55s ease;
                                        }

                                        /* Arrow Slide Animation */
                                        @keyframes npArrowMove {

                                            0% {
                                                transform: translateX(0);
                                                opacity: 1;
                                            }

                                            49% {
                                                transform: translateX(100%);
                                                opacity: 0;
                                            }

                                            50% {
                                                transform: translateX(-100%);
                                                opacity: 0;
                                            }

                                            100% {
                                                transform: translateX(0);
                                                opacity: 1;
                                            }
                                        }
                                    </style>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Company</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-menu-item-list"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1647b:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1647b%22%7D%5D"
                                href="/about-us" class="k2-footer-nav-link">About Kore.ai</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1647d:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1647d%22%7D%5D"
                                href="/about-us#leadership" class="k2-footer-nav-link">Leadership</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1647f:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1647f%22%7D%5D"
                                href="/customer-stories" class="k2-footer-nav-link">Customer Stories</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16481:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16481%22%7D%5D"
                                href="/partners" class="k2-footer-nav-link">Partners</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16483:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16483%22%7D%5D"
                                href="/analyst-recognition" class="k2-footer-nav-link">Analyst Recognition</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16485:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16485%22%7D%5D"
                                href="/news" class="k2-footer-nav-link">Newsroom</a></div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Resources</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-menu-item-list"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1648d:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1648d%22%7D%5D"
                                href="https://docs.kore.ai/" target="_blank"
                                class="k2-footer-nav-link">Documentation</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1648f:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1648f%22%7D%5D"
                                href="/blog" class="k2-footer-nav-link">Blog</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16491:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16491%22%7D%5D"
                                href="/whitepaper" class="k2-footer-nav-link">Whitepapers</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16493:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16493%22%7D%5D"
                                href="/webinar" class="k2-footer-nav-link">Webinars</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16495:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16495%22%7D%5D"
                                href="/ai-research-reports" class="k2-footer-nav-link">AI Research Reports</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16497:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16497%22%7D%5D"
                                href="/ai-glossary" class="k2-footer-nav-link">AI Glossary</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16499:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16499%22%7D%5D"
                                href="/videos" class="k2-footer-nav-link">Videos</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1649b:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1649b%22%7D%5D"
                                href="/generative-ai-101" class="k2-footer-nav-link">Generative AI 101</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1649d:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1649d%22%7D%5D"
                                href="/responsible-ai-framework" class="k2-footer-nav-link">Responsible AI
                                framework</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1649f:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1649f%22%7D%5D"
                                href="/cxo-tool-kit" class="k2-footer-nav-link">CXO Toolkit</a></div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Get Involved</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-menu-item-list"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164a7:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164a7%22%7D%5D"
                                href="/event" class="k2-footer-nav-link">Events</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164a9:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164a9%22%7D%5D"
                                href="/support" class="k2-footer-nav-link">Support</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164ab:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164ab%22%7D%5D"
                                href="https://bots.kore.ai/accounts/?return_to=saml&amp;showLogin=true&amp;hideSSOButtons=true&amp;hideResourcesPageLink=true&amp;comingFromKey=saml&amp;samlReqId=sar-c42b59f5-732f-5c39-b63e-1c41cd61662c&amp;RelayState=ZEBklF0F8byW287DmKwKzJZ2wO4Cn80q1lySm6n3t48bXr_63QRsgdG8"
                                target="_blank" class="k2-footer-nav-link">Academy</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164ad:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164ad%22%7D%5D"
                                href="https://community.kore.ai/" class="k2-footer-nav-link">Community</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164af:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164af%22%7D%5D"
                                href="/careers" class="k2-footer-nav-link">Careers</a></div>
                    </div>
                    <div class="k2-footer-grid-box k2-border-bottom">
                        <div class="k2-footer-menu-heading">
                            <div class="k2-footer-menu-title-text">Follow us on</div>
                            <div class="np-list-square"></div>
                        </div>
                        <div class="k2-footer-social"><a data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164b7"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="72ec922b-ce4e-cff8-6ff5-e0b904c164b7"
                                href="https://in.linkedin.com/company/kore-inc" target="_blank"
                                class="k2-social-link w-inline-block">
                                <div class="social-icon-32 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="25"
                                        height="25" viewBox="0 0 25 25" fill="none">
                                        <path
                                            d="M8.33333 11.4583V16.6667M8.33333 8.33333V8.34375M12.5 16.6667V11.4583M16.6667 16.6667V13.5417C16.6667 12.9891 16.4472 12.4592 16.0565 12.0685C15.6658 11.6778 15.1359 11.4583 14.5833 11.4583C14.0308 11.4583 13.5009 11.6778 13.1102 12.0685C12.7195 12.4592 12.5 12.9891 12.5 13.5417M3.125 7.29167C3.125 6.1866 3.56399 5.12679 4.34539 4.34539C5.12679 3.56399 6.1866 3.125 7.29167 3.125H17.7083C18.8134 3.125 19.8732 3.56399 20.6546 4.34539C21.436 5.12679 21.875 6.1866 21.875 7.29167V17.7083C21.875 18.8134 21.436 19.8732 20.6546 20.6546C19.8732 21.436 18.8134 21.875 17.7083 21.875H7.29167C6.1866 21.875 5.12679 21.436 4.34539 20.6546C3.56399 19.8732 3.125 18.8134 3.125 17.7083V7.29167Z"
                                            stroke="white" stroke-width="1.5625" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </svg></div>
                            </a><a data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164b9"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="72ec922b-ce4e-cff8-6ff5-e0b904c164b9"
                                href="https://www.youtube.com/@Koreai" target="_blank"
                                class="k2-social-link w-inline-block">
                                <div class="social-icon-32 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="25"
                                        height="25" viewBox="0 0 25 25" fill="none">
                                        <path
                                            d="M2.0835 8.33073C2.0835 7.22566 2.52248 6.16585 3.30388 5.38445C4.08529 4.60305 5.14509 4.16406 6.25016 4.16406H18.7502C19.8552 4.16406 20.915 4.60305 21.6964 5.38445C22.4778 6.16585 22.9168 7.22566 22.9168 8.33073V16.6641C22.9168 17.7691 22.4778 18.8289 21.6964 19.6103C20.915 20.3917 19.8552 20.8307 18.7502 20.8307H6.25016C5.14509 20.8307 4.08529 20.3917 3.30388 19.6103C2.52248 18.8289 2.0835 17.7691 2.0835 16.6641V8.33073Z"
                                            stroke="white" stroke-width="1.5625" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path d="M10.4168 9.3724L15.6252 12.4974L10.4168 15.6224V9.3724Z" stroke="white"
                                            stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg></div>
                            </a><a data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164bb"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="72ec922b-ce4e-cff8-6ff5-e0b904c164bb" href="https://x.com/koredotai"
                                target="_blank" class="k2-social-link w-inline-block">
                                <div class="social-icon-32 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="25"
                                        height="25" viewBox="0 0 25 25" fill="none">
                                        <path
                                            d="M4.1665 20.8307L11.2165 13.7807M13.779 11.2182L20.8332 4.16406M4.1665 4.16406L16.3884 20.8307H20.8332L8.6113 4.16406H4.1665Z"
                                            stroke="white" stroke-width="1.5625" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </svg></div>
                            </a></div>
                    </div>
                </div>
            </div>
            <div class="k2-container-footer">
                <div class="k2-footer-copyright-panel k2-grid-border-white">
                    <div id="w-node-_72ec922b-ce4e-cff8-6ff5-e0b904c164bf-f2d55857"
                        class="k2-footer-cp-left k2-border-bottom"><img
                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/69e8644f1335502f7b280657_Kore%20emblem.svg"
                            loading="lazy" alt="" class="k2-footer-cp-logo"></div>
                    <div id="w-node-_72ec922b-ce4e-cff8-6ff5-e0b904c164c1-f2d55857"
                        class="k2-footer-cp-middle k2-border-left k2-border-right k2-border-bottom">
                        <div class="k2-footer-menu-item-list for-copyright"><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164c3:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164c3%22%7D%5D"
                                href="#" target="_blank" class="k2-footer-nav-link">Trust Center</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164c5:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164c5%22%7D%5D"
                                href="/terms-of-service" class="k2-footer-nav-link">Terms of Service</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164c7:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164c7%22%7D%5D"
                                href="/acceptable-use-policy" class="k2-footer-nav-link">Acceptable Use Policy</a><a
                                data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c164c9:2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-ao-click-engagement-tracking="true"
                                data-wf-element-id="2a7b5131-0ba9-6314-e765-6ea1c0c5bac8"
                                data-wf-component-context="%5B%7B%22componentId%22%3A%222a7b5131-0ba9-6314-e765-6ea1c0c5bac8%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c164c9%22%7D%5D"
                                href="/cookie-policy" class="k2-footer-nav-link">Cookie Policy</a></div>
                    </div>
                    <div id="w-node-_72ec922b-ce4e-cff8-6ff5-e0b904c164cb-f2d55857"
                        class="k2-footer-cp-right k2-border-bottom">
                        <div class="k2-footer-cp-text">\u00a9 2026 Kore.ai Inc. All trademarks are property of their
                            respective owners.</div>
                    </div>
                </div>
            </div>
        "} as const

export const KORE_AI_DIALOGS = [{"tag": "dialog", "attrs": {"data-lenis": "", "className": "k2-modal lenis"}, "html": "
            <div class="w-dyn-list">
                <div role="list" class="w-dyn-items">
                    <div data-stagger="" data-modal-panel="abl" role="listitem" class="k2-modal-item w-dyn-item">
                        <div class="k2-modal-row k2-modal-row-1">
                            <div class="k2-modal-header">
                                <div data-wf--eyebrow--variant="medium"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div style="color:inherit" class="k2-eyebrow-mark"></div>
                                    <div>ABL\u2122</div>
                                </div>
                            </div>
                            <div data-wf--button---close--variant="modal"
                                class="k2-button w-variant-8662bf58-78a8-53ed-9913-1cc9cff14e08">
                                <div class="k2-clickable"><button type="button" aria-label="Close" data-modal-close=""
                                        class="k2-action"></button></div>
                                <div class="k2-icon-close w-embed"><svg viewBox="0 0 32 32">
                                        <g fill="currentColor">
                                            <circle cx="4" cy="4" r="2" style="--i:2"></circle>
                                            <circle cx="10" cy="10" r="2" style="--i:1"></circle>
                                            <circle cx="16" cy="16" r="2" style="--i:0"></circle>
                                            <circle cx="22" cy="22" r="2" style="--i:1"></circle>
                                            <circle cx="28" cy="28" r="2" style="--i:2"></circle>

                                            <circle cx="28" cy="4" r="2" style="--i:2"></circle>
                                            <circle cx="22" cy="10" r="2" style="--i:1"></circle>
                                            <circle cx="10" cy="22" r="2" style="--i:1"></circle>
                                            <circle cx="4" cy="28" r="2" style="--i:2"></circle>
                                        </g>
                                    </svg></div>
                            </div>
                        </div>
                        <div class="k2-modal-row" style="transition-delay: 100ms; animation-delay: 100ms;">
                            <div class="w-embed">
                                <h2 class="k2-text-h1">ABL\u2122</h2>
                            </div>
                            <div class="k2-modal-description">
                                <p class="k2-text">ABL is a typed, schema-driven language purpose-built for agentic AI.
                                    It lets enterprises define agent behavior, tools, guardrails, orchestration, and
                                    handoff logic in a formal, structured way.</p>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-2"
                            style="transition-delay: 200ms; animation-delay: 200ms;">
                            <div data-wf--image--variant="landscape-3-1"
                                class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367"><img
                                    fetchpriority="high"
                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a1034895daecd26a42b169c_abl-hero.webp"
                                    loading="eager" alt="" class="k2-img"></div>
                        </div>
                        <div class="k2-modal-row" style="transition-delay: 300ms; animation-delay: 300ms;">
                            <div class="w-embed">
                                <h2 class="k2-text-h1">The ABL\u2122 <em>Advantage</em></h2>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-3"
                            style="transition-delay: 400ms; animation-delay: 400ms;">
                            <div class="k2-modal-col k2-modal-col-1">
                                <div data-group-children="" class="k2-pillars-advantages w-richtext">
                                    <div>
                                        <h3>Build faster across teams</h3>
                                        <p>Turn plain-language intent into agent designs and ABL, so business experts
                                            can contribute and technical teams can ship faster.</p>
                                    </div>
                                    <div>
                                        <h3>Guide teams across the full agent lifecycle</h3>
                                        <p>Move from idea to design, build, test, deployment, and optimization with Arch
                                            guiding every step.</p>
                                    </div>
                                    <div>
                                        <h3>Reuse proven patterns</h3>
                                        <p>Start from tested agent architectures instead of reinventing topology, tools,
                                            policies, and handoffs for every use case.</p>
                                    </div>
                                    <div>
                                        <h3>Generate agents built to ship</h3>
                                        <p>Arch creates ABL, so every agent is structured, validated, governed, and
                                            observable.</p>
                                    </div>
                                    <div>
                                        <h3>Improve with every run</h3>
                                        <p>Arch uses traces, performance signals, policy checks, and changing
                                            requirements to recommend and apply improvements continuously to improve
                                            business outcomes.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-modal-col">
                                <div data-wf--image--variant="portrait-3-4" style="min-height:100%"
                                    class="k2-img-wrapper w-variant-08ed6631-47c5-8b85-b065-595993bed9c8"><img
                                        decoding="async"
                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a10531323e6a0459cdee5bd_abl-advantage.webp"
                                        loading="lazy" alt="" class="k2-img"></div>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-4"
                            style="transition-delay: 500ms; animation-delay: 500ms;">
                            <div class="k2-pillars-how-header">
                                <div data-op="100" data-mw="100" data-wf--heading--variant="h2"
                                    class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                    <h2>How it works</h2>
                                </div>
                            </div>
                            <div class="k2-pillars-how-tags">
                                <div data-wf--eyebrow--variant="medium" style="text-transform:none"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div class="k2-eyebrow-mark"></div>
                                    <div>The Builder</div>
                                </div>
                                <div data-wf--eyebrow--variant="medium"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div data-color="purple" class="k2-eyebrow-mark"></div>
                                    <div>ABL\u2122</div>
                                </div>
                            </div>
                            <div data-wf--image--variant="landscape-16-9" style="object-fit:contain"
                                class="k2-img-wrapper w-variant-0144d365-ab67-29af-ca32-5f01095df836"><img
                                    decoding="async"
                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a0eadc0dd86e74203b06a3f_abl-how-it-works.webp"
                                    loading="lazy" alt="" class="k2-img"></div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-5"
                            style="transition-delay: 600ms; animation-delay: 600ms;">
                            <div class="k2-logomark w-embed"><svg style="overflow:visible" viewBox="0 0 59 59"
                                    fill="currentColor">
                                    <path
                                        d="M8.988 8.447C18.135-.526 31.672-2.542 43.012 3.321c2.561 1.281 4.941 3.115 7.134 5.127 6.221 6.044 9.146 14.104 8.778 22.164-.731-4.763-3.111-9.341-6.767-13.005-9.514-9.522-24.877-9.522-34.391 0-6.403 6.412-6.403 17.033 0 23.626 2.38 2.38 5.304 4.028 8.415 4.577-6.221.55-12.62-1.467-17.379-6.226C.206 31.161.206 17.239 8.621 8.815l.182-.182.182-.182.004-.004zm41.135 41.944C44.637 55.885 37.134 59 29.451 59s-15.182-3.115-20.854-8.61C3.111 44.896 0 37.386 0 29.512v-1.467c.731 4.763 3.111 9.522 6.767 13.187a24.05 24.05 0 0 0 17.194 7.143c5.672 0 11.158-2.016 15.368-5.494.55-.549 1.281-1.099 1.83-1.648l.182-.182c6.403-6.593 6.403-16.851 0-23.263-2.194-2.198-4.755-3.664-7.684-4.396h1.462c5.854 0 11.158 2.38 15.182 6.593 8.047 8.242 8.233 21.429.368 29.856 0 0 0 .182-.182.182l-.368.368h.004z">
                                    </path>
                                </svg></div>
                            <div data-op="100" data-mw="100" data-wf--heading--variant="h4"
                                class="k2-heading w-variant-41a52ffe-b74e-9c50-c4c3-ed6d86e7614d w-richtext">
                                <h2>Get started with {&nbsp;Artemis&nbsp;}</h2>
                            </div>
                            <div data-wf--cta--variant="black"
                                class="k2-cta w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                <div class="k2-clickable"><a aria-label="Get demo"
                                        data-wf-native-id-path="f7dbb59f-54b2-58dc-d75a-5f1239cf7de9:2feee01b-0297-ea0a-0af0-829fdaea0f75_instance-0:6d131e9e-249b-9bfd-c8f6-275299f65082_instance-0:6d131e9e-249b-9bfd-c8f6-275299f65084_instance-0"
                                        data-wf-ao-click-engagement-tracking="true"
                                        data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                        data-wf-cms-context="%5B%7B%22collectionId%22%3A%226a0ea740053efebac0719c51%22%2C%22itemId%22%3A%226a0eacb79237b0f6fe9ebd62%22%7D%5D"
                                        data-wf-component-context="%5B%7B%22componentId%22%3A%222feee01b-0297-ea0a-0af0-829fdaea0f4f%22%2C%22instanceId%22%3A%22f7dbb59f-54b2-58dc-d75a-5f1239cf7de9%22%7D%2C%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%222feee01b-0297-ea0a-0af0-829fdaea0f75%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                        href="/get-a-demo-artemis" class="k2-action w-inline-block"></a></div>
                                <div aria-hidden="true" class="k2-cta-text">Get demo</div>
                                <div aria-hidden="true"
                                    class="k2-cta-icon w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                    <div data-wf--icon---arrow--variant="base" class="k2-icon-arrow w-embed"><svg
                                            viewBox="0 0 22 19" fill="currentColor">
                                            <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                            <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                            <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                            <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                            <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                            <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                            <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                            <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                            <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                            <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                            <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                            <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                        </svg></div>
                                </div>
                            </div>
                            <div data-op="100" data-font-weight="300" data-mw="100" data-wf--paragraph--variant="base"
                                class="k2-text w-richtext">
                                <p>Start AI-programming your next AI&nbsp;Agents</p>
                            </div>
                        </div>
                    </div>
                    <div data-stagger="" data-modal-panel="arch" role="listitem" class="k2-modal-item w-dyn-item">
                        <div class="k2-modal-row k2-modal-row-1">
                            <div class="k2-modal-header">
                                <div data-wf--eyebrow--variant="medium"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div style="color:inherit" class="k2-eyebrow-mark"></div>
                                    <div>Arch\u2122</div>
                                </div>
                            </div>
                            <div data-wf--button---close--variant="modal"
                                class="k2-button w-variant-8662bf58-78a8-53ed-9913-1cc9cff14e08">
                                <div class="k2-clickable"><button type="button" aria-label="Close" data-modal-close=""
                                        class="k2-action"></button></div>
                                <div class="k2-icon-close w-embed"><svg viewBox="0 0 32 32">
                                        <g fill="currentColor">
                                            <circle cx="4" cy="4" r="2" style="--i:2"></circle>
                                            <circle cx="10" cy="10" r="2" style="--i:1"></circle>
                                            <circle cx="16" cy="16" r="2" style="--i:0"></circle>
                                            <circle cx="22" cy="22" r="2" style="--i:1"></circle>
                                            <circle cx="28" cy="28" r="2" style="--i:2"></circle>

                                            <circle cx="28" cy="4" r="2" style="--i:2"></circle>
                                            <circle cx="22" cy="10" r="2" style="--i:1"></circle>
                                            <circle cx="10" cy="22" r="2" style="--i:1"></circle>
                                            <circle cx="4" cy="28" r="2" style="--i:2"></circle>
                                        </g>
                                    </svg></div>
                            </div>
                        </div>
                        <div class="k2-modal-row" style="transition-delay: 100ms; animation-delay: 100ms;">
                            <div class="w-embed">
                                <h2 class="k2-text-h1">Arch\u2122</h2>
                            </div>
                            <div class="k2-modal-description">
                                <p class="k2-text">Arch is the platform\u2019s built-in AI solution architect. It turns
                                    plain-language intent into a complete agent system - including agents, workflows,
                                    tools, policies, and handoffs - and helps teams build, manage, and optimize AI
                                    agents.</p>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-2"
                            style="transition-delay: 200ms; animation-delay: 200ms;">
                            <div data-wf--image--variant="landscape-3-1"
                                class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367"><img
                                    fetchpriority="high"
                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a1034d04626281b4f6edb8f_arch-hero.webp"
                                    loading="eager" alt="" class="k2-img"></div>
                        </div>
                        <div class="k2-modal-row" style="transition-delay: 300ms; animation-delay: 300ms;">
                            <div class="w-embed">
                                <h2 class="k2-text-h1">The Arch\u2122 <em>Advantage</em></h2>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-3"
                            style="transition-delay: 400ms; animation-delay: 400ms;">
                            <div class="k2-modal-col k2-modal-col-1">
                                <div data-group-children="" class="k2-pillars-advantages w-richtext">
                                    <div>
                                        <h3>Build faster across teams</h3>
                                        <p>Turn plain-language intent into agent designs and ABL, so business experts
                                            can contribute and technical teams can ship faster.</p>
                                    </div>
                                    <div>
                                        <h3>Guide teams across the full agent lifecycle</h3>
                                        <p>Move from idea to design, build, test, deployment, and optimization with Arch
                                            guiding every step.</p>
                                    </div>
                                    <div>
                                        <h3>Reuse proven patterns</h3>
                                        <p>Start from tested agent architectures instead of reinventing topology, tools,
                                            policies, and handoffs for every use case.</p>
                                    </div>
                                    <div>
                                        <h3>Generate agents built to ship</h3>
                                        <p>Arch creates ABL, so every agent is structured, validated, governed, and
                                            observable.</p>
                                    </div>
                                    <div>
                                        <h3>Improve with every run</h3>
                                        <p>Arch uses traces, performance signals, policy checks, and changing
                                            requirements to recommend and apply improvements continuously to improve
                                            business outcomes.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-modal-col">
                                <div data-wf--image--variant="portrait-3-4" style="min-height:100%"
                                    class="k2-img-wrapper w-variant-08ed6631-47c5-8b85-b065-595993bed9c8"><img
                                        decoding="async"
                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a1053024c22fd8e8fe6c2d6_arch-advantage.webp"
                                        loading="lazy" alt="" class="k2-img"></div>
                            </div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-4"
                            style="transition-delay: 500ms; animation-delay: 500ms;">
                            <div class="k2-pillars-how-header">
                                <div data-op="100" data-mw="100" data-wf--heading--variant="h2"
                                    class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                    <h2>How it works</h2>
                                </div>
                            </div>
                            <div class="k2-pillars-how-tags">
                                <div data-wf--eyebrow--variant="medium" style="text-transform:none"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div class="k2-eyebrow-mark"></div>
                                    <div>The Builder</div>
                                </div>
                                <div data-wf--eyebrow--variant="medium"
                                    class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                                    <div data-color="purple" class="k2-eyebrow-mark"></div>
                                    <div>Arch\u2122</div>
                                </div>
                            </div>
                            <div data-wf--image--variant="landscape-16-9" style="object-fit:contain"
                                class="k2-img-wrapper w-variant-0144d365-ab67-29af-ca32-5f01095df836"><img
                                    decoding="async"
                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a0eac56f0c9fc2234b79909_arch-how-it-works.webp"
                                    loading="lazy" alt="" class="k2-img"></div>
                        </div>
                        <div class="k2-modal-row k2-modal-row-5"
                            style="transition-delay: 600ms; animation-delay: 600ms;">
                            <div class="k2-logomark w-embed"><svg style="overflow:visible" viewBox="0 0 59 59"
                                    fill="currentColor">
                                    <path
                                        d="M8.988 8.447C18.135-.526 31.672-2.542 43.012 3.321c2.561 1.281 4.941 3.115 7.134 5.127 6.221 6.044 9.146 14.104 8.778 22.164-.731-4.763-3.111-9.341-6.767-13.005-9.514-9.522-24.877-9.522-34.391 0-6.403 6.412-6.403 17.033 0 23.626 2.38 2.38 5.304 4.028 8.415 4.577-6.221.55-12.62-1.467-17.379-6.226C.206 31.161.206 17.239 8.621 8.815l.182-.182.182-.182.004-.004zm41.135 41.944C44.637 55.885 37.134 59 29.451 59s-15.182-3.115-20.854-8.61C3.111 44.896 0 37.386 0 29.512v-1.467c.731 4.763 3.111 9.522 6.767 13.187a24.05 24.05 0 0 0 17.194 7.143c5.672 0 11.158-2.016 15.368-5.494.55-.549 1.281-1.099 1.83-1.648l.182-.182c6.403-6.593 6.403-16.851 0-23.263-2.194-2.198-4.755-3.664-7.684-4.396h1.462c5.854 0 11.158 2.38 15.182 6.593 8.047 8.242 8.233 21.429.368 29.856 0 0 0 .182-.182.182l-.368.368h.004z">
                                    </path>
                                </svg></div>
                            <div data-op="100" data-mw="100" data-wf--heading--variant="h4"
                                class="k2-heading w-variant-41a52ffe-b74e-9c50-c4c3-ed6d86e7614d w-richtext">
                                <h2>Get started with {&nbsp;Artemis&nbsp;}</h2>
                            </div>
                            <div data-wf--cta--variant="black"
                                class="k2-cta w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                <div class="k2-clickable"><a aria-label="Get demo"
                                        data-wf-native-id-path="f7dbb59f-54b2-58dc-d75a-5f1239cf7de9:2feee01b-0297-ea0a-0af0-829fdaea0f75_instance-1:6d131e9e-249b-9bfd-c8f6-275299f65082_instance-1:6d131e9e-249b-9bfd-c8f6-275299f65084_instance-1"
                                        data-wf-ao-click-engagement-tracking="true"
                                        data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                        data-wf-cms-context="%5B%7B%22collectionId%22%3A%226a0ea740053efebac0719c51%22%2C%22itemId%22%3A%226a0ea8f647684cfb0f87633c%22%7D%5D"
                                        data-wf-component-context="%5B%7B%22componentId%22%3A%222feee01b-0297-ea0a-0af0-829fdaea0f4f%22%2C%22instanceId%22%3A%22f7dbb59f-54b2-58dc-d75a-5f1239cf7de9%22%7D%2C%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%222feee01b-0297-ea0a-0af0-829fdaea0f75%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                        href="/get-a-demo-artemis" class="k2-action w-inline-block"></a></div>
                                <div aria-hidden="true" class="k2-cta-text">Get demo</div>
                                <div aria-hidden="true"
                                    class="k2-cta-icon w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                    <div data-wf--icon---arrow--variant="base" class="k2-icon-arrow w-embed"><svg
                                            viewBox="0 0 22 19" fill="currentColor">
                                            <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                            <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                            <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                            <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                            <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                            <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                            <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                            <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                            <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                            <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                            <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                            <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                        </svg></div>
                                </div>
                            </div>
                            <div data-op="100" data-font-weight="300" data-mw="100" data-wf--paragraph--variant="base"
                                class="k2-text w-richtext">
                                <p>Start AI-programming your next AI&nbsp;Agents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        "}] as const

export const KORE_AI_SECTIONS = [

  { name: "KoreMeetArtemisSection", source: "meet-artemis", tag: "section", attrs: {"id": "meet-artemis", "data-scroll": "", "className": "k2-section k2-section-hero on"}, html: "
                <div class="k2-bg">
                    <div data-wf--image--variant="hero" data-unscale=""
                        class="k2-img-wrapper w-variant-6caae8cc-b03c-2d74-3ebd-16833ce90397"><img fetchpriority="high"
                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0492517357867bd2ef180f_k2-hero.webp"
                            loading="eager" alt="" class="k2-img"></div>
                    <div class="k2-overlay"></div>
                </div>
                <div class="k2-container k2-container-hero">
                    <div class="k2-hero">
                        <div data-split="words,chars" data-mw="100" data-op="100" data-color="green-light"
                            data-wf--paragraph--variant="label"
                            class="k2-text w-variant-4e94cbd2-62e7-c052-8b05-c8aa5de6d8c5 w-richtext" style="--n: 20;">
                            <p><span class="word" style="display: inline-block;"><span class="char"
                                        style="display: inline-block; --i: 0;">K</span><span class="char"
                                        style="display: inline-block; --i: 1;">o</span><span class="char"
                                        style="display: inline-block; --i: 2;">r</span><span class="char"
                                        style="display: inline-block; --i: 3;">e</span><span class="char"
                                        style="display: inline-block; --i: 4;">.</span><span class="char"
                                        style="display: inline-block; --i: 5;">a</span><span class="char"
                                        style="display: inline-block; --i: 6;">i</span></span> <span class="word"
                                    style="display: inline-block;"><span class="char"
                                        style="display: inline-block; --i: 7;">A</span><span class="char"
                                        style="display: inline-block; --i: 8;">g</span><span class="char"
                                        style="display: inline-block; --i: 9;">e</span><span class="char"
                                        style="display: inline-block; --i: 10;">n</span><span class="char"
                                        style="display: inline-block; --i: 11;">t</span></span> <span class="word"
                                    style="display: inline-block;"><span class="char"
                                        style="display: inline-block; --i: 12;">P</span><span class="char"
                                        style="display: inline-block; --i: 13;">l</span><span class="char"
                                        style="display: inline-block; --i: 14;">a</span><span class="char"
                                        style="display: inline-block; --i: 15;">t</span><span class="char"
                                        style="display: inline-block; --i: 16;">f</span><span class="char"
                                        style="display: inline-block; --i: 17;">o</span><span class="char"
                                        style="display: inline-block; --i: 18;">r</span><span class="char"
                                        style="display: inline-block; --i: 19;">m</span></span></p>
                        </div>
                        <div class="k2-hero">
                            <div data-flip-target="loader" data-font-style="italic" data-mw="100" data-op="100"
                                data-split="words,chars" data-wf--heading--variant="h1"
                                class="k2-heading w-variant-14221f46-b77f-f549-1365-c3cf0146a3ed w-richtext"
                                style="visibility: visible;">
                                <p><span class="word" style="display: inline-block;"><span class="char"
                                            style="display: inline-block; --i: 0;">M</span><span class="char"
                                            style="display: inline-block; --i: 1;">e</span><span class="char"
                                            style="display: inline-block; --i: 2;">e</span><span class="char"
                                            style="display: inline-block; --i: 3;">t</span></span> <em
                                        style="display: inline-block; position: relative;"><span class="word"
                                            style="display: inline-block;"><span class="char"
                                                style="display: inline-block; --i: 0;">{</span></span> <sup
                                            style="display: inline-block; position: relative;"><span class="word"
                                                style="display: inline-block;"><span class="char"
                                                    style="display: inline-block; --i: 0;">A</span><span class="char"
                                                    style="display: inline-block; --i: 1;">r</span><span class="char"
                                                    style="display: inline-block; --i: 2;">t</span><span class="char"
                                                    style="display: inline-block; --i: 3;">e</span><span class="char"
                                                    style="display: inline-block; --i: 4;">m</span><span class="char"
                                                    style="display: inline-block; --i: 5;">i</span><span class="char"
                                                    style="display: inline-block; --i: 6;">s</span></span></sup> <span
                                            class="word" style="display: inline-block;"><span class="char"
                                                style="display: inline-block; --i: 0;">}</span></span></em></p>
                            </div>
                            <div data-stagger="300">
                                <div data-op="100" data-mw="100" data-wf--heading--variant="display-4"
                                    class="k2-heading w-variant-a99798b7-ba2e-447c-08ca-de2b7acb44dc w-richtext">
                                    <h1>The AI-programmable platform for the agentic enterprise</h1>
                                </div>
                                <div data-op="100" data-font-style="italic" data-mw="55"
                                    data-wf--heading--variant="display-4"
                                    class="k2-heading w-variant-a99798b7-ba2e-447c-08ca-de2b7acb44dc w-richtext"
                                    style="transition-delay: 300ms; animation-delay: 300ms;">
                                    <p><em>The foundation for building AI agents with certainty.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="k2-container k2-container-hero-2">
                    <div data-stagger="200/400" class="k2-hero-2">
                        <div data-op="70" data-font-weight="300" data-mw="100" data-wf--paragraph--variant="medium"
                            class="k2-text w-variant-02404dae-b9b0-4e85-c5f5-f41da6cf14a9 w-richtext"
                            style="transition-delay: 400ms; animation-delay: 400ms;">
                            <p>Built with AI from the ground up { <strong>Artemis</strong> } leverages years of
                                enterprise experience. Agents running on { <strong>Artemis </strong>} thrive in complex,
                                high volume, regulated workflows where other agents break. This is the AI-native
                                platform that experience made possible.</p>
                        </div>
                        <div data-wf--cta--variant="white" class="k2-cta w-variant-324d61ef-5935-7d9b-deaa-ee6d974aa212"
                            style="transition-delay: 600ms; animation-delay: 600ms;">
                            <div class="k2-clickable"><a aria-label="Get Demo"
                                    data-wf-native-id-path="74f5a579-fcea-fbaa-27f7-baf87dcc726c:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                    data-wf-ao-click-engagement-tracking="true"
                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2274f5a579-fcea-fbaa-27f7-baf87dcc726c%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a></div>
                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                            <div aria-hidden="true" class="k2-cta-icon w-variant-324d61ef-5935-7d9b-deaa-ee6d974aa212">
                                <div data-wf--icon---arrow--variant="base" class="k2-icon-arrow w-embed"><svg
                                        viewBox="0 0 22 19" fill="currentColor">
                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                    </svg></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-stagger="200/600" class="k2-container">
                    <div data-autoplay="" class="k2-tabs" data-k2-init="true"
                        style="transition-delay: 600ms; animation-delay: 600ms;">
                        <div class="k2-tabs-menu" role="tablist"><button data-wf--tabs---button--variant="base"
                                type="button" class="k2-tabs-btn on" id="tabs-1-tab-1" role="tab"
                                aria-controls="tabs-1-tab-1-panel" aria-selected="true" tabindex="0" style="--p: 0;">
                                <div data-scramble="">{ Build }</div>
                            </button><button data-wf--tabs---button--variant="base" type="button" class="k2-tabs-btn"
                                id="tabs-1-tab-2" role="tab" aria-controls="tabs-1-tab-2-panel" aria-selected="false"
                                tabindex="-1" style="--p: 0;">
                                <div data-scramble="">{ Scale }</div>
                            </button><button data-wf--tabs---button--variant="base" type="button" class="k2-tabs-btn"
                                id="tabs-1-tab-3" role="tab" aria-controls="tabs-1-tab-3-panel" aria-selected="false"
                                tabindex="-1" style="--p: 0;">
                                <div data-scramble="">{ Optimize }</div>
                            </button></div>
                        <div class="k2-tabs-panels">
                            <div class="k2-tabs-panel on" id="tabs-1-tab-1-panel" role="tabpanel"
                                aria-labelledby="tabs-1-tab-1">
                                <div class="k2-placeholder for-build">
                                    <div data-delay="" rive-target=""
                                        data-rive-src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a15972d945f9408ee044dd8_Build_Full%20V4.riv"
                                        data-wf--rive-element--select-size="base"
                                        class="featured-block-img v4 height-100"><canvas class="rive-canvas"
                                            width="6040" height="2296"
                                            style="display: block; width: 3020px; height: 1148px; opacity: 0; transition: opacity 0.35s; will-change: opacity;"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel" id="tabs-1-tab-2-panel" role="tabpanel"
                                aria-labelledby="tabs-1-tab-2" inert="">
                                <div class="k2-placeholder for-scale">
                                    <div data-delay="" rive-target=""
                                        data-rive-src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a1417303f6e8503a85caddb_Scale_Full%20V2.riv"
                                        data-wf--rive-element--select-size="base"
                                        class="featured-block-img v4 height-100"><canvas class="rive-canvas" width="1"
                                            height="1"
                                            style="display: block; width: 1px; height: 1px; opacity: 0; transition: opacity 0.35s; will-change: opacity;"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel" id="tabs-1-tab-3-panel" role="tabpanel"
                                aria-labelledby="tabs-1-tab-3" inert="">
                                <div class="k2-placeholder for-optimize">
                                    <div data-delay="" rive-target=""
                                        data-rive-src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a15999912b3f274de2ae25f_Optimize_Full%20V4.riv"
                                        data-wf--rive-element--select-size="base"
                                        class="featured-block-img v4 height-100"><canvas class="rive-canvas" width="1"
                                            height="1"
                                            style="display: block; width: 1px; height: 1px; opacity: 0; transition: opacity 0.35s; will-change: opacity;"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            " },

  { name: "KoreEnterpriseAiOutcomesSection", source: "enterprise-ai-outcomes", tag: "section", attrs: {"id": "enterprise-ai-outcomes", "className": "k2-section k2-section-cards", "style": "--n: 3; --h: 2052.36px; --copy-top: 1024.05px;"}, html: "
                <div data-scroll-end="80vh" data-scroll-progress="" class="k2-cards-wrapper" style="--p: 0.9301;">
                    <div class="k2-cards-sticky">
                        <div data-progress="" class="k2-container k2-container-cards-header">
                            <div class="k2-cards-header">
                                <div data-wf--image--variant="square-1-1" style="max-width:6.25rem"
                                    class="k2-img-wrapper w-variant-3228b899-747d-f671-0b6f-59c395a6b5ad"><img
                                        decoding="async"
                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a05fa08754882ab91c980e6_comet.svg"
                                        loading="lazy" alt="" class="k2-img"></div>
                                <div data-scroll="" data-mw="100" data-op="100" data-split=""
                                    data-wf--heading--variant="h2"
                                    class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext on">
                                    <h2><span class="line"
                                            style="display: block; text-align: start; width: 100%; --i: 0;">What {
                                            <strong style="display: inline-block; position: relative;">Artemis</strong>
                                            }</span><span class="line"
                                            style="display: block; text-align: start; width: 100%; --i: 1;"><em
                                                style="display: inline-block; position: relative;">changes</em> for
                                            enterprise AI</span></h2>
                                </div>
                            </div>
                        </div>
                        <div class="k2-container k2-container-cards">
                            <div class="k2-cards">
                                <div class="k2-card-item" style="--i: 0;">
                                    <div class="k2-card">
                                        <div class="k2-card-media">
                                            <div data-wf--image--variant="square-1-1"
                                                class="k2-img-wrapper w-variant-3228b899-747d-f671-0b6f-59c395a6b5ad">
                                                <img decoding="async"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0c0e4de7656dee6d330b2c_value.svg"
                                                    loading="lazy" alt="" class="k2-img">
                                            </div>
                                        </div>
                                        <div class="k2-card-copy">
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="h6"
                                                class="k2-heading w-variant-134f9f93-4936-796e-a3f9-5b6e699b3550 w-richtext">
                                                <h3>{ Outcomes in days }</h3>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>{ Artemis } handles the infrastructure; your team starts at the
                                                    business logic. Team focuses on outcomes. Agents ship faster.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-card-number">
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="display-2"
                                            class="k2-text w-variant-03437080-f831-9f31-89fa-6283b7059027 w-richtext">
                                            <p>5x</p>
                                        </div>
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="h6"
                                            class="k2-text w-variant-bbfef6a7-aa6f-3ceb-4ae0-5819087e510e w-richtext">
                                            <p>faster time to value</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-card-item" style="--i: 1;">
                                    <div class="k2-card">
                                        <div class="k2-card-media">
                                            <div data-wf--image--variant="square-1-1"
                                                class="k2-img-wrapper w-variant-3228b899-747d-f671-0b6f-59c395a6b5ad">
                                                <img decoding="async"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0c0e51ce7260a2cb825b5e_scale.svg"
                                                    loading="lazy" alt="" class="k2-img">
                                            </div>
                                        </div>
                                        <div class="k2-card-copy">
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="h6"
                                                class="k2-heading w-variant-134f9f93-4936-796e-a3f9-5b6e699b3550 w-richtext">
                                                <h3>{ Predictability at Scale }</h3>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>Every agent is clearly defined, tested, and validated before
                                                    deployment, so what works in design does not break in production.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-card-number">
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="display-2"
                                            class="k2-text w-variant-03437080-f831-9f31-89fa-6283b7059027 w-richtext">
                                            <p>No</p>
                                        </div>
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="h6"
                                            class="k2-text w-variant-bbfef6a7-aa6f-3ceb-4ae0-5819087e510e w-richtext">
                                            <p>surprises in production</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-card-item" style="--i: 2;">
                                    <div class="k2-card">
                                        <div class="k2-card-media">
                                            <div data-wf--image--variant="square-1-1"
                                                class="k2-img-wrapper w-variant-3228b899-747d-f671-0b6f-59c395a6b5ad">
                                                <img decoding="async"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a06dbc247ccaaf54ed093f1_security.svg"
                                                    loading="lazy" alt="" class="k2-img">
                                            </div>
                                        </div>
                                        <div class="k2-card-copy">
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="h6"
                                                class="k2-heading w-variant-134f9f93-4936-796e-a3f9-5b6e699b3550 w-richtext">
                                                <h3>{ Security + Governance }</h3>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>Every action stays within approved policies and boundaries, with full
                                                    visibility into what happened and why.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-card-number">
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="display-2"
                                            class="k2-text w-variant-03437080-f831-9f31-89fa-6283b7059027 w-richtext">
                                            <p>Zero</p>
                                        </div>
                                        <div data-op="100" data-font-weight="500" data-mw="100"
                                            data-wf--paragraph--variant="h6"
                                            class="k2-text w-variant-bbfef6a7-aa6f-3ceb-4ae0-5819087e510e w-richtext">
                                            <p>unauthorized agent actions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="k2-cards-footer">
                    <div data-scroll="20vh" data-mw="100" data-op="100" data-split=""
                        data-wf--heading--variant="display-1"
                        class="k2-heading w-variant-b8037af9-0c31-33c6-fdfd-3ef99113e090 w-richtext on">
                        <p><span class="line" style="display: block; text-align: start; width: 100%; --i: 0;"><sub
                                    style="display: inline-block; position: relative;">{</sub>Artemis<sub
                                    style="display: inline-block; position: relative;">}</sub></span><span class="line"
                                style="display: block; text-align: start; width: 100%; --i: 1;">delivers</span><span
                                class="line" style="display: block; text-align: start; width: 100%; --i: 2;"><em
                                    style="display: inline-block; position: relative;">certainty</em></span></p>
                    </div>
                </div>
            " },

  { name: "KoreAiAgentsSection", source: "ai-agents", tag: "section", attrs: {"id": "ai-agents", "className": "k2-section k2-section-agents"}, html: "
                    <div class="k2-container k2-container-agents">
                        <div data-scroll="20vh" class="k2-tabs on" data-k2-init="true">
                            <div class="k2-tabs-menu" role="tablist"><button data-wf--tabs---button--variant="base"
                                    type="button" class="k2-tabs-btn on" id="tabs-2-tab-1" role="tab"
                                    aria-controls="tabs-2-tab-1-panel" aria-selected="true" tabindex="0"
                                    style="--p: 0;">
                                    <div data-scramble="">{ technical leader }</div>
                                </button><button data-wf--tabs---button--variant="base" type="button"
                                    class="k2-tabs-btn" id="tabs-2-tab-2" role="tab" aria-controls="tabs-2-tab-2-panel"
                                    aria-selected="false" tabindex="-1" style="--p: 0;">
                                    <div data-scramble="">{ business leader }</div>
                                </button></div>
                            <div class="k2-tabs-panels k2-tabs-panels-agents">
                                <div class="k2-tabs-panel k2-tabs-panel-agents on" id="tabs-2-tab-1-panel"
                                    role="tabpanel" aria-labelledby="tabs-2-tab-1">
                                    <div class="k2-bg">
                                        <div data-wf--image--variant="background"
                                            class="k2-img-wrapper w-variant-ceaf896a-18cf-914c-cbb4-88ae1c1e41ba"><img
                                                decoding="async"
                                                src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0d740ea150c2eed21ad614_agents-1.webp"
                                                loading="lazy" alt="" class="k2-img"></div>
                                    </div>
                                    <div data-stagger="200" class="k2-agents-panel">
                                        <div class="k2-agents-header">
                                            <div data-trim="" data-mw="100" data-op="100" data-color="green-dark"
                                                data-split="" data-wf--heading--variant="display-3"
                                                class="k2-heading w-variant-bd560089-2f5c-eb2a-3547-cac79c99297a w-richtext">
                                                <h2><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 0;">No
                                                        more</span><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 1;">{it
                                                        worked} in</span><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 2;">the
                                                        [Demo]</span></h2>
                                            </div>
                                        </div>
                                        <div data-stagger="200/200" class="k2-agents-content"
                                            style="transition-delay: 200ms; animation-delay: 200ms;">
                                            <div data-op="70" data-mw="100" data-wf--paragraph--variant="base"
                                                class="k2-text w-richtext"
                                                style="transition-delay: 200ms; animation-delay: 200ms;">
                                                <p>{ <strong>Artemis</strong> } has compiled IR, explicit memory
                                                    contracts, typed trace events for every decision, cycle detection,
                                                    and real observability.</p>
                                            </div>
                                            <div data-wf--cta--variant="black"
                                                class="k2-cta w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120"
                                                style="transition-delay: 400ms; animation-delay: 400ms;">
                                                <div class="k2-clickable"><a aria-label="Get Demo"
                                                        data-wf-native-id-path="b846dc04-301b-e706-efe4-32f5aba62180:c4b84c02-0138-c05a-5e64-29e15addb09d:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                        data-wf-ao-click-engagement-tracking="true"
                                                        data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c4b84c02-0138-c05a-5e64-29e15addb090%22%2C%22instanceId%22%3A%22b846dc04-301b-e706-efe4-32f5aba62180%22%7D%2C%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%22c4b84c02-0138-c05a-5e64-29e15addb09d%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                        href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                                </div>
                                                <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                                <div aria-hidden="true"
                                                    class="k2-cta-icon w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                                    <div data-wf--icon---arrow--variant="base"
                                                        class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                            fill="currentColor">
                                                            <circle cx="0.795" cy="9.701" r="0.76" style="--i:0">
                                                            </circle>
                                                            <circle cx="4.465" cy="9.701" r="0.76" style="--i:1">
                                                            </circle>
                                                            <circle cx="8.135" cy="9.701" r="0.76" style="--i:2">
                                                            </circle>
                                                            <circle cx="11.805" cy="9.701" r="0.76" style="--i:3">
                                                            </circle>
                                                            <circle cx="15.475" cy="9.701" r="0.76" style="--i:4">
                                                            </circle>

                                                            <circle cx="12.431" cy="17.861" r="0.76" style="--i:3">
                                                            </circle>
                                                            <circle cx="15.005" cy="15.246" r="0.76" style="--i:4">
                                                            </circle>
                                                            <circle cx="17.580" cy="12.630" r="0.76" style="--i:5">
                                                            </circle>
                                                            <circle cx="20.155" cy="10.015" r="0.76" style="--i:6">
                                                            </circle>

                                                            <circle cx="18.199" cy="7.400" r="0.76" style="--i:5">
                                                            </circle>
                                                            <circle cx="15.624" cy="4.784" r="0.76" style="--i:4">
                                                            </circle>
                                                            <circle cx="13.050" cy="2.169" r="0.76" style="--i:3">
                                                            </circle>
                                                        </svg></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-wf--image--variant="agent-1"
                                            class="k2-img-wrapper w-variant-0d4b44dd-bdd2-5fff-bf07-25f61f56446c"
                                            style="transition-delay: 400ms; animation-delay: 400ms;"><img
                                                decoding="async"
                                                src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0d74c8ccd1edf661f5e0b7_agents-object-1.webp"
                                                loading="lazy" alt="" class="k2-img"></div>
                                    </div>
                                </div>
                                <div class="k2-tabs-panel k2-tabs-panel-agents" id="tabs-2-tab-2-panel" role="tabpanel"
                                    aria-labelledby="tabs-2-tab-2" inert="">
                                    <div class="k2-bg">
                                        <div data-wf--image--variant="background"
                                            class="k2-img-wrapper w-variant-ceaf896a-18cf-914c-cbb4-88ae1c1e41ba"><img
                                                decoding="async"
                                                src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0db21491108b8576c9ab90_agents-bg-2.webp"
                                                loading="lazy" alt="" class="k2-img"></div>
                                    </div>
                                    <div data-stagger="200" class="k2-agents-panel">
                                        <div class="k2-agents-header">
                                            <div data-trim="" data-mw="100" data-op="100" data-color="green-dark"
                                                data-split="" data-wf--heading--variant="display-3"
                                                class="k2-heading w-variant-bd560089-2f5c-eb2a-3547-cac79c99297a w-richtext">
                                                <h2><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 0;">AI
                                                        agents</span><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 1;">that
                                                        move</span><span class="line"
                                                        style="display: block; text-align: start; width: 100%; --i: 2;">metrics</span>
                                                </h2>
                                            </div>
                                        </div>
                                        <div data-stagger="200/200" class="k2-agents-content"
                                            style="transition-delay: 200ms; animation-delay: 200ms;">
                                            <div data-op="70" data-mw="100" data-wf--paragraph--variant="base"
                                                class="k2-text w-richtext"
                                                style="transition-delay: 200ms; animation-delay: 200ms;">
                                                <p>{ <strong>Artemis</strong> } delivers reliability across complex,
                                                    high-volume, regulated workflows, continuously running, testing, and
                                                    optimizing the metrics that matter.</p>
                                            </div>
                                            <div data-wf--cta--variant="black"
                                                class="k2-cta w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120"
                                                style="transition-delay: 400ms; animation-delay: 400ms;">
                                                <div class="k2-clickable"><a aria-label="Get Demo"
                                                        data-wf-native-id-path="b846dc04-301b-e706-efe4-32f5aba6218c:c4b84c02-0138-c05a-5e64-29e15addb09d:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                        data-wf-ao-click-engagement-tracking="true"
                                                        data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                        data-wf-component-context="%5B%7B%22componentId%22%3A%22c4b84c02-0138-c05a-5e64-29e15addb090%22%2C%22instanceId%22%3A%22b846dc04-301b-e706-efe4-32f5aba6218c%22%7D%2C%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%22c4b84c02-0138-c05a-5e64-29e15addb09d%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                        href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                                </div>
                                                <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                                <div aria-hidden="true"
                                                    class="k2-cta-icon w-variant-cf183fa1-cc13-17cc-02f3-4cd31a749120">
                                                    <div data-wf--icon---arrow--variant="base"
                                                        class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                            fill="currentColor">
                                                            <circle cx="0.795" cy="9.701" r="0.76" style="--i:0">
                                                            </circle>
                                                            <circle cx="4.465" cy="9.701" r="0.76" style="--i:1">
                                                            </circle>
                                                            <circle cx="8.135" cy="9.701" r="0.76" style="--i:2">
                                                            </circle>
                                                            <circle cx="11.805" cy="9.701" r="0.76" style="--i:3">
                                                            </circle>
                                                            <circle cx="15.475" cy="9.701" r="0.76" style="--i:4">
                                                            </circle>

                                                            <circle cx="12.431" cy="17.861" r="0.76" style="--i:3">
                                                            </circle>
                                                            <circle cx="15.005" cy="15.246" r="0.76" style="--i:4">
                                                            </circle>
                                                            <circle cx="17.580" cy="12.630" r="0.76" style="--i:5">
                                                            </circle>
                                                            <circle cx="20.155" cy="10.015" r="0.76" style="--i:6">
                                                            </circle>

                                                            <circle cx="18.199" cy="7.400" r="0.76" style="--i:5">
                                                            </circle>
                                                            <circle cx="15.624" cy="4.784" r="0.76" style="--i:4">
                                                            </circle>
                                                            <circle cx="13.050" cy="2.169" r="0.76" style="--i:3">
                                                            </circle>
                                                        </svg></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-wf--image--variant="agent-2"
                                            class="k2-img-wrapper w-variant-5d8a354a-7291-b6f3-e48b-9fc545d53e94"
                                            style="transition-delay: 400ms; animation-delay: 400ms;"><img
                                                decoding="async"
                                                src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0db2136543611bb983dbb6_agents-object-2.webp"
                                                loading="lazy" alt="" class="k2-img"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                " },

  { name: "KoreAiProgrammableSection", source: "ai-programmable", tag: "section", attrs: {"id": "ai-programmable", "className": "k2-section k2-section-orbit"}, html: "
                    <div class="k2-code w-embed">
                        <style>
                            /* Orbit */
                            .k2-orbit svg {
                                overflow: visible
                            }

                            .wf-design-mode :is(.k2-orbit-sticky-wrapper, .k2-orbit-steps) {
                                height: auto
                            }

                            .wf-design-mode .k2-orbit-sticky {
                                position: static
                            }

                            .k2-orbit-button::before {
                                content: "";
                                position: absolute;
                                inset: -50%
                            }

                            .k2-orbit-button.w--current {
                                width: 2rem;
                                opacity: 1
                            }

                            /* Desktop */
                            @media screen and (min-width:991px) {

                                .k2-orbit>*,
                                .k2-orbit-content>* {
                                    transition: opacity .5s, transform 1s var(--ease)
                                }

                                .k2-orbit-content>* {
                                    transition-duration: .3s
                                }

                                .k2-orbit-content::before {
                                    content: none
                                }

                                html:not(.wf-design-mode) .k2-orbit-content>:last-child {
                                    opacity: 0
                                }

                                [data-step="1"] .k2-orbit:nth-child(1)>.k2-orbit-content {
                                    transform: translate3d(100%, 20%, 0)
                                }

                                [data-step="1"] .k2-orbit:nth-child(1)>.k2-orbit-content>:last-child {
                                    opacity: 1;
                                    transition-delay: .3s
                                }

                                [data-step="1"] .k2-orbit:nth-child(1)>.k2-orbit-circle {
                                    transform: translate3d(0%, 0, 0) scale(1.5)
                                }

                                [data-step="1"] .k2-orbit:not(:nth-child(1))>.k2-orbit-content {
                                    opacity: 0
                                }

                                [data-step="1"] .k2-orbit:not(:nth-child(1))>.k2-orbit-circle {
                                    transform: translate3d(6.5rem, 4rem, 0)
                                }

                                [data-step="2"] .k2-orbit:nth-child(2)>.k2-orbit-content {
                                    transform: translate3d(-70%, -170%, 0)
                                }

                                [data-step="2"] .k2-orbit:nth-child(2)>.k2-orbit-content>:last-child {
                                    opacity: 1;
                                    transition-delay: .3s
                                }

                                [data-step="2"] .k2-orbit:nth-child(2)>.k2-orbit-circle {
                                    transform: translate3d(-20%, 0, 0) scale(1.5)
                                }

                                [data-step="2"] .k2-orbit:not(:nth-child(2))>.k2-orbit-content {
                                    opacity: 0
                                }

                                [data-step="2"] .k2-orbit:not(:nth-child(2))>.k2-orbit-circle {
                                    transform: translate3d(5rem, 0, 0)
                                }

                                [data-step="2"] .k2-orbit:nth-child(1)>.k2-orbit-circle {
                                    transform: translate3d(15rem, -7.625rem, 0)
                                }

                                [data-step="3"] .k2-orbit:nth-child(3)>.k2-orbit-content {
                                    transform: translate3d(-100%, 150%, 0)
                                }

                                [data-step="3"] .k2-orbit:nth-child(3)>.k2-orbit-content>:last-child {
                                    opacity: 1;
                                    transition-delay: .3s
                                }

                                [data-step="3"] .k2-orbit:nth-child(3)>.k2-orbit-circle {
                                    transform: translate3d(0, 27%, 0) rotate(90deg) scale(1.5)
                                }

                                [data-step="3"] .k2-orbit:not(:nth-child(3))>.k2-orbit-content {
                                    opacity: 0
                                }

                                [data-step="3"] .k2-orbit:not(:nth-child(3))>.k2-orbit-circle {
                                    transform: translate3d(-5rem, 0, 0)
                                }

                                [data-step="3"] .k2-orbit:nth-child(2)>.k2-orbit-circle {
                                    transform: translate3d(-5rem, -15rem, 0) rotate(180deg)
                                }

                                :is([data-step="2"], [data-step="3"]) .k2-orbit-circle-1 {
                                    z-index: 1
                                }
                            }

                            /* Tablet-Mobile */
                            @media screen and (max-width:991px) {
                                .k2-orbit-circle circle:last-child {
                                    stroke: currentColor;
                                    stroke-width: 1px;
                                    fill: #fef8ee;
                                    transition: fill .5s
                                }

                                .k2-orbit:nth-child(2) .k2-orbit-circle circle:last-child {
                                    transform-origin: 50% 100%;
                                    transform: scale(1.25)
                                }

                                .k2-orbit:nth-child(3) .k2-orbit-circle circle:last-child {
                                    transform-origin: 90% 20%;
                                    transform: scale(1.75)
                                }

                                :is([data-step="1"] .k2-orbit:nth-child(1),
                                    [data-step="2"] .k2-orbit:nth-child(2),
                                    [data-step="3"] .k2-orbit:nth-child(3)) circle:last-child {
                                    fill: #8dd975
                                }

                                .k2-orbit-circle svg {
                                    transition: transform 1s var(--ease)
                                }

                                .k2-orbit:nth-child(1) .k2-orbit-circle svg {
                                    transform: rotate(40deg)
                                }

                                .k2-orbit:nth-child(2) .k2-orbit-circle svg {
                                    transform: rotate(40deg)
                                }

                                .k2-orbit:nth-child(3) .k2-orbit-circle svg {
                                    transform: rotate(20deg)
                                }

                                [data-step="1"] .k2-orbit:nth-child(1) .k2-orbit-circle svg,
                                [data-step="2"] .k2-orbit:nth-child(2) .k2-orbit-circle svg {
                                    transform: none
                                }

                                [data-step="3"] .k2-orbit:nth-child(3) .k2-orbit-circle svg {
                                    transform: rotate(70deg)
                                }

                                html:not(.wf-design-mode) .k2-orbit-content {
                                    opacity: 0
                                }

                                .k2-orbit-content {
                                    transition: opacity .5s, transform 1s var(--ease)
                                }

                                :is([data-step="1"] .k2-orbit:nth-child(1),
                                    [data-step="2"] .k2-orbit:nth-child(2),
                                    [data-step="3"] .k2-orbit:nth-child(3))>.k2-orbit-content {
                                    opacity: 1;
                                    transform: none
                                }

                                .k2-orbit-step:last-child {
                                    max-height: 75svh
                                }
                            }
                        </style>
                    </div>
                    <div class="k2-container k2-container-header">
                        <div data-scroll="" data-mw="45" data-op="100" data-color="green-dark" data-split=""
                            data-wf--heading--variant="h2"
                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext on">
                            <h2><span class="line"
                                    style="display: block; text-align: start; width: 100%; --i: 0;"><strong
                                        style="display: inline-block; position: relative;">{ Artemis }</strong> is
                                    designed for what</span><span class="line"
                                    style="display: block; text-align: start; width: 100%; --i: 1;"><em
                                        style="display: inline-block; position: relative;">actually matters</em> to an
                                    enterprise</span></h2>
                        </div>
                    </div>
                    <div class="k2-container k2-container-orbit">
                        <div data-color="green-dark" data-mw="45" data-op="100" data-wf--heading--variant="16-32"
                            class="k2-heading w-variant-b705f7f8-2081-c260-cc10-d749979fe20b w-richtext">
                            <p><em>AI&nbsp;Programmable</em> is the new AI advantage</p>
                        </div>
                        <div class="k2-orbit-sticky-wrapper">
                            <div class="k2-orbit-sticky" data-step="0">
                                <div style="--w:min(80vw, 28.1875rem)" class="k2-orbit-wrapper">
                                    <div class="k2-orbit k2-orbit-1">
                                        <div class="k2-orbit-circle k2-orbit-circle-1 w-embed"><svg
                                                viewBox="0 0 451 451" fill="none">
                                                <circle cx="225.375" cy="225.375" r="225.145" fill="#fef8ee"
                                                    fill-opacity=".2"></circle>
                                                <circle cx="225.375" cy="225.375" r="225.145" fill="#fef3e0"
                                                    fill-opacity=".2"></circle>
                                                <circle cx="225.375" cy="225.375" r="225.145" stroke="#000"
                                                    stroke-width=".461"></circle>
                                                <circle cx="53.191" cy="79.759" r="5.96" fill="#000"></circle>
                                            </svg></div>
                                        <div class="k2-orbit-content k2-orbit-content-1">
                                            <div data-wf--eyebrow--variant="orbit"
                                                class="k2-eyebrow w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                <div
                                                    class="k2-eyebrow-mark w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                </div>
                                                <div>Get to ROI faster</div>
                                            </div>
                                            <div data-op="100" data-font-weight="500" data-mw="100"
                                                data-wf--paragraph--variant="16-24"
                                                class="k2-text w-variant-9495d074-2508-bce1-60b8-6adade9e7dab w-richtext">
                                                <p>AI builds, runs evals, and optimizes quality agents for production
                                                    with speed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-orbit k2-orbit-2">
                                        <div class="k2-orbit-circle w-embed"><svg viewBox="0 0 451 451" fill="none">
                                                <circle cx="225.373" cy="225.373" r="225.373" fill="#ccc"
                                                    fill-opacity=".1"></circle>
                                                <circle cx="225.373" cy="225.373" r="225" stroke="#000"
                                                    stroke-width=".745" stroke-dasharray="3.73 10.43"></circle>
                                                <circle cx="222.855" cy="450.629" r="5.96" fill="#000"></circle>
                                            </svg></div>
                                        <div class="k2-orbit-content k2-orbit-content-3">
                                            <div data-wf--eyebrow--variant="orbit"
                                                class="k2-eyebrow w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                <div
                                                    class="k2-eyebrow-mark w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                </div>
                                                <div>Govern with certainty</div>
                                            </div>
                                            <div data-op="100" data-font-weight="500" data-mw="100"
                                                data-wf--paragraph--variant="16-24"
                                                class="k2-text w-variant-9495d074-2508-bce1-60b8-6adade9e7dab w-richtext">
                                                <p>Evaluate, trace, and audit every agent session, that's 100%
                                                    observability</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-orbit k2-orbit-3">
                                        <div class="k2-orbit-circle w-embed"><svg viewBox="0 0 451 451" fill="none">
                                                <circle cx="225.375" cy="225.375" r="225.375" fill="#ccc"
                                                    fill-opacity=".1"></circle>
                                                <circle cx="225.375" cy="225.375" r="224.971" stroke="#000"
                                                    stroke-width=".808"></circle>
                                                <circle cx="407.003" cy="92.191" r="5.96" fill="#000"></circle>
                                            </svg></div>
                                        <div class="k2-orbit-content k2-orbit-content-2">
                                            <div data-wf--eyebrow--variant="orbit"
                                                class="k2-eyebrow w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                <div
                                                    class="k2-eyebrow-mark w-variant-ae4b595b-28fd-df39-6f3b-6f6f077a5855">
                                                </div>
                                                <div>Built to be future ready</div>
                                            </div>
                                            <div data-op="100" data-font-weight="500" data-mw="100"
                                                data-wf--paragraph--variant="16-24"
                                                class="k2-text w-variant-9495d074-2508-bce1-60b8-6adade9e7dab w-richtext">
                                                <p>Your logic is built to outlast innovation, regardless of the model
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-orbit kr-orbit-arch">
                                        <div class="k2-orbit-circle w-embed"><svg viewBox="0 0 196.688 196.688"
                                                fill="none">
                                                <circle cx="98.344" cy=".147" r="5.96" fill="#000"></circle>

                                                <g transform="translate(-253.719 -122.725)">
                                                    <g fill="#000">
                                                        <circle cx="98.717" cy="98.717" r="98.344"
                                                            transform="matrix(1 0 0 -1 253.346 319.786)" stroke="#000"
                                                            stroke-width=".745"></circle>
                                                        <rect x="301.055" y="177.445" width="101.333" height="87.333">
                                                        </rect>
                                                    </g>

                                                    <rect x="301.055" y="177.445" width="101.333" height="87.333"
                                                        stroke="#ccc" stroke-opacity=".4"></rect>

                                                    <path
                                                        d="M324.283 212.112l5.184-15.72h2.784l5.184 15.72h-2.544l-2.544-8.568-.768-2.592-.72-2.64h-.096l-.72 2.64-.744 2.592-2.568 8.568h-2.448zm2.904-4.512v-1.896h7.296v1.896h-7.296zm12.591 4.512v-15.72h4.68c1.072 0 2.016.128 2.832.384.832.24 1.48.64 1.944 1.2.48.56.72 1.312.72 2.256 0 .768-.224 1.472-.672 2.112s-1.136 1.08-2.064 1.32v.096c1.136.176 2.016.576 2.64 1.2s.936 1.472.936 2.544c0 1.04-.256 1.904-.768 2.592-.496.672-1.192 1.176-2.088 1.512s-1.928.504-3.096.504h-5.064zm2.4-9.192h1.992c1.216 0 2.088-.2 2.616-.6.544-.416.816-1.024.816-1.824 0-.784-.28-1.336-.84-1.656s-1.4-.48-2.52-.48h-2.064v4.56zm0 7.224h2.376c1.248 0 2.208-.216 2.88-.648.672-.448 1.008-1.16 1.008-2.136 0-.896-.336-1.536-1.008-1.92-.656-.4-1.616-.6-2.88-.6h-2.376v5.304zm12.351 1.968v-15.72h2.376v13.704h7.56v2.016h-9.936zm12.902-8.76V197.4h-2.208v-1.512h6.048v1.512h-2.184v5.952h-1.656zm4.872 0v-7.464h1.896l1.008 2.616.6 1.872h.096l.6-1.872 1.008-2.616h1.896v7.464h-1.512v-3.024l.192-2.592h-.096l-1.584 4.248h-1.128l-1.584-4.248h-.096l.192 2.592v3.024h-1.488zm-54.975 44.76l5.184-15.72h2.784l5.184 15.72h-2.544l-2.544-8.568-.768-2.592-.72-2.64h-.096l-.72 2.64-.744 2.592-2.568 8.568h-2.448zm2.904-4.512v-1.896h7.296v1.896h-7.296zm12.591 4.512v-15.72h5.064c1.088 0 2.056.144 2.904.432.848.272 1.512.744 1.992 1.416.496.672.744 1.568.744 2.688 0 1.088-.248 1.984-.744 2.688-.48.704-1.144 1.232-1.992 1.584s-1.816.528-2.904.528h-2.664v6.384h-2.4zm2.4-8.328h2.376c1.152 0 2.032-.232 2.64-.696.608-.48.912-1.2.912-2.16s-.304-1.632-.912-2.016c-.608-.4-1.488-.6-2.64-.6h-2.376v5.472zm2.208 1.296l1.8-1.368 4.848 8.4h-2.712l-3.936-7.032zm15.542 7.32c-.976 0-1.888-.176-2.736-.528-.832-.368-1.568-.896-2.208-1.584-.624-.704-1.12-1.56-1.488-2.568-.352-1.008-.528-2.152-.528-3.432 0-1.712.312-3.176.936-4.392.624-1.232 1.472-2.168 2.544-2.808 1.072-.656 2.296-.984 3.672-.984.96 0 1.816.2 2.568.6.752.384 1.368.832 1.848 1.344l-1.344 1.512c-.4-.432-.856-.768-1.368-1.008-.496-.24-1.064-.36-1.704-.36-.928 0-1.744.248-2.448.744-.704.48-1.256 1.168-1.656 2.064-.384.896-.576 1.968-.576 3.216s.192 2.328.576 3.24c.4.912.952 1.616 1.656 2.112.72.496 1.552.744 2.496.744.688 0 1.304-.144 1.848-.432.544-.304 1.048-.712 1.512-1.224l1.344 1.464c-.608.72-1.32 1.28-2.136 1.68s-1.752.6-2.808.6zm7.263-.288v-15.72h2.424v6.456h5.952v-6.456h2.424v15.72h-2.424v-7.176h-5.952v7.176h-2.424zm14.151-8.76V233.4h-2.208v-1.512h6.048v1.512h-2.184v5.952h-1.656zm4.872 0v-7.464h1.896l1.008 2.616.6 1.872h.096l.6-1.872 1.008-2.616h1.896v7.464h-1.512v-3.024l.192-2.592h-.096l-1.584 4.248h-1.128l-1.584-4.248h-.096l.192 2.592v3.024h-1.488z"
                                                        fill="#fff"></path>

                                                    <g stroke="#5cc83a">
                                                        <path
                                                            d="M301.055 167.453h-10v10m10 97.328h-10v-10m111 10h10v-10">
                                                        </path>
                                                        <path d="M402.055 167.781h10v10"></path>
                                                    </g>
                                                </g>
                                            </svg></div>
                                    </div>
                                </div>
                                <div class="k2-orbit-buttons"><a
                                        data-wf-native-id-path="b846dc04-301b-e706-efe4-32f5aba621c7"
                                        data-wf-ao-click-engagement-tracking="true"
                                        data-wf-element-id="b846dc04-301b-e706-efe4-32f5aba621c7" href="#"
                                        class="k2-orbit-button w-inline-block"></a><a
                                        data-wf-native-id-path="b846dc04-301b-e706-efe4-32f5aba621c8"
                                        data-wf-ao-click-engagement-tracking="true"
                                        data-wf-element-id="b846dc04-301b-e706-efe4-32f5aba621c8" href="#"
                                        class="k2-orbit-button w-inline-block"></a><a
                                        data-wf-native-id-path="b846dc04-301b-e706-efe4-32f5aba621c9"
                                        data-wf-ao-click-engagement-tracking="true"
                                        data-wf-element-id="b846dc04-301b-e706-efe4-32f5aba621c9" href="#"
                                        class="k2-orbit-button w-inline-block"></a></div>
                            </div>
                            <div aria-hidden="true" class="k2-orbit-steps">
                                <div id="get-to-roi-faster" class="k2-orbit-step"></div>
                                <div id="govern-with-certainty" class="k2-orbit-step"></div>
                                <div id="future-ready" class="k2-orbit-step"></div>
                                <div class="k2-orbit-step"></div>
                            </div>
                        </div>
                        <div data-color="green-dark" data-mw="45" data-op="100" data-wf--heading--variant="16-32"
                            class="k2-heading w-variant-b705f7f8-2081-c260-cc10-d749979fe20b w-richtext">
                            <p>Invented for the <em>agentic era</em>. Shaped by a decade of hard-earned enterprise AI
                                learnings.</p>
                        </div>
                    </div>
                " },

  { name: "KorePillarsSection", source: "pillars", tag: "section", attrs: {"id": "pillars", "className": "k2-section"}, html: "
                    <div class="k2-container k2-container-header k2-container-header-2">
                        <div data-wf--eyebrow--variant="medium"
                            class="k2-eyebrow w-variant-53286ae4-0847-1bdb-f46b-63d5af28c913">
                            <div>{ Pillars }</div>
                        </div>
                        <div data-scroll="" data-mw="50" data-op="100" data-color="green-dark" data-split=""
                            data-wf--heading--variant="h2"
                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                            <h2><span class="line"
                                    style="display: block; text-align: right; width: 100%; --i: 0;"><strong
                                        style="display: inline-block; position: relative;">The two pillars</strong>
                                    behind the AI-native</span><span class="line"
                                    style="display: block; text-align: right; width: 100%; --i: 1;">foundation <em
                                        style="display: inline-block; position: relative;">for agentic AI</em></span>
                            </h2>
                        </div>
                    </div>
                    <div class="k2-container">
                        <div class="w-dyn-list">
                            <div role="list" class="w-dyn-items">
                                <div data-stagger="" data-scroll="" role="listitem" class="k2-pillars-row w-dyn-item">
                                    <div class="k2-pillars-col">
                                        <div class="k2-pillars-col-header">
                                            <div data-wf--button---expand--variant="darkgreen" data-cover=""
                                                class="k2-button w-variant-a6109b27-4e6d-a782-0102-21789d5f8f68">
                                                <div class="k2-clickable"><button type="button" aria-labelledby="abl"
                                                        data-modal-open="abl" class="k2-action"
                                                        aria-haspopup="dialog"></button></div>
                                                <div class="k2-icon-expand w-embed"><svg viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <circle style="--i:0" cx="10.05" cy=".75" r=".75"></circle>
                                                        <circle style="--i:1" cx="12.35" cy=".75" r=".75"></circle>
                                                        <circle style="--i:2" cx="14.65" cy=".75" r=".75"></circle>
                                                        <circle style="--i:3" cx="16.95" cy=".75" r=".75"></circle>
                                                        <circle style="--i:4" cx="19.25" cy=".75" r=".75"></circle>
                                                        <circle style="--i:5" cx="19.25" cy="3.05" r=".75"></circle>
                                                        <circle style="--i:6" cx="19.25" cy="5.35" r=".75"></circle>
                                                        <circle style="--i:7" cx="19.25" cy="7.65" r=".75"></circle>
                                                        <circle style="--i:8" cx="19.25" cy="9.95" r=".75"></circle>

                                                        <circle style="--i:0" cx="9.95" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:1" cx="7.65" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:2" cx="5.35" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:3" cx="3.05" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:4" cx=".75" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:5" cx=".75" cy="16.95" r=".75"></circle>
                                                        <circle style="--i:6" cx=".75" cy="14.65" r=".75"></circle>
                                                        <circle style="--i:7" cx=".75" cy="12.35" r=".75"></circle>
                                                        <circle style="--i:8" cx=".75" cy="10.05" r=".75"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                        <div class="k2-pillars-col-item">
                                            <div>
                                                <h2 id="abl" data-underline="" class="k2-text-h5">Agent Blueprint
                                                    Language (ABL\u2122)</h2>
                                            </div>
                                            <p data-op="50" class="k2-text">ABL is a typed, schema-driven language
                                                purpose-built for agentic AI. It lets enterprises define agent behavior,
                                                tools, guardrails, orchestration, and handoff logic in a formal,
                                                structured way.</p>
                                        </div>
                                    </div>
                                    <div data-wf--image--variant="landscape-10-7"
                                        class="k2-img-wrapper w-variant-d6e10de7-3677-cece-d42d-3b474db626a7"
                                        style="transition-delay: 100ms; animation-delay: 100ms;"><img decoding="async"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a0ead3859190218a3957c4d_abl-preview.webp"
                                            loading="lazy" alt="" class="k2-img"></div>
                                </div>
                                <div data-stagger="" data-scroll="" role="listitem" class="k2-pillars-row w-dyn-item">
                                    <div class="k2-pillars-col">
                                        <div class="k2-pillars-col-header">
                                            <div data-wf--button---expand--variant="darkgreen" data-cover=""
                                                class="k2-button w-variant-a6109b27-4e6d-a782-0102-21789d5f8f68">
                                                <div class="k2-clickable"><button type="button" aria-labelledby="arch"
                                                        data-modal-open="arch" class="k2-action"
                                                        aria-haspopup="dialog"></button></div>
                                                <div class="k2-icon-expand w-embed"><svg viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <circle style="--i:0" cx="10.05" cy=".75" r=".75"></circle>
                                                        <circle style="--i:1" cx="12.35" cy=".75" r=".75"></circle>
                                                        <circle style="--i:2" cx="14.65" cy=".75" r=".75"></circle>
                                                        <circle style="--i:3" cx="16.95" cy=".75" r=".75"></circle>
                                                        <circle style="--i:4" cx="19.25" cy=".75" r=".75"></circle>
                                                        <circle style="--i:5" cx="19.25" cy="3.05" r=".75"></circle>
                                                        <circle style="--i:6" cx="19.25" cy="5.35" r=".75"></circle>
                                                        <circle style="--i:7" cx="19.25" cy="7.65" r=".75"></circle>
                                                        <circle style="--i:8" cx="19.25" cy="9.95" r=".75"></circle>

                                                        <circle style="--i:0" cx="9.95" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:1" cx="7.65" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:2" cx="5.35" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:3" cx="3.05" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:4" cx=".75" cy="19.25" r=".75"></circle>
                                                        <circle style="--i:5" cx=".75" cy="16.95" r=".75"></circle>
                                                        <circle style="--i:6" cx=".75" cy="14.65" r=".75"></circle>
                                                        <circle style="--i:7" cx=".75" cy="12.35" r=".75"></circle>
                                                        <circle style="--i:8" cx=".75" cy="10.05" r=".75"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                        <div class="k2-pillars-col-item">
                                            <div>
                                                <h2 id="arch" data-underline="" class="k2-text-h5">\u2122ARCH</h2>
                                            </div>
                                            <p data-op="50" class="k2-text">Arch is the platform\u2019s built-in AI solution
                                                architect. It turns plain-language intent into a complete agent system -
                                                including agents, workflows, tools, policies, and handoffs - and helps
                                                teams build, manage, and optimize AI agents.</p>
                                        </div>
                                    </div>
                                    <div data-wf--image--variant="landscape-10-7"
                                        class="k2-img-wrapper w-variant-d6e10de7-3677-cece-d42d-3b474db626a7"
                                        style="transition-delay: 100ms; animation-delay: 100ms;"><img decoding="async"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a1406deeba3730c92c6c481_arch_preview.webp"
                                            loading="lazy" alt="" class="k2-img"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                " },

  { name: "KoreBuildScaleOptimizeSection", source: "build-scale-optimize", tag: "section", attrs: {"id": "build-scale-optimize", "className": "k2-section"}, html: "
                <div class="k2-bg">
                    <div data-wf--image--variant="landscape-16-9"
                        class="k2-img-wrapper w-variant-0144d365-ab67-29af-ca32-5f01095df836"><img decoding="async"
                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f214dc2ea679ede9714e8_bg-build.webp"
                            loading="lazy" alt="" class="k2-img"></div>
                </div>
                <div class="k2-container k2-container-header k2-container-header-3">
                    <div data-scroll="" data-mw="100" data-op="100" data-split="" data-wf--heading--variant="display-1"
                        class="k2-heading w-variant-b8037af9-0c31-33c6-fdfd-3ef99113e090 w-richtext">
                        <h2><span class="line"
                                style="display: block; text-align: start; width: 100%; --i: 0;">Build.</span><span
                                class="line"
                                style="display: block; text-align: start; width: 100%; --i: 1;">Scale.</span><span
                                class="line" style="display: block; text-align: start; width: 100%; --i: 2;"><em
                                    style="display: inline-block; position: relative;">Optimize.</em></span></h2>
                    </div>
                </div>
                <div class="k2-container">
                    <div class="k2-tabs k2-tabs-2" data-k2-init="true">
                        <div class="k2-tabs-menu k2-tabs-menu-2" role="tablist"><button
                                data-wf--tabs---button--variant="optimize" type="button"
                                class="k2-tabs-btn w-variant-dfcd153a-ee44-488b-1811-f8f2c97decad on" id="tabs-3-tab-1"
                                role="tab" aria-controls="tabs-3-tab-1-panel" aria-selected="true" tabindex="0"
                                style="--p: 0;">
                                <div data-scramble="">Build</div>
                            </button><button data-wf--tabs---button--variant="optimize" type="button"
                                class="k2-tabs-btn w-variant-dfcd153a-ee44-488b-1811-f8f2c97decad" id="tabs-3-tab-2"
                                role="tab" aria-controls="tabs-3-tab-2-panel" aria-selected="false" tabindex="-1"
                                style="--p: 0;">
                                <div data-scramble="">Scale</div>
                            </button><button data-wf--tabs---button--variant="optimize" type="button"
                                class="k2-tabs-btn w-variant-dfcd153a-ee44-488b-1811-f8f2c97decad" id="tabs-3-tab-3"
                                role="tab" aria-controls="tabs-3-tab-3-panel" aria-selected="false" tabindex="-1"
                                style="--p: 0;">
                                <div data-scramble="">Optimize</div>
                            </button><button data-wf--tabs---button--variant="optimize" type="button"
                                class="k2-tabs-btn w-variant-dfcd153a-ee44-488b-1811-f8f2c97decad" id="tabs-3-tab-4"
                                role="tab" aria-controls="tabs-3-tab-4-panel" aria-selected="false" tabindex="-1"
                                style="--p: 0;">
                                <div data-scramble="">Performance</div>
                            </button><button data-wf--tabs---button--variant="optimize" type="button"
                                class="k2-tabs-btn w-variant-dfcd153a-ee44-488b-1811-f8f2c97decad" id="tabs-3-tab-5"
                                role="tab" aria-controls="tabs-3-tab-5-panel" aria-selected="false" tabindex="-1"
                                style="--p: 0;">
                                <div data-scramble="">Foundation</div>
                            </button></div>
                        <div class="k2-tabs-panels k2-tabs-panels-2">
                            <div class="k2-tabs-panel on" id="tabs-3-tab-1-panel" role="tabpanel"
                                aria-labelledby="tabs-3-tab-1">
                                <div class="k2-tabs-row">
                                    <div class="k2-tabs-col">
                                        <div data-wf--eyebrow--variant="label"
                                            class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                            <div class="k2-eyebrow-slashes w-embed"><svg viewBox="0 0 35 11" fill="none"
                                                    stroke="currentColor" stroke-width="1.768" stroke-linecap="round">
                                                    <path
                                                        d="M.883 9.754l7.254-8.645m1.137 8.645l7.254-8.645m1.137 8.645l7.254-8.645m1.138 8.645l7.254-8.645">
                                                    </path>
                                                </svg></div>
                                            <div>Faster time to value</div>
                                        </div>
                                        <div data-color="green-light" data-mw="100" data-op="100"
                                            data-wf--heading--variant="h2"
                                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                            <h3>Build <em>with AI</em></h3>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-col k2-tabs-col-2">
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>Build AI agents five times faster.</p>
                                        </div>
                                        <div data-wf--cta--variant="base" class="k2-cta">
                                            <div class="k2-clickable"><a aria-label="Get Demo"
                                                    data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c161bc:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-ao-click-engagement-tracking="true"
                                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c161bc%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                            </div>
                                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                            <div aria-hidden="true" class="k2-cta-icon">
                                                <div data-wf--icon---arrow--variant="base"
                                                    class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                        fill="currentColor">
                                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-tabs-row k2-tabs-row-2">
                                    <div data-autoplay="" class="k2-tabs k2-tabs-3" data-k2-init="true">
                                        <div class="k2-tabs-menu k2-tabs-menu-3 k2-tabs-menu-3-1" role="tablist"><button
                                                type="button" class="k2-tabs-btn-2 on" id="tabs-4-tab-1" role="tab"
                                                aria-controls="tabs-4-tab-1-panel" aria-selected="true" tabindex="0"
                                                style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c45dac4c09aeb706e4_workflows.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">Agent Studio</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Create agents, workflows, and tools using visual and code-based
                                                        authoring in a unified workspace.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-4-tab-2"
                                                role="tab" aria-controls="tabs-4-tab-2-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c54821bf52767aa556_channel-connectors.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">Arch\u2122</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Move from idea to agent faster with an AI architect that helps
                                                        build, scale, and optimize AI agents.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-4-tab-3"
                                                role="tab" aria-controls="tabs-4-tab-3-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f0a169c859f7cc03ad470_abl.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">ABL\u2122</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Define agent behavior, tools, and guardrails in a structured and
                                                        compilable DSL.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-4-tab-4"
                                                role="tab" aria-controls="tabs-4-tab-4-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f0a16aac9d95afda95166_ai-dev-tools.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">AI Dev Tools</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Supports other AI build tools: \u2028Claude Code, Cursor, Codex, \u2028and
                                                        more.</p>
                                                </div>
                                            </button></div>
                                        <div class="k2-tabs-panels">
                                            <div class="k2-tabs-panel on" id="tabs-4-tab-1-panel" role="tabpanel"
                                                aria-labelledby="tabs-4-tab-1">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee70e7d199a7856d9b876_agent_studio.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-4-tab-2-panel" role="tabpanel"
                                                aria-labelledby="tabs-4-tab-2" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee70e91816e07f6f5a564_arch.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-4-tab-3-panel" role="tabpanel"
                                                aria-labelledby="tabs-4-tab-3" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee70d7ab85e586c1fbb97_abl.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-4-tab-4-panel" role="tabpanel"
                                                aria-labelledby="tabs-4-tab-4" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a140b38452be5be0694dea6_ai-dev-tools.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel" id="tabs-3-tab-2-panel" role="tabpanel"
                                aria-labelledby="tabs-3-tab-2" inert="">
                                <div class="k2-tabs-row">
                                    <div class="k2-tabs-col">
                                        <div data-wf--eyebrow--variant="label"
                                            class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                            <div class="k2-eyebrow-slashes w-embed"><svg viewBox="0 0 35 11" fill="none"
                                                    stroke="currentColor" stroke-width="1.768" stroke-linecap="round">
                                                    <path
                                                        d="M.883 9.754l7.254-8.645m1.137 8.645l7.254-8.645m1.137 8.645l7.254-8.645m1.138 8.645l7.254-8.645">
                                                    </path>
                                                </svg></div>
                                            <div>Trusted in production</div>
                                        </div>
                                        <div data-color="green-light" data-mw="100" data-op="100"
                                            data-wf--heading--variant="h2"
                                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                            <h3>Scale <em>with AI</em></h3>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-col k2-tabs-col-2">
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>Operate AI agents with provable reliability and control, in production,
                                                at scale.</p>
                                        </div>
                                        <div data-wf--cta--variant="base" class="k2-cta">
                                            <div class="k2-clickable"><a aria-label="Get Demo"
                                                    data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c161e7:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-ao-click-engagement-tracking="true"
                                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c161e7%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                            </div>
                                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                            <div aria-hidden="true" class="k2-cta-icon">
                                                <div data-wf--icon---arrow--variant="base"
                                                    class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                        fill="currentColor">
                                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-tabs" data-k2-init="true">
                                    <div class="k2-tabs-menu" role="tablist"><button
                                            data-wf--tabs---button--variant="base" type="button" class="k2-tabs-btn on"
                                            id="tabs-5-tab-1" role="tab" aria-controls="tabs-5-tab-1-panel"
                                            aria-selected="true" tabindex="0" style="--p: 0;">
                                            <div data-scramble="">{ Deploy }</div>
                                        </button><button data-wf--tabs---button--variant="base" type="button"
                                            class="k2-tabs-btn" id="tabs-5-tab-2" role="tab"
                                            aria-controls="tabs-5-tab-2-panel" aria-selected="false" tabindex="-1"
                                            style="--p: 0;">
                                            <div data-scramble="">{ Evaluate }</div>
                                        </button></div>
                                    <div class="k2-tabs-panels">
                                        <div class="k2-tabs-panel on" id="tabs-5-tab-1-panel" role="tabpanel"
                                            aria-labelledby="tabs-5-tab-1">
                                            <div class="k2-tabs-row k2-tabs-row-2">
                                                <div class="k2-tabs-header">
                                                    <div data-op="100" data-font-weight="400" data-mw="30"
                                                        data-wf--heading--variant="h5"
                                                        class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                                        <h4>Move AI agents into production across workflows, systems,
                                                            and channels.</h4>
                                                    </div>
                                                    <div data-wf--eyebrow--variant="dark"
                                                        class="k2-eyebrow w-variant-39ac125d-48e8-74b9-8963-8c204c6e70d0">
                                                        <div>Production at scale</div>
                                                    </div>
                                                </div>
                                                <div data-autoplay="" class="k2-tabs k2-tabs-3" data-k2-init="true">
                                                    <div class="k2-tabs-menu k2-tabs-menu-3" role="tablist"><button
                                                            type="button" class="k2-tabs-btn-2 on" id="tabs-6-tab-1"
                                                            role="tab" aria-controls="tabs-6-tab-1-panel"
                                                            aria-selected="true" tabindex="0" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c484b8b3512785fca7_runtime.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Runtime
                                                                </div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>A scalable execution engine that manages
                                                                    orchestration, performance, and control across
                                                                    workflows.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-6-tab-2" role="tab"
                                                            aria-controls="tabs-6-tab-2-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c45dac4c09aeb706e4_workflows.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Workflows
                                                                </div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Automate complex, multi-step work across agents,
                                                                    humans, tools, and systems with the right balance of
                                                                    autonomy and oversight for every flow.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-6-tab-3" role="tab"
                                                            aria-controls="tabs-6-tab-3-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c4c832958701b096c6_memory-management.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Memory
                                                                    Management</div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Help agents remember the right context across
                                                                    interactions, so customer and employee experiences
                                                                    feel more consistent, relevant, and personalized.
                                                                </p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-6-tab-4" role="tab"
                                                            aria-controls="tabs-6-tab-4-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c46b63f8b120a6fadb_search-ai.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Search AI
                                                                </div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Trusted enterprise knowledge agents deliver accurate
                                                                    answers and take action using the right data,
                                                                    permissions, and context.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-6-tab-5" role="tab"
                                                            aria-controls="tabs-6-tab-5-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c54821bf52767aa556_channel-connectors.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Channel
                                                                    Connectors</div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Deploy agents across the channels customers and
                                                                    employees already use, from voice and web to Slack,
                                                                    Teams, mobile, and more.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-6-tab-6" role="tab"
                                                            aria-controls="tabs-6-tab-6-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c48a629211f18f2c68_integrations.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Integrations
                                                                </div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Connect agents to the systems where work happens, so
                                                                    they can move beyond answering questions to
                                                                    completing tasks across the enterprise stack.</p>
                                                            </div>
                                                        </button></div>
                                                    <div class="k2-tabs-panels">
                                                        <div class="k2-tabs-panel on" id="tabs-6-tab-1-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-1">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c905e6cca8dca3cd15_runtime.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-6-tab-2-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-2" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c8b619d68a6819d5d0_workflows.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-6-tab-3-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-3" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c83acdaaeb68c01d71_memory_management.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-6-tab-4-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-4" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c80b57cb7861207655_search_ai.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-6-tab-5-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-5" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c8bfbd50e40a57e802_channel_connectors.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-6-tab-6-panel"
                                                            role="tabpanel" aria-labelledby="tabs-6-tab-6" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7c808de0a82cfbbf721_tool_system_integrations.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="k2-tabs-panel" id="tabs-5-tab-2-panel" role="tabpanel"
                                            aria-labelledby="tabs-5-tab-2" inert="">
                                            <div class="k2-tabs-row k2-tabs-row-2">
                                                <div class="k2-tabs-header">
                                                    <div data-op="100" data-font-weight="400" data-mw="30"
                                                        data-wf--heading--variant="h5"
                                                        class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                                        <h4>Trust agents in production with visibility into how they
                                                            perform and impact the business.</h4>
                                                    </div>
                                                    <div data-wf--eyebrow--variant="dark"
                                                        class="k2-eyebrow w-variant-39ac125d-48e8-74b9-8963-8c204c6e70d0">
                                                        <div>Production at scale</div>
                                                    </div>
                                                </div>
                                                <div data-autoplay="" class="k2-tabs k2-tabs-3" data-k2-init="true">
                                                    <div class="k2-tabs-menu k2-tabs-menu-3" role="tablist"><button
                                                            type="button" class="k2-tabs-btn-2 on" id="tabs-7-tab-1"
                                                            role="tab" aria-controls="tabs-7-tab-1-panel"
                                                            aria-selected="true" tabindex="0" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c484b8b3512785fca7_runtime.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">
                                                                    Observability</div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Trace every agent run across reasoning, tools,
                                                                    guardrails, handoffs, and outcomes, to understand
                                                                    what happened and why it happened.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-7-tab-2" role="tab"
                                                            aria-controls="tabs-7-tab-2-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c45dac4c09aeb706e4_workflows.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Agent Evals
                                                                </div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Test agent quality, safety, and accuracy across
                                                                    scenarios, personas, and edge cases before and after
                                                                    deployment.</p>
                                                            </div>
                                                        </button><button type="button" class="k2-tabs-btn-2"
                                                            id="tabs-7-tab-3" role="tab"
                                                            aria-controls="tabs-7-tab-3-panel" aria-selected="false"
                                                            tabindex="-1" style="--p: 0;">
                                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c4c832958701b096c6_memory-management.svg"
                                                                    alt="" class="k2-tabs-btn-icon">
                                                                <div data-scramble="" class="k2-text-label">Agent
                                                                    Insights</div>
                                                            </div>
                                                            <div class="k2-tabs-btn-progress"></div>
                                                            <div data-op="50" data-mw="100"
                                                                data-wf--paragraph--variant="tiny"
                                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                                <p>Connect agent performance to cost, usage, and
                                                                    business outcomes, so teams can see where AI is
                                                                    creating value and where it needs improvement.</p>
                                                            </div>
                                                        </button></div>
                                                    <div class="k2-tabs-panels">
                                                        <div class="k2-tabs-panel on" id="tabs-7-tab-1-panel"
                                                            role="tabpanel" aria-labelledby="tabs-7-tab-1">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee80719eb8ff241f5f9e6_observability.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-7-tab-2-panel"
                                                            role="tabpanel" aria-labelledby="tabs-7-tab-2" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee807a94e56105ee492ba_agent_evals.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" id="tabs-7-tab-3-panel"
                                                            role="tabpanel" aria-labelledby="tabs-7-tab-3" inert="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee80851602eef69e61e71_agent_insights.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                        <div class="k2-tabs-panel" hidden="">
                                                            <div data-wf--image--variant="landscape-2-1"
                                                                class="k2-img-wrapper"><img decoding="async"
                                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee70e7d199a7856d9b876_agent_studio.webp"
                                                                    loading="lazy" alt="" class="k2-img"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel" id="tabs-3-tab-3-panel" role="tabpanel"
                                aria-labelledby="tabs-3-tab-3" inert="">
                                <div class="k2-tabs-row">
                                    <div class="k2-tabs-col">
                                        <div data-wf--eyebrow--variant="label"
                                            class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                            <div class="k2-eyebrow-slashes w-embed"><svg viewBox="0 0 35 11" fill="none"
                                                    stroke="currentColor" stroke-width="1.768" stroke-linecap="round">
                                                    <path
                                                        d="M.883 9.754l7.254-8.645m1.137 8.645l7.254-8.645m1.137 8.645l7.254-8.645m1.138 8.645l7.254-8.645">
                                                    </path>
                                                </svg></div>
                                            <div>Better with every run</div>
                                        </div>
                                        <div data-color="green-light" data-mw="100" data-op="100"
                                            data-wf--heading--variant="h2"
                                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                            <h3>Optimize <em>with AI</em></h3>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-col k2-tabs-col-2">
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>Turn every agent run into a signal for incremental improvement.</p>
                                        </div>
                                        <div data-wf--cta--variant="base" class="k2-cta">
                                            <div class="k2-clickable"><a aria-label="Get Demo"
                                                    data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c1624b:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-ao-click-engagement-tracking="true"
                                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c1624b%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                            </div>
                                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                            <div aria-hidden="true" class="k2-cta-icon">
                                                <div data-wf--icon---arrow--variant="base"
                                                    class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                        fill="currentColor">
                                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-tabs-row k2-tabs-row-2">
                                    <div data-autoplay="" class="k2-tabs k2-tabs-3" data-k2-init="true">
                                        <div class="k2-tabs-menu k2-tabs-menu-3 k2-tabs-menu-3-1" role="tablist"><button
                                                type="button" class="k2-tabs-btn-2 on" id="tabs-8-tab-1" role="tab"
                                                aria-controls="tabs-8-tab-1-panel" aria-selected="true" tabindex="0"
                                                style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c45dac4c09aeb706e4_workflows.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">AI Insights</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Monitor quality, safety, cost, performance, ROI, and compliance
                                                        in one place, to know what is working, what is drifting, and
                                                        where to improve.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-8-tab-2"
                                                role="tab" aria-controls="tabs-8-tab-2-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c54821bf52767aa556_channel-connectors.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">Arch\u2122 Analysis</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Use Arch to analyze agent behavior, surface issues, and recommend
                                                        improvements across workflows, tools, prompts, and
                                                        orchestration.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-8-tab-3"
                                                role="tab" aria-controls="tabs-8-tab-3-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f0a169c859f7cc03ad470_abl.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">Auto-Tuning</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Continuously improve agent performance by tuning prompts, tools,
                                                        and flows based on real-world signals and outcome data.</p>
                                                </div>
                                            </button><button type="button" class="k2-tabs-btn-2" id="tabs-8-tab-4"
                                                role="tab" aria-controls="tabs-8-tab-4-panel" aria-selected="false"
                                                tabindex="-1" style="--p: 0;">
                                                <div class="k2-tabs-btn-header"><img loading="lazy"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f0a16aac9d95afda95166_ai-dev-tools.svg"
                                                        alt="" class="k2-tabs-btn-icon">
                                                    <div data-scramble="" class="k2-text-label">Lifecycle MGMT</div>
                                                </div>
                                                <div class="k2-tabs-btn-progress"></div>
                                                <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                    class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                    <p>Manage agent versions, experiments, rollouts, and rollbacks with
                                                        the discipline needed to improve AI safely in production.</p>
                                                </div>
                                            </button></div>
                                        <div class="k2-tabs-panels">
                                            <div class="k2-tabs-panel on" id="tabs-8-tab-1-panel" role="tabpanel"
                                                aria-labelledby="tabs-8-tab-1">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee74906a671e393170d53_ai_insights.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-8-tab-2-panel" role="tabpanel"
                                                aria-labelledby="tabs-8-tab-2" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee7493b708d84d6ccfcf1_arch_ai_analysis.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-8-tab-3-panel" role="tabpanel"
                                                aria-labelledby="tabs-8-tab-3" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee749df316c5684a2421e_auto_tuning.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                            <div class="k2-tabs-panel" id="tabs-8-tab-4-panel" role="tabpanel"
                                                aria-labelledby="tabs-8-tab-4" inert="">
                                                <div data-wf--image--variant="landscape-2-1" class="k2-img-wrapper"><img
                                                        decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0ee74a2e8527d75903fbfc_lifecycle_management.webp"
                                                        loading="lazy" alt="" class="k2-img"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel" id="tabs-3-tab-4-panel" role="tabpanel"
                                aria-labelledby="tabs-3-tab-4" inert="">
                                <div class="k2-tabs-row">
                                    <div class="k2-tabs-col">
                                        <div data-wf--eyebrow--variant="label"
                                            class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                            <div class="k2-eyebrow-slashes w-embed"><svg viewBox="0 0 35 11" fill="none"
                                                    stroke="currentColor" stroke-width="1.768" stroke-linecap="round">
                                                    <path
                                                        d="M.883 9.754l7.254-8.645m1.137 8.645l7.254-8.645m1.137 8.645l7.254-8.645m1.138 8.645l7.254-8.645">
                                                    </path>
                                                </svg></div>
                                            <div>Compounding gains</div>
                                        </div>
                                        <div data-color="green-light" data-mw="100" data-op="100"
                                            data-wf--heading--variant="h2"
                                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                            <h3>Performance<em></em></h3>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-col k2-tabs-col-2">
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>Ride the curve</p>
                                        </div>
                                        <div data-wf--cta--variant="base" class="k2-cta">
                                            <div class="k2-clickable"><a aria-label="Get Demo"
                                                    data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c16279:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-ao-click-engagement-tracking="true"
                                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c16279%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                            </div>
                                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                            <div aria-hidden="true" class="k2-cta-icon">
                                                <div data-wf--icon---arrow--variant="base"
                                                    class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                        fill="currentColor">
                                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-tabs-row k2-tabs-row-2">
                                    <div class="k2-tabs-header k2-tabs-header-2">
                                        <div data-op="100" data-font-weight="400" data-mw="30"
                                            data-wf--heading--variant="h5"
                                            class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                            <h4>Your agents inherit the curve</h4>
                                        </div>
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>AI is on an exponential growth curve; the Al-programmable platform rides
                                                it by design. Every model gain in reasoning, tool use, and context lands
                                                inside your agents automatically. No rebuild. No catch-up.</p>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-menu k2-tabs-menu-3"><button type="button"
                                            class="k2-tabs-btn-2">
                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c484b8b3512785fca7_runtime.svg"
                                                    alt="" class="k2-tabs-btn-icon">
                                                <div data-scramble="" class="k2-text-label">Authoring keeps pace</div>
                                            </div>
                                            <div class="k2-tabs-btn-progress"></div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                <p>New models design and refactor better agents.\u2028</p>
                                            </div>
                                        </button><button type="button" class="k2-tabs-btn-2">
                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c45dac4c09aeb706e4_workflows.svg"
                                                    alt="" class="k2-tabs-btn-icon">
                                                <div data-scramble="" class="k2-text-label">Evals get sharper</div>
                                            </div>
                                            <div class="k2-tabs-btn-progress"></div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                <p>Smarter judges catch what older ones missed.\u2028</p>
                                            </div>
                                        </button><button type="button" class="k2-tabs-btn-2">
                                            <div class="k2-tabs-btn-header"><img loading="lazy"
                                                    src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f04c4c832958701b096c6_memory-management.svg"
                                                    alt="" class="k2-tabs-btn-icon">
                                                <div data-scramble="" class="k2-text-label">THE&nbsp;ARCH\u2122&nbsp;LOOP
                                                </div>
                                            </div>
                                            <div class="k2-tabs-btn-progress"></div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="tiny"
                                                class="k2-text w-variant-b0f5be46-b016-3ffe-9889-ad9255a487e4 w-richtext">
                                                <p>Every loop improves; every release evolves</p>
                                            </div>
                                        </button></div>
                                    <div class="k2-performance-graph">
                                        <div class="w-embed">
                                            <style>
                                                html:not(.wf-design-mode) svg .k2-dash {
                                                    stroke-dasharray: 873.246;
                                                    stroke-dashoffset: 873.246
                                                }

                                                html:not(.wf-design-mode) svg .k2-g {
                                                    opacity: 0
                                                }

                                                .on svg .k2-dash {
                                                    animation: k2Draw 3s forwards cubic-bezier(.16, 1, .3, 1)
                                                }

                                                .on svg .k2-g {
                                                    animation: k2Fade 2s forwards
                                                }

                                                @keyframes k2Draw {
                                                    to {
                                                        stroke-dashoffset: 0
                                                    }
                                                }

                                                @keyframes k2Fade {
                                                    to {
                                                        opacity: 1
                                                    }
                                                }
                                            </style>

                                            <svg viewBox="0 0 843 396" fill="none">
                                                <path
                                                    d="M822.235 356.061V50.891l-.011-.011C674.999 194 625.499 234 550.499 273.5c-144 72.5-251.564 82.565-509.311 82.565h781.048v-.004z"
                                                    fill="url(#A)"></path>
                                                <path class="k2-dash"
                                                    d="M42.5 354.5c343.621 0 490.555-.105 778.934-304.105"
                                                    stroke="#5cc83a" stroke-width="3" stroke-linecap="round"></path>
                                                <g fill="#fff" class="k2-g">
                                                    <path d="M42.792 352.48H41v3.589h1.792v-3.589z"></path>
                                                    <path
                                                        d="M42.792 345.361H41v-7.121h1.792v7.121zm0-14.243H41V324h1.792v7.118zm0-14.239H41v-7.122h1.792v7.122zm0-14.243H41v-7.122h1.792v7.122zm0-14.239H41v-7.122h1.792v7.122zm0-14.243H41v-7.122h1.792v7.122zm0-14.236H41v-7.121h1.792v7.121zm0-14.243H41v-7.121h1.792v7.121zm0-14.243H41v-7.117h1.792v7.117zm0-14.239H41v-7.121h1.792v7.121zm0-14.243H41v-7.121h1.792v7.121zm0-14.235H41v-7.122h1.792v7.122zm0-14.243H41v-7.122h1.792v7.122zm0-14.239H41v-7.122h1.792v7.122zm0-14.243H41v-7.122h1.792v7.122zm0-14.24H41v-7.117h1.792v7.117zm0-14.239H41v-7.121h1.792v7.121zm0-14.243H41v-7.121h1.792v7.121zm0-14.239H41v-7.121h1.792v7.121zm0-14.243H41v-7.121h1.792v7.121zm0-14.239H41v-7.118h1.792v7.118zm0-14.239H41v-7.121h1.792v7.121zm0-14.243H41v-7.118h1.792v7.118zm0-14.239H41v-7.121h1.792v7.121z"
                                                        fill-opacity=".5"></path>
                                                    <path d="M42.792 0H41v3.588h1.792V0z"></path>
                                                    <path
                                                        d="M386.245 355v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.122V355h7.122zm-14.24 0v1.792h-7.121V355h7.121zm-14.242 0v1.792h-7.122V355h7.122zm-14.236 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.121V355h7.121zm-14.236 0v1.792h-7.121V355h7.121zm-14.242 0v1.792h-7.122V355h7.122zm-14.24 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.121V355h7.121zm-14.239 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.121V355h7.121zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.122V355h7.122zm-14.239 0v1.792h-7.118V355h7.118zm-14.239 0v1.792H80.07V355h7.122zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.121V355h7.121z"
                                                        fill-opacity=".5"></path>
                                                    <path d="M41 355v1.792h3.588V355H41z"></path>
                                                    <path
                                                        d="M728.245 355v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.122V355h7.122zm-14.24 0v1.792h-7.121V355h7.121zm-14.242 0v1.792h-7.122V355h7.122zm-14.236 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.121V355h7.121zm-14.236 0v1.792h-7.121V355h7.121zm-14.242 0v1.792h-7.122V355h7.122zm-14.24 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.121V355h7.121zm-14.239 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.121V355h7.121zm-14.243 0v1.792h-7.121V355h7.121zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.122V355h7.122zm-14.239 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.118V355h7.118zm-14.24 0v1.792h-7.121V355h7.121z"
                                                        fill-opacity=".5"></path>
                                                    <path d="M820.244 355v1.792h3.588V355h-3.588z"></path>
                                                    <path
                                                        d="M813.245 355v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.118V355h7.118zm-14.239 0v1.792h-7.122V355h7.122zm-14.243 0v1.792h-7.122V355h7.122zm-14.24 0v1.792h-7.121V355h7.121zm-14.242 0v1.792h-7.122V355h7.122z"
                                                        fill-opacity=".5"></path>
                                                    <path
                                                        d="M196.053 348.105c3.343 0 6.052-2.709 6.052-6.052S199.396 336 196.053 336 190 338.71 190 342.053s2.71 6.052 6.053 6.052z">
                                                    </path>
                                                    <path d="M791 72.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 1 1 0-19z"
                                                        fill-opacity=".12" stroke="#5cc83a"></path>
                                                    <path
                                                        d="M791.053 88.106c3.343 0 6.052-2.71 6.052-6.053S794.396 76 791.053 76 785 78.71 785 82.053s2.71 6.053 6.053 6.053z">
                                                    </path>
                                                    <path opacity=".4"
                                                        d="M361.088 393.6v-10.48h1.856l1.36 4.272.464 1.632h.064l.464-1.632 1.36-4.272h1.856v10.48h-1.472v-4.72l.032-.928.064-1.12.08-1.088.08-.88h-.048l-.656 2.256-1.328 3.696h-.992l-1.312-3.696-.64-2.256h-.048l.08.88.08 1.088.064 1.12.032.928v4.72h-1.44zm12.986.192a3.66 3.66 0 0 1-2.128-.64c-.608-.438-1.088-1.062-1.44-1.872-.342-.822-.512-1.808-.512-2.96 0-1.142.17-2.112.512-2.912.352-.811.832-1.424 1.44-1.84.618-.427 1.328-.64 2.128-.64s1.504.213 2.112.64c.618.416 1.098 1.029 1.44 1.84.352.8.528 1.77.528 2.912 0 1.152-.176 2.138-.528 2.96-.342.81-.822 1.434-1.44 1.872-.608.426-1.312.64-2.112.64zm0-1.392c.49 0 .917-.16 1.28-.48.362-.331.645-.8.848-1.408s.304-1.339.304-2.192-.102-1.574-.304-2.16c-.203-.598-.486-1.051-.848-1.36-.363-.32-.79-.48-1.28-.48a1.87 1.87 0 0 0-1.28.48c-.363.309-.646.762-.848 1.36-.203.586-.304 1.306-.304 2.16s.101 1.584.304 2.192.485 1.077.848 1.408a1.87 1.87 0 0 0 1.28.48zm5.802 1.2v-10.48h2.656c1.045 0 1.93.197 2.656.592.736.394 1.296.981 1.68 1.76.384.768.576 1.717.576 2.848s-.192 2.09-.576 2.88-.934 1.386-1.648 1.792-1.584.608-2.608.608h-2.736zm1.6-1.296h.96c.736 0 1.349-.15 1.84-.448.501-.31.88-.758 1.136-1.344s.384-1.318.384-2.192-.128-1.6-.384-2.176-.635-1.008-1.136-1.296c-.491-.288-1.104-.432-1.84-.432h-.96v7.888zm8.089 1.296v-10.48h6.592v1.344h-4.992v2.992h4.224v1.344h-4.224v3.456h5.152v1.344h-6.752zm9.562 0v-10.48h1.584v9.136h5.04v1.344h-6.624zm21.94.192c-.886 0-1.675-.208-2.368-.624-.694-.427-1.243-1.046-1.648-1.856-.395-.811-.592-1.787-.592-2.928s.202-2.118.608-2.928c.405-.822.96-1.446 1.664-1.872.714-.438 1.52-.656 2.416-.656.704 0 1.29.138 1.76.416.48.266.874.56 1.184.88l-.896 1.008c-.246-.267-.528-.486-.848-.656s-.72-.256-1.2-.256c-.598 0-1.126.165-1.584.496-.459.32-.816.778-1.072 1.376s-.384 1.312-.384 2.144.117 1.552.352 2.16c.245.608.592 1.077 1.04 1.408.458.33 1.013.496 1.664.496.32 0 .624-.048.912-.144s.517-.23.688-.4v-2.496h-1.936v-1.312h3.408v4.512c-.342.341-.79.634-1.344.88-.544.234-1.152.352-1.824.352zm5.593-.192v-10.48h6.592v1.344h-4.992v2.992h4.224v1.344h-4.224v3.456h5.152v1.344h-6.752zm8.778 0v-10.48h1.712l3.056 6.224.976 2.208h.048l-.144-1.696-.08-1.744v-4.992h1.536v10.48h-1.712l-3.056-6.224-.976-2.208h-.048l.128 1.696c.064.576.096 1.146.096 1.712v5.024h-1.536zm9.77 0v-10.48h6.592v1.344h-4.992v2.992h4.224v1.344h-4.224v3.456h5.152v1.344h-6.752zm9.002 0v-10.48h3.376c.725 0 1.37.096 1.936.288.565.181 1.008.496 1.328.944.33.448.496 1.045.496 1.792 0 .725-.166 1.322-.496 1.792a2.92 2.92 0 0 1-1.328 1.056c-.566.234-1.211.352-1.936.352h-1.776v4.256h-1.6zm1.6-5.552h1.584c.768 0 1.354-.155 1.76-.464.405-.32.608-.8.608-1.44s-.203-1.088-.608-1.344c-.406-.267-.992-.4-1.76-.4h-1.584v3.648zm1.472.864l1.2-.912 3.232 5.6h-1.808l-2.624-4.688zm5.145 4.688l3.456-10.48h1.856l3.456 10.48h-1.696l-1.696-5.712-.512-1.728-.48-1.76h-.064l-.48 1.76-.496 1.728-1.712 5.712h-1.632zm1.936-3.008v-1.264h4.864v1.264h-4.864zm10.922 3.008v-9.136h-3.376v-1.344h8.352v1.344h-3.376v9.136h-1.6zm6.714 0v-1.344h2.56v-7.792h-2.56v-1.344h6.72v1.344h-2.56v7.792h2.56v1.344h-6.72zm12.634.192a3.66 3.66 0 0 1-2.128-.64c-.608-.438-1.088-1.062-1.44-1.872-.342-.822-.512-1.808-.512-2.96 0-1.142.17-2.112.512-2.912.352-.811.832-1.424 1.44-1.84.618-.427 1.328-.64 2.128-.64s1.504.213 2.112.64c.618.416 1.098 1.029 1.44 1.84.352.8.528 1.77.528 2.912 0 1.152-.176 2.138-.528 2.96-.342.81-.822 1.434-1.44 1.872-.608.426-1.312.64-2.112.64zm0-1.392c.49 0 .917-.16 1.28-.48.362-.331.645-.8.848-1.408s.304-1.339.304-2.192-.102-1.574-.304-2.16c-.203-.598-.486-1.051-.848-1.36-.363-.32-.79-.48-1.28-.48a1.87 1.87 0 0 0-1.28.48c-.363.309-.646.762-.848 1.36-.203.586-.304 1.306-.304 2.16s.101 1.584.304 2.192.485 1.077.848 1.408a1.87 1.87 0 0 0 1.28.48zm5.721 1.2v-10.48h1.712l3.056 6.224.976 2.208h.048l-.144-1.696-.08-1.744v-4.992h1.536v10.48h-1.712l-3.056-6.224-.976-2.208h-.048l.128 1.696c.064.576.096 1.146.096 1.712v5.024h-1.536zm12.874.192a5.41 5.41 0 0 1-2.112-.416c-.661-.278-1.237-.656-1.728-1.136l.928-1.088a5.25 5.25 0 0 0 1.376.912c.512.224 1.056.336 1.632.336.661 0 1.173-.139 1.536-.416s.544-.63.544-1.056c0-.342-.08-.614-.24-.816s-.379-.374-.656-.512c-.267-.139-.576-.278-.928-.416l-1.472-.656c-.352-.139-.704-.32-1.056-.544a3.04 3.04 0 0 1-.848-.88c-.224-.363-.336-.8-.336-1.312 0-.544.149-1.03.448-1.456.299-.438.715-.779 1.248-1.024.533-.256 1.147-.384 1.84-.384.651 0 1.259.122 1.824.368.565.234 1.051.549 1.456.944l-.832 1.024a3.82 3.82 0 0 0-1.12-.688c-.395-.171-.864-.256-1.408-.256s-.987.122-1.328.368-.512.581-.512 1.008c0 .309.085.56.256.752a2.2 2.2 0 0 0 .688.48l.88.384 1.424.624c.437.17.827.378 1.168.624.352.234.629.528.832.88s.304.784.304 1.296c0 .565-.155 1.082-.464 1.552-.299.458-.736.826-1.312 1.104-.565.266-1.243.4-2.032.4zM14 240.584l-10.48-3.456v-1.856L14 231.816v1.696l-5.712 1.696-1.728.512-1.76.48v.064l1.76.48 1.728.496L14 238.952v1.632zm-3.008-1.936H9.728v-4.864h1.264v4.864zm3.2-12.346c0 .886-.208 1.675-.624 2.368-.427.694-1.045 1.243-1.856 1.648-.811.395-1.787.592-2.928.592s-2.117-.202-2.928-.608c-.821-.405-1.445-.96-1.872-1.664-.437-.714-.656-1.52-.656-2.416 0-.704.139-1.29.416-1.76.267-.48.56-.874.88-1.184l1.008.896c-.267.246-.485.528-.656.848s-.256.72-.256 1.2c0 .598.165 1.126.496 1.584.32.459.779.816 1.376 1.072s1.312.384 2.144.384 1.552-.117 2.16-.352c.608-.245 1.077-.592 1.408-1.04.331-.458.496-1.013.496-1.664 0-.32-.048-.624-.144-.912s-.229-.517-.4-.688H9.76v1.936H8.448v-3.408h4.512c.341.342.635.79.88 1.344.235.544.352 1.152.352 1.824zM14 220.708H3.52v-6.592h1.344v4.992h2.992v-4.224H9.2v4.224h3.456v-5.152H14v6.752zm0-8.777H3.52v-1.712l6.224-3.056 2.208-.976v-.048l-1.696.144-1.744.08H3.52v-1.536H14v1.712l-6.224 3.056-2.208.976v.048l1.696-.128a15.5 15.5 0 0 1 1.712-.096H14v1.536zm0-12.026H4.864v3.376H3.52v-8.352h1.344v3.376H14v1.6zm.192-20.18a4.7 4.7 0 0 1-.352 1.824 4.44 4.44 0 0 1-1.056 1.472c-.469.416-1.04.747-1.712.992-.672.235-1.435.352-2.288.352-1.141 0-2.117-.208-2.928-.624-.821-.416-1.445-.981-1.872-1.696-.437-.714-.656-1.53-.656-2.448 0-.64.133-1.21.4-1.712.256-.501.555-.912.896-1.232l1.008.896a2.94 2.94 0 0 0-.672.912 2.58 2.58 0 0 0-.24 1.136 2.76 2.76 0 0 0 .496 1.632c.32.47.779.838 1.376 1.104.597.256 1.312.384 2.144.384s1.552-.128 2.16-.384c.608-.266 1.077-.634 1.408-1.104.331-.48.496-1.034.496-1.664 0-.458-.096-.869-.288-1.232-.203-.362-.475-.698-.816-1.008l.976-.896a4.37 4.37 0 0 1 1.12 1.424c.267.544.4 1.168.4 1.872zM14 175.668l-10.48-3.456v-1.856L14 166.9v1.696l-5.712 1.696-1.728.512-1.76.48v.064l1.76.48 1.728.496L14 174.036v1.632zm-3.008-1.936H9.728v-4.864h1.264v4.864zM14 165.29H3.52v-3.312c0-.768.101-1.445.304-2.032.192-.597.523-1.061.992-1.392.459-.331 1.077-.496 1.856-.496.757 0 1.381.171 1.872.512.491.331.859.795 1.104 1.392.235.587.352 1.259.352 2.016v1.712h4v1.6zm-5.296-1.6v-1.552c0-.853-.165-1.483-.496-1.888s-.843-.608-1.536-.608c-.704 0-1.189.208-1.456.624-.277.416-.416 1.04-.416 1.872v1.552h3.904zM14 157.12l-10.48-3.456v-1.856L14 148.352v1.696l-5.712 1.696-1.728.512-1.76.48v.064l1.76.48 1.728.496L14 155.488v1.632zm-3.008-1.936H9.728v-4.864h1.264v4.864zM14 146.79H3.52v-3.12c0-.714.085-1.344.256-1.888.16-.554.427-.986.8-1.296.373-.32.875-.48 1.504-.48.512 0 .981.15 1.408.448s.72.758.88 1.376h.064c.117-.757.384-1.344.8-1.76s.981-.624 1.696-.624c.693 0 1.269.171 1.728.512.448.331.784.795 1.008 1.392s.336 1.286.336 2.064v3.376zm-6.128-1.6v-1.328c0-.81-.133-1.392-.4-1.744-.277-.362-.683-.544-1.216-.544-.523 0-.891.187-1.104.56s-.32.934-.32 1.68v1.376h3.04zm4.816 0v-1.584c0-.832-.144-1.472-.432-1.92-.299-.448-.773-.672-1.424-.672-.597 0-1.024.224-1.28.672-.267.438-.4 1.078-.4 1.92v1.584h3.536zM14 137.549h-1.344v-2.56H4.864v2.56H3.52v-6.72h1.344v2.56h7.792v-2.56H14v6.72zm0-9.866H3.52v-1.584h9.136v-5.04H14v6.624zm0-8.682h-1.344v-2.56H4.864v2.56H3.52v-6.72h1.344v2.56h7.792v-2.56H14v6.72zm0-11.834H4.864v3.376H3.52v-8.352h1.344v3.376H14v1.6zm0-9.273h-3.68l-6.8 3.488v-1.696l2.96-1.456 1.2-.56 1.232-.576v-.064l-1.232-.592-1.216-.576L3.52 94.47v-1.664l6.8 3.488H14v1.6z">
                                                    </path>
                                                    <path opacity=".5"
                                                        d="M127.675 298.364h1.613l3.228 5.431h.136l3.227-5.431h1.614l-4.205 6.841V310h-1.409v-4.795l-4.204-6.841zm13.77 11.818c-.788 0-1.48-.188-2.074-.563s-1.053-.899-1.387-1.574-.494-1.462-.494-2.363c0-.909.165-1.703.494-2.381s.796-1.204 1.387-1.579 1.286-.563 2.074-.563 1.477.188 2.068.563a3.76 3.76 0 0 1 1.386 1.579c.333.678.5 1.472.5 2.381 0 .901-.167 1.689-.5 2.363s-.792 1.199-1.386 1.574-1.281.563-2.068.563zm0-1.205c.598 0 1.091-.153 1.477-.46a2.72 2.72 0 0 0 .858-1.21c.185-.5.278-1.042.278-1.625s-.093-1.127-.278-1.631-.472-.911-.858-1.221-.879-.466-1.477-.466-1.091.155-1.478.466-.672.717-.858 1.221-.278 1.047-.278 1.631.093 1.125.278 1.625a2.72 2.72 0 0 0 .858 1.21c.387.307.879.46 1.478.46zm11.501-2.545v-5.159h1.341V310h-1.341v-1.477h-.091c-.204.443-.523.82-.954 1.13s-.978.461-1.637.461a2.92 2.92 0 0 1-1.454-.358 2.5 2.5 0 0 1-1-1.091c-.243-.489-.364-1.104-.364-1.847v-5.545h1.341v5.454c0 .637.178 1.144.534 1.523s.818.568 1.375.568c.333 0 .672-.085 1.017-.256s.64-.431.875-.784.358-.801.358-1.346zm3.797 3.568v-8.727h1.295v1.318h.091c.159-.432.447-.782.864-1.051s.886-.404 1.409-.404l.369.006.336.017v1.364c-.046-.012-.15-.029-.313-.051s-.328-.04-.506-.04c-.424 0-.803.089-1.136.267a2.01 2.01 0 0 0-.784.727c-.189.307-.284.657-.284 1.051V310h-1.341zm13.021.205c-.553 0-1.055-.105-1.505-.313a2.58 2.58 0 0 1-1.074-.915c-.265-.401-.398-.886-.398-1.454 0-.5.098-.906.295-1.216s.461-.561.79-.739.693-.31 1.091-.398l1.21-.215 1.29-.154c.333-.038.576-.1.727-.187s.233-.239.233-.455v-.045c0-.561-.153-.997-.46-1.307s-.763-.466-1.381-.466c-.64 0-1.142.14-1.505.42s-.62.58-.767.898l-1.273-.454c.227-.531.53-.944.909-1.239s.799-.508 1.25-.625.902-.182 1.341-.182c.28 0 .602.034.966.102s.721.199 1.062.404.631.513.858.926.341.966.341 1.659V310h-1.341v-1.182h-.068c-.091.19-.242.392-.454.608s-.495.4-.847.551-.782.228-1.29.228zm.205-1.205c.53 0 .977-.104 1.341-.312s.644-.478.829-.807a2.05 2.05 0 0 0 .284-1.04v-1.227c-.057.068-.182.13-.375.187s-.409.101-.659.142l-.721.102-.563.069c-.348.045-.674.119-.977.221s-.542.248-.727.449-.273.466-.273.807c0 .466.172.818.517 1.057s.79.352 1.324.352zm9.765 4.455c-.647 0-1.204-.084-1.67-.25a3.55 3.55 0 0 1-1.165-.648 3.54 3.54 0 0 1-.733-.852l1.068-.75.461.545c.185.208.439.388.761.54s.752.233 1.278.233c.705 0 1.286-.171 1.745-.512s.687-.875.687-1.602v-1.773h-.113c-.099.159-.239.356-.421.591s-.436.438-.773.62-.784.267-1.352.267c-.704 0-1.337-.167-1.898-.5s-.998-.819-1.323-1.455-.483-1.409-.483-2.318c0-.894.157-1.672.471-2.335s.752-1.182 1.313-1.546 1.208-.551 1.943-.551c.568 0 1.019.095 1.352.284s.595.398.773.637l.42.579h.137v-1.386h1.295v8.977c0 .75-.17 1.36-.511 1.83s-.792.82-1.364 1.039-1.201.336-1.898.336zm-.045-4.796c.538 0 .992-.123 1.364-.369s.653-.601.846-1.063.29-1.015.29-1.659c0-.629-.095-1.184-.284-1.665s-.47-.858-.841-1.13-.83-.409-1.375-.409c-.568 0-1.042.144-1.421.431s-.657.675-.846 1.16-.279 1.022-.279 1.613c0 .606.095 1.142.285 1.608s.477.826.852 1.091.848.392 1.409.392zm9.932 1.523c-.841 0-1.567-.186-2.176-.557s-1.074-.898-1.404-1.568-.488-1.459-.488-2.352.162-1.682.488-2.364.788-1.22 1.375-1.602 1.28-.58 2.068-.58a4.15 4.15 0 0 1 1.347.227c.443.152.847.398 1.21.739s.654.784.87 1.341.323 1.242.323 2.057v.568h-6.727v-1.159h5.364c0-.493-.099-.932-.296-1.318s-.469-.692-.829-.915-.777-.335-1.262-.335c-.534 0-.996.132-1.386.397s-.684.603-.892 1.023a3.01 3.01 0 0 0-.313 1.352v.773c0 .659.114 1.218.341 1.676a2.46 2.46 0 0 0 .961 1.04c.409.235.884.352 1.426.352.352 0 .67-.049.954-.147a2.06 2.06 0 0 0 .745-.455c.208-.205.369-.458.483-.761l1.295.363a2.87 2.87 0 0 1-.687 1.159 3.35 3.35 0 0 1-1.194.773c-.473.182-1.005.273-1.596.273zm6.994-5.432V310h-1.341v-8.727h1.296v1.363h.113c.205-.443.515-.799.932-1.068s.955-.409 1.614-.409c.591 0 1.108.121 1.551.364.443.238.788.602 1.034 1.091s.369 1.098.369 1.841V310h-1.341v-5.455c0-.685-.178-1.219-.534-1.602s-.844-.579-1.466-.579c-.428 0-.81.092-1.147.278s-.597.456-.79.813-.29.787-.29 1.295zm11.814-3.477v1.136h-4.523v-1.136h4.523zm-3.205-2.091h1.341v8.318c0 .379.055.663.165.852s.258.311.432.375a1.72 1.72 0 0 0 .562.091c.148 0 .269-.007.364-.023l.227-.045.273 1.205a2.74 2.74 0 0 1-.381.102c-.162.038-.369.057-.619.057a2.7 2.7 0 0 1-1.114-.245c-.359-.163-.659-.411-.897-.744s-.353-.754-.353-1.261v-8.682zm11.248 4.045l-1.205.341c-.076-.201-.187-.396-.335-.585a1.63 1.63 0 0 0-.591-.477c-.25-.125-.57-.188-.96-.188-.534 0-.979.123-1.336.37-.352.242-.528.551-.528.926 0 .333.121.596.364.789s.621.355 1.136.483l1.295.319c.781.189 1.362.479 1.745.869s.574.884.574 1.494c0 .5-.144.947-.432 1.341s-.682.705-1.193.932-1.106.341-1.784.341c-.891 0-1.627-.193-2.211-.58s-.952-.95-1.108-1.693l1.273-.318c.121.47.351.822.688 1.057s.786.352 1.335.352c.625 0 1.121-.133 1.489-.398s.556-.591.556-.966c0-.303-.106-.556-.318-.761s-.538-.364-.977-.466l-1.455-.341c-.799-.189-1.386-.483-1.761-.88s-.557-.904-.557-1.506c0-.493.138-.928.415-1.307a2.82 2.82 0 0 1 1.142-.892c.485-.216 1.034-.324 1.648-.324.863 0 1.541.189 2.034.568a3.07 3.07 0 0 1 1.057 1.5zm10.473-1.954v1.136h-4.523v-1.136h4.523zm-3.205-2.091h1.341v8.318c0 .379.055.663.165.852s.257.311.432.375a1.72 1.72 0 0 0 .562.091c.148 0 .269-.007.364-.023l.227-.045.273 1.205a2.74 2.74 0 0 1-.381.102c-.163.038-.369.057-.619.057a2.7 2.7 0 0 1-1.114-.245c-.36-.163-.659-.411-.898-.744s-.352-.754-.352-1.261v-8.682zm8.673 11c-.788 0-1.479-.188-2.074-.563a3.82 3.82 0 0 1-1.386-1.574c-.329-.674-.494-1.462-.494-2.363 0-.909.165-1.703.494-2.381s.796-1.204 1.386-1.579 1.286-.563 2.074-.563 1.478.188 2.069.563 1.056.901 1.386 1.579.5 1.472.5 2.381c0 .901-.167 1.689-.5 2.363s-.792 1.199-1.386 1.574-1.281.563-2.069.563zm0-1.205c.599 0 1.091-.153 1.478-.46a2.72 2.72 0 0 0 .858-1.21c.185-.5.278-1.042.278-1.625s-.093-1.127-.278-1.631-.472-.911-.858-1.221-.879-.466-1.478-.466-1.091.155-1.477.466-.672.717-.858 1.221-.278 1.047-.278 1.631.093 1.125.278 1.625a2.72 2.72 0 0 0 .858 1.21c.386.307.879.46 1.477.46zm9.297 1.205c-.727 0-1.369-.184-1.926-.551s-.992-.894-1.307-1.569-.471-1.479-.471-2.403c0-.917.157-1.712.471-2.386s.752-1.195 1.313-1.563 1.208-.551 1.943-.551c.568 0 1.017.095 1.347.284s.587.398.761.637l.415.579h.113v-4.295h1.341V310h-1.295v-1.341h-.159c-.099.159-.239.36-.421.602s-.441.453-.778.642-.786.279-1.347.279zm.182-1.205c.538 0 .992-.14 1.364-.42s.653-.676.846-1.176.29-1.086.29-1.745c0-.651-.095-1.221-.284-1.71s-.47-.875-.841-1.148-.829-.414-1.375-.414c-.568 0-1.042.145-1.42.437s-.658.68-.847 1.176-.278 1.046-.278 1.659c0 .622.094 1.186.284 1.694s.477.905.852 1.204.848.443 1.409.443zm9.028 1.228c-.553 0-1.054-.105-1.505-.313a2.58 2.58 0 0 1-1.074-.915c-.265-.401-.398-.886-.398-1.454 0-.5.099-.906.296-1.216s.46-.561.789-.739a4.2 4.2 0 0 1 1.091-.398l1.211-.215 1.289-.154c.334-.038.576-.1.728-.187s.233-.239.233-.455v-.045c0-.561-.154-.997-.461-1.307s-.763-.466-1.38-.466c-.641 0-1.142.14-1.506.42s-.619.58-.767.898l-1.273-.454c.227-.531.53-.944.909-1.239s.8-.508 1.25-.625.902-.182 1.341-.182c.28 0 .602.034.966.102s.722.199 1.063.404.63.513.858.926.34.966.34 1.659V310h-1.34v-1.182h-.069c-.091.19-.242.392-.454.608s-.494.4-.847.551-.782.228-1.29.228zm.205-1.205c.53 0 .977-.104 1.341-.312s.644-.478.829-.807c.19-.33.285-.676.285-1.04v-1.227c-.057.068-.182.13-.375.187a6.22 6.22 0 0 1-.66.142l-.721.102-.563.069c-.348.045-.674.119-.977.221s-.542.248-.727.449-.273.466-.273.807c0 .466.172.818.517 1.057s.79.352 1.324.352zm6.794 4.273a2.93 2.93 0 0 1-.608-.057c-.178-.034-.301-.068-.369-.102l.341-1.182c.325.083.613.113.863.091a1.04 1.04 0 0 0 .665-.335c.197-.197.377-.518.54-.961l.25-.682-3.227-8.772h1.454l2.409 6.954h.091l2.409-6.954h1.455l-3.705 10c-.166.45-.373.824-.619 1.119a2.32 2.32 0 0 1-.858.665c-.322.144-.686.216-1.091.216z">
                                                    </path>
                                                    <path opacity=".5"
                                                        d="M621.628 64.364h1.613l3.228 5.432h.136l3.227-5.432h1.614l-4.205 6.841V76h-1.409v-4.796l-4.204-6.841zm13.77 11.818c-.788 0-1.479-.187-2.074-.562s-1.053-.9-1.386-1.574-.495-1.462-.495-2.364c0-.909.165-1.703.495-2.381a3.81 3.81 0 0 1 1.386-1.58c.595-.375 1.286-.562 2.074-.562s1.477.188 2.068.563 1.057.901 1.386 1.58c.334.678.5 1.472.5 2.381 0 .901-.166 1.689-.5 2.364-.329.674-.791 1.199-1.386 1.574s-1.28.563-2.068.563zm0-1.204c.598 0 1.091-.153 1.477-.46s.672-.71.858-1.21.278-1.042.278-1.625-.092-1.127-.278-1.631-.472-.911-.858-1.222-.879-.466-1.477-.466-1.091.155-1.478.466-.672.718-.858 1.222-.278 1.047-.278 1.631.093 1.125.278 1.625.472.903.858 1.21.879.46 1.478.46zm11.501-2.546v-5.159h1.341V76h-1.341v-1.477h-.091c-.204.443-.522.82-.954 1.131s-.978.46-1.637.46c-.545 0-1.03-.119-1.454-.358s-.758-.606-1-1.091-.364-1.104-.364-1.847v-5.546h1.341v5.455c0 .636.178 1.144.534 1.523s.818.568 1.375.568c.333 0 .672-.085 1.017-.256s.64-.432.875-.784.358-.801.358-1.347zM650.696 76v-8.727h1.295v1.318h.091c.159-.432.447-.782.864-1.051a2.54 2.54 0 0 1 1.409-.403l.369.006.336.017v1.364c-.046-.011-.15-.028-.313-.051a3.07 3.07 0 0 0-.506-.04c-.424 0-.803.089-1.136.267s-.591.417-.784.727-.284.657-.284 1.051V76h-1.341zm13.021.204a3.54 3.54 0 0 1-1.505-.312 2.58 2.58 0 0 1-1.074-.915c-.265-.401-.398-.886-.398-1.455 0-.5.099-.905.296-1.216a2.08 2.08 0 0 1 .789-.739c.33-.178.693-.311 1.091-.398l1.21-.216 1.29-.153c.334-.038.576-.1.727-.187s.233-.239.233-.455v-.045c0-.561-.153-.996-.46-1.307s-.763-.466-1.38-.466c-.641 0-1.143.14-1.506.42s-.619.58-.767.898l-1.273-.455c.227-.53.53-.943.909-1.239a3.41 3.41 0 0 1 1.25-.625c.455-.121.902-.182 1.341-.182.28 0 .602.034.966.102s.722.199 1.062.403.631.513.858.926.341.966.341 1.659V76h-1.341v-1.182h-.068c-.091.189-.242.392-.454.608s-.495.4-.847.551-.782.227-1.29.227zm.205-1.204c.53 0 .977-.104 1.341-.312s.644-.477.829-.807a2.05 2.05 0 0 0 .284-1.04v-1.227c-.056.068-.181.131-.375.188a6.29 6.29 0 0 1-.659.142l-.721.102-.563.068c-.348.045-.674.119-.977.222s-.542.248-.727.449-.273.466-.273.807c0 .466.172.818.517 1.057s.79.352 1.324.352zm9.766 4.454c-.648 0-1.205-.083-1.671-.25s-.854-.379-1.165-.648-.551-.549-.733-.852l1.069-.75a8.26 8.26 0 0 0 .46.546c.185.208.439.388.761.54s.752.233 1.279.233c.704 0 1.285-.17 1.744-.511s.687-.875.687-1.602v-1.773h-.113a7.34 7.34 0 0 1-.421.591c-.178.231-.435.438-.773.619s-.784.267-1.352.267c-.704 0-1.337-.167-1.898-.5s-.998-.818-1.323-1.455-.483-1.409-.483-2.318c0-.894.157-1.672.471-2.335s.752-1.182 1.313-1.546 1.208-.551 1.943-.551c.568 0 1.019.095 1.352.284s.595.398.773.636l.42.58h.137v-1.386h1.295v8.977c0 .75-.17 1.36-.511 1.829s-.792.82-1.364 1.04-1.201.335-1.897.335zm-.046-4.795c.538 0 .992-.123 1.364-.369s.653-.6.846-1.062.29-1.015.29-1.659c0-.629-.095-1.184-.284-1.665s-.47-.858-.841-1.131-.829-.409-1.375-.409c-.568 0-1.042.144-1.42.432s-.658.674-.847 1.159-.278 1.023-.278 1.614c0 .606.094 1.142.284 1.608a2.46 2.46 0 0 0 .852 1.091c.379.261.848.392 1.409.392zm9.932 1.523c-.841 0-1.566-.186-2.176-.557s-1.074-.898-1.404-1.568-.488-1.458-.488-2.352.163-1.682.488-2.364.788-1.22 1.375-1.602 1.281-.58 2.069-.58c.454 0 .903.076 1.346.227a3.33 3.33 0 0 1 1.21.739c.364.337.654.784.87 1.341s.324 1.242.324 2.057v.568h-6.728v-1.159h5.364c0-.492-.099-.932-.296-1.318s-.469-.691-.829-.915-.777-.335-1.261-.335c-.535 0-.997.133-1.387.398s-.684.602-.892 1.023a3.01 3.01 0 0 0-.312 1.352v.773c0 .659.113 1.218.341 1.676s.551.801.96 1.04.884.352 1.426.352c.352 0 .67-.049.954-.148a2.05 2.05 0 0 0 .745-.454c.208-.204.369-.458.483-.761l1.295.364c-.136.439-.365.826-.687 1.159a3.35 3.35 0 0 1-1.194.773 4.42 4.42 0 0 1-1.596.273zm6.994-5.432V76h-1.341v-8.727h1.296v1.364h.113a2.5 2.5 0 0 1 .932-1.068c.417-.273.955-.409 1.614-.409.591 0 1.108.121 1.551.364s.788.602 1.034 1.091.369 1.099.369 1.841V76h-1.341v-5.454c0-.686-.178-1.22-.534-1.602s-.844-.58-1.466-.58c-.428 0-.81.093-1.147.278s-.597.457-.79.813-.29.788-.29 1.296zm11.814-3.477v1.136h-4.523v-1.136h4.523zm-3.204-2.091h1.34V73.5c0 .379.055.663.165.852s.258.311.432.375.366.091.563.091c.147 0 .268-.008.363-.023l.227-.046.273 1.204c-.091.034-.218.068-.38.102a2.81 2.81 0 0 1-.62.057c-.379 0-.75-.081-1.113-.244s-.66-.411-.898-.744-.352-.754-.352-1.261v-8.682zm11.247 4.046l-1.205.341c-.076-.201-.187-.396-.335-.585s-.341-.352-.591-.477-.57-.187-.96-.187c-.534 0-.979.123-1.335.369s-.529.551-.529.926c0 .333.121.597.364.79s.621.354 1.136.483l1.296.318c.78.189 1.361.479 1.744.869s.574.884.574 1.494c0 .5-.144.947-.432 1.341s-.682.705-1.193.932-1.106.341-1.784.341c-.89 0-1.627-.193-2.211-.579s-.952-.951-1.107-1.693l1.272-.318c.121.47.351.822.688 1.057s.786.352 1.335.352c.625 0 1.121-.133 1.489-.398s.556-.591.556-.966c0-.303-.106-.557-.318-.761s-.538-.364-.977-.466l-1.455-.341c-.799-.189-1.386-.483-1.761-.881s-.557-.903-.557-1.506c0-.492.139-.928.415-1.307s.661-.676 1.142-.892 1.034-.324 1.648-.324c.863 0 1.541.189 2.034.568s.848.879 1.057 1.5zm10.223 6.954c-.788 0-1.479-.187-2.074-.562s-1.053-.9-1.386-1.574-.495-1.462-.495-2.364c0-.909.165-1.703.495-2.381a3.81 3.81 0 0 1 1.386-1.58c.595-.375 1.286-.562 2.074-.562s1.477.188 2.068.563 1.057.901 1.386 1.58c.334.678.5 1.472.5 2.381 0 .901-.166 1.689-.5 2.364-.329.674-.791 1.199-1.386 1.574s-1.28.563-2.068.563zm0-1.204c.598 0 1.091-.153 1.477-.46s.672-.71.858-1.21.278-1.042.278-1.625-.092-1.127-.278-1.631-.472-.911-.858-1.222-.879-.466-1.477-.466-1.091.155-1.478.466-.672.718-.858 1.222-.278 1.047-.278 1.631.093 1.125.278 1.625.472.903.858 1.21.879.46 1.478.46zm7.342-4.227V76h-1.341v-8.727h1.296v1.364h.113c.205-.443.515-.799.932-1.068s.955-.409 1.614-.409c.591 0 1.108.121 1.551.364s.788.602 1.034 1.091.369 1.099.369 1.841V76h-1.341v-5.454c0-.686-.178-1.22-.534-1.602s-.844-.58-1.466-.58c-.428 0-.81.093-1.147.278s-.597.457-.79.813-.29.788-.29 1.296zm-111.281 24V100h-1.341v-8.727h1.295v1.364h.114c.205-.443.515-.799.932-1.068s.954-.409 1.613-.409c.591 0 1.108.121 1.552.364s.787.602 1.034 1.091.369 1.099.369 1.841V100h-1.341v-5.454c0-.686-.178-1.22-.534-1.602s-.845-.58-1.466-.58a2.34 2.34 0 0 0-1.148.278c-.333.186-.596.457-.789.813s-.29.788-.29 1.296zm11.677 5.432c-.841 0-1.566-.186-2.176-.557s-1.074-.898-1.403-1.568-.489-1.458-.489-2.352.163-1.682.489-2.364.788-1.22 1.375-1.602 1.28-.58 2.068-.58a4.14 4.14 0 0 1 1.347.227 3.34 3.34 0 0 1 1.21.739c.363.337.653.784.869 1.341s.324 1.242.324 2.057v.568h-6.727v-1.159h5.363c0-.492-.098-.932-.295-1.318s-.47-.691-.83-.915-.776-.335-1.261-.335c-.534 0-.996.133-1.386.398s-.684.602-.892 1.023-.313.871-.313 1.352v.773c0 .659.114 1.218.341 1.676s.551.801.96 1.04.885.352 1.426.352a2.9 2.9 0 0 0 .955-.148c.288-.102.536-.254.744-.454s.37-.458.483-.761l1.296.364a2.88 2.88 0 0 1-.688 1.159c-.322.33-.72.587-1.193.773s-1.006.273-1.597.273zm6.419-8.909l2.091 3.568 2.091-3.568h1.546l-2.819 4.364 2.819 4.364h-1.546l-2.091-3.386-2.091 3.386h-1.545l2.773-4.364-2.773-4.364h1.545zm11.436 0v1.136h-4.522v-1.136h4.522zm-3.204-2.091h1.341V97.5c0 .379.055.663.165.852a.85.85 0 0 0 .431.375c.178.061.366.091.563.091a2.39 2.39 0 0 0 .364-.023l.227-.046.273 1.204c-.091.034-.218.069-.381.103s-.369.057-.619.057c-.379 0-.75-.082-1.114-.245s-.659-.411-.898-.744-.352-.754-.352-1.261v-8.682zm9.909 5.205v1.25h-5.091v-1.25h5.091zm5.882 9.069c-.648 0-1.204-.084-1.67-.25a3.55 3.55 0 0 1-1.165-.648 3.54 3.54 0 0 1-.733-.852l1.068-.75a8.76 8.76 0 0 0 .46.545c.186.208.44.388.762.54s.752.233 1.278.233c.705 0 1.286-.171 1.744-.512s.688-.875.688-1.602v-1.773h-.114c-.098.159-.238.356-.42.591s-.436.438-.773.619-.784.267-1.352.267c-.705 0-1.337-.167-1.898-.5s-.998-.818-1.324-1.455-.483-1.409-.483-2.318c0-.894.158-1.672.472-2.335s.752-1.182 1.312-1.546 1.209-.551 1.944-.551c.568 0 1.019.095 1.352.284s.595.398.773.636l.42.58h.136v-1.386h1.296v8.977c0 .75-.171 1.36-.512 1.83s-.791.82-1.363 1.039c-.568.224-1.201.336-1.898.336zm-.045-4.796c.538 0 .992-.123 1.363-.369s.654-.6.847-1.062.29-1.015.29-1.659c0-.629-.095-1.184-.284-1.665s-.47-.858-.841-1.131-.83-.409-1.375-.409c-.569 0-1.042.144-1.421.432s-.657.674-.846 1.159-.279 1.023-.279 1.614c0 .606.095 1.142.284 1.608s.478.826.853 1.091.848.392 1.409.392zm9.931 1.523c-.84 0-1.566-.186-2.176-.557s-1.074-.898-1.403-1.568-.489-1.458-.489-2.352.163-1.682.489-2.364.788-1.22 1.375-1.602 1.28-.58 2.068-.58c.455 0 .904.076 1.347.227a3.34 3.34 0 0 1 1.21.739c.364.337.653.784.869 1.341s.324 1.242.324 2.057v.568h-6.727v-1.159h5.363c0-.492-.098-.932-.295-1.318s-.47-.691-.83-.915-.776-.335-1.261-.335c-.534 0-.996.133-1.386.398s-.684.602-.892 1.023-.313.871-.313 1.352v.773c0 .659.114 1.218.341 1.676s.551.801.96 1.04.885.352 1.426.352a2.9 2.9 0 0 0 .955-.148c.288-.102.536-.254.744-.454s.37-.458.483-.761l1.296.364a2.88 2.88 0 0 1-.688 1.159c-.322.33-.719.587-1.193.773s-1.006.273-1.597.273zm6.995-5.432V100h-1.341v-8.727h1.295v1.364h.114c.205-.443.515-.799.932-1.068s.954-.409 1.613-.409c.591 0 1.108.121 1.552.364s.787.602 1.034 1.091.369 1.099.369 1.841V100h-1.341v-5.454c0-.686-.178-1.22-.534-1.602s-.845-.58-1.466-.58a2.34 2.34 0 0 0-1.148.278c-.333.186-.596.457-.789.813s-.29.788-.29 1.296zm12.518 5.25v-8.727h1.296v1.364h.113c.182-.466.476-.828.881-1.085s.892-.392 1.46-.392c.576 0 1.055.131 1.438.392s.687.619.903 1.085h.091c.224-.451.559-.809 1.006-1.074s.983-.403 1.608-.403c.78 0 1.418.244 1.915.733s.744 1.241.744 2.267V100h-1.341v-5.841c0-.644-.176-1.104-.529-1.381s-.767-.415-1.244-.415c-.613 0-1.089.186-1.426.557s-.506.833-.506 1.398V100h-1.363v-5.977c0-.496-.161-.896-.483-1.199s-.737-.46-1.245-.46a1.84 1.84 0 0 0-.977.278c-.299.186-.541.443-.727.773s-.273.703-.273 1.131V100h-1.341zm17.452.182c-.788 0-1.479-.188-2.074-.563s-1.053-.9-1.386-1.574-.495-1.462-.495-2.364c0-.909.165-1.703.495-2.381a3.81 3.81 0 0 1 1.386-1.58c.595-.375 1.286-.562 2.074-.562s1.477.188 2.068.563 1.057.901 1.387 1.58.5 1.472.5 2.381c0 .901-.167 1.689-.5 2.364s-.792 1.199-1.387 1.574-1.28.563-2.068.563zm0-1.205c.598 0 1.091-.153 1.477-.46s.673-.71.858-1.21.279-1.042.279-1.625-.093-1.127-.279-1.631-.471-.911-.858-1.222-.879-.466-1.477-.466-1.091.155-1.477.466-.673.718-.858 1.222-.279 1.047-.279 1.631.093 1.125.279 1.625.471.903.858 1.21.878.46 1.477.46zm9.297 1.205c-.727 0-1.369-.184-1.926-.551s-.993-.894-1.307-1.568-.472-1.479-.472-2.403c0-.917.158-1.712.472-2.386s.752-1.195 1.312-1.562 1.209-.551 1.944-.551c.568 0 1.017.095 1.346.284s.587.398.762.636l.414.58h.114v-4.295h1.341V100h-1.296v-1.341h-.159c-.098.159-.238.36-.42.602s-.441.453-.779.642-.786.279-1.346.279zm.182-1.205c.538 0 .992-.14 1.363-.421s.654-.676.847-1.176.29-1.085.29-1.744c0-.652-.095-1.222-.284-1.71s-.47-.875-.841-1.148-.83-.415-1.375-.415c-.569 0-1.042.146-1.421.438s-.657.68-.846 1.176-.279 1.045-.279 1.659a4.82 4.82 0 0 0 .284 1.693 2.77 2.77 0 0 0 .853 1.205c.378.295.848.443 1.409.443zm10.119 1.205c-.841 0-1.566-.186-2.176-.557s-1.074-.898-1.404-1.568-.488-1.458-.488-2.352.163-1.682.488-2.364.788-1.22 1.375-1.602 1.281-.58 2.069-.58c.454 0 .903.076 1.346.227a3.33 3.33 0 0 1 1.21.739c.364.337.654.784.87 1.341s.324 1.242.324 2.057v.568h-6.728v-1.159h5.364c0-.492-.098-.932-.295-1.318a2.23 2.23 0 0 0-.83-.915c-.356-.224-.777-.335-1.261-.335-.534 0-.997.133-1.387.398s-.683.602-.892 1.023a3.01 3.01 0 0 0-.312 1.352v.773c0 .659.113 1.218.341 1.676s.551.801.96 1.04.884.352 1.426.352a2.91 2.91 0 0 0 .955-.148c.287-.102.536-.254.744-.454s.369-.458.483-.761l1.295.364c-.136.439-.365.826-.687 1.159s-.72.587-1.193.773-1.006.273-1.597.273zm6.994-11.818V100h-1.341V88.364h1.341zm8.638 4.864l-1.204.341c-.076-.201-.188-.396-.336-.585s-.341-.352-.591-.477-.57-.187-.96-.187c-.534 0-.979.123-1.335.369s-.528.551-.528.926c0 .333.121.597.363.79s.621.354 1.137.483l1.295.318c.78.189 1.362.479 1.744.869s.574.884.574 1.494c0 .5-.144.947-.432 1.341s-.681.705-1.193.932-1.106.341-1.784.341c-.89 0-1.627-.193-2.21-.58s-.953-.951-1.108-1.693l1.273-.318c.121.47.35.822.687 1.057s.786.352 1.335.352c.625 0 1.122-.133 1.489-.398s.557-.591.557-.966c0-.303-.106-.557-.318-.761s-.538-.364-.978-.466l-1.454-.341c-.799-.189-1.387-.483-1.762-.881s-.556-.903-.556-1.506a2.16 2.16 0 0 1 .414-1.307c.281-.379.661-.676 1.142-.892s1.035-.324 1.648-.324c.864 0 1.542.189 2.034.568s.849.879 1.057 1.5z">
                                                    </path>
                                                </g>
                                                <defs>
                                                    <linearGradient id="A" x1="431.711" y1="333.585" x2="431.711"
                                                        y2="41.74" gradientUnits="userSpaceOnUse">
                                                        <stop></stop>
                                                        <stop offset="1" stop-color="#234531"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="k2-performance-graph-tag">
                                            <div data-wf--eyebrow--variant="dark"
                                                class="k2-eyebrow w-variant-39ac125d-48e8-74b9-8963-8c204c6e70d0">
                                                <div>Same investment compounding return</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="k2-tabs-panel radar-panel" id="tabs-3-tab-5-panel" role="tabpanel"
                                aria-labelledby="tabs-3-tab-5" inert="">
                                <div class="k2-tabs-row">
                                    <div class="k2-tabs-col">
                                        <div data-wf--eyebrow--variant="label"
                                            class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                            <div class="k2-eyebrow-slashes w-embed"><svg viewBox="0 0 35 11" fill="none"
                                                    stroke="currentColor" stroke-width="1.768" stroke-linecap="round">
                                                    <path
                                                        d="M.883 9.754l7.254-8.645m1.137 8.645l7.254-8.645m1.137 8.645l7.254-8.645m1.138 8.645l7.254-8.645">
                                                    </path>
                                                </svg></div>
                                            <div>Enterprise ecosystem</div>
                                        </div>
                                        <div data-color="green-light" data-mw="100" data-op="100"
                                            data-wf--heading--variant="h2"
                                            class="k2-heading w-variant-48067f6b-129e-96ba-1732-913f89e63e21 w-richtext">
                                            <h3>Foundation<em></em></h3>
                                        </div>
                                    </div>
                                    <div class="k2-tabs-col k2-tabs-col-2">
                                        <div data-op="70" data-font-weight="300" data-mw="100"
                                            data-wf--paragraph--variant="base" class="k2-text w-richtext">
                                            <p>Plugs into the stack you already run on</p>
                                        </div>
                                        <div data-wf--cta--variant="base" class="k2-cta">
                                            <div class="k2-clickable"><a aria-label="Get Demo"
                                                    data-wf-native-id-path="72ec922b-ce4e-cff8-6ff5-e0b904c162a5:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-ao-click-engagement-tracking="true"
                                                    data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                                    data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%2272ec922b-ce4e-cff8-6ff5-e0b904c162a5%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                                    href="/get-a-demo-artemis" class="k2-action w-inline-block"></a>
                                            </div>
                                            <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                            <div aria-hidden="true" class="k2-cta-icon">
                                                <div data-wf--icon---arrow--variant="base"
                                                    class="k2-icon-arrow w-embed"><svg viewBox="0 0 22 19"
                                                        fill="currentColor">
                                                        <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                        <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                        <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                        <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                        <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                        <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                        <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                        <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                        <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                        <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                        <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                                    </svg></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-foundation hide-mobile-landscape">
                                    <div class="k2-foundation-col">
                                        <div data-op="100" data-mw="100" data-wf--heading--variant="h5"
                                            class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                            <h4>Models</h4>
                                        </div>
                                        <div class="k2-foundation-list">
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f53de870ee97256ee255e_anthropic.svg"
                                                        loading="lazy" alt="" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f586318f2e3724e354da2_openai.svg"
                                                        loading="lazy" alt="OpenAI" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863c8e473f4f48cea90_llama.svg"
                                                        loading="lazy" alt="Meta" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863c47cf07fcfcc83f9_cohere.svg"
                                                        loading="lazy" alt="Cohere" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863a8d33b4b6866fba0_gemini.svg"
                                                        loading="lazy" alt="Gemini" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f586370d3c39147a42f58_mistral.svg"
                                                        loading="lazy" alt="Mistral" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f56b11459ac9da057a8f3_more.svg"
                                                        loading="lazy" alt="" class="k2-img">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-foundation-col">
                                        <div data-op="100" data-mw="100" data-wf--heading--variant="h5"
                                            class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                            <h4>Channels</h4>
                                        </div>
                                        <div class="k2-foundation-list">
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58635771f2349bc362a9_slack.svg"
                                                        loading="lazy" alt="Slack" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58638c85d582eff076a3_ms-teams.svg"
                                                        loading="lazy" alt="Microsoft Teams" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58634915b331424de8d3_zoom.svg"
                                                        loading="lazy" alt="Zoom" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863f7c84dd4de9245e7_genesys.svg"
                                                        loading="lazy" alt="Genesys" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58638170bfd82adc72dd_webex.svg"
                                                        loading="lazy" alt="Webex" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f593d3dc2f04e60c50411_voice.svg"
                                                        loading="lazy" alt="Voice" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f56b11459ac9da057a8f3_more.svg"
                                                        loading="lazy" alt="" class="k2-img">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-foundation-col">
                                        <div data-op="100" data-mw="100" data-wf--heading--variant="h5"
                                            class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                            <h4>Data sources</h4>
                                        </div>
                                        <div class="k2-foundation-list">
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863f5a81fcee2a0e34b_salesforce.svg"
                                                        loading="lazy" alt="Salesforce" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863d16cf4d6a81890f3_servicenow.svg"
                                                        loading="lazy" alt="ServiceNow" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f586318f2e3724e354d9c_zendesk.svg"
                                                        loading="lazy" alt="Zendesk" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863f52fabf7d5440bdb_epic.svg"
                                                        loading="lazy" alt="Epic" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863d16cf4d6a81890f3_servicenow.svg"
                                                        loading="lazy" alt="ServiceNow" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f586370d3c39147a42f5c_sap.svg"
                                                        loading="lazy" alt="SAP" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f56b11459ac9da057a8f3_more.svg"
                                                        loading="lazy" alt="" class="k2-img">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="k2-foundation-col">
                                        <div data-op="100" data-mw="100" data-wf--heading--variant="h5"
                                            class="k2-heading w-variant-b899918a-32e8-096e-03b6-9c3ecf77d939 w-richtext">
                                            <h4>Cloud / Infra</h4>
                                        </div>
                                        <div class="k2-foundation-list">
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58658170bfd82adc73a8_aws.svg"
                                                        loading="lazy" alt="AWS" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5865b832185db01689ac_azure.svg"
                                                        loading="lazy" alt="Azure" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58636ef061906ff2f3a9_google-cloud.svg"
                                                        loading="lazy" alt="Google Cloud" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f5863a8d33b4b6866fba3_private-vpc.svg"
                                                        loading="lazy" alt="VPC" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58644e5b888736c07e4b_on-premise.svg"
                                                        loading="lazy" alt="On Premise" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f58638c85d582eff076a6_hybrid.svg"
                                                        loading="lazy" alt="Hybrid" class="k2-img">
                                                </div>
                                            </div>
                                            <div class="k2-foundation-item">
                                                <div data-wf--image--variant="landscape-3-1"
                                                    class="k2-img-wrapper w-variant-0ab2b5a6-b4d8-b8a8-c9eb-dbcba112f367">
                                                    <img decoding="async"
                                                        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0f56b11459ac9da057a8f3_more.svg"
                                                        loading="lazy" alt="" class="k2-img">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-foundation hide-mobile">
                                    <div class="k2-foundation-col padding-0">
                                        <div class="w-embed">
                                            <div id="radar-wrap" style="width: 100%;margin: auto;max-width: 980px;">
                                            </div>
                                            <style>
                                                #radar-wrap svg {
                                                    width: 100%;
                                                    height: auto;
                                                }
                                            </style>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            " },

  { name: "KoreSection7Section", source: "k2-section", tag: "section", attrs: {"className": "k2-section"}, html: "
                <div class="k2-container k2-container-hero-4 padding-0">
                    <div class="k2-demo-video">
                        <div class="w-embed">
                            <div class="demo-video">

                                <div class="video-iframe-wrap">
                                    <iframe id="vimeo-player"
                                        src="https://player.vimeo.com/video/1194359504?controls=0&amp;autoplay=1&amp;muted=1&amp;playsinline=1"
                                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen=""
                                        title="Demo video" data-ready="true"></iframe>
                                </div>

                                <div class="video-overlay">
                                    <div class="video-click-layer" id="video-click-layer" role="button"
                                        aria-label="Play or pause video" tabindex="0"></div>

                                    <button class="custom-play" id="custom-play" aria-label="Play video">
                                        Play Video
                                        <svg width="21" height="24" viewBox="0 0 21 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M0.750198 1.2997L18.9811 11.8253L0.750198 22.3509L0.750198 1.2997Z"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-dasharray="0.09 3.58"></path>
                                        </svg>
                                    </button>

                                    <button class="custom-pause" id="custom-pause" aria-label="Pause video">
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <!-- PROGRESS -->
                                <div class="video-progress-container" id="video-progress-container" role="group"
                                    aria-label="Video progress">
                                    <div class="video-time" id="current-time" aria-label="Current time">2:19</div>
                                    <div class="video-progress-wrap" id="video-progress-wrap" role="slider"
                                        aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="15"
                                        tabindex="0">
                                        <div class="video-progress-bar" id="video-progress-bar"
                                            style="width: 15.0453%;"></div>
                                    </div>
                                    <div class="video-time" id="total-time" aria-label="Total duration">15:29</div>
                                </div>

                                <!-- CTA -->
                                <div class="bamform-cta" id="bamform-cta" role="complementary"
                                    aria-label="Book a meeting">
                                    <div class="bamform-cta-text">
                                        <strong>Book a meeting</strong>
                                        <p>Start AI-programming your next AI Agents</p>
                                    </div>
                                    <button class="bam-open" aria-label="Open booking form">BOOK NOW</button>
                                </div>

                            </div>
                        </div>
                        <div class="w-embed">
                            <style>
                                .demo-video,
                                .video-iframe-wrap {
                                    position: relative
                                }

                                .demo-video {
                                    overflow: hidden
                                }

                                .video-iframe-wrap iframe {
                                    width: 100%;
                                    aspect-ratio: 16/9;
                                    border: 0;
                                    display: block
                                }

                                /* Overlay: pointer-events off so children handle all clicks */
                                .video-overlay {
                                    position: absolute;
                                    inset: 0;
                                    pointer-events: none
                                }

                                .video-click-layer {
                                    position: absolute;
                                    inset: 0;
                                    z-index: 2;
                                    cursor: pointer;
                                    pointer-events: auto
                                }

                                /* \u2500\u2500 PLAY BUTTON \u2500\u2500 */
                                .custom-play {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    display: flex;
                                    align-items: center;
                                    gap: 24px;
                                    padding: 12px 16px 12px 24px;
                                    border: 0;
                                    background: #fff;
                                    color: #000;
                                    font: 400 italic 16px Inter;
                                    cursor: pointer;
                                    pointer-events: auto;
                                    box-shadow: 0 10px 40px rgba(0, 0, 0, .35);
                                    /* Use opacity+visibility so transition works correctly */
                                    opacity: 1;
                                    visibility: visible;
                                    transition: opacity .25s, visibility .25s, background .35s cubic-bezier(.22, .61, .36, 1), color .35s cubic-bezier(.22, .61, .36, 1);
                                    z-index: 10
                                }

                                .custom-play.hidden {
                                    opacity: 0;
                                    visibility: hidden;
                                    pointer-events: none
                                }

                                .custom-play:hover {
                                    background: #234531;
                                    color: #fff
                                }

                                .custom-play svg {
                                    width: 32px;
                                    height: 32px
                                }

                                /* \u2500\u2500 PAUSE BUTTON \u2500\u2500 */
                                .custom-pause {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    width: 72px;
                                    height: 72px;
                                    transform: translate(-50%, -50%);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border: 0;
                                    border-radius: 50%;
                                    background: rgba(0, 0, 0, .55);
                                    backdrop-filter: blur(14px);
                                    cursor: pointer;
                                    opacity: 0;
                                    visibility: hidden;
                                    pointer-events: none;
                                    box-shadow: 0 10px 40px rgba(0, 0, 0, .35), inset 0 0 0 1px rgba(255, 255, 255, .12);
                                    transition: opacity .25s, visibility .25s, background .35s cubic-bezier(.22, .61, .36, 1);
                                    z-index: 11
                                }

                                .custom-pause.show {
                                    opacity: 1;
                                    visibility: visible;
                                    pointer-events: auto
                                }

                                .custom-pause:hover {
                                    background: rgba(255, 255, 255, .16)
                                }

                                .custom-pause svg {
                                    width: 24px;
                                    height: 24px;
                                    fill: #fff
                                }

                                /* \u2500\u2500 PROGRESS BAR \u2500\u2500 */
                                .video-progress-container {
                                    position: absolute;
                                    left: 24px;
                                    right: 24px;
                                    bottom: 16px;
                                    display: flex;
                                    align-items: center;
                                    gap: 14px;
                                    opacity: 0;
                                    visibility: hidden;
                                    transition: opacity .35s, visibility .35s;
                                    z-index: 12
                                }

                                .video-progress-container.show {
                                    opacity: 1;
                                    visibility: visible
                                }

                                .video-time {
                                    min-width: 40px;
                                    padding: 4px 10px;
                                    font-size: 12px;
                                    font-weight: 500;
                                    text-align: center;
                                    border-radius: 20px;
                                    background: rgba(0, 0, 0, .5)
                                }

                                .video-progress-wrap {
                                    position: relative;
                                    flex: 1;
                                    height: 6px;
                                    border-radius: 999px;
                                    overflow: hidden;
                                    cursor: pointer;
                                    background: rgba(255, 255, 255, .16)
                                }

                                .video-progress-bar {
                                    width: 0;
                                    height: 100%;
                                    background: #5cc83a;
                                    border-radius: 999px;
                                    transition: width .08s linear
                                }

                                /* Disable transition during seek for instant feedback */
                                .video-progress-bar.no-transition {
                                    transition: none
                                }

                                /* \u2500\u2500 CTA CARD \u2500\u2500 */
                                .bamform-cta {
                                    position: absolute;
                                    left: 1rem;
                                    right: 1rem;
                                    bottom: 4.2rem;
                                    max-width: 27rem;
                                    margin-left: auto;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    gap: 1rem;
                                    padding: .75rem;
                                    background: #fff;
                                    border-radius: 12px;
                                    opacity: 0;
                                    pointer-events: none;
                                    transform: translateY(40px);
                                    transition: .35s cubic-bezier(.22, .61, .36, 1);
                                    z-index: 12
                                }

                                .bamform-cta.show {
                                    opacity: 1;
                                    pointer-events: auto;
                                    transform: translateY(0)
                                }

                                .bamform-cta-text strong {
                                    display: block;
                                    margin-bottom: 6px;
                                    font-size: 1rem;
                                    color: #000
                                }

                                .bamform-cta-text p {
                                    font-size: 14px;
                                    color: #5f6368
                                }

                                .bam-open {
                                    border: 0;
                                    padding: .75rem 1rem;
                                    border-radius: 8px;
                                    background: #000;
                                    color: #fff;
                                    cursor: pointer;
                                    /* Prevent accidental double-click submissions */
                                    user-select: none
                                }

                                /* \u2500\u2500 POPUP OVERLAY \u2500\u2500 */
                                .bamform-overlay {
                                    position: fixed;
                                    inset: 0;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background: rgba(0, 0, 0, .72);
                                    opacity: 0;
                                    pointer-events: none;
                                    transition: opacity .45s;
                                    z-index: 9999
                                }

                                .bamform-overlay.show {
                                    opacity: 1;
                                    pointer-events: auto
                                }

                                .bamform-popup {
                                    position: relative;
                                    width: 100%;
                                    max-width: 900px;
                                    background: #fff;
                                    overflow: hidden;
                                    opacity: 0;
                                    transform: translateY(50px) scale(.95);
                                    transition:
                                        transform .65s cubic-bezier(.22, .61, .36, 1),
                                        opacity .45s,
                                        max-width .8s cubic-bezier(.22, .61, .36, 1)
                                }

                                .bamform-overlay.show .bamform-popup {
                                    opacity: 1;
                                    transform: translateY(0) scale(1)
                                }

                                .bamform-popup.is-confirmation {
                                    max-width: 520px
                                }

                                .bamform-close {
                                    position: absolute;
                                    top: 16px;
                                    right: 16px;
                                    width: 42px;
                                    height: 42px;
                                    text-align: center;
                                    border: 0;
                                    border-radius: 50%;
                                    background: rgba(0, 0, 0, .7);
                                    color: #fff;
                                    font-size: 24px;
                                    cursor: pointer;
                                    z-index: 20
                                }

                                .bamform-meeting {
                                    min-height: 420px
                                }

                                .bamform-meeting iframe {
                                    width: 100%;
                                    border: 0
                                }

                                .bamform-popup.is-confirmation .bamform-meeting {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center
                                }

                                .bamform-popup.is-confirmation .bamform-meeting .meetings-iframe-container {
                                    width: 100%
                                }

                                .bamform-popup.is-confirmation iframe {
                                    min-height: 480px !important
                                }

                                /* \u2500\u2500 RESPONSIVE \u2500\u2500 */
                                @media(max-width:991px) {
                                    .bamform-popup {
                                        width: calc(100% - 20px)
                                    }
                                }

                                @media(max-width:767px) {
                                    .custom-play {
                                        gap: 12px;
                                        padding: 6px 8px 6px 12px
                                    }

                                    .custom-pause {
                                        width: 48px;
                                        height: 48px
                                    }

                                    .video-progress-container {
                                        left: 16px;
                                        right: 16px
                                    }

                                    .bamform-cta {
                                        left: 16px;
                                        right: 16px;
                                        bottom: 52px;
                                        flex-direction: column;
                                        align-items: flex-start
                                    }

                                    .bam-open {
                                        width: 100%
                                    }

                                    .bamform-meeting {
                                        min-height: 700px
                                    }
                                }

                                @media(max-width:480px) {
                                    .bamform-cta-text {
                                        display: none
                                    }

                                    .bamform-cta {
                                        padding: 6px
                                    }
                                }
                            </style>
                        </div>
                    </div>
                </div>
            " },

  { name: "KoreK2SectionScrollTabsSection", source: "k2-section k2-section-scroll-tabs", tag: "section", attrs: {"className": "k2-section k2-section-scroll-tabs", "style": "translate: none; rotate: none; scale: none; inset: 0px auto auto 0px; margin: 0px; max-width: 9973.6px; width: 9973.6px; max-height: 1989.97px; height: 1989.97px; padding: 0px; transform: translate(0px, 0px);"}, html: "
                    <div class="k2-container">
                        <div class="k2-header-row">
                            <div class="k2-tabs-col">
                                <div data-color="green-light" data-mw="100" data-op="100" data-wf--heading--variant="h3"
                                    class="k2-heading w-variant-22038843-20e3-da71-48de-e1fe5db4f9f0 w-richtext">
                                    <h3>A real difference<em> with AI</em></h3>
                                </div>
                                <div data-op="70" data-font-weight="300" data-mw="100"
                                    data-wf--paragraph--variant="medium"
                                    class="k2-text w-variant-02404dae-b9b0-4e85-c5f5-f41da6cf14a9 w-richtext">
                                    <p>Nine ways the Kore.ai Agent Platform does the work.</p>
                                </div>
                            </div>
                            <div class="k2-tabs-col k2-tabs-col-2">
                                <div data-wf--cta--variant="base" class="k2-cta">
                                    <div class="k2-clickable"><a aria-label="Get Demo"
                                            data-wf-native-id-path="ed87b8de-e496-9c62-97b8-eb04c8309133:6d131e9e-249b-9bfd-c8f6-275299f65082:6d131e9e-249b-9bfd-c8f6-275299f65084"
                                            data-wf-ao-click-engagement-tracking="true"
                                            data-wf-element-id="6d131e9e-249b-9bfd-c8f6-275299f65084"
                                            data-wf-component-context="%5B%7B%22componentId%22%3A%226bf41666-4dfe-175d-9251-9e6ab7b53581%22%2C%22instanceId%22%3A%22ed87b8de-e496-9c62-97b8-eb04c8309133%22%7D%2C%7B%22componentId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65083%22%2C%22instanceId%22%3A%226d131e9e-249b-9bfd-c8f6-275299f65082%22%7D%5D"
                                            href="/get-a-demo-artemis" class="k2-action w-inline-block"></a></div>
                                    <div aria-hidden="true" class="k2-cta-text">Get Demo</div>
                                    <div aria-hidden="true" class="k2-cta-icon">
                                        <div data-wf--icon---arrow--variant="base" class="k2-icon-arrow w-embed"><svg
                                                viewBox="0 0 22 19" fill="currentColor">
                                                <circle cx="0.795" cy="9.701" r="0.76" style="--i:0"></circle>
                                                <circle cx="4.465" cy="9.701" r="0.76" style="--i:1"></circle>
                                                <circle cx="8.135" cy="9.701" r="0.76" style="--i:2"></circle>
                                                <circle cx="11.805" cy="9.701" r="0.76" style="--i:3"></circle>
                                                <circle cx="15.475" cy="9.701" r="0.76" style="--i:4"></circle>

                                                <circle cx="12.431" cy="17.861" r="0.76" style="--i:3"></circle>
                                                <circle cx="15.005" cy="15.246" r="0.76" style="--i:4"></circle>
                                                <circle cx="17.580" cy="12.630" r="0.76" style="--i:5"></circle>
                                                <circle cx="20.155" cy="10.015" r="0.76" style="--i:6"></circle>

                                                <circle cx="18.199" cy="7.400" r="0.76" style="--i:5"></circle>
                                                <circle cx="15.624" cy="4.784" r="0.76" style="--i:4"></circle>
                                                <circle cx="13.050" cy="2.169" r="0.76" style="--i:3"></circle>
                                            </svg></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="k2-scroll-tabs-container">
                            <div data-current="Build with AI" data-easing="ease" data-duration-in="0"
                                data-duration-out="0" class="k2-scroll-tabs w-tabs">
                                <div class="k2-scroll-tabs-content w-tab-content">
                                    <div data-w-tab="Build with AI"
                                        class="k2-scroll-tabs-content-pane w-tab-pane w--tab-active"
                                        id="w-tabs-0-data-w-pane-0" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-0"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200eedc739e9f01c828053_AI-tab-bg-01-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200eedc739e9f01c828053_AI-tab-bg-01-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200eedc739e9f01c828053_AI-tab-bg-01.webp 884w"
                                            alt="AI Tab BG 01"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200eedc739e9f01c828053_AI-tab-bg-01.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1; visibility: inherit;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 1; visibility: inherit;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <line x1="0.857242" y1="12.9174" x2="10.0399" y2="1.97394"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></line>
                                                            <line x1="11.1424" y1="12.9174" x2="20.3251" y2="1.97394"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></line>
                                                        </svg>
                                                    </div>
                                                    <div>Build with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Nobody else has ABL\u2122</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>ABL is a purpose-built compilable agent language for AI agents. Using
                                                    ABL cuts thousands of code hours. Faster production; highest
                                                    quality.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Orchestrate with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-1" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-1"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f1c7625f3aa1c41780b_AI-tab-bg-02-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f1c7625f3aa1c41780b_AI-tab-bg-02-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f1c7625f3aa1c41780b_AI-tab-bg-02.webp 884w"
                                            alt="AI Tab BG 02"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f1c7625f3aa1c41780b_AI-tab-bg-02.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.0508 4.46875L14.2968 0.855941"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></path>
                                                            <path d="M11.0508 10.3711L14.2968 13.9839"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></path>
                                                            <path d="M4.10352 4.46875L0.857475 0.855941"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></path>
                                                            <path d="M4.10352 10.3711L0.857475 13.9839"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></path>
                                                        </svg>
                                                    </div>
                                                    <div>Orchestrate with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Others route. We orchestrate.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>Agents run in parallel, each with a bounded context. One agent
                                                    failing won\u2019t unwind everything.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Prove with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-2" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-2"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f48a49ebaf1179b9047_AI-tab-bg-03-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f48a49ebaf1179b9047_AI-tab-bg-03-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f48a49ebaf1179b9047_AI-tab-bg-03.webp 884w"
                                            alt="AI Tab BG 03"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f48a49ebaf1179b9047_AI-tab-bg-03.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <line x1="8.28544" y1="15.1429" x2="8.28544" y2="0.857142"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></line>
                                                            <line x1="0.857143" y1="8.28739" x2="15.1429" y2="8.28739"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></line>
                                                            <circle opacity="0.5" cx="8.1965" cy="7.99923" r="3.80392"
                                                                fill="currentColor"></circle>
                                                        </svg>
                                                    </div>
                                                    <div>Prove with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Deterministic; not probabilistic.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>Engine-enforced constraints. An LLM can\u2019t override them. Auditable
                                                    proof of policy.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Test with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-3" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-3"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f647614509d2bdcbfe6_AI-tab-bg-04-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f647614509d2bdcbfe6_AI-tab-bg-04-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f647614509d2bdcbfe6_AI-tab-bg-04.webp 884w"
                                            alt="AI Tab BG 04"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f647614509d2bdcbfe6_AI-tab-bg-04.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0.857422 10L8.07816 2.91606C8.59672 2.40733 9.4271 2.40732 9.94566 2.91606L17.1664 10"
                                                                stroke="currentColor" stroke-width="1.71429"
                                                                stroke-linecap="round"></path>
                                                            <rect x="7.16602" y="10" width="4" height="4"
                                                                fill="currentColor"></rect>
                                                        </svg>
                                                    </div>
                                                    <div>Test with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Zero production surprises.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>We validate at compile time to always avoid broken orchestration
                                                    logic at runtime.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Deploy with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-4" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-4"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f92d194fe7cd0d896f1_AI-tab-bg-05-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f92d194fe7cd0d896f1_AI-tab-bg-05-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f92d194fe7cd0d896f1_AI-tab-bg-05.webp 884w"
                                            alt="AI Tab BG 05"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f92d194fe7cd0d896f1_AI-tab-bg-05.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="8" cy="8" r="4" fill="currentColor"
                                                                fill-opacity="0.2"></circle>
                                                            <circle cx="8.00065" cy="7.9987" r="2.66667"
                                                                fill="currentColor"></circle>
                                                            <path
                                                                d="M9.33268 1.33333C9.33268 2.06971 8.73573 2.66667 7.99935 2.66667C7.26297 2.66667 6.66602 2.06971 6.66602 1.33333C6.66602 0.596954 7.26297 0 7.99935 0C8.73573 0 9.33268 0.596954 9.33268 1.33333Z"
                                                                fill="currentColor"></path>
                                                            <circle cx="14.6673" cy="8.0013" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="1.33333" cy="8.0013" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="7.99935" cy="14.6654" r="1.33333"
                                                                fill="currentColor"></circle>
                                                        </svg>
                                                    </div>
                                                    <div>Deploy with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>System aware vs. operating in the blind.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>{ Artemis } generates compiler-validated ABL definitions against your
                                                    full topology.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Govern with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-5" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-5"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200fc4789fbc14787c3847_AI-tab-bg-06-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200fc4789fbc14787c3847_AI-tab-bg-06-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200fc4789fbc14787c3847_AI-tab-bg-06.webp 884w"
                                            alt="AI Tab BG 06"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200fc4789fbc14787c3847_AI-tab-bg-06.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="8" cy="8" r="4.16667" stroke="currentColor"
                                                                stroke-width="0.333333"></circle>
                                                            <circle cx="8.00065" cy="7.9987" r="2.66667" fill="#5CC83A">
                                                            </circle>
                                                            <path
                                                                d="M16.0007 1.33333C16.0007 2.06971 15.4037 2.66667 14.6673 2.66667C13.9309 2.66667 13.334 2.06971 13.334 1.33333C13.334 0.596954 13.9309 0 14.6673 0C15.4037 0 16.0007 0.596954 16.0007 1.33333Z"
                                                                fill="currentColor"></path>
                                                            <circle cx="14.6673" cy="14.6654" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="1.33333" cy="1.33333" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="1.33333" cy="14.6654" r="1.33333"
                                                                fill="currentColor"></circle>
                                                        </svg>
                                                    </div>
                                                    <div>Govern with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>100% of AI interactions audited</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>{ Artemis } sets new standards for evaluation, traces, and audits
                                                    every session. Most sample 5 \u2013 10%.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Scale with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-6" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-6"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a20100d2ac4a9b3c87a1c35_AI-tab-bg-07-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a20100d2ac4a9b3c87a1c35_AI-tab-bg-07-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a20100d2ac4a9b3c87a1c35_AI-tab-bg-07.webp 884w"
                                            alt="AI Tab BG 07"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a20100d2ac4a9b3c87a1c35_AI-tab-bg-07.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="4.57227" y="4" width="6.85714" height="8"
                                                                fill="currentColor"></rect>
                                                            <rect x="2.85742" width="1.71429" height="4"
                                                                fill="currentColor"></rect>
                                                            <rect x="2.85742" y="12" width="1.71429" height="4"
                                                                fill="currentColor"></rect>
                                                            <rect x="11.4277" width="1.71429" height="4"
                                                                fill="currentColor"></rect>
                                                            <rect x="11.4277" y="12" width="1.71429" height="4"
                                                                fill="currentColor"></rect>
                                                        </svg>
                                                    </div>
                                                    <div>Scale with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Your logic uniquely outlasts the model.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>Application definition is independent of the LLM. Swap models; the
                                                    ABL still executes.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Simplify with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-7" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-7"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a201031f97ba3b57bad9ee6_AI-tab-bg-08-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a201031f97ba3b57bad9ee6_AI-tab-bg-08-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a201031f97ba3b57bad9ee6_AI-tab-bg-08.webp 884w"
                                            alt="AI Tab BG 08"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a201031f97ba3b57bad9ee6_AI-tab-bg-08.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="8.83073" cy="8.71354" r="2.66667"
                                                                fill="currentColor"></circle>
                                                            <path
                                                                d="M10.1637 2.04818C10.1637 2.78456 9.56678 3.38151 8.8304 3.38151C8.09402 3.38151 7.49707 2.78456 7.49707 2.04818C7.49707 1.3118 8.09402 0.714844 8.8304 0.714844C9.56678 0.714844 10.1637 1.3118 10.1637 2.04818Z"
                                                                fill="currentColor"></path>
                                                            <circle cx="15.4974" cy="8.71224" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="2.16439" cy="8.71224" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <circle cx="8.8304" cy="15.3802" r="1.33333"
                                                                fill="currentColor"></circle>
                                                            <rect x="0.606091" y="8.76953" width="11.5429"
                                                                height="11.5429"
                                                                transform="rotate(-45 0.606091 8.76953)"
                                                                stroke="currentColor" stroke-width="0.857143"></rect>
                                                        </svg>
                                                    </div>
                                                    <div>Simplify with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>The need for two AI systems eliminated.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>{ Artemis } runs scripted and reasoning AI on the same session
                                                    infrastructure.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                    <div data-w-tab="Optimize with AI" class="k2-scroll-tabs-content-pane w-tab-pane"
                                        id="w-tabs-0-data-w-pane-8" role="tabpanel"
                                        aria-labelledby="w-tabs-0-data-w-tab-8"><img sizes="100vw"
                                            srcset="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a2010587614509d2bdd5f29_AI-tab-bg-09-p-500.webp 500w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a2010587614509d2bdd5f29_AI-tab-bg-09-p-800.webp 800w, https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a2010587614509d2bdd5f29_AI-tab-bg-09.webp 884w"
                                            alt="AI Tab BG 09"
                                            src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a2010587614509d2bdd5f29_AI-tab-bg-09.webp"
                                            loading="lazy" class="k2-scroll-tabs-content-bg"
                                            style="translate: none; rotate: none; scale: none; transform: scale(1.12, 1.12); opacity: 0; visibility: hidden;">
                                        <div class="k2-scroll-tabs-content-block k2-corners"
                                            style="opacity: 0; visibility: hidden;">
                                            <div class="k2-stretch">
                                                <div data-wf--eyebrow--variant="label"
                                                    class="k2-eyebrow w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48">
                                                    <div
                                                        class="k2-eyebrow-customicon w-variant-26d2fb96-cf9b-f2da-cf90-a4ad05879a48 w-embed">
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5.33301 0.667969L1.33301 0.667969L1.33301 15.5251H5.33301"
                                                                stroke="currentColor" stroke-width="1.33333"></path>
                                                            <path d="M10.666 0.667969L14.666 0.667969V15.5251H10.666"
                                                                stroke="currentColor" stroke-width="1.33333"></path>
                                                        </svg>
                                                    </div>
                                                    <div>Optimize with AI</div>
                                                </div>
                                            </div>
                                            <div data-op="100" data-mw="100" data-wf--heading--variant="16-24"
                                                class="k2-heading w-variant-9fb06b37-b194-beef-6031-0d661bd68c52 w-richtext">
                                                <h5>Optimization is no longer manual forensics.</h5>
                                            </div>
                                            <div data-op="50" data-mw="100" data-wf--paragraph--variant="small"
                                                class="k2-text w-variant-6cdf3ce3-8eae-2514-b634-a822397495ea w-richtext">
                                                <p>The platform does the work. No engineer required at every step.</p>
                                            </div>
                                            <div class="k2-bar-strip"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="k2-scroll-tabs-menu w-tab-menu" role="tablist"
                                    style="translate: none; rotate: none; scale: none; transform: translate(0px, 362.75px);">
                                    <a data-w-tab="Build with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link w--current"
                                        id="w-tabs-0-data-w-tab-0" href="#w-tabs-0-data-w-pane-0" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
                                        <div>Build <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Orchestrate with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-1" href="#w-tabs-0-data-w-pane-1" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-1" aria-selected="false">
                                        <div><strong>Orchestrate</strong> <span class="k2-tab-common-ai">with AI</span>
                                        </div>
                                    </a><a data-w-tab="Prove with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-2" href="#w-tabs-0-data-w-pane-2" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
                                        <div><strong>Prove</strong> <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Test with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-3" href="#w-tabs-0-data-w-pane-3" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-3" aria-selected="false">
                                        <div><strong>Test</strong> <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Deploy with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-4" href="#w-tabs-0-data-w-pane-4" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-4" aria-selected="false">
                                        <div><strong>Deploy</strong> <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Govern with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-5" href="#w-tabs-0-data-w-pane-5" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-5" aria-selected="false">
                                        <div><strong>Govern</strong> <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Scale with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-6" href="#w-tabs-0-data-w-pane-6" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-6" aria-selected="false">
                                        <div><strong>Scale</strong> <span class="k2-tab-common-ai">with AI</span></div>
                                    </a><a data-w-tab="Simplify with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-7" href="#w-tabs-0-data-w-pane-7" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-7" aria-selected="false">
                                        <div><strong>Simplify</strong> <span class="k2-tab-common-ai">with AI</span>
                                        </div>
                                    </a><a data-w-tab="Optimize with AI"
                                        class="k2-scroll-tabs-menu-link w-inline-block w-tab-link" tabindex="-1"
                                        id="w-tabs-0-data-w-tab-8" href="#w-tabs-0-data-w-pane-8" role="tab"
                                        aria-controls="w-tabs-0-data-w-pane-8" aria-selected="false">
                                        <div><strong>Optimize</strong> <span class="k2-tab-common-ai">with AI</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="w-embed">
                                <style>
                                    /* CARD - FADE ONLY */

                                    .k2-scroll-tabs-content-block {
                                        opacity: 0;
                                        will-change: opacity;
                                        transition: opacity .25s ease;
                                    }

                                    .k2-scroll-tabs-content-pane.w--tab-active .k2-scroll-tabs-content-block {
                                        opacity: 1;
                                    }

                                    /* MENU LINKS */

                                    .k2-scroll-tabs-menu-link {
                                        opacity: 0.25;
                                        transition:
                                            color .55s ease,
                                            opacity .55s ease,
                                            transform .55s ease;
                                    }

                                    /* INACTIVE AI */

                                    .k2-tab-common-ai {
                                        opacity: 0;
                                        transition:
                                            opacity .45s ease,
                                            color .45s ease;
                                    }

                                    /* ACTIVE AI SHOW */

                                    .k2-scroll-tabs-menu-link.w--current .k2-tab-common-ai {
                                        opacity: 1;
                                    }

                                    /* BG IMAGE TRANSITION */
                                    .k2-scroll-tabs-content-bg {
                                        transform: scale(1.12);
                                        will-change: transform, opacity;
                                    }

                                    /* Bottom Bars */
                                    .k2-bar-strip {
                                        width: 100%;
                                        height: 1.25rem;
                                        opacity: 0.2;
                                        margin-top: 0.5rem;
                                        background:
                                            repeating-linear-gradient(to right,
                                                #d9d9d9 0px,
                                                #d9d9d9 8px,
                                                transparent 0px,
                                                transparent 14px);
                                    }

                                    @media screen and (max-width:479px) {

                                        .k2-scroll-tabs-menu {
                                            overflow-x: auto;
                                            overflow-y: hidden;
                                            white-space: nowrap;
                                            -webkit-overflow-scrolling: touch;
                                            scrollbar-width: none;
                                        }

                                        .k2-tab-common-ai {
                                            opacity: 1;
                                        }

                                        .k2-scroll-tabs-menu::-webkit-scrollbar {
                                            display: none;
                                        }

                                    }
                                </style>
                            </div>
                        </div>
                    </div>
                " },

  { name: "KoreGetStartedSection", source: "get-started", tag: "section", attrs: {"id": "get-started", "className": "k2-section k2-section-prefooter"}, html: "
                <div data-scroll="" class="k2-container k2-container-prefooter">
                    <div class="k2-code w-embed">
                        <style>
                            .k2-prefooter-panel .k2-heading em {
                                font-weight: inherit;
                                font-style: inherit;
                                color: var(--_k2---color--green-light);
                            }

                            @keyframes plus-hover {
                                50% {
                                    transform: translate3d(var(--x), var(--y), 0) scale(1.25)
                                }
                            }

                            .k2-pluses use {
                                will-change: transform;
                                transform: translate3d(var(--x), var(--y), 0) scale(1);
                                transition: transform 2s var(--ease) calc(var(--i, 0) * .05s);
                            }

                            html:not(.wf-design-mode) .k2-container-prefooter:not(.on) .k2-pluses use {
                                opacity: 0;
                                transform: translate3d(var(--x), var(--y), 0) scale(0);
                            }

                            .k2-container-prefooter:has(.k2-action:is(:hover, :focus-visible)) .k2-pluses use {
                                animation: plus-hover 2s calc(var(--i2, 0) * .1s) both;
                            }

                            div.k2-prefooter-bg::before,
                            div.k2-prefooter-bg::after {
                                content: "\