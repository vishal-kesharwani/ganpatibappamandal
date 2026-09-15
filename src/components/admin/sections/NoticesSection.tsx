"use client";

/** Notices — priority-aware cards with expandable descriptions. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SectionHeader, FilterBar,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_MAROON, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Notice = Database["public"]["Tables"]["announcements"]["Row"];

const EMPTY = { title: "", title_marathi: "", description: "", description_marathi: "", priority: "normal", published: true, active: true };

const PRIORITIES = [
  { label: "Low", value: "low", color: "#6B7280" },
  { label: "Normal", value: "normal", color: "#16A34A" },
  { label: "Urgent", value: "urgent", color: "#DC2626" },
  { label: "Info", value: "info", color: "#2563EB" },
];

function priMeta(p: string) {
  return PRIORITIES.find((x) => x.value === p) || PRIORITIES[1];
}

export default function NoticesSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Notice>("announcements", [
    { column: "created_at", ascending: false },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [filterPri, setFilterPri] = useState("all");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const set = (k: string, v: string | boolean | number) => setForm((f) => ({ ...f, [k]: v }));

  const filtered = table.rows.filter((n) => {
    if (filterPri !== "all" && n.priority !== filterPri) return false;
    return true;
  });

  const startAdd = () => { setEditing(null); setForm({ ...EMPTY }); setOpen(true); };

  const startEdit = (n: Notice) => {
    setEditing(n);
    setForm({
      title: n.title,
      title_marathi: n.title_marathi || "",
      description: n.description || "",
      description_marathi: n.description_marathi || "",
      priority: n.priority || "normal",
      published: n.published,
      active: n.active,
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
      title: form.title.trim(),
      title_marathi: form.title_marathi.trim() || "",
      description: form.description.trim() || "",
      description_marathi: form.description_marathi.trim() || "",
      priority: form.priority,
      published: form.published,
      active: form.active,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (n: Notice) => {
    if (!(await confirm(`Delete "${n.title}"?`))) return;
    const res = await table.remove(n.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="announcements" />;
  if (table.error) return <EmptyState title="Could not load notices" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Notices"
        description={`${table.rows.length} notice${table.rows.length !== 1 ? "s" : ""}`}
        action={<PrimaryButton onClick={startAdd}>+ Add notice</PrimaryButton>}
      />

      <FilterBar>
        <button
          className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterPri === "all" ? "text-white" : ""}`}
          style={filterPri === "all" ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
          onClick={() => setFilterPri("all")}
        >
          All
        </button>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterPri === p.value ? "text-white" : ""}`}
            style={filterPri === p.value ? { backgroundColor: p.color, color: "white" } : { color: A_BODY }}
            onClick={() => setFilterPri(p.value)}
          >
            {p.label}
          </button>
        ))}
      </FilterBar>

      {filtered.length === 0 ? (
        <EmptyState
          title="No notices"
          hint={filterPri !== "all" ? "Try a different filter." : "Add your first notice."}
          action={<PrimaryButton onClick={startAdd}>+ Add notice</PrimaryButton>}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const pri = priMeta(n.priority);
            const isExpanded = expanded.has(n.id);
            return (
              <div
                key={n.id}
                className="overflow-hidden rounded-xl"
                style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
              >
                <button
                  className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-stone-50"
                  onClick={() => toggleExpand(n.id)}
                >
                  <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pri.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-semibold" style={{ color: A_INK }}>{n.title}</p>
                      {n.title_marathi && (
                        <span className="text-[12px]" style={{ color: A_MAROON }}>{n.title_marathi}</span>
                      )}
                    </div>
                    {n.description && (
                      <p className="mt-0.5 text-[12px] line-clamp-1" style={{ color: A_BODY }}>{n.description}</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge tone="maroon">{pri.label}</Badge>
                      <Badge tone={n.published ? "green" : "gray"}>{n.published ? "Published" : "Draft"}</Badge>
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A_MUTED} strokeWidth="2" strokeLinecap="round"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms", marginTop: 4 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: A_BORDER }}>
                    {n.description && (
                      <p className="whitespace-pre-wrap text-[13px] leading-relaxed" style={{ color: A_BODY }}>{n.description}</p>
                    )}
                    {n.description_marathi && (
                      <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed" style={{ color: A_MAROON }}>
                        {n.description_marathi}
                      </p>
                    )}
                    <div className="mt-3 flex gap-1.5">
                      <GhostButton onClick={() => startEdit(n)}>Edit</GhostButton>
                      <DangerGhostButton onClick={() => remove(n)}>Delete</DangerGhostButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <Modal title={editing ? `Edit: ${editing.title}` : "Add notice"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <Field label="Title (English) *">
              <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Notice title" />
            </Field>
            <Field label="Title (Marathi)">
              <TextInput value={form.title_marathi} onChange={(e) => set("title_marathi", e.target.value)} placeholder="सूचना शीर्षक" />
            </Field>
            <Field label="Description (English)">
              <TextArea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Notice content…" />
            </Field>
            <Field label="Description (Marathi)">
              <TextArea rows={4} value={form.description_marathi} onChange={(e) => set("description_marathi", e.target.value)} placeholder="सूचना विवरण…" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Priority">
                <select className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: A_BORDER }} value={form.priority} onChange={(e) => set("priority", e.target.value)}>
                  {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </Field>
            </div>
            <div className="flex gap-4">
              <Toggle checked={form.published} onChange={(v) => set("published", v)} label="Published" />
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
