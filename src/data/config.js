// Data configuration for getSalary
// Add new years here when survey data becomes available

export const DATA_SOURCES = {
  2021: {
    file: '2021.json',
    source: 'https://github.com/oncekiyazilimci/2021-yazilimci-maaslari',
    participants: 2500,
    surveyDate: '2021-12',
  },
  2022: {
    file: '2022.json',
    source: 'https://github.com/oncekiyazilimci/2022-yazilimci-maaslari',
    participants: 5038,
    surveyDate: '2022-12',
  },
  2023: {
    file: '2023.json',
    source: 'https://github.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari',
    participants: 8718,
    surveyDate: '2023-12',
  },
  2024: {
    file: '2024.json',
    source: 'https://github.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari',
    participants: 5989,
    surveyDate: '2024-12',
  },
  2025: {
    file: '2025.json',
    source: 'https://github.com/oncekiyazilimci/2025-yazilim-sektoru-maaslari',
    participants: 9056,
    surveyDate: '2025-01',
  },
};

export const YEARS = Object.keys(DATA_SOURCES).map(Number).sort((a, b) => a - b);
export const LATEST_YEAR = Math.max(...YEARS);

// Position mappings (normalize different naming conventions across years)
export const POSITIONS = {
  backend: ['Backend Developer', 'Backend', 'Back-end Developer', 'Back End Developer'],
  frontend: ['Frontend Developer', 'Frontend', 'Front-end Developer', 'Front End Developer'],
  fullstack: ['Fullstack Developer', 'Full Stack Developer', 'Full-stack Developer'],
  mobile: ['Mobile Developer', 'iOS Developer', 'Android Developer', 'Mobile'],
  devops: ['DevOps Engineer', 'DevOps', 'SRE', 'Site Reliability Engineer', 'Platform Engineer'],
  data: ['Data Engineer', 'Data Scientist', 'ML Engineer', 'Machine Learning Engineer'],
  qa: ['QA Engineer', 'Test Engineer', 'Quality Assurance', 'SDET'],
  security: ['Security Engineer', 'Cybersecurity', 'InfoSec'],
  manager: ['Engineering Manager', 'Tech Lead', 'Team Lead', 'CTO'],
};

// Experience level mappings
export const EXPERIENCE_LEVELS = {
  junior: { min: 0, max: 2, label: 'Junior' },
  mid: { min: 2, max: 5, label: 'Mid-Level' },
  senior: { min: 5, max: Infinity, label: 'Senior' },
};

// City mappings
export const CITIES = {
  istanbul: ['İstanbul', 'Istanbul'],
  ankara: ['Ankara'],
  izmir: ['İzmir', 'Izmir'],
  antalya: ['Antalya'],
  bursa: ['Bursa'],
  other: ['Diğer', 'Other'],
  remote: ['Remote', 'Uzaktan'],
};

// Work mode mappings
export const WORK_MODES = {
  remote: ['Remote', 'Uzaktan', 'Fully Remote', 'Tam Uzaktan'],
  hybrid: ['Hybrid', 'Hibrit', 'Karma'],
  office: ['Office', 'Ofis', 'On-site', 'Yerinde'],
};

// Company type mappings
export const COMPANY_TYPES = {
  startup: ['Startup', 'Start-up'],
  scaleup: ['Scale-up', 'Scaleup'],
  corporate: ['Corporate', 'Kurumsal', 'Enterprise'],
  agency: ['Agency', 'Ajans', 'Outsource', 'Consultancy'],
  freelance: ['Freelance', 'Serbest'],
  government: ['Government', 'Kamu', 'Public'],
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  quinary: '#8b5cf6',
  senary: '#ec4899',
  septenary: '#06b6d4',
  octonary: '#84cc16',
};

export const CHART_COLOR_ARRAY = Object.values(CHART_COLORS);
