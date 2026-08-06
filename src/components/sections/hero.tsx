"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Hero: opens with the brand "heartbeat" pulse line drawing left -> right,
 * which then fades and hands off to a particle-flow canvas. Particles float,
 * converge into "Impulso Co." + tagline and hold there permanently (the cursor
 * still repels nearby dots). The value-proposition copy + CTAs live in the
 * guarantee section below; the hero is purely the animation.
 */
function HeroContent() {
  const { language } = useLanguage();
  const isNL = language === "nl";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const tagline = isNL
    ? "Wij creëren structuur in chaos."
    : "We create structure in chaos.";

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; tx: number; ty: number;
      cr: number; cg: number; cb: number;
    }[] | null = null;
    let targets: { x: number; y: number; small: boolean }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const BG = "#ffffff";
    // Terracotta, particles blend between black and this; they resolve
    // to pure black while the brand name is formed (held).
    const TR = [180, 68, 42];

    const FLOAT_DUR = 180, FORM_DUR = 95, HOLD_DUR = 220, SCATTER_DUR = 60;
    let phase = 0, phaseT = 0, frame = 0;
    let rafId = 0;

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function buildTargets() {
      targets = [];
      // Supersample the glyph on small screens so letter edges are rasterised
      // and sampled at sub-pixel resolution -> smooth edges instead of the
      // visible "balls". Desktop has room already, so it stays 1x.
      const SS = W < 700 ? 2 : 1;
      const SW = W * SS, SH = H * SS;
      const off = document.createElement("canvas");
      off.width = SW; off.height = SH;
      const oc = off.getContext("2d");
      if (!oc) return;
      oc.scale(SS, SS); // draw in CSS px, rasterise at SS resolution
      oc.fillStyle = "#000";
      oc.textAlign = "center";
      oc.textBaseline = "alphabetic";

      let fs1 = Math.min(W / 4.8, 92);
      const y1 = H * 0.46;
      oc.font = `900 ${fs1}px sans-serif`;
      // Shrink the name to fit the canvas width so it never overflows on mobile.
      const nameW = oc.measureText("Impulso Co.").width;
      if (nameW > W * 0.9) {
        fs1 = (fs1 * W * 0.9) / nameW;
        oc.font = `900 ${fs1}px sans-serif`;
      }
      oc.fillText("Impulso Co.", W / 2, y1);

      let fs2 = Math.min(W / 18, 26);
      oc.font = `400 ${fs2}px sans-serif`;
      // Same width-fit for the tagline.
      const tagW = oc.measureText(tagline).width;
      if (tagW > W * 0.9) {
        fs2 = (fs2 * W * 0.9) / tagW;
        oc.font = `400 ${fs2}px sans-serif`;
      }
      const y2 = y1 + fs1 * 0.25 + fs2 * 1.6;
      oc.fillText(tagline, W / 2, y2);

      // Everything below this line belongs to the (small) tagline.
      const smallThreshold = y1 + fs1 * 0.2;

      // Read the supersampled bitmap and map sample coords back to CSS pixels,
      // so particle targets land on a finer-than-pixel grid (smooth edges).
      const imgData = oc.getImageData(0, 0, SW, SH).data;
      for (let sy = 0; sy < SH; sy++) {
        const y = sy / SS;
        const isSmall = y > smallThreshold;
        for (let sx = 0; sx < SW; sx++) {
          if (imgData[(sy * SW + sx) * 4 + 3] > 60) {
            targets.push({ x: sx / SS, y, small: isSmall });
          }
        }
      }
    }

    function reassignTargets() {
      if (!particles) return;
      const sizeScale = W < 700 ? 0.6 : 1; // smaller dots on mobile = crisper edges
      const shuffled = [...targets].sort(() => Math.random() - 0.5);
      particles.forEach((p, i) => {
        const t = shuffled[i % shuffled.length];
        if (t) { p.tx = t.x; p.ty = t.y; p.size = (t.small ? 0.8 : 1.3) * sizeScale; }
      });
    }

    function initParticles() {
      // Higher caps so there are enough dots to cover the glyphs densely
      // (clearer letters); the text is sampled below at full density.
      const cap = W < 700 ? 22000 : 46000;
      const COUNT = Math.min(targets.length, cap);
      const sizeScale = W < 700 ? 0.6 : 1; // smaller dots on mobile = crisper edges
      particles = [];
      const shuffled = [...targets].sort(() => Math.random() - 0.5);
      for (let i = 0; i < COUNT; i++) {
        const t = shuffled[i];
        // Blend factor toward terracotta (biased to keep it subtle/light).
        const m = Math.random() ** 1.6;
        particles.push({
          // Start spread across the whole screen (with slight overscan so
          // dots also stream in from beyond the edges).
          x: (Math.random() * 1.1 - 0.05) * W,
          y: (Math.random() * 1.1 - 0.05) * H,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          // Smaller dots for the tagline so its thin glyphs stay crisp.
          size: (t.small ? 0.8 : 1.3) * sizeScale,
          alpha: Math.random() * 0.3 + 0.08,
          tx: t.x, ty: t.y,
          cr: Math.round(TR[0] * m),
          cg: Math.round(TR[1] * m),
          cb: Math.round(TR[2] * m),
        });
      }
    }

    function resize() {
      if (!canvas || !wrap || !ctx) return;
      // Render at device resolution (capped at 2x) so the particle text stays
      // crisp on high-DPI phones; keep W/H in CSS pixels for all the math.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTargets();
      if (!particles) initParticles(); else reassignTargets();
    }

    function onScroll() {
      if (phase === 0) { phase = 1; phaseT = 0; }
    }

    function nextPhase() {
      phase = (phase + 1) % 4;
      phaseT = 0;
    }

    function tick() {
      if (!ctx) return;
      frame++; phaseT++;
      const dur = [FLOAT_DUR, FORM_DUR, HOLD_DUR, SCATTER_DUR][phase];
      // Form once, then hold on the brand name forever, never advance past
      // the HOLD phase (phase 2), so it no longer scatters and re-loops.
      if (phaseT >= dur && phase !== 2) nextPhase();

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      const fp = Math.min(phaseT / FORM_DUR, 1);
      const sp = Math.min(phaseT / SCATTER_DUR, 1);
      const efp = ease(fp);
      const esp = ease(sp);

      const list = particles || [];
      for (let i = 0; i < list.length; i++) {
        const p = list[i];

        if (phase === 0) {
          p.x += p.vx; p.y += p.vy;
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
          p.vx *= 0.98; p.vy *= 0.98;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        } else if (phase === 1) {
          p.x += (p.tx - p.x) * (0.08 + efp * 0.14);
          p.y += (p.ty - p.y) * (0.08 + efp * 0.14);
        } else if (phase === 2) {
          p.x += (p.tx - p.x) * 0.18;
          p.y += (p.ty - p.y) * 0.18;
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 50 && d > 0) {
            const f = ((50 - d) / 50) * 3;
            p.x += (dx / d) * f; p.y += (dy / d) * f;
          }
        } else {
          p.x += p.vx * 3; p.y += p.vy * 3;
        }

        let alpha;
        if (phase === 0) alpha = p.alpha;
        else if (phase === 1) alpha = p.alpha + efp * (1 - p.alpha);
        else if (phase === 2) alpha = 1.0;
        else alpha = 1 - esp;

        // How black the dot is: 0 = its blended colour, 1 = pure black.
        // Floating keeps the blend; forming fades to black; held = black;
        // scattering returns to the blend.
        let toBlack;
        if (phase === 1) toBlack = efp;
        else if (phase === 2) toBlack = 1;
        else if (phase === 3) toBlack = 1 - esp;
        else toBlack = 0;
        const r = Math.round(p.cr * (1 - toBlack));
        const g = Math.round(p.cg * (1 - toBlack));
        const b = Math.round(p.cb * (1 - toBlack));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alpha)).toFixed(2)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * (W / r.width);
      mouse.y = (e.clientY - r.top) * (H / r.height);
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    resize();
    tick();

    // Start the particle formation as the pulse blip sweeps off the right, so
    // it reads as a sequence: heartbeat travels across -> logo forms from dots.
    const startTimer = setTimeout(onScroll, 800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(startTimer);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [tagline]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Particle-flow canvas, fades in as the pulse intro fades out */}
      <motion.div
        ref={wrapRef}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </motion.div>

      {/* Pulse intro: heartbeat draws left -> right, fades, hands off to the
          particle logo formation. */}
      <PulseIntro strokeWidth={2.5} />
    </section>
  );
}

function HeroLoading() {
  return <section className="relative min-h-screen bg-background" />;
}

// Brand "heartbeat" intro: a fixed-length terracotta segment that travels
// across the full viewport like a heart-monitor blip, it slides in from the
// left, rides the pulse spike through the centre, and sweeps off the right
// (both ends move; the left end follows the right rather than anchoring at the
// edge). Driven by animating pathOffset with a constant pathLength.
// Stroke scales with the viewBox (NOT non-scaling-stroke, that breaks
// framer-motion's dash math and leaves gaps), so each caller tunes strokeWidth.
function PulseIntro({ strokeWidth }: { strokeWidth: number }) {
  // SEG = length of the visible trailing segment (the "~6cm" tail), as a
  // fraction of the path. Phase 1: the head draws out from the left edge while
  // the tail stays put (grows to SEG), the slow "draw" feel. Phase 2: the
  // fixed-length segment travels right, tail following the head, parking flush
  // at the right edge.
  // NOTE: pathLength/pathOffset MUST live in initial/animate (framer motion
  // values). As static props they set the raw SVG attributes and the animation
  // dies (renders instantly), that was the previous bug.
  const SEG = 0.18;
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 0.8, times: [0, 0.78, 1], ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 1000 140"
        fill="none"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M0,70 L450,70 L470,46 L485,70 L500,18 L516,122 L531,70 L1000,70"
          stroke="#B4442A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: [0, SEG, SEG], pathOffset: [0, 0, 1 - SEG] }}
          // Uniform head speed: the draw-in phase covers SEG of the travel, so
          // it gets SEG of the time, and linear easing keeps velocity constant
          // (no mid-animation speed-up).
          transition={{ duration: 0.6, times: [0, SEG, 1], ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}

// Mobile hero: real, crisp text instead of the particle canvas. Particle text
// is inherently dotty at small sizes, so phones get sharp rendered type while
// desktop keeps the particle-formation animation.
function MobileHero() {
  const { language } = useLanguage();
  const tagline = language === "nl"
    ? "Wij creëren structuur in chaos."
    : "We create structure in chaos.";
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center"
    >
      {/* Brand heartbeat draws left -> right, fades, then the title appears */}
      <PulseIntro strokeWidth={8} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      >
        <span className="block font-display font-bold leading-none tracking-tight text-foreground text-[clamp(2.5rem,13vw,4rem)]">
          Impulso Co.
        </span>
        <span className="mt-4 block font-light text-muted-foreground text-[clamp(0.95rem,4.2vw,1.25rem)]">
          {tagline}
        </span>
      </motion.div>
    </section>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.matchMedia("(max-width: 699px)").matches);
  }, []);
  if (!isClient) return <HeroLoading />;
  return isMobile ? <MobileHero /> : <HeroContent />;
}
