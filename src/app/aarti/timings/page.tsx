import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const AARTI_TIMINGS = [
  {
    time: "06:00",
    nameMarathi: "काकड आरती",
    nameEnglish: "Kakad Aarti",
    period: "Morning",
  },
  {
    time: "12:30",
    nameMarathi: "माध्यान्ह आरती",
    nameEnglish: "Madhyanna Aarti",
    period: "Afternoon",
  },
  {
    time: "18:30",
    nameMarathi: "संध्याकाळची आरती",
    nameEnglish: "Sandhyakalin Aarti",
    period: "Evening",
  },
  {
    time: "22:00",
    nameMarathi: "शेज आरती",
    nameEnglish: "Sheja Aarti",
    period: "Night",
  },
];

export default function AartiTimingsPage() {
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
            Aarti Timings
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            आरती वेळापत्रक
          </p>
        </div>

        <div className="space-y-3">
          {AARTI_TIMINGS.map((aarti) => (
            <div
              key={aarti.time}
              className="bg-white border rounded-lg p-4 flex items-center gap-4"
              style={{ borderColor: "#E7E5E4" }}
            >
              <div className="shrink-0">
                <p
                  className="text-2xl font-bold font-gotu"
                  style={{ color: "#7C2D12" }}
                >
                  {aarti.time}
                </p>
              </div>
              <div className="flex-1">
                <p
                  className="font-bold font-gotu"
                  style={{ color: "#1C1917" }}
                >
                  {aarti.nameMarathi}
                </p>
                <p className="text-sm" style={{ color: "#57534E" }}>
                  {aarti.nameEnglish}
                </p>
                <p className="text-[10px]" style={{ color: "#A8A29E" }}>
                  {aarti.period}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: "#A8A29E" }}>
            Timings may vary on special days. Please check the daily schedule for
            exact timings.
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
