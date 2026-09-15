"use client";

/** Settings — account, password, and migration health. Card sections layout. */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  useToast, useConfirm, Spinner, Badge,
  Field, TextInput, PrimaryButton, GhostButton, SectionHeader,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_SURFACE, A_SHADOW_SM,
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
  const { confirm: confirmLogout, node: confirmNode } = useConfirm({
    title: "Log out?",
    confirmLabel: "Logout",
    danger: false,
  });
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

  useEffect(() => { check(); }, []);

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
      <SectionHeader
        title="Settings"
        description="Account, password, and database health"
      />

      {/* Account */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>👤 Admin Account</p>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl text-[14px] font-bold" style={{ backgroundColor: "#7C2D1215", color: "#7C2D12" }}>
              {(user?.email || "A")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-[14px] font-semibold" style={{ color: A_INK }}>{user?.email}</p>
              <p className="text-[11px]" style={{ color: A_MUTED }}>Role: {role || "admin"} · Supabase Auth</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={refresh}>Refresh session</GhostButton>
            <GhostButton
              onClick={async () => {
                const ok = await confirmLogout("You will be signed out and return to the public website.");
                if (!ok) return;
                await signOut();
                window.location.href = "/";
              }}
            >
              Sign out
            </GhostButton>
          </div>
        </div>
      </div>

      {/* Password */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>🔒 Change Password</p>
        </div>
        <div className="space-y-3 p-5">
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
      </div>

      {/* Database health */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>🗄 Database Health</p>
          <GhostButton onClick={check}>Re-check</GhostButton>
        </div>
        <div className="p-5">
          {checking ? (
            <Spinner label="Checking tables…" />
          ) : (
            <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3">
              {TABLES.map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ backgroundColor: health[t] ? "#F0FDF4" : "#FEF2F2" }}
                >
                  <code className="text-[11px]" style={{ color: A_BODY }}>{t}</code>
                  <Badge tone={health[t] ? "green" : "red"}>{health[t] ? "OK" : "Missing"}</Badge>
                </div>
              ))}
            </div>
          )}
          {missingTables.length > 0 && (
            <p className="mt-3 text-[12px] leading-relaxed" style={{ color: A_BODY }}>
              Missing: {missingTables.join(", ")}. Run <code>supabase-admin-platform.sql</code> in the
              Supabase SQL Editor. To add another admin:
              <br />
              <code className="text-[11px]">
                INSERT INTO public.admin_users (user_id, email) VALUES (&apos;&lt;auth-uuid&gt;&apos;, &apos;new-admin@example.com&apos;);
              </code>
            </p>
          )}
        </div>
      </div>
      {confirmNode}
    </div>
  );
}
