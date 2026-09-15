"use client";

/** Aarti library management — search, filter, CRUD, duplicate, publish,
 *  feature, reorder, and Preview/Read in the public reading experience. */
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Database } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import { AARTI_CATEGORIES, AARTI_TYPES, AARTI_LANGUAGES } from "@/lib/aarti-meta";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, TextArea, SelectInput, SearchInput,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type Aarti = Database["public"]["Tables"]["aartis"]["Row"];

const EMPTY = {
  slug: "", title: "", title_devanagari: "", deity: "ganpati", category: "ganpati",
  language: "marathi", type: "aarti", lyrics: "", transliteration: "",
  description: "", source: "Mandal Sangraha", source_url: "",
  content_status: "verified", verified: false, published: true, sort_order: 0,
};

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

export default function AartisSection({ initialEditSlug }: { initialEditSlug?: string }) {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Aarti>("aartis", [
    { column: "sort_order", ascending: true },
    { column: "created_at", ascending: false },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Aarti | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [deity, setDeity] = useState("all");
  const [language, setLanguage] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return table.rows.filter((a) => {
      if (deity !== "all" && a.deity !== deity) return false;
      if (language !== "all" && a.language !== language) return false;
      if (category !== "all" && a.category !== category) return false;
      if (status === "published" && !a.published) return false;
      if (status === "unpublished" && a.published) return false;
      if (status === "unverified" && a.verified) return false;
      if (q && !`${a.title} ${a.title_devanagari} ${a.deity}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [table.rows, search, deity, language, category, status]);

  // Deep-link: /admin/aartis?edit=<slug>
  useMemo(() => {
    if (initialEditSlug && table.rows.length > 0 && !open) {
      const found = table.rows.find((a) => a.slug === initialEditSlug);
      if (found) {
        startEdit(found);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEditSlug, table.rows.length]);

  function toForm(a: Aarti) {
    return {
      slug: a.slug, title: a.title, title_devanagari: a.title_devanagari,
      deity: a.deity, category: a.category, language: a.language, type: a.type,
      lyrics: a.lyrics, transliteration: a.transliteration || "",
      description: a.description || "", source: a.source, source_url: a.source_url || "",
      content_status: a.content_status, verified: a.verified,
      published: a.published, sort_order: a.sort_order,
    };
  }

  function startEdit(a: Aarti) {
    setEditing(a);
    setForm(toForm(a));
    setOpen(true);
  }

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, sort_order: table.rows.length });
    setOpen(true);
  };

  const save = async () => {
    if (!form.slug.trim() || !form.title.trim() || !form.title_devanagari.trim() || !form.lyrics.trim()) {
      push("error", "Slug, both titles and lyrics are required. Never save empty lyrics.");
      return;
    }
    setBusy(true);
    const values = {
      slug: slugify(form.slug),
      title: form.title.trim(),
      title_devanagari: form.title_devanagari.trim(),
      deity: form.deity,
      category: form.category,
      language: form.language,
      type: form.type,
      lyrics: form.lyrics,
      transliteration: form.transliteration || null,
      description: form.description.trim() || null,
      source: form.source.trim() || "Mandal Sangraha",
      source_url: form.source_url.trim() || null,
      content_status: form.content_status,
      verified: form.verified,
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (a: Aarti) => {
    if (!(await confirm(`Delete "${a.title_devanagari || a.title}"? Events linked to it will keep working without the link.`))) return;
    const res = await table.remove(a.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const duplicate = async (a: Aarti) => {
    const copySlug = `${a.slug}-copy-${Date.now().toString(36)}`;
    const { id: _omit, created_at: _omit2, ...rest } = a;
    void _omit;
    void _omit2;
    const res = await table.create({ ...rest, slug: copySlug, title: `${a.title} (Copy)`, published: false, sort_order: table.rows.length });
    push(res.ok ? "success" : "error", res.ok ? "Duplicated as unpublished copy." : res.message);
  };

  const patch = async (a: Aarti, values: Record<string, unknown>, msg: string) => {
    const { error } = await db.from("aartis").update(values).eq("id", a.id);
    if (error) push("error", error.message);
    else {
      push("success", msg);
      table.reload();
    }
  };

  const move = async (a: Aarti, dir: -1 | 1) => {
    const sorted = [...table.rows].sort((x, y) => x.sort_order - y.sort_order);
    const idx = sorted.findIndex((x) => x.id === a.id);
    const other = sorted[idx + dir];
    if (!other) return;
    const { error } = await db.from("aartis").update({ sort_order: other.sort_order }).eq("id", a.id);
    if (error) {
      push("error", error.message);
      return;
    }
    await db.from("aartis").update({ sort_order: a.sort_order }).eq("id", other.id);
    table.reload();
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="aartis" />;
  if (table.error) return <EmptyState title="Could not load aartis" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  return (
    <div className="space-y-3">
      <div className="grid gap-2 rounded-lg bg-white p-3 sm:grid-cols-3 xl:grid-cols-6" style={{ border: `1px solid ${A_BORDER}` }}>
        <div className="sm:col-span-3 xl:col-span-2">
          <SearchInput value={search} onChange={setSearch} placeholder="Search title / deity…" />
        </div>
        <SelectInput value={deity} onChange={(e) => setDeity(e.target.value)} aria-label="Filter by deity">
          <option value="all">All deities</option>
          {AARTI_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.labelEn}</option>
          ))}
        </SelectInput>
        <SelectInput value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Filter by language">
          <option value="all">All languages</option>
          {AARTI_LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>{l.labelEn}</option>
          ))}
        </SelectInput>
        <SelectInput value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {AARTI_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.labelEn}</option>
          ))}
        </SelectInput>
        <SelectInput value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="all">Any status</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="unverified">Unverified</option>
        </SelectInput>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: A_MUTED }}>
          Showing {filtered.length} of {table.rows.length} aartis
        </p>
        <PrimaryButton onClick={startAdd}>+ Add aarti</PrimaryButton>
      </div>

      {filtered.length === 0 && (
        <EmptyState
          title={table.rows.length === 0 ? "No aartis in database" : "No aartis match"}
          hint={
            table.rows.length === 0
              ? "If the public site shows aartis but admin shows zero, the admin RLS migration has not run: execute supabase-admin-platform.sql in the Supabase SQL Editor, then reload. If the table itself is empty, run supabase-aartis-seed.sql first."
              : "Adjust filters or add a new aarti. Existing verified content is never touched unless you edit it."
          }
        />
      )}

      {/* Desktop table / mobile stacked cards */}
      <div className="overflow-x-auto rounded-lg bg-white" style={{ border: `1px solid ${A_BORDER}` }}>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${A_BORDER}` }}>
              {["Title", "Deity / Lang / Type", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ borderBottom: `1px solid ${A_BORDER}` }}>
                <td className="px-4 py-2">
                  <p className="font-medium" style={{ color: A_INK }}>{a.title_devanagari}</p>
                  <p className="font-mono text-[11px]" style={{ color: A_MUTED }}>{a.slug}</p>
                </td>
                <td className="px-4 py-2 text-xs" style={{ color: A_BODY }}>
                  {a.deity} · {a.language} · {a.type}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge tone={a.published ? "green" : "gray"}>{a.published ? "Published" : "Draft"}</Badge>
                    <Badge tone={a.verified ? "maroon" : "amber"}>{a.verified ? "Verified" : "Unverified"}</Badge>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <RowActions>
                    <Link href={`/aarti/${a.slug}`} className="rounded-md px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: "#7C2D12" }}>
                      Read
                    </Link>
                    <GhostButton onClick={() => startEdit(a)}>Edit</GhostButton>
                    <GhostButton onClick={() => duplicate(a)}>Duplicate</GhostButton>
                    <GhostButton onClick={() => patch(a, { published: !a.published }, a.published ? "Unpublished." : "Published.")}>
                      {a.published ? "Unpublish" : "Publish"}
                    </GhostButton>
                    <GhostButton onClick={() => patch(a, { verified: !a.verified }, "Verification updated.")}>
                      {a.verified ? "Unverify" : "Verify"}
                    </GhostButton>
                    <GhostButton onClick={() => move(a, -1)} aria-label="Move up">↑</GhostButton>
                    <GhostButton onClick={() => move(a, 1)} aria-label="Move down">↓</GhostButton>
                    <DangerGhostButton onClick={() => remove(a)}>Delete</DangerGhostButton>
                  </RowActions>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal title={editing ? "Edit aarti" : "Add aarti"} onClose={() => setOpen(false)} wide>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (Devanagari) *">
                <TextInput value={form.title_devanagari} onChange={(e) => set("title_devanagari", e.target.value)} placeholder="सुखकर्ता दुःखहर्ता" />
              </Field>
              <Field label="Title (English) *">
                <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Sukhkarta Dukhharta" />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Slug *">
                <TextInput value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="sukhkarta-dukhharta" />
              </Field>
              <Field label="Display order">
                <TextInput type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Field label="Deity">
                <SelectInput value={form.deity} onChange={(e) => set("deity", e.target.value)}>
                  {AARTI_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.labelEn}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Category">
                <SelectInput value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {AARTI_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.labelEn}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Language">
                <SelectInput value={form.language} onChange={(e) => set("language", e.target.value)}>
                  {AARTI_LANGUAGES.map((l) => (
                    <option key={l.id} value={l.id}>{l.labelEn}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Type">
                <SelectInput value={form.type} onChange={(e) => set("type", e.target.value)}>
                  {AARTI_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.labelEn}</option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <Field label="Lyrics (Devanagari) * — never fabricate; paste verified text only">
              <TextArea rows={8} value={form.lyrics} onChange={(e) => set("lyrics", e.target.value)} className="font-gotu" />
            </Field>
            <Field label="Transliteration / Hinglish (optional)">
              <TextArea rows={4} value={form.transliteration} onChange={(e) => set("transliteration", e.target.value)} />
            </Field>
            <Field label="Description">
              <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Source">
                <TextInput value={form.source} onChange={(e) => set("source", e.target.value)} />
              </Field>
              <Field label="Source URL">
                <TextInput value={form.source_url} onChange={(e) => set("source_url", e.target.value)} placeholder="https://…" />
              </Field>
            </div>
            <Field label="Content status">
              <SelectInput value={form.content_status} onChange={(e) => set("content_status", e.target.value)}>
                <option value="verified">Verified</option>
                <option value="needs_verification">Needs verification</option>
                <option value="draft">Draft</option>
              </SelectInput>
            </Field>
            <div className="flex flex-wrap gap-4">
              <Toggle checked={form.published} onChange={(v) => set("published", v)} label="Published" />
              <Toggle checked={form.verified} onChange={(v) => set("verified", v)} label="Verified" />
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
