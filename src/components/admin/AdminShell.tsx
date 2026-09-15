"use client";

/**
 * AdminShell — auth guard + Apple HIG-inspired CMS layout.
 * Desktop: translucent sidebar with refined typography.
 * Mobile/tablet: compact top bar + horizontal section nav.
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import {
  ToastProvider, Spinner, useConfirm,
  A_IVORY, A_MAROON, A_BORDER, A_INK, A_BODY, A_MUTED,
  A_SURFACE, A_SHADOW_SM, A_TRANSITION,
} from "@/components/admin/ui";

export const ADMIN_SECTIONS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "days", label: "Days", icon: "📅" },
  { id: "events", label: "Events", icon: "🎯" },
  { id: "aartis", label: "Aartis", icon: "🪔" },
  { id: "notices", label: "Notices", icon: "📢" },
  { id: "gallery", label: "Gallery", icon: "🖼" },
  { id: "mandal", label: "Mandal Info", icon: "ℹ" },
  { id: "visarjan", label: "Visarjan", icon: "🙏" },
  { id: "contacts", label: "Contacts", icon: "📞" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

/** Latin digits → Marathi (Devanagari) digits, e.g. 13 → १३. */
export function toMarathiDigits(n: number): string {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(n)
    .split("")
    .map((ch) => (ch >= "0" && ch <= "9" ? map[Number(ch)] : ch))
    .join("");
}

export function sectionIdFromPath(pathname: string): string {
  const seg = pathname.replace(/\/admin\/?/, "").split("/")[0].split("?")[0];
  if (!seg) return "overview";
  return ADMIN_SECTIONS.some((s) => s.id === seg) ? seg : "overview";
}

function Guard({ children }: { children: ReactNode }) {
  const { loading, session, isAdmin, signOut } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: A_IVORY }}>
        <Spinner label="Checking admin session…" />
      </div>
    );
  }

  if (!session) {
    router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: A_IVORY }}>
        <Spinner label="Redirecting to login…" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: A_IVORY }}>
        <div
          className="w-full max-w-sm overflow-hidden text-center"
          style={{ backgroundColor: A_SURFACE, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        >
          <div className="px-6 py-8">
            <p className="text-[15px] font-semibold" style={{ color: A_INK }}>Unauthorized</p>
            <p className="mt-1.5 text-[13px]" style={{ color: A_BODY }}>This account does not have admin access.</p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={async () => { await signOut(); router.replace("/"); }}
                className="rounded-lg px-4 py-2 text-[13px] font-medium transition-colors hover:bg-stone-100"
                style={{ border: `1px solid ${A_BORDER}`, color: A_BODY }}
              >
                Sign out
              </button>
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: A_MAROON }}
              >
                Public site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function Layout({ section, title, subtitle, actions, children }: {
  section: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, role, signOut } = useAdminAuth();
  const router = useRouter();
  const { confirm: confirmLogout, node: confirmNode } = useConfirm({
    title: "Log out?",
    confirmLabel: "Logout",
    danger: false,
  });

  const handleLogout = async () => {
    const ok = await confirmLogout("You will be signed out and return to the public website.");
    if (!ok) return;
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen lg:flex" style={{ backgroundColor: A_IVORY }}>
      {/* Sidebar (desktop) */}
      <aside
        className="hidden w-[260px] shrink-0 flex-col lg:flex"
        style={{
          backgroundColor: "#1A1410",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Brand */}
        <div className="px-5 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
              style={{ backgroundColor: "rgba(214,167,122,0.15)", color: "#D6A77A" }}
            >
              १३
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/90">OM SAI MITRA</p>
              <p className="text-[11px] text-white/40">Mandal Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin sections">
          {ADMIN_SECTIONS.map((s) => {
            const active = s.id === section;
            return (
              <Link
                key={s.id}
                href={`/admin${s.id === "overview" ? "" : `/${s.id}`}`}
                aria-current={active ? "page" : undefined}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150"
                style={{
                  backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <span className="text-[13px]">{s.icon}</span>
                <span>{s.label}</span>
                {active && (
                  <span
                    className="ml-auto h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#D6A77A" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t px-4 py-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            View public site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40"
          style={{
            backgroundColor: "rgba(250,248,245,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: `1px solid ${A_BORDER}`,
          }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold" style={{ color: A_INK }}>
                {title}
              </p>
              {subtitle && (
                <p className="truncate text-[12px]" style={{ color: A_MUTED }}>
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className="hidden max-w-[180px] truncate text-[11px] sm:block"
                style={{ color: A_MUTED }}
                title={user?.email}
              >
                {user?.email} {role ? `· ${role}` : ""}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition-all duration-150 hover:bg-red-50 active:scale-[0.98]"
                style={{ color: "#B91C1C", border: "1px solid #FECACA" }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile section nav */}
          <nav
            className="overflow-x-auto px-5 pb-2.5 lg:hidden"
            style={{ scrollbarWidth: "none" }}
            aria-label="Admin sections"
          >
            <div className="flex gap-1.5">
              {ADMIN_SECTIONS.map((s) => {
                const active = s.id === section;
                return (
                  <Link
                    key={s.id}
                    href={`/admin${s.id === "overview" ? "" : `/${s.id}`}`}
                    aria-current={active ? "page" : undefined}
                    className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-150"
                    style={{
                      backgroundColor: active ? A_MAROON : A_SURFACE,
                      color: active ? "#FFFFFF" : A_BODY,
                      border: `1px solid ${active ? A_MAROON : A_BORDER}`,
                      boxShadow: active ? "0 1px 3px rgba(124,45,18,0.2)" : "none",
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>

        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-5 pt-4">
          <p className="text-[11px] font-medium" style={{ color: A_MUTED }}>
            <Link href="/admin" className="transition-colors hover:text-[#7C2D12]">
              Admin
            </Link>
            {section !== "overview" && (
              <>
                <span className="mx-1.5 opacity-40">/</span>
                <span style={{ color: A_BODY }}>
                  {ADMIN_SECTIONS.find((s) => s.id === section)?.label}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-5 pb-16 pt-4">
          {actions && <div className="mb-5 flex flex-wrap items-center gap-2">{actions}</div>}
          {children}
        </main>
      </div>
      {confirmNode}
    </div>
  );
}

export function AdminShell(props: {
  section: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <Guard>
          <Layout {...props} />
        </Guard>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
