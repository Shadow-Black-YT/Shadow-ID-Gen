import { cn } from '@/lib/utils';
import { CardType } from '@/types/idcard';

interface Props {
  cardType: CardType;
  selected: string | null;
  onSelect: (logo: string | null) => void;
}

const svg = (content: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${content}</svg>`)}`;

// Background shapes
const bg = {
  circle: (c: string, ac: string) => `<circle cx="32" cy="32" r="30" fill="${c}"/><circle cx="32" cy="32" r="26" fill="none" stroke="${ac}" stroke-width="1.2"/>`,
  shield: (c: string, ac: string) => `<path d="M32 3 L59 16 L59 38 Q59 55 32 63 Q5 55 5 38 L5 16Z" fill="${c}"/><path d="M32 8 L54 19 L54 37 Q54 51 32 58 Q10 51 10 37 L10 19Z" fill="none" stroke="${ac}" stroke-width="1"/>`,
  hex: (c: string, ac: string) => `<polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="${c}"/><polygon points="32,7 53,20 53,44 32,57 11,44 11,20" fill="none" stroke="${ac}" stroke-width="1"/>`,
  rect: (c: string, ac: string) => `<rect x="4" y="4" width="56" height="56" rx="8" fill="${c}"/><rect x="8" y="8" width="48" height="48" rx="5" fill="none" stroke="${ac}" stroke-width="1"/>`,
};

// --- UNIVERSITY LOGOS ---
const UNIVERSITY_LOGOS = [
  { id: 'uni1', name: 'Classic Crest', src: svg(`${bg.shield('#1e3a5f','#4a90d9')}
    <path d="M24 28h16v2h-16z M28 24h8v12h-8z M26 24h2v4h-2z M36 24h2v4h-2z" fill="#fff" opacity="0.9"/>
    <path d="M20 42q12 6 24 0" fill="none" stroke="#4a90d9" stroke-width="1.5"/>
    <path d="M18 44q14 7 28 0" fill="none" stroke="#4a90d9" stroke-width="1"/>
    <circle cx="22" cy="20" r="1.5" fill="#4a90d9"/><circle cx="42" cy="20" r="1.5" fill="#4a90d9"/>`) },
  { id: 'uni2', name: 'Modern Tech', src: svg(`${bg.hex('#0f172a','#38bdf8')}
    <circle cx="32" cy="30" r="6" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
    <circle cx="32" cy="30" r="2" fill="#38bdf8"/>
    <ellipse cx="32" cy="30" rx="12" ry="4" fill="none" stroke="#38bdf8" stroke-width="0.8" transform="rotate(60 32 30)"/>
    <ellipse cx="32" cy="30" rx="12" ry="4" fill="none" stroke="#38bdf8" stroke-width="0.8" transform="rotate(-60 32 30)"/>
    <line x1="20" y1="44" x2="26" y2="40" stroke="#38bdf8" stroke-width="0.7"/><line x1="44" y1="44" x2="38" y2="40" stroke="#38bdf8" stroke-width="0.7"/>
    <line x1="20" y1="18" x2="26" y2="22" stroke="#38bdf8" stroke-width="0.7"/><line x1="44" y1="18" x2="38" y2="22" stroke="#38bdf8" stroke-width="0.7"/>`) },
  { id: 'uni3', name: 'Golden Seal', src: svg(`${bg.circle('#78350f','#f59e0b')}
    <path d="M26 28L32 18L38 28H36L32 22L28 28Z" fill="#fde68a"/>
    <rect x="26" y="28" width="12" height="2" rx="1" fill="#fde68a"/>
    <line x1="30" y1="30" x2="30" y2="34" stroke="#fde68a" stroke-width="1.5"/>
    <line x1="34" y1="30" x2="34" y2="34" stroke="#fde68a" stroke-width="1.5"/>
    <circle cx="24" cy="38" r="1" fill="#f59e0b"/><circle cx="32" cy="40" r="1" fill="#f59e0b"/><circle cx="40" cy="38" r="1" fill="#f59e0b"/>
    <circle cx="20" cy="34" r="0.8" fill="#f59e0b"/><circle cx="44" cy="34" r="0.8" fill="#f59e0b"/>`) },
  { id: 'uni4', name: 'Academic', src: svg(`${bg.shield('#14532d','#4ade80')}
    <rect x="22" y="24" width="3" height="18" rx="1" fill="#fff" opacity="0.85"/>
    <rect x="30.5" y="24" width="3" height="18" rx="1" fill="#fff" opacity="0.85"/>
    <rect x="39" y="24" width="3" height="18" rx="1" fill="#fff" opacity="0.85"/>
    <rect x="20" y="22" width="24" height="3" rx="1" fill="#fff" opacity="0.9"/>
    <path d="M20 22L32 16L44 22" fill="none" stroke="#4ade80" stroke-width="1.5"/>`) },
  { id: 'uni5', name: 'Research', src: svg(`${bg.hex('#7c2d12','#fb923c')}
    <rect x="29" y="20" width="6" height="16" rx="3" fill="none" stroke="#fff" stroke-width="1.5"/>
    <line x1="32" y1="36" x2="32" y2="44" stroke="#fff" stroke-width="1.5"/>
    <line x1="28" y1="44" x2="36" y2="44" stroke="#fff" stroke-width="1.5"/>
    <circle cx="32" cy="28" r="2" fill="#fb923c"/>
    <line x1="32" y1="20" x2="32" y2="16" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="15" r="2" fill="none" stroke="#fb923c" stroke-width="1"/>`) },
  { id: 'uni6', name: 'Royal Academy', src: svg(`${bg.shield('#4c1d95','#a78bfa')}
    <path d="M26 26L32 18L38 26" fill="none" stroke="#fde68a" stroke-width="2"/>
    <circle cx="32" cy="18" r="2" fill="#fde68a"/>
    <circle cx="26" cy="26" r="1.5" fill="#fde68a"/><circle cx="38" cy="26" r="1.5" fill="#fde68a"/>
    <line x1="24" y1="32" x2="32" y2="28" stroke="#fff" stroke-width="1.2"/>
    <line x1="40" y1="32" x2="32" y2="28" stroke="#fff" stroke-width="1.2"/>
    <line x1="24" y1="32" x2="24" y2="42" stroke="#fff" stroke-width="1"/>
    <line x1="40" y1="32" x2="40" y2="42" stroke="#fff" stroke-width="1"/>
    <path d="M22 44q10-4 20 0" fill="none" stroke="#a78bfa" stroke-width="1"/>`) },
  { id: 'uni7', name: 'Metro Univ', src: svg(`${bg.rect('#0f172a','#0ea5e9')}
    <rect x="20" y="30" width="4" height="14" fill="#38bdf8" opacity="0.8"/>
    <rect x="26" y="24" width="4" height="20" fill="#38bdf8" opacity="0.9"/>
    <rect x="32" y="28" width="4" height="16" fill="#38bdf8" opacity="0.7"/>
    <rect x="38" y="22" width="4" height="22" fill="#38bdf8"/>
    <path d="M24 48h20v2h-20z" fill="#38bdf8" opacity="0.5"/>
    <path d="M28 18h8v4h-8z" fill="none" stroke="#0ea5e9" stroke-width="1"/>
    <line x1="30" y1="18" x2="30" y2="22" stroke="#0ea5e9" stroke-width="0.7"/>
    <line x1="34" y1="18" x2="34" y2="22" stroke="#0ea5e9" stroke-width="0.7"/>`) },
  { id: 'uni8', name: 'Liberal Arts', src: svg(`${bg.circle('#831843','#f472b6')}
    <path d="M28 40C28 40 26 28 26 24C26 20 30 18 32 18C34 18 38 20 38 24C38 28 36 40 36 40" fill="none" stroke="#fff" stroke-width="1.5"/>
    <line x1="26" y1="28" x2="38" y2="28" stroke="#fff" stroke-width="0.8"/>
    <line x1="26" y1="32" x2="38" y2="32" stroke="#fff" stroke-width="0.8"/>
    <line x1="26" y1="36" x2="38" y2="36" stroke="#fff" stroke-width="0.8"/>
    <line x1="28" y1="40" x2="36" y2="40" stroke="#f472b6" stroke-width="1.5"/>`) },
  { id: 'uni9', name: 'Prestige', src: svg(`${bg.shield('#1c1917','#92400e')}
    <line x1="32" y1="16" x2="32" y2="36" stroke="#d4a574" stroke-width="2"/>
    <circle cx="32" cy="16" r="3" fill="#d4a574"/>
    <path d="M29 16L32 12L35 16" fill="#d4a574"/>
    <path d="M20 40q6-4 12-2q6 2 12-2" fill="none" stroke="#92400e" stroke-width="1.2"/>
    <path d="M20 44q6-4 12-2q6 2 12-2" fill="none" stroke="#92400e" stroke-width="1"/>`) },
  { id: 'uni10', name: 'National', src: svg(`${bg.hex('#0c4a6e','#38bdf8')}
    <circle cx="32" cy="28" r="8" fill="none" stroke="#fff" stroke-width="1.2"/>
    <ellipse cx="32" cy="28" rx="8" ry="3" fill="none" stroke="#fff" stroke-width="0.7"/>
    <line x1="32" y1="20" x2="32" y2="36" stroke="#fff" stroke-width="0.7"/>
    <path d="M28 40L32 36L36 40H34L32 38L30 40Z" fill="#38bdf8"/>
    <rect x="28" y="40" width="8" height="2" rx="1" fill="#38bdf8"/>`) },
  { id: 'uni11', name: 'Heritage', src: svg(`${bg.shield('#365314','#a3e635')}
    <line x1="32" y1="44" x2="32" y2="28" stroke="#fff" stroke-width="2"/>
    <path d="M32 28Q26 24 24 18" fill="none" stroke="#a3e635" stroke-width="1.5"/>
    <path d="M32 28Q38 24 40 18" fill="none" stroke="#a3e635" stroke-width="1.5"/>
    <path d="M32 32Q28 30 22 28" fill="none" stroke="#a3e635" stroke-width="1.2"/>
    <path d="M32 32Q36 30 42 28" fill="none" stroke="#a3e635" stroke-width="1.2"/>
    <path d="M32 36Q26 36 22 38" fill="none" stroke="#a3e635" stroke-width="1"/>
    <path d="M32 36Q38 36 42 38" fill="none" stroke="#a3e635" stroke-width="1"/>`) },
  { id: 'uni12', name: 'Pioneer', src: svg(`${bg.circle('#4a044e','#d946ef')}
    <path d="M32 16L34 28L38 26L34 30L36 42L32 32L28 42L30 30L26 26L30 28Z" fill="#e879f9"/>
    <circle cx="22" cy="20" r="1" fill="#d946ef"/><circle cx="42" cy="20" r="1" fill="#d946ef"/>
    <circle cx="20" cy="36" r="0.8" fill="#d946ef"/><circle cx="44" cy="36" r="0.8" fill="#d946ef"/>
    <circle cx="26" cy="44" r="1" fill="#d946ef"/><circle cx="38" cy="44" r="1" fill="#d946ef"/>`) },
];

// --- SCHOOL LOGOS ---
const SCHOOL_LOGOS = [
  { id: 'sch1', name: 'Scholar', src: svg(`${bg.shield('#1e3a5f','#60a5fa')}
    <line x1="26" y1="42" x2="38" y2="20" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="22" x2="36" y2="44" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/>
    <line x1="22" y1="34" x2="40" y2="34" stroke="#fff" stroke-width="1" opacity="0.5"/>`) },
  { id: 'sch2', name: 'Academy', src: svg(`${bg.circle('#14532d','#4ade80')}
    <path d="M24 26h16v2h-16z M26 28v10h2v-10z M30 28v10h4v-10z M36 28v10h2v-10z" fill="#fff" opacity="0.9"/>
    <path d="M24 24h16v2h-16z" fill="#4ade80"/>
    <circle cx="40" cy="38" r="4" fill="#ef4444" opacity="0.8"/>`) },
  { id: 'sch3', name: 'Bright Star', src: svg(`${bg.circle('#78350f','#f59e0b')}
    <path d="M32 14L35 24L46 24L37 30L40 40L32 34L24 40L27 30L18 24L29 24Z" fill="#fbbf24"/>
    <circle cx="32" cy="28" r="3" fill="#78350f"/>`) },
  { id: 'sch4', name: 'Eagle', src: svg(`${bg.shield('#1e1b4b','#818cf8')}
    <path d="M32 18C28 18 22 22 22 28C22 30 24 32 26 32L28 30C26 30 24 28 24 26C24 24 28 20 32 20C36 20 40 24 40 26C40 28 38 30 36 30L38 32C40 32 42 30 42 28C42 22 36 18 32 18Z" fill="#fff" opacity="0.9"/>
    <path d="M30 32L32 38L34 32" fill="#818cf8"/>
    <path d="M26 40h12" stroke="#818cf8" stroke-width="1"/>`) },
  { id: 'sch5', name: 'Wisdom', src: svg(`${bg.hex('#7f1d1d','#f87171')}
    <circle cx="26" cy="26" r="4" fill="#fde68a" opacity="0.9"/>
    <circle cx="38" cy="26" r="4" fill="#fde68a" opacity="0.9"/>
    <circle cx="26" cy="26" r="2" fill="#1e1b4b"/><circle cx="38" cy="26" r="2" fill="#1e1b4b"/>
    <path d="M28 30Q32 36 36 30" fill="none" stroke="#fde68a" stroke-width="1.5"/>
    <path d="M22 22L18 18" stroke="#f87171" stroke-width="1.5"/><path d="M42 22L46 18" stroke="#f87171" stroke-width="1.5"/>
    <path d="M26 36L32 42L38 36" fill="#fde68a" opacity="0.6"/>`) },
  { id: 'sch6', name: 'Greenfield', src: svg(`${bg.rect('#052e16','#22c55e')}
    <line x1="32" y1="48" x2="32" y2="28" stroke="#86efac" stroke-width="2.5"/>
    <circle cx="32" cy="24" r="8" fill="#22c55e" opacity="0.7"/>
    <circle cx="28" cy="20" r="4" fill="#4ade80" opacity="0.6"/>
    <circle cx="36" cy="20" r="4" fill="#4ade80" opacity="0.6"/>
    <circle cx="32" cy="16" r="4" fill="#86efac" opacity="0.5"/>`) },
  { id: 'sch7', name: 'Sunrise', src: svg(`${bg.circle('#431407','#f97316')}
    <path d="M16 36h32v2h-32z" fill="#fdba74" opacity="0.4"/>
    <circle cx="32" cy="36" r="8" fill="#f97316"/>
    <path d="M16 36Q24 34 32 36Q40 38 48 36" fill="#431407"/>
    <line x1="32" y1="22" x2="32" y2="26" stroke="#fdba74" stroke-width="1.5"/>
    <line x1="22" y1="26" x2="24" y2="29" stroke="#fdba74" stroke-width="1.2"/>
    <line x1="42" y1="26" x2="40" y2="29" stroke="#fdba74" stroke-width="1.2"/>
    <line x1="18" y1="32" x2="22" y2="33" stroke="#fdba74" stroke-width="1"/>
    <line x1="46" y1="32" x2="42" y2="33" stroke="#fdba74" stroke-width="1"/>`) },
  { id: 'sch8', name: 'Central', src: svg(`${bg.shield('#172554','#3b82f6')}
    <rect x="28" y="18" width="8" height="26" rx="1" fill="#fff" opacity="0.2"/>
    <rect x="30" y="16" width="4" height="28" fill="#fff" opacity="0.85"/>
    <path d="M26 20h12v4h-12z" fill="#3b82f6"/>
    <circle cx="32" cy="16" r="3" fill="#3b82f6"/>
    <path d="M24 46h16" stroke="#3b82f6" stroke-width="1.5"/>`) },
  { id: 'sch9', name: 'Victory', src: svg(`${bg.circle('#4c1d95','#a78bfa')}
    <path d="M24 38L28 22H36L40 38H36L34 30H30L28 38Z" fill="#fde68a"/>
    <rect x="28" y="38" width="8" height="4" rx="1" fill="#fde68a" opacity="0.8"/>
    <rect x="30" y="42" width="4" height="4" fill="#fde68a" opacity="0.6"/>
    <rect x="26" y="46" width="12" height="2" rx="1" fill="#a78bfa"/>
    <circle cx="32" cy="20" r="2" fill="#fde68a"/>`) },
  { id: 'sch10', name: 'Harmony', src: svg(`${bg.hex('#083344','#06b6d4')}
    <circle cx="30" cy="28" r="5" fill="none" stroke="#67e8f9" stroke-width="1.5"/>
    <line x1="35" y1="28" x2="35" y2="40" stroke="#67e8f9" stroke-width="2"/>
    <path d="M35 28Q40 26 38 22" fill="none" stroke="#67e8f9" stroke-width="1.5"/>
    <path d="M22 38h12v2h-12z M24 40v6h2v-6z M28 40v6h4v-6z" fill="#fff" opacity="0.7"/>`) },
  { id: 'sch11', name: 'Inspire', src: svg(`${bg.rect('#831843','#f43f5e')}
    <path d="M28 20Q28 14 32 14Q36 14 36 20L36 30Q36 34 32 36Q28 34 28 30Z" fill="#fde68a" opacity="0.9"/>
    <rect x="30" y="36" width="4" height="3" fill="#fde68a" opacity="0.7"/>
    <line x1="28" y1="39" x2="36" y2="39" stroke="#fde68a" stroke-width="1"/>
    <line x1="29" y1="41" x2="35" y2="41" stroke="#fde68a" stroke-width="0.8"/>
    <path d="M32 14L34 10" stroke="#f43f5e" stroke-width="1"/><path d="M36 16L40 14" stroke="#f43f5e" stroke-width="1"/><path d="M28 16L24 14" stroke="#f43f5e" stroke-width="1"/>`) },
  { id: 'sch12', name: 'Pinnacle', src: svg(`${bg.shield('#0c4a6e','#0ea5e9')}
    <path d="M32 16L42 40H22Z" fill="none" stroke="#fff" stroke-width="1.5"/>
    <path d="M32 16L36 26H28Z" fill="#0ea5e9" opacity="0.5"/>
    <line x1="32" y1="16" x2="32" y2="12" stroke="#0ea5e9" stroke-width="1.5"/>
    <path d="M30 10h4v4h-4z" fill="#0ea5e9"/>
    <line x1="22" y1="40" x2="42" y2="40" stroke="#fff" stroke-width="1"/>`) },
];

// --- EMPLOYEE / COMPANY LOGOS ---
const EMPLOYEE_LOGOS = [
  { id: 'emp1', name: 'Corp Blue', src: svg(`${bg.rect('#172554','#3b82f6')}
    <rect x="24" y="24" width="6" height="22" fill="#93c5fd" opacity="0.8"/>
    <rect x="32" y="18" width="6" height="28" fill="#60a5fa"/>
    <rect x="40" y="28" width="6" height="18" fill="#93c5fd" opacity="0.6"/>
    <rect x="16" y="16" width="6" height="30" fill="#93c5fd" opacity="0.4"/>
    <path d="M14 48h38" stroke="#3b82f6" stroke-width="1.5"/>`) },
  { id: 'emp2', name: 'TechCo', src: svg(`${bg.hex('#0f172a','#0284c7')}
    <text x="32" y="36" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="16" fill="#38bdf8">&lt;/&gt;</text>
    <circle cx="20" cy="22" r="1" fill="#0284c7"/><circle cx="44" cy="22" r="1" fill="#0284c7"/>
    <line x1="20" y1="44" x2="24" y2="40" stroke="#0284c7" stroke-width="0.7"/>
    <line x1="44" y1="44" x2="40" y2="40" stroke="#0284c7" stroke-width="0.7"/>`) },
  { id: 'emp3', name: 'Innovate', src: svg(`${bg.circle('#4c1d95','#8b5cf6')}
    <path d="M28 20Q28 14 32 14Q36 14 36 20L36 28Q36 32 32 34Q28 32 28 28Z" fill="#fde68a" opacity="0.85"/>
    <circle cx="32" cy="34" r="6" fill="none" stroke="#c4b5fd" stroke-width="1.2"/>
    <path d="M26 34L22 38" stroke="#c4b5fd" stroke-width="1"/><path d="M38 34L42 38" stroke="#c4b5fd" stroke-width="1"/>
    <path d="M28 40L32 44L36 40" fill="none" stroke="#c4b5fd" stroke-width="1"/>`) },
  { id: 'emp4', name: 'Enterprise', src: svg(`${bg.rect('#1c1917','#ca8a04')}
    <rect x="22" y="24" width="20" height="16" rx="2" fill="none" stroke="#fcd34d" stroke-width="1.5"/>
    <path d="M22 28h20" stroke="#fcd34d" stroke-width="1"/>
    <rect x="30" y="40" width="4" height="6" fill="#fcd34d" opacity="0.7"/>
    <circle cx="32" cy="20" r="2" fill="#fcd34d"/>
    <path d="M28 20h8" stroke="#ca8a04" stroke-width="1"/>`) },
  { id: 'emp5', name: 'Global', src: svg(`${bg.circle('#14532d','#22c55e')}
    <circle cx="32" cy="30" r="12" fill="none" stroke="#fff" stroke-width="1.5"/>
    <ellipse cx="32" cy="30" rx="5" ry="12" fill="none" stroke="#fff" stroke-width="0.8"/>
    <line x1="20" y1="30" x2="44" y2="30" stroke="#fff" stroke-width="0.7"/>
    <line x1="22" y1="24" x2="42" y2="24" stroke="#fff" stroke-width="0.5"/>
    <line x1="22" y1="36" x2="42" y2="36" stroke="#fff" stroke-width="0.5"/>
    <line x1="32" y1="18" x2="32" y2="42" stroke="#fff" stroke-width="0.7"/>`) },
  { id: 'emp6', name: 'Prime', src: svg(`${bg.rect('#7f1d1d','#ef4444')}
    <path d="M24 18h10q6 0 6 6t-6 6h-10z" fill="none" stroke="#fff" stroke-width="1.8"/>
    <line x1="24" y1="18" x2="24" y2="46" stroke="#fff" stroke-width="2"/>
    <rect x="20" y="34" width="4" height="2" fill="#ef4444"/><rect x="20" y="38" width="6" height="2" fill="#ef4444"/><rect x="20" y="42" width="8" height="2" fill="#ef4444"/>`) },
  { id: 'emp7', name: 'Nexus', src: svg(`${bg.hex('#0c4a6e','#0ea5e9')}
    <circle cx="24" cy="24" r="3" fill="#7dd3fc"/><circle cx="40" cy="24" r="3" fill="#7dd3fc"/>
    <circle cx="24" cy="40" r="3" fill="#7dd3fc"/><circle cx="40" cy="40" r="3" fill="#7dd3fc"/>
    <circle cx="32" cy="32" r="3" fill="#0ea5e9"/>
    <line x1="24" y1="24" x2="32" y2="32" stroke="#7dd3fc" stroke-width="1"/>
    <line x1="40" y1="24" x2="32" y2="32" stroke="#7dd3fc" stroke-width="1"/>
    <line x1="24" y1="40" x2="32" y2="32" stroke="#7dd3fc" stroke-width="1"/>
    <line x1="40" y1="40" x2="32" y2="32" stroke="#7dd3fc" stroke-width="1"/>
    <line x1="24" y1="24" x2="40" y2="24" stroke="#7dd3fc" stroke-width="0.5"/>
    <line x1="24" y1="40" x2="40" y2="40" stroke="#7dd3fc" stroke-width="0.5"/>`) },
  { id: 'emp8', name: 'Summit', src: svg(`${bg.rect('#78350f','#d97706')}
    <path d="M18 44L32 20L46 44Z" fill="none" stroke="#fde68a" stroke-width="1.5"/>
    <path d="M26 44L32 30L38 44Z" fill="#d97706" opacity="0.4"/>
    <path d="M32 20L34 16" stroke="#fde68a" stroke-width="1.5"/>
    <path d="M30 14h4l2 4h-8z" fill="#fde68a" opacity="0.7"/>`) },
  { id: 'emp9', name: 'Vertex', src: svg(`${bg.circle('#4a044e','#d946ef')}
    <path d="M32 16L44 32L32 48L20 32Z" fill="none" stroke="#f0abfc" stroke-width="1.5"/>
    <path d="M32 22L38 32L32 42L26 32Z" fill="#d946ef" opacity="0.4"/>
    <line x1="32" y1="16" x2="32" y2="48" stroke="#f0abfc" stroke-width="0.5"/>
    <line x1="20" y1="32" x2="44" y2="32" stroke="#f0abfc" stroke-width="0.5"/>`) },
  { id: 'emp10', name: 'Axiom', src: svg(`${bg.rect('#082f49','#0369a1')}
    <path d="M20 32Q20 22 32 22Q44 22 44 32Q44 42 32 42Q20 42 20 32Z" fill="none" stroke="#fff" stroke-width="1.5"/>
    <path d="M26 32Q26 26 32 26Q44 26 44 32Q44 38 32 38Q26 38 26 32Z" fill="none" stroke="#fff" stroke-width="1"/>`) },
  { id: 'emp11', name: 'Fusion', src: svg(`${bg.hex('#431407','#ea580c')}
    <circle cx="28" cy="30" r="8" fill="none" stroke="#fdba74" stroke-width="1.5"/>
    <circle cx="36" cy="30" r="8" fill="none" stroke="#fdba74" stroke-width="1.5"/>
    <path d="M32 23.5Q34 30 32 36.5" fill="none" stroke="#fff" stroke-width="1"/>`) },
  { id: 'emp12', name: 'Quantum', src: svg(`${bg.rect('#1e1b4b','#6366f1')}
    <circle cx="32" cy="32" r="3" fill="#a5b4fc"/>
    <circle cx="32" cy="32" r="10" fill="none" stroke="#a5b4fc" stroke-width="0.8"/>
    <ellipse cx="32" cy="32" rx="16" ry="6" fill="none" stroke="#a5b4fc" stroke-width="1" transform="rotate(45 32 32)"/>
    <ellipse cx="32" cy="32" rx="16" ry="6" fill="none" stroke="#a5b4fc" stroke-width="1" transform="rotate(-45 32 32)"/>`) },
];

// --- EVENT LOGOS ---
const EVENT_LOGOS = [
  { id: 'evt1', name: 'Fest', src: svg(`${bg.circle('#7c2d12','#fb923c')}
    <path d="M28 38L24 18" stroke="#fde68a" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 18L20 14" stroke="#fb923c" stroke-width="1.5"/><path d="M24 18L28 14" stroke="#ef4444" stroke-width="1.5"/><path d="M24 18L22 12" stroke="#fbbf24" stroke-width="1.5"/>
    <circle cx="20" cy="14" r="1.5" fill="#fb923c"/><circle cx="28" cy="14" r="1.5" fill="#ef4444"/><circle cx="22" cy="12" r="1" fill="#fbbf24"/>
    <circle cx="36" cy="22" r="1" fill="#fde68a"/><circle cx="40" cy="26" r="1.5" fill="#fb923c"/><circle cx="38" cy="18" r="1" fill="#fbbf24"/>`) },
  { id: 'evt2', name: 'Expo', src: svg(`${bg.hex('#172554','#3b82f6')}
    <rect x="20" y="24" width="24" height="18" rx="1" fill="none" stroke="#93c5fd" stroke-width="1.5"/>
    <line x1="32" y1="24" x2="32" y2="42" stroke="#93c5fd" stroke-width="0.8"/>
    <rect x="22" y="26" width="8" height="6" fill="#3b82f6" opacity="0.5"/>
    <rect x="34" y="26" width="8" height="6" fill="#3b82f6" opacity="0.3"/>
    <path d="M20 24L32 16L44 24" fill="none" stroke="#93c5fd" stroke-width="1.2"/>`) },
  { id: 'evt3', name: 'Summit', src: svg(`${bg.shield('#14532d','#4ade80')}
    <rect x="28" y="22" width="8" height="18" rx="1" fill="#fff" opacity="0.2"/>
    <rect x="30" y="20" width="4" height="22" fill="#fff" opacity="0.85"/>
    <rect x="24" y="42" width="16" height="2" rx="1" fill="#4ade80"/>
    <path d="M26 20h12v3h-12z" fill="#4ade80"/>
    <circle cx="24" cy="28" r="2" fill="none" stroke="#fff" stroke-width="0.8"/>
    <circle cx="40" cy="28" r="2" fill="none" stroke="#fff" stroke-width="0.8"/>`) },
  { id: 'evt4', name: 'Gala', src: svg(`${bg.circle('#4c1d95','#a78bfa')}
    <line x1="32" y1="14" x2="32" y2="20" stroke="#ddd6fe" stroke-width="1.5"/>
    <line x1="22" y1="18" x2="26" y2="22" stroke="#ddd6fe" stroke-width="1.2"/>
    <line x1="42" y1="18" x2="38" y2="22" stroke="#ddd6fe" stroke-width="1.2"/>
    <line x1="18" y1="26" x2="24" y2="28" stroke="#ddd6fe" stroke-width="1"/>
    <line x1="46" y1="26" x2="40" y2="28" stroke="#ddd6fe" stroke-width="1"/>
    <circle cx="32" cy="30" r="6" fill="#a78bfa" opacity="0.5"/>
    <circle cx="32" cy="30" r="2" fill="#ddd6fe"/>
    <line x1="32" y1="36" x2="28" y2="44" stroke="#ddd6fe" stroke-width="1"/><line x1="32" y1="36" x2="36" y2="44" stroke="#ddd6fe" stroke-width="1"/>
    <line x1="32" y1="36" x2="32" y2="46" stroke="#ddd6fe" stroke-width="0.8"/>`) },
  { id: 'evt5', name: 'Forum', src: svg(`${bg.rect('#0c4a6e','#0ea5e9')}
    <rect x="18" y="20" width="18" height="12" rx="4" fill="#fff" opacity="0.85"/>
    <path d="M22 32L18 38" stroke="#fff" stroke-width="1.5"/>
    <rect x="28" y="28" width="18" height="12" rx="4" fill="#0ea5e9" opacity="0.7"/>
    <path d="M42 40L46 46" stroke="#0ea5e9" stroke-width="1.5"/>
    <circle cx="24" cy="26" r="1" fill="#0c4a6e"/><circle cx="28" cy="26" r="1" fill="#0c4a6e"/><circle cx="32" cy="26" r="1" fill="#0c4a6e"/>`) },
  { id: 'evt6', name: 'Launch', src: svg(`${bg.hex('#7f1d1d','#ef4444')}
    <path d="M32 14L36 30L40 28L36 34L38 48L32 38L26 48L28 34L24 28L28 30Z" fill="#fecaca"/>
    <path d="M26 48L24 52" stroke="#ef4444" stroke-width="1.5"/><path d="M38 48L40 52" stroke="#ef4444" stroke-width="1.5"/><path d="M32 42L32 52" stroke="#ef4444" stroke-width="1"/>`) },
  { id: 'evt7', name: 'Meetup', src: svg(`${bg.circle('#083344','#06b6d4')}
    <path d="M22 34Q22 28 28 28L28 22Q22 22 22 28" fill="none" stroke="#67e8f9" stroke-width="2"/>
    <path d="M42 34Q42 28 36 28L36 22Q42 22 42 28" fill="none" stroke="#67e8f9" stroke-width="2"/>
    <path d="M28 28L36 28" stroke="#67e8f9" stroke-width="2"/>
    <path d="M22 34L22 40" stroke="#67e8f9" stroke-width="2"/><path d="M42 34L42 40" stroke="#67e8f9" stroke-width="2"/>
    <path d="M22 40Q32 46 42 40" fill="none" stroke="#06b6d4" stroke-width="1.5"/>`) },
  { id: 'evt8', name: 'Carnival', src: svg(`${bg.shield('#78350f','#f59e0b')}
    <circle cx="32" cy="28" r="12" fill="none" stroke="#fde68a" stroke-width="1.2"/>
    <line x1="32" y1="16" x2="32" y2="40" stroke="#fde68a" stroke-width="0.8"/>
    <line x1="20" y1="28" x2="44" y2="28" stroke="#fde68a" stroke-width="0.8"/>
    <circle cx="32" cy="28" r="2" fill="#f59e0b"/>
    <circle cx="26" cy="22" r="1.5" fill="#fde68a" opacity="0.6"/><circle cx="38" cy="22" r="1.5" fill="#fde68a" opacity="0.6"/>
    <circle cx="26" cy="34" r="1.5" fill="#fde68a" opacity="0.6"/><circle cx="38" cy="34" r="1.5" fill="#fde68a" opacity="0.6"/>
    <rect x="30" y="40" width="4" height="8" fill="#fde68a" opacity="0.7"/>`) },
  { id: 'evt9', name: 'Hackathon', src: svg(`${bg.rect('#0f172a','#0284c7')}
    <rect x="18" y="18" width="28" height="20" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="18" y="18" width="28" height="4" fill="#0284c7" opacity="0.5"/>
    <circle cx="21" cy="20" r="1" fill="#ef4444"/><circle cx="25" cy="20" r="1" fill="#fbbf24"/><circle cx="29" cy="20" r="1" fill="#22c55e"/>
    <text x="22" y="31" font-family="monospace" font-size="5" fill="#38bdf8">$ code_</text>
    <text x="22" y="36" font-family="monospace" font-size="5" fill="#38bdf8" opacity="0.6">&gt; run</text>
    <rect x="26" y="40" width="12" height="4" rx="1" fill="#38bdf8" opacity="0.3"/>`) },
  { id: 'evt10', name: 'Seminar', src: svg(`${bg.hex('#1e1b4b','#818cf8')}
    <rect x="20" y="20" width="24" height="16" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/>
    <rect x="22" y="22" width="20" height="12" fill="#818cf8" opacity="0.3"/>
    <line x1="24" y1="26" x2="40" y2="26" stroke="#fff" stroke-width="0.8"/>
    <line x1="24" y1="30" x2="36" y2="30" stroke="#fff" stroke-width="0.6"/>
    <rect x="30" y="36" width="4" height="6" fill="#fff" opacity="0.7"/>
    <rect x="26" y="42" width="12" height="2" rx="1" fill="#818cf8"/>`) },
  { id: 'evt11', name: 'Concert', src: svg(`${bg.circle('#831843','#f43f5e')}
    <circle cx="32" cy="36" r="6" fill="none" stroke="#fda4af" stroke-width="1.5"/>
    <circle cx="32" cy="36" r="2" fill="#fda4af"/>
    <line x1="32" y1="30" x2="32" y2="16" stroke="#fda4af" stroke-width="2"/>
    <line x1="32" y1="16" x2="38" y2="14" stroke="#fda4af" stroke-width="1.5"/>
    <line x1="32" y1="20" x2="38" y2="18" stroke="#fda4af" stroke-width="1.2"/>`) },
  { id: 'evt12', name: 'Workshop', src: svg(`${bg.rect('#365314','#84cc16')}
    <path d="M24 24L20 20" stroke="#bef264" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 20L24 16" stroke="#bef264" stroke-width="2" stroke-linecap="round"/>
    <rect x="24" y="22" width="4" height="16" rx="1" fill="#bef264" transform="rotate(-45 26 30)"/>
    <path d="M40 24L44 20" stroke="#bef264" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M44 20L40 16" stroke="#bef264" stroke-width="2" stroke-linecap="round"/>
    <rect x="36" y="22" width="4" height="16" rx="1" fill="#bef264" transform="rotate(45 38 30)"/>
    <path d="M28 44h8" stroke="#84cc16" stroke-width="1.5"/>`) },
];

const LOGOS_BY_TYPE: Record<CardType, typeof UNIVERSITY_LOGOS> = {
  university: UNIVERSITY_LOGOS,
  school: SCHOOL_LOGOS,
  employee: EMPLOYEE_LOGOS,
  event: EVENT_LOGOS,
};

const LogoGallery = ({ cardType, selected, onSelect }: Props) => {
  const logos = LOGOS_BY_TYPE[cardType];

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground">{logos.length} pre-made logos for {cardType}</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {logos.map(logo => (
          <button
            key={logo.id}
            onClick={() => onSelect(selected === logo.src ? null : logo.src)}
            title={logo.name}
            className={cn(
              'rounded-xl p-1.5 flex flex-col items-center gap-1 transition-all',
              selected === logo.src
                ? 'ring-2 ring-primary shadow-glow scale-105 bg-primary/10'
                : 'glass hover:scale-105 opacity-80 hover:opacity-100'
            )}
          >
            <img src={logo.src} alt={logo.name} className="w-10 h-10 rounded-lg" />
            <span className="text-[8px] text-muted-foreground leading-tight truncate w-full text-center">{logo.name}</span>
          </button>
        ))}
      </div>
      {selected && (
        <button
          onClick={() => onSelect(null)}
          className="text-[10px] text-destructive hover:underline"
        >
          Remove selected logo
        </button>
      )}
    </div>
  );
};

export default LogoGallery;
