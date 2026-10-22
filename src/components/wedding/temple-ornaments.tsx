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
