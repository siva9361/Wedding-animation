"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Toran } from "./temple-ornaments";

// A toran whose bells swing when the page scrolls and settle back on a damped spring.
export function SwayingToran({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const svg = ref.current;
    if (!svg || reduce) return;
    let angle = 0;
    let velocity = 0;
    let frame = 0;
    let last = 0;
    let lastY = scrollY;
    let visible = false;
    let greeted = false;
    function write() {
      svg!.style.setProperty("--toran-swing", `${angle.toFixed(2)}deg`);
      svg!.style.setProperty("--toran-stretch", (Math.abs(angle) * 0.004).toFixed(4));
    }
    function step(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      velocity += (-60 * angle - 3.2 * velocity) * dt;
      angle = Math.max(-12, Math.min(12, angle + velocity * dt));
      if (Math.abs(angle) < 0.02 && Math.abs(velocity) < 0.05) {
        angle = velocity = 0;
        frame = 0;
      } else {
        frame = requestAnimationFrame(step);
      }
      write();
    }
    function kick(impulse: number) {
      velocity = Math.max(-70, Math.min(70, velocity + impulse));
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    }
    function scroll() {
      const dy = scrollY - lastY;
      lastY = scrollY;
      if (visible && dy) kick(-dy * 0.6);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !greeted) {
        greeted = true;
        kick(60);
      }
    });
    observer.observe(svg);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      svg.style.removeProperty("--toran-swing");
      svg.style.removeProperty("--toran-stretch");
    };
  }, [reduce]);

  return <Toran ref={ref} className={className} animated />;
}
