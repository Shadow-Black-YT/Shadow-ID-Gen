export type CardType = 'university' | 'school' | 'employee' | 'event';

export interface UniversityData {
  universityName: string;
  studentName: string;
  department: string;
  rollNumber: string;
  year: string;
  dob: string;
  address: string;
  phone: string;
}

export interface SchoolData {
  schoolName: string;
  studentName: string;
  className: string;
  section: string;
  rollNumber: string;
  dob: string;
  guardianName: string;
  phone: string;
}

export interface EmployeeData {
  companyName: string;
  employeeName: string;
  designation: string;
  department: string;
  employeeId: string;
  dob: string;
  phone: string;
  bloodGroup: string;
}

export interface EventData {
  eventName: string;
  attendeeName: string;
  role: string;
  date: string;
  validThrough: string;
}

export type CardData = UniversityData | SchoolData | EmployeeData | EventData;

// Layout determines structural arrangement; ColorScheme determines colors
export type CardLayout =
  | 'horizontal-standard' | 'horizontal-sidebar' | 'horizontal-banner' | 'horizontal-split'
  | 'horizontal-wave' | 'horizontal-diagonal'
  | 'vertical-standard' | 'vertical-centered' | 'vertical-ribbon' | 'vertical-modern'
  | 'vertical-elegant' | 'vertical-badge';

export type ColorScheme =
  | 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'violet'
  | 'slate' | 'orange' | 'teal' | 'fuchsia' | 'sky' | 'lime'
  | 'red' | 'blue' | 'neutral' | 'gold' | 'navy' | 'crimson';

export interface TemplateConfig {
  id: string;
  layout: CardLayout;
  colorScheme: ColorScheme;
  label: string;
}

export interface CardSettings {
  cardType: CardType;
  templateId: string;
  photo: string | null;
  logo: string | null;
  signature: string | null;
  showBack: boolean;
}

export interface BulkEntry {
  id: string;
  data: CardData;
  valid: boolean;
  errors: string[];
}

export const CARD_TYPE_LABELS: Record<CardType, string> = {
  university: 'University ID',
  school: 'School ID',
  employee: 'Employee ID',
  event: 'Event Pass',
};

export const LAYOUT_LABELS: Record<CardLayout, string> = {
  'horizontal-standard': 'H-Standard',
  'horizontal-sidebar': 'H-Sidebar',
  'horizontal-banner': 'H-Banner',
  'horizontal-split': 'H-Split',
  'horizontal-wave': 'H-Wave',
  'horizontal-diagonal': 'H-Diagonal',
  'vertical-standard': 'V-Standard',
  'vertical-centered': 'V-Centered',
  'vertical-ribbon': 'V-Ribbon',
  'vertical-modern': 'V-Modern',
  'vertical-elegant': 'V-Elegant',
  'vertical-badge': 'V-Badge',
};

export const COLOR_SCHEME_COLORS: Record<ColorScheme, { bg: string; accent: string; text: string; sub: string; headerText: string }> = {
  indigo:  { bg: '#1e1b4b', accent: '#6366f1', text: '#ffffff', sub: '#c7d2fe', headerText: '#ffffff' },
  emerald: { bg: '#022c22', accent: '#10b981', text: '#ffffff', sub: '#a7f3d0', headerText: '#ffffff' },
  rose:    { bg: '#4c0519', accent: '#f43f5e', text: '#ffffff', sub: '#fecdd3', headerText: '#ffffff' },
  amber:   { bg: '#451a03', accent: '#f59e0b', text: '#ffffff', sub: '#fde68a', headerText: '#1c1917' },
  cyan:    { bg: '#083344', accent: '#06b6d4', text: '#ffffff', sub: '#a5f3fc', headerText: '#ffffff' },
  violet:  { bg: '#2e1065', accent: '#8b5cf6', text: '#ffffff', sub: '#ddd6fe', headerText: '#ffffff' },
  slate:   { bg: '#f8fafc', accent: '#475569', text: '#0f172a', sub: '#94a3b8', headerText: '#ffffff' },
  orange:  { bg: '#431407', accent: '#f97316', text: '#ffffff', sub: '#fed7aa', headerText: '#ffffff' },
  teal:    { bg: '#042f2e', accent: '#14b8a6', text: '#ffffff', sub: '#99f6e4', headerText: '#ffffff' },
  fuchsia: { bg: '#4a044e', accent: '#d946ef', text: '#ffffff', sub: '#f5d0fe', headerText: '#ffffff' },
  sky:     { bg: '#f0f9ff', accent: '#0284c7', text: '#0c4a6e', sub: '#7dd3fc', headerText: '#ffffff' },
  lime:    { bg: '#1a2e05', accent: '#84cc16', text: '#ffffff', sub: '#d9f99d', headerText: '#1a2e05' },
  red:     { bg: '#450a0a', accent: '#ef4444', text: '#ffffff', sub: '#fca5a5', headerText: '#ffffff' },
  blue:    { bg: '#172554', accent: '#3b82f6', text: '#ffffff', sub: '#93c5fd', headerText: '#ffffff' },
  neutral: { bg: '#ffffff', accent: '#18181b', text: '#18181b', sub: '#71717a', headerText: '#ffffff' },
  gold:    { bg: '#1c1917', accent: '#ca8a04', text: '#ffffff', sub: '#fde047', headerText: '#1c1917' },
  navy:    { bg: '#0c1222', accent: '#1e40af', text: '#e0e7ff', sub: '#818cf8', headerText: '#ffffff' },
  crimson: { bg: '#1a0a0a', accent: '#dc2626', text: '#fef2f2', sub: '#fca5a5', headerText: '#ffffff' },
};

// Generate 100+ templates: each layout × a subset of color schemes
const LAYOUTS: CardLayout[] = [
  'horizontal-standard', 'horizontal-sidebar', 'horizontal-banner', 'horizontal-split',
  'horizontal-wave', 'horizontal-diagonal',
  'vertical-standard', 'vertical-centered', 'vertical-ribbon', 'vertical-modern',
  'vertical-elegant', 'vertical-badge',
];

const SCHEMES: ColorScheme[] = [
  'indigo', 'emerald', 'rose', 'amber', 'cyan', 'violet',
  'slate', 'orange', 'teal', 'fuchsia', 'sky', 'lime',
  'red', 'blue', 'neutral', 'gold', 'navy', 'crimson',
];

export const ALL_TEMPLATES: TemplateConfig[] = [];

LAYOUTS.forEach(layout => {
  SCHEMES.forEach(scheme => {
    const layoutName = LAYOUT_LABELS[layout];
    ALL_TEMPLATES.push({
      id: `${layout}__${scheme}`,
      layout,
      colorScheme: scheme,
      label: `${layoutName} ${scheme.charAt(0).toUpperCase() + scheme.slice(1)}`,
    });
  });
});

// Category grouping for filter tabs
export const LAYOUT_CATEGORIES = {
  'All': null as CardLayout[] | null,
  'Horizontal': LAYOUTS.filter(l => l.startsWith('horizontal')),
  'Vertical': LAYOUTS.filter(l => l.startsWith('vertical')),
};

export const isVerticalLayout = (layout: CardLayout) => layout.startsWith('vertical');

// 54 handwritten signature templates using Google Fonts
export const SIGNATURE_TEMPLATES = [
  { id: 'sig1', name: 'Elegant Flow', fontStyle: '26px "Dancing Script", cursive', fontFamily: '"Dancing Script", cursive' },
  { id: 'sig2', name: 'Grand Vibes', fontStyle: '26px "Great Vibes", cursive', fontFamily: '"Great Vibes", cursive' },
  { id: 'sig3', name: 'Pacific', fontStyle: '22px "Pacifico", cursive', fontFamily: '"Pacifico", cursive' },
  { id: 'sig4', name: 'Quick Note', fontStyle: '24px "Caveat", cursive', fontFamily: '"Caveat", cursive' },
  { id: 'sig5', name: 'Sacramento', fontStyle: '28px "Sacramento", cursive', fontFamily: '"Sacramento", cursive' },
  { id: 'sig6', name: 'Satisfy', fontStyle: '24px "Satisfy", cursive', fontFamily: '"Satisfy", cursive' },
  { id: 'sig7', name: 'Kalam', fontStyle: '22px "Kalam", cursive', fontFamily: '"Kalam", cursive' },
  { id: 'sig8', name: 'Indie', fontStyle: '22px "Indie Flower", cursive', fontFamily: '"Indie Flower", cursive' },
  { id: 'sig9', name: 'Amatic', fontStyle: '28px "Amatic SC", cursive', fontFamily: '"Amatic SC", cursive' },
  { id: 'sig10', name: 'Homemade', fontStyle: '18px "Homemade Apple", cursive', fontFamily: '"Homemade Apple", cursive' },
  { id: 'sig11', name: 'Marker', fontStyle: '20px "Permanent Marker", cursive', fontFamily: '"Permanent Marker", cursive' },
  { id: 'sig12', name: 'Rock Salt', fontStyle: '16px "Rock Salt", cursive', fontFamily: '"Rock Salt", cursive' },
  { id: 'sig13', name: 'Shadows', fontStyle: '24px "Shadows Into Light", cursive', fontFamily: '"Shadows Into Light", cursive' },
  { id: 'sig14', name: 'Reenie', fontStyle: '26px "Reenie Beanie", cursive', fontFamily: '"Reenie Beanie", cursive' },
  { id: 'sig15', name: 'Belle Aurore', fontStyle: '20px "La Belle Aurore", cursive', fontFamily: '"La Belle Aurore", cursive' },
  { id: 'sig16', name: 'Marck', fontStyle: '24px "Marck Script", cursive', fontFamily: '"Marck Script", cursive' },
  { id: 'sig17', name: 'Nothing', fontStyle: '20px "Nothing You Could Do", cursive', fontFamily: '"Nothing You Could Do", cursive' },
  { id: 'sig18', name: 'Cedarville', fontStyle: '22px "Cedarville Cursive", cursive', fontFamily: '"Cedarville Cursive", cursive' },
  { id: 'sig19', name: 'Waiting', fontStyle: '22px "Waiting for the Sunrise", cursive', fontFamily: '"Waiting for the Sunrise", cursive' },
  { id: 'sig20', name: 'Just Me', fontStyle: '24px "Just Me Again Down Here", cursive', fontFamily: '"Just Me Again Down Here", cursive' },
  { id: 'sig21', name: 'Covered', fontStyle: '24px "Covered By Your Grace", cursive', fontFamily: '"Covered By Your Grace", cursive' },
  { id: 'sig22', name: 'Dawning', fontStyle: '20px "Dawning of a New Day", cursive', fontFamily: '"Dawning of a New Day", cursive' },
  { id: 'sig23', name: 'Rainbow', fontStyle: '22px "Over the Rainbow", cursive', fontFamily: '"Over the Rainbow", cursive' },
  { id: 'sig24', name: 'Sue Ellen', fontStyle: '22px "Sue Ellen Francisco", cursive', fontFamily: '"Sue Ellen Francisco", cursive' },
  { id: 'sig25', name: 'Architect', fontStyle: '20px "Architects Daughter", cursive', fontFamily: '"Architects Daughter", cursive' },
  { id: 'sig26', name: 'Patrick', fontStyle: '22px "Patrick Hand", cursive', fontFamily: '"Patrick Hand", cursive' },
  { id: 'sig27', name: 'Gloria', fontStyle: '22px "Gloria Hallelujah", cursive', fontFamily: '"Gloria Hallelujah", cursive' },
  { id: 'sig28', name: 'Zeyada', fontStyle: '24px "Zeyada", cursive', fontFamily: '"Zeyada", cursive' },
  { id: 'sig29', name: 'Give Glory', fontStyle: '22px "Give You Glory", cursive', fontFamily: '"Give You Glory", cursive' },
  { id: 'sig30', name: 'Loved', fontStyle: '24px "Loved by the King", cursive', fontFamily: '"Loved by the King", cursive' },
  { id: 'sig31', name: 'Crafty', fontStyle: '20px "Crafty Girls", cursive', fontFamily: '"Crafty Girls", cursive' },
  { id: 'sig32', name: 'Coming Soon', fontStyle: '22px "Coming Soon", cursive', fontFamily: '"Coming Soon", cursive' },
  { id: 'sig33', name: 'Schoolbell', fontStyle: '22px "Schoolbell", cursive', fontFamily: '"Schoolbell", cursive' },
  { id: 'sig34', name: 'Annie', fontStyle: '20px "Annie Use Your Telescope", cursive', fontFamily: '"Annie Use Your Telescope", cursive' },
  { id: 'sig35', name: 'Neucha', fontStyle: '22px "Neucha", cursive', fontFamily: '"Neucha", cursive' },
  { id: 'sig36', name: 'Gochi', fontStyle: '24px "Gochi Hand", cursive', fontFamily: '"Gochi Hand", cursive' },
  { id: 'sig37', name: 'Short Stack', fontStyle: '20px "Short Stack", cursive', fontFamily: '"Short Stack", cursive' },
  { id: 'sig38', name: 'Handlee', fontStyle: '22px "Handlee", cursive', fontFamily: '"Handlee", cursive' },
  { id: 'sig39', name: 'Walter', fontStyle: '20px "Walter Turncoat", cursive', fontFamily: '"Walter Turncoat", cursive' },
  { id: 'sig40', name: 'Calligraff', fontStyle: '22px "Calligraffitti", cursive', fontFamily: '"Calligraffitti", cursive' },
  { id: 'sig41', name: 'Girl Next', fontStyle: '20px "The Girl Next Door", cursive', fontFamily: '"The Girl Next Door", cursive' },
  { id: 'sig42', name: 'Delius', fontStyle: '22px "Delius Swash Caps", cursive', fontFamily: '"Delius Swash Caps", cursive' },
  { id: 'sig43', name: 'Bold Dance', fontStyle: 'bold 26px "Dancing Script", cursive', fontFamily: '"Dancing Script", cursive' },
  { id: 'sig44', name: 'Bold Caveat', fontStyle: 'bold 26px "Caveat", cursive', fontFamily: '"Caveat", cursive' },
  { id: 'sig45', name: 'Bold Kalam', fontStyle: 'bold 24px "Kalam", cursive', fontFamily: '"Kalam", cursive' },
  { id: 'sig46', name: 'Bold Amatic', fontStyle: 'bold 30px "Amatic SC", cursive', fontFamily: '"Amatic SC", cursive' },
  { id: 'sig47', name: 'Tall Dance', fontStyle: '32px "Dancing Script", cursive', fontFamily: '"Dancing Script", cursive' },
  { id: 'sig48', name: 'Tiny Vibes', fontStyle: '18px "Great Vibes", cursive', fontFamily: '"Great Vibes", cursive' },
  { id: 'sig49', name: 'Large Pac', fontStyle: '28px "Pacifico", cursive', fontFamily: '"Pacifico", cursive' },
  { id: 'sig50', name: 'Whisper', fontStyle: '20px "Sacramento", cursive', fontFamily: '"Sacramento", cursive' },
  { id: 'sig51', name: 'Smooth', fontStyle: '24px "Satisfy", cursive', fontFamily: '"Satisfy", cursive' },
  { id: 'sig52', name: 'Scribble', fontStyle: '26px "Indie Flower", cursive', fontFamily: '"Indie Flower", cursive' },
  { id: 'sig53', name: 'Sketch', fontStyle: '24px "Shadows Into Light", cursive', fontFamily: '"Shadows Into Light", cursive' },
  { id: 'sig54', name: 'Flourish', fontStyle: '28px "Marck Script", cursive', fontFamily: '"Marck Script", cursive' },
];

export const DEFAULT_UNIVERSITY_DATA: UniversityData = {
  universityName: '', studentName: '', department: '', rollNumber: '', year: '', dob: '', address: '', phone: '',
};
export const DEFAULT_SCHOOL_DATA: SchoolData = {
  schoolName: '', studentName: '', className: '', section: '', rollNumber: '', dob: '', guardianName: '', phone: '',
};
export const DEFAULT_EMPLOYEE_DATA: EmployeeData = {
  companyName: '', employeeName: '', designation: '', department: '', employeeId: '', dob: '', phone: '', bloodGroup: '',
};
export const DEFAULT_EVENT_DATA: EventData = {
  eventName: '', attendeeName: '', role: '', date: '', validThrough: '',
};
