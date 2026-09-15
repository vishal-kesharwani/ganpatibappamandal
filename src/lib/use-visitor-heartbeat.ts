"use client";

/**
 * Sends heartbeat pings every 30s so the admin can see live visitor count.
 * Call useVisitorHeartbeat() in any public page layout or component.
 */
import { useEffect, useRef } from "react";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("visitor_session");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("visitor_session", id);
  }
  return id;
}

export function useVisitorHeartbeat(page: string = "/") {
  const sessionId = useRef<string>("");

  useEffect(() => {
    sessionId.current = getSessionId();
    if (!sessionId.current) return;

    const ping = async () => {
      try {
        await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId.current, page }),
          keepalive: true,
        });
      } catch {
        // silent fail — visitor tracking is best-effort
      }
    };

    // Initial ping
    ping();

    // Ping every 30 seconds
    const interval = setInterval(ping, 30_000);

    return () => clearInterval(interval);
  }, [page]);
}
