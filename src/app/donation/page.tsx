"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { FESTIVAL_CONFIG } from "@/data/festival";

export default function DonationPage() {
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(FESTIVAL_CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            Support the Mandal
          </h1>
          <p className="text-xs mt-1 font-gotu" style={{ color: "#A8A29E" }}>
            मंडळाला सहकार्य करा
          </p>
        </div>

        <div className="mb-6">
          <div
            className="bg-white border rounded-lg p-6 text-center"
            style={{ borderColor: "#E7E5E4" }}
          >
            <div
              className="w-56 h-56 mx-auto rounded-lg flex items-center justify-center mb-5 relative overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4" }}
            >
              <div className="text-center">
                <p
                  className="text-3xl font-bold font-gotu"
                  style={{ color: "#7C2D12" }}
                >
                  UPI
                </p>
                <p
                  className="text-xs font-gotu mt-1"
                  style={{ color: "#A8A29E" }}
                >
                  Scan to Pay
                </p>
              </div>
            </div>

            <p className="text-xs mb-1" style={{ color: "#A8A29E" }}>
              UPI ID
            </p>
            <p
              className="text-lg font-bold font-gotu"
              style={{ color: "#B45309" }}
            >
              {FESTIVAL_CONFIG.upiId}
            </p>

            <button
              onClick={copyUPI}
              className="mt-4 px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E7E5E4",
                color: "#1C1917",
              }}
            >
              {copied ? "Copied!" : "Copy UPI ID"}
            </button>
          </div>
        </div>

        <div
          className="bg-white border rounded-lg p-5 mb-6"
          style={{ borderColor: "#E7E5E4" }}
        >
          <h3
            className="text-[10px] uppercase tracking-wider mb-3 font-semibold"
            style={{ color: "#B45309" }}
          >
            How to Pay
          </h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Open any UPI app (GPay, PhonePe, Paytm)" },
              { step: "2", text: "Scan the QR code or enter UPI ID" },
              { step: "3", text: "Enter amount and complete payment" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#FEF3C7" }}
                >
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "#B45309" }}
                  >
                    {item.step}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#57534E" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-white border rounded-lg p-5 text-center"
          style={{ borderColor: "#E7E5E4" }}
        >
          <p
            className="text-sm font-gotu leading-relaxed"
            style={{ color: "#1C1917" }}
          >
            Your contribution helps us organize a grand Ganpati celebration for
            the community.
          </p>
          <div className="divider-ornate my-4">
            <span className="divider-ornate-symbol" style={{ color: "#A8A29E" }}>
              /
            </span>
          </div>
          <p
            className="text-xl font-bold font-gotu"
            style={{ color: "#B45309" }}
          >
            गणपती बाप्पा मोरया!
          </p>
          <p className="text-xs mt-2" style={{ color: "#A8A29E" }}>
            Thank you for your generosity
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
