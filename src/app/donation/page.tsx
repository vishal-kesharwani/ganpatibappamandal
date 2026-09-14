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
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">Support the Mandal</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">मंडळाला सहकार्य करा</p>
        </div>

        {/* QR Code Card */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-saffron/5 rounded-3xl blur-xl" />
          <div className="relative bg-card-bg border border-card-border rounded-3xl p-6 text-center card-glow">
            {/* QR placeholder */}
            <div className="w-56 h-56 mx-auto bg-cream rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-cream-dark" />
              <div className="relative text-center">
                <p className="text-temple-bg text-3xl font-bold font-gotu">UPI</p>
                <p className="text-temple-bg/40 text-xs font-gotu mt-1">Scan to Pay</p>
              </div>
            </div>

            {/* UPI ID */}
            <p className="text-cream-muted text-xs mb-1">UPI ID</p>
            <p className="text-gold text-lg font-bold font-gotu">{FESTIVAL_CONFIG.upiId}</p>

            {/* Copy button */}
            <button
              onClick={copyUPI}
              className="mt-4 px-6 py-2.5 rounded-xl bg-card-bg border border-card-border text-cream text-sm font-medium hover:border-saffron/30 transition-all"
            >
              {copied ? "✓ Copied!" : "📋 Copy UPI ID"}
            </button>
          </div>
        </div>

        {/* How to pay */}
        <div className="surface-card p-5 mb-6">
          <h3 className="text-overline text-gold mb-3">How to Pay</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Open any UPI app (GPay, PhonePe, Paytm)" },
              { step: "2", text: "Scan the QR code or enter UPI ID" },
              { step: "3", text: "Enter amount and complete payment" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <span className="text-saffron text-[10px] font-bold">{item.step}</span>
                </div>
                <p className="text-cream-muted text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="surface-card p-5 text-center">
          <p className="text-cream text-sm font-gotu leading-relaxed">
            Your contribution helps us organize a grand Ganpati celebration for the community.
          </p>
          <div className="divider-ornate text-cream-dim my-4 text-[10px]">🙏</div>
          <p className="text-xl font-bold font-gotu text-gold">गणपती बाप्पा मोरया!</p>
          <p className="text-cream-dim text-xs mt-2">Thank you for your generosity</p>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
