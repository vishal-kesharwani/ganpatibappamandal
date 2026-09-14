"use client";

/** Contacts CRUD — name + phone only (Call + WhatsApp). No email fields. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import { supabase, db } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type ContactRow = Database["public"]["Tables"]["contacts"]["Row"];

const EMPTY = { name: "", phone: "", display_order: 0, active: true };

const CANONICAL = [
  { name: "SURAJ GUPTA", phone: "918286328273" },
  { name: "SAHIL MALI", phone: "919082412135" },
  { name: "ANAND JAISWAL", phone: "917447469741" },
  { name: "KRISHNA KESHARWANI", phone: "918788250462" },
];

export default function ContactsSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<ContactRow>("contacts", [{ column: "display_order", ascending: true }]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ContactRow | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, display_order: table.rows.length + 1 });
    setOpen(true);
  };

  const startEdit = (c: ContactRow) => {
    setEditing(c);
    setForm({ name: c.name, phone: c.phone, display_order: c.display_order, active: c.active });
    setOpen(true);
  };

  const save = async () => {
    const digits = form.phone.replace(/\D/g, "");
    if (!form.name.trim() || digits.length < 10) {
      push("error", "Name and a valid phone number (min 10 digits) are required.");
      return;
    }
    setBusy(true);
    const values = {
      name: form.name.trim().toUpperCase(),
      phone: digits,
      display_order: Number(form.display_order) || 0,
      active: form.active,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (c: ContactRow) => {
    if (!(await confirm(`Remove contact "${c.name}"?`))) return;
    const res = await table.remove(c.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const move = async (c: ContactRow, dir: -1 | 1) => {
    const sorted = [...table.rows].sort((x, y) => x.display_order - y.display_order);
    const other = sorted[sorted.findIndex((x) => x.id === c.id) + dir];
    if (!other) return;
    await db.from("contacts").update({ display_order: other.display_order }).eq("id", c.id);
    await db.from("contacts").update({ display_order: c.display_order }).eq("id", other.id);
    table.reload();
  };

  const restoreCanonical = async () => {
    setBusy(true);
    for (let i = 0; i < CANONICAL.length; i++) {
      const c = CANONICAL[i];
      await db.from("contacts").upsert(
        { name: c.name, phone: c.phone, display_order: i + 1, active: true },
        { onConflict: "name" }
      );
    }
    setBusy(false);
    push("success", "Canonical contacts restored.");
    table.reload();
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="contacts" />;
  if (table.error) return <EmptyState title="Could not load contacts" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <PrimaryButton onClick={startAdd}>+ Add contact</PrimaryButton>
        <GhostButton onClick={restoreCanonical} disabled={busy}>Restore canonical 4 contacts</GhostButton>
      </div>

      {table.rows.length === 0 && <EmptyState title="No contacts" hint="Add mandal contacts for Call + WhatsApp buttons." />}

      <div className="overflow-x-auto rounded-lg bg-white" style={{ border: `1px solid ${A_BORDER}` }}>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${A_BORDER}` }}>
              {["Order", "Name", "Phone", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${A_BORDER}`, opacity: c.active ? 1 : 0.6 }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: A_BODY }}>{c.display_order}</td>
                <td className="px-4 py-2 font-medium" style={{ color: A_INK }}>{c.name}</td>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: A_BODY }}>+{c.phone}</td>
                <td className="px-4 py-2">
                  <Badge tone={c.active ? "green" : "gray"}>{c.active ? "Active" : "Inactive"}</Badge>
                </td>
                <td className="px-4 py-2">
                  <RowActions>
                    <GhostButton onClick={() => startEdit(c)}>Edit</GhostButton>
                    <GhostButton onClick={() => move(c, -1)} aria-label="Move up">↑</GhostButton>
                    <GhostButton onClick={() => move(c, 1)} aria-label="Move down">↓</GhostButton>
                    <DangerGhostButton onClick={() => remove(c)}>Delete</DangerGhostButton>
                  </RowActions>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal title={editing ? "Edit contact" : "Add contact"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <Field label="Name *">
              <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="FULL NAME" />
            </Field>
            <Field label="Phone (digits with country code, no +) *">
              <TextInput value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="918286328273" inputMode="tel" />
            </Field>
            <div className="grid grid-cols-2 items-end gap-3">
              <Field label="Display order">
                <TextInput type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} />
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
