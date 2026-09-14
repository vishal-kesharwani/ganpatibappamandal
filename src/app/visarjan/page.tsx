import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ShareVisarjanButton from "@/components/ShareVisarjanButton";
import { VISARJAN_INFO } from "@/data/info";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function VisarjanPage() {
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
            Ganpati Visarjan
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            विसर्जन
          </p>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden mb-4" style={{ borderColor: "#E7E5E4" }}>
          <div className="px-4 py-4 text-center">
            <p className="text-sm" style={{ color: "#57534E" }}>
              {VISARJAN_INFO.dateMarathi}
            </p>
            <p
              className="text-2xl font-bold font-gotu mt-1"
              style={{ color: "#7C2D12" }}
            >
              Visarjan Day
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="bg-white border rounded-lg p-4"
            style={{ borderColor: "#E7E5E4" }}
          >
            <h3
              className="text-[10px] uppercase tracking-wider mb-2 font-semibold"
              style={{ color: "#B45309" }}
            >
              Schedule
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: "#57534E" }}>
                  Procession Starts
                </span>
                <span
                  className="font-bold"
                  style={{ color: "#1C1917" }}
                >
                  {VISARJAN_INFO.processionStart}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: "#57534E" }}>
                  Visarjan
                </span>
                <span
                  className="font-bold"
                  style={{ color: "#1C1917" }}
                >
                  {VISARJAN_INFO.time}
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-white border rounded-lg p-4"
            style={{ borderColor: "#E7E5E4" }}
          >
            <h3
              className="text-[10px] uppercase tracking-wider mb-2 font-semibold"
              style={{ color: "#B45309" }}
            >
              Procession Route
            </h3>
            <div className="space-y-2">
              {VISARJAN_INFO.route.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          i === 0
                            ? "#EA580C"
                            : i === VISARJAN_INFO.route.length - 1
                              ? "#DC2626"
                              : "#E7E5E4",
                      }}
                    />
                    {i < VISARJAN_INFO.route.length - 1 && (
                      <div
                        className="w-px h-6"
                        style={{ backgroundColor: "#E7E5E4" }}
                      />
                    )}
                  </div>
                  <p
                    className="text-sm pt-0.5"
                    style={{ color: "#57534E" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white border rounded-lg p-4"
            style={{ borderColor: "#E7E5E4" }}
          >
            <h3
              className="text-[10px] uppercase tracking-wider mb-2 font-semibold"
              style={{ color: "#B45309" }}
            >
              Meeting Point
            </h3>
            <p className="text-sm" style={{ color: "#57534E" }}>
              {VISARJAN_INFO.meetingPoint}
            </p>
          </div>

          <div
            className="bg-white border rounded-lg p-4"
            style={{ borderColor: "#E7E5E4" }}
          >
            <h3
              className="text-[10px] uppercase tracking-wider mb-2 font-semibold"
              style={{ color: "#B45309" }}
            >
              Important Instructions
            </h3>
            <ul className="space-y-1.5">
              {VISARJAN_INFO.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="text-xs mt-0.5"
                    style={{ color: "#EA580C" }}
                  >
                    -
                  </span>
                  <p className="text-sm" style={{ color: "#57534E" }}>
                    {inst}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-white border rounded-lg p-4"
            style={{ borderColor: "#E7E5E4" }}
          >
            <h3
              className="text-[10px] uppercase tracking-wider mb-2 font-semibold"
              style={{ color: "#B45309" }}
            >
              Emergency Contact
            </h3>
            <a
              href={`tel:${VISARJAN_INFO.emergencyContact}`}
              className="text-sm"
              style={{ color: "#1C1917" }}
            >
              {VISARJAN_INFO.emergencyContact}
            </a>
          </div>
        </div>

        <div className="mt-6">
          <ShareVisarjanButton
            text={`Visarjan - ${VISARJAN_INFO.dateMarathi}\nProcession: ${VISARJAN_INFO.processionStart}\n${FESTIVAL_CONFIG.name}`}
          />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
