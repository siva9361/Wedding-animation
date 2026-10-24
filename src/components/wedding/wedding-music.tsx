"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Music, VolumeX } from "lucide-react";

export interface WeddingMusicHandle {
  play(): void;
}

function playSong(element: HTMLAudioElement | null) {
  if (!element) return;
  element.volume = 0.55;
  // A blocked song stays silent; the button lets the guest try again.
  element.play().catch(() => {});
}

// Background song for the whole invitation. It starts from the door tap, because browsers
// only allow sound after a tap. The server picks the song (see page.tsx); the button hides
// itself when there is none or the file cannot play.
export function WeddingMusic({
  ref,
  song,
  visible,
}: {
  ref: Ref<WeddingMusicHandle>;
  song: string | undefined;
  visible: boolean;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const resumeOnReturn = useRef(false);
  const started = useRef(false);

  useImperativeHandle(ref, () => ({ play: () => playSong(audio.current) }), []);

  // Pause while the tab is hidden and pick up again when the guest returns.
  useEffect(() => {
    // A broken file can fail before hydration attaches onError.
    const frame = requestAnimationFrame(() => {
      if (audio.current?.error) setAvailable(false);
    });
    function visibility() {
      const element = audio.current;
      if (!element) return;
      if (document.hidden) {
        resumeOnReturn.current = !element.paused;
        element.pause();
      } else if (resumeOnReturn.current) {
        resumeOnReturn.current = false;
        playSong(element);
      }
    }
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  // If the browser refused the door-tap start, try again on the next tap or key press.
  useEffect(() => {
    if (!visible) return;
    function firstGesture() {
      if (!started.current) playSong(audio.current);
    }
    window.addEventListener("pointerup", firstGesture, { once: true });
    window.addEventListener("keydown", firstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerup", firstGesture);
      window.removeEventListener("keydown", firstGesture);
    };
  }, [visible]);

  if (!song) return null;
  return (
    <>
      <audio
        ref={audio}
        src={song}
        loop
        preload="metadata"
        onPlay={() => {
          started.current = true;
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {visible && available && (
        <button
          className="floating-music"
          data-playing={playing}
          onClick={() => (playing ? audio.current?.pause() : playSong(audio.current))}
          aria-label={playing ? "பாடலை நிறுத்த" : "பாடலை இயக்க"}
          aria-pressed={playing}
          title={playing ? "Pause song" : "Play song"}
        >
          {playing ? <Music size={17} /> : <VolumeX size={17} />}
        </button>
      )}
    </>
  );
}
