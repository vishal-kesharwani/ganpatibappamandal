import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO, CONTACTS } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function LocationPage() {
  return (
    <>
      <Header />
      <main
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[#1C1917] font-gotu">
            Connect With Us
          </h1>
          <p className="text-xs text-[#A8A29E] font-gotu mt-1">संपर्क</p>
        </div>

        {/* Mandal Info Card */}
        <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 text-center mb-6">
          <h2 className="text-lg font-bold font-gotu text-[#7C2D12]">
            {MANDAL_INFO.name}
          </h2>
          <p className="text-sm text-[#57534E] mt-1">{MANDAL_INFO.location}</p>
          <p className="text-xs text-[#A8A29E] mt-1">{MANDAL_INFO.address}</p>
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">
            Contact
          </h3>
          <div className="space-y-3">
            {CONTACTS.map((contact) => (
              <div
                key={contact.phone}
                className="bg-white border border-[#E7E5E4] rounded-lg p-4"
              >
                <p className="text-sm font-medium text-[#1C1917]">
                  {contact.name}
                </p>
                <p className="text-xs text-[#A8A29E] mt-1">{contact.phone}</p>
                <div className="flex gap-2 mt-3">
                  <a
                    href={`https://wa.me/${contact.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] text-white rounded-lg px-4 py-2 text-xs font-medium"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:+${contact.phone}`}
                    className="flex-1 text-center bg-white border border-[#E7E5E4] rounded-lg px-4 py-2 text-xs font-medium text-[#1C1917]"
                  >
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="mb-6">
          <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">
            Follow Us
          </h3>
          <a
            href={FESTIVAL_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#E7E5E4] rounded-lg p-4 flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#7C2D12"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <span className="text-sm font-medium text-[#1C1917]">
              Follow on Instagram
            </span>
          </a>
        </div>

        {/* Find Us Section */}
        <div className="mb-6">
          <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">
            Find Us
          </h3>
          <div className="bg-white border border-[#E7E5E4] rounded-lg overflow-hidden mb-3">
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
          <div className="flex gap-2">
            <a
              href={FESTIVAL_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-white border border-[#E7E5E4] rounded-lg px-4 py-3 text-xs font-medium text-[#1C1917]"
            >
              Get Directions
            </a>
            <a
              href={FESTIVAL_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-white border border-[#E7E5E4] rounded-lg px-4 py-3 text-xs font-medium text-[#1C1917]"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
