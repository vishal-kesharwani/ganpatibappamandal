"use client";

/** Festival days CRUD — 7-day festival, theme optional (never forced). */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SectionHeader, CardRow,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Day = Database["public"]["Tables"]["festival_days"]["Row"];

const EMPTY = { day_number: 1, date: "2026-09-14", title: "", description: "", theme: "", active: true, sort_order: 1 };

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getDayName(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T12:00:00");
    return DAY_NAMES[d.getDay()] || "";
  } catch {
    return "";
  }
}

export default function DaysSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Day>("festival_days", [
    { column: "sort_order", ascending: true },
    { column: "day_number", ascending: true },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Day | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => {
    const used = new Set(table.rows.map((r) => r.day_number));
    const free = [1, 2, 3, 4, 5, 6, 7].find((d) => !used.has(d)) ?? 1;
    setEditing(null);
    setForm({ ...EMPTY, day_number: free, sort_order: free, date: `2026-09-${13 + free}` });
    setOpen(true);
  };

  const startEdit = (d: Day) => {
    setEditing(d);
    setForm({
      day_number: d.day_number,
      date: d.date,
      title: d.title,
      description: d.description || "",
      theme: d.theme || "",
      active: d.active,
      sort_order: d.sort_order,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) {
      push("error", "Title is required.");
      return;
    }
    setBusy(true);
    const values = {
      day_number: Number(form.day_number),
      date: form.date,
      title: form.title.trim(),
      description: form.description.trim() || null,
      theme: form.theme.trim() || null,
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (d: Day) => {
    if (!(await confirm(`Delete Day ${d.day_number} (${d.title})? Its events stay but lose grouping.`))) return;
    const res = await table.remove(d.id);
    push(res.ok ? "success" : "error", res.message);
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="festival_days" />;
  if (table.error) return <EmptyState title="Could not load days" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Festival Days"
        description="Manage the 7-day Ganpati Mahotsav schedule"
        action={<PrimaryButton onClick={startAdd}>+ Add day</PrimaryButton>}
      />

      {table.rows.length === 0 ? (
        <EmptyState
          title="No festival days"
          hint="Seed the 7 festival days, or add them manually."
          action={<PrimaryButton onClick={startAdd}>+ Add day</PrimaryButton>}
        />
      ) : (
        <div className="space-y-2">
          {table.rows.map((d) => (
            <CardRow key={d.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold"
                    style={{
                      backgroundColor: d.active ? "#7C2D1215" : "#F5F5F4",
                      color: d.active ? "#7C2D12" : A_MUTED,
                    }}
                  >
                    {d.day_number}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold" style={{ color: A_INK }}>{d.title}</p>
                    <p className="text-[12px]" style={{ color: A_MUTED }}>
                      {d.date} · {getDayName(d.date)}
                    </p>
                    {d.theme && (
                      <p className="mt-1 text-[12px]" style={{ color: "#B45309" }}>Theme: {d.theme}</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <Badge tone={d.active ? "green" : "gray"}>{d.active ? "Active" : "Hidden"}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <GhostButton onClick={() => startEdit(d)}>Edit</GhostButton>
                  <DangerGhostButton onClick={() => remove(d)}>Delete</DangerGhostButton>
                </div>
              </div>
            </CardRow>
          ))}
        </div>
      )}

      {open && (
        <Modal title={editing ? `Edit Day ${editing.day_number}` : "Add day"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Day number (1–7)">
                <TextInput type="number" min={1} max={7} value={form.day_number} onChange={(e) => set("day_number", Number(e.target.value))} />
              </Field>
              <Field label="Date">
                <TextInput type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
              </Field>
            </div>
            <Field label="Title *">
              <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Sthapana Divas" />
            </Field>
            <Field label="Description">
              <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Field label="Theme (optional)">
              <TextInput value={form.theme} onChange={(e) => set("theme", e.target.value)} placeholder="Leave empty — themes are optional" />
            </Field>
            <div className="grid grid-cols-2 items-end gap-3">
              <Field label="Display order">
                <TextInput type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
              </Field>
              <Toggle checked={form.active} onChange={(v) => set("active", v)} label="Active" />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
              <PrimaryButton onClick={save} disabled={busy}>{busy ? "Saving…" : editing ? "Update" : "Add"}</PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
      {confirmNode}
    </div>
  );
}
