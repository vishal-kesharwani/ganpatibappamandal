"use client";

/** Contacts — card-based list with avatar initials + tel: links. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, SectionHeader, CardRow,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_MAROON, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const EMPTY = { name: "", phone: "", display_order: 0, active: true };

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function ContactsSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Contact>("contacts", [
    { column: "display_order", ascending: true },
    { column: "name", ascending: true },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string | boolean | number) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => { setEditing(null); setForm({ ...EMPTY }); setOpen(true); };

  const startEdit = (c: Contact) => {
    setEditing(c);
    setForm({
      name: c.name,
      phone: c.phone,
      display_order: c.display_order || 0,
      active: c.active,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      push("error", "Name and phone are required.");
      return;
    }
    setBusy(true);
    const values = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      display_order: Number(form.display_order) || 0,
      active: form.active,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (c: Contact) => {
    if (!(await confirm(`Delete "${c.name}"?`))) return;
    const res = await table.remove(c.id);
    push(res.ok ? "success" : "error", res.message);
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="contacts" />;
  if (table.error) return <EmptyState title="Could not load contacts" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Contacts"
        description={`${table.rows.length} contact${table.rows.length !== 1 ? "s" : ""}`}
        action={<PrimaryButton onClick={startAdd}>+ Add contact</PrimaryButton>}
      />

      {table.rows.length === 0 ? (
        <EmptyState
          title="No contacts"
          hint="Add your first contact."
          action={<PrimaryButton onClick={startAdd}>+ Add contact</PrimaryButton>}
        />
      ) : (
        <div className="space-y-2">
          {table.rows.map((c) => (
            <CardRow key={c.id}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold"
                  style={{ backgroundColor: "#7C2D1215", color: "#7C2D12" }}
                >
                  {getInitials(c.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold" style={{ color: A_INK }}>{c.name}</p>
                    <Badge tone={c.active ? "green" : "gray"}>{c.active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:underline"
                    style={{ color: A_MAROON }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    📞 {c.phone}
                  </a>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <GhostButton onClick={() => startEdit(c)}>Edit</GhostButton>
                  <DangerGhostButton onClick={() => remove(c)}>Del</DangerGhostButton>
                </div>
              </div>
            </CardRow>
          ))}
        </div>
      )}

      {open && (
        <Modal title={editing ? `Edit: ${editing.name}` : "Add contact"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <Field label="Name *">
              <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Phone *">
              <TextInput type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 82863 28273" />
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
