"use client";

/**
 * AdminShell — auth guard + professional CMS layout.
 * Desktop: sidebar. Mobile/tablet: compact top bar + horizontal section nav.
 * Logout always returns to the public homepage (/).
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { ToastProvider, Spinner, useConfirm, A_IVORY, A_MAROON, A_BORDER, A_INK, A_BODY, A_MUTED } from "@/components/admin/ui";

export const ADMIN_SECTIONS = [
  { id: "overview", label: "Overview", href: "/admin" },
  { id: "days", label: "Days", href: "/admin/days" },
  { id: "events", label: "Events", href: "/admin/events" },
  { id: "aartis", label: "Aartis", href: "/admin/aartis" },
  { id: "notices", label: "Notices", href: "/admin/notices" },
  { id: "gallery", label: "Gallery", href: "/admin/gallery" },
  { id: "mandal", label: "Mandal Info", href: "/admin/mandal" },
  { id: "visarjan", label: "Visarjan", href: "/admin/visarjan" },
  { id: "contacts", label: "Contacts", href: "/admin/contacts" },
  { id: "settings", label: "Settings", href: "/admin/settings" },
];

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
        <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center" style={{ border: `1px solid ${A_BORDER}` }}>
          <p className="text-base font-bold" style={{ color: A_INK }}>
            Unauthorized
          </p>
          <p className="mt-1 text-sm" style={{ color: A_BODY }}>
            This account does not have admin access.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={async () => {
                await signOut();
                router.replace("/");
              }}
              className="rounded-md px-4 py-2 text-xs font-semibold"
              style={{ backgroundColor: A_IVORY, color: A_BODY, border: `1px solid ${A_BORDER}` }}
            >
              Sign out
            </button>
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: A_MAROON }}
            >
              Public site
            </Link>
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
      <aside className="hidden w-60 shrink-0 flex-col lg:flex" style={{ backgroundColor: "#2A1510" }}>
        <div className="px-5 pb-4 pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#D6A77A" }}>
            Mandal Admin
          </p>
          <p className="mt-1 text-sm font-bold text-white">OM SAI MITRA MANDAL</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin sections">
          {ADMIN_SECTIONS.map((s) => {
            const active = s.id === section;
            return (
              <Link
                key={s.id}
                href={s.href}
                aria-current={active ? "page" : undefined}
                className="block rounded-md px-3 py-2 text-sm transition-colors"
                style={{
                  backgroundColor: active ? "#FFF8EE" : "transparent",
                  color: active ? "#6B2E2E" : "#E7E5E4",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-xs transition-colors hover:opacity-80"
            style={{ color: "#D6A77A" }}
          >
            ← View public site
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: `1px solid ${A_BORDER}` }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold" style={{ color: A_INK }}>
                {title}
              </p>
              {subtitle && (
                <p className="truncate text-[11px]" style={{ color: A_MUTED }}>
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden max-w-[180px] truncate text-[11px] sm:block" style={{ color: A_MUTED }} title={user?.email}>
                {user?.email} {role ? `· ${role}` : ""}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-1.5 text-xs font-semibold"
                style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Compact section nav (mobile/tablet) */}
          <nav className="overflow-x-auto px-4 pb-2 lg:hidden" style={{ scrollbarWidth: "none" }} aria-label="Admin sections">
            <div className="flex gap-1.5">
              {ADMIN_SECTIONS.map((s) => {
                const active = s.id === section;
                return (
                  <Link
                    key={s.id}
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? A_MAROON : "#FFFFFF",
                      color: active ? "#FFF8EE" : A_BODY,
                      border: `1px solid ${active ? A_MAROON : A_BORDER}`,
                    }}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>

        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <p className="text-[11px]" style={{ color: A_MUTED }}>
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
            {section !== "overview" && (
              <>
                {"  /  "}
                <span style={{ color: A_BODY }}>
                  {ADMIN_SECTIONS.find((s) => s.id === section)?.label}
                </span>
              </>
            )}
          </p>
        </div>

        <main className="mx-auto max-w-6xl px-4 pb-16 pt-3">
          {actions && <div className="mb-4 flex flex-wrap items-center gap-2">{actions}</div>}
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
