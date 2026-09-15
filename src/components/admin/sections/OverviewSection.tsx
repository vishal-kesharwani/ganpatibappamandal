"use client";

/** Overview — premium dashboard with live Supabase stats. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { minutesOf } from "@/lib/public-data";
import {
  Spinner, Badge, SectionHeader,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_MAROON,
  A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";
import { toMarathiDigits } from "@/components/admin/AdminShell";

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

const FALLBACK_DAY_STARTS = ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20"];

async function festivalDayToday(): Promise<number> {
  let starts = FALLBACK_DAY_STARTS;
  try {
    const { data } = await supabase
      .from("festival_days")
      .select("date,day_number")
      .eq("active", true)
      .order("day_number", { ascending: true });
    if (data && data.length > 0) {
      starts = (data as { date: string; day_number: number }[])
        .slice()
        .sort((a, b) => a.day_number - b.day_number)
        .map((d) => d.date);
    }
  } catch {
    starts = FALLBACK_DAY_STARTS;
  }
  const t = new Date();
  const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  return starts.indexOf(iso) >= 0 ? starts.indexOf(iso) + 1 : 0;
}

export default function OverviewSection() {
  const [counts, setCounts] = useState<Counts>({ aartis: null, events: null, notices: null, gallery: null, days: null });
  const [todayEvents, setTodayEvents] = useState<TodayEvent[]>([]);
  const [recent, setRecent] = useState<{ label: string; href: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [visitorPages, setVisitorPages] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const todayNum = await festivalDayToday();
        if (cancelled) return;
        setToday(todayNum);
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
        if (todayNum >= 1 && todayNum <= 7) {
          const { data } = await supabase
            .from("schedule_events")
            .select("id,day,time,time_end,title,title_marathi,category")
            .eq("active", true)
            .eq("day", todayNum)
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
    return () => { cancelled = true; };
  }, []);

  // Live visitor count — refreshes every 15 seconds
  useEffect(() => {
    let cancelled = false;
    const fetchVisitors = async () => {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        if (!cancelled) {
          setVisitors(data.count || 0);
          setVisitorPages(data.pages || {});
        }
      } catch { /* silent */ }
    };
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 15_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (loading) return <Spinner label="Loading dashboard…" />;

  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const sortedToday = [...todayEvents].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
  const upcoming = sortedToday.find((e) => minutesOf(e.time) > nowMin) || null;
  const liveNow = sortedToday.find(
    (e) => e.time_end && nowMin >= minutesOf(e.time) && nowMin <= minutesOf(e.time_end)
  ) || null;

  const mandalYear = new Date().getFullYear() - 2014 + 1;

  const quickActions = [
    { label: "Add Event", href: "/admin/events", icon: "🎯" },
    { label: "Add Aarti", href: "/admin/aartis", icon: "🪔" },
    { label: "Add Notice", href: "/admin/notices", icon: "📢" },
    { label: "Add Photo", href: "/admin/gallery", icon: "🖼" },
  ];

  const statCards = [
    { label: "Aartis", value: counts.aartis, href: "/admin/aartis", icon: "🪔" },
    { label: "Events", value: counts.events, href: "/admin/events", icon: "🎯" },
    { label: "Notices", value: counts.notices, href: "/admin/notices", icon: "📢" },
    { label: "Photos", value: counts.gallery, href: "/admin/gallery", icon: "🖼" },
    { label: "Days", value: counts.days, href: "/admin/days", icon: "📅" },
  ];

  return (
    <div className="space-y-5">
      <SectionHeader
        title={`Welcome back 👋`}
        description={today >= 1 ? `Festival Day ${today} of 7` : "Festival not active today"}
      />

      {/* Live Visitors KPI */}
      <div
        className="overflow-hidden rounded-2xl p-5"
        style={{
          background: visitors > 0
            ? "linear-gradient(135deg, #047857 0%, #065F46 100%)"
            : "linear-gradient(135deg, #44403C 0%, #292524 100%)",
          boxShadow: visitors > 0
            ? "0 4px 20px rgba(4,120,87,0.3)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
              Live Visitors
            </p>
            <p className="mt-1 text-4xl font-bold text-white tabular-nums">
              {visitors}
            </p>
            <p className="mt-0.5 text-[12px] text-white/50">
              {visitors === 0 ? "No one online right now" : visitors === 1 ? "person viewing" : "people viewing"}
            </p>
          </div>
          <div className="text-5xl">
            {visitors > 0 ? "👁" : "😴"}
          </div>
        </div>
        {Object.keys(visitorPages).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.entries(visitorPages).map(([page, count]) => (
              <span
                key={page}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
              >
                {page} · {count}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Year banner */}
      <div
        className="overflow-hidden rounded-2xl p-5 text-center"
        style={{
          background: "linear-gradient(135deg, #1A1410 0%, #2A1510 50%, #1A1410 100%)",
          boxShadow: "0 4px 20px rgba(26,20,16,0.3)",
        }}
      >
        <p className="font-gotu text-xl font-bold" style={{ color: "#FFF8EE" }}>
          🪔 {toMarathiDigits(mandalYear)}वे वर्ष · {mandalYear}th Year
        </p>
        <p className="mt-1 text-[12px]" style={{ color: "#D6A77A" }}>
          OM SAI MITRA MANDAL · Est. 2014 · Kaneri, Bhiwandi
        </p>
      </div>

      {/* Live status */}
      {(liveNow || upcoming || today >= 1) && (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: A_MUTED }}>
            {today >= 1 ? `Today — Day ${today}` : "Schedule"}
          </p>
          {liveNow ? (
            <div className="flex items-center gap-3">
              <Badge tone="red">LIVE NOW</Badge>
              <p className="text-[14px] font-semibold" style={{ color: A_INK }}>
                {liveNow.time} — {liveNow.title_marathi || liveNow.title}
              </p>
            </div>
          ) : upcoming ? (
            <div className="flex items-center gap-3">
              <Badge tone="amber">NEXT</Badge>
              <p className="text-[14px] font-semibold" style={{ color: A_INK }}>
                {upcoming.time} — {upcoming.title_marathi || upcoming.title}
              </p>
            </div>
          ) : (
            <p className="text-[13px]" style={{ color: A_MUTED }}>No more events today.</p>
          )}
        </div>
      )}

      {/* Quick actions */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: A_MUTED }}>
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-2 rounded-xl p-3 text-[13px] font-medium transition-all duration-150 active:scale-[0.98]"
              style={{
                backgroundColor: A_SURFACE,
                border: `1px solid ${A_BORDER}`,
                color: A_INK,
                boxShadow: A_SHADOW_SM,
              }}
            >
              <span className="text-[16px]">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: A_MUTED }}>
          Content
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {statCards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-xl p-4 text-center transition-all duration-150 active:scale-[0.98]"
              style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
            >
              <span className="text-[18px]">{c.icon}</span>
              <p className="mt-1 text-2xl font-bold tracking-tight" style={{ color: A_MAROON }}>
                {c.value === null ? "—" : c.value}
              </p>
              <p className="mt-0.5 text-[11px] font-medium" style={{ color: A_MUTED }}>{c.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Schedule + Recent */}
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="overflow-hidden rounded-2xl"
          style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
        >
          <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: A_MUTED }}>
              {today >= 1 ? `Today — Day ${today}` : "Today's schedule"}
            </p>
          </div>
          <div className="p-5">
            {todayEvents.length === 0 ? (
              <p className="text-[13px]" style={{ color: A_MUTED }}>
                {today >= 1 ? "No events scheduled for today." : "Festival is not active today."}
              </p>
            ) : (
              <ul className="space-y-2">
                {todayEvents.slice(0, 8).map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-stone-50">
                    <span className="text-[13px] font-medium" style={{ color: A_INK }}>
                      {e.title_marathi || e.title}
                    </span>
                    <span className="shrink-0 rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: A_BODY }}>
                      {e.time}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className="overflow-hidden rounded-2xl"
          style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
        >
          <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: A_MUTED }}>
              Recently added
            </p>
          </div>
          <div className="p-5">
            {recent.length === 0 ? (
              <p className="text-[13px]" style={{ color: A_MUTED }}>
                Nothing yet — add your first aarti, event or notice.
              </p>
            ) : (
              <ul className="space-y-2">
                {recent.map((r, i) => (
                  <li key={i}>
                    <Link
                      href={r.href}
                      className="block rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-stone-50 hover:underline"
                      style={{ color: A_BODY }}
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
