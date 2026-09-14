"use client";

/** Schedule events CRUD incl. aarti-timing links (event → aarti). */
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Database } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import { EVENT_CATEGORIES, CATEGORY_LABELS } from "@/lib/aarti-meta";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SelectInput, SearchInput,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type Evt = Database["public"]["Tables"]["schedule_events"]["Row"];

const EMPTY = {
  day: 1, time: "18:30", time_end: "", title: "", title_marathi: "",
  category: "aarti", description: "", location: "", sort_order: 0,
  active: true, aarti_id: "" as string,
};

function categoryLabelLocal(c: string): string {
  return CATEGORY_LABELS[c] || c;
}

export default function EventsSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Evt>("schedule_events", [
    { column: "day", ascending: true },
    { column: "sort_order", ascending: true },
    { column: "time", ascending: true },
  ]);
  const aartis = useTable<{ id: number; slug: string; title: string; title_devanagari: string; published: boolean }>(
    "aartis",
    [{ column: "sort_order", ascending: true }]
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Evt | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [dayFilter, setDayFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const slugById = useMemo(() => {
    const m: Record<number, string> = {};
    for (const a of aartis.rows) m[a.id] = a.slug;
    return m;
  }, [aartis.rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return table.rows.filter((e) => {
      if (dayFilter !== "all" && e.day !== Number(dayFilter)) return false;
      if (catFilter !== "all" && e.category !== catFilter) return false;
      if (q && !`${e.title} ${e.title_marathi}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [table.rows, dayFilter, catFilter, search]);

  const byDay = useMemo(() => {
    const m = new Map<number, Evt[]>();
    for (const e of filtered) {
      if (!m.has(e.day)) m.set(e.day, []);
      m.get(e.day)!.push(e);
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, day: dayFilter !== "all" ? Number(dayFilter) : 1 });
    setOpen(true);
  };

  const startEdit = (e: Evt) => {
    setEditing(e);
    setForm({
      day: e.day,
      time: e.time,
      time_end: e.time_end || "",
      title: e.title,
      title_marathi: e.title_marathi,
      category: e.category,
      description: e.description || "",
      location: e.location || "",
      sort_order: e.sort_order,
      active: e.active,
      aarti_id: e.aarti_id ? String(e.aarti_id) : "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.title_marathi.trim() || !form.time) {
      push("error", "Day, time, English title and Marathi title are required.");
      return;
    }
    setBusy(true);
    const values = {
      day: Number(form.day),
      time: form.time,
      time_end: form.time_end || null,
      title: form.title.trim(),
      title_marathi: form.title_marathi.trim(),
      category: form.category,
      description: form.description.trim() || null,
      location: form.location.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      active: form.active,
      aarti_id: form.aarti_id ? Number(form.aarti_id) : null,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (e: Evt) => {
    if (!(await confirm(`Delete "${e.title_marathi || e.title}" (Day ${e.day}, ${e.time})?`))) return;
    const res = await table.remove(e.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const toggleActive = async (e: Evt) => {
    const { error } = await db.from("schedule_events").update({ active: !e.active }).eq("id", e.id);
    if (error) push("error", error.message);
    else {
      push("success", e.active ? "Event deactivated." : "Event activated.");
      table.reload();
    }
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="schedule_events" />;
  if (table.error) return <EmptyState title="Could not load events" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-3">
      <div className="grid gap-2 rounded-lg bg-white p-3 sm:grid-cols-4" style={{ border: `1px solid ${A_BORDER}` }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search events…" />
        <SelectInput value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} aria-label="Filter by day">
          <option value="all">All days</option>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <option key={d} value={d}>Day {d}</option>
          ))}
        </SelectInput>
        <SelectInput value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {EVENT_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.labelEn}</option>
          ))}
        </SelectInput>
        <PrimaryButton onClick={startAdd}>+ Add event</PrimaryButton>
      </div>

      {byDay.length === 0 && (
        <EmptyState title="No events found" hint="Add the first event — including daily aarti timings." action={<PrimaryButton onClick={startAdd}>+ Add event</PrimaryButton>} />
      )}

      {byDay.map(([day, events]) => (
        <div key={day} className="overflow-x-auto rounded-lg bg-white" style={{ border: `1px solid ${A_BORDER}` }}>
          <p className="px-4 pb-1 pt-3 text-xs font-bold" style={{ color: A_INK }}>
            Day {day} <span className="font-normal" style={{ color: A_MUTED }}>· {events.length} events</span>
          </p>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${A_BORDER}` }}>
                {["Time", "Title", "Category", "Aarti link", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${A_BORDER}`, opacity: e.active ? 1 : 0.6 }}>
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-xs" style={{ color: A_BODY }}>
                    {e.time}{e.time_end ? `–${e.time_end}` : ""}
                  </td>
                  <td className="px-4 py-2">
                    <p className="font-medium" style={{ color: A_INK }}>{e.title_marathi}</p>
                    <p className="text-[11px]" style={{ color: A_MUTED }}>{e.title}</p>
                  </td>
                  <td className="px-4 py-2 text-xs" style={{ color: A_BODY }}>
                    {categoryLabelLocal(e.category)}
                  </td>
                  <td className="px-4 py-2 text-xs">
                    {e.aarti_id && slugById[e.aarti_id] ? (
                      <Link href={`/aarti/${slugById[e.aarti_id]}`} className="font-medium hover:underline" style={{ color: "#7C2D12" }}>
                        Read aarti →
                      </Link>
                    ) : (
                      <span style={{ color: A_MUTED }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Badge tone={e.active ? "green" : "gray"}>{e.active ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td className="px-4 py-2">
                    <RowActions>
                      <GhostButton onClick={() => startEdit(e)}>Edit</GhostButton>
                      <GhostButton onClick={() => toggleActive(e)}>{e.active ? "Deactivate" : "Activate"}</GhostButton>
                      <DangerGhostButton onClick={() => remove(e)}>Delete</DangerGhostButton>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {open && (
        <Modal title={editing ? "Edit event" : "Add event"} onClose={() => setOpen(false)} wide>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Field label="Day *">
                <SelectInput value={form.day} onChange={(e) => set("day", Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d} value={d}>Day {d}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Start *">
                <TextInput type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
              </Field>
              <Field label="End">
                <TextInput type="time" value={form.time_end} onChange={(e) => set("time_end", e.target.value)} />
              </Field>
              <Field label="Order">
                <TextInput type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (Marathi) *">
                <TextInput value={form.title_marathi} onChange={(e) => set("title_marathi", e.target.value)} placeholder="संध्याकाळची आरती" />
              </Field>
              <Field label="Title (English) *">
                <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Evening Aarti" />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Category">
                <SelectInput value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {EVENT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.labelEn} · {c.labelMr}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Linked aarti (timing)">
                <SelectInput value={form.aarti_id} onChange={(e) => set("aarti_id", e.target.value)}>
                  <option value="">None</option>
                  {aartis.rows.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title_devanagari || a.title}{a.published ? "" : " (unpublished)"}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <Field label="Location">
              <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Mandal pandal" />
            </Field>
            <Field label="Description">
              <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Toggle checked={form.active} onChange={(v) => set("active", v)} label="Active (visible on public site)" />
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
