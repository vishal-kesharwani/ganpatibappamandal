"use client";

/** Shared dashboard renderer used by /admin and /admin/[section]. */
import { AdminShell, ADMIN_SECTIONS } from "@/components/admin/AdminShell";
import OverviewSection from "@/components/admin/sections/OverviewSection";
import DaysSection from "@/components/admin/sections/DaysSection";
import EventsSection from "@/components/admin/sections/EventsSection";
import AartisSection from "@/components/admin/sections/AartisSection";
import NoticesSection from "@/components/admin/sections/NoticesSection";
import GallerySection from "@/components/admin/sections/GallerySection";
import MandalSection from "@/components/admin/sections/MandalSection";
import VisarjanSection from "@/components/admin/sections/VisarjanSection";
import ContactsSection from "@/components/admin/sections/ContactsSection";
import SettingsSection from "@/components/admin/sections/SettingsSection";

const TITLES: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Live numbers from Supabase" },
  days: { title: "Festival Days", subtitle: "7-day festival · themes optional" },
  events: { title: "Events & Aarti Timings", subtitle: "Schedule, activate, link aartis" },
  aartis: { title: "Aarti Library", subtitle: "The devotional source of truth" },
  notices: { title: "Notices", subtitle: "Important updates for devotees" },
  gallery: { title: "Gallery", subtitle: "Photos for the public gallery" },
  mandal: { title: "Mandal Info", subtitle: "Name, address, links, about" },
  visarjan: { title: "Visarjan", subtitle: "Date, route, instructions" },
  contacts: { title: "Contacts", subtitle: "Call + WhatsApp numbers" },
  settings: { title: "Settings", subtitle: "Account & database health" },
};

export default function AdminDashboard({
  section,
  editSlug,
}: {
  section: string;
  editSlug?: string;
}) {
  const safe = ADMIN_SECTIONS.some((s) => s.id === section) ? section : "overview";
  const meta = TITLES[safe];

  return (
    <AdminShell section={safe} title={meta.title} subtitle={meta.subtitle}>
      {safe === "overview" && <OverviewSection />}
      {safe === "days" && <DaysSection />}
      {safe === "events" && <EventsSection />}
      {safe === "aartis" && <AartisSection />}
      {safe === "notices" && <NoticesSection />}
      {safe === "gallery" && <GallerySection />}
      {safe === "mandal" && <MandalSection />}
      {safe === "visarjan" && <VisarjanSection />}
      {safe === "contacts" && <ContactsSection />}
      {safe === "settings" && <SettingsSection />}
    </AdminShell>
  );
}
