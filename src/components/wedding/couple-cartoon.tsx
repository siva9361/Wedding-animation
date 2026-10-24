// A small hand-drawn cartoon of the mappillai (groom) and ponnu (bride) holding hands.
// Original SVG artwork; it is illustrative and not a likeness of the couple.
const skin = "#c98a5e";
const skinShade = "#b8784d";
const hair = "#2a1a14";
const gold = "#e0b04a";
const rose = "#c2213f";

function Garland({ x }: { x: number }) {
  const d = `M${x - 16} 88 Q${x - 14} 124 ${x} 128 Q${x + 14} 124 ${x + 16} 88`;
  return (
    <>
      <path d={d} fill="none" stroke="#fffaf0" strokeWidth="7" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={rose}
        strokeWidth="4.6"
        strokeDasharray="0 6.5"
        strokeLinecap="round"
      />
      <circle cx={x} cy="131" r="4.5" fill="#e0a030" />
    </>
  );
}

export function CoupleCartoon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"couple-cartoon " + className}
      viewBox="0 0 240 200"
      role="img"
      aria-label="Cartoon of the groom and bride holding hands"
    >
      <ellipse cx="120" cy="189" rx="86" ry="6" fill="#bd9658" opacity="0.22" />
      <path
        className="couple-cartoon-heart"
        d="M120 22c-3-6-12-4-11 3 1 5 7 8 11 12 4-4 10-7 11-12 1-7-8-9-11-3z"
        fill={rose}
      />
      <path
        className="couple-cartoon-sparkle"
        d="M30 40l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM210 36l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
        fill="#d9b25f"
      />
      <g className="couple-cartoon-body">
        {/* Mappillai: silk shirt, veshti and angavastram. */}
        <path d="M57 128H103L108 180H52Z" fill="#fffdf6" stroke="#d6bb82" strokeWidth="1.4" />
        <rect x="52" y="171" width="56" height="7" fill="#d4a546" />
        <path d="M86 130L90 178" stroke="#d4a546" strokeWidth="3" />
        <ellipse cx="70" cy="184" rx="8" ry="4" fill={skinShade} />
        <ellipse cx="90" cy="184" rx="8" ry="4" fill={skinShade} />
        <path
          d="M56 132Q54 94 70 86H90Q106 94 104 132Z"
          fill="#fbf1d8"
          stroke="#d6bb82"
          strokeWidth="1.6"
        />
        <path d="M66 87L98 128 90 132 60 94Z" fill="#e9c46a" />
        <path d="M66 87L98 128" stroke="#b8862f" strokeWidth="1.5" />
        <path
          d="M59 96Q49 113 53 128M101 96Q113 112 117 126"
          fill="none"
          stroke="#d6bb82"
          strokeWidth="11.6"
          strokeLinecap="round"
        />
        <path
          d="M59 96Q49 113 53 128M101 96Q113 112 117 126"
          fill="none"
          stroke="#fbf1d8"
          strokeWidth="8.4"
          strokeLinecap="round"
        />
        <circle cx="53" cy="131" r="5" fill={skin} />
        <Garland x={80} />
        <rect x="74" y="78" width="12" height="10" rx="3" fill={skinShade} />
        <circle cx="57" cy="61" r="4.5" fill={skin} />
        <circle cx="103" cy="61" r="4.5" fill={skin} />
        <circle cx="80" cy="58" r="23" fill={skin} />
        <path
          d="M56 58Q55 32 80 32 105 32 104 58 101 44 90 42 84 47 70 43 59 46 56 58Z"
          fill={hair}
        />
        <path d="M73 48H87M74 51H86" stroke="#fffaf0" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="80" cy="50" r="1.6" fill={rose} />
        <path
          d="M69 60q4-4 8 0M83 60q4-4 8 0"
          fill="none"
          stroke={hair}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="68" cy="67" r="3.5" fill="#e8737a" opacity="0.45" />
        <circle cx="92" cy="67" r="3.5" fill="#e8737a" opacity="0.45" />
        <path d="M72 68Q76 65 80 67.5 84 65 88 68 84 70 80 69 76 70 72 68Z" fill={hair} />
        <path
          d="M75 72Q80 77 85 72"
          fill="none"
          stroke="#7a2a22"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Ponnu: silk saree, jasmine braid, jhumkas and nethi chutti. */}
        <path
          d="M182 48Q194 70 188 100"
          fill="none"
          stroke={hair}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M184 46Q197 70 191 102"
          fill="none"
          stroke="#fffdf6"
          strokeWidth="5"
          strokeDasharray="0 5"
          strokeLinecap="round"
        />
        <path d="M137 128H183L192 180H128Z" fill="#b3122e" />
        <path
          d="M150 132L146 172M160 132V172M170 132L174 172"
          stroke={gold}
          strokeWidth="1"
          opacity="0.6"
        />
        <rect x="128" y="170" width="64" height="9" fill={gold} />
        <rect x="128" y="173" width="64" height="2" fill="#8e0f26" opacity="0.5" />
        <ellipse cx="150" cy="184" rx="7.5" ry="4" fill={skinShade} />
        <ellipse cx="170" cy="184" rx="7.5" ry="4" fill={skinShade} />
        <path d="M136 132Q134 94 150 86H170Q186 94 184 132Z" fill="#1f6b4a" />
        <path d="M172 86Q182 90 184 98L150 134H136Z" fill="#b3122e" />
        <path d="M176 87Q183 92 184 98L150 134" fill="none" stroke={gold} strokeWidth="4" />
        <path
          d="M139 96Q127 112 123 126M181 96Q191 113 187 128"
          fill="none"
          stroke="#1f6b4a"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="187" cy="131" r="5" fill={skin} />
        <path d="M182 125h10M182 128h10" stroke={gold} strokeWidth="1.6" />
        <Garland x={160} />
        <rect x="154" y="78" width="12" height="10" rx="3" fill={skinShade} />
        <path d="M152 85Q160 93 168 85" fill="none" stroke={gold} strokeWidth="2" />
        <circle cx="137" cy="61" r="4.5" fill={skin} />
        <circle cx="183" cy="61" r="4.5" fill={skin} />
        <circle cx="160" cy="58" r="23" fill={skin} />
        <path
          d="M136 60Q134 32 160 32 186 32 184 60 182 44 170 41 164 40 160 44 156 40 150 41 138 44 136 60Z"
          fill={hair}
        />
        <path d="M137 66v3M183 66v3" stroke={gold} strokeWidth="1.4" />
        <path d="M133.5 69h7l-1 4h-5zM179.5 69h7l-1 4h-5z" fill={gold} />
        <g fill="#fffdf6">
          <circle cx="139" cy="44" r="2.2" />
          <circle cx="143" cy="40" r="2.2" />
          <circle cx="148" cy="37" r="2.2" />
          <circle cx="181" cy="44" r="2.2" />
          <circle cx="177" cy="40" r="2.2" />
          <circle cx="172" cy="37" r="2.2" />
        </g>
        <path d="M160 34V45" stroke={gold} strokeWidth="1.4" />
        <circle cx="160" cy="47" r="2.4" fill={gold} />
        <circle cx="160" cy="53" r="1.6" fill={rose} />
        <path
          d="M149 60q4-4 8 0M163 60q4-4 8 0"
          fill="none"
          stroke={hair}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M149 60l-2-1.5M171 60l2-1.5"
          stroke={hair}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="148" cy="67" r="3.5" fill="#e8737a" opacity="0.5" />
        <circle cx="172" cy="67" r="3.5" fill="#e8737a" opacity="0.5" />
        <path
          d="M155 70Q160 75 165 70"
          fill="none"
          stroke="#a3283a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Joined hands. */}
        <circle cx="120" cy="128" r="6.5" fill={skin} />
        <path d="M124 122v12" stroke={gold} strokeWidth="1.6" />
      </g>
    </svg>
  );
}
