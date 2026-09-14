import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OM SAI MITRA MANDAL | Ganpati Festival 2026",
  description: "OM SAI MITRA MANDAL, Triveni Sangam Apartment - 7-Day Ganpati Mahotsav 2026. 14 September – 20 September. गणपती बाप्पा मोरया!",
  keywords: ["Ganpati", "Ganesh Chaturthi", "OM SAI MITRA MANDAL", "Triveni Sangam", "Ganpati Mahotsav 2026", "गणेशोत्सव", "गणपती बाप्पा मोरया", "Aarti", "Marathi Aarti"],
  openGraph: {
    title: "OM SAI MITRA MANDAL | Ganpati Festival 2026",
    description: "गणपती बाप्पा मोरया! 7-Day Ganpati Mahotsav - 14 Sep – 20 Sep 2026",
    siteName: "OM SAI MITRA MANDAL",
    type: "website",
    images: ["/ganpati-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OM SAI MITRA MANDAL | Ganpati Festival 2026",
    description: "गणपती बाप्पा मोरया! Ganpati Mahotsav 2026",
    images: ["/ganpati-hero.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ganpati Mandal" />
        <link rel="apple-touch-icon" href="/mandal-logo.png" />
        <meta name="theme-color" content="#7C2D12" />
      </head>
      <body className="min-h-dvh flex flex-col text-[#1C1917] antialiased">
        <main className="flex-1 pb-20">{children}</main>
      </body>
    </html>
  );
}
