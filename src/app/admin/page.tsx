"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";
import { DAILY_SCHEDULES } from "@/data/schedule";
import { AARTIS } from "@/data/aartis";
import { ANNOUNCEMENTS } from "@/data/announcements";

type Tab = "overview" | "days" | "aarti" | "events" | "announcements" | "settings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "ganpati2026") { setIsAuthenticated(true); }
    else { alert("Incorrect password!"); }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h1 className="text-xl font-bold text-cream font-gotu mb-2">Admin Panel</h1>
            <p className="text-cream/40 text-sm mb-6">Please enter the password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-cream text-center mb-4 focus:outline-none focus:border-saffron" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            <button onClick={handleLogin} className="w-full gradient-saffron text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Login</button>
            <p className="text-cream/20 text-[10px] mt-4">Demo password: ganpati2026</p>
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "days", label: "Days", icon: "📅" },
    { id: "aarti", label: "Aartis", icon: "🪔" },
    { id: "events", label: "Events", icon: "🎭" },
    { id: "announcements", label: "Notices", icon: "📢" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-gradient-saffron font-gotu">Admin Dashboard</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-cream/30 text-xs hover:text-red transition-colors">Logout</button>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-3 mb-4">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] transition-all ${activeTab === tab.id ? "gradient-saffron text-white font-bold" : "bg-card-bg border border-card-border text-cream/50"}`}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Mandal</h3><p className="text-cream font-bold font-gotu">{FESTIVAL_CONFIG.name}</p><p className="text-cream/40 text-xs">{FESTIVAL_CONFIG.location}</p></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg border border-card-border rounded-xl p-3 text-center"><p className="text-2xl font-bold text-gradient-saffron font-gotu">7</p><p className="text-cream/40 text-[10px]">Days</p></div>
              <div className="bg-card-bg border border-card-border rounded-xl p-3 text-center"><p className="text-2xl font-bold text-gradient-saffron font-gotu">{AARTIS.length}</p><p className="text-cream/40 text-[10px]">Aartis</p></div>
              <div className="bg-card-bg border border-card-border rounded-xl p-3 text-center"><p className="text-2xl font-bold text-gradient-saffron font-gotu">{DAILY_SCHEDULES.reduce((a, s) => a + s.events.length, 0)}</p><p className="text-cream/40 text-[10px]">Events</p></div>
              <div className="bg-card-bg border border-card-border rounded-xl p-3 text-center"><p className="text-2xl font-bold text-gradient-saffron font-gotu">{ANNOUNCEMENTS.length}</p><p className="text-cream/40 text-[10px]">Notices</p></div>
            </div>
          </div>
        )}

        {activeTab === "days" && <div className="space-y-2">{FESTIVAL_DAYS.map((day) => (<div key={day.day} className="bg-card-bg border border-card-border rounded-xl p-3 flex items-center justify-between"><div><p className="text-cream font-bold text-sm">Day {day.day}</p><p className="text-cream/40 text-[10px]">{day.theme}</p></div><span className="text-cream/30 text-xs font-gotu">{day.dateMarathi}</span></div>))}</div>}

        {activeTab === "aarti" && <div className="space-y-2">{AARTIS.map((a) => (<div key={a.id} className="bg-card-bg border border-card-border rounded-xl p-3"><p className="text-cream font-bold text-sm">{a.titleMarathi}</p><p className="text-cream/30 text-[10px]">{a.categoryMarathi}</p></div>))}</div>}

        {activeTab === "events" && <div className="space-y-3">{DAILY_SCHEDULES.map((s) => (<div key={s.day}><p className="text-cream text-sm font-bold mb-2">Day {s.day}</p><div className="space-y-1">{s.events.slice(0, 3).map((e) => (<div key={e.id} className="bg-card-bg border border-card-border rounded-lg p-2 flex items-center justify-between"><p className="text-cream text-xs">{e.titleMarathi}</p><p className="text-cream/30 text-[10px] font-mono">{e.time}</p></div>))}{s.events.length > 3 && <p className="text-cream/20 text-[10px] text-center">+{s.events.length - 3} more</p>}</div></div>))}</div>}

        {activeTab === "announcements" && <div className="space-y-2">{ANNOUNCEMENTS.map((a) => (<div key={a.id} className="bg-card-bg border border-card-border rounded-xl p-3 flex items-start justify-between gap-2"><div><p className="text-cream font-bold text-sm">{a.titleMarathi}</p><p className="text-cream/30 text-[10px] mt-1">{a.descriptionMarathi}</p></div><span className={`shrink-0 text-[9px] px-2 py-0.5 rounded-full ${a.priority === "important" ? "bg-red/20 text-red" : "bg-saffron/20 text-saffron"}`}>{a.priority}</span></div>))}</div>}

        {activeTab === "settings" && (
          <div className="space-y-3">
            <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Mandal Settings</h3><div className="space-y-2">
              <div><label className="text-cream/40 text-[10px]">Name</label><input type="text" defaultValue={FESTIVAL_CONFIG.name} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
              <div><label className="text-cream/40 text-[10px]">Location</label><input type="text" defaultValue={FESTIVAL_CONFIG.location} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
            </div></div>
            <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Festival Dates</h3><div className="space-y-2">
              <div><label className="text-cream/40 text-[10px]">Start Date</label><input type="date" defaultValue={FESTIVAL_CONFIG.startDate} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
              <div><label className="text-cream/40 text-[10px]">End Date</label><input type="date" defaultValue={FESTIVAL_CONFIG.endDate} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
            </div></div>
            <div className="bg-card-bg border border-card-border rounded-xl p-4"><h3 className="text-gold text-[10px] uppercase tracking-wider mb-2">Contact Settings</h3><div className="space-y-2">
              <div><label className="text-cream/40 text-[10px]">Phone</label><input type="tel" defaultValue={FESTIVAL_CONFIG.phone} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
              <div><label className="text-cream/40 text-[10px]">WhatsApp</label><input type="tel" defaultValue={FESTIVAL_CONFIG.whatsapp} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
              <div><label className="text-cream/40 text-[10px]">UPI ID</label><input type="text" defaultValue={FESTIVAL_CONFIG.upiId} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-cream text-sm mt-1 focus:outline-none focus:border-saffron" /></div>
            </div></div>
            <button className="w-full gradient-saffron text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Save Settings</button>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
