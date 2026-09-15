"use client";

/** Gallery management — upload to Supabase Storage or attach an image URL. */
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Database } from "@/lib/supabase";
import { supabase, db } from "@/lib/supabase";
import { GALLERY_CATEGORIES } from "@/lib/aarti-meta";
import {
  useTable, useToast, useConfirm, Spinner, EmptyState, MissingTableNotice,
  Badge, Modal, Field, TextInput, SelectInput, SectionHeader, FilterBar,
  PrimaryButton, GhostButton, DangerGhostButton, Toggle, RowActions,
  A_BORDER, A_INK, A_BODY, A_MUTED, A_SURFACE, A_SHADOW_SM,
} from "@/components/admin/ui";

type Photo = Database["public"]["Tables"]["gallery_images"]["Row"];

type GalleryRequest = {
  id: string;
  name: string;
  phone: string | null;
  caption: string | null;
  category: string;
  image_url: string;
  status: string;
  admin_note: string | null;
  created_at: string;
};

const EMPTY = { image_url: "", caption: "", category: "festival", sort_order: 0, published: true };

function RequestsPanel({ onApproved }: { onApproved: () => void }) {
  const { push } = useToast();
  const [requests, setRequests] = useState<GalleryRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/gallery/requests");
    const data = await res.json();
    setRequests(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const visible = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    await fetch("/api/gallery/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: action }),
    });
    push("success", action === "approved" ? "Photo approved and published." : "Photo rejected.");
    load();
    onApproved();
  };

  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}>
      <div className="flex items-center gap-2">
        <h3 className="text-[13px] font-semibold" style={{ color: A_INK }}>User Uploads</h3>
        {pendingCount > 0 && (
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: "#EA580C" }}>
            {pendingCount}
          </span>
        )}
      </div>

      <FilterBar>
        {(["pending", "approved", "rejected", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${filter === s ? "text-white" : ""}`}
            style={filter === s ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </FilterBar>

      {loading ? (
        <Spinner />
      ) : visible.length === 0 ? (
        <p className="py-4 text-center text-[12px]" style={{ color: A_MUTED }}>
          No {filter === "all" ? "" : filter} requests.
        </p>
      ) : (
        <div className="space-y-2">
          {visible.map((req) => (
            <div key={req.id} className="flex gap-3 rounded-xl p-3" style={{ border: `1px solid ${A_BORDER}` }}>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5EDE0]">
                <img src={req.image_url} alt={req.caption || "Request"} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium" style={{ color: A_INK }}>
                  {req.name}{req.phone ? ` · ${req.phone}` : ""}
                </p>
                {req.caption && <p className="truncate text-[11px]" style={{ color: A_MUTED }}>{req.caption}</p>}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <Badge tone="maroon">{req.category}</Badge>
                  <Badge tone={req.status === "approved" ? "green" : req.status === "rejected" ? "red" : "amber"}>
                    {req.status}
                  </Badge>
                </div>
                {req.status === "pending" && (
                  <div className="mt-2 flex gap-1.5">
                    <PrimaryButton onClick={() => handleAction(req.id, "approved")}>Approve</PrimaryButton>
                    <DangerGhostButton onClick={() => handleAction(req.id, "rejected")}>Reject</DangerGhostButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [dragOver, setDragOver] = useState(false);

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

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await uploadFile(file);
    }
  }, []);

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
    <div className="space-y-4">
      <SectionHeader
        title="Gallery"
        description={`${table.rows.length} photo${table.rows.length !== 1 ? "s" : ""} in gallery`}
        action={<PrimaryButton onClick={startAdd}>+ Add photo</PrimaryButton>}
      />

      <RequestsPanel onApproved={() => table.reload()} />

      <FilterBar>
        <button
          className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${catFilter === "all" ? "text-white" : ""}`}
          style={catFilter === "all" ? { backgroundColor: "#7C2D12", color: "white" } : { color: A_BODY }}
          onClick={() => setCatFilter("all")}
        >
          All
        </button>
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${catFilter === c.id ? "text-white" : ""}`}
            style={catFilter === c.id ? { backgroundColor: "#B45309", color: "white" } : { color: A_BODY }}
            onClick={() => setCatFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </FilterBar>

      {visible.length === 0 ? (
        <EmptyState
          title="No photos"
          hint="Upload festival photos — the public gallery updates automatically."
          action={<PrimaryButton onClick={startAdd}>+ Add photo</PrimaryButton>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-xl transition-all duration-150 hover:shadow-md"
              style={{
                backgroundColor: A_SURFACE,
                border: `1px solid ${A_BORDER}`,
                boxShadow: A_SHADOW_SM,
                opacity: p.published ? 1 : 0.6,
              }}
            >
              <div className="relative aspect-square w-full bg-[#F5EDE0]">
                <img src={p.image_url} alt={p.caption || "Gallery photo"} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-2 p-3">
                <p className="truncate text-[12px] font-medium" style={{ color: A_INK }}>
                  {p.caption || "Untitled"}
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge tone="maroon">{p.category}</Badge>
                  <Badge tone={p.published ? "green" : "gray"}>{p.published ? "Published" : "Hidden"}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <GhostButton onClick={() => startEdit(p)}>Edit</GhostButton>
                  <GhostButton onClick={() => togglePublished(p)}>{p.published ? "Hide" : "Show"}</GhostButton>
                  <GhostButton onClick={() => move(p, -1)}>↑</GhostButton>
                  <GhostButton onClick={() => move(p, 1)}>↓</GhostButton>
                  <DangerGhostButton onClick={() => remove(p)}>Delete</DangerGhostButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <Modal title={editing ? "Edit photo" : "Add photo"} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            {/* Drag-and-drop zone */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                dragOver ? "border-[#7C2D12] bg-[#7C2D1208]" : "border-stone-200 bg-stone-50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <p className="text-[13px]" style={{ color: A_MUTED }}>Uploading…</p>
                </div>
              ) : (
                <>
                  <p className="text-[13px] font-medium" style={{ color: A_INK }}>Drop an image here</p>
                  <p className="mt-1 text-[11px]" style={{ color: A_MUTED }}>or click below to browse</p>
                  <label className="mt-3 cursor-pointer rounded-lg px-4 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#7C2D12" }}>
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void uploadFile(f);
                      }}
                    />
                  </label>
                </>
              )}
            </div>
            <Field label="…or paste image URL">
              <TextInput value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://…" />
            </Field>
            {form.image_url && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#F5EDE0]" style={{ border: `1px solid ${A_BORDER}` }}>
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
