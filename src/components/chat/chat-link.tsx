"use client";

import { requestChatOpen } from "@/lib/floating-ui";

/**
 * Opens the chat agent from anywhere in the page.
 *
 * Exists because the contact lines used to be `tel:` links to a private mobile,
 * and prospects should reach the company rather than someone's phone. The chat
 * is the front door now, so these read as an invitation rather than a dead end.
 *
 * A <button>, not an <a>: there is no URL behind it, and a link that goes
 * nowhere is a screen-reader trap.
 */
export default function ChatLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={requestChatOpen} className={className}>
      {children}
    </button>
  );
}
