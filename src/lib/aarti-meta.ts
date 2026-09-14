/** Shared Aarti taxonomy — single source of truth for public + admin. */

export const AARTI_CATEGORIES = [
  { id: "ganpati", label: "गणपती", labelEn: "Ganpati" },
  { id: "shiva", label: "शिव", labelEn: "Shiva" },
  { id: "devi", label: "देवी", labelEn: "Devi" },
  { id: "vitthal", label: "विठ्ठल", labelEn: "Vitthal" },
  { id: "dattatreya", label: "दत्तात्रेय", labelEn: "Dattatreya" },
  { id: "hanuman", label: "हनुमान / मारुती", labelEn: "Hanuman / Maruti" },
  { id: "krishna", label: "कृष्ण", labelEn: "Krishna" },
  { id: "ram", label: "राम", labelEn: "Rama" },
  { id: "vishnu", label: "विष्णु", labelEn: "Vishnu" },
  { id: "sai", label: "साईं", labelEn: "Sai Baba" },
  { id: "other", label: "इतर", labelEn: "Other" },
];

export const AARTI_TYPES: { id: string; label: string; labelEn: string }[] = [
  { id: "aarti", label: "आरती", labelEn: "Aarti" },
  { id: "stotra", label: "स्तोत्र", labelEn: "Stotra" },
  { id: "prayer", label: "प्रार्थना", labelEn: "Prayer" },
  { id: "bhupali", label: "भुपाली", labelEn: "Bhupali" },
  { id: "dhuparti", label: "धुपारती", labelEn: "Dhuparti" },
  { id: "shej", label: "शेज", labelEn: "Shej" },
  { id: "nirop", label: "निरोप", labelEn: "Nirop" },
  { id: "chalisa", label: "चालीसा", labelEn: "Chalisa" },
  { id: "mantra", label: "मंत्र", labelEn: "Mantra" },
];

export const AARTI_LANGUAGES: { id: string; label: string; labelEn: string }[] = [
  { id: "marathi", label: "मराठी", labelEn: "Marathi" },
  { id: "hindi", label: "हिंदी", labelEn: "Hindi" },
  { id: "sanskrit", label: "संस्कृत", labelEn: "Sanskrit" },
  { id: "other", label: "इतर", labelEn: "Other" },
];

export const EVENT_CATEGORIES = [
  { id: "aarti", labelEn: "Aarti", labelMr: "आरती" },
  { id: "puja", labelEn: "Puja", labelMr: "पूजा" },
  { id: "prasad", labelEn: "Prasad", labelMr: "महाप्रसाद" },
  { id: "cultural", labelEn: "Cultural", labelMr: "सांस्कृतिक कार्यक्रम" },
  { id: "children", labelEn: "Children", labelMr: "बाल कार्यक्रम" },
  { id: "bhajan", labelEn: "Bhajan", labelMr: "भजन" },
  { id: "dindi", labelEn: "Dindi", labelMr: "दिंडी" },
  { id: "dhol-tasha", labelEn: "Dhol-Tasha", labelMr: "ढोल-ताशा" },
  { id: "competition", labelEn: "Competition", labelMr: "स्पर्धा" },
  { id: "social", labelEn: "Social", labelMr: "सामाजिक उपक्रम" },
  { id: "meeting", labelEn: "Meeting", labelMr: "बैठक" },
  { id: "visarjan", labelEn: "Visarjan", labelMr: "विसर्जन" },
  { id: "darshan", labelEn: "Darshan", labelMr: "दर्शन" },
  { id: "other", labelEn: "Other", labelMr: "इतर" },
];

/** Legacy schedule.ts category ids → label map (kept for fallbacks). */
export const CATEGORY_LABELS: Record<string, string> = {
  aarti: "आरती",
  puja: "पूजा",
  prasad: "महाप्रसाद",
  cultural: "सांस्कृतिक कार्यक्रम",
  children: "बाल कार्यक्रम",
  bhajan: "भजन",
  dindi: "दिंडी",
  "dhol-tasha": "ढोल-ताशा",
  competition: "स्पर्धा",
  social: "सामाजिक उपक्रम",
  meeting: "बैठक",
  visarjan: "विसर्जन",
  darshan: "दर्शन",
  other: "इतर",
};

export const GALLERY_CATEGORIES = [
  { id: "festival", label: "Festival" },
  { id: "ganpati", label: "Ganpati" },
  { id: "aarti", label: "Aarti" },
  { id: "events", label: "Events" },
  { id: "mandal", label: "Mandal" },
  { id: "visarjan", label: "Visarjan" },
  { id: "other", label: "Other" },
];

export const NOTICE_PRIORITIES = [
  { id: "important", label: "Important" },
  { id: "event", label: "Event" },
  { id: "general", label: "General" },
];
