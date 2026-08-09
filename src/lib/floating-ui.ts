/**
 * Shared state for the things that float in the bottom-right corner.
 *
 * There are two of them — the "Plan gratis intake" CTA on the diensten pages and
 * the chat bubble on every page — and they both wanted the same 56 pixels. Rather
 * than hard-code offsets in each component and hope nobody adds a third, they
 * publish their state here and read each other's.
 *
 * Rules this encodes:
 *   - the chat bubble owns the corner
 *   - on mobile the sticky CTA is centred, so the bubble lifts above it
 *   - while the chat panel is open, the CTA gets out of the way entirely
 */

type FloatingState = {
  stickyCtaVisible: boolean;
  chatOpen: boolean;
  /** Bumped by anything asking the widget to open. A counter rather than a
   *  boolean so a second request while the panel is already open still
   *  registers, and so there is no flag left set that has to be cleared. */
  openRequest: number;
};

let state: FloatingState = { stickyCtaVisible: false, chatOpen: false, openRequest: 0 };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function subscribeFloating(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getFloatingState() {
  return state;
}

/** Server snapshot for useSyncExternalStore. Must be a stable reference, or
 *  React re-renders forever during hydration. */
const SERVER_STATE: FloatingState = {
  stickyCtaVisible: false,
  chatOpen: false,
  openRequest: 0,
};
export function getFloatingServerState() {
  return SERVER_STATE;
}

/** Open the chat panel from anywhere on the page. Used by the contact lines
 *  that used to be phone numbers. */
export function requestChatOpen() {
  state = { ...state, openRequest: state.openRequest + 1 };
  emit();
}

export function setStickyCtaVisible(visible: boolean) {
  if (state.stickyCtaVisible === visible) return;
  state = { ...state, stickyCtaVisible: visible };
  emit();
}

export function setChatOpen(open: boolean) {
  if (state.chatOpen === open) return;
  state = { ...state, chatOpen: open };
  emit();
}
