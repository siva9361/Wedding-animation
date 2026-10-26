"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getImageProps } from "next/image";
import { RotateCcw } from "lucide-react";
import { showerFlowers } from "@/lib/flower-shower";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { InvitationCover } from "./invitation-cover";
import { heroArt, InvitationDetails } from "./invitation-details";
import { WeddingMusic, type WeddingMusicHandle } from "./wedding-music";

// Every visit begins at the closed temple doors; a tap opens them slowly and starts the song.
const openingDuration = 8000;
// Petals fall while the doors are nearly open, so the shower meets the names as they appear.
const showerAt = 0.7;
export function SingleInvitation({ song }: { song: string | undefined }) {
  const [view, setView] = useState<"cover" | "opening" | "details">("cover");
  const heading = useRef<HTMLHeadingElement>(null);
  const music = useRef<WeddingMusicHandle>(null);
  const reduce = useReducedMotion();
  // The opening timer belongs to the "opening" view, so a re-run effect restarts it
  // instead of losing it and leaving the doors stuck half open.
  useEffect(() => {
    if (view !== "opening") return;
    const timer = setTimeout(() => setView("details"), reduce ? 80 : openingDuration);
    const shower = reduce ? undefined : setTimeout(showerFlowers, openingDuration * showerAt);
    return () => {
      clearTimeout(timer);
      clearTimeout(shower);
    };
  }, [view, reduce]);
  useEffect(() => {
    if (view === "details") {
      heading.current?.focus({ preventScroll: true });
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [view]);
  // While the doors are still closed, fetch the mandap artwork at low priority so it is
  // already cached when they open. The same srcset and sizes pick the same file.
  useEffect(() => {
    const { props } = getImageProps({
      src: heroArt.src,
      alt: "",
      fill: true,
      sizes: heroArt.sizes,
    });
    const warm = () => {
      const image = new window.Image();
      image.fetchPriority = "low";
      image.sizes = props.sizes ?? "";
      image.srcset = props.srcSet ?? "";
      image.src = props.src;
    };
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(warm, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1200);
    return () => clearTimeout(id);
  }, []);

  function open() {
    if (view !== "cover") return;
    music.current?.play();
    setView("opening");
  }
  function replay() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setView("cover");
  }
  return (
    <div
      className="royal-shell"
      style={{ "--opening-duration": `${openingDuration}ms` } as CSSProperties}
    >
      {view !== "cover" && (
        <div
          className="invitation-stage"
          data-opening={view === "opening"}
          inert={view === "opening"}
        >
          <InvitationDetails headingRef={heading} active={view === "details"} />
        </div>
      )}
      {view !== "details" && <InvitationCover opening={view === "opening"} onOpen={open} />}
      <WeddingMusic ref={music} song={song} visible={view !== "cover"} />
      {view === "details" && (
        <button
          className="floating-replay"
          onClick={replay}
          aria-label="அழைப்பிதழை மீண்டும் திறக்க"
          title="Replay invitation"
        >
          <RotateCcw size={17} />
        </button>
      )}
    </div>
  );
}
