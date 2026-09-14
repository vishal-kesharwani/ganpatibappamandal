import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { ANNOUNCEMENTS } from "@/data/announcements";

export default function AnnouncementsPage() {
  const sorted = [...ANNOUNCEMENTS].sort((a, b) => { const p = { important: 0, event: 1, general: 2 }; return p[a.priority] - p[b.priority]; });
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6"><h1 className="text-xl font-bold text-gradient-saffron font-gotu">Announcements</h1><p className="text-cream/40 text-xs mt-1">जाहिराती</p></div>
        <div className="space-y-3">
          {sorted.map((ann) => (
            <div key={ann.id} className={`bg-card-bg border rounded-xl p-4 ${ann.priority === "important" ? "border-red/30" : ann.priority === "event" ? "border-saffron/30" : "border-card-border"}`}>
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">{ann.priority === "important" ? "🔔" : ann.priority === "event" ? "📅" : "📢"}</span>
                <div className="flex-1"><p className="text-cream font-bold text-sm font-gotu">{ann.titleMarathi}</p><p className="text-cream/40 text-xs font-gotu mt-1">{ann.descriptionMarathi}</p><p className="text-cream/20 text-[10px] mt-2">{ann.date}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
