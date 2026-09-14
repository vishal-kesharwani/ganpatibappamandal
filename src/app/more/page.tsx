import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const moreLinks = [
  {
    href: "/info",
    label: "Ganpati Information",
    sublabel: "माहिती",
    letter: "G",
    color: "bg-maroon/10 text-maroon",
  },
  {
    href: "/visarjan",
    label: "Visarjan Details",
    sublabel: "विसर्जन",
    letter: "V",
    color: "bg-saffron/10 text-saffron",
  },
  {
    href: "/mandal",
    label: "About the Mandal",
    sublabel: "आमच्याबद्दल",
    letter: "M",
    color: "bg-gold/10 text-gold",
  },
  {
    href: "/location",
    label: "Location & Contact",
    sublabel: "स्थान",
    letter: "L",
    color: "bg-success/10 text-success",
  },
  {
    href: "/donation",
    label: "Support / Donate",
    sublabel: "सहकार्य",
    letter: "S",
    color: "bg-maroon/10 text-maroon",
  },
  {
    href: "/announcements",
    label: "Announcements",
    sublabel: "घोषणा",
    letter: "A",
    color: "bg-saffron/10 text-saffron",
  },
];

export default function MorePage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[#1C1917] font-gotu">
            More
          </h1>
          <p className="text-[#A8A29E] text-xs mt-1 font-gotu">अधिक</p>
        </div>

        <div className="space-y-2">
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 bg-white border border-[#E7E5E4] rounded-lg p-4 hover:border-[#D6D3D1] transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${link.color}`}
              >
                <span className="text-sm font-bold font-gotu">
                  {link.letter}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[#1C1917] text-sm font-medium">
                  {link.label}
                </p>
                <p className="text-[#A8A29E] text-[10px] mt-0.5 font-gotu">
                  {link.sublabel}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-[#A8A29E] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="text-[#A8A29E] opacity-30 text-[10px]"
          >
            Admin Access
          </Link>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
