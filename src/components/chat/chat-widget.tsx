"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MessageCircle, X, Send, CalendarCheck, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  getFloatingServerState,
  getFloatingState,
  setChatOpen,
  subscribeFloating,
} from "@/lib/floating-ui";
import {
  clearChat,
  fetchHealth,
  loadCursor,
  loadHistory,
  loadSessionId,
  pollMessages,
  saveCursor,
  saveHistory,
  saveSessionId,
  sendMessage,
  startSession,
  type ChatHealth,
  type ChatMessage,
} from "@/lib/chat-client";

const CALENDLY = "https://calendly.com/omar-impulsoco/30min";

/**
 * Floating chat agent.
 *
 * Deliberately not streaming. Flash Lite answers in about a second, and a
 * typewriter effect is the most recognisable "this is a bot" tell there is. The
 * server returns a `typing_ms` derived from the reply length and the widget
 * shows a typing indicator for exactly that long, which reads as a person.
 */
export default function ChatWidget() {
  const { language } = useLanguage();
  const isNL = language !== "en";

  const floating = useSyncExternalStore(
    subscribeFloating,
    getFloatingState,
    getFloatingServerState,
  );

  const [open, setOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [health, setHealth] = useState<ChatHealth | null>(null);
  const [nudge, setNudge] = useState(false);
  const [humanMode, setHumanMode] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<string | null>(null);
  // Highest server-side message id already shown, so polling never duplicates.
  const lastSeenRef = useRef(0);

  const page = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    setChatOpen(open);
  }, [open]);

  // Something elsewhere on the page asked us to open (the contact lines that
  // used to be phone numbers). Skips the initial 0 so the panel does not spring
  // open on first paint.
  const openRequest = floating.openRequest;
  useEffect(() => {
    if (openRequest === 0) return;
    setNudge(false);
    setOpen(true);
    boot();
    setTimeout(() => inputRef.current?.focus(), 260);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest]);

  // Restore an in-progress conversation across page navigations. Every route
  // change on a static export is a full document load, so without this the
  // agent forgets you the moment you click a link.
  useEffect(() => {
    const existing = loadSessionId();
    const history = loadHistory();
    if (existing && history.length) {
      sessionRef.current = existing;
      setMessages(history);
      lastSeenRef.current = loadCursor();
    }
  }, []);

  // One gentle nudge per browser session, and only if the visitor has not
  // already talked to us. Anything more insistent than this is a pop-up.
  useEffect(() => {
    if (loadSessionId()) return;
    const seen = sessionStorage.getItem("impulso_chat_nudged");
    if (seen) return;
    const t = setTimeout(() => {
      setNudge(true);
      sessionStorage.setItem("impulso_chat_nudged", "1");
    }, 14000);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = useCallback(() => {
    requestAnimationFrame(() => {
      const el = threadRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (open) scrollDown();
  }, [open, messages, typing, scrollDown]);

  // Poll for anything the server has that we don't, but only while the panel is
  // actually open and the tab is in the foreground. This is what delivers a
  // human's reply after a takeover: at that point nobody is waiting on an HTTP
  // response, so without polling the visitor would never see it.
  useEffect(() => {
    if (!open) return;
    const tick = async () => {
      const sid = sessionRef.current;
      if (!sid || document.hidden) return;
      const res = await pollMessages(sid, lastSeenRef.current);
      if (!res) return;
      setHumanMode(res.human_takeover);
      if (!res.messages.length) return;
      lastSeenRef.current = res.messages[res.messages.length - 1].id;
      saveCursor(lastSeenRef.current);
      setMessages((prev) => {
        const next: ChatMessage[] = [
          ...prev,
          ...res.messages.map((m) => ({
            role: m.role === "system" ? ("system" as const) : ("assistant" as const),
            content: m.content,
            human: m.human,
            id: m.id,
          })),
        ];
        saveHistory(next);
        return next;
      });
      setTyping(false);
    };
    const timer = setInterval(tick, humanMode ? 4000 : 9000);
    return () => clearInterval(timer);
  }, [open, humanMode]);

  async function boot() {
    if (sessionRef.current || booting) return;
    setBooting(true);
    const h = await fetchHealth();
    setHealth(h);

    if (h && h.capped) {
      setMessages([
        {
          role: "assistant",
          content: isNL
            ? "De chat is vandaag even niet beschikbaar. Plan gerust een gesprek in, of mail ons op info@impulsoco.nl."
            : "The chat is unavailable for today. Feel free to book a call, or email us at info@impulsoco.nl.",
          booking: true,
        },
      ]);
      setBooting(false);
      return;
    }

    setTyping(true);
    const started = await startSession(page, isNL ? "nl" : "en", h);
    if (!started) {
      setTyping(false);
      setBooting(false);
      // Backend unreachable. The visitor still gets a way through, which is the
      // whole point of keeping Calendly as the fallback.
      setMessages([
        {
          role: "assistant",
          content: isNL
            ? "Ik kan er even niet bij. Plan gerust direct een gesprek in, of mail ons op info@impulsoco.nl."
            : "I can't connect right now. Feel free to book a call directly, or email us at info@impulsoco.nl.",
          booking: true,
        },
      ]);
      return;
    }
    sessionRef.current = started.session_id;
    saveSessionId(started.session_id);
    lastSeenRef.current = started.greeting_id || 0;
    saveCursor(lastSeenRef.current);
    setTimeout(() => {
      setTyping(false);
      const first: ChatMessage[] = [{ role: "assistant", content: started.greeting }];
      setMessages(first);
      saveHistory(first);
      setBooting(false);
    }, Math.min(started.typing_ms, 1200));
  }

  function toggle() {
    setNudge(false);
    setOpen((was) => {
      const next = !was;
      if (next) {
        boot();
        setTimeout(() => inputRef.current?.focus(), 260);
      }
      return next;
    });
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    if (!sessionRef.current) {
      await boot();
      if (!sessionRef.current) return;
    }

    const withUser: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(withUser);
    saveHistory(withUser);
    setInput("");
    setTyping(true);

    let res = await sendMessage(sessionRef.current, text, page);
    // Advance the cursor the moment the reply lands, not after the typing
    // delay: a poll firing inside that window would otherwise hand the same
    // message back and it would render twice.
    if (res.message_id) {
      lastSeenRef.current = Math.max(lastSeenRef.current, res.message_id);
      saveCursor(lastSeenRef.current);
    }

    // The conversation went stale (20 min idle). Start a clean one and resend
    // once, so the visitor's message is never dropped and they never see an
    // error for something that is purely our bookkeeping.
    if (res.expired) {
      clearChat();
      sessionRef.current = null;
      lastSeenRef.current = 0;
      const started = await startSession(page, isNL ? "nl" : "en", health);
      if (started) {
        sessionRef.current = started.session_id;
        saveSessionId(started.session_id);
        lastSeenRef.current = started.greeting_id || 0;
        res = await sendMessage(started.session_id, text, page);
        if (res.message_id) lastSeenRef.current = Math.max(lastSeenRef.current, res.message_id);
        saveCursor(lastSeenRef.current);
      }
    }

    // A human has the conversation: no agent reply is coming, and appending an
    // empty bubble would look broken. The real answer arrives via polling.
    if (res.human) {
      setHumanMode(true);
      setTyping(false);
      return;
    }

    // Hold the indicator for the server-suggested duration minus whatever the
    // request already took, so a fast reply still feels considered.
    setTimeout(() => {
      setTyping(false);
      const next: ChatMessage[] = [
        ...withUser,
        {
          role: "assistant",
          // Any error at all shows the booking card. A rate limit, an outage or
          // a model hiccup is not the visitor's problem, and they should never
          // be left with a dead end instead of a way to reach us.
          booking: res.suggest_booking || Boolean(res.error),
          content: res.reply,
          booked: res.booked,
        },
      ];
      setMessages(next);
      saveHistory(next);
    }, Math.max(250, Math.min(res.typing_ms, 1800)));
  }

  function restart() {
    clearChat();
    sessionRef.current = null;
    setMessages([]);
    setTyping(false);
    boot();
  }

  // The bubble lifts above the sticky "Plan gratis intake" CTA on mobile, where
  // that CTA is centred at the bottom. On desktop the CTA moves aside instead.
  const bubbleBottom = floating.stickyCtaVisible ? "bottom-24 sm:bottom-6" : "bottom-4 sm:bottom-6";

  return (
    <>
      {/* Bubble */}
      <div className={`fixed right-4 sm:right-6 z-[60] transition-all duration-300 ${bubbleBottom} ${open ? "pointer-events-none scale-90 opacity-0 sm:pointer-events-auto sm:scale-100 sm:opacity-100" : ""}`}>
        {nudge && !open && (
          <button
            onClick={toggle}
            className="absolute bottom-full right-0 mb-3 w-max max-w-[240px] rounded-2xl rounded-br-sm bg-card border border-foreground/15 px-3.5 py-2.5 text-left shadow-xl animate-in fade-in slide-in-from-bottom-2"
          >
            <span className="block text-[13px] font-semibold text-foreground">
              {isNL ? "Vragen? Ik help je graag." : "Questions? Happy to help."}
            </span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              {isNL ? "Meestal binnen een paar seconden antwoord" : "Usually replies in seconds"}
            </span>
          </button>
        )}
        <button
          onClick={toggle}
          aria-label={open ? (isNL ? "Chat sluiten" : "Close chat") : (isNL ? "Chat openen" : "Open chat")}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!open && (
            <span className="absolute right-0 top-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
            </span>
          )}
        </button>
      </div>

      {/* Panel */}
      {/* Panel: full-screen sheet on mobile. On desktop it sits ABOVE the
          bubble rather than on top of it, so the bubble stays visible and
          doubles as the close button, the way every chat widget people already
          know behaves. */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-card sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-foreground/15 sm:shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 bg-terracotta px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/95 text-[12px] font-bold text-terracotta">
              IC
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[14px] font-semibold text-white">Sam · Impulso Co.</div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {isNL ? "AI-assistent · nu online" : "AI assistant · online now"}
              </div>
            </div>
            <button
              onClick={restart}
              aria-label={isNL ? "Opnieuw beginnen" : "Start over"}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={toggle}
              aria-label={isNL ? "Sluiten" : "Close"}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Thread */}
          <div ref={threadRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3 surface-warm">
            {messages.map((m, i) => (
              <div key={m.id ?? `local-${i}`}>
                {m.role === "system" ? (
                  <div className="flex justify-center py-1">
                    <span className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] text-muted-foreground">
                      {m.content}
                    </span>
                  </div>
                ) : (
                  <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug shadow-sm ${
                        m.role === "user"
                          ? "rounded-br-sm bg-terracotta text-white"
                          : "rounded-bl-sm border border-foreground/10 bg-card text-foreground"
                      }`}
                    >
                      {m.human && (
                        <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-terracotta">
                          {isNL ? "Van het team" : "From the team"}
                        </span>
                      )}
                      {/* Rendered as a text node, never as HTML: the content on
                          this line came out of a language model. */}
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                )}

                {m.booked && (
                  <div className="mt-2 overflow-hidden rounded-xl border border-emerald-500/30 bg-card shadow-sm">
                    <div className="flex items-center gap-2 bg-emerald-600 px-3 py-1.5">
                      <CalendarCheck className="h-3.5 w-3.5 text-white" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
                        {isNL ? "Afspraak bevestigd" : "Appointment confirmed"}
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <div className="text-[13px] font-bold text-foreground">{m.booked.when}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {isNL
                          ? "30 min · de uitnodiging staat in je mail"
                          : "30 min · the invite is in your inbox"}
                      </div>
                      {m.booked.meet && (
                        <a
                          href={m.booked.meet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-block text-[11px] font-semibold text-terracotta hover:underline"
                        >
                          {isNL ? "Videogesprek openen" : "Open video call"}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {m.booking && !m.booked && (
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-3 rounded-xl border border-terracotta/30 bg-card px-3.5 py-2.5 shadow-sm transition-colors hover:border-terracotta"
                  >
                    <CalendarCheck className="h-5 w-5 shrink-0 text-terracotta" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-foreground">
                        {isNL ? "Plan een gratis intake" : "Book a free intake"}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {isNL ? "30 min · vrijblijvend · geen verkooppraat" : "30 min · no obligation"}
                      </span>
                    </span>
                  </a>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-foreground/10 bg-card px-3.5 py-3 shadow-sm">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={submit} className="flex items-center gap-2 border-t border-foreground/10 bg-card px-3 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder={isNL ? "Typ een bericht…" : "Type a message…"}
              className="min-w-0 flex-1 bg-transparent px-1 text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={isNL ? "Versturen" : "Send"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="bg-card px-4 pb-2 text-center text-[10px] text-muted-foreground/70">
            {isNL
              ? "Je praat met een AI-assistent. Gesprekken worden bewaard om je beter te helpen."
              : "You're talking to an AI assistant. Conversations are stored to help you better."}
          </p>
        </div>
      )}
    </>
  );
}
