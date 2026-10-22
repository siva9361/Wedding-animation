"use client";
import { useEffect, useRef, useState } from "react";

function remainingUntil(date: string) {
  const total = Math.max(0, Math.floor((new Date(date).getTime() - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    complete: total === 0,
  };
}
export function Countdown({ date }: { date: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<ReturnType<typeof remainingUntil> | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const value = remainingUntil(date);
      setTime(value);
      if (value.complete && timer) clearInterval(timer);
    };
    const sync = () => {
      if (timer) clearInterval(timer);
      if (visible && !document.hidden) {
        tick();
        if (new Date(date).getTime() > Date.now()) timer = setInterval(tick, 1000);
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
  }, [date]);
  return (
    <div className="countdown-container" ref={ref}>
      {time?.complete ? (
        <p className="countdown-complete" lang="en">
          Our beautiful beginning is here.
        </p>
      ) : (
        <div className="royal-countdown" aria-label="Countdown to the reception" lang="en">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}>
              <span>{time ? String(time[unit]).padStart(2, "0") : "—"}</span>
              <small>{unit}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
