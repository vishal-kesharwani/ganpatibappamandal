"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO } from "@/data/info";
import { useLiveSite } from "@/lib/public-data";

export default function MandalPage() {
  const { data: site } = useLiveSite();

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24 bg-[#FAF7F2] min-h-screen">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[#7C2D12] font-gotu">About the Mandal</h1>
          <p className="text-[#A8A29E] text-xs mt-1 font-gotu">आमच्या मंडळाबद्दल</p>
        </div>

        <div className="space-y-4">
          {/* Name Card */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 text-center">
            <h2 className="text-lg font-bold text-[#7C2D12] font-gotu">{site.mandalName}</h2>
            <p className="text-[#57534E] text-sm mt-1">{site.location}</p>
            {site.establishedYear > 0 && (
              <p className="text-[#A8A29E] text-xs mt-1">
                Est. {site.establishedYear} · Celebrating {new Date().getFullYear() - site.establishedYear + 1}th Year
              </p>
            )}
          </div>

          {/* About Us */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-2">About Us</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">{site.about}</p>
          </div>

          {/* Our Mission */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-2">Our Mission</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">{site.mission}</p>
          </div>

          {/* Activities */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">Activities</h3>
            <div className="space-y-2">
              {MANDAL_INFO.activities.map((act, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C2D12] shrink-0" />
                  <p className="text-[#57534E] text-sm">{act}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Committee Members */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">Committee Members</h3>
            <div className="space-y-2">
              {MANDAL_INFO.committee.map((member, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#FAF7F2] rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-[#7C2D12] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-[#1C1917] text-sm">{member.name}</p>
                    <p className="text-[#A8A29E] text-[10px]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">Contact</h3>
            <div className="space-y-3">
              {site.contacts.map((contact, i) => (
                <div key={i} className="flex items-center justify-between bg-[#FAF7F2] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7C2D12] flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">{contact.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-[#1C1917] text-sm">{contact.name}</p>
                      <p className="text-[#A8A29E] text-[10px]">{contact.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={`tel:+${contact.phone}`} aria-label={`Call ${contact.name}`}>
                      <svg className="w-5 h-5 text-[#7C2D12]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </a>
                    <a
                      href={`https://wa.me/${contact.phone.replace("+", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${contact.name}`}
                    >
                      <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">Follow Us</h3>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#57534E] text-sm hover:text-[#1C1917] transition-colors"
            >
              <svg className="w-5 h-5 shrink-0 text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
