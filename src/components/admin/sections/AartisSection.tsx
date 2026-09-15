"use client";

/** Aartis — list view with metadata cards, lyrics in modal. */
import { useState } from "react";
import type { Database } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SectionHeader, FilterBar,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, SearchInput,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_MAROON, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Aarti = Database["public"]["Tables"]["aartis"]["Row"];

const EMPTY_FORM = {
  title: "",
  title_devanagari: "",
  slug: "",
  description: "",
  lyrics: "",
  transliteration: "",
  category: "maha_aarti",
  deity: "Ganpati",
  language: "Hindi",
  type: "aarti",
  source: "",
  published: true,
  sort_order: 0,
};

const CATEGORIES = [
  { label: "Maha Aarti", value: "maha_aarti", color: "#7C2D12" },
  { label: "Morning", value: "morning_prayer", color: "#B45309" },
  { label: "Evening", value: "evening_prayer", color: "#C2410C" },
  { label: "Bhajan", value: "bhajan", color: "#16A34A" },
  { label: "Abhishek", value: "abhishek_prayer", color: "#92400E" },
  { label: "Special", value: "special_prayer", color: "#6B7280" },
];

function catMeta(c: string) {
  return CATEGORIES.find((x) => x.value === c) || CATEGORIES[CATEGORIES.length - 1];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AartisSection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Aarti>("aartis", [
    { column: "sort_order", ascending: true },
    { column: "created_at", ascending: false },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Aarti | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [busy, setBusy] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");
  const [editorTab, setEditorTab] = useState<"details" | "lyrics" | "transliteration">("details");

  const set = (k: string, v: string | boolean | number) => setForm((f) => ({ ...f, [k]: v }));

  const filtered = table.rows.filter((a) => {
    if (filterCat !== "all" && a.category !== filterCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const haystack = `${a.title} ${a.title_devanagari || ""} ${a.slug}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setEditorTab("details");
    setOpen(true);
  };

  const startEdit = (a: Aarti) => {
    setEditing(a);
    setForm({
      title: a.title,
      title_devanagari: a.title_devanagari || "",
      slug: a.slug,
      description: a.description || "",
      lyrics: a.lyrics || "",
      transliteration: a.transliteration || "",
      category: a.category || "maha_aarti",
      deity: a.deity || "Ganpati",
      language: a.language || "Hindi",
      type: a.type || "aarti",
      source: a.source || "",
      published: a.published,
      sort_order: a.sort_order || 0,
    });
    setEditorTab("details");
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      push("error", "Title and slug are required.");
      return;
    }
    setBusy(true);
    const values = {
      title: form.title.trim(),
      title_devanagari: form.title_devanagari.trim() || "",
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      lyrics: form.lyrics || "",
      transliteration: form.transliteration.trim() || null,
      category: form.category,
      deity: form.deity,
      language: form.language,
      type: form.type,
      source: form.source.trim() || "",
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (a: Aarti) => {
    if (!(await confirm(`Delete "${a.title_devanagari || a.title}"?`))) return;
    const res = await table.remove(a.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const move = async (a: Aarti, dir: -1 | 1) => {
    const sorted = [...table.rows].sort((x, y) => x.sort_order - y.sort_order);
    const idx = sorted.findIndex((x) => x.id === a.id);
    const other = sorted[idx + dir];
    if (!other) return;
    await db.from("aartis").update({ sort_order: other.sort_order }).eq("id", a.id);
    await db.from("aartis").update({ sort_order: a.sort_order }).eq("id", other.id);
    table.reload();
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="aartis" />;
  if (table.error) return <EmptyState title="Could not load aartis" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Aartis"
        description={`${table.rows.length} aarti${table.rows.length !== 1 ? "s" : ""} in library`}
        action={<PrimaryButton onClick={startAdd}>+ Add aarti</PrimaryButton>}
      />

      <FilterBar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search aartis…" />
        <span className="h-4 w-px" style={{ backgroundColor: A_BORDER }} />
        <button
          className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filterCat === "all" ? "text-white" : ""}`}
          style={filterCat === "all" ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
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

      {filtered.length === 0 ? (
        <EmptyState
          title="No aartis"
          hint={filterCat !== "all" || search ? "Try different filters." : "Add your first aarti to the library."}
          action={<PrimaryButton onClick={startAdd}>+ Add aarti</PrimaryButton>}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => {
            const cat = catMeta(a.category);
            const hasLyrics = (a.lyrics || "").trim().length > 0;
            return (
              <div
                key={a.id}
                className="rounded-xl p-4 transition-all duration-150 hover:shadow-md"
                style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-semibold" style={{ color: A_INK }}>{a.title}</p>
                      {a.title_devanagari && (
                        <span className="text-[13px]" style={{ color: A_MAROON }}>{a.title_devanagari}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] font-mono" style={{ color: A_MUTED }}>{a.slug}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge tone="maroon">{cat.label}</Badge>
                      {hasLyrics ? (
                        <Badge tone="green">Lyrics ✓</Badge>
                      ) : (
                        <Badge tone="gray">No lyrics</Badge>
                      )}
                      <Badge tone={a.published ? "green" : "gray"}>{a.published ? "Published" : "Hidden"}</Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    <div className="flex gap-1">
                      <GhostButton onClick={() => startEdit(a)}>Edit</GhostButton>
                      <DangerGhostButton onClick={() => remove(a)}>Del</DangerGhostButton>
                    </div>
                    <div className="flex gap-1">
                      <GhostButton onClick={() => move(a, -1)} aria-label="Move up">↑</GhostButton>
                      <GhostButton onClick={() => move(a, 1)} aria-label="Move down">↓</GhostButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <Modal title={editing ? `Edit: ${editing.title_devanagari || editing.title}` : "Add aarti"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            {/* Tab bar */}
            <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "#F5F5F4" }}>
              {(["details", "lyrics", "transliteration"] as const).map((tab) => (
                <button
                  key={tab}
                  className="flex-1 rounded-lg px-3 py-2 text-[12px] font-medium transition-all"
                  style={{
                    backgroundColor: editorTab === tab ? A_SURFACE : "transparent",
                    color: editorTab === tab ? A_INK : A_MUTED,
                    boxShadow: editorTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                  onClick={() => setEditorTab(tab)}
                >
                  {tab === "details" ? "Details" : tab === "lyrics" ? "Lyrics" : "Transliteration"}
                </button>
              ))}
            </div>

            {editorTab === "details" && (
              <>
                <Field label="Title (English) *">
                  <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Ganpati Bappa Morya" />
                </Field>
                <Field label="Title (Devanagari)">
                  <TextInput value={form.title_devanagari} onChange={(e) => set("title_devanagari", e.target.value)} placeholder="e.g. गणपती बप्पा मोरया" />
                </Field>
                <Field label="Slug *">
                  <div className="flex gap-2">
                    <TextInput value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="ganpati-bappa-morya" />
                    <GhostButton onClick={() => set("slug", slugify(form.title))}>Auto</GhostButton>
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category">
                    <select className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: A_BORDER }} value={form.category} onChange={(e) => set("category", e.target.value)}>
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Deity">
                    <TextInput value={form.deity} onChange={(e) => set("deity", e.target.value)} placeholder="Ganpati" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Language">
                    <TextInput value={form.language} onChange={(e) => set("language", e.target.value)} placeholder="Hindi" />
                  </Field>
                  <Field label="Source">
                    <TextInput value={form.source} onChange={(e) => set("source", e.target.value)} placeholder="Traditional" />
                  </Field>
                </div>
                <Field label="Description">
                  <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief description for aarti cards" />
                </Field>
                <div className="grid grid-cols-2 items-end gap-3">
                  <Field label="Sort order">
                    <TextInput type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
                  </Field>
                  <Toggle checked={form.published} onChange={(v) => set("published", v)} label="Published" />
                </div>
              </>
            )}

            {editorTab === "lyrics" && (
              <Field label="Lyrics (Hindi/Marathi)">
                <TextArea rows={12} value={form.lyrics} onChange={(e) => set("lyrics", e.target.value)} placeholder="Paste lyrics here, line by line…" className="font-mono text-[13px] leading-relaxed" />
              </Field>
            )}

            {editorTab === "transliteration" && (
              <Field label="Transliteration (English)">
                <TextArea rows={12} value={form.transliteration} onChange={(e) => set("transliteration", e.target.value)} placeholder="Paste romanized lyrics here…" className="font-mono text-[13px] leading-relaxed" />
              </Field>
            )}

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
