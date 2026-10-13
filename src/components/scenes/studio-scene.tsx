"use client";

/**
 * Impulso Studio: a small content studio with four AI-agent desks. A post card
 * is planned on the Strateeg's wall calendar, hops to the Schrijver's laptop for
 * copy, to the Designer's screen for a visual, and lands in the phone feed in the
 * middle. Reactions float up, the Analist's charts grow, and a pulse runs back
 * to the Strateeg to adjust the plan.
 */
import { useRef } from "react";
import { Bill, Box, Chip, Group, OnFrame, P, Slab, Stage, ease, lerp, span, useFrame } from "./kit";

const W = 600, D = 400;
const T = 10; // one card's trip
const DESK_Z = 36.5; // on top of a desk
const wood = { top: "#efeee9", s: "#c6c5be", w: "#d7d6d0" };
const paper = { top: P.paper, s: "#cfcfc8", w: "#dcdcd5" };
const ink = { top: P.ink3, s: "#121211", w: "#1b1b19" };

// card stops: Strateeg, Schrijver, Designer, phone
const STOPS = [
  { x: 126, y: 120, z: DESK_Z + 14 },
  { x: 534, y: 112, z: DESK_Z + 14 },
  { x: 542, y: 284, z: DESK_Z + 14 },
  { x: 300, y: 226, z: 70 },
];

function Desk({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  return (
    <>
      <Slab x={x + 4} y={y + 6} w={w} d={d} z={8.5} r={6} bg="rgba(20,20,19,.08)" />
      {[[x + 4, y + 4], [x + w - 7, y + 4], [x + 4, y + d - 7], [x + w - 7, y + d - 7]].map(([lx, ly], i) => (
        <Box key={i} x={lx} y={ly} w={3} d={3} h={24} z={8} c={P.steelDark} />
      ))}
      <Box x={x} y={y} w={w} d={d} h={4} z={32} c={wood} r={3} />
    </>
  );
}

/** An AI agent: a seated figure with a terracotta visor. */
function Agent({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <>
      <Box x={x - 9} y={y - 6} w={18} d={14} h={14} z={8} c={P.steel} r={4} />
      <Bill x={x} y={y} z={20}>
        <svg width={30} height={44} viewBox="0 0 30 44" style={{ maxWidth: "none", display: "block" }}>
          <path d="M4 44 C4 30 9 25 15 25 C21 25 26 30 26 44 Z" fill={tone} />
          <rect x="6" y="3" width="18" height="18" rx="8" fill={P.paper2} stroke="rgba(0,0,0,.22)" />
          <rect x="9" y="9.5" width="12" height="4.5" rx="2.2" fill={P.signal} />
          <rect x="14" y="0" width="2" height="4" fill={P.ink3} />
        </svg>
      </Bill>
    </>
  );
}

function Card({ i }: { i: number }) {
  const g = useRef<HTMLDivElement>(null);
  const sh = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useFrame((t) => {
    const lt = (((t - i * (T / 2)) % T) + T) % T;
    const hops: [number, number, number][] = [[1.6, 2.8, 0], [4.0, 5.0, 1], [6.2, 7.4, 2]];
    let p = STOPS[0], x = p.x, y = p.y, z = p.z;
    for (const [a, b, k] of hops) {
      if (lt >= a) {
        const q = ease(span(lt, a, b));
        const s0 = STOPS[k], s1 = STOPS[k + 1];
        x = lerp(s0.x, s1.x, q);
        y = lerp(s0.y, s1.y, q);
        z = lerp(s0.z, s1.z, q) + Math.sin(Math.PI * q) * 64;
        p = s1;
      }
    }
    const vis = Math.min(span(lt, 0.1, 0.6), 1 - span(lt, 7.4, 7.9));
    const sc = 0.6 + 0.4 * vis;
    z += Math.sin(t * 2.6 + i) * 2.5;
    g.current!.style.transform = `translate3d(${x}px,${y}px,${z + (1 - vis) * 10}px) scale(${sc})`;
    g.current!.style.visibility = vis > 0.05 ? "visible" : "hidden";
    sh.current!.style.transform = `translate3d(${x - 21}px,${y - 15}px,8.6px)`;
    sh.current!.style.opacity = String(vis * 0.9);
    lines.current!.style.opacity = String(span(lt, 2.9, 3.7));
    img.current!.style.opacity = String(span(lt, 5.1, 5.8));
  });

  return (
    <>
      <Slab ref={sh} x={0} y={0} w={42} d={30} r={14} bg="rgba(20,20,19,.12)" style={{ opacity: 0 }} />
      <Group ref={g} style={{ visibility: "hidden" }}>
        <Box x={-20} y={-15} w={40} d={30} h={3} c={{ top: "#fbfbf8", s: P.signal, w: P.signalDark }} r={2}
          top={
            <>
              <div style={{ position: "absolute", left: 4, top: 4, width: 9, height: 3, background: P.signal, borderRadius: 1 }} />
              <div ref={img} style={{ position: "absolute", left: 4, top: 10, width: 15, height: 15, borderRadius: 2, background: `radial-gradient(circle at 70% 30%,${P.signal} 0 2.5px,transparent 3px),linear-gradient(160deg,#cfcfc8,${P.steelDark})`, opacity: 0 }} />
              <div ref={lines} style={{ position: "absolute", left: 22, top: 10, right: 4, height: 15, background: "repeating-linear-gradient(180deg,rgba(20,20,19,.45) 0 1.5px,transparent 1.5px 3.5px)", opacity: 0 }} />
            </>
          } />
      </Group>
    </>
  );
}

function Studio({ nl }: { nl: boolean }) {
  const cells = useRef<(HTMLDivElement | null)[]>([]);
  const typed = useRef<(HTMLDivElement | null)[]>([]);
  const caret = useRef<HTMLDivElement>(null);
  const paint = useRef<HTMLDivElement>(null);
  const stylus = useRef<HTMLDivElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLDivElement | null)[]>([]);
  const spark = useRef<SVGPolylineElement>(null);
  const hearts = useRef<(HTMLDivElement | null)[]>([]);
  const dataDot = useRef<HTMLDivElement>(null);
  const backDot = useRef<HTMLDivElement>(null);
  const led = useRef<HTMLDivElement>(null);

  const tick = (t: number) => {
    // calendar fills up slot by slot, then a new week starts
    const lit = Math.floor((t * 2.4) % 34);
    cells.current.forEach((c, k) => {
      if (!c) return;
      c.style.background = k < lit ? (k === lit - 1 ? P.signal : "rgba(181,74,43,.45)") : "rgba(20,20,19,.1)";
    });
    // writer types line by line
    const tp = (t * 0.45) % 1;
    typed.current.forEach((l, k) => {
      if (!l) return;
      l.style.width = `${clampPct((tp * 5 - k) * 100)}%`;
    });
    const line = Math.min(4, Math.floor(tp * 5));
    caret.current!.style.transform = `translate(${(tp * 5 - line) * 38}px,${line * 6}px)`;
    caret.current!.style.opacity = Math.sin(t * 12) > 0 ? "1" : "0.2";
    // designer paints the visual left to right
    const dp = (t / 5) % 1;
    paint.current!.style.clipPath = `inset(0 ${100 - clampPct(dp * 130)}% 0 0)`;
    stylus.current!.style.transform = `translate3d(${Math.sin(t * 2.2) * 9}px,${Math.cos(t * 3.1) * 5}px,0)`;
    // phone feed scrolls
    feed.current!.style.transform = `translateY(${-((t * 14) % 40)}px)`;
    // analytics bars breathe upward
    bars.current.forEach((b, k) => {
      if (!b) return;
      const grow = 0.55 + 0.45 * ease(((t / 6 + k * 0.04) % 1) * 1.4);
      b.style.transform = `translate3d(0,0,${DESK_Z}px) scale3d(1,1,${(0.35 + k * 0.17) * grow})`;
    });
    const sp = (t / 6) % 1;
    spark.current!.setAttribute("stroke-dashoffset", String(60 - 60 * Math.min(1, sp * 1.5)));
    // reactions float off the phone
    hearts.current.forEach((h, k) => {
      if (!h) return;
      const q = ((t / 2.4) + k / 3) % 1;
      h.style.transform = `translate3d(${Math.sin(q * 6 + k) * 6}px,0,${q * 60}px)`;
      h.style.opacity = String(Math.min(1, q * 5) * (1 - q));
    });
    // published data runs to the Analist, insight runs back to the Strateeg
    const dq = (t / 2.5) % 1;
    const dx = dq < 0.6 ? lerp(258, 150, dq / 0.6) : 150;
    const dy = dq < 0.6 ? 236 : lerp(236, 262, (dq - 0.6) / 0.4);
    dataDot.current!.style.transform = `translate3d(${dx - 3}px,${dy - 3}px,9px)`;
    const bq = (t / 3.2) % 1;
    backDot.current!.style.transform = `translate3d(${27}px,${lerp(296, 118, ease(bq)) - 3}px,9px)`;
    backDot.current!.style.opacity = String(Math.min(1, bq * 6, (1 - bq) * 6));
    led.current!.style.opacity = String(0.5 + 0.5 * Math.sin(t * 4));
  };

  const mono = "ui-monospace,SFMono-Regular,Menlo,monospace";
  const plateGrid = "linear-gradient(rgba(20,20,19,.05) 1px,transparent 1px) 0 0/25px 25px,linear-gradient(90deg,rgba(20,20,19,.05) 1px,transparent 1px) 0 0/25px 25px";

  return (
    <>
      {/* base plate */}
      <Box x={0} y={0} w={W} d={D} h={8} r={18} c={{ top: P.paper2, s: "#c4c4bd", w: "#d3d3cd" }}
        top={<div style={{ position: "absolute", inset: 0, borderRadius: 18, background: plateGrid }} />} />
      <Slab x={226} y={168} w={150} d={118} z={8.5} r={16} bg="#d9d9d3" />

      {/* floor routes: data to the Analist, insight back to the Strateeg */}
      <Slab x={150} y={235} w={108} d={2} z={8.6} bg={P.steelDark} />
      <Slab x={149} y={235} w={2} d={28} z={8.6} bg={P.steelDark} />
      <Slab x={26} y={116} w={2} d={182} z={8.6} bg={`repeating-linear-gradient(180deg,${P.signal} 0 6px,transparent 6px 11px)`} />
      <Slab x={26} y={296} w={26} d={2} z={8.6} bg={P.signal} />
      <Slab x={26} y={116} w={30} d={2} z={8.6} bg={P.signal} />
      <Box ref={dataDot} x={0} y={0} w={6} d={6} h={3} c={P.ink} r={3} style={{ transform: "translate3d(0,0,9px)" }} />
      <Box ref={backDot} x={0} y={0} w={6} d={6} h={3} c={P.signal} r={3} style={{ transform: "translate3d(0,0,9px)" }} />

      {/* 1 Strateeg: wall calendar + desk */}
      <Box x={58} y={58} w={4} d={4} h={92} z={8} c={P.steelDark} />
      <Box x={194} y={58} w={4} d={4} h={92} z={8} c={P.steelDark} />
      <Box x={56} y={60} w={144} d={4} h={58} z={44} c={ink} r={2}
        front={
          <div style={{ position: "absolute", inset: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ height: 6, borderRadius: 1, background: `linear-gradient(90deg,${P.signal} 0 22px,rgba(255,255,255,.18) 22px)` }} />
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gridTemplateRows: "repeat(4,1fr)", gap: 2, background: P.paper, padding: 2, borderRadius: 1 }}>
              {Array.from({ length: 28 }, (_, k) => (
                <div key={k} ref={(el) => { cells.current[k] = el; }} style={{ borderRadius: 1, background: "rgba(20,20,19,.1)" }} />
              ))}
            </div>
          </div>
        } />
      <Desk x={64} y={92} w={124} d={50} />
      <Box x={74} y={100} w={16} d={16} h={5} z={DESK_Z} c={{ top: "#f3d9cf", s: "#c9a99d", w: "#dcbcaf" }} r={1} />
      <Box x={76} y={102} w={12} d={12} h={1} z={DESK_Z + 5} c={P.signal} r={1} />
      <Box x={164} y={102} w={10} d={10} h={14} z={DESK_Z} c={P.ink3} r={5} />
      <Box x={166} y={104} w={2} d={2} h={10} z={DESK_Z + 14} c={P.signal} />
      <Box x={170} y={105} w={2} d={2} h={8} z={DESK_Z + 14} c={P.steel} />
      <Agent x={206} y={128} tone={P.ink3} />

      {/* 2 Schrijver: laptop, manuscript, mug */}
      <Desk x={420} y={74} w={136} d={58} />
      <Box x={458} y={100} w={52} d={26} h={2} z={DESK_Z} c={{ top: "#b9b9b2", s: "#8d8d87", w: "#a3a39c" }} r={2}
        top={<div style={{ position: "absolute", inset: "4px 5px 9px", background: "repeating-linear-gradient(90deg,rgba(20,20,19,.3) 0 3px,transparent 3px 5px) 0 0/100% 3px,repeating-linear-gradient(180deg,transparent 0 3px,rgba(20,20,19,.0) 3px 5px)", borderRadius: 1 }} />} />
      <Box x={458} y={96} w={52} d={3} h={34} z={DESK_Z} c={{ top: "#8d8d87", s: P.ink3, w: "#6f6f6a" }} r={2}
        front={
          <div style={{ position: "absolute", inset: 3, borderRadius: 2, background: "#fbfbf8", padding: "4px 4px", display: "flex", flexDirection: "column", gap: 2.5 }}>
            <div style={{ width: 16, height: 3, background: P.signal, borderRadius: 1 }} />
            {[0, 1, 2, 3, 4].map((k) => (
              <div key={k} style={{ height: 3.5, width: "100%", position: "relative" }}>
                <div ref={(el) => { typed.current[k] = el; }} style={{ height: "100%", width: 0, background: "rgba(20,20,19,.45)", borderRadius: 1 }} />
              </div>
            ))}
            <div ref={caret} style={{ position: "absolute", left: 4, top: 11.5, width: 1.5, height: 4.5, background: P.signal }} />
          </div>
        } />
      {[0, 1, 2].map((k) => (
        <Box key={k} x={428 + k} y={86 - k} w={22} d={28} h={1.5} z={DESK_Z + k * 2} c={paper} r={1}
          top={k === 2 ? <div style={{ position: "absolute", inset: "4px 3px", background: "repeating-linear-gradient(180deg,rgba(20,20,19,.3) 0 1px,transparent 1px 3.5px)" }} /> : undefined} />
      ))}
      <Agent x={408} y={122} tone={P.steelDark} />

      {/* 3 Designer: monitor with the visual being made, tablet, swatches */}
      <Desk x={430} y={258} w={136} d={62} />
      <Box x={478} y={272} w={14} d={10} h={3} z={DESK_Z} c={P.steelDark} r={2} />
      <Box x={483} y={276} w={4} d={3} h={10} z={DESK_Z + 3} c={P.steelDark} />
      <Box x={448} y={272} w={74} d={4} h={46} z={DESK_Z + 10} c={ink} r={2}
        front={
          <div style={{ position: "absolute", inset: 3, borderRadius: 2, overflow: "hidden", background: "#1a1a18" }}>
            <div ref={paint} style={{ position: "absolute", inset: 0 }}>
              <svg width={68} height={40} viewBox="0 0 68 40" style={{ maxWidth: "none", display: "block" }}>
                <rect width="68" height="40" fill="#efe7df" />
                <circle cx="50" cy="12" r="7" fill={P.signal} />
                <path d="M0 40 L20 18 L32 30 L44 20 L68 40 Z" fill={P.ink3} />
                <path d="M20 18 L26 25 L14 25 Z" fill={P.steel} />
              </svg>
            </div>
          </div>
        } />
      <Slab x={452} y={292} w={44} d={22} z={DESK_Z} r={3} bg={P.ink3}>
        <div style={{ position: "absolute", inset: 3, borderRadius: 2, background: "#3a3a35" }} />
      </Slab>
      <Group ref={stylus}>
        <Box x={472} y={300} w={14} d={2} h={2} z={DESK_Z + 1} c={P.paper} r={1} />
      </Group>
      {[P.signal, P.ink3, P.steel, P.paper].map((c, k) => (
        <Box key={k} x={508 + k * 11} y={300} w={9} d={9} h={3} z={DESK_Z} c={c} r={2} />
      ))}
      <Agent x={578} y={300} tone={P.ink3} />

      {/* 4 Analist: dashboard monitor, 3D bar chart */}
      <Desk x={50} y={262} w={136} d={62} />
      <Box x={78} y={276} w={14} d={10} h={3} z={DESK_Z} c={P.steelDark} r={2} />
      <Box x={83} y={280} w={4} d={3} h={10} z={DESK_Z + 3} c={P.steelDark} />
      <Box x={56} y={276} w={66} d={4} h={44} z={DESK_Z + 10} c={ink} r={2}
        front={
          <div style={{ position: "absolute", inset: 3, borderRadius: 2, background: "#0f0f0e", padding: "4px 5px", fontFamily: mono, color: P.paper }}>
            <div style={{ fontSize: 5, letterSpacing: ".14em", opacity: 0.6 }}>ENGAGEMENT</div>
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.05, color: "#e8835f" }}>+180%</div>
            <svg width={54} height={14} viewBox="0 0 54 14" style={{ maxWidth: "none", display: "block", marginTop: 1 }}>
              <polyline ref={spark} points="0,12 9,11 18,10 27,8 36,7 45,4 54,1" fill="none" stroke={P.signal} strokeWidth="1.6" strokeDasharray="60" strokeDashoffset="60" />
            </svg>
          </div>
        } />
      <Slab x={130} y={282} w={46} d={30} z={DESK_Z} r={2} bg="rgba(20,20,19,.08)" />
      {[0, 1, 2, 3, 4].map((k) => (
        <Group key={k} ref={(el) => { bars.current[k] = el; }} style={{ transform: `translate3d(0,0,${DESK_Z}px)` }}>
          <Box x={134 + k * 8} y={292} w={6} d={10} h={40} c={k === 4 ? P.signal : P.ink3} r={1} />
        </Group>
      ))}
      <Agent x={34} y={300} tone={P.steelDark} />

      {/* centre: the published feed on a phone stand */}
      <Box x={256} y={196} w={88} d={44} h={18} z={8} c={ink} r={6}
        front={
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, fontFamily: mono, color: P.paper, fontSize: 12, fontWeight: 700 }}>
            25+<span style={{ opacity: 0.6, fontWeight: 400, fontSize: 9 }}>/ week</span>
          </div>
        } />
      <Box x={286} y={206} w={28} d={14} h={6} z={26} c={P.steelDark} r={3} />
      <Box x={274} y={216} w={52} d={6} h={100} z={26} c={ink} r={7}
        front={
          <div style={{ position: "absolute", inset: "6px 4px", borderRadius: 5, overflow: "hidden", background: "#f7f7f4" }}>
            <div ref={feed} style={{ display: "flex", flexDirection: "column", gap: 4, padding: 4 }}>
              {Array.from({ length: 6 }, (_, k) => (
                <div key={k} style={{ height: 36, borderRadius: 3, background: "#fff", boxShadow: "0 0 0 .5px rgba(0,0,0,.15)", padding: 3, display: "flex", gap: 3 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 2, background: k % 2 ? P.ink3 : `radial-gradient(circle at 70% 30%,${P.signal} 0 3px,transparent 3.5px),#d9d4cc` }} />
                  <div style={{ flex: 1, background: "repeating-linear-gradient(180deg,rgba(20,20,19,.35) 0 1.5px,transparent 1.5px 4px)", height: 14, marginTop: 2 }} />
                </div>
              ))}
            </div>
          </div>
        } />
      <Box x={296} y={218} w={8} d={1} h={2} z={118} c={P.steelDark} r={1} />
      {[0, 1, 2].map((k) => (
        <Bill key={k} x={316 + k * 8} y={222} z={110}>
          <div ref={(el) => { hearts.current[k] = el; }} style={{ opacity: 0 }}>
            <svg width={11} height={10} viewBox="0 0 24 22" style={{ maxWidth: "none", display: "block" }}>
              <path d="M12 21 C5 15 1 11 1 6.5 C1 3 3.7 1 6.5 1 C9 1 11 2.6 12 4.5 C13 2.6 15 1 17.5 1 C20.3 1 23 3 23 6.5 C23 11 19 15 12 21 Z" fill={P.signal} />
            </svg>
          </div>
        </Bill>
      ))}

      {/* power hub with a status light */}
      <Box x={360} y={330} w={36} d={22} h={10} z={8} c={P.steel} r={3}
        front={<div ref={led} style={{ position: "absolute", right: 4, top: 3, width: 4, height: 4, borderRadius: 2, background: P.signal }} />} />
      <Slab x={376} y={240} w={2} d={90} z={8.6} bg={P.steelDark} />
      <Slab x={330} y={238} w={48} d={2} z={8.6} bg={P.steelDark} />

      {/* archive cabinet: every published post is filed */}
      <Box x={236} y={318} w={96} d={34} h={26} z={8} c={{ top: "#d0d0c9", s: "#a9a9a2", w: "#bcbcb5" }} r={3}
        front={
          <div style={{ position: "absolute", inset: "4px 5px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ borderRadius: 2, background: "rgba(20,20,19,.12)", display: "flex", justifyContent: "center", paddingTop: 3 }}>
                <div style={{ width: 10, height: 2, borderRadius: 1, background: P.ink3 }} />
              </div>
            ))}
          </div>
        } />
      {[0, 1, 2, 3, 4].map((k) => (
        <Box key={k} x={248 + (k % 2)} y={324} w={30} d={22} h={2} z={34.5 + k * 2.5} c={paper} r={1} />
      ))}
      {[0, 1, 2].map((k) => (
        <Box key={k} x={292 - (k % 2)} y={325} w={30} d={22} h={2} z={34.5 + k * 2.5} c={paper} r={1} />
      ))}
      <Box x={294} y={327} w={8} d={6} h={1} z={42.5} c={P.signal} r={1} />

      <OnFrame fn={tick} />
      {[0, 1].map((k) => <Card key={k} i={k} />)}

      <Bill x={128} y={62} z={84}><Chip tone="dark"><Num n={1} />{nl ? "Strateeg · kalender" : "Strategist · calendar"}</Chip></Bill>
      <Bill x={484} y={96} z={46}><Chip tone="light"><Num n={2} />{nl ? "Schrijver · posts & blogs" : "Writer · posts & blogs"}</Chip></Bill>
      <Bill x={508} y={384} z={0}><Chip tone="light"><Num n={3} />{nl ? "Designer · visuals" : "Designer · visuals"}</Chip></Bill>
      <Bill x={150} y={384} z={0}><Chip tone="signal"><Num n={4} light />{nl ? "Analist · stuurt bij" : "Analyst · adjusts"}</Chip></Bill>
    </>
  );
}

function Num({ n, light }: { n: number; light?: boolean }) {
  return (
    <span style={{ display: "inline-flex", width: 14, height: 14, borderRadius: 7, alignItems: "center", justifyContent: "center", fontSize: 9, background: light ? "rgba(255,255,255,.25)" : P.signal, color: "#fff" }}>{n}</span>
  );
}

const clampPct = (v: number) => (v < 0 ? 0 : v > 100 ? 100 : v);

export default function Scene({ language, className }: { language: string; className?: string }) {
  const nl = language === "nl";
  return (
    <Stage w={W} d={D} tone="paper" zoom={1.0} className={className}
      label={nl
        ? "Een isometrische contentstudio met vier AI-agents: de Strateeg plant posts op een wandkalender, de Schrijver schrijft ze op een laptop, de Designer maakt de visual, en de post verschijnt in een telefoonfeed. De Analist meet de reacties en stuurt de planning bij."
        : "An isometric content studio with four AI agents: the Strategist plans posts on a wall calendar, the Writer writes them on a laptop, the Designer makes the visual, and the post lands in a phone feed. The Analyst measures the reactions and adjusts the plan."}>
      <Studio nl={nl} />
    </Stage>
  );
}
