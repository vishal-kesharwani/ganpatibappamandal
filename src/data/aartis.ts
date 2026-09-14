export type AartiType = "aarti" | "stotra" | "prayer" | "bhupali" | "dhuparti" | "shej" | "nirop" | "chalisa" | "mantra";
export type AartiLanguage = "marathi" | "hindi" | "sanskrit" | "other";
export type ContentStatus = "verified" | "needs_verification" | "draft";

export interface Aarti {
  id: string;
  slug: string;
  title: string;
  titleDevanagari: string;
  deity: string;
  category: string;
  language: AartiLanguage;
  type: AartiType;
  lyrics: string;
  transliteration?: string;
  description?: string;
  source: string;
  sourceUrl?: string;
  contentStatus: ContentStatus;
  verified: boolean;
  published: boolean;
}

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

export const AARTI_TYPES: { id: AartiType; label: string; labelEn: string }[] = [
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

export const AARTI_LANGUAGES: { id: AartiLanguage; label: string; labelEn: string }[] = [
  { id: "marathi", label: "मराठी", labelEn: "Marathi" },
  { id: "hindi", label: "हिंदी", labelEn: "Hindi" },
  { id: "sanskrit", label: "संस्कृत", labelEn: "Sanskrit" },
  { id: "other", label: "इतर", labelEn: "Other" },
];

export const DEITY_LIST = [
  "Ganpati", "Shiva", "Devi", "Durga", "Amba", "Mahalakshmi", "Saraswati",
  "Vitthal", "Pandurang", "Dattatreya", "Hanuman", "Maruti",
  "Krishna", "Ram", "Vishnu", "Sai Baba", "Satyanarayan", "Santoshi Mata",
];

import { GANPATI_AARTIS } from "./aartis-ganpati";
import { SHIVA_AARTIS, DEVI_AARTIS } from "./aartis-shiva-devi";
import { VITTHAL_AARTIS, DATTATREYA_AARTIS, HANUMAN_AARTIS } from "./aartis-vitthal-datt-hanuman";
import { KRISHNA_AARTIS, RAM_AARTIS, VISHNU_AARTIS, SAI_AARTIS, OTHER_AARTIS } from "./aartis-krishna-ram-sai";

export const AARTIS: Aarti[] = [
  ...GANPATI_AARTIS,
  ...SHIVA_AARTIS,
  ...DEVI_AARTIS,
  ...VITTHAL_AARTIS,
  ...DATTATREYA_AARTIS,
  ...HANUMAN_AARTIS,
  ...KRISHNA_AARTIS,
  ...RAM_AARTIS,
  ...VISHNU_AARTIS,
  ...SAI_AARTIS,
  ...OTHER_AARTIS,
].map((aarti, index) => ({
  ...aarti,
  id: String(index + 1),
}));
