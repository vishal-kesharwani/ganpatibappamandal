"use client";

/**
 * Sends visitor heartbeat pings. Drop into any public layout/page.
 */
import { useVisitorHeartbeat } from "@/lib/use-visitor-heartbeat";
import { usePathname } from "next/navigation";

export default function VisitorHeartbeat() {
  const pathname = usePathname();
  useVisitorHeartbeat(pathname);
  return null;
}
