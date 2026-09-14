"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/festival", label: "Festival Diary" },
  { href: "/aarti", label: "Aarti Library" },
  { href: "/events", label: "Events & Programs" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/info", label: "Ganpati Information" },
  { href: "/visarjan", label: "Visarjan" },
  { href: "/mandal", label: "About Mandal" },
  { href: "/location", label: "Location & Contact" },
  { href: "/donation", label: "Support / Donate" },
  { href: "/announcements", label: "Announcements" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#FAF7F2", borderBottom: "1px solid #E7E5E4" }}>
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mandal-logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-gotu text-sm font-semibold tracking-wide" style={{ color: "#7C2D12" }}>
            OM SAI MITRA MANDAL
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1"
          style={{ color: "#7C2D12" }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="w-full"
          style={{
            backgroundColor: "#FAF7F2",
            borderTop: "1px solid #E7E5E4",
          }}
        >
          <div className="mx-auto max-w-md px-4 py-3">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href} style={{ borderBottom: "1px solid #E7E5E4" }}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm transition-colors duration-150"
                    style={{ color: "#57534E" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#7C2D12";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "#57534E";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3" style={{ borderTop: "1px solid #E7E5E4" }}>
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] transition-colors duration-150"
                style={{ color: "#57534E", opacity: 0.3 }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#7C2D12";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#57534E";
                }}
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
