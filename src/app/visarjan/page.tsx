import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ShareButton from "@/components/ShareButton";
import { VISARJAN_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function VisarjanPage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6"><h1 className="text-xl font-bold text-gradient-saffron font-gotu">Ganpati Visarjan</h1><p className="text-cream/40 text-xs mt-1">विसर्जन</p></div>
        <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden mb-4">
          <div className="gradient-sacred px-4 py-4 text-center"><p className="text-cream/60 text-xs">{VISARJAN_INFO.dateMarathi}</p><p className="text-cream text-2xl font-bold font-gotu mt-1">🌊 Visarjan Day</p></div>
        </div>
        <div className="space-y-3">
          <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Schedule</h3><div className="space-y-1"><div className="flex justify-between"><span className="text-cream/60 text-sm">Procession Starts</span><span className="text-cream font-bold">{VISARJAN_INFO.processionStart}</span></div><div className="flex justify-between"><span className="text-cream/60 text-sm">Visarjan</span><span className="text-cream font-bold">{VISARJAN_INFO.time}</span></div></div></div>
          <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Procession Route</h3><div className="space-y-2">{VISARJAN_INFO.route.map((point, i) => (<div key={i} className="flex items-start gap-3"><div className="flex flex-col items-center"><div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-saffron" : i === VISARJAN_INFO.route.length - 1 ? "bg-red" : "bg-card-border"}`} />{i < VISARJAN_INFO.route.length - 1 && <div className="w-px h-6 bg-card-border" />}</div><p className="text-cream/70 text-sm pt-0.5">{point}</p></div>))}</div></div>
          <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Meeting Point</h3><p className="text-cream/70 text-sm">{VISARJAN_INFO.meetingPoint}</p></div>
          <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Important Instructions</h3><div className="space-y-1.5">{VISARJAN_INFO.instructions.map((inst, i) => (<div key={i} className="flex items-start gap-2"><span className="text-saffron text-xs mt-0.5">•</span><p className="text-cream/60 text-sm">{inst}</p></div>))}</div></div>
          <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Emergency Contact</h3><a href={`tel:${VISARJAN_INFO.emergencyContact}`} className="text-cream text-sm">📞 {VISARJAN_INFO.emergencyContact}</a></div>
        </div>
        <div className="mt-6"><ShareButton text={`Visarjan - ${VISARJAN_INFO.dateMarathi}\nProcession: ${VISARJAN_INFO.processionStart}\n${FESTIVAL_CONFIG.name}`} /></div>
      </div>
      <BottomNav />
    </>
  );
}
