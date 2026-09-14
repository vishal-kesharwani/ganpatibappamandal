"use client";

/** Announcements CRUD — public site shows only active + published + unexpired. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import { NOTICE_PRIORITIES } from "@/lib/aarti-meta";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SelectInput,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type Notice = Database["public"]["Tables"]["announcements"]["Row"];

const EMPTY = {
  title: "", title_marathi: "", description: "", description_marathi: "",
  priority: "general", active: true, published: true, expires_at: "",
};

export default function NoticesSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Notice>("announcements", [{ column: "created_at", ascending: false }]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setOpen(true);
  };

  const startEdit = (n: Notice) => {
    setEditing(n);
    setForm({
      title: n.title,
      title_marathi: n.title_marathi,
      description: n.description,
      description_marathi: n.description_marathi,
      priority: n.priority,
      active: n.active,
      published: n.published,
      expires_at: n.expires_at ? n.expires_at.slice(0, 16) : "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.title_marathi.trim() || !form.description.trim() || !form.description_marathi.trim()) {
      push("error", "All four title/description fields are required.");
      return;
    }
    setBusy(true);
    const values = {
      title: form.title.trim(),
      title_marathi: form.title_marathi.trim(),
      description: form.description.trim(),
      description_marathi: form.description_marathi.trim(),
      priority: form.priority,
      active: form.active,
      published: form.published,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (n: Notice) => {
    if (!(await confirm(`Delete announcement "${n.title}"?`))) return;
    const res = await table.remove(n.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const patch = async (n: Notice, values: Record<string, unknown>, msg: string) => {
    const { error } = await db.from("announcements").update(values).eq("id", n.id);
    if (error) push("error", error.message);
    else {
      push("success", msg);
      table.reload();
    }
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="announcements" />;
  if (table.error) return <EmptyState title="Could not load notices" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-3">
      <div>
        <PrimaryButton onClick={startAdd}>+ Add announcement</PrimaryButton>
      </div>

      {table.rows.length === 0 && (
        <EmptyState title="No announcements" hint="Post the first important update for devotees." />
      )}

      <div className="space-y-2">
        {table.rows.map((n) => (
          <div key={n.id} className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}`, opacity: n.active && n.published ? 1 : 0.65 }}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: A_INK }}>{n.title_marathi}</p>
                <p className="text-xs" style={{ color: A_BODY }}>{n.title}</p>
                <p className="mt-1 text-xs" style={{ color: A_MUTED }}>
                  {n.description_marathi.slice(0, 140)}{n.description_marathi.length > 140 ? "…" : ""}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge tone={n.priority === "important" ? "red" : n.priority === "event" ? "amber" : "gray"}>{n.priority}</Badge>
                  <Badge tone={n.active ? "green" : "gray"}>{n.active ? "Active" : "Inactive"}</Badge>
                  <Badge tone={n.published ? "maroon" : "gray"}>{n.published ? "Published" : "Hidden"}</Badge>
                  {n.expires_at && <Badge tone="amber">expires {n.expires_at.slice(0, 10)}</Badge>}
                </div>
              </div>
              <RowActions>
                <GhostButton onClick={() => startEdit(n)}>Edit</GhostButton>
                <GhostButton onClick={() => patch(n, { active: !n.active }, n.active ? "Deactivated." : "Activated.")}>
                  {n.active ? "Deactivate" : "Activate"}
                </GhostButton>
                <GhostButton onClick={() => patch(n, { published: !n.published }, n.published ? "Unpublished." : "Published.")}>
                  {n.published ? "Unpublish" : "Publish"}
                </GhostButton>
                <DangerGhostButton onClick={() => remove(n)}>Delete</DangerGhostButton>
              </RowActions>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? "Edit announcement" : "Add announcement"} onClose={() => setOpen(false)} wide>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (Marathi) *">
                <TextInput value={form.title_marathi} onChange={(e) => set("title_marathi", e.target.value)} />
              </Field>
              <Field label="Title (English) *">
                <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} />
              </Field>
            </div>
            <Field label="Description (Marathi) *">
              <TextArea rows={2} value={form.description_marathi} onChange={(e) => set("description_marathi", e.target.value)} />
            </Field>
            <Field label="Description (English) *">
              <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Priority">
                <SelectInput value={form.priority} onChange={(e) => set("priority", e.target.value)}>
                  {NOTICE_PRIORITIES.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Expires at (optional)">
                <TextInput type="datetime-local" value={form.expires_at} onChange={(e) => set("expires_at", e.target.value)} />
              </Field>
            </div>
            <div className="flex flex-wrap gap-4">
              <Toggle checked={form.active} onChange={(v) => set("active", v)} label="Active" />
              <Toggle checked={form.published} onChange={(v) => set("published", v)} label="Published" />
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
