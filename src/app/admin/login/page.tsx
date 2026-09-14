"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";

const IVORY = "#FAF7F2";
const MAROON = "#7C2D12";
const BORDER = "#E7E5E4";
const INK = "#1C1917";
const BODY = "#57534E";
const MUTED = "#A8A29E";

function LoginForm() {
  const { loading, session, isAdmin, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  if (!loading && session && isAdmin) {
    router.replace(next.startsWith("/admin") ? next : "/admin");
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm" style={{ color: MUTED }}>
          Already signed in — redirecting…
        </p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setMessage("Enter your admin email and password.");
      return;
    }
    setBusy(true);
    setMessage(null);
    const result = await signIn(email, password);
    setBusy(false);
    if (result.ok) {
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10" style={{ backgroundColor: IVORY }}>
      <div className="w-full max-w-sm rounded-lg bg-white p-6 sm:p-8" style={{ border: `1px solid ${BORDER}` }}>
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${MAROON}10` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-center text-lg font-bold" style={{ color: INK }}>
          Mandal Admin Login
        </h1>
        <p className="mt-1 text-center text-xs" style={{ color: MUTED }}>
          OM SAI MITRA MANDAL committee only
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="admin-input w-full rounded-md px-4 py-2.5 text-sm"
              style={{ border: `1px solid ${BORDER}`, backgroundColor: IVORY, color: INK }}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="admin-input w-full rounded-md px-4 py-2.5 text-sm"
              style={{ border: `1px solid ${BORDER}`, backgroundColor: IVORY, color: INK }}
            />
          </div>

          {message && (
            <p role="alert" className="rounded-md px-3 py-2 text-xs" style={{ backgroundColor: "#FEF2F2", color: "#B91C1C" }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: MAROON }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-5 border-t pt-4 text-center" style={{ borderColor: BORDER }}>
          <Link href="/" className="text-xs font-medium hover:underline" style={{ color: BODY }}>
            ← Back to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-sm" style={{ color: MUTED }}>Loading…</div>}>
        <LoginForm />
      </Suspense>
    </AdminAuthProvider>
  );
}
