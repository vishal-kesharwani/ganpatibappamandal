"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Download, Share2, Upload, X, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { useLiveGallery } from "@/lib/public-data";

const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "festival", label: "Festival" },
  { id: "ganpati", label: "Ganpati" },
  { id: "aarti", label: "Aarti" },
  { id: "events", label: "Events" },
  { id: "mandal", label: "Mandal" },
  { id: "visarjan", label: "Visarjan" },
  { id: "other", label: "Other" },
];

const REQUEST_CATEGORIES = [
  { id: "festival", label: "Festival" },
  { id: "ganpati", label: "Ganpati" },
  { id: "aarti", label: "Aarti" },
  { id: "events", label: "Events" },
  { id: "mandal", label: "Mandal" },
  { id: "visarjan", label: "Visarjan" },
  { id: "other", label: "Other" },
];

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { data: items } = useLiveGallery();

  // Request form state
  const [showRequest, setShowRequest] = useState(false);
  const [reqForm, setReqForm] = useState({ name: "", phone: "", caption: "", category: "other" });
  const [reqFile, setReqFile] = useState<File | null>(null);
  const [reqPreview, setReqPreview] = useState<string | null>(null);
  const [reqBusy, setReqBusy] = useState(false);
  const [reqDone, setReqDone] = useState(false);
  const [reqError, setReqError] = useState("");

  const filtered =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;
  const hasPrev = lightboxIndex !== null && lightboxIndex > 0;
  const hasNext = lightboxIndex !== null && lightboxIndex < filtered.length - 1;

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : null));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : null));
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") setLightboxIndex(null);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goPrev, goNext]);

  const handleDownload = async (src: string, alt: string) => {
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${alt.replace(/[^a-zA-Z0-9]/g, "-") || "gallery-photo"}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  };

  const handleWhatsAppShare = (src: string, alt: string) => {
    const text = `${alt || "Photo from Ganpati Mahotsav 2026"} - OM SAI MITRA MANDAL`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + src)}`, "_blank");
  };

  const handleRequestSubmit = async () => {
    if (!reqForm.name.trim() || !reqFile) return;

    if (reqFile.size > MAX_FILE_SIZE) {
      setReqError("File too large. Maximum size is 3 MB.");
      return;
    }

    setReqBusy(true);
    setReqError("");
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const ext = reqFile.name.split(".").pop() || "jpg";
      const path = `requests/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("gallery")
        .upload(path, reqFile, { contentType: reqFile.type || "image/jpeg", upsert: false });

      if (uploadErr) {
        setReqError("Upload failed. Please try again.");
        setReqBusy(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

      const res = await fetch("/api/gallery/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reqForm.name.trim(),
          phone: reqForm.phone.trim() || null,
          caption: reqForm.caption.trim() || null,
          category: reqForm.category,
          image_url: urlData.publicUrl,
        }),
      });

      if (res.ok) {
        setReqDone(true);
      } else {
        setReqError("Submission failed. Please try again.");
      }
    } catch {
      setReqError("Something went wrong. Please try again.");
    }
    setReqBusy(false);
  };

  return (
    <>
      <Header />
      <main
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}
      >
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold font-gotu" style={{ color: "#1C1917" }}>
            Photo Gallery
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            फोटो गॅलरी
          </p>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              className="chip"
              data-active={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-square rounded-lg overflow-hidden border hover:opacity-90 transition-all"
              style={{ borderColor: "#E7E5E4" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                unoptimized={item.src.startsWith("http")}
              />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm" style={{ color: "#A8A29E" }}>
              No photos in this category yet.
            </p>
          </div>
        )}

        {/* Request to Upload button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { setShowRequest(true); setReqDone(false); setReqError(""); }}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: "#7C2D12" }}
          >
            <Upload size={16} />
            Request to Upload
          </button>
          <p className="text-[10px] mt-2" style={{ color: "#A8A29E" }}>
            Submit your photos — admin will review and add them
          </p>
        </div>
      </main>

      {/* Lightbox with prev/next + download + share */}
      {lightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col" style={{ backgroundColor: "rgba(0,0,0,0.97)" }}>
          {/* Top bar — counter + close */}
          <div className="flex items-center justify-between px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <p className="text-[13px] font-medium text-white/70">
              {lightboxIndex + 1} / {filtered.length}
            </p>
            <button
              onClick={() => setLightboxIndex(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image area with prev/next */}
          <div className="relative flex-1 flex items-center justify-center min-h-0">
            {/* Prev button */}
            {hasPrev && (
              <button
                onClick={goPrev}
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all"
                aria-label="Previous photo"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image */}
            <div className="px-14 flex items-center justify-center w-full h-full">
              <Image
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg select-none"
                unoptimized={lightboxItem.src.startsWith("http")}
                draggable={false}
              />
            </div>

            {/* Next button */}
            {hasNext && (
              <button
                onClick={goNext}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all"
                aria-label="Next photo"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom actions — Download + WhatsApp */}
          <div className="flex items-center justify-center gap-3 px-4 pb-6 pt-3">
            <button
              onClick={() => handleDownload(lightboxItem.src, lightboxItem.alt)}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Download size={18} />
              Download
            </button>
            <button
              onClick={() => handleWhatsAppShare(lightboxItem.src, lightboxItem.alt)}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <Share2 size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Request to Upload modal */}
      {showRequest && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center" onClick={() => setShowRequest(false)}>
          <div
            className="w-full max-w-lg bg-[#FAF7F2] rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {reqDone ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-3" style={{ color: "#047857" }} />
                <h2 className="font-gotu text-lg font-bold" style={{ color: "#1C1917" }}>Photo Submitted!</h2>
                <p className="text-sm mt-2" style={{ color: "#57534E" }}>
                  Admin will review your photo and add it to the gallery. Thank you!
                </p>
                <button
                  onClick={() => { setShowRequest(false); setReqDone(false); setReqForm({ name: "", phone: "", caption: "", category: "other" }); setReqFile(null); setReqPreview(null); setReqError(""); }}
                  className="mt-6 rounded-lg px-6 py-2.5 text-sm font-medium text-white"
                  style={{ backgroundColor: "#7C2D12" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-gotu text-lg font-bold" style={{ color: "#1C1917" }}>
                    Submit a Photo
                  </h2>
                  <button onClick={() => setShowRequest(false)} className="text-[#A8A29E] hover:text-[#57534E]">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Photo upload */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "#78716C" }}>
                      Photo * (max 3 MB)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          if (f.size > MAX_FILE_SIZE) {
                            setReqError("File too large. Maximum size is 3 MB.");
                            e.target.value = "";
                            return;
                          }
                          setReqError("");
                          setReqFile(f);
                          setReqPreview(URL.createObjectURL(f));
                        }
                      }}
                      className="w-full text-sm"
                      style={{ color: "#44403C" }}
                    />
                    {reqPreview && (
                      <div className="mt-2 relative w-full aspect-video rounded-lg overflow-hidden">
                        <Image src={reqPreview} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "#78716C" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reqForm.name}
                      onChange={(e) => setReqForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Rahul Patil"
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "#D6D3D1", backgroundColor: "#FFFBF5", color: "#1C1917" }}
                    />
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "#78716C" }}>
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={reqForm.phone}
                      onChange={(e) => setReqForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 ..."
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "#D6D3D1", backgroundColor: "#FFFBF5", color: "#1C1917" }}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "#78716C" }}>
                      Category
                    </label>
                    <select
                      value={reqForm.category}
                      onChange={(e) => setReqForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "#D6D3D1", backgroundColor: "#FFFBF5", color: "#1C1917" }}
                    >
                      {REQUEST_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "#78716C" }}>
                      Caption (optional)
                    </label>
                    <input
                      type="text"
                      value={reqForm.caption}
                      onChange={(e) => setReqForm((f) => ({ ...f, caption: e.target.value }))}
                      placeholder="e.g. Day 3 evening aarti"
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "#D6D3D1", backgroundColor: "#FFFBF5", color: "#1C1917" }}
                    />
                  </div>

                  {/* Error */}
                  {reqError && (
                    <p className="text-[12px] font-medium" style={{ color: "#DC2626" }}>{reqError}</p>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleRequestSubmit}
                    disabled={!reqForm.name.trim() || !reqFile || reqBusy}
                    className="w-full rounded-lg py-3 text-sm font-medium text-white transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: "#7C2D12" }}
                  >
                    {reqBusy ? "Submitting..." : "Submit Photo"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!lightboxItem && !showRequest && <BottomNav />}
    </>
  );
}
