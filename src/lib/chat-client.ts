/**
 * Browser-side client for the Impulso chat agent.
 *
 * The site is a static export on GitHub Pages, so there is no server here: every
 * call goes cross-origin to the backend on jarvis, which answers with CORS for
 * impulsoco.nl and credentials disabled. No key, token or secret is ever present
 * in this bundle — the Gemini key never leaves the server.
 */

export const CHAT_API =
  process.env.NEXT_PUBLIC_CHAT_API ?? "https://app.impulsoco.nl/chat";

const SESSION_KEY = "impulso_chat_session";
const HISTORY_KEY = "impulso_chat_history";
// Highest server-side message id already shown. Persisted, because polling is
// the only thing that advances it otherwise, and a page navigation would reset
// it to 0 and re-fetch the whole conversation as duplicates.
const CURSOR_KEY = "impulso_chat_cursor";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole | "system";
  content: string;
  booking?: boolean;
  /** A confirmed appointment, rendered as a card under the reply. */
  booked?: { when: string; meet: string } | null;
  /** Written by a real person after a takeover, not by the agent. */
  human?: boolean;
  /** Server-side id, so polling knows what it has already shown. */
  id?: number;
};

export type ChatHealth = {
  ok: boolean;
  turnstile: boolean;
  turnstile_sitekey: string | null;
  capped: boolean;
};

export type SendResult = {
  reply: string;
  typing_ms: number;
  suggest_booking: boolean;
  handoff: boolean;
  /** True when a human has taken the conversation over, so no agent reply is
   *  coming and the answer will arrive via polling instead. */
  human?: boolean;
  /** Set only when an appointment was actually written to the calendar. The
   *  server never sets this optimistically, so the widget can state it flatly. */
  booked?: { when: string; meet: string } | null;
  /** Id of the assistant message the server just stored. The widget renders
   *  this reply locally, so it must advance its cursor past it or polling will
   *  hand the same message back and it appears twice. */
  message_id?: number;
  /** The conversation went stale server-side. The widget starts a fresh session
   *  and resends, so the visitor never sees this happen. */
  expired?: boolean;
  error?: string;
};

export type PollResult = {
  messages: Array<{ id: number; role: string; content: string; human: boolean }>;
  human_takeover: boolean;
};

/* ── Local persistence ──────────────────────────────────────────────────────
   Kept in sessionStorage rather than localStorage: a conversation should
   survive a page navigation on the static site (every route change is a fresh
   document load), but it should not still be sitting there in a week. */

export function loadSessionId(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function saveSessionId(id: string) {
  try {
    sessionStorage.setItem(SESSION_KEY, id);
  } catch {
    /* private mode — the chat still works, it just won't survive navigation */
  }
}

export function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
    /* ignore */
  }
}

export function loadCursor(): number {
  try {
    return Number(sessionStorage.getItem(CURSOR_KEY) || 0) || 0;
  } catch {
    return 0;
  }
}

export function saveCursor(id: number) {
  try {
    sessionStorage.setItem(CURSOR_KEY, String(id));
  } catch {
    /* ignore */
  }
}

export function clearChat() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(HISTORY_KEY);
    sessionStorage.removeItem(CURSOR_KEY);
  } catch {
    /* ignore */
  }
}

/* ── Turnstile ──────────────────────────────────────────────────────────────
   The site key comes from /health rather than a build-time env var, so it can
   be switched on later without rebuilding and redeploying the static site. */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
let turnstileLoading: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileLoading) return turnstileLoading;
  turnstileLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${TURNSTILE_SRC}?render=explicit`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile script failed"));
    document.head.appendChild(s);
  });
  return turnstileLoading;
}

/** Runs an invisible Turnstile challenge and resolves with the token. Resolves
 *  with null on any failure — the server decides what to do about a missing
 *  token, the widget should not be the one enforcing policy. */
async function getTurnstileToken(siteKey: string): Promise<string | null> {
  try {
    await loadTurnstileScript();
    if (!window.turnstile) return null;
    return await new Promise<string | null>((resolve) => {
      const holder = document.createElement("div");
      holder.style.display = "none";
      document.body.appendChild(holder);
      const done = (token: string | null) => {
        resolve(token);
        setTimeout(() => holder.remove(), 0);
      };
      const timer = setTimeout(() => done(null), 12000);
      window.turnstile!.render(holder, {
        sitekey: siteKey,
        size: "invisible",
        callback: (token: string) => {
          clearTimeout(timer);
          done(token);
        },
        "error-callback": () => {
          clearTimeout(timer);
          done(null);
        },
      });
    });
  } catch {
    return null;
  }
}

/* ── API ────────────────────────────────────────────────────────────────── */

let healthPromise: Promise<ChatHealth | null> | null = null;

export async function fetchHealth(): Promise<ChatHealth | null> {
  // Deduped, not cached-forever: warmUp() fires this on page load so the answer
  // is already in hand by the time someone opens the widget, which is the
  // slowest hop out of the boot sequence.
  if (healthPromise) return healthPromise;
  healthPromise = (async () => {
    try {
      const r = await fetch(`${CHAT_API}/health`, { cache: "no-store" });
      if (!r.ok) return null;
      return (await r.json()) as ChatHealth;
    } catch {
      return null;
    }
  })();
  const h = await healthPromise;
  // A failed probe must not stick, or the widget is dead until a reload.
  if (!h) healthPromise = null;
  return h;
}

/** Do the waiting before the visitor asks for anything.
 *
 *  Opening the chat used to run four things back to back: health, download
 *  Turnstile, solve Turnstile, create the session. Health and the script are
 *  the same for every visitor and cost nothing to do early, so they happen on
 *  page load instead. What is deliberately NOT done here is minting a token —
 *  those are single-use and expire in five minutes, so a pre-minted one would
 *  just be stale for anyone who reads the page before clicking. */
export function warmUp(): void {
  if (typeof window === "undefined") return;
  void fetchHealth();
  void loadTurnstileScript().catch(() => {});
}

export async function startSession(
  page: string,
  language: string,
  health: ChatHealth | null,
): Promise<{
  session_id: string;
  greeting: string;
  typing_ms: number;
  greeting_id: number;
} | null> {
  let token: string | null = null;
  if (health?.turnstile && health.turnstile_sitekey) {
    token = await getTurnstileToken(health.turnstile_sitekey);
  }
  try {
    const r = await fetch(`${CHAT_API}/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        language,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        turnstile_token: token,
      }),
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

/** New assistant/system messages since `after`. Cheap by design: one indexed
 *  query, no model call. This is how a human's reply reaches the visitor after
 *  a takeover, since nobody is waiting on an HTTP response at that point. */
export async function pollMessages(
  sessionId: string,
  after: number,
): Promise<PollResult | null> {
  try {
    const r = await fetch(
      `${CHAT_API}/poll?session_id=${encodeURIComponent(sessionId)}&after=${after}`,
      { cache: "no-store" },
    );
    if (!r.ok) return null;
    return (await r.json()) as PollResult;
  } catch {
    return null;
  }
}

export async function sendMessage(
  sessionId: string,
  message: string,
  page: string,
): Promise<SendResult> {
  try {
    const r = await fetch(`${CHAT_API}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message, page }),
    });
    const data = await r.json();
    // A blocked request still carries a human-readable `reply`, so a rate limit
    // reads as the agent saying something rather than as a broken widget.
    return {
      // During a human takeover the server returns an empty reply on purpose:
      // the answer arrives later through pollMessages(), not in this response.
      reply: data.human
        ? ""
        : data.reply || "Sorry, dat ging even mis. Probeer het zo nog eens.",
      typing_ms: data.typing_ms ?? 700,
      suggest_booking: Boolean(data.suggest_booking),
      handoff: Boolean(data.handoff),
      human: Boolean(data.human),
      booked: data.booked ?? null,
      message_id: Number(data.message_id || 0),
      expired: Boolean(data.expired),
      error: r.ok ? undefined : data.error || "http_error",
    };
  } catch {
    return {
      reply:
        "Ik kan er even niet bij. Plan gerust direct een gesprek in, of mail ons op info@impulsoco.nl.",
      typing_ms: 700,
      suggest_booking: true,
      handoff: false,
      booked: null,
      error: "network",
    };
  }
}
