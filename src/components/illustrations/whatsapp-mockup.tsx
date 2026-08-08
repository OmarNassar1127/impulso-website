import { CheckCheck, MoreVertical, CalendarCheck, Paperclip, Smile, Send } from "lucide-react";

/**
 * WhatsApp-style conversation panel.
 *
 * Deliberately NOT wrapped in a fake phone bezel: hand-drawn device chrome
 * (bezels, notches, status bars) reads as amateur, and licensed device-frame
 * images can't be shipped on a commercial site. A clean floating card looks
 * more premium and puts the attention on the conversation.
 *
 * Sides follow the real app as seen on the customer's screen: messages FROM
 * the business (our agent) sit left in white, the customer's own replies sit
 * right in green.
 */
export function WhatsAppMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[384px] ${className}`}>
      {/* Soft brand glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 20%, rgba(0,168,132,0.16), transparent 70%), radial-gradient(60% 60% at 20% 80%, rgba(180,68,42,0.12), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]">
        {/* Header */}
        <div className="flex items-center gap-3 bg-[#008069] px-3.5 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-[#008069]">
            IC
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-semibold text-white">Impulso Co.</div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7ee787]" />
              online
            </div>
          </div>
          <MoreVertical className="h-4 w-4 shrink-0 text-white/80" strokeWidth={2} />
        </div>

        {/* Conversation */}
        <div
          className="space-y-1.5 px-3 py-2.5"
          style={{
            backgroundColor: "#EFE7DE",
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.022) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        >
          {/* Customer */}
          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] leading-snug text-[#111b21]">
                Hoi! Wat kan een AI-agent voor mijn bedrijf doen?
              </p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
                21:46
                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* Agent, answers first and qualifies */}
          <div className="flex justify-start">
            <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] leading-snug text-[#111b21]">
                Ik beantwoord klantvragen, plan afspraken in en stuur herinneringen.
                Waar loop jij tegenaan?
              </p>
              <span className="mt-1 block text-right text-[10px] text-[#667781]">21:46</span>
            </div>
          </div>

          {/* Customer */}
          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] leading-snug text-[#111b21]">
                Veel offerte-aanvragen, ik reageer pas 's avonds.
              </p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
                21:46
                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* Agent, ties it back and only then offers the intake */}
          <div className="flex justify-start">
            <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-white px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] leading-snug text-[#111b21]">
                Die vang ik direct op en plan meteen een belafspraak in. Zal ik het
                laten zien? Morgen kan om{" "}
                <span className="font-semibold">10:00</span>,{" "}
                <span className="font-semibold">14:00</span> of{" "}
                <span className="font-semibold">16:30</span>.
              </p>
              <span className="mt-1 block text-right text-[10px] text-[#667781]">21:46</span>
            </div>
          </div>

          {/* Customer */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] leading-snug text-[#111b21]">14:00 graag 🙌</p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
                21:47
                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* Agent, with appointment card */}
          <div className="flex justify-start">
            <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <div className="mb-2 overflow-hidden rounded-lg border border-black/[0.07] bg-[#F7F8FA]">
                <div className="flex items-center gap-2 bg-[#00A884] px-2.5 py-1">
                  <CalendarCheck className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
                    Afspraak bevestigd
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <div className="text-[12px] font-bold leading-tight text-[#111b21]">
                    Gratis intake, 30 min
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[14px] font-bold text-[#00A884]">14:00</span>
                    <span className="text-[11px] text-[#667781]">tot 14:30 · morgen</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between border-t border-black/[0.06] pt-1.5">
                    <span className="text-[10px] text-[#667781]">Videogesprek · Impulso Co.</span>
                    <span className="text-[10px] font-semibold text-[#00A884]">In agenda</span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] leading-snug text-[#111b21]">
                Ingepland! Je krijgt vooraf een herinnering. Tot morgen 👋
              </p>
              <span className="mt-1 block text-right text-[10px] text-[#667781]">21:47</span>
            </div>
          </div>

        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2.5 border-t border-black/[0.06] bg-white px-3 py-2">
          <Smile className="h-4.5 w-4.5 shrink-0 text-[#8696a0]" strokeWidth={1.8} />
          <Paperclip className="h-4.5 w-4.5 shrink-0 text-[#8696a0]" strokeWidth={1.8} />
          <span className="flex-1 text-[12px] text-[#8696a0]">Typ een bericht</span>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#008069]">
            <Send className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* Response-time badge. Floated over the card rather than stacked under
          it: in the flow it added its own height and pushed itself below the
          fold, which is exactly where nobody reads it. */}
      <div className="absolute -top-3.5 right-2 z-10 rounded-full bg-foreground px-3.5 py-1.5 shadow-lg ring-1 ring-black/5 sm:-right-3">
        <span className="flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold text-background">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Antwoord in 8 seconden
        </span>
      </div>
    </div>
  );
}

/**
 * Before/after comparison of the no-show rate.
 *
 * Bar heights are in pixels, not percentages: a percentage height resolves
 * against the parent's height, and the flex column has no explicit height, so
 * every bar collapsed to zero.
 */
export function NoShowComparison({ className = "" }: { className?: string }) {
  const PLOT_HEIGHT = 132;
  const MAX = 25;

  const weeks = [
    { label: "wk 1", value: 22, after: false },
    { label: "wk 2", value: 21, after: false },
    { label: "wk 3", value: 23, after: false },
    { label: "wk 4", value: 18, after: true },
    { label: "wk 5", value: 15, after: true },
    { label: "wk 6", value: 14, after: true },
    { label: "wk 7", value: 13, after: true },
    { label: "wk 8", value: 13, after: true },
  ];

  return (
    <div className={`rounded-2xl border border-foreground/15 bg-card p-5 shadow-sm sm:p-6 ${className}`}>
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-sm font-bold text-foreground">No-show rate</h3>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          &minus;40%
        </span>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">
        Fysiotherapiepraktijk, 8 weken na livegang
      </p>

      <div className="flex items-end gap-1.5 sm:gap-2" style={{ height: PLOT_HEIGHT + 34 }}>
        {weeks.map((w) => (
          <div key={w.label} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span
              className={`text-[10px] font-semibold ${
                w.after ? "text-emerald-700" : "text-muted-foreground"
              }`}
            >
              {w.value}%
            </span>
            <div
              className={`w-full rounded-t-md ${w.after ? "bg-emerald-500" : "bg-terracotta"}`}
              style={{ height: Math.round((w.value / MAX) * PLOT_HEIGHT) }}
            />
            <span className="text-[9px] text-muted-foreground/60">{w.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-foreground/10 pt-3 text-[11px]">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-2 rounded-sm bg-terracotta" />
          Voor de agent
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-2 rounded-sm bg-emerald-500" />
          Met de agent
        </span>
      </div>
    </div>
  );
}
