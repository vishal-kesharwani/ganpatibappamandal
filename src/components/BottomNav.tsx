"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, CalendarDays, BookOpen, Image, MoreHorizontal } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/festival", label: "Festival", icon: CalendarDays },
  { href: "/aarti", label: "Aarti", icon: BookOpen },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/more", label: "More", icon: MoreHorizontal },
];

const COLOR_MUTED = "#A8A29E";
const COLOR_ACTIVE = "#7C2D12";
const BG = "#FAF7F2";
const BORDER = "#E7E5E4";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        backgroundColor: BG,
        borderTop: `1px solid ${BORDER}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-auto flex max-w-[640px] items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5"
              style={{ color: isActive ? COLOR_ACTIVE : COLOR_MUTED }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className="text-[10px] leading-none"
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
