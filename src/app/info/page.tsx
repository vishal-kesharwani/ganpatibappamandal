import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { GANPATI_INFO } from "@/data/info";

export default function InfoPage() {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="text-center mb-6"><h1 className="text-xl font-bold text-gradient-saffron font-gotu">Ganpati Information</h1><p className="text-cream/40 text-xs mt-1">गणपती माहिती</p></div>
        <div className="space-y-3">
          {GANPATI_INFO.map((info) => (
            <div key={info.id} className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
              <div className="px-4 py-3 gradient-sacred"><div className="flex items-center gap-2"><span className="text-2xl">{info.icon}</span><div><h2 className="text-cream font-bold font-gotu">{info.titleMarathi}</h2><p className="text-cream/50 text-[10px]">{info.title}</p></div></div></div>
              <div className="p-4 space-y-3">
                <div><p className="text-gold text-[10px] uppercase tracking-wider mb-1">मराठी</p><p className="text-cream/70 text-sm font-gotu leading-relaxed">{info.contentMarathi}</p></div>
                <div className="border-t border-card-border/30 pt-3"><p className="text-cream/30 text-[10px] uppercase tracking-wider mb-1">English</p><p className="text-cream/40 text-xs leading-relaxed">{info.content}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
