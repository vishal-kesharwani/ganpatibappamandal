"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";
import { DAILY_SCHEDULES } from "@/data/schedule";
import { ANNOUNCEMENTS } from "@/data/announcements";

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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [aartis, setAartis] = useState<AartiRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
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

  const handleLogin = () => {
    if (password === "ganpati2026") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "aarti") {
      fetchAartis();
    }
  }, [isAuthenticated, activeTab]);

  const fetchAartis = async () => {
    const { data, error } = await supabase
      .from("aartis")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setAartis(data);
    }
  };

  const handleAddAarti = async () => {
    const { error } = await supabase.from("aartis").insert([formData]);
    if (!error) {
      setShowForm(false);
      setFormData({
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
      fetchAartis();
    }
  };

  const handleUpdateAarti = async () => {
    if (editingId === null) return;
    const { error } = await supabase
      .from("aartis")
      .update(formData)
      .eq("id", editingId);
    if (!error) {
      setEditingId(null);
      setShowForm(false);
      fetchAartis();
    }
  };

  const handleDeleteAarti = async (id: number) => {
    const { error } = await supabase.from("aartis").delete().eq("id", id);
    if (!error) {
      fetchAartis();
    }
  };

  const handleTogglePublished = async (id: number, published: boolean) => {
    const { error } = await supabase
      .from("aartis")
      .update({ published })
      .eq("id", id);
    if (!error) {
      fetchAartis();
    }
  };

  const handleToggleVerified = async (id: number, verified: boolean) => {
    const { error } = await supabase
      .from("aartis")
      .update({ verified })
      .eq("id", id);
    if (!error) {
      fetchAartis();
    }
  };

  const handleEdit = (aarti: AartiRow) => {
    setEditingId(aarti.id);
    setFormData({
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
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
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
            onClick={() => setIsAuthenticated(false)}
            className="text-xs transition-colors"
            style={{ color: STONE_400 }}
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
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${BORDER}`,
              }}
            >
              <h3
                className="text-[10px] uppercase tracking-wider mb-2"
                style={{ color: STONE_400 }}
              >
                Mandal
              </h3>
              <p
                className="font-bold font-gotu text-sm"
                style={{ color: MAROON }}
              >
                {FESTIVAL_CONFIG.name}
              </p>
              <p className="text-xs" style={{ color: STONE_400 }}>
                {FESTIVAL_CONFIG.location}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-lg p-3 text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p
                  className="text-2xl font-bold font-gotu"
                  style={{ color: MAROON }}
                >
                  {FESTIVAL_DAYS.length}
                </p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>
                  Days
                </p>
              </div>
              <div
                className="rounded-lg p-3 text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p
                  className="text-2xl font-bold font-gotu"
                  style={{ color: MAROON }}
                >
                  {aartis.length}
                </p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>
                  Aartis
                </p>
              </div>
              <div
                className="rounded-lg p-3 text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p
                  className="text-2xl font-bold font-gotu"
                  style={{ color: MAROON }}
                >
                  {DAILY_SCHEDULES.reduce((a, s) => a + s.events.length, 0)}
                </p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>
                  Events
                </p>
              </div>
              <div
                className="rounded-lg p-3 text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p
                  className="text-2xl font-bold font-gotu"
                  style={{ color: MAROON }}
                >
                  {ANNOUNCEMENTS.length}
                </p>
                <p className="text-[10px]" style={{ color: STONE_400 }}>
                  Notices
                </p>
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
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: MAROON }}
                  >
                    Day {day.day}
                  </p>
                  <p className="text-[10px]" style={{ color: STONE_400 }}>
                    {day.theme}
                  </p>
                </div>
                <span
                  className="text-xs font-gotu"
                  style={{ color: STONE_300 }}
                >
                  {day.dateMarathi}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "aarti" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="rounded-lg py-2 px-4 text-xs font-semibold text-white"
                style={{ backgroundColor: MAROON }}
              >
                + Add Aarti
              </button>
            </div>

            {showForm && (
              <div
                className="rounded-lg p-4 space-y-3"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <h3 className="text-sm font-bold" style={{ color: MAROON }}>
                  {editingId ? "Edit Aarti" : "Add New Aarti"}
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
                    <label className="text-[10px]" style={{ color: STONE_400 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={String((formData as Record<string, string | number | boolean>)[field.key] ?? "")}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                        }))
                      }
                      className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                      style={{
                        backgroundColor: IVORY,
                        border: `1px solid ${BORDER}`,
                        color: MAROON,
                        "--tw-ring-color": MAROON,
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Lyrics
                  </label>
                  <textarea
                    value={formData.lyrics}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lyrics: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={3}
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Transliteration
                  </label>
                  <input
                    type="text"
                    value={formData.transliteration}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, transliteration: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    rows={2}
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Source URL
                  </label>
                  <input
                    type="text"
                    value={formData.source_url}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, source_url: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Content Status
                  </label>
                  <select
                    value={formData.content_status}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content_status: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  >
                    <option value="verified">Verified</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-xs" style={{ color: STONE_600 }}>
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, verified: e.target.checked }))
                      }
                    />
                    Verified
                  </label>
                  <label className="flex items-center gap-1 text-xs" style={{ color: STONE_600 }}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, published: e.target.checked }))
                      }
                    />
                    Published
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={editingId !== null ? handleUpdateAarti : handleAddAarti}
                    className="rounded-lg py-2 px-4 text-xs font-semibold text-white"
                    style={{ backgroundColor: MAROON }}
                  >
                    {editingId ? "Update" : "Add"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="rounded-lg py-2 px-4 text-xs font-semibold"
                    style={{ backgroundColor: BORDER, color: STONE_600 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {aartis.map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg p-3"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm" style={{ color: MAROON }}>
                      {a.title_devanagari || a.title}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleTogglePublished(a.id, !a.published)}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                          a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {a.published ? "Published" : "Unpublished"}
                      </button>
                      <button
                        onClick={() => handleToggleVerified(a.id, !a.verified)}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                          a.verified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {a.verified ? "Verified" : "Unverified"}
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px]" style={{ color: STONE_400 }}>
                    {a.category} · {a.type} · {a.language}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-[10px] px-2 py-1 rounded"
                      style={{ backgroundColor: `${MAROON}10`, color: MAROON }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAarti(a.id)}
                      className="text-[10px] px-2 py-1 rounded"
                      style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                    >
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
            {DAILY_SCHEDULES.map((s) => (
              <div key={s.day}>
                <p
                  className="text-sm font-bold mb-2"
                  style={{ color: MAROON }}
                >
                  Day {s.day}
                </p>
                <div className="space-y-1">
                  {s.events.slice(0, 4).map((e) => (
                    <div
                      key={e.id}
                      className="rounded-lg p-2 flex items-center justify-between"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${BORDER}`,
                      }}
                    >
                      <p className="text-xs" style={{ color: STONE_600 }}>
                        {e.titleMarathi}
                      </p>
                      <p
                        className="text-[10px] font-mono"
                        style={{ color: STONE_400 }}
                      >
                        {e.time}
                      </p>
                    </div>
                  ))}
                  {s.events.length > 4 && (
                    <p
                      className="text-[10px] text-center"
                      style={{ color: STONE_300 }}
                    >
                      +{s.events.length - 4} more
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-2">
            {ANNOUNCEMENTS.map((a) => (
              <div
                key={a.id}
                className="rounded-lg p-3 flex items-start justify-between gap-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm"
                    style={{ color: MAROON }}
                  >
                  {a.title}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: STONE_400 }}>
                    {a.descriptionMarathi}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[9px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor:
                      a.priority === "important" ? "#FEE2E2" : `${MAROON}10`,
                    color: a.priority === "important" ? "#DC2626" : MAROON,
                  }}
                >
                  {a.priority}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-3">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${BORDER}`,
              }}
            >
              <h3
                className="text-[10px] uppercase tracking-wider mb-3"
                style={{ color: STONE_400 }}
              >
                Mandal Settings
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={FESTIVAL_CONFIG.name}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={FESTIVAL_CONFIG.location}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${BORDER}`,
              }}
            >
              <h3
                className="text-[10px] uppercase tracking-wider mb-3"
                style={{ color: STONE_400 }}
              >
                Festival Dates
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue={FESTIVAL_CONFIG.startDate}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    defaultValue={FESTIVAL_CONFIG.endDate}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${BORDER}`,
              }}
            >
              <h3
                className="text-[10px] uppercase tracking-wider mb-3"
                style={{ color: STONE_400 }}
              >
                Contact Settings
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91XXXXXXXXXX"
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91XXXXXXXXXX"
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="text-[10px]" style={{ color: STONE_400 }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    defaultValue={FESTIVAL_CONFIG.upiId}
                    className="w-full rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: IVORY,
                      border: `1px solid ${BORDER}`,
                      color: MAROON,
                      "--tw-ring-color": MAROON,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            <button
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Save Settings
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
