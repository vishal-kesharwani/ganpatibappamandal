"use client";

/**
 * Database-first public data layer with static fallbacks.
 * Every fetcher returns { items/data..., live: boolean }.
 * live === true  → database is the source of truth (even if empty).
 * live === false → migration not run / network failed → use static fallback.
 */
import { useEffect, useState } from "react";
import { DAILY_SCHEDULES, type ScheduleEvent as StaticEvent } from "@/data/schedule";
import { ANNOUNCEMENTS, type Announcement as StaticAnnouncement } from "@/data/announcements";
import { FESTIVAL_DAYS, FESTIVAL_CONFIG, type FestivalDay } from "@/data/festival";
import { CONTACTS, MANDAL_INFO, VISARJAN_INFO, type Contact } from "@/data/info";
import { CATEGORY_LABELS } from "@/lib/aarti-meta";

export interface DbEvent {
  id: number | string;
  day: number;
  time: string;
  timeEnd?: string;
  title: string;
  titleMarathi: string;
  category: string;
  description?: string;
  location?: string;
  aartiSlug?: string | null;
}

export interface DbAnnouncement {
  id: number | string;
  title: string;
  titleMarathi: string;
  description: string;
  descriptionMarathi: string;
  priority: "important" | "event" | "general";
  date: string;
  active: boolean;
}

export interface DbDay {
  day: number;
  date: string;
  title: string;
  description?: string;
  theme?: string | null;
  dateMarathi: string;
  dayOfWeek: string;
  dayOfWeekMarathi: string;
}

export interface DbGalleryItem {
  id: number | string;
  src: string;
  alt: string;
  category: string;
}

export interface DbSite {
  mandalName: string;
  location: string;
  address: string;
  instagram: string;
  mapUrl: string;
  upiId: string;
  about: string;
  mission: string;
  establishedYear: number;
  contacts: Contact[];
  visarjan: {
    date: string;
    dateMarathi: string;
    time: string;
    processionStart: string;
    meetingPoint: string;
    route: string[];
    instructions: string[];
    status: string;
    notes?: string;
  };
  live: { settings: boolean; contacts: boolean; visarjan: boolean };
}

// ---------- static fallbacks ----------

export function staticEvents(): DbEvent[] {
  return DAILY_SCHEDULES.flatMap((d) =>
    d.events.map((e: StaticEvent) => ({
      id: e.id,
      day: d.day,
      time: e.time,
      timeEnd: e.timeEnd,
      title: e.title,
      titleMarathi: e.titleMarathi,
      category: e.category,
      description: e.description,
      location: e.location,
      aartiSlug: null,
    }))
  );
}

export function staticAnnouncements(): DbAnnouncement[] {
  return ANNOUNCEMENTS.map((a: StaticAnnouncement) => ({ ...a }));
}

export function staticDays(): DbDay[] {
  return FESTIVAL_DAYS.map((d: FestivalDay) => ({
    day: d.day,
    date: d.date,
    title: d.specialEvent || `Day ${d.day}`,
    description: d.description,
    theme: d.theme ?? null,
    dateMarathi: d.dateMarathi,
    dayOfWeek: d.dayOfWeek,
    dayOfWeekMarathi: d.dayOfWeekMarathi,
  }));
}

export function staticGallery(): DbGalleryItem[] {
  return [
    { id: "0", src: "/ganpati-with-mandal-name.jpeg", alt: "Ganpati with Mandal Name", category: "ganpati" },
    { id: "1", src: "/ganpati-hero.png", alt: "Ganpati Bappa", category: "ganpati" },
    { id: "2", src: "/mandal-logo.png", alt: "Mandal Logo", category: "mandal" },
    { id: "3", src: "/mandal-name.png", alt: "Mandal Name", category: "events" },
    { id: "4", src: "/ganpati-hero.png", alt: "Ganpati Decoration", category: "festival" },
    { id: "5", src: "/ganpati-hero.png", alt: "Aarti Time", category: "aarti" },
    { id: "6", src: "/ganpati-hero.png", alt: "Cultural Program", category: "events" },
  ];
}

export function staticSite(): DbSite {
  return {
    mandalName: MANDAL_INFO.name,
    location: MANDAL_INFO.location,
    address: MANDAL_INFO.address,
    instagram: FESTIVAL_CONFIG.instagram,
    mapUrl: FESTIVAL_CONFIG.mapUrl,
    upiId: FESTIVAL_CONFIG.upiId,
    about: MANDAL_INFO.about,
    mission: MANDAL_INFO.mission,
    establishedYear: MANDAL_INFO.establishedYear,
    contacts: CONTACTS,
    visarjan: {
      date: VISARJAN_INFO.date,
      dateMarathi: VISARJAN_INFO.dateMarathi,
      time: VISARJAN_INFO.time,
      processionStart: VISARJAN_INFO.processionStart,
      meetingPoint: VISARJAN_INFO.meetingPoint,
      route: VISARJAN_INFO.route,
      instructions: VISARJAN_INFO.instructions,
      status: "scheduled",
    },
    live: { settings: false, contacts: false, visarjan: false },
  };
}

// ---------- generic hook ----------

function useLive<T>(key: string, fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [live, setLive] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { data, live, setLive };
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useLiveEvents() {
  const fallback = staticEvents();
  const [data, setData] = useState<DbEvent[]>(fallback);
  const [live, setLive] = useState(false);
  useEffect(() => {
    let cancelled = false;
    getJson<{ items: DbEvent[]; live: boolean }>("/api/events")
      .then((j) => {
        if (cancelled) return;
        if (j.live) {
          setData(j.items);
          setLive(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return { events: data, live };
}

export function useLiveAnnouncements() {
  return useLive<DbAnnouncement[]>(
    "announcements",
    async () => {
      const j = await getJson<{ items: DbAnnouncement[]; live: boolean }>("/api/announcements");
      return j.live ? j.items : staticAnnouncements();
    },
    staticAnnouncements()
  );
}

export function useLiveDays() {
  return useLive<DbDay[]>(
    "days",
    async () => {
      const j = await getJson<{ items: DbDay[]; live: boolean }>("/api/days");
      return j.live && j.items.length > 0 ? j.items : staticDays();
    },
    staticDays()
  );
}

export function useLiveGallery() {
  return useLive<DbGalleryItem[]>(
    "gallery",
    async () => {
      const j = await getJson<{ items: DbGalleryItem[]; live: boolean }>("/api/gallery");
      return j.live && j.items.length > 0 ? j.items : staticGallery();
    },
    staticGallery()
  );
}

export function useLiveSite() {
  return useLive<DbSite>(
    "site",
    async () => {
      const j = await getJson<DbSite>("/api/site");
      const fb = staticSite();
      return {
        mandalName: j.mandalName || fb.mandalName,
        location: j.location || fb.location,
        address: j.address || fb.address,
        instagram: j.instagram || fb.instagram,
        mapUrl: j.mapUrl || fb.mapUrl,
        upiId: j.upiId || fb.upiId,
        about: j.about || fb.about,
        mission: j.mission || fb.mission,
        establishedYear: j.establishedYear || fb.establishedYear,
        contacts: j.live.contacts && j.contacts.length > 0 ? j.contacts : fb.contacts,
        visarjan: j.live.visarjan ? j.visarjan : fb.visarjan,
        live: j.live,
      };
    },
    staticSite()
  );
}

// ---------- happening-now logic (dynamic, works on any event list) ----------

export function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function getHappeningNow<T extends { time: string; timeEnd?: string }>(
  events: T[],
  now: Date = new Date()
): { live: T | null; next: T | null } {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sorted = [...events].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
  let live: T | null = null;
  let next: T | null = null;
  for (const event of sorted) {
    const startMin = minutesOf(event.time);
    if (event.timeEnd) {
      const endMin = minutesOf(event.timeEnd);
      if (currentMinutes >= startMin && currentMinutes <= endMin) {
        live = event;
        break;
      }
    } else if (currentMinutes >= startMin && currentMinutes < startMin + 30) {
      live = event;
      break;
    }
    if (startMin > currentMinutes && !next) next = event;
  }
  return { live, next };
}

export function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] || cat;
}
