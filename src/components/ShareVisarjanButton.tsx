"use client";

export default function ShareVisarjanButton({
  text,
}: {
  text: string;
}) {
  return (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator.share({ title: "Visarjan", text });
        }
      }}
      className="w-full py-3 rounded-lg text-sm font-medium text-center"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E7E5E4",
        color: "#1C1917",
      }}
    >
      Share Visarjan Details
    </button>
  );
}
