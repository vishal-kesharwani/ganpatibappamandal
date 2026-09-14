import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function MandalPage() {
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
          {/* Name card */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 text-center">
            <h2 className="text-lg font-bold text-[#7C2D12] font-gotu">{MANDAL_INFO.name}</h2>
            <p className="text-[#57534E] text-sm mt-1">{MANDAL_INFO.location}</p>
            <p className="text-[#A8A29E] text-xs mt-1">Est. {MANDAL_INFO.establishedYear}</p>
          </div>

          {/* About */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-2">About Us</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">{MANDAL_INFO.about}</p>
          </div>

          {/* Mission */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-2">Our Mission</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">{MANDAL_INFO.mission}</p>
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

          {/* Committee */}
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

          {/* Contact + Social */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-3">Contact & Social</h3>
            <div className="space-y-3">
              <a href={`tel:${MANDAL_INFO.contact.phone}`} className="flex items-center gap-2 text-[#57534E] text-sm hover:text-[#1C1917] transition-colors">
                <svg className="w-4 h-4 shrink-0 text-[#7C2D12]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {MANDAL_INFO.contact.phone}
              </a>
              <a href={`mailto:${MANDAL_INFO.contact.email}`} className="flex items-center gap-2 text-[#57534E] text-sm hover:text-[#1C1917] transition-colors">
                <svg className="w-4 h-4 shrink-0 text-[#7C2D12]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {MANDAL_INFO.contact.email}
              </a>
              <a href={`https://wa.me/${MANDAL_INFO.contact.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#57534E] text-sm hover:text-[#1C1917] transition-colors">
                <svg className="w-4 h-4 shrink-0 text-[#7C2D12]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                WhatsApp
              </a>
              <a href={FESTIVAL_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#57534E] text-sm hover:text-[#1C1917] transition-colors">
                <svg className="w-4 h-4 shrink-0 text-[#7C2D12]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
