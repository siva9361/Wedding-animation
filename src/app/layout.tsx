import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Tamil } from "next/font/google";
import { invitation } from "@/lib/wedding-config";
import "./globals.css";

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-tamil",
  display: "swap",
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const title =
  invitation.groom.englishName + " & " + invitation.bride.englishName + " | Wedding invitation";
const description =
  "விக்னேஷ் & சந்தியா · திருமண வரவேற்பு: 12.11.2026, காயத்ரி ஹோட்டல், காங்கயம். சுபமுகூர்த்தம்: 13.11.2026.";
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: { title, description, type: "website", locale: "ta_IN" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#581f31" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ta"
      data-scroll-behavior="smooth"
      className={tamil.variable + " " + display.variable + " " + body.variable}
    >
      <body>
        <main id="invitation">{children}</main>
      </body>
    </html>
  );
}
