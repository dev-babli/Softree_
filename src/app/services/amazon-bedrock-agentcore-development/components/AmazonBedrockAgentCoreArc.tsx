"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface NovaSlide {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  media: string;
  effect?: "glass" | "frost" | "ripple" | "plasma" | "timeshift";
}

const NOVA_SLIDES: NovaSlide[] = [
  {
    id: "agentcore-runtime",
    number: "01",
    tag: "Secure Agent Deployment",
    title: "Amazon Bedrock AgentCore Runtime",
    description:
      "Deploy and run AI agents in a secure, scalable environment with support for popular agent frameworks, models, MCP, A2A, and isolated sessions.",
    media: "/images/amazonbedrock-images/bedrock-1.png",
    effect: "glass",
  },
  {
    id: "agentcore-memory",
    number: "02",
    tag: "Context & Memory",
    title: "AgentCore Memory for Context-Aware Agents",
    description:
      "Build agents that retain relevant context across interactions with managed short-term and long-term memory capabilities.",
    media: "/images/amazonbedrock-images/bedrock-9.png",
    effect: "ripple",
  },
  {
    id: "agentcore-gateway",
    number: "03",
    tag: "Tools & Integrations",
    title: "AgentCore Gateway for Enterprise Tool Integration",
    description:
      "Connect AI agents to APIs, Lambda functions, MCP servers, and enterprise systems through secure, agent-ready tools and integrations.",
    media: "/images/amazonbedrock-images/bedrock-3.png",
    effect: "timeshift",
  },
  {
    id: "agentcore-identity",
    number: "04",
    tag: "Identity & Access Control",
    title: "Secure AI Agent Identity and Access",
    description:
      "Enable agents to securely access AWS resources, enterprise applications, and third-party services with identity-aware authorization and controlled permissions.",
    media: "/images/amazonbedrock-images/bedrock-4.png",
    effect: "frost",
  },
  {
    id: "agentcore-browser",
    number: "05",
    tag: "Web Automation",
    title: "AgentCore Browser for Intelligent Web Workflows",
    description:
      "Enable AI agents to securely interact with websites and web applications through managed browser environments designed for scalable agent workflows.",
    media: "/images/amazonbedrock-images/bedrock-5.png",
    effect: "glass",
  },
  {
    id: "agentcore-code-interpreter",
    number: "06",
    tag: "AI Code Execution",
    title: "AgentCore Code Interpreter for Intelligent Automation",
    description:
      "Enable agents to write and execute code in secure sandbox environments to analyze data, perform calculations, and complete complex tasks.",
    media: "/images/amazonbedrock-images/bedrock-6.png",
    effect: "ripple",
  },
  {
    id: "agentcore-observability",
    number: "07",
    tag: "Monitoring & Debugging",
    title: "Monitor and Debug AI Agents in Production",
    description:
      "Trace agent workflows, monitor performance, inspect tool calls, identify failures, and gain operational visibility with AgentCore Observability and CloudWatch.",
    media: "/images/amazonbedrock-images/bedrock-7.png",
    effect: "timeshift",
  },
  {
    id: "agentcore-evaluations",
    number: "08",
    tag: "Agent Quality & Evaluation",
    title: "Evaluate AI Agent Performance and Quality",
    description:
      "Continuously evaluate AI agents for response quality, task completion, safety, and tool usage to support reliable production deployments.",
    media: "/images/amazonbedrock-images/bedrock-8.png",
    effect: "plasma",
  },
];

export default function AmazonBedrockAgentCoreArc() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Functions exposed to React UI
  const navigateToSlideRef = useRef<((targetIndex: number) => void) | null>(null);

  useEffect(() => {
    // Expose globals for scripts/utilities if needed
    (window as any).THREE = THREE;
    (window as any).gsap = gsap;

    const SLIDER_CONFIG: any = {
      settings: {
        transitionDuration: 1.8,
        autoSlideSpeed: 5500,
        currentEffect: "glass",
        globalIntensity: 1.0,
        speedMultiplier: 1.0,
        distortionStrength: 1.0,
        glassRefractionStrength: 1.0,
        glassChromaticAberration: 0.9,
        glassBubbleClarity: 1.0,
        glassEdgeGlow: 0.8,
        glassLiquidFlow: 1.2,
      },
    };

    let currentSlideIndex = 0;
    let isTransitioning = false;
    let shaderMaterial: any = null;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let slideTextures: any[] = [];
    let texturesLoaded = false;
    let autoSlideTimer: any = null;
    let progressAnimation: any = null;
    let sliderEnabled = false;
    let reqId: number | null = null;

    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const PROGRESS_UPDATE_INTERVAL = 50;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    // --- GLSL SHADERS ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1, uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution, uTexture1Size, uTexture2Size;
      uniform int uEffectType;
      uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength;
      uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
      }

      vec4 glassEffect(vec2 uv, float progress) {
        float time = progress * 5.0 * uSpeedMultiplier;
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float maxR = length(uResolution) * 0.85;
        float br = progress * maxR;
        vec2 p = uv * uResolution;
        vec2 c = uResolution * 0.5;
        float d = length(p - c);
        float nd = d / max(br, 0.001);
        float param = smoothstep(br + 3.0, br - 3.0, d);

        vec4 img;
        if (param > 0.0) {
          float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
          vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
          vec2 distUV = uv2 - dir * ro;
          distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
          float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
          img = vec4(
            texture2D(uTexture2, distUV + dir * ca * 1.2).r,
            texture2D(uTexture2, distUV + dir * ca * 0.2).g,
            texture2D(uTexture2, distUV - dir * ca * 0.8).b,
            1.0
          );
          if (uGlassEdgeGlow > 0.0) {
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
          }
        } else {
          img = texture2D(uTexture2, uv2);
        }
        vec4 oldImg = texture2D(uTexture1, uv1);
        if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
        return mix(oldImg, img, param);
      }

      vec4 rippleEffect(vec2 uv, float progress) {
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        vec2 p = uv - 0.5;
        float d = length(p);
        float wave = sin(d * 30.0 - progress * 15.0) * 0.03 * (1.0 - progress);
        vec2 distortedUV = uv2 + normalize(p) * wave;
        return mix(texture2D(uTexture1, uv1), texture2D(uTexture2, distortedUV), progress);
      }

      vec4 timeshiftEffect(vec2 uv, float progress) {
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float offset = sin(progress * 3.14159) * 0.05;
        vec4 col1 = texture2D(uTexture2, uv2 + vec2(offset, 0.0));
        vec4 col2 = texture2D(uTexture2, uv2);
        vec4 col3 = texture2D(uTexture2, uv2 - vec2(offset, 0.0));
        vec4 chromatic = vec4(col1.r, col2.g, col3.b, 1.0);
        return mix(texture2D(uTexture1, uv1), chromatic, progress);
      }

      void main() {
        if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
        else if (uEffectType == 1) gl_FragColor = rippleEffect(vUv, uProgress);
        else gl_FragColor = timeshiftEffect(vUv, uProgress);
      }
    `;

    const getEffectIndex = (effectName: string) => {
      switch (effectName) {
        case "glass":
          return 0;
        case "ripple":
          return 1;
        default:
          return 2;
      }
    };

    const splitText = (text: string) => {
      return text
        .split("")
        .map(
          (char) =>
            `<span style="display: inline-block; opacity: 0;">${char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    const updateContent = (idx: number) => {
      const titleEl = document.getElementById("mainTitle");
      const descEl = document.getElementById("mainDesc");
      const tagEl = document.getElementById("mainTag");

      if (titleEl && descEl) {
        gsap.to(titleEl.children, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: "power2.in",
        });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" });

        setTimeout(() => {
          titleEl.innerHTML = splitText(NOVA_SLIDES[idx].title);
          descEl.textContent = NOVA_SLIDES[idx].description;
          if (tagEl) tagEl.textContent = NOVA_SLIDES[idx].tag;

          gsap.set(titleEl.children, { y: 20, opacity: 0 });
          gsap.set(descEl, { y: 15, opacity: 0 });

          gsap.to(titleEl.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.02,
            ease: "power3.out",
          });
          gsap.to(descEl, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
          });
        }, 400);
      }
    };

    const updateCounter = (idx: number) => {
      const sn = document.getElementById("slideNumber");
      if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
      const st = document.getElementById("slideTotal");
      if (st) st.textContent = String(NOVA_SLIDES.length).padStart(2, "0");
    };

    const updateNavigationState = (idx: number) => {
      document.querySelectorAll(".slide-nav-item").forEach((el, i) => {
        el.classList.toggle("active", i === idx);
      });
    };

    const updateSlideProgress = (idx: number, prog: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(
        ".slide-progress-fill"
      ) as HTMLElement;
      if (el) {
        el.style.width = `${prog}%`;
        el.style.opacity = "1";
      }
    };

    const fadeSlideProgress = (idx: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(
        ".slide-progress-fill"
      ) as HTMLElement;
      if (el) {
        el.style.opacity = "0";
        setTimeout(() => (el.style.width = "0%"), 300);
      }
    };

    const quickResetProgress = (idx: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(
        ".slide-progress-fill"
      ) as HTMLElement;
      if (el) {
        el.style.transition = "width 0.2s ease-out";
        el.style.width = "0%";
        setTimeout(
          () => (el.style.transition = "width 0.1s ease, opacity 0.3s ease"),
          200
        );
      }
    };

    const stopAutoSlideTimer = () => {
      if (progressAnimation) clearInterval(progressAnimation);
      if (autoSlideTimer) clearTimeout(autoSlideTimer);
      progressAnimation = null;
      autoSlideTimer = null;
    };

    const startAutoSlideTimer = () => {
      if (!texturesLoaded || !sliderEnabled) return;
      stopAutoSlideTimer();
      let progress = 0;
      const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
      progressAnimation = setInterval(() => {
        if (!sliderEnabled) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(currentSlideIndex, progress);
        if (progress >= 100) {
          clearInterval(progressAnimation);
          progressAnimation = null;
          fadeSlideProgress(currentSlideIndex);
          if (!isTransitioning) handleSlideChange();
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (sliderEnabled && texturesLoaded) {
        if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
        else startAutoSlideTimer();
      }
    };

    const navigateToSlide = (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentSlideIndex) return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);

      const currentTexture = slideTextures[currentSlideIndex];
      const targetTexture = slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;

      isTransitioning = true;
      shaderMaterial.uniforms.uTexture1.value = currentTexture;
      shaderMaterial.uniforms.uTexture2.value = targetTexture;
      shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
      shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
      shaderMaterial.uniforms.uEffectType.value = getEffectIndex(
        NOVA_SLIDES[targetIndex].effect || "glass"
      );

      updateContent(targetIndex);

      currentSlideIndex = targetIndex;
      setCurrentIdx(targetIndex);
      updateCounter(currentSlideIndex);
      updateNavigationState(currentSlideIndex);

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DURATION(),
          ease: "power2.inOut",
          onComplete: () => {
            shaderMaterial.uniforms.uProgress.value = 0;
            shaderMaterial.uniforms.uTexture1.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
            isTransitioning = false;
            safeStartTimer(100);
          },
        }
      );
    };

    navigateToSlideRef.current = navigateToSlide;

    const handleSlideChange = () => {
      if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
      navigateToSlide((currentSlideIndex + 1) % NOVA_SLIDES.length);
    };

    const loadImageTexture = (src: string) =>
      new Promise<any>((resolve, reject) => {
        const l = new THREE.TextureLoader();
        l.setCrossOrigin("anonymous");
        l.load(
          src,
          (t: any) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
            resolve(t);
          },
          undefined,
          reject
        );
      });

    const initRenderer = async () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 600;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: 0 },
          uGlobalIntensity: { value: 1.0 },
          uSpeedMultiplier: { value: 1.0 },
          uDistortionStrength: { value: 1.0 },
          uGlassRefractionStrength: { value: 1.0 },
          uGlassChromaticAberration: { value: 0.9 },
          uGlassBubbleClarity: { value: 1.0 },
          uGlassEdgeGlow: { value: 0.8 },
          uGlassLiquidFlow: { value: 1.2 },
        },
        vertexShader,
        fragmentShader,
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

      // Load all textures
      for (const s of NOVA_SLIDES) {
        try {
          const tex = await loadImageTexture(s.media);
          slideTextures.push(tex);
        } catch {
          // Fallback solid color texture
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 0, 512, 512);
          }
          const tex = new THREE.CanvasTexture(canvas);
          tex.userData = { size: new THREE.Vector2(512, 512) };
          slideTextures.push(tex);
        }
      }

      if (slideTextures.length >= 2) {
        shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
        shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
        shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
        texturesLoaded = true;
        sliderEnabled = true;
        safeStartTimer(400);
      }

      const render = () => {
        reqId = requestAnimationFrame(render);
        renderer.render(scene, camera);
      };
      render();
    };

    updateCounter(0);

    const tEl = document.getElementById("mainTitle");
    const dEl = document.getElementById("mainDesc");
    if (tEl && dEl) {
      tEl.innerHTML = splitText(NOVA_SLIDES[0].title);
      dEl.textContent = NOVA_SLIDES[0].description;
      gsap.fromTo(
        tEl.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        dEl,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }

    initRenderer();

    const onVisibilityChange = () => {
      if (document.hidden) stopAutoSlideTimer();
      else if (!isTransitioning) safeStartTimer();
    };

    const onResize = () => {
      const container = containerRef.current;
      if (renderer && container && shaderMaterial) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        shaderMaterial.uniforms.uResolution.value.set(width, height);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize);

    return () => {
      stopAutoSlideTimer();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      if (reqId) cancelAnimationFrame(reqId);
      if (renderer) renderer.dispose();
      slideTextures.forEach((t) => t?.dispose());
    };
  }, []);

  const handlePrev = () => {
    const prev = (currentIdx - 1 + NOVA_SLIDES.length) % NOVA_SLIDES.length;
    navigateToSlideRef.current?.(prev);
  };

  const handleNext = () => {
    const next = (currentIdx + 1) % NOVA_SLIDES.length;
    navigateToSlideRef.current?.(next);
  };

  return (
    <section className="relative w-full bg-white text-slate-900 pt-2 md:pt-4 pb-16 md:pb-24 overflow-hidden select-none font-sans">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,107,44,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Header Container */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm] text-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          AMAZON BEDROCK AGENTCORE DEVELOPMENT
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-4xl mx-auto leading-tight">
          Build and Deploy Production-Ready AI Agents with{" "}
          <span className="text-[#FF6B2C]">Amazon Bedrock AgentCore</span>
        </h2>

        <p className="typo-description text-slate-600 max-w-3xl mx-auto mb-2">
          Build, deploy, secure, and monitor enterprise AI agents with Amazon Bedrock AgentCore, using flexible frameworks, models, tools, memory, identity, and observability to move agentic applications from development to production.
        </p>

        {/* Two Navigation Arrows Directly Below Description */}
        <div className="flex items-center justify-center gap-3.5 mt-5 sm:mt-6">
          {/* Previous Arrow (<) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous solution"
            className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 hover:border-[#FF5812] bg-white hover:bg-[#FF5812] text-slate-700 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
            title="Previous voice solution"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Slide Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 typo-caption-meta font-mono font-bold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
            <span>SOLUTION</span>
            <span className="text-[#FF5812] font-extrabold" id="slideNumber">
              01
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500" id="slideTotal">
              08
            </span>
          </div>

          {/* Next Arrow (>) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next solution"
            className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 hover:border-[#FF5812] bg-white hover:bg-[#FF5812] text-slate-700 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
            title="Next voice solution"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Main WebGL Shader Showcase */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-6">
        <div
          ref={containerRef}
          className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] rounded-[24px] lg:rounded-[30px] overflow-hidden border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] bg-slate-950 group"
        >
          {/* WebGL Canvas with Custom Shaders */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover block" />

          {/* Dark Glass Scrim Gradient for Readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.1) 30%, rgba(15,23,42,0.82) 70%, rgba(15,23,42,0.98) 100%)",
            }}
          />

          {/* Top Tag & Info Overlay */}
          <div className="absolute top-5 left-5 right-5 sm:top-7 sm:left-8 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] shadow-[0_0_8px_rgba(255,107,44,0.9)]" />
              <span className="typo-caption font-mono" id="mainTag">
                {NOVA_SLIDES[currentIdx]?.tag || "Real-Time Conversation"}
              </span>
            </div>


          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 px-4 sm:px-7 lg:px-12 max-w-4xl">
            <h3
              className="typo-heading-2 text-white mb-3 drop-shadow-md"
              id="mainTitle"
            >
              {NOVA_SLIDES[currentIdx]?.title}
            </h3>

            <p
              className="typo-description text-slate-200/90 max-w-2xl drop-shadow mb-5"
              id="mainDesc"
            >
              {NOVA_SLIDES[currentIdx]?.description}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5812] hover:bg-[#e04d0f] text-white typo-button-sm shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Build With Amazon Bedrock AgentCore</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Slide Navigation Progress Tabs (Clickable) */}
          <nav className="absolute inset-x-0 bottom-4 sm:bottom-5 z-20 px-5 sm:px-8 lg:px-12 flex items-center gap-2 sm:gap-3">
            {NOVA_SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                onClick={() => navigateToSlideRef.current?.(i)}
                className={`slide-nav-item flex-1 cursor-pointer py-1 group/nav ${i === currentIdx ? "active" : ""
                  }`}
                title={slide.title}
              >
                <div className="slide-progress-line w-full h-[3px] bg-white/20 rounded-full overflow-hidden mb-1.5 group-hover/nav:bg-white/35 transition-colors">
                  <div
                    className="slide-progress-fill h-full bg-[#FF5812] rounded-full"
                    style={{ width: i === currentIdx ? "100%" : "0%" }}
                  />
                </div>
                <div className="slide-nav-title typo-caption-meta font-mono font-semibold text-white/50 group-hover/nav:text-white/90 transition-colors line-clamp-1">
                  {slide.number} {slide.title}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
