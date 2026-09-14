"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";

type Tab = "overview" | "days" | "aarti" | "events" | "notices" | "settings";

const IVORY = "#FAF7F2";
const MAROON = "#7C2D12";
const BORDER = "#E7E5E4";
const STONE_600 = "#57534E";
const STONE_400 = "#A8A29E";
const STONE_300 = "#D6D3D1";

interface AartiRow {
  id: number;
  slug: string;
  title: string;
  title_devanagari: string;
  deity: string;
  category: string;
  language: string;
  type: string;
  lyrics: string;
  transliteration: string | null;
  description: string | null;
  source: string;
  source_url: string | null;
  content_status: string;
  verified: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

interface ScheduleEvent {
  id: number;
  day: number;
  time: string;
  time_end: string | null;
  title: string;
  title_marathi: string;
  category: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

interface Announcement {
  id: number;
  title: string;
  title_marathi: string;
  description: string;
  description_marathi: string;
  priority: string;
  active: boolean;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [aartis, setAartis] = useState<AartiRow[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAartiForm, setShowAartiForm] = useState(false);
  const [editingAartiId, setEditingAartiId] = useState<number | null>(null);
  const [aartiFormData, setAartiFormData] = useState({
    slug: "",
    title: "",
    title_devanagari: "",
    deity: "",
    category: "",
    language: "",
    type: "",
    lyrics: "",
    transliteration: "",
    description: "",
    source: "",
    source_url: "",
    content_status: "verified",
    verified: false,
    published: false,
    sort_order: 0,
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [eventFormData, setEventFormData] = useState({
    day: 1,
    time: "",
    time_end: "",
    title: "",
    title_marathi: "",
    category: "aarti",
    description: "",
    sort_order: 0,
  });
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: "",
    title_marathi: "",
    description: "",
    description_marathi: "",
    priority: "general",
    active: true,
  });

  const handleLogin = () => {
    if (password === "ganpati2026") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === "aarti") fetchAartis();
    if (activeTab === "events") fetchEvents();
    if (activeTab === "notices") fetchAnnouncements();
    if (activeTab === "overview") {
      fetchAartis();
      fetchEvents();
      fetchAnnouncements();
    }
  }, [isAuthenticated, activeTab]);

  const fetchAartis = async () => {
    const { data, error } = await supabase
      .from("aartis")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAartis(data);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("schedule_events")
      .select("*")
      .order("day", { ascending: true })
      .order("sort_order", { ascending: true });
    if (!error && data) setEvents(data);
  };

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAnnouncements(data);
  };

  const handleAddAarti = async () => {
    const { error } = await supabase.from("aartis").insert([aartiFormData]);
    if (!error) {
      setShowAartiForm(false);
      resetAartiForm();
      fetchAartis();
    }
  };

  const handleUpdateAarti = async () => {
    if (editingAartiId === null) return;
    const { error } = await supabase
      .from("aartis")
      .update(aartiFormData)
      .eq("id", editingAartiId);
    if (!error) {
      setEditingAartiId(null);
      setShowAartiForm(false);
      fetchAartis();
    }
  };

  const handleDeleteAarti = async (id: number) => {
    if (!confirm("Delete this aarti?")) return;
    const { error } = await supabase.from("aartis").delete().eq("id", id);
    if (!error) fetchAartis();
  };

  const handleTogglePublished = async (id: number, published: boolean) => {
    const { error } = await supabase
      .from("aartis")
      .update({ published })
      .eq("id", id);
    if (!error) fetchAartis();
  };

  const handleToggleVerified = async (id: number, verified: boolean) => {
    const { error } = await supabase
      .from("aartis")
      .update({ verified })
      .eq("id", id);
    if (!error) fetchAartis();
  };

  const handleEditAarti = (aarti: AartiRow) => {
    setEditingAartiId(aarti.id);
    setAartiFormData({
      slug: aarti.slug,
      title: aarti.title,
      title_devanagari: aarti.title_devanagari,
      deity: aarti.deity,
      category: aarti.category,
      language: aarti.language,
      type: aarti.type,
      lyrics: aarti.lyrics,
      transliteration: aarti.transliteration || "",
      description: aarti.description || "",
      source: aarti.source,
      source_url: aarti.source_url || "",
      content_status: aarti.content_status,
      verified: aarti.verified,
      published: aarti.published,
      sort_order: aarti.sort_order,
    });
    setShowAartiForm(true);
  };

  const resetAartiForm = () => {
    setShowAartiForm(false);
    setEditingAartiId(null);
    setAartiFormData({
      slug: "",
      title: "",
      title_devanagari: "",
      deity: "",
      category: "",
      language: "",
      type: "",
      lyrics: "",
      transliteration: "",
      description: "",
      source: "",
      source_url: "",
      content_status: "verified",
      verified: false,
      published: false,
      sort_order: 0,
    });
  };

  const handleAddEvent = async () => {
    const { error } = await supabase.from("schedule_events").insert([eventFormData]);
    if (!error) {
      setShowEventForm(false);
      resetEventForm();
      fetchEvents();
    }
  };

  const handleUpdateEvent = async () => {
    if (editingEventId === null) return;
    const { error } = await supabase
      .from("schedule_events")
      .update(eventFormData)
      .eq("id", editingEventId);
    if (!error) {
      setEditingEventId(null);
      setShowEventForm(false);
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("schedule_events").delete().eq("id", id);
    if (!error) fetchEvents();
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setEditingEventId(event.id);
    setEventFormData({
      day: event.day,
      time: event.time,
      time_end: event.time_end || "",
      title: event.title,
      title_marathi: event.title_marathi,
      category: event.category,
      description: event.description || "",
      sort_order: event.sort_order,
    });
    setShowEventForm(true);
  };

  const resetEventForm = () => {
    setShowEventForm(false);
    setEditingEventId(null);
    setEventFormData({
      day: 1,
      time: "",
      time_end: "",
      title: "",
      title_marathi: "",
      category: "aarti",
      description: "",
      sort_order: 0,
    });
  };

  const handleAddNotice = async () => {
    const { error } = await supabase.from("announcements").insert([noticeFormData]);
    if (!error) {
      setShowNoticeForm(false);
      resetNoticeForm();
      fetchAnnouncements();
    }
  };

  const handleUpdateNotice = async () => {
    if (editingNoticeId === null) return;
    const { error } = await supabase
      .from("announcements")
      .update(noticeFormData)
      .eq("id", editingNoticeId);
    if (!error) {
      setEditingNoticeId(null);
      setShowNoticeForm(false);
      fetchAnnouncements();
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm("Delete this announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (!error) fetchAnnouncements();
  };

  const handleToggleNoticeActive = async (id: number, active: boolean) => {
    const { error } = await supabase
      .from("announcements")
      .update({ active })
      .eq("id", id);
    if (!error) fetchAnnouncements();
  };

  const handleEditNotice = (notice: Announcement) => {
    setEditingNoticeId(notice.id);
    setNoticeFormData({
      title: notice.title,
      title_marathi: notice.title_marathi,
      description: notice.description,
      description_marathi: notice.description_marathi,
      priority: notice.priority,
      active: notice.active,
    });
    setShowNoticeForm(true);
  };

  const resetNoticeForm = () => {
    setShowNoticeForm(false);
    setEditingNoticeId(null);
    setNoticeFormData({
      title: "",
      title_marathi: "",
      description: "",
      description_marathi: "",
      priority: "general",
      active: true,
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div
          className="min-h-[70vh] flex items-center justify-center px-4"
          style={{ backgroundColor: IVORY }}
        >
          <div
            className="w-full max-w-sm rounded-lg p-8 text-center"
            style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}
          >
            <div
              className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${MAROON}10` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={MAROON}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1
              className="text-lg font-semibold mb-1"
              style={{ color: MAROON }}
            >
              Admin Panel
            </h1>
            <p className="text-sm mb-6" style={{ color: STONE_400 }}>
              Enter password to continue
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg px-4 py-3 text-sm text-center mb-3 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: IVORY,
                border: `1px solid ${BORDER}`,
                color: MAROON,
                "--tw-ring-color": MAROON,
              } as React.CSSProperties}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Login
            </button>
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
    { id: "notices", label: "Notices", icon: "📢" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const EVENT_CATEGORIES = [
    "aarti", "cultural", "children", "bhajan", "dindi", "dhol-tasha",
    "competition", "prasad", "social", "visarjan", "darshan", "general",
  ];

  const eventsByDay = events.reduce((acc, e) => {
    if (!acc[e.day]) acc[e.day] = [];
    acc[e.day].push(e);
    return acc;
  }, {} as Record<number, ScheduleEvent[]>);

  return (
    <>
      <Header />
      <div
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: IVORY }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-lg font-bold font-gotu"
            style={{ color: MAROON }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
          >
            Logout
          </button>
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? MAROON : "#FFFFFF",
                color: activeTab === tab.id ? "#FFFFFF" : STONE_600,
                border: `1px solid ${activeTab === tab.id ? MAROON : BORDER}`,
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}
            >
              <h3 className="text-[10px] uppercase tracking-wider mb-2" style={{ color: STONE_400 }}>
                Mandal
              </h3>
              <p className="font-bold font-gotu text-sm" style={{ color: MAROON }}>
                {FESTIVAL_CONFIG.name}
              </p>
              <p className="text-xs" style={{ color: STONE_400 }}>
                {FESTIVAL_CONFIG.location}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold font-gotu" style={{ color: MAROON }}>{FESTIVAL_DAYS.length}</p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>Days</p>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold font-gotu" style={{ color: MAROON }}>{aartis.length}</p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>Aartis</p>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold font-gotu" style={{ color: MAROON }}>{events.length}</p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>Events</p>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <p className="text-2xl font-bold font-gotu" style={{ color: MAROON }}>{announcements.length}</p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>Notices</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "days" && (
          <div className="space-y-2">
            {FESTIVAL_DAYS.map((day) => (
              <div
                key={day.day}
                className="rounded-lg p-3 flex items-center justify-between"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}
              >
                <div>
                  <p className="font-bold text-sm" style={{ color: MAROON }}>Day {day.day}</p>
                  <p className="text-[10px]" style={{ color: STONE_400 }}>{day.theme}</p>
                </div>
                <span className="text-xs font-gotu" style={{ color: STONE_300 }}>{day.dateMarathi}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "aarti" && (
          <div className="space-y-3">
            <button
              onClick={() => { resetAartiForm(); setShowAartiForm(true); }}
              className="rounded-lg py-2 px-4 text-xs font-semibold text-white"
              style={{ backgroundColor: MAROON }}
            >
              + Add Aarti
            </button>

            {showAartiForm && (
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-bold" style={{ color: MAROON }}>
                  {editingAartiId ? "Edit Aarti" : "Add New Aarti"}
                </h3>
                {[
                  { key: "slug", label: "Slug", type: "text" },
                  { key: "title", label: "Title", type: "text" },
                  { key: "title_devanagari", label: "Title (Devanagari)", type: "text" },
                  { key: "deity", label: "Deity", type: "text" },
                  { key: "category", label: "Category", type: "text" },
                  { key: "language", label: "Language", type: "text" },
                  { key: "type", label: "Type", type: "text" },
                  { key: "source", label: "Source", type: "text" },
                  { key: "sort_order", label: "Sort Order", type: "number" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={String((aartiFormData as Record<string, string | number | boolean>)[field.key] ?? "")}
                      onChange={(e) =>
                        setAartiFormData((prev) => ({
                          ...prev,
                          [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                        }))
                      }
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Lyrics</label>
                  <textarea
                    value={aartiFormData.lyrics}
                    onChange={(e) => setAartiFormData((prev) => ({ ...prev, lyrics: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={3}
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Transliteration</label>
                  <input type="text" value={aartiFormData.transliteration}
                    onChange={(e) => setAartiFormData((prev) => ({ ...prev, transliteration: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Description</label>
                  <textarea value={aartiFormData.description}
                    onChange={(e) => setAartiFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={2}
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Source URL</label>
                  <input type="text" value={aartiFormData.source_url}
                    onChange={(e) => setAartiFormData((prev) => ({ ...prev, source_url: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Content Status</label>
                  <select value={aartiFormData.content_status}
                    onChange={(e) => setAartiFormData((prev) => ({ ...prev, content_status: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}
                  >
                    <option value="verified">Verified</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-xs" style={{ color: STONE_600 }}>
                    <input type="checkbox" checked={aartiFormData.verified}
                      onChange={(e) => setAartiFormData((prev) => ({ ...prev, verified: e.target.checked }))} />
                    Verified
                  </label>
                  <label className="flex items-center gap-1 text-xs" style={{ color: STONE_600 }}>
                    <input type="checkbox" checked={aartiFormData.published}
                      onChange={(e) => setAartiFormData((prev) => ({ ...prev, published: e.target.checked }))} />
                    Published
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={editingAartiId !== null ? handleUpdateAarti : handleAddAarti}
                    className="rounded-lg py-2 px-4 text-xs font-semibold text-white" style={{ backgroundColor: MAROON }}>
                    {editingAartiId ? "Update" : "Add"}
                  </button>
                  <button onClick={resetAartiForm}
                    className="rounded-lg py-2 px-4 text-xs font-semibold" style={{ backgroundColor: BORDER, color: STONE_600 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {aartis.map((a) => (
                <div key={a.id} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm" style={{ color: MAROON }}>{a.title_devanagari || a.title}</p>
                    <div className="flex gap-1">
                      <button onClick={() => handleTogglePublished(a.id, !a.published)}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {a.published ? "Published" : "Unpublished"}
                      </button>
                      <button onClick={() => handleToggleVerified(a.id, !a.verified)}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${a.verified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                        {a.verified ? "Verified" : "Unverified"}
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px]" style={{ color: STONE_400 }}>{a.category} · {a.type} · {a.language}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditAarti(a)}
                      className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: `${MAROON}10`, color: MAROON }}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteAarti(a.id)}
                      className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-3">
            <button
              onClick={() => { resetEventForm(); setShowEventForm(true); }}
              className="rounded-lg py-2 px-4 text-xs font-semibold text-white"
              style={{ backgroundColor: MAROON }}
            >
              + Add Event
            </button>

            {showEventForm && (
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-bold" style={{ color: MAROON }}>
                  {editingEventId ? "Edit Event" : "Add New Event"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>Day (1-7)</label>
                    <select value={eventFormData.day}
                      onChange={(e) => setEventFormData((prev) => ({ ...prev, day: Number(e.target.value) }))}
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}>
                      {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>Day {d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>Category</label>
                    <select value={eventFormData.category}
                      onChange={(e) => setEventFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}>
                      {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>Start Time</label>
                    <input type="time" value={eventFormData.time}
                      onChange={(e) => setEventFormData((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                  </div>
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>End Time</label>
                    <input type="time" value={eventFormData.time_end}
                      onChange={(e) => setEventFormData((prev) => ({ ...prev, time_end: e.target.value }))}
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Title (English)</label>
                  <input type="text" value={eventFormData.title}
                    onChange={(e) => setEventFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Title (Marathi)</label>
                  <input type="text" value={eventFormData.title_marathi}
                    onChange={(e) => setEventFormData((prev) => ({ ...prev, title_marathi: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Description</label>
                  <textarea value={eventFormData.description}
                    onChange={(e) => setEventFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={2}
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Sort Order</label>
                  <input type="number" value={eventFormData.sort_order}
                    onChange={(e) => setEventFormData((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div className="flex gap-2">
                  <button onClick={editingEventId !== null ? handleUpdateEvent : handleAddEvent}
                    className="rounded-lg py-2 px-4 text-xs font-semibold text-white" style={{ backgroundColor: MAROON }}>
                    {editingEventId ? "Update" : "Add"}
                  </button>
                  <button onClick={resetEventForm}
                    className="rounded-lg py-2 px-4 text-xs font-semibold" style={{ backgroundColor: BORDER, color: STONE_600 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {Object.entries(eventsByDay).map(([day, dayEvents]) => (
              <div key={day}>
                <p className="text-sm font-bold mb-2" style={{ color: MAROON }}>Day {day}</p>
                <div className="space-y-1">
                  {dayEvents.map((e) => (
                    <div key={e.id} className="rounded-lg p-2 flex items-center justify-between" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium" style={{ color: STONE_600 }}>{e.title_marathi || e.title}</p>
                        <p className="text-[10px]" style={{ color: STONE_400 }}>{e.time}{e.time_end ? ` - ${e.time_end}` : ""} · {e.category}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => handleEditEvent(e)}
                          className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: `${MAROON}10`, color: MAROON }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(e.id)}
                          className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-3">
            <button
              onClick={() => { resetNoticeForm(); setShowNoticeForm(true); }}
              className="rounded-lg py-2 px-4 text-xs font-semibold text-white"
              style={{ backgroundColor: MAROON }}
            >
              + Add Announcement
            </button>

            {showNoticeForm && (
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                <h3 className="text-sm font-bold" style={{ color: MAROON }}>
                  {editingNoticeId ? "Edit Announcement" : "New Announcement"}
                </h3>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Title (English)</label>
                  <input type="text" value={noticeFormData.title}
                    onChange={(e) => setNoticeFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Title (Marathi)</label>
                  <input type="text" value={noticeFormData.title_marathi}
                    onChange={(e) => setNoticeFormData((prev) => ({ ...prev, title_marathi: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Description (English)</label>
                  <textarea value={noticeFormData.description}
                    onChange={(e) => setNoticeFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={2}
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Description (Marathi)</label>
                  <textarea value={noticeFormData.description_marathi}
                    onChange={(e) => setNoticeFormData((prev) => ({ ...prev, description_marathi: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={2}
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>Priority</label>
                    <select value={noticeFormData.priority}
                      onChange={(e) => setNoticeFormData((prev) => ({ ...prev, priority: e.target.value }))}
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties}>
                      <option value="general">General</option>
                      <option value="important">Important</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px]" style={{ color: STONE_400 }}>Active</label>
                    <div className="mt-2">
                      <label className="flex items-center gap-2 text-xs" style={{ color: STONE_600 }}>
                        <input type="checkbox" checked={noticeFormData.active}
                          onChange={(e) => setNoticeFormData((prev) => ({ ...prev, active: e.target.checked }))} />
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={editingNoticeId !== null ? handleUpdateNotice : handleAddNotice}
                    className="rounded-lg py-2 px-4 text-xs font-semibold text-white" style={{ backgroundColor: MAROON }}>
                    {editingNoticeId ? "Update" : "Add"}
                  </button>
                  <button onClick={resetNoticeForm}
                    className="rounded-lg py-2 px-4 text-xs font-semibold" style={{ backgroundColor: BORDER, color: STONE_600 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {announcements.map((a) => (
                <div key={a.id} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: MAROON }}>{a.title}</p>
                      <p className="text-[10px] mt-1" style={{ color: STONE_400 }}>{a.title_marathi}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: STONE_400 }}>{a.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: a.priority === "important" ? "#FEE2E2" : `${MAROON}10`,
                            color: a.priority === "important" ? "#DC2626" : MAROON,
                          }}>
                          {a.priority}
                        </span>
                        <button onClick={() => handleToggleNoticeActive(a.id, !a.active)}
                          className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${a.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                          {a.active ? "Active" : "Inactive"}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => handleEditNotice(a)}
                        className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: `${MAROON}10`, color: MAROON }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteNotice(a.id)}
                        className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-3">
            <div className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <h3 className="text-[10px] uppercase tracking-wider mb-3" style={{ color: STONE_400 }}>Mandal Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Name</label>
                  <input type="text" defaultValue={FESTIVAL_CONFIG.name}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Location</label>
                  <input type="text" defaultValue={FESTIVAL_CONFIG.location}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <h3 className="text-[10px] uppercase tracking-wider mb-3" style={{ color: STONE_400 }}>Festival Dates</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Start Date</label>
                  <input type="date" defaultValue={FESTIVAL_CONFIG.startDate}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>End Date</label>
                  <input type="date" defaultValue={FESTIVAL_CONFIG.endDate}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <h3 className="text-[10px] uppercase tracking-wider mb-3" style={{ color: STONE_400 }}>Contact Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>Phone</label>
                  <input type="tel" defaultValue="+91XXXXXXXXXX"
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>WhatsApp</label>
                  <input type="tel" defaultValue="+91XXXXXXXXXX"
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>UPI ID</label>
                  <input type="text" defaultValue={FESTIVAL_CONFIG.upiId}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, color: MAROON, "--tw-ring-color": MAROON } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <button className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}>
              Save Settings
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
