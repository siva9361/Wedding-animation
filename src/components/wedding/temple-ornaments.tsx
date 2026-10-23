import type { CSSProperties } from "react";

export function RoyalDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={"royal-divider" + (light ? " divider-light" : "")} aria-hidden="true">
      <span />
      <svg viewBox="0 0 48 24" fill="none">
        <path
          d="M24 20C8 20 3 8 8 6c7-3 15 5 16 14Zm0 0C40 20 45 8 40 6c-7-3-15 5-16 14Zm0 0C13 9 20 1 24 1c4 0 11 8 0 19Z"
          stroke="currentColor"
        />
        <path d="M11 22h26" stroke="currentColor" />
      </svg>
      <span />
    </div>
  );
}

export function Toran({ className = "" }: { className?: string }) {
  return (
    <svg className={"toran " + className} viewBox="0 0 800 150" fill="none" aria-hidden="true">
      <path
        d="M-20 5Q90 90 200 8Q300 85 400 8Q500 85 600 8Q710 90 820 5"
        stroke="#c39b53"
        strokeWidth="12"
      />
      <path
        d="M-20 5Q90 90 200 8Q300 85 400 8Q500 85 600 8Q710 90 820 5"
        stroke="#fbf2d8"
        strokeWidth="7"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      {Array.from({ length: 17 }, (_, i) => (
        <path
          key={i}
          d="M0 0C-15 16-10 34 0 48C10 32 15 15 0 0Z"
          fill={i % 2 ? "#74823a" : "#8e983e"}
          stroke="#596c2d"
          strokeWidth=".6"
          transform={
            "translate(" +
            i * 50 +
            " " +
            (15 + (i % 4 === 2 ? 33 : i % 2 ? 22 : 0)) +
            ") rotate(" +
            (i % 2 ? 10 : -10) +
            ")"
          }
        />
      ))}
      {[18, 200, 400, 600, 782].map((x, i) => (
        <g key={x} transform={"translate(" + x + " 5)"}>
          <path
            d={"M0 0V" + (i % 2 ? 90 : 115)}
            stroke="#d2b273"
            strokeWidth="5"
            strokeDasharray="4 4"
          />
          <path d={"M-6 " + (i % 2 ? 92 : 117) + "h12l5 12h-22z"} fill="#ba8e40" />
          <ellipse cy={i % 2 ? 90 : 115} rx="7" ry="5" fill="#8f2433" />
        </g>
      ))}
    </svg>
  );
}

// Wick positions of the brass lamps painted in temple-portal.webp (1024x1536 source pixels).
const PORTAL_LAMP_WICKS: [number, number, "top" | "base"][] = [
  [92, 352, "top"],
  [121, 346, "top"],
  [152, 354, "top"],
  [91, 405, "top"],
  [128, 404, "top"],
  [164, 410, "top"],
  [872, 354, "top"],
  [903, 346, "top"],
  [932, 352, "top"],
  [860, 411, "top"],
  [898, 405, "top"],
  [934, 405, "top"],
  [37, 1091, "base"],
  [57, 1095, "base"],
  [91, 1096, "base"],
  [130, 1092, "base"],
  [150, 1090, "base"],
  [873, 1091, "base"],
  [894, 1095, "base"],
  [933, 1097, "base"],
  [966, 1095, "base"],
  [987, 1091, "base"],
];

export function PortalLampFlames() {
  return (
    <div className="lamp-flames" aria-hidden="true">
      {PORTAL_LAMP_WICKS.map(([x, y, tier], i) => (
        <span
          key={i}
          className={"lamp-flame lamp-flame-" + tier}
          style={
            {
              left: `${(x / 1024) * 100}%`,
              top: `${(y / 1536) * 100}%`,
              "--flicker-delay": `${-((i * 0.37) % 1.3)}s`,
              "--flicker-speed": `${1.1 + ((i * 0.23) % 0.7)}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const FLAME_PATH =
  "M20 100C6 100 0 88 3 74C6 61 14 53 15 38C16 27 13 16 9 5C22 15 30 29 31 43C33 38 33 31 31 24C38 35 41 52 39 67C38 77 40 87 36 93C33 98 27 100 20 100Z";

// [centre x, height scale, layer] in a 120x120 box whose base sits on the kundam bricks.
const HOMA_TONGUES: [number, number, "outer" | "inner"][] = [
  [27, 0.45, "outer"],
  [93, 0.5, "outer"],
  [41, 0.74, "outer"],
  [79, 0.8, "outer"],
  [60, 1.12, "outer"],
  [48, 0.5, "inner"],
  [72, 0.56, "inner"],
  [60, 0.8, "inner"],
];

const HOMA_EMBERS = [
  [38, -6, 0],
  [52, 8, 0.7],
  [64, -10, 1.4],
  [46, 12, 2.1],
  [70, 4, 0.35],
  [57, -14, 1.75],
];

export function HomaFire() {
  return (
    <div className="homa-fire" aria-hidden="true">
      <span className="homa-glow" />
      <svg viewBox="0 0 120 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="homa-outer" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff5a0a" />
            <stop offset="0.45" stopColor="#ff9020" />
            <stop offset="0.75" stopColor="#ffb53a" stopOpacity="0.6" />
            <stop offset="1" stopColor="#ffd56a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="homa-inner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#fffbe6" />
            <stop offset="0.5" stopColor="#ffe68a" />
            <stop offset="1" stopColor="#ffc443" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {HOMA_TONGUES.map(([x, scale, layer], i) => (
          <g
            key={i}
            transform={`translate(${x - 20 * scale} ${118 - 100 * scale}) scale(${scale})`}
          >
            <path
              className={"homa-tongue homa-tongue-" + layer}
              d={FLAME_PATH}
              fill={`url(#homa-${layer})`}
              style={
                {
                  "--flicker-delay": `${-(i * 0.29)}s`,
                  "--flicker-speed": `${0.8 + ((i * 0.17) % 0.6)}s`,
                } as CSSProperties
              }
            />
          </g>
        ))}
      </svg>
      {HOMA_EMBERS.map(([x, drift, delay], i) => (
        <span
          key={i}
          className="homa-ember"
          style={
            {
              left: `${x}%`,
              "--ember-drift": `${drift}px`,
              animationDelay: `${delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"mandala " + className}
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle r="97" strokeWidth=".6" />
      <circle r="90" strokeWidth=".5" strokeDasharray="1.5 3" />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={"outer" + i}
          d="M0-87C11-72 11-57 0-45C-11-57-11-72 0-87Z"
          strokeWidth=".7"
          transform={`rotate(${i * 22.5})`}
        />
      ))}
      <circle r="44" strokeWidth=".6" />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={"inner" + i}
          d="M0-42C8-33 8-24 0-17C-8-24-8-33 0-42Z"
          strokeWidth=".6"
          transform={`rotate(${i * 30 + 15})`}
        />
      ))}
      <circle r="14" strokeWidth=".6" />
      <circle r="5" strokeWidth=".6" />
    </svg>
  );
}
