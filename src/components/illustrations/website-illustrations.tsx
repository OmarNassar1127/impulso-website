/**
 * Inline SVG illustrations for the "website laten maken" service page.
 *
 * All self-contained (no external assets, no deps) and drawn in the brand
 * palette: terracotta #B4442A on warm beige, with hairline strokes and white
 * "paper" surfaces so they sit naturally on the beige page background.
 */

const TERRACOTTA = "#B4442A";
const INK = "#14100E";
const LINE = "#D8CFC4";
const PAPER = "#FFFFFF";
const BEIGE = "#F6F1EC";
const SAND = "#EFE8DE";

/** Browser window with a finished, well-composed page inside. */
export function NewWebsiteIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 280"
      className={className}
      role="img"
      aria-label="Illustratie van een nieuwe website die vanaf nul wordt ontworpen"
    >
      {/* Window */}
      <rect x="20" y="24" width="360" height="232" rx="10" fill={PAPER} stroke={LINE} />
      {/* Chrome */}
      <path d="M20 34a10 10 0 0 1 10-10h340a10 10 0 0 1 10 10v18H20V34Z" fill={SAND} />
      <line x1="20" y1="52" x2="380" y2="52" stroke={LINE} />
      <circle cx="38" cy="38" r="4" fill="#E9A8A0" />
      <circle cx="52" cy="38" r="4" fill="#EBD3A0" />
      <circle cx="66" cy="38" r="4" fill="#A9CDB6" />
      <rect x="84" y="32" width="180" height="12" rx="6" fill={BEIGE} />

      {/* Hero block */}
      <rect x="44" y="74" width="150" height="14" rx="4" fill={INK} />
      <rect x="44" y="96" width="112" height="14" rx="4" fill={TERRACOTTA} />
      <rect x="44" y="122" width="176" height="7" rx="3.5" fill={LINE} />
      <rect x="44" y="135" width="140" height="7" rx="3.5" fill={LINE} />
      {/* CTA */}
      <rect x="44" y="156" width="86" height="26" rx="6" fill={INK} />
      <rect x="58" y="167" width="46" height="5" rx="2.5" fill={PAPER} opacity="0.9" />

      {/* Hero visual */}
      <rect x="238" y="74" width="118" height="108" rx="8" fill={BEIGE} stroke={LINE} />
      <circle cx="297" cy="116" r="22" fill="none" stroke={TERRACOTTA} strokeWidth="2" />
      <path d="M285 116h24M297 104v24" stroke={TERRACOTTA} strokeWidth="2" strokeLinecap="round" />
      <rect x="258" y="150" width="78" height="6" rx="3" fill={LINE} />
      <rect x="258" y="162" width="54" height="6" rx="3" fill={LINE} />

      {/* Three cards */}
      {[44, 164, 284].map((x) => (
        <g key={x}>
          <rect x={x} y="200" width="72" height="38" rx="7" fill={BEIGE} stroke={LINE} />
          <circle cx={x + 16} cy="214" r="5" fill={TERRACOTTA} opacity="0.85" />
          <rect x={x + 28} y="211" width="30" height="5" rx="2.5" fill={LINE} />
          <rect x={x + 12} y="226" width="48" height="4" rx="2" fill={LINE} />
        </g>
      ))}
    </svg>
  );
}

/** Existing site on the left, rebuilt version on the right. */
export function RedesignIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      role="img"
      aria-label="Illustratie van een bestaande website die wordt vernieuwd"
    >
      {/* Before, cramped and grey */}
      <g opacity="0.75">
        <rect x="8" y="30" width="150" height="160" rx="8" fill={PAPER} stroke={LINE} />
        <path d="M8 38a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v12H8V38Z" fill={SAND} />
        <line x1="8" y1="50" x2="158" y2="50" stroke={LINE} />
        <rect x="18" y="62" width="80" height="9" rx="3" fill="#B9B2AA" />
        <rect x="18" y="78" width="130" height="5" rx="2.5" fill={LINE} />
        <rect x="18" y="88" width="120" height="5" rx="2.5" fill={LINE} />
        <rect x="18" y="98" width="126" height="5" rx="2.5" fill={LINE} />
        <rect x="18" y="108" width="96" height="5" rx="2.5" fill={LINE} />
        {/* misaligned blocks */}
        <rect x="18" y="124" width="58" height="30" rx="4" fill={SAND} stroke={LINE} />
        <rect x="84" y="128" width="58" height="26" rx="4" fill={SAND} stroke={LINE} />
        <rect x="18" y="162" width="104" height="5" rx="2.5" fill={LINE} />
        <rect x="18" y="172" width="70" height="5" rx="2.5" fill={LINE} />
      </g>
      <text x="83" y="208" textAnchor="middle" fontSize="11" fill="#8A817A" fontFamily="system-ui, sans-serif">
        Nu
      </text>

      {/* Arrow */}
      <path
        d="M172 110h52"
        stroke={TERRACOTTA}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m216 102 9 8-9 8"
        stroke={TERRACOTTA}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* After, clean */}
      <rect x="242" y="22" width="150" height="176" rx="8" fill={PAPER} stroke={TERRACOTTA} strokeOpacity="0.4" />
      <path d="M242 30a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v12H242V30Z" fill={BEIGE} />
      <line x1="242" y1="42" x2="392" y2="42" stroke={LINE} />
      <rect x="256" y="58" width="74" height="11" rx="3" fill={INK} />
      <rect x="256" y="76" width="52" height="11" rx="3" fill={TERRACOTTA} />
      <rect x="256" y="96" width="110" height="5" rx="2.5" fill={LINE} />
      <rect x="256" y="106" width="88" height="5" rx="2.5" fill={LINE} />
      <rect x="256" y="122" width="62" height="20" rx="5" fill={INK} />
      <rect x="256" y="154" width="58" height="30" rx="5" fill={BEIGE} stroke={LINE} />
      <rect x="322" y="154" width="58" height="30" rx="5" fill={BEIGE} stroke={LINE} />
      <circle cx="270" cy="166" r="4" fill={TERRACOTTA} opacity="0.85" />
      <circle cx="336" cy="166" r="4" fill={TERRACOTTA} opacity="0.85" />
      <text x="317" y="212" textAnchor="middle" fontSize="11" fill={TERRACOTTA} fontFamily="system-ui, sans-serif">
        Straks
      </text>
    </svg>
  );
}

/** Laptop plus phone, same site, to show responsive delivery. */
export function ResponsiveIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="img"
      aria-label="Illustratie van een website op laptop en telefoon"
    >
      {/* Laptop */}
      <rect x="16" y="24" width="222" height="136" rx="8" fill={PAPER} stroke={LINE} />
      <path d="M16 32a8 8 0 0 1 8-8h206a8 8 0 0 1 8 8v10H16V32Z" fill={SAND} />
      <line x1="16" y1="42" x2="238" y2="42" stroke={LINE} />
      <rect x="34" y="58" width="86" height="10" rx="3" fill={INK} />
      <rect x="34" y="74" width="60" height="10" rx="3" fill={TERRACOTTA} />
      <rect x="34" y="94" width="112" height="5" rx="2.5" fill={LINE} />
      <rect x="34" y="104" width="92" height="5" rx="2.5" fill={LINE} />
      <rect x="34" y="120" width="66" height="22" rx="5" fill={INK} />
      <rect x="160" y="58" width="60" height="84" rx="6" fill={BEIGE} stroke={LINE} />
      <circle cx="190" cy="92" r="15" fill="none" stroke={TERRACOTTA} strokeWidth="2" />
      <rect x="172" y="118" width="36" height="5" rx="2.5" fill={LINE} />
      {/* Base */}
      <path d="M4 168h246l-8 10H12l-8-10Z" fill={SAND} stroke={LINE} strokeLinejoin="round" />

      {/* Phone */}
      <rect x="252" y="62" width="60" height="116" rx="12" fill={PAPER} stroke={LINE} />
      <rect x="272" y="70" width="20" height="4" rx="2" fill={LINE} />
      <rect x="262" y="86" width="34" height="8" rx="3" fill={INK} />
      <rect x="262" y="99" width="24" height="8" rx="3" fill={TERRACOTTA} />
      <rect x="262" y="116" width="40" height="4" rx="2" fill={LINE} />
      <rect x="262" y="124" width="32" height="4" rx="2" fill={LINE} />
      <rect x="262" y="138" width="40" height="16" rx="5" fill={INK} />
      <rect x="262" y="160" width="40" height="10" rx="4" fill={BEIGE} stroke={LINE} />
    </svg>
  );
}

/** Website plus a chat bubble, the AI agent that ships with the site. */
export function AgentOnSiteIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 220"
      className={className}
      role="img"
      aria-label="Illustratie van een website met een AI-agent die vragen beantwoordt"
    >
      {/* Site */}
      <rect x="12" y="20" width="230" height="170" rx="9" fill={PAPER} stroke={LINE} />
      <path d="M12 29a9 9 0 0 1 9-9h212a9 9 0 0 1 9 9v13H12V29Z" fill={SAND} />
      <line x1="12" y1="42" x2="242" y2="42" stroke={LINE} />
      <rect x="30" y="60" width="92" height="11" rx="3" fill={INK} />
      <rect x="30" y="78" width="64" height="11" rx="3" fill={TERRACOTTA} />
      <rect x="30" y="100" width="120" height="5" rx="2.5" fill={LINE} />
      <rect x="30" y="110" width="100" height="5" rx="2.5" fill={LINE} />
      <rect x="30" y="128" width="70" height="22" rx="5" fill={INK} />
      <rect x="30" y="162" width="86" height="5" rx="2.5" fill={LINE} />

      {/* Chat widget */}
      <rect x="168" y="86" width="160" height="112" rx="12" fill={PAPER} stroke={TERRACOTTA} strokeOpacity="0.35" />
      <path d="M168 98a12 12 0 0 1 12-12h136a12 12 0 0 1 12 12v14H168V98Z" fill={TERRACOTTA} />
      <circle cx="186" cy="99" r="6" fill={PAPER} opacity="0.9" />
      <rect x="198" y="96" width="52" height="6" rx="3" fill={PAPER} opacity="0.85" />
      {/* Incoming bubble */}
      <rect x="180" y="124" width="86" height="22" rx="8" fill={BEIGE} />
      <rect x="190" y="132" width="60" height="5" rx="2.5" fill={LINE} />
      {/* Outgoing bubble */}
      <rect x="230" y="152" width="86" height="22" rx="8" fill={TERRACOTTA} opacity="0.12" />
      <rect x="242" y="160" width="62" height="5" rx="2.5" fill={TERRACOTTA} opacity="0.55" />
      {/* Typing dots */}
      <circle cx="188" cy="184" r="3" fill={LINE} />
      <circle cx="199" cy="184" r="3" fill={LINE} />
      <circle cx="210" cy="184" r="3" fill={LINE} />
    </svg>
  );
}
