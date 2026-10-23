"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { InvitationCover } from "./invitation-cover";
import { InvitationDetails } from "./invitation-details";

const openedKey = "vignesh-sandhya:temple-invitation:v2";
const openingDuration = 6500;
export function SingleInvitation() {
  const [view, setView] = useState<"cover" | "opening" | "details">("cover");
  const heading = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        if (sessionStorage.getItem(openedKey) === "yes") setView("details");
      } catch {
        /* Storage is optional. */
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
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

  function open() {
    if (view !== "cover") return;
    setView("opening");
    timer.current = setTimeout(
      () => {
        try {
          sessionStorage.setItem(openedKey, "yes");
        } catch {
          /* Opening works without storage. */
        }
        setView("details");
      },
      reduce ? 80 : openingDuration,
    );
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
