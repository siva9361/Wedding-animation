"use client";
import { useEffect, useRef, useState } from "react";
import { upcomingEvent, type InvitationEvent } from "@/lib/wedding-config";

interface Remaining {
  event: InvitationEvent | null;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
// Counts down to the reception, then to the muhurtham once the reception has ended.
function remaining(): Remaining {
  const event = upcomingEvent();
  const total = event
    ? Math.max(0, Math.floor((new Date(event.date).getTime() - Date.now()) / 1000))
    : 0;
  return {
    event,
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
  };
}
export function Countdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<Remaining | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const value = remaining();
      setTime(value);
      if (!value.event && timer) clearInterval(timer);
    };
    const sync = () => {
      if (timer) clearInterval(timer);
      if (visible && !document.hidden) {
        tick();
        if (upcomingEvent()) timer = setInterval(tick, 1000);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      if (timer) clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const started = time?.event && !time.days && !time.hours && !time.minutes && !time.seconds;
  return (
    <div className="countdown-container" ref={ref}>
      {time && !time.event ? (
        <p className="countdown-complete" lang="en">
          Our beautiful beginning is here.
        </p>
      ) : started ? (
        <p className="countdown-complete" lang="en">
          The {time.event!.englishTitle.toLowerCase()} is happening now.
        </p>
      ) : (
        <>
          <div
            className="royal-countdown"
            aria-label={
              "Countdown to the " + (time?.event?.englishTitle.toLowerCase() ?? "celebration")
            }
            lang="en"
          >
            {(["days", "hours", "minutes", "seconds"] as const).map((unit) => {
              const value = time ? String(time[unit]).padStart(2, "0") : "—";
              return (
                <div key={unit}>
                  {/* A new key per value replays the tick animation on every change. */}
                  <span key={value} className="countdown-value">
                    {value}
                  </span>
                  <small>{unit}</small>
                </div>
              );
            })}
          </div>
          {time?.event && (
            <p className="countdown-label" lang="en">
              until the {time.event.englishTitle.toLowerCase()}
            </p>
          )}
        </>
      )}
    </div>
  );
}
