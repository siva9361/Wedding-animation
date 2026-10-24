import { existsSync } from "node:fs";
import path from "node:path";
import { SingleInvitation } from "@/components/wedding/single-invitation";
import { weddingSongs } from "@/lib/wedding-config";

export default function HomePage() {
  // Choose the first song file that exists, so guests never request a missing one.
  const song = weddingSongs.find((file) => existsSync(path.join(process.cwd(), "public", file)));
  return <SingleInvitation song={song} />;
}
