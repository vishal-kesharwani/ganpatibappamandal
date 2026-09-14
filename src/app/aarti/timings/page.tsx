import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const AARTI_TIMINGS = [
  { time: "06:00", label: "Kakad Aarti", labelMarathi: "काकड आरती", period: "Morning", icon: "🌅" },
  { time: "12:30", label: "Madhyan Aarti", labelMarathi: "माध्यान्ह आरती", period: "Afternoon", icon: "☀️" },
  { time: "20:30", label: "Sandhyakalin Aarti", labelMarathi: "संध्याकाळची आरती", period: "Evening", icon: "🌇" },
  { time: "22:00", label: "Sheja Aarti", labelMarathi: "शेज आरती", period: "Night", icon: "🌙" },
];

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function AartiTimingsPage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">Aarti Timings</h1>
          <p className="text-cream/40 text-xs mt-1">आरती वेळापत्रक</p>
        </div>
        <div className="space-y-3">
          {AARTI_TIMINGS.map((aarti, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center shrink-0"><span className="text-xl">{aarti.icon}</span></div>
                <div className="flex-1">
                  <p className="text-cream/40 text-[10px] uppercase">{aarti.period}</p>
                  <p className="text-cream font-bold font-gotu">{aarti.labelMarathi}</p>
                  <p className="text-cream/30 text-[10px]">{aarti.label}</p>
                </div>
                <p className="text-gold font-bold font-gotu text-lg">{formatTime(aarti.time)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-card-bg border border-card-border rounded-xl p-4 text-center">
          <p className="text-cream/40 text-xs">All timings may change. Please confirm with the Mandal.</p>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
