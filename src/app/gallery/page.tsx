"use client";
import { useState } from "react";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const GALLERY_CATEGORIES = [
  { id: "all", label: "All" }, { id: "ganpati", label: "Ganpati 2026" }, { id: "decoration", label: "Decoration" },
  { id: "aarti", label: "Aarti" }, { id: "events", label: "Events" }, { id: "cultural", label: "Cultural" },
  { id: "behind-scenes", label: "Behind the Scenes" }, { id: "visarjan", label: "Visarjan" }, { id: "previous", label: "Previous Years" },
];

const GALLERY_ITEMS = [
  { id: "1", src: "/ganpati-hero.png", alt: "Ganpati Bappa", category: "ganpati" },
  { id: "2", src: "/mandal-logo.png", alt: "Mandal Logo", category: "decoration" },
  { id: "3", src: "/mandal-name.png", alt: "Mandal Name", category: "events" },
  { id: "4", src: "/ganpati-hero.png", alt: "Ganpati Decoration", category: "decoration" },
  { id: "5", src: "/ganpati-hero.png", alt: "Aarti Time", category: "aarti" },
  { id: "6", src: "/ganpati-hero.png", alt: "Cultural Program", category: "cultural" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = selectedCategory === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-4"><h1 className="text-xl font-bold text-gradient-saffron font-gotu">Photo Gallery</h1><p className="text-cream/40 text-xs mt-1">फोटो गॅलरी</p></div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`shrink-0 px-3 py-1 rounded-full text-[10px] transition-all ${selectedCategory === cat.id ? "bg-saffron text-white" : "bg-card-bg border border-card-border text-cream/40"}`}>{cat.label}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((item) => (
            <button key={item.id} onClick={() => setLightbox(item.src)} className="relative aspect-square rounded-xl overflow-hidden border border-card-border hover:border-saffron/30 transition-all">
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-8"><p className="text-cream/30 text-sm">No photos in this category yet.</p></div>}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-2xl">✕</button>
          <Image src={lightbox} alt="Gallery" width={800} height={600} className="max-w-full max-h-[80vh] object-contain rounded-xl" />
        </div>
      )}
      <BottomNav />
    </>
  );
}
