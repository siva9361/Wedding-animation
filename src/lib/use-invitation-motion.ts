"use client";

import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "./use-reduced-motion";

// Small, interruptible enhancements. Touch, keyboard, zoom and reduced motion
// retain native browser behavior; no animation work runs while the page is idle.
export function useInvitationMotion(root: RefObject<HTMLElement | null>, active: boolean) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const article = root.current;
    if (!article || !active || reduce) return;

    const elements = Array.from(article.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      element.dataset.reveal = bounds.top < innerHeight * 0.95 ? "shown" : "pending";
      if (element.dataset.reveal === "pending") observer.observe(element);
    }
    function revealFocus(event: FocusEvent) {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (element) {
        element.dataset.reveal = "shown";
        observer.unobserve(element);
      }
    }
    article.addEventListener("focusin", revealFocus);
    return () => {
      observer.disconnect();
      article.removeEventListener("focusin", revealFocus);
      elements.forEach((element) => {
        element.dataset.reveal = "shown";
      });
    };
  }, [root, active, reduce]);

  useEffect(() => {
    const article = root.current;
    if (!article || !active || reduce) return;

    let frame = 0;
    let targetY = scrollY;
    let positionY = scrollY;
    let lastWrittenY = scrollY;
    let previousTime = 0;
    let startTime = 0;
    let startY = 0;
    let mode: "wheel" | "anchor" = "wheel";
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const clamp = (value: number) =>
      Math.max(0, Math.min(value, document.documentElement.scrollHeight - innerHeight));
    function cancel() {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    function step(now: number) {
      let nextY: number;
      let finished: boolean;
      if (mode === "anchor") {
        const progress = Math.min(1, (now - startTime) / 2000);
        const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        nextY = startY + (targetY - startY) * ease;
        finished = progress === 1;
      } else {
        const elapsed = Math.min(50, now - previousTime);
        nextY = positionY + (targetY - positionY) * (1 - Math.exp(-elapsed / 180));
        finished = Math.abs(targetY - nextY) < 1;
      }
      previousTime = now;
      positionY = nextY;
      window.scrollTo({ top: clamp(finished ? targetY : nextY), behavior: "instant" });
      lastWrittenY = scrollY;
      frame = finished ? 0 : requestAnimationFrame(step);
    }
    function wheel(event: WheelEvent) {
      if (
        !finePointer.matches ||
        !event.cancelable ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY
      )
        return;
      if (
        (event.target as HTMLElement).closest(
          "input, textarea, select, [contenteditable='true'], [data-native-scroll]",
        )
      )
        return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      const origin = frame && mode === "wheel" ? targetY : scrollY;
      const nextTarget = clamp(origin + event.deltaY * unit * 0.65);
      if (nextTarget === origin) return;
      event.preventDefault();
      if (mode === "anchor") cancel();
      mode = "wheel";
      targetY = nextTarget;
      if (!frame) {
        positionY = scrollY;
        previousTime = performance.now();
        lastWrittenY = scrollY;
        frame = requestAnimationFrame(step);
      }
    }
    function anchor(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      const target = link && document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      cancel();
      mode = "anchor";
      startY = lastWrittenY = scrollY;
      targetY = clamp(target.getBoundingClientRect().top + scrollY - 25);
      startTime = performance.now();
      frame = requestAnimationFrame(step);
    }
    function keyboard(event: KeyboardEvent) {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Escape",
          "Tab",
        ].includes(event.key)
      )
        cancel();
    }
    function externalScroll() {
      if (frame && Math.abs(scrollY - lastWrittenY) > 3) cancel();
    }
    window.addEventListener("wheel", wheel, { passive: false });
    article.addEventListener("click", anchor);
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", keyboard);
    window.addEventListener("resize", cancel);
    window.addEventListener("scroll", externalScroll, { passive: true });
    document.addEventListener("visibilitychange", cancel);
    return () => {
      cancel();
      window.removeEventListener("wheel", wheel);
      article.removeEventListener("click", anchor);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("resize", cancel);
      window.removeEventListener("scroll", externalScroll);
      document.removeEventListener("visibilitychange", cancel);
    };
  }, [root, active, reduce]);
}
