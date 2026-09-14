"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/festival", label: "Festival Diary" },
  { href: "/aarti", label: "Aarti Library" },
  { href: "/aarti/timings", label: "Aarti Timings" },
  { href: "/events", label: "Events & Programs" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/info", label: "Ganpati Information" },
  { href: "/visarjan", label: "Visarjan Details" },
  { href: "/mandal", label: "About Mandal" },
  { href: "/location", label: "Location & Contact" },
  { href: "/donation", label: "Support / Donate" },
  { href: "/announcements", label: "Announcements" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-temple-bg/95 backdrop-blur-xl border-b border-card-border">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mandal-logo.png"
            alt="OM SAI MITRA MANDAL"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-[10px] text-cream-dim font-gotu leading-tight">श्री गणेशाय नमः</p>
          </div>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-xl hover:bg-card-bg transition-colors"
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-cream" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="bg-temple-bg border-t border-card-border animate-slide-up">
          <div className="max-w-lg mx-auto px-4 py-3 space-y-1">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-cream-muted hover:bg-card-bg hover:text-saffron transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
