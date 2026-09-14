import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const moreLinks = [
  { href: "/info", label: "Ganpati Information", sublabel: "माहिती", icon: "ℹ️" },
  { href: "/visarjan", label: "Visarjan Details", sublabel: "विसर्जन", icon: "🌊" },
  { href: "/mandal", label: "About the Mandal", sublabel: "आमच्याबद्दल", icon: "🏛️" },
  { href: "/location", label: "Location & Contact", sublabel: "स्थान", icon: "📍" },
  { href: "/donation", label: "Support / Donate", sublabel: "सहकार्य", icon: "💰" },
  { href: "/announcements", label: "Announcements", sublabel: "घोषणा", icon: "📢" },
];

export default function MorePage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">More</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">अधिक</p>
        </div>

        <div className="space-y-2">
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 surface-card p-4 hover:border-saffron/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-saffron/10 flex items-center justify-center shrink-0">
                <span className="text-2xl">{link.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-cream font-bold text-sm">{link.label}</p>
                <p className="text-cream-dim text-[10px] mt-0.5 font-gotu">{link.sublabel}</p>
              </div>
              <svg className="w-5 h-5 text-cream-dim" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Hidden admin link - accessible via keyboard shortcut or URL */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="text-cream-dim/30 text-[10px] hover:text-cream-dim transition-colors"
          >
            Admin Access
          </Link>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
