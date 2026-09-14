import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MANDAL_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function MandalPage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">About the Mandal</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">आमच्या मंडळाबद्दल</p>
        </div>

        <div className="space-y-4">
          {/* Name card */}
          <div className="surface-card p-5 text-center">
            <h2 className="text-lg font-bold text-gradient-saffron font-gotu">{MANDAL_INFO.name}</h2>
            <p className="text-cream-muted text-sm mt-1">{MANDAL_INFO.location}</p>
            <p className="text-cream-dim text-xs mt-1">Est. {MANDAL_INFO.establishedYear}</p>
          </div>

          {/* About */}
          <div className="surface-card p-4">
            <h3 className="text-overline text-gold mb-2">About Us</h3>
            <p className="text-cream-muted text-sm leading-relaxed">{MANDAL_INFO.about}</p>
          </div>

          {/* Mission */}
          <div className="surface-card p-4">
            <h3 className="text-overline text-gold mb-2">Our Mission</h3>
            <p className="text-cream-muted text-sm leading-relaxed">{MANDAL_INFO.mission}</p>
          </div>

          {/* Activities */}
          <div className="surface-card p-4">
            <h3 className="text-overline text-gold mb-3">Activities</h3>
            <div className="space-y-2">
              {MANDAL_INFO.activities.map((act, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                  <p className="text-cream-muted text-sm">{act}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Committee */}
          <div className="surface-card p-4">
            <h3 className="text-overline text-gold mb-3">Committee Members</h3>
            <div className="space-y-2">
              {MANDAL_INFO.committee.map((member, i) => (
                <div key={i} className="flex items-center gap-3 bg-cream/5 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-cream text-sm">{member.name}</p>
                    <p className="text-cream-dim text-[10px]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div className="surface-card p-4">
            <h3 className="text-overline text-gold mb-3">Contact & Social</h3>
            <div className="space-y-3">
              <a href={`tel:${MANDAL_INFO.contact.phone}`} className="flex items-center gap-2 text-cream-muted text-sm hover:text-cream transition-colors">
                📞 {MANDAL_INFO.contact.phone}
              </a>
              <a href={`mailto:${MANDAL_INFO.contact.email}`} className="flex items-center gap-2 text-cream-muted text-sm hover:text-cream transition-colors">
                📧 {MANDAL_INFO.contact.email}
              </a>
              <a href={`https://wa.me/${MANDAL_INFO.contact.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream-muted text-sm hover:text-cream transition-colors">
                💬 WhatsApp
              </a>
              <a href={FESTIVAL_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream-muted text-sm hover:text-pink-400 transition-colors">
                📸 Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
