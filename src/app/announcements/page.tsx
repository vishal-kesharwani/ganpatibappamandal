import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { ANNOUNCEMENTS } from "@/data/announcements";

export default function AnnouncementsPage() {
  const sorted = [...ANNOUNCEMENTS].sort((a, b) => {
    const p = { important: 0, event: 1, general: 2 };
    return p[a.priority] - p[b.priority];
  });

  return (
    <>
      <Header />
      <main
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}
      >
        <div className="text-center mb-6">
          <h1
            className="text-xl font-bold font-gotu"
            style={{ color: "#1C1917" }}
          >
            Announcements
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            जाहिराती
          </p>
        </div>

        <div className="space-y-3">
          {sorted.map((ann) => (
            <div
              key={ann.id}
              className="bg-white border rounded-lg p-4"
              style={{
                borderColor:
                  ann.priority === "important"
                    ? "#DC2626"
                    : ann.priority === "event"
                      ? "#EA580C"
                      : "#E7E5E4",
                borderLeftWidth: "4px",
              }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p
                    className="font-bold text-sm font-gotu"
                    style={{ color: "#1C1917" }}
                  >
                    {ann.titleMarathi}
                  </p>
                  <p
                    className="text-xs font-gotu mt-1"
                    style={{ color: "#57534E" }}
                  >
                    {ann.descriptionMarathi}
                  </p>
                  <p
                    className="text-[10px] mt-2"
                    style={{ color: "#A8A29E" }}
                  >
                    {ann.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
