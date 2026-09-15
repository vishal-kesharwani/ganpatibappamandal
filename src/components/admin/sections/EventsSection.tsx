"use client";

/** Events — day-grouped accordion with expandable event cards. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SelectInput, SectionHeader, CardRow, FilterBar,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Event = Database["public"]["Tables"]["schedule_events"]["Row"];
type Day = Database["public"]["Tables"]["festival_days"]["Row"];

const EMPTY = { day: 1, time: "07:00", time_end: "", title: "", title_marathi: "", description: "", category: "mahaartis", location: "Temple", active: true, sort_order: 0 };

const DAY_LABELS = ["", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const CATEGORIES: { label: string; value: string; color: string }[] = [
  { label: "Mahaartis", value: "mahaartis", color: "#7C2D12" },
  { label: "Seva", value: "seva", color: "#B45309" },
  { label: "Bhog", value: "bhog", color: "#C2410C" },
  { label: "Satsang", value: "satsang", color: "#92400E" },
  { label: "Games", value: "games", color: "#16A34A" },
  { label: "Other", value: "other", color: "#6B7280" },
];

function time12(time: string): string {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

function catMeta(c: string) {
  return CATEGORIES.find((x) => x.value === c) || CATEGORIES[CATEGORIES.length - 1];
}

export default function EventsSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const eventsTable = useTable<Event>("schedule_events", [
    { column: "sort_order", ascending: true },
    { column: "day", ascending: true },
    { column: "time", ascending: true },
  ]);
  const daysTable = useTable<Day>("festival_days", [{ column: "day_number", ascending: true }]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [filterDay, setFilterDay] = useState<string>("all");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const filteredEvents = eventsTable.rows.filter((e) => {
    if (filterDay !== "all" && e.day !== Number(filterDay)) return false;
    if (filterCat !== "all" && e.category !== filterCat) return false;
    return true;
  });

  // Group by day
  const grouped: Record<number, Event[]> = {};
  for (const e of filteredEvents) {
    if (!grouped[e.day]) grouped[e.day] = [];
    grouped[e.day].push(e);
  }

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, day: Number(filterDay) || 1 });
    setOpen(true);
  };

  const startEdit = (e: Event) => {
    setEditing(e);
    setForm({
      day: e.day,
      time: e.time,
      time_end: e.time_end || "",
      title: e.title,
      title_marathi: e.title_marathi || "",
      description: e.description || "",
      category: e.category || "other",
      location: e.location || "",
      active: e.active,
      sort_order: e.sort_order || 0,
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
      day: Number(form.day),
      time: form.time,
      time_end: form.time_end || null,
      title: form.title.trim(),
      title_marathi: form.title_marathi.trim() || null,
      description: form.description.trim() || null,
      category: form.category,
      location: form.location.trim() || null,
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
    };
    const res = editing ? await eventsTable.update(editing.id, values) : await eventsTable.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (e: Event) => {
    if (!(await confirm(`Delete "${e.title_marathi || e.title}"?`))) return;
    const res = await eventsTable.remove(e.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const toggleExpand = (day: number) =>
    setExpanded((prev) => ({ ...prev, [day]: !prev[day] }));

  if (eventsTable.loading || daysTable.loading) return <Spinner />;
  if (eventsTable.missingTable || daysTable.missingTable)
    return <MissingTableNotice tables="schedule_events, festival_days" />;
  if (eventsTable.error || daysTable.error)
    return <EmptyState title="Could not load events" hint={eventsTable.error || daysTable.error || undefined} action={<GhostButton onClick={eventsTable.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Events"
        description={`${eventsTable.rows.length} events · ${daysTable.rows.length} active days`}
        action={<PrimaryButton onClick={startAdd}>+ Add event</PrimaryButton>}
      />

      <FilterBar>
        <button
          className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterDay === "all" ? "text-white" : ""}`}
          style={filterDay === "all" ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
          onClick={() => setFilterDay("all")}
        >
          All days
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <button
            key={d}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterDay === String(d) ? "text-white" : ""}`}
            style={filterDay === String(d) ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
            onClick={() => setFilterDay(String(d))}
          >
            {DAY_LABELS[d]}
          </button>
        ))}
        <span className="mx-1 h-4 w-px" style={{ backgroundColor: A_BORDER }} />
        <button
          className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterCat === "all" ? "text-white" : ""}`}
          style={filterCat === "all" ? { backgroundColor: "#B45309", color: "white" } : { color: A_BODY }}
          onClick={() => setFilterCat("all")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterCat === c.value ? "text-white" : ""}`}
            style={filterCat === c.value ? { backgroundColor: c.color, color: "white" } : { color: A_BODY }}
            onClick={() => setFilterCat(c.value)}
          >
            {c.label}
          </button>
        ))}
      </FilterBar>

      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No events"
          hint={filterDay !== "all" || filterCat !== "all" ? "Try different filters, or add a new event." : "Add your first event to get started."}
          action={<PrimaryButton onClick={startAdd}>+ Add event</PrimaryButton>}
        />
      ) : (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const dayEvents = grouped[day];
            if (!dayEvents || dayEvents.length === 0) return null;
            const isExpanded = expanded[day] !== false; // default open
            const dayMeta = daysTable.rows.find((d) => d.day_number === day);
            return (
              <div key={day} className="overflow-hidden rounded-2xl" style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}>
                <button
                  className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-stone-50 active:bg-stone-100"
                  onClick={() => toggleExpand(day)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl font-bold"
                      style={{ backgroundColor: "#7C2D1215", color: "#7C2D12" }}
                    >
                      {day}
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-semibold" style={{ color: A_INK }}>
                        {dayMeta?.title || DAY_LABELS[day]}
                      </p>
                      <p className="text-[11px]" style={{ color: A_MUTED }}>
                        {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A_MUTED} strokeWidth="2" strokeLinecap="round"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="space-y-2 border-t px-5 py-3" style={{ borderColor: A_BORDER }}>
                    {dayEvents.map((e) => {
                      const cat = catMeta(e.category);
                      return (
                        <div key={e.id} className="flex items-start justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-stone-50">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[13px] font-semibold" style={{ color: A_INK }}>
                                {e.title_marathi || e.title}
                              </p>
                              <Badge tone={e.active ? "green" : "gray"}>{e.active ? "Active" : "Hidden"}</Badge>
                            </div>
                            <p className="mt-0.5 text-[12px]" style={{ color: A_MUTED }}>
                              {time12(e.time)}{e.time_end ? ` — ${time12(e.time_end)}` : ""}
                              {e.location ? ` · ${e.location}` : ""}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              <Badge tone="maroon" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{cat.label}</Badge>
                            </div>
                          </div>
                          <div className="flex shrink-0 gap-1.5">
                            <GhostButton onClick={() => startEdit(e)}>Edit</GhostButton>
                            <DangerGhostButton onClick={() => remove(e)}>Del</DangerGhostButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <Modal title={editing ? `Edit: ${editing.title_marathi || editing.title}` : "Add event"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Day">
                <select
                  className="rounded-lg border px-3 py-2 text-[13px]"
                  style={{ borderColor: A_BORDER }}
                  value={form.day}
                  onChange={(e) => set("day", Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d} value={d}>{DAY_LABELS[d]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Category">
                <select
                  className="rounded-lg border px-3 py-2 text-[13px]"
                  style={{ borderColor: A_BORDER }}
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start time">
                <TextInput type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
              </Field>
              <Field label="End time (optional)">
                <TextInput type="time" value={form.time_end} onChange={(e) => set("time_end", e.target.value)} />
              </Field>
            </div>
            <Field label="Title (English) *">
              <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Sthapana" />
            </Field>
            <Field label="Title (Marathi)">
              <TextInput value={form.title_marathi} onChange={(e) => set("title_marathi", e.target.value)} placeholder="e.g. स्थापना" />
            </Field>
            <Field label="Description">
              <TextArea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Field label="Location">
              <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Temple, Society Hall" />
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
