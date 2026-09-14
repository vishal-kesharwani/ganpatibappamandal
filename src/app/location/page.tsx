import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function LocationPage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">Location & Contact</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">स्थान</p>
        </div>

        {/* Location card */}
        <div className="surface-card overflow-hidden mb-4">
          <div className="p-5 text-center">
            <h2 className="text-lg font-bold text-cream font-gotu">{MANDAL_INFO.name}</h2>
            <p className="text-cream-muted text-sm mt-1">{MANDAL_INFO.location}</p>
            <p className="text-cream-dim text-xs mt-1">{MANDAL_INFO.address}</p>
          </div>
        </div>

        {/* Map */}
        <div className="surface-card overflow-hidden mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d73.0!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEyJzAwLjAiTiA3M8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <a
            href={FESTIVAL_CONFIG.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 surface-card p-3.5 hover:border-saffron/30 transition-all"
          >
            <span className="text-lg">🗺️</span>
            <span className="text-cream text-sm font-medium">Get Directions</span>
          </a>
          <a
            href={`https://wa.me/${FESTIVAL_CONFIG.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 rounded-2xl p-3.5 hover:bg-green-700 transition-all"
          >
            <span className="text-lg">💬</span>
            <span className="text-white text-sm font-medium">WhatsApp</span>
          </a>
          <a
            href={`tel:${FESTIVAL_CONFIG.phone}`}
            className="flex items-center justify-center gap-2 surface-card p-3.5 hover:border-saffron/30 transition-all"
          >
            <span className="text-lg">📞</span>
            <span className="text-cream text-sm font-medium">Call Us</span>
          </a>
          <a
            href={FESTIVAL_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 surface-card p-3.5 hover:border-pink-500/30 transition-all"
          >
            <span className="text-lg">📸</span>
            <span className="text-cream text-sm font-medium">Follow on Instagram</span>
          </a>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
