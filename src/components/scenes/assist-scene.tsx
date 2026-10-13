"use client";

/**
 * Impulso Assist: a salon reception after closing time. Nobody is at the desk,
 * but the phone on its dock keeps working. A customer on the sofa at home sends
 * a WhatsApp message, the phone replies in her language within seconds, the
 * booking lands on the wall calendar, a reminder goes out, and the customer
 * shows up in the waiting chairs. The clock spins and the door says closed.
 */
import { useRef } from "react";
import { Bill, Box, Chip, Group, P, Slab, Stage, ease, lerp, span, useFrame } from "./kit";

const T = 10; // one conversation
const LANGS = [
  { tag: "NL", q: "Kan ik morgen om 10:00?", a: "Ja! Ingepland.", r: "Herinnering: morgen 10:00" },
  { tag: "EN", q: "Can I come tomorrow at 10?", a: "Yes! Booked.", r: "Reminder: tomorrow 10:00" },
  { tag: "ES", q: "¿Mañana a las 10?", a: "¡Sí! Reservado.", r: "Recordatorio: mañana 10:00" },
  { tag: "DE", q: "Morgen um 10 Uhr?", a: "Ja! Gebucht.", r: "Erinnerung: morgen 10:00" },
];

// wall calendar: front face spans z CAL_Z..CAL_Z+CAL_H
const CAL_X = 214, CAL_Z = 30, CAL_H = 88, CAL_W = 186;
const COL_W = 35, ROW_H = 15, GRID_TOP = 18;
const SLOTS = [[1, 1], [3, 0], [0, 2], [4, 3], [2, 3]];
const BUSY = [[0, 0], [2, 1], [4, 1], [1, 3], [3, 2]];
const slotX = (c: number) => CAL_X + 5 + COL_W * c + COL_W / 2;
const slotZ = (r: number) => CAL_Z + CAL_H - (GRID_TOP + ROW_H * r + ROW_H / 2);

const HOME = { x: 92, y: 318, z: 52 }; // customer's phone at home
const PHONE = { x: 318, y: 168, z: 112 }; // the assistant phone on the counter
const CHAIRS = [404, 448, 492];

const wall = { top: "#e9e8e2", s: "#e1e0d9", w: "#d6d5ce" };
const paper = { top: P.paper, s: "#cfcfc8", w: "#dcdcd5" };
const wood = { top: "#d8cbb8", s: "#b9ab97", w: "#c8bba7" };
const fabric = { top: "#cfcfc8", s: "#a9a9a2", w: "#bcbcb5" };

function Person({ x, y, z, tone, phone, innerRef }: { x: number; y: number; z: number; tone: string; phone?: boolean; innerRef?: (el: HTMLDivElement | null) => void }) {
  return (
    <Bill x={x} y={y} z={z}>
      <div ref={innerRef} style={innerRef ? { opacity: 0 } : undefined}>
      <svg width={28} height={40} viewBox="0 0 28 40" style={{ maxWidth: "none", display: "block" }}>
        <path d="M2 40 C2 26 7 22 14 22 C21 22 26 26 26 40 Z" fill={tone} />
        <circle cx="14" cy="12" r="8" fill={P.paper2} stroke="rgba(0,0,0,.25)" />
        {phone && <rect x="17" y="24" width="6" height="10" rx="1.2" fill={P.ink} stroke={P.paper} strokeWidth=".6" />}
      </svg>
      </div>
    </Bill>
  );
}

/** A WhatsApp bubble icon that flies between the two phones. */
function Bubble({ fill, mark }: { fill: string; mark: "lines" | "bell" | "cal" }) {
  return (
    <svg data-bubble="" width={40} height={32} viewBox="0 0 30 24" style={{ maxWidth: "none", display: "block", opacity: 0, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.25))" }}>
      <path d="M4 1 H26 A3 3 0 0 1 29 4 V15 A3 3 0 0 1 26 18 H11 L5 23 V18 H4 A3 3 0 0 1 1 15 V4 A3 3 0 0 1 4 1 Z" fill={fill} stroke="rgba(0,0,0,.18)" />
      {mark === "lines" && <><rect x="6" y="6" width="17" height="2" rx="1" fill="rgba(0,0,0,.35)" /><rect x="6" y="11" width="11" height="2" rx="1" fill="rgba(0,0,0,.35)" /></>}
      {mark === "bell" && <path d="M15 4 C11 4 10 7 10 10 V12 L8 14 H22 L20 12 V10 C20 7 19 4 15 4 Z M13 15 A2 2 0 0 0 17 15 Z" fill="#fff" />}
      {mark === "cal" && <><rect x="8" y="4" width="14" height="11" rx="1.5" fill="#fff" /><rect x="8" y="4" width="14" height="3" fill={P.signalDark} /><rect x="13" y="9" width="4" height="4" fill={P.signal} /></>}
    </svg>
  );
}

function Shop({ language }: { language: string }) {
  const nl = language === "nl";
  const msgIn = useRef<HTMLDivElement>(null);
  const msgOut = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const remind = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const seated = useRef<(HTMLDivElement | null)[]>([]);
  const scr = useRef<(HTMLDivElement | null)[]>([]); // q, typing, a, r
  const txt = useRef<(HTMLSpanElement | null)[]>([]); // tag, q, a, r
  const hourHand = useRef<HTMLDivElement>(null);
  const minHand = useRef<HTMLDivElement>(null);
  const led = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const lastCyc = useRef(-1);

  useFrame((t) => {
    t = Math.max(0, t); // the first rAF stamp can precede the stage clock
    const cyc = Math.floor(t / T), lt = t % T;
    if (cyc !== lastCyc.current) {
      lastCyc.current = cyc;
      const L = LANGS[cyc % LANGS.length];
      [L.tag, L.q, L.a, L.r].forEach((s, k) => { const el = txt.current[k]; if (el) el.textContent = s; });
      const n = cyc % SLOTS.length;
      slots.current.forEach((el, k) => { if (el) el.style.opacity = k < n ? "1" : "0"; });
    }

    const fly = (el: HTMLDivElement | null, a: typeof HOME, b: typeof HOME, t0: number, t1: number, arc = 36) => {
      if (!el) return;
      const p = span(lt, t0, t1), k = ease(p);
      const x = lerp(a.x, b.x, k), y = lerp(a.y, b.y, k), z = lerp(a.z, b.z, k) + Math.sin(Math.PI * k) * arc;
      el.style.transform = `translate3d(${x}px,${y}px,${z}px)`;
      const o = Math.min(span(lt, t0 - 0.15, t0 + 0.1), 1 - span(lt, t1 - 0.1, t1 + 0.2));
      const bub = el.querySelector<HTMLElement>("[data-bubble]");
      if (bub) bub.style.opacity = String(o);
    };
    fly(msgIn.current, HOME, PHONE, 0.3, 1.3);
    fly(msgOut.current, PHONE, HOME, 2.0, 3.0);
    const n = cyc % SLOTS.length;
    const [sc, sr] = SLOTS[n];
    fly(card.current, PHONE, { x: slotX(sc), y: 40, z: slotZ(sr) }, 3.3, 4.6, 20);
    fly(remind.current, PHONE, HOME, 5.6, 6.7);

    const slot = slots.current[n];
    if (slot) slot.style.opacity = String(span(lt, 4.5, 4.8));

    // phone screen: question, typing, answer, reminder
    const fade = 1 - span(lt, T - 0.5, T - 0.1);
    const show = [
      span(lt, 1.2, 1.4) * fade,
      lt > 1.4 && lt < 1.95 ? 0.5 + 0.5 * Math.sin(t * 14) : 0,
      span(lt, 1.95, 2.15) * fade,
      span(lt, 5.4, 5.6) * fade,
    ];
    scr.current.forEach((el, k) => { if (el) el.style.opacity = String(show[k]); });

    // the customer shows up in a waiting chair
    seated.current.forEach((el, k) => {
      if (!el) return;
      const on = k === cyc % 2 ? span(lt, 7.2, 7.8) * (1 - span(lt, T - 0.6, T - 0.1)) : 0;
      el.style.opacity = String(on);
      el.style.transform = `translateY(${(1 - on) * 8}px)`;
    });

    // round the clock, around the clock
    if (hourHand.current) hourHand.current.style.transform = `rotate(${t * 30}deg)`;
    if (minHand.current) minHand.current.style.transform = `rotate(${t * 360 / 2.5}deg)`;
    if (led.current) led.current.style.opacity = String(0.55 + 0.45 * Math.sin(t * 6));
    if (glow.current) glow.current.style.opacity = String(0.55 + 0.25 * Math.sin(t * 1.3));
  });

  const sx = (k: number) => ({ position: "absolute" as const, opacity: 0, maxWidth: "80%", borderRadius: 3, padding: "1.5px 3px", fontSize: 4.6, lineHeight: 1.2, color: P.ink, boxShadow: "0 1px 0 rgba(0,0,0,.12)", ...(k === 0 || k === 3 ? { left: 3 } : { right: 3 }) });

  return (
    <>
      {/* base plate and floor */}
      <Box x={0} y={0} w={600} d={400} h={8} r={18} c={{ top: P.paper2, s: "#c4c4bd", w: "#d0d0c9" }} />
      <Slab x={16} y={16} w={568} d={368} z={8.5} r={10}
        bg={`linear-gradient(rgba(20,20,19,.05) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,rgba(20,20,19,.05) 1px,transparent 1px) 0 0/28px 28px,#ecebe6`} />

      {/* back wall */}
      <Box x={30} y={16} w={540} d={14} h={128} z={8} c={wall}
        front={<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: "#cfcec7" }} />} />
      {/* window: it is night */}
      <Box x={52} y={30} w={104} d={3} h={70} z={52} c={P.steel}
        front={
          <div style={{ position: "absolute", inset: 4, background: "linear-gradient(#1c2333,#2e3a52)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 62, top: 9, width: 14, height: 14, borderRadius: "50%", background: "#f2efe2", boxShadow: "-4px 2px 0 0 #253046 inset" }} />
            {[[12, 12], [30, 26], [48, 8], [20, 40], [80, 38], [6, 52]].map(([l, tp]) => (
              <div key={`${l}${tp}`} style={{ position: "absolute", left: l, top: tp, width: 1.5, height: 1.5, background: "#f2efe2", opacity: 0.8 }} />
            ))}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 3, marginLeft: -1.5, background: P.steel }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3, marginTop: -1.5, background: P.steel }} />
          </div>
        } />
      <Box x={48} y={30} w={112} d={8} h={3} z={50} c={paper} />

      {/* wall calendar, the booking book */}
      <Box x={CAL_X} y={30} w={CAL_W} d={4} h={CAL_H} z={CAL_Z} c={paper}
        front={
          <div style={{ position: "absolute", inset: 0, fontFamily: "ui-monospace,monospace" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 13, background: P.ink3, color: P.paper, fontSize: 6, letterSpacing: ".12em", padding: "3px 6px" }}>
              {nl ? "AGENDA" : "CALENDAR"}
            </div>
            <div style={{ position: "absolute", left: 5, top: GRID_TOP, width: COL_W * 5, height: ROW_H * 4, background: `linear-gradient(90deg,rgba(20,20,19,.16) 1px,transparent 1px) 0 0/${COL_W}px 100%,linear-gradient(rgba(20,20,19,.16) 1px,transparent 1px) 0 0/100% ${ROW_H}px`, borderRight: "1px solid rgba(20,20,19,.16)", borderBottom: "1px solid rgba(20,20,19,.16)" }} />
            {BUSY.map(([c, r]) => (
              <div key={`b${c}${r}`} style={{ position: "absolute", left: 5 + COL_W * c + 3, top: GRID_TOP + ROW_H * r + 3, width: COL_W - 6, height: ROW_H - 6, borderRadius: 2, background: "#c9c9c2" }} />
            ))}
            {SLOTS.map(([c, r], k) => (
              <div key={`s${c}${r}`} ref={(el) => { slots.current[k] = el; }}
                style={{ position: "absolute", left: 5 + COL_W * c + 3, top: GRID_TOP + ROW_H * r + 3, width: COL_W - 6, height: ROW_H - 6, borderRadius: 2, background: P.signal, opacity: 0 }} />
            ))}
          </div>
        } />
      <Box x={CAL_X + 20} y={28} w={6} d={7} h={6} z={CAL_Z + CAL_H - 3} c={P.signal} r={2} />
      <Box x={CAL_X + CAL_W - 26} y={28} w={6} d={7} h={6} z={CAL_Z + CAL_H - 3} c={P.signal} r={2} />

      {/* wall clock */}
      <Box x={428} y={30} w={40} d={4} h={40} z={86} c={P.ink3} r={20}
        front={
          <div style={{ position: "absolute", inset: 3, borderRadius: "50%", background: P.paper }}>
            {[0, 90, 180, 270].map((a) => (
              <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 1.5, height: 4, marginLeft: -0.75, background: P.ink, transform: `rotate(${a}deg) translateY(-15px)`, transformOrigin: "50% 0" }} />
            ))}
            <div ref={hourHand} style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0 }}>
              <div style={{ position: "absolute", left: -1, bottom: 0, width: 2, height: 9, background: P.ink, borderRadius: 1 }} />
            </div>
            <div ref={minHand} style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0 }}>
              <div style={{ position: "absolute", left: -0.6, bottom: 0, width: 1.2, height: 13, background: P.signal, borderRadius: 1 }} />
            </div>
          </div>
        } />

      {/* door with the closed sign */}
      <Box x={492} y={30} w={58} d={3} h={110} z={8} c={P.ink3}
        front={
          <div style={{ position: "absolute", inset: "6px 6px 0" }}>
            <div style={{ position: "absolute", left: 6, right: 6, top: 6, height: 40, background: "linear-gradient(#1c2333,#2e3a52)" }} />
            <div style={{ position: "absolute", left: 7, right: 7, top: 30, height: 12, background: P.paper, borderRadius: 2, fontFamily: "ui-monospace,monospace", fontSize: 6, fontWeight: 700, color: P.signalDark, textAlign: "center", lineHeight: "12px" }}>
              {nl ? "GESLOTEN" : "CLOSED"}
            </div>
            <div style={{ position: "absolute", right: 4, top: 58, width: 4, height: 10, background: P.steel, borderRadius: 2 }} />
          </div>
        } />
      <Slab x={488} y={33} w={66} d={22} z={8.6} r={2} bg="#d9d9d3" />

      {/* coat stand and doormat by the door */}
      <Slab x={492} y={60} w={58} d={26} z={8.8} r={3} bg="#8f8a80" />
      <Box x={448} y={52} w={14} d={14} h={3} z={8} c={P.steelDark} r={7} />
      <Box x={453} y={57} w={4} d={4} h={78} z={11} c={P.steelDark} />
      <Box x={446} y={50} w={18} d={18} h={3} z={89} c={P.steelDark} r={9} />
      <Box x={444} y={60} w={10} d={8} h={26} z={60} c={P.ink3} r={4} />
      <Box x={458} y={56} w={8} d={10} h={20} z={66} c={P.signalDark} r={4} />

      {/* wall shelf with plants */}
      <Box x={172} y={30} w={30} d={12} h={3} z={96} c={wood} />
      <Box x={177} y={33} w={9} d={8} h={8} z={99.5} c={P.paper} r={2} />
      <Box x={179} y={34} w={6} d={6} h={6} z={107.5} c="#7f9a6e" r={3} />
      <Box x={189} y={33} w={9} d={8} h={10} z={99.5} c={P.steelDark} r={1} />

      {/* cable from the phone dock to the calendar */}
      <Slab x={316} y={34} w={3} d={124} z={8.7} r={1} bg={P.ink3} />

      {/* reception counter, nobody behind it */}
      <Box x={262} y={84} w={26} d={22} h={14} z={8} c={P.ink3} r={3} />
      <Box x={262} y={80} w={26} d={5} h={26} z={22} c={P.ink3} r={2} />
      <Box x={210} y={140} w={210} d={46} h={46} z={8} c={{ top: P.paper, s: P.ink3, w: P.ink2 }} r={3}
        front={
          <>
            <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 3, background: P.signal }} />
            <div style={{ position: "absolute", left: 14, top: 18, fontFamily: "ui-monospace,monospace", fontSize: 8, letterSpacing: ".18em", color: "rgba(242,242,238,.7)" }}>{nl ? "RECEPTIE" : "RECEPTION"}</div>
          </>
        } />
      <Box x={206} y={136} w={218} d={54} h={3} z={54} c={wood} r={3} />
      {/* monitor + keyboard, screen asleep */}
      <Box x={226} y={146} w={14} d={10} h={3} z={57.5} c={P.steelDark} r={2} />
      <Box x={231} y={149} w={4} d={4} h={10} z={60.5} c={P.steelDark} />
      <Box x={214} y={146} w={38} d={4} h={26} z={70} c={P.ink3} r={2}
        front={<div style={{ position: "absolute", inset: 2, background: "#151514", borderRadius: 1 }} />} />
      <Box x={218} y={166} w={32} d={11} h={2} z={57.5} c={P.paper2} r={1} />
      {/* phone dock + the assistant phone */}
      <Box x={296} y={170} w={44} d={14} h={6} z={57.5} c={P.ink} r={3} />
      <Box x={293} y={162} w={50} d={6} h={94} z={62} c={P.ink} r={6}
        front={
          <div style={{ position: "absolute", inset: 3, borderRadius: 4, overflow: "hidden", background: "#ece5dd", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
            <div style={{ height: 12, background: P.ink3, color: P.paper, fontSize: 4.6, fontWeight: 600, padding: "0 3px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Impulso Assist</span>
              <span ref={(el) => { txt.current[0] = el; }} style={{ fontFamily: "ui-monospace,monospace", fontSize: 4.4, padding: "0 2px", borderRadius: 2, background: P.signal }}>NL</span>
            </div>
            <div ref={(el) => { scr.current[0] = el; }} style={{ ...sx(0), top: 16, background: "#fff" }}>
              <span ref={(el) => { txt.current[1] = el; }}>{LANGS[0].q}</span>
            </div>
            <div ref={(el) => { scr.current[1] = el; }} style={{ ...sx(1), top: 34, background: "#d7f5df", letterSpacing: ".1em" }}>• • •</div>
            <div ref={(el) => { scr.current[2] = el; }} style={{ ...sx(2), top: 34, background: "#c9f2d4" }}>
              <span ref={(el) => { txt.current[2] = el; }}>{LANGS[0].a}</span>
            </div>
            <div ref={(el) => { scr.current[3] = el; }} style={{ ...sx(3), top: 52, background: "#fff", borderLeft: `1.5px solid ${P.signal}` }}>
              <span ref={(el) => { txt.current[3] = el; }}>{LANGS[0].r}</span>
            </div>
            <div style={{ position: "absolute", left: 3, right: 3, bottom: 3, height: 7, borderRadius: 4, background: "#fff" }} />
          </div>
        } />
      {/* counter bell, router, plant */}
      <Box x={364} y={168} w={12} d={12} h={3} z={57.5} c={P.steelDark} r={6} />
      <Box x={366} y={170} w={8} d={8} h={5} z={60.5} c={P.steel} r={4} />
      <Box x={388} y={146} w={22} d={14} h={5} z={57.5} c={P.ink3} r={2}
        front={<div ref={led} style={{ position: "absolute", left: 3, top: 1.5, width: 3, height: 2, borderRadius: 1, background: P.signal }} />} />
      <Box x={391} y={148} w={2} d={2} h={10} z={62.5} c={P.ink3} />
      <Box x={405} y={148} w={2} d={2} h={10} z={62.5} c={P.ink3} />
      <Box x={394} y={168} w={14} d={14} h={10} z={57.5} c={P.paper} r={3} />
      <Box x={393} y={167} w={16} d={16} h={10} z={67.5} c="#7f9a6e" r={8} />

      {/* waiting area */}
      <Slab x={384} y={262} w={160} d={86} z={8.7} r={8} bg="#e0ddd5" />
      {CHAIRS.map((x) => (
        <Group key={x}>
          {[[2, 2], [24, 2], [2, 22], [24, 22]].map(([lx, ly]) => (
            <Box key={`${lx}${ly}`} x={x + lx} y={276 + ly} w={3} d={3} h={14} z={8} c={P.steelDark} />
          ))}
          <Box x={x} y={276} w={30} d={28} h={4} z={22} c={fabric} r={3} />
          <Box x={x} y={272} w={30} d={5} h={20} z={22} c={fabric} r={3} />
        </Group>
      ))}
      <Person x={CHAIRS[2] + 15} y={302} z={27} tone={P.steel} />
      {[0, 1].map((k) => (
        <Person key={k} x={CHAIRS[k] + 15} y={302} z={27} tone={P.signal} innerRef={(el) => { seated.current[k] = el; }} />
      ))}
      <Box x={420} y={316} w={60} d={24} h={14} z={8} c={wood} r={3} />
      <Box x={428} y={320} w={20} d={14} h={2} z={22.5} c={P.paper} />
      <Box x={432} y={322} w={20} d={14} h={2} z={24.5} c={P.signal} />
      <Box x={548} y={276} w={16} d={16} h={14} z={8} c={P.paper} r={4} />
      <Box x={546} y={274} w={20} d={20} h={22} z={22} c="#7f9a6e" r={10} />

      {/* at home, after hours: sofa, lamp, the customer with her phone */}
      <Slab x={36} y={250} w={170} d={120} z={8.7} r={10} bg="#e2ddd2" />
      <Box x={48} y={300} w={96} d={34} h={14} z={8} c={fabric} r={4} />
      <Box x={48} y={290} w={96} d={12} h={30} z={8} c={fabric} r={4} />
      <Box x={44} y={292} w={10} d={42} h={22} z={8} c={fabric} r={4} />
      <Box x={138} y={292} w={10} d={42} h={22} z={8} c={fabric} r={4} />
      <Box x={60} y={302} w={20} d={10} h={10} z={22} c={P.signal} r={4} />
      <Person x={HOME.x} y={318} z={18} tone={P.steelDark} phone />
      <Box x={160} y={300} w={22} d={22} h={20} z={8} c={wood} r={11} />
      <Box x={166} y={306} w={10} d={4} h={3} z={28.5} c={P.ink} r={1} />
      <Box x={30} y={268} w={14} d={14} h={3} z={8} c={P.steelDark} r={7} />
      <Box x={35} y={273} w={4} d={4} h={56} z={11} c={P.steelDark} />
      <Box ref={glow} x={27} y={265} w={20} d={20} h={12} z={67} c={{ top: "#f6e7c4", s: "#f0d9a6", w: "#e9cf95" }} r={6} />

      {/* the messages in flight */}
      <Group ref={msgIn}><Bill x={0} y={0} front><Bubble fill="#fff" mark="lines" /></Bill></Group>
      <Group ref={msgOut}><Bill x={0} y={0} front><Bubble fill={P.green} mark="lines" /></Bill></Group>
      <Group ref={card}><Bill x={0} y={0} front><Bubble fill={P.signal} mark="cal" /></Bill></Group>
      <Group ref={remind}><Bill x={0} y={0} front><Bubble fill={P.green} mark="bell" /></Bill></Group>

      {/* results */}
      <Bill x={104} y={40} z={108}><Chip tone="dark"><span style={{ color: P.signal }}>24/7</span> {nl ? "bereikbaar" : "available"}</Chip></Bill>
      <Bill x={330} y={196} z={190}><Chip tone="signal">{nl ? "antwoord <10 sec" : "<10 sec response"}</Chip></Bill>
      <Bill x={474} y={398} z={0}><Chip tone="light"><span style={{ color: P.signalDark }}>60%</span> {nl ? "minder no-shows" : "fewer no-shows"}</Chip></Bill>
      <Bill x={300} y={330} z={0}><Chip tone="dark"><span style={{ color: P.signal }}>{nl ? "€2.800/mnd" : "€2,800/mo"}</span> {nl ? "bespaard" : "saved"}</Chip></Bill>
    </>
  );
}

export default function Scene({ language, className }: { language: string; className?: string }) {
  const nl = language === "nl";
  return (
    <Stage w={600} d={400} tone="paper" zoom={1.1} className={className}
      label={nl
        ? "Een isometrische salonreceptie na sluitingstijd: niemand achter de balie, maar de telefoon op het dock beantwoordt een WhatsApp-bericht van een klant thuis, zet de afspraak in de wandagenda, stuurt een herinnering, en de klant zit daarna in de wachtstoel."
        : "An isometric salon reception after closing time: nobody at the desk, but the phone on its dock answers a customer's WhatsApp message from home, books the slot on the wall calendar, sends a reminder, and the customer then shows up in the waiting chair."}>
      <Shop language={language} />
    </Stage>
  );
}
