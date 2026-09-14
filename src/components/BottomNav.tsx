"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/festival", label: "Festival", icon: CalendarIcon },
  { href: "/aarti", label: "Aarti", icon: LotusIcon },
  { href: "/events", label: "Events", icon: EventsIcon },
  { href: "/more", label: "More", icon: MoreIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-saffron" : "text-cream-dim"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-saffron" : "text-cream-dim"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function LotusIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-saffron" : "text-cream-dim"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-2.69-9-6s4.03-6 9-6 9 2.69 9 6-4.03 6-9 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-2 4-2 8 0 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2 4 2 8 0 12" />
    </svg>
  );
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-saffron" : "text-cream-dim"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
    </svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? "text-saffron" : "text-cream-dim"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-temple-bg/95 backdrop-blur-xl border-t border-card-border bottom-nav-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-saffron/10" : ""
              }`}
            >
              <item.icon active={isActive} />
              <span className={`text-[10px] font-medium ${isActive ? "text-saffron" : "text-cream-dim"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
