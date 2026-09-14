"use client";

/** Settings — account, password change, and migration/table health checklist. */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  useToast, Spinner, Badge,
  Field, TextInput, PrimaryButton, GhostButton,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

const TABLES = [
  "aartis",
  "schedule_events",
  "announcements",
  "festival_days",
  "gallery_images",
  "contacts",
  "visarjan_info",
  "site_settings",
  "admin_users",
];

export default function SettingsSection() {
  const { push } = useToast();
  const { user, role, signOut, refresh } = useAdminAuth();
  const [health, setHealth] = useState<Record<string, boolean | null>>({});
  const [checking, setChecking] = useState(true);
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);

  const check = async () => {
    setChecking(true);
    const out: Record<string, boolean | null> = {};
    for (const t of TABLES) {
      try {
        const { error } = await supabase.from(t as never).select("id", { count: "exact", head: true }).limit(1);
        out[t] = !error;
      } catch {
        out[t] = false;
      }
    }
    setHealth(out);
    setChecking(false);
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePassword = async () => {
    if (pw1.length < 8) {
      push("error", "New password must be at least 8 characters.");
      return;
    }
    if (pw1 !== pw2) {
      push("error", "Passwords do not match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw1 });
    setBusy(false);
    if (error) push("error", error.message);
    else {
      push("success", "Password updated.");
      setPw1("");
      setPw2("");
    }
  };

  const missingTables = TABLES.filter((t) => health[t] === false);

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
          Admin account
        </p>
        <p className="text-sm font-medium" style={{ color: A_INK }}>{user?.email}</p>
        <p className="mt-0.5 text-xs" style={{ color: A_MUTED }}>
          Role: {role || "admin"} · verified via Supabase Auth + admin_users
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <GhostButton onClick={refresh}>Refresh session</GhostButton>
          <GhostButton
            onClick={async () => {
              await signOut();
              window.location.href = "/";
            }}
          >
            Sign out
          </GhostButton>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
          Change password
        </p>
        <div className="grid max-w-md gap-3">
          <Field label="New password (min 8 chars)">
            <TextInput type="password" autoComplete="new-password" value={pw1} onChange={(e) => setPw1(e.target.value)} />
          </Field>
          <Field label="Confirm new password">
            <TextInput type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
          </Field>
          <div>
            <PrimaryButton onClick={changePassword} disabled={busy}>{busy ? "Updating…" : "Update password"}</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
            Database health
          </p>
          <GhostButton onClick={check}>Re-check</GhostButton>
        </div>
        {checking ? (
          <Spinner label="Checking tables…" />
        ) : (
          <ul className="space-y-1.5">
            {TABLES.map((t) => (
              <li key={t} className="flex items-center justify-between text-xs">
                <code style={{ color: A_BODY }}>{t}</code>
                <Badge tone={health[t] ? "green" : "red"}>{health[t] ? "OK" : "MISSING"}</Badge>
              </li>
            ))}
          </ul>
        )}
        {missingTables.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed" style={{ color: A_BODY }}>
            Missing: {missingTables.join(", ")}. Run <code>supabase-admin-platform.sql</code> in the
            Supabase SQL Editor. To add another admin afterwards:
            <br />
            <code>
              INSERT INTO public.admin_users (user_id, email) VALUES (&apos;&lt;auth-uuid&gt;&apos;, &apos;new-admin@example.com&apos;);
            </code>
          </p>
        )}
      </div>
    </div>
  );
}
