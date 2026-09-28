"use client";

import { Fragment, useEffect, useState } from "react";

const ROTATE_MS = 4000;

/** Desktop shows every message; mobile rotates through them one at a time. */
export function AnnouncementBar({ messages }: { messages: string[] }) {
  // Start with the shortest message so it fits the narrow mobile bar.
  const [active, setActive] = useState(() =>
    messages.reduce((best, m, i) => (m.length < messages[best].length ? i : best), 0),
  );

  useEffect(() => {
    if (messages.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % messages.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [messages.length]);

  if (!messages.length) return null;

  return (
    <aside
      aria-label="Store announcements"
      className="bg-cream font-ui text-[11px] leading-tight tracking-[0.08em] text-announce"
    >
      <p className="container-page hidden h-9 items-center justify-center gap-[1.1em] text-center lg:flex">
        {messages.map((message, i) => (
          <Fragment key={message}>
            {i > 0 && <span aria-hidden="true">|</span>}
            <span>{message}</span>
          </Fragment>
        ))}
      </p>
      <p
        aria-live="polite"
        className="flex min-h-9 items-center justify-center px-4 py-1 text-center lg:hidden"
      >
        <span key={active} className="animate-[fade-in_400ms_ease-out]">
          {messages[active]}
        </span>
      </p>
    </aside>
  );
}
