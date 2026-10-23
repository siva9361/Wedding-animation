// Hand-drawn illustration of a smiling family in front of a traditional Tamil house.
// Figures are drawn around their feet at (0, 0); an adult stands about 167 units tall.

type Outfit = "veshti" | "saree" | "skirt";
type Hair = "short" | "bald" | "long" | "braids";
type Extra = "glasses" | "mustache" | "shawl" | "jasmine" | "vibhuti" | "bindi" | "kumkum";

interface FamilyMember {
  label: string;
  x: number;
  y: number;
  scale: number;
  skin: string;
  hair: Hair;
  hairColor: string;
  top: string;
  lower: string;
  border: string;
  outfit: Outfit;
  extras: Extra[];
  kid?: boolean;
}

const FAMILY: FamilyMember[] = [
  {
    label: "Father",
    x: 106,
    y: 492,
    scale: 1,
    skin: "#a86d47",
    hair: "short",
    hairColor: "#1f1612",
    top: "#efdfbd",
    lower: "#fbf7ee",
    border: "#c9973f",
    outfit: "veshti",
    extras: ["mustache", "kumkum"],
  },
  {
    label: "Grandfather",
    x: 198,
    y: 492,
    scale: 1,
    skin: "#b97c55",
    hair: "bald",
    hairColor: "#ece6dc",
    top: "#fbf6ea",
    lower: "#fbf7ee",
    border: "#c9973f",
    outfit: "veshti",
    extras: ["glasses", "mustache", "shawl", "vibhuti"],
  },
  {
    label: "Grandmother",
    x: 282,
    y: 492,
    scale: 1,
    skin: "#c08660",
    hair: "long",
    hairColor: "#b9b2a8",
    top: "#c79a3c",
    lower: "#7d1f2e",
    border: "#d9aa4b",
    outfit: "saree",
    extras: ["glasses", "jasmine", "bindi"],
  },
  {
    label: "Mother",
    x: 374,
    y: 492,
    scale: 1,
    skin: "#c48a62",
    hair: "long",
    hairColor: "#20160f",
    top: "#b0306b",
    lower: "#2f7a55",
    border: "#d34f88",
    outfit: "saree",
    extras: ["jasmine", "bindi"],
  },
  {
    label: "Son",
    x: 158,
    y: 514,
    scale: 0.72,
    skin: "#b77a52",
    hair: "short",
    hairColor: "#1f1612",
    top: "#e9a23b",
    lower: "#fbf7ee",
    border: "#c9973f",
    outfit: "veshti",
    extras: ["kumkum"],
    kid: true,
  },
  {
    label: "Daughter",
    x: 324,
    y: 514,
    scale: 0.72,
    skin: "#c38a63",
    hair: "braids",
    hairColor: "#20160f",
    top: "#6f9a3f",
    lower: "#d9487a",
    border: "#e2b44f",
    outfit: "skirt",
    extras: ["jasmine", "bindi"],
    kid: true,
  },
];

function Arm({ side, member }: { side: 1 | -1; member: FamilyMember }) {
  const short = member.outfit !== "veshti";
  return (
    <g>
      {short ? (
        <>
          <line
            x1={24 * side}
            y1={-116}
            x2={30 * side}
            y2={-76}
            stroke={member.skin}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <line
            x1={24 * side}
            y1={-116}
            x2={26 * side}
            y2={-104}
            stroke={member.top}
            strokeWidth={11}
            strokeLinecap="round"
          />
        </>
      ) : (
        <line
          x1={24 * side}
          y1={-116}
          x2={29 * side}
          y2={-78}
          stroke={member.top}
          strokeWidth={10}
          strokeLinecap="round"
        />
      )}
      <circle cx={30 * side} cy={-72} r={4.8} fill={member.skin} />
    </g>
  );
}

function Person({ member }: { member: FamilyMember }) {
  const has = (extra: Extra) => member.extras.includes(extra);
  const draped = member.outfit === "saree";
  return (
    <g transform={`translate(${member.x} ${member.y}) scale(${member.scale})`}>
      <g
        className={member.kid ? "home-bob" : undefined}
        style={member.kid ? { animationDelay: `${-member.x / 100}s` } : undefined}
      >
        <g className="home-person">
          <title>{member.label}</title>
          {/* Hair that falls behind the head */}
          {member.hair === "long" && (
            <ellipse cx={0} cy={-141} rx={19} ry={21} fill={member.hairColor} />
          )}
          {/* Lower garment and feet */}
          <ellipse cx={-9} cy={-3} rx={7} ry={3.2} fill="#6e4330" />
          <ellipse cx={9} cy={-3} rx={7} ry={3.2} fill="#6e4330" />
          {member.outfit === "veshti" ? (
            <>
              <path d="M-21,-66 L-23,-5 L23,-5 L21,-66Z" fill={member.lower} />
              <rect x={-23} y={-14} width={46} height={4} fill={member.border} />
              <path d="M5,-64 L7,-6" stroke="#00000014" strokeWidth={1.5} />
            </>
          ) : (
            <>
              <path d="M-21,-68 Q-27,-34 -29,-4 L29,-4 Q27,-34 21,-68Z" fill={member.lower} />
              <path d="M-28.6,-14 L28.6,-14 L29,-4 L-29,-4Z" fill={member.border} />
              {[-4, 1, 6].map((x) => (
                <path
                  key={x}
                  d={`M${x},-56 L${x * 1.3},-14`}
                  stroke="#0000001f"
                  strokeWidth={1.2}
                />
              ))}
            </>
          )}
          {/* Upper body */}
          <path
            d="M-20,-122 Q-25,-121 -25,-112 L-22,-64 L22,-64 L25,-112 Q25,-121 20,-122Z"
            fill={member.top}
          />
          {member.outfit === "veshti" && (
            <path d="M-6,-122 L0,-112 L6,-122" stroke="#0000002a" strokeWidth={1.4} fill="none" />
          )}
          {(draped || has("shawl")) && (
            <>
              <path
                d="M8,-123 L22,-120 L-6,-63 L-22,-67Z"
                fill={has("shawl") ? "#efe0b8" : member.lower}
              />
              <path d="M22,-120 L-6,-63" stroke={member.border} strokeWidth={3} />
            </>
          )}
          <Arm side={-1} member={member} />
          <Arm side={1} member={member} />
          {member.hair === "braids" && (
            <>
              <path
                d="M-15,-142 Q-21,-125 -18,-108"
                stroke={member.hairColor}
                strokeWidth={6}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M15,-142 Q21,-125 18,-108"
                stroke={member.hairColor}
                strokeWidth={6}
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={-18} cy={-106} r={3} fill="#d9487a" />
              <circle cx={18} cy={-106} r={3} fill="#d9487a" />
            </>
          )}
          {/* Head */}
          <rect x={-5} y={-131} width={10} height={11} fill={member.skin} />
          <circle cx={-16.5} cy={-145} r={3.4} fill={member.skin} />
          <circle cx={16.5} cy={-145} r={3.4} fill={member.skin} />
          <circle cx={0} cy={-145} r={17} fill={member.skin} />
          {member.hair === "short" && (
            <path
              d="M-17,-145 Q-18,-167 0,-166 Q18,-167 17,-145 Q16,-153 10,-157 Q0,-153 -12,-156 Q-16,-152 -17,-145Z"
              fill={member.hairColor}
            />
          )}
          {member.hair === "bald" && (
            <>
              <path
                d="M-17,-139 Q-19,-151 -13,-157 L-12,-152 Q-14,-147 -14,-139Z"
                fill={member.hairColor}
              />
              <path
                d="M17,-139 Q19,-151 13,-157 L12,-152 Q14,-147 14,-139Z"
                fill={member.hairColor}
              />
            </>
          )}
          {(member.hair === "long" || member.hair === "braids") && (
            <path
              d="M-17,-143 Q-18,-166 0,-166 Q18,-166 17,-143 Q15,-155 1,-157 L0,-151 L-1,-157 Q-15,-155 -17,-143Z"
              fill={member.hairColor}
            />
          )}
          {has("jasmine") &&
            [
              [17, -158],
              [19.5, -153],
              [20.5, -148],
              [20.5, -143],
              [19.5, -138],
            ].map(([cx, cy]) => (
              <circle
                key={cy}
                cx={cx}
                cy={cy}
                r={2.1}
                fill="#fffdf4"
                stroke="#e5d6b4"
                strokeWidth={0.5}
              />
            ))}
          {/* Happy face */}
          {has("vibhuti") && (
            <>
              {[-160, -158, -156].map((y) => (
                <path key={y} d={`M-8,${y} H8`} stroke="#fffaf0" strokeWidth={1.1} />
              ))}
              <circle cx={0} cy={-158} r={1.3} fill="#c62a32" />
            </>
          )}
          {has("bindi") && <circle cx={0} cy={-153.5} r={1.7} fill="#c62a32" />}
          {has("kumkum") && <ellipse cx={0} cy={-154} rx={1} ry={2.2} fill="#c62a32" />}
          <path
            d="M-8,-146 q2.5,-3.2 5,0"
            stroke="#2b1a12"
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M3,-146 q2.5,-3.2 5,0"
            stroke="#2b1a12"
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
          {has("glasses") && (
            <g stroke="#5b4636" strokeWidth={1} fill="#ffffff22">
              <circle cx={-5.5} cy={-146.5} r={5.2} />
              <circle cx={5.5} cy={-146.5} r={5.2} />
              <path d="M-0.4,-147 H0.4" />
            </g>
          )}
          <ellipse cx={-10} cy={-139} rx={3.4} ry={2} fill="#e98b7a" opacity={0.5} />
          <ellipse cx={10} cy={-139} rx={3.4} ry={2} fill="#e98b7a" opacity={0.5} />
          {has("mustache") && (
            <path
              d="M-7,-140.5 Q-3,-143.5 0,-141.5 Q3,-143.5 7,-140.5 Q3,-138.8 0,-139.8 Q-3,-138.8 -7,-140.5Z"
              fill={member.hairColor}
            />
          )}
          <path d="M-5.5,-137.5 Q0,-130.5 5.5,-137.5Z" fill="#7e2c22" />
          <path d="M-4.6,-137.3 L4.6,-137.3 Q0,-135.2 -4.6,-137.3Z" fill="#fffaf0" />
        </g>
      </g>
    </g>
  );
}

function BananaTree({ mirror = false }: { mirror?: boolean }) {
  const leaves: [number, number, number][] = [
    [-58, 0, -118],
    [-22, 6, -138],
    [22, -4, -132],
    [62, 4, -108],
    [-95, -6, -92],
  ];
  return (
    <g transform={mirror ? "translate(480 0) scale(-1 1)" : undefined}>
      <g className="home-banana">
        <path d="M30,470 L34,255 L42,255 L40,470Z" fill="#8f9d4f" />
        {leaves.map(([angle, dx, len], i) => (
          <g key={i} transform={`translate(${38 + dx} 262) rotate(${angle})`}>
            <path
              d={`M0,0 C-30,${len * 0.25} -26,${len * 0.8} 0,${len} C24,${len * 0.75} 28,${len * 0.25} 0,0Z`}
              fill={i % 2 ? "#6f9a3f" : "#85ad4c"}
            />
            <path d={`M0,0 L0,${len}`} stroke="#557a2c" strokeWidth={1.2} />
          </g>
        ))}
      </g>
    </g>
  );
}

function Kolam({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#fffaf0" strokeWidth={1.4} fill="none">
      <path d="M0,-12 L12,0 L0,12 L-12,0Z" />
      <path d="M0,-6 Q6,-6 6,0 Q6,6 0,6 Q-6,6 -6,0 Q-6,-6 0,-6Z" />
      {[0, 90, 180, 270].map((r) => (
        <circle key={r} cx={0} cy={-17} r={1.6} fill="#fffaf0" transform={`rotate(${r})`} />
      ))}
    </g>
  );
}

function HangingLamp({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 211)`}>
      <path d="M0,0 V24" stroke="#b08a45" strokeWidth={1.2} strokeDasharray="2 1.5" />
      <circle cx={0} cy={22} r={11} fill="url(#home-lamp-glow)" className="home-lamp-glow" />
      <path className="home-flame" d="M0,14 Q-2.6,19.5 0,22.5 Q2.6,19.5 0,14Z" fill="#ffcf5a" />
      <path d="M-8,24 Q0,31 8,24Z" fill="#c9973f" />
    </g>
  );
}

export function FamilyHome() {
  return (
    <figure className="family-home">
      <svg
        viewBox="0 0 480 520"
        role="img"
        aria-label="Illustration of a smiling family — grandparents, parents and two children — in front of a traditional Tamil home"
      >
        <defs>
          <linearGradient id="home-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6e2" />
            <stop offset="1" stopColor="#f8e3bb" />
          </linearGradient>
          <radialGradient id="home-sun">
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="home-lamp-glow">
            <stop offset="0" stopColor="#ffd56a" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ffd56a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="home-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#efd9ad" />
            <stop offset="1" stopColor="#e0c08a" />
          </linearGradient>
          <pattern id="home-tiles" width="16" height="11" patternUnits="userSpaceOnUse">
            <rect width="16" height="11" fill="#b5532f" />
            <path d="M0,11 Q8,3 16,11" stroke="#8f3c1d" strokeWidth="1.4" fill="none" />
          </pattern>
        </defs>
        <rect width="480" height="520" fill="url(#home-sky)" />
        <circle className="home-sun" cx="240" cy="96" r="120" fill="url(#home-sun)" />
        <circle cx="240" cy="96" r="30" fill="#ffd98a" opacity="0.75" />
        <g
          className="home-birds"
          stroke="#8a6a44"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M96,70 q4,-4 8,0 q4,-4 8,0" />
          <path d="M122,54 q3,-3 6,0 q3,-3 6,0" />
          <path d="M350,62 q4,-4 8,0 q4,-4 8,0" />
        </g>
        {/* House */}
        <polygon points="28,206 92,128 388,128 452,206" fill="url(#home-tiles)" />
        <rect x="86" y="121" width="308" height="9" rx="3" fill="#8d3a1b" />
        <rect x="24" y="202" width="432" height="10" rx="2" fill="#6f2f16" />
        <rect x="62" y="211" width="356" height="145" fill="#f6e6c4" />
        {[118, 326].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="236"
              width="36"
              height="48"
              fill="#3d2418"
              stroke="#6b3d22"
              strokeWidth="4"
            />
            {[6, 12, 18, 24, 30].map((dx) => (
              <path key={dx} d={`M${x + dx},238 V282`} stroke="#c79a4f" strokeWidth="1.4" />
            ))}
          </g>
        ))}
        {[100, 172, 308, 380].map((x) => (
          <g key={x} fill="#6b3d22">
            <rect x={x - 5} y="211" width="10" height="107" />
            <rect x={x - 9} y="211" width="18" height="6" fill="#5a3019" />
            <rect x={x - 8} y="312" width="16" height="6" fill="#5a3019" />
          </g>
        ))}
        <rect x="198" y="220" width="84" height="8" fill="#6b3d22" />
        <rect x="204" y="226" width="72" height="130" rx="2" fill="#5a2b17" />
        {[210, 241].map((x) => (
          <g key={x}>
            <rect x={x} y="234" width="29" height="122" fill="#7b3a1f" />
            <rect
              x={x + 5}
              y="242"
              width="19"
              height="44"
              fill="none"
              stroke="#9a5a2f"
              strokeWidth="1.5"
            />
            <rect
              x={x + 5}
              y="296"
              width="19"
              height="50"
              fill="none"
              stroke="#9a5a2f"
              strokeWidth="1.5"
            />
            {[264, 320].map((y) => (
              <circle key={y} cx={x + 14.5} cy={y} r="2.2" fill="#d7a64a" />
            ))}
          </g>
        ))}
        <g className="home-toran">
          <path d="M198,226 Q240,236 282,226" stroke="#b08a45" strokeWidth="1.2" fill="none" />
          {Array.from({ length: 12 }, (_, i) => {
            const x = 202 + i * 7;
            const y = 226 + Math.sin((i / 11) * Math.PI) * 9;
            return i % 3 === 1 ? (
              <circle key={i} cx={x} cy={y + 3} r="3" fill="#f0a030" />
            ) : (
              <path
                key={i}
                d={`M${x},${y} q3,8 0,15 q-3,-7 0,-15Z`}
                fill={i % 2 ? "#5f8f3a" : "#7aa646"}
              />
            );
          })}
        </g>
        <HangingLamp x={136} />
        <HangingLamp x={344} />
        <rect x="62" y="318" width="138" height="38" fill="#a8462c" />
        <rect x="62" y="318" width="138" height="5" fill="#c56347" />
        <rect x="280" y="318" width="138" height="38" fill="#a8462c" />
        <rect x="280" y="318" width="138" height="5" fill="#c56347" />
        <rect x="0" y="356" width="480" height="164" fill="url(#home-ground)" />
        <rect x="196" y="356" width="88" height="8" fill="#d9c39a" />
        <rect x="188" y="364" width="104" height="8" fill="#cdb486" />
        <BananaTree />
        <BananaTree mirror />
        <Kolam x={44} y={494} />
        <Kolam x={436} y={494} />
        {FAMILY.map((member) => (
          <Person key={member.label} member={member} />
        ))}
      </svg>
    </figure>
  );
}
