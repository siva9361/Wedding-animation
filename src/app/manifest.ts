import type { MetadataRoute } from "next";
import { coupleNames, invitation } from "@/lib/wedding-config";

// Lets guests add the invitation to their home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: coupleNames + " — Wedding invitation",
    short_name: invitation.monogram,
    description: invitation.message,
    lang: "ta",
    start_url: "/",
    display: "standalone",
    background_color: "#230b12",
    theme_color: "#581f31",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
