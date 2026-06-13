"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Hero: a particle-flow canvas (ported from particle_flow_impulso_v9).
 * Particles float, then converge into "Impulso Co." + tagline and hold
 * there permanently (the cursor still repels nearby dots). The value-
 * proposition copy + CTAs live in the guarantee section below; the hero
 * is purely the animation.
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
    // Terracotta — particles blend between black and this; they resolve
    // to pure black while the brand name is formed (held).
    const TR = [180, 68, 42];

    const FLOAT_DUR = 180, FORM_DUR = 95, HOLD_DUR = 220, SCATTER_DUR = 60;
    let phase = 0, phaseT = 0, frame = 0;
    let rafId = 0;

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function buildTargets() {
      targets = [];
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const oc = off.getContext("2d");
      if (!oc) return;
      oc.fillStyle = "#000";
      oc.textAlign = "center";
      oc.textBaseline = "alphabetic";

      const fs1 = Math.min(W / 4.8, 92);
      const y1 = H * 0.46;
      oc.font = `900 ${fs1}px sans-serif`;
      oc.fillText("Impulso Co.", W / 2, y1);

      const fs2 = Math.min(W / 18, 26);
      const y2 = y1 + fs1 * 0.25 + fs2 * 1.6;
      // Lighter weight for the tagline so it stays crisp, not bold.
      oc.font = `400 ${fs2}px sans-serif`;
      oc.fillText(tagline, W / 2, y2);

      // Everything below this line belongs to the (small) tagline.
      const smallThreshold = y1 + fs1 * 0.2;

      const imgData = oc.getImageData(0, 0, W, H).data;
      // Sample the small tagline at full density (even on mobile) so its
      // thin strokes read sharply; the name can use a coarser step.
      for (let y = 0; y < H; y++) {
        const isSmall = y > smallThreshold;
        const step = isSmall ? 1 : (W < 700 ? 2 : 1);
        if (step === 2 && y % 2 !== 0) continue; // coarse rows for the name on mobile
        for (let x = 0; x < W; x += step) {
          if (imgData[(y * W + x) * 4 + 3] > 60) targets.push({ x, y, small: isSmall });
        }
      }
    }

    function reassignTargets() {
      if (!particles) return;
      const shuffled = [...targets].sort(() => Math.random() - 0.5);
      particles.forEach((p, i) => {
        const t = shuffled[i % shuffled.length];
        if (t) { p.tx = t.x; p.ty = t.y; p.size = t.small ? 0.8 : 1.3; }
      });
    }

    function initParticles() {
      // Higher caps so there are enough dots to cover the glyphs densely
      // (clearer letters); the text is sampled below at full density.
      const cap = W < 700 ? 18000 : 46000;
      const COUNT = Math.min(targets.length, cap);
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
          size: t.small ? 0.8 : 1.3,
          alpha: Math.random() * 0.3 + 0.08,
          tx: t.x, ty: t.y,
          cr: Math.round(TR[0] * m),
          cg: Math.round(TR[1] * m),
          cb: Math.round(TR[2] * m),
        });
      }
    }

    function resize() {
      if (!canvas || !wrap) return;
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
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
      // Form once, then hold on the brand name forever — never advance past
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

    // Auto-start the formation shortly after load (the hero is in view).
    const startTimer = setTimeout(onScroll, 1200);

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
      {/* Particle-flow canvas */}
      <div ref={wrapRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </section>
  );
}

function HeroLoading() {
  return <section className="relative min-h-screen bg-background" />;
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <HeroContent /> : <HeroLoading />;
}
