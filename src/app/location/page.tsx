import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function LocationPage() {
  return (
    <>
      <Header />
      <main
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}
      >
        <div className="text-center mb-6">
          <h1
            className="text-xl font-bold font-gotu"
            style={{ color: "#1C1917" }}
          >
            Location & Contact
          </h1>
          <p className="text-xs mt-1 font-gotu" style={{ color: "#A8A29E" }}>
            स्थान
          </p>
        </div>

        <div
          className="bg-white border rounded-lg overflow-hidden mb-4"
          style={{ borderColor: "#E7E5E4" }}
        >
          <div className="p-5 text-center">
            <h2
              className="text-lg font-bold font-gotu"
              style={{ color: "#1C1917" }}
            >
              {MANDAL_INFO.name}
            </h2>
            <p className="text-sm mt-1" style={{ color: "#57534E" }}>
              {MANDAL_INFO.location}
            </p>
            <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
              {MANDAL_INFO.address}
            </p>
          </div>
        </div>

        <div
          className="bg-white border rounded-lg overflow-hidden mb-4"
          style={{ borderColor: "#E7E5E4" }}
        >
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

        <div className="space-y-2">
          <a
            href={FESTIVAL_CONFIG.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border rounded-lg p-3.5 transition-all"
            style={{ borderColor: "#E7E5E4", color: "#1C1917" }}
          >
            <span className="text-sm font-medium">Get Directions</span>
          </a>
          <a
            href={`https://wa.me/${FESTIVAL_CONFIG.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border rounded-lg p-3.5 transition-all"
            style={{ borderColor: "#E7E5E4", color: "#1C1917" }}
          >
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          <a
            href={`tel:${FESTIVAL_CONFIG.phone}`}
            className="flex items-center justify-center gap-2 bg-white border rounded-lg p-3.5 transition-all"
            style={{ borderColor: "#E7E5E4", color: "#1C1917" }}
          >
            <span className="text-sm font-medium">Call Us</span>
          </a>
          <a
            href={FESTIVAL_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border rounded-lg p-3.5 transition-all"
            style={{ borderColor: "#E7E5E4", color: "#1C1917" }}
          >
            <span className="text-sm font-medium">Follow on Instagram</span>
          </a>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
