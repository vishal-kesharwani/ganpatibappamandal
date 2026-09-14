"use client";

/** Gallery management — upload to Supabase Storage or attach an image URL. */
import { useState } from "react";
import Image from "next/image";
import type { Database } from "@/lib/supabase";
import { supabase, db } from "@/lib/supabase";
import { GALLERY_CATEGORIES } from "@/lib/aarti-meta";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, SelectInput,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED,
} from "@/components/admin/ui";

type Photo = Database["public"]["Tables"]["gallery_images"]["Row"];

const EMPTY = { image_url: "", caption: "", category: "festival", sort_order: 0, published: true };

export default function GallerySection() {
  const { push } = useToast();
  const { confirm, node: confirmNode } = useConfirm();
  const table = useTable<Photo>("gallery_images", [
    { column: "sort_order", ascending: true },
    { column: "created_at", ascending: false },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Photo | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [catFilter, setCatFilter] = useState("all");

  const set = (k: string, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const startAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, sort_order: table.rows.length });
    setOpen(true);
  };

  const startEdit = (p: Photo) => {
    setEditing(p);
    setForm({
      image_url: p.image_url,
      caption: p.caption || "",
      category: p.category,
      sort_order: p.sort_order,
      published: p.published,
    });
    setOpen(true);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("gallery").upload(path, file, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
      if (error) {
        push("error", `Upload failed: ${error.message}. Run the migration to create the gallery bucket.`);
        return null;
      }
      const { data } = supabase.storage.from("gallery").getPublicUrl(path);
      set("image_url", data.publicUrl);
      push("success", "Image uploaded.");
      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.image_url.trim()) {
      push("error", "Upload an image or paste an image URL first.");
      return;
    }
    setBusy(true);
    const values = {
      image_url: form.image_url.trim(),
      storage_path: null,
      caption: form.caption.trim() || null,
      category: form.category,
      sort_order: Number(form.sort_order) || 0,
      published: form.published,
    };
    const res = editing ? await table.update(editing.id, values) : await table.create(values);
    setBusy(false);
    push(res.ok ? "success" : "error", res.message);
    if (res.ok) setOpen(false);
  };

  const remove = async (p: Photo) => {
    if (!(await confirm("Delete this photo from the gallery?"))) return;
    const res = await table.remove(p.id);
    push(res.ok ? "success" : "error", res.message);
  };

  const togglePublished = async (p: Photo) => {
    const { error } = await db.from("gallery_images").update({ published: !p.published }).eq("id", p.id);
    if (error) push("error", error.message);
    else {
      push("success", p.published ? "Unpublished." : "Published.");
      table.reload();
    }
  };

  const move = async (p: Photo, dir: -1 | 1) => {
    const sorted = [...table.rows].sort((x, y) => x.sort_order - y.sort_order);
    const other = sorted[sorted.findIndex((x) => x.id === p.id) + dir];
    if (!other) return;
    await db.from("gallery_images").update({ sort_order: other.sort_order }).eq("id", p.id);
    await db.from("gallery_images").update({ sort_order: p.sort_order }).eq("id", other.id);
    table.reload();
  };

  if (table.loading) return <Spinner />;
  if (table.missingTable) return <MissingTableNotice tables="gallery_images" />;
  if (table.error) return <EmptyState title="Could not load gallery" hint={table.error} action={<GhostButton onClick={table.reload}>Retry</GhostButton>} />;

  const visible = catFilter === "all" ? table.rows : table.rows.filter((p) => p.category === catFilter);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white p-3" style={{ border: `1px solid ${A_BORDER}` }}>
        <SelectInput value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Filter by category" style={{ maxWidth: 220 }}>
          <option value="all">All categories</option>
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </SelectInput>
        <span className="flex-1" />
        <PrimaryButton onClick={startAdd}>+ Add photo</PrimaryButton>
      </div>

      {visible.length === 0 && (
        <EmptyState title="No photos" hint="Upload festival photos — the public gallery updates automatically." action={<PrimaryButton onClick={startAdd}>+ Add photo</PrimaryButton>} />
      )}

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-lg bg-white" style={{ border: `1px solid ${A_BORDER}`, opacity: p.published ? 1 : 0.6 }}>
            <div className="relative aspect-square w-full bg-[#F5EDE0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.caption || "Gallery photo"} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs font-medium" style={{ color: A_INK }}>
                {p.caption || "Untitled"}
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge tone="maroon">{p.category}</Badge>
                <Badge tone={p.published ? "green" : "gray"}>{p.published ? "Published" : "Hidden"}</Badge>
              </div>
              <RowActions>
                <GhostButton onClick={() => startEdit(p)}>Edit</GhostButton>
                <GhostButton onClick={() => togglePublished(p)}>{p.published ? "Hide" : "Show"}</GhostButton>
                <GhostButton onClick={() => move(p, -1)} aria-label="Move up">↑</GhostButton>
                <GhostButton onClick={() => move(p, 1)} aria-label="Move down">↓</GhostButton>
                <DangerGhostButton onClick={() => remove(p)}>Delete</DangerGhostButton>
              </RowActions>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? "Edit photo" : "Add photo"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <Field label="Upload image (Supabase Storage)">
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadFile(f);
                }}
                className="w-full text-sm"
                style={{ color: A_BODY }}
              />
              {uploading && <p className="mt-1 text-xs" style={{ color: A_MUTED }}>Uploading…</p>}
            </Field>
            <Field label="…or image URL">
              <TextInput value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://…" />
            </Field>
            {form.image_url && (
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-[#F5EDE0]" style={{ border: `1px solid ${A_BORDER}` }}>
                <Image src={form.image_url} alt="Preview" fill className="object-cover" unoptimized />
              </div>
            )}
            <Field label="Caption">
              <TextInput value={form.caption} onChange={(e) => set("caption", e.target.value)} placeholder="Evening aarti, Day 3" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <SelectInput value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {GALLERY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Display order">
                <TextInput type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
              </Field>
            </div>
            <Toggle checked={form.published} onChange={(v) => set("published", v)} label="Published" />
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
              <PrimaryButton onClick={save} disabled={busy || uploading}>{busy ? "Saving…" : editing ? "Update" : "Add"}</PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
      {confirmNode}
    </div>
  );
}
