"use client";

/** Overview — every number comes from Supabase, nothing hardcoded. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { minutesOf } from "@/lib/public-data";
import {
  Spinner, Badge, A_BORDER, A_INK, A_BODY, A_MUTED, A_MAROON,
} from "@/components/admin/ui";

interface Counts {
  aartis: number | null;
  events: number | null;
  notices: number | null;
  gallery: number | null;
  days: number | null;
}

interface TodayEvent {
  id: number;
  day: number;
  time: string;
  time_end: string | null;
  title: string;
  title_marathi: string;
  category: string;
}

const DAY_STARTS = ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20"];

function festivalDayToday(): number {
  const t = new Date();
  const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  const idx = DAY_STARTS.indexOf(iso);
  return idx >= 0 ? idx + 1 : 0;
}

export default function OverviewSection() {
  const [counts, setCounts] = useState<Counts>({ aartis: null, events: null, notices: null, gallery: null, days: null });
  const [todayEvents, setTodayEvents] = useState<TodayEvent[]>([]);
  const [recent, setRecent] = useState<{ label: string; href: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const today = festivalDayToday();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [a, e, n, g, d] = await Promise.all([
          supabase.from("aartis").select("id", { count: "exact", head: true }),
          supabase.from("schedule_events").select("id", { count: "exact", head: true }).eq("active", true),
          supabase.from("announcements").select("id", { count: "exact", head: true }).eq("active", true),
          supabase.from("gallery_images").select("id", { count: "exact", head: true }).eq("published", true),
          supabase.from("festival_days").select("id", { count: "exact", head: true }).eq("active", true),
        ]);
        const latest = await Promise.all([
          supabase.from("aartis").select("title_devanagari,title").order("created_at", { ascending: false }).limit(2),
          supabase.from("schedule_events").select("title_marathi,title").order("created_at", { ascending: false }).limit(2),
          supabase.from("announcements").select("title").order("created_at", { ascending: false }).limit(2),
        ]);
        let todays: TodayEvent[] = [];
        if (today >= 1 && today <= 7) {
          const { data } = await supabase
            .from("schedule_events")
            .select("id,day,time,time_end,title,title_marathi,category")
            .eq("active", true)
            .eq("day", today)
            .order("sort_order", { ascending: true })
            .order("time", { ascending: true });
          todays = (data || []) as TodayEvent[];
        }
        if (cancelled) return;
        setCounts({
          aartis: a.count ?? null,
          events: e.count ?? null,
          notices: n.count ?? null,
          gallery: g.count ?? null,
          days: d.count ?? null,
        });
        setTodayEvents(todays);
        const items: { label: string; href: string }[] = [];
        for (const r of latest[0].data || []) items.push({ label: `Aarti: ${(r as { title_devanagari: string }).title_devanagari || (r as { title: string }).title}`, href: "/admin/aartis" });
        for (const r of latest[1].data || []) items.push({ label: `Event: ${(r as { title_marathi: string }).title_marathi || (r as { title: string }).title}`, href: "/admin/events" });
        for (const r of latest[2].data || []) items.push({ label: `Notice: ${(r as { title: string }).title}`, href: "/admin/notices" });
        setRecent(items);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [today]);

  if (loading) return <Spinner label="Loading live stats…" />;

  const cards: { label: string; value: number | null; href: string }[] = [
    { label: "Total Aartis", value: counts.aartis, href: "/admin/aartis" },
    { label: "Active Events", value: counts.events, href: "/admin/events" },
    { label: "Active Notices", value: counts.notices, href: "/admin/notices" },
    { label: "Gallery Photos", value: counts.gallery, href: "/admin/gallery" },
    { label: "Festival Days", value: counts.days, href: "/admin/days" },
  ];

  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const sortedToday = [...todayEvents].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
  const upcoming = sortedToday.find((e) => minutesOf(e.time) > nowMin) || null;
  const liveNow = sortedToday.find(
    (e) => e.time_end && nowMin >= minutesOf(e.time) && nowMin <= minutesOf(e.time_end)
  ) || null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg bg-white p-4 text-center transition-shadow hover:shadow"
            style={{ border: `1px solid ${A_BORDER}` }}
          >
            <p className="text-3xl font-bold" style={{ color: A_MAROON }}>
              {c.value === null ? "—" : c.value}
            </p>
            <p className="mt-1 text-[11px] font-medium" style={{ color: A_MUTED }}>
              {c.label}
            </p>
          </Link>
        ))}
      </div>

      {(liveNow || upcoming) && (
        <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
            Happening {today >= 1 ? `(Day ${today})` : ""}
          </p>
          {liveNow && (
            <div className="mb-2 flex items-center gap-2">
              <Badge tone="red">LIVE NOW</Badge>
              <p className="text-sm font-semibold" style={{ color: A_INK }}>
                {liveNow.time} — {liveNow.title_marathi || liveNow.title}
              </p>
            </div>
          )}
          {upcoming && (
            <div className="flex items-center gap-2">
              <Badge tone="amber">NEXT</Badge>
              <p className="text-sm font-semibold" style={{ color: A_INK }}>
                {upcoming.time} — {upcoming.title_marathi || upcoming.title}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
            {today >= 1 ? `Today's schedule — Day ${today}` : "Today's schedule"}
          </p>
          {todayEvents.length === 0 ? (
            <p className="text-xs" style={{ color: A_MUTED }}>
              {today >= 1 ? "No events scheduled for today." : "Festival is not active today."}
            </p>
          ) : (
            <ul className="space-y-2">
              {todayEvents.slice(0, 8).map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium" style={{ color: A_INK }}>
                    {e.title_marathi || e.title}
                  </span>
                  <span className="shrink-0 font-mono" style={{ color: A_MUTED }}>
                    {e.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
            Recently added
          </p>
          {recent.length === 0 ? (
            <p className="text-xs" style={{ color: A_MUTED }}>
              Nothing yet — add your first aarti, event or notice.
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((r, i) => (
                <li key={i}>
                  <Link href={r.href} className="text-xs hover:underline" style={{ color: A_BODY }}>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
