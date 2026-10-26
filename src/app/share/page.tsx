import type { Metadata } from "next";
import { SharePanel } from "@/components/wedding/share-panel";
import { SubpageShell } from "@/components/wedding/subpage-shell";

export const metadata: Metadata = {
  title: "Share the invitation",
  description: "Send the invitation on WhatsApp, copy the link, or scan the QR code.",
};

export default function SharePage() {
  return (
    <SubpageShell
      eyebrow="Spread the joy"
      title="Share the Invitation"
      tamilTitle="அழைப்பிதழைப் பகிர்க"
    >
      <SharePanel />
    </SubpageShell>
  );
}
