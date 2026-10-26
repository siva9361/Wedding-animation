import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Tamil } from "next/font/google";
import { coupleNames, eventsInOrder, invitation } from "@/lib/wedding-config";
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
const title = coupleNames + " | Wedding invitation";
const description =
  invitation.groom.name +
  " & " +
  invitation.bride.name +
  " · " +
  eventsInOrder
    .map(
      (event) => event.title + ": " + event.dateLabel + ", " + event.venue + ", " + event.address,
    )
    .join(" ");
export const metadata: Metadata = {
  // Share previews need absolute URLs; set NEXT_PUBLIC_SITE_URL to the deployed address.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: title, template: "%s | " + coupleNames },
  description,
  robots: { index: false, follow: false },
  openGraph: { title, description, type: "website", locale: "ta_IN" },
  twitter: { card: "summary_large_image", title, description },
  appleWebApp: { capable: true, title: invitation.monogram, statusBarStyle: "black-translucent" },
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
