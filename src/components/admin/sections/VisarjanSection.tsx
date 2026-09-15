"use client";

/** Visarjan single-row editor (id = 1). Card sections layout. */
import { useEffect, useState } from "react";
import { supabase, isMissingTableError } from "@/lib/supabase";
import {
  useToast, Spinner, MissingTableNotice, EmptyState,
  Field, TextInput, TextArea, SelectInput, PrimaryButton, GhostButton, SectionHeader,
  A_BORDER, A_INK, A_MUTED, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

const EMPTY = {
  date: "2026-09-20", time: "15:00", procession_start: "11:00",
  meeting_point: "", route: "", instructions: "", status: "scheduled", notes: "",
};

const STATUSES = [
  { label: "Scheduled", value: "scheduled" },
  { label: "Live now", value: "live" },
  { label: "Completed", value: "completed" },
];

export default function VisarjanSection() {
  const { push } = useToast();
  const [form, setForm] = useState({ ...EMPTY });
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("visarjan_info").select("*").eq("id", 1).maybeSingle();
    if (error) {
      if (isMissingTableError(error)) setMissing(true);
      else push("error", error.message);
    } else if (data) {
      const v = data as Record<string, string | null>;
      setForm({
        date: (v.date as string) || EMPTY.date,
        time: (v.time as string) || EMPTY.time,
        procession_start: (v.procession_start as string) || EMPTY.procession_start,
        meeting_point: (v.meeting_point as string) || "",
        route: (v.route as string) || "",
        instructions: (v.instructions as string) || "",
        status: (v.status as string) || "scheduled",
        notes: (v.notes as string) || "",
      });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.date || !form.meeting_point.trim()) {
      push("error", "Date and meeting point are required.");
      return;
    }
    setBusy(true);
    const values = {
      id: 1,
      date: form.date,
      time: form.time,
      procession_start: form.procession_start,
      meeting_point: form.meeting_point.trim(),
      route: form.route.trim(),
      instructions: form.instructions.trim(),
      status: form.status,
      notes: form.notes.trim() || null,
    };
    const { error } = await supabase.from("visarjan_info").upsert(values as never);
    setBusy(false);
    push(error ? "error" : "success", error ? error.message : "Visarjan details saved.");
  };

  if (loading) return <Spinner />;
  if (missing) return <MissingTableNotice tables="visarjan_info" />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Visarjan Details"
        description="Manage the immersion ceremony details"
      />

      {/* Schedule */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>📅 Schedule</p>
        </div>
        <div className="space-y-3 p-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date *">
              <TextInput type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </Field>
            <Field label="Status">
              <select
                className="rounded-lg border px-3 py-2 text-[13px]"
                style={{ borderColor: "#E7E5E4" }}
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Visarjan time">
              <TextInput type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
            </Field>
            <Field label="Procession starts">
              <TextInput type="time" value={form.procession_start} onChange={(e) => set("procession_start", e.target.value)} />
            </Field>
          </div>
        </div>
      </div>

      {/* Route */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>📍 Route & Location</p>
        </div>
        <div className="space-y-3 p-5">
          <Field label="Meeting point *">
            <TextInput value={form.meeting_point} onChange={(e) => set("meeting_point", e.target.value)} placeholder="Start location for the procession" />
          </Field>
          <Field label="Route (one stop per line)">
            <TextArea rows={5} value={form.route} onChange={(e) => set("route", e.target.value)} placeholder="Triveni Sangam Apartment\nKaneri Naka\nBhiwandi…" />
          </Field>
        </div>
      </div>

      {/* Info */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
      >
        <div className="border-b px-5 py-3.5" style={{ borderColor: A_BORDER }}>
          <p className="text-[13px] font-semibold" style={{ color: A_INK }}>📋 Instructions & Notes</p>
        </div>
        <div className="space-y-3 p-5">
          <Field label="Instructions (one per line)">
            <TextArea rows={5} value={form.instructions} onChange={(e) => set("instructions", e.target.value)} />
          </Field>
          <Field label="Notes (internal)">
            <TextArea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="flex gap-2">
        <PrimaryButton onClick={save} disabled={busy}>{busy ? "Saving…" : "Save visarjan"}</PrimaryButton>
        <GhostButton onClick={load}>Reload</GhostButton>
      </div>
      <EmptyState title="Public page" hint="The Visarjan page reads this row live and falls back to built-in details if the migration has not run." />
    </div>
  );
}
