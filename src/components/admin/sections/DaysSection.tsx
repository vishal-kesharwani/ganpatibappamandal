"use client";

/** Festival days CRUD — 7-day festival, theme optional (never forced). */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, PrimaryButton, GhostButton,
  DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type Day = Database["public"]["Tables"]["festival_days"]["Row"];

const EMPTY = { day_number: 1, date: "2026-09-14", title: "", description: "", theme: "", active: true, sort_order: 1 };

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
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg bg-white" style={{ border: `1px solid ${A_BORDER}` }}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${A_BORDER}` }}>
              {["Day", "Date", "Title", "Theme", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((d) => (
              <tr key={d.id} style={{ borderBottom: `1px solid ${A_BORDER}` }}>
                <td className="px-4 py-2 font-bold" style={{ color: A_INK }}>
                  {d.day_number}
                </td>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: A_BODY }}>
                  {d.date}
                </td>
                <td className="px-4 py-2">
                  <p className="font-medium" style={{ color: A_INK }}>{d.title}</p>
                  {d.description && <p className="text-[11px]" style={{ color: A_MUTED }}>{d.description}</p>}
                </td>
                <td className="px-4 py-2 text-xs" style={{ color: A_BODY }}>
                  {d.theme || <span style={{ color: A_MUTED }}>—</span>}
                </td>
                <td className="px-4 py-2">
                  <Badge tone={d.active ? "green" : "gray"}>{d.active ? "Active" : "Hidden"}</Badge>
                </td>
                <td className="px-4 py-2">
                  <RowActions>
                    <GhostButton onClick={() => startEdit(d)}>Edit</GhostButton>
                    <DangerGhostButton onClick={() => remove(d)}>Delete</DangerGhostButton>
                  </RowActions>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.rows.length === 0 && (
        <EmptyState title="No festival days" hint="Seed the 7 festival days, or add them manually." />
      )}

      <div>
        <PrimaryButton onClick={startAdd}>+ Add day</PrimaryButton>
      </div>

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
