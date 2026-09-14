import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { GANPATI_INFO } from "@/data/info";

export default function InfoPage() {
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
            Ganpati Information
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            गणपती माहिती
          </p>
        </div>

        <div className="space-y-3">
          {GANPATI_INFO.map((info) => (
            <div
              key={info.id}
              className="bg-white border rounded-lg overflow-hidden"
              style={{ borderColor: "#E7E5E4" }}
            >
              <div
                className="px-4 py-3"
                style={{ backgroundColor: "#FAF7F2" }}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <h2
                      className="font-bold font-gotu"
                      style={{ color: "#1C1917" }}
                    >
                      {info.titleMarathi}
                    </h2>
                    <p
                      className="text-[10px]"
                      style={{ color: "#A8A29E" }}
                    >
                      {info.title}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1 font-semibold"
                    style={{ color: "#B45309" }}
                  >
                    मराठी
                  </p>
                  <p
                    className="text-sm font-gotu leading-relaxed"
                    style={{ color: "#1C1917" }}
                  >
                    {info.contentMarathi}
                  </p>
                </div>
                <div
                  className="pt-3"
                  style={{ borderTop: "1px solid #E7E5E4" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "#A8A29E" }}
                  >
                    English
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#57534E" }}
                  >
                    {info.content}
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
