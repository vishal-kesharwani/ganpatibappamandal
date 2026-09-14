export interface ScheduleEvent {
  id: string;
  time: string;
  timeEnd?: string;
  title: string;
  titleMarathi: string;
  category: "aarti" | "cultural" | "children" | "bhajan" | "dindi" | "dhol-tasha" | "competition" | "prasad" | "social" | "visarjan";
  description?: string;
  location?: string;
  organizer?: string;
}

export interface DailySchedule {
  day: number;
  date: string;
  events: ScheduleEvent[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  aarti: "आरती",
  cultural: "सांस्कृतिक कार्यक्रम",
  children: "बाल कार्यक्रम",
  bhajan: "भजन",
  dindi: "दिंडी",
  "dhol-tasha": "ढोल-ताशा",
  competition: "स्पर्धा",
  prasad: "महाप्रसाद",
  social: "सामाजिक उपक्रम",
  visarjan: "विसर्जन",
};

export const DAILY_SCHEDULES: DailySchedule[] = [
  {
    day: 1,
    date: "2026-09-14",
    events: [
      { id: "1-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti", description: "प्रातःकाळीने गणपती बाप्पाची पहिली आरती" },
      { id: "1-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "1-3", time: "10:00", timeEnd: "12:00", title: "Cultural Program", titleMarathi: "सांस्कृतिक कार्यक्रम", category: "cultural", description: "बालकांचे सांस्कृतिक कार्यक्रम" },
      { id: "1-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "1-5", time: "14:00", timeEnd: "15:00", title: "Bhajan Sandhya", titleMarathi: "भजन संध्या", category: "bhajan" },
      { id: "1-6", time: "17:00", timeEnd: "18:30", title: "Cultural Program", titleMarathi: "सांस्कृतिक कार्यक्रम", category: "cultural" },
      { id: "1-7", time: "18:30", timeEnd: "19:00", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "1-8", time: "20:00", timeEnd: "21:00", title: "Musical Evening", titleMarathi: "संगीत संध्या", category: "cultural" },
      { id: "1-9", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti", description: "रात्रीची अंतिम आरती" },
    ],
  },
  {
    day: 2,
    date: "2026-09-15",
    events: [
      { id: "2-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "2-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "2-3", time: "10:00", timeEnd: "11:30", title: "Shetkari Samman", titleMarathi: "शेतकरी सन्मान समारंभ", category: "social" },
      { id: "2-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "2-5", time: "17:00", timeEnd: "18:00", title: "Lokgeet", titleMarathi: "लोकगीत", category: "cultural" },
      { id: "2-6", time: "18:30", timeEnd: "19:00", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "2-7", time: "20:00", timeEnd: "21:30", title: "Dhol Tasha Pathak", titleMarathi: "ढोल-ताशा पथक", category: "dhol-tasha" },
      { id: "2-8", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti" },
    ],
  },
  {
    day: 3,
    date: "2026-09-16",
    events: [
      { id: "3-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "3-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "3-3", time: "09:00", timeEnd: "12:00", title: "Bal Spardha", titleMarathi: "बाल स्पर्धा", category: "children", description: "मुलांसाठी विविध स्पर्धा" },
      { id: "3-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "3-5", time: "14:00", timeEnd: "16:00", title: "Chitra Spardha", titleMarathi: "चित्र स्पर्धा", category: "competition" },
      { id: "3-6", time: "17:00", timeEnd: "18:00", title: "Baal Karyakram", titleMarathi: "बाल कार्यक्रम", category: "children" },
      { id: "3-7", time: "18:30", timeEnd: "19:00", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "3-8", time: "21:00", timeEnd: "22:00", title: "Bhajan Sandhya", titleMarathi: "भजन संध्या", category: "bhajan" },
      { id: "3-9", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti" },
    ],
  },
  {
    day: 4,
    date: "2026-09-17",
    events: [
      { id: "4-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "4-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "4-3", time: "10:00", timeEnd: "12:00", title: "Lok Nrutya Spardha", titleMarathi: "लोकनृत्य स्पर्धा", category: "cultural" },
      { id: "4-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "4-5", time: "16:00", timeEnd: "17:00", title: "Bhajan", titleMarathi: "भजन", category: "bhajan" },
      { id: "4-6", time: "18:00", timeEnd: "19:00", title: "Sanskritik Karyakram", titleMarathi: "सांस्कृतिक कार्यक्रम", category: "cultural" },
      { id: "4-7", time: "19:00", timeEnd: "19:30", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "4-8", time: "20:30", timeEnd: "21:30", title: "Sangeet Sandhya", titleMarathi: "संगीत संध्या", category: "cultural" },
      { id: "4-9", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti" },
    ],
  },
  {
    day: 5,
    date: "2026-09-18",
    events: [
      { id: "5-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "5-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "5-3", time: "09:00", timeEnd: "13:00", title: "Raktadan Shibhir", titleMarathi: "रक्तदान शिबिर", category: "social", description: "स्वैच्छिक रक्तदान शिबिर" },
      { id: "5-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "5-5", time: "14:00", timeEnd: "16:00", title: "Nidan Shibhir", titleMarathi: "निदान शिबिर", category: "social" },
      { id: "5-6", time: "17:00", timeEnd: "18:30", title: "Bhajan Sandhya", titleMarathi: "भजन संध्या", category: "bhajan" },
      { id: "5-7", time: "18:30", timeEnd: "19:00", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "5-8", time: "20:00", timeEnd: "21:00", title: "Social Program", titleMarathi: "सामाजिक कार्यक्रम", category: "social" },
      { id: "5-9", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti" },
    ],
  },
  {
    day: 6,
    date: "2026-09-19",
    events: [
      { id: "6-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "6-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "6-3", time: "09:00", timeEnd: "12:00", title: "Dindi Preparation", titleMarathi: "दिंडी तयारी", category: "dindi" },
      { id: "6-4", time: "12:30", timeEnd: "13:00", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "6-5", time: "15:00", timeEnd: "18:00", title: "Dindi", titleMarathi: "दिंडी", category: "dindi", description: "गणपती बाप्पासोबत दिंडी" },
      { id: "6-6", time: "18:00", timeEnd: "19:00", title: "Sandhyakalin Aarti", titleMarathi: "संध्याकाळची आरती", category: "aarti" },
      { id: "6-7", time: "19:30", timeEnd: "21:00", title: "Dhol Tasha Night", titleMarathi: "ढोल-ताशा रात्री", category: "dhol-tasha" },
      { id: "6-8", time: "22:00", timeEnd: "22:30", title: "Sheja Aarti", titleMarathi: "शेज आरती", category: "aarti" },
    ],
  },
  {
    day: 7,
    date: "2026-09-20",
    events: [
      { id: "7-1", time: "06:00", timeEnd: "06:30", title: "Kakad Aarti", titleMarathi: "काकड आरती", category: "aarti" },
      { id: "7-2", time: "08:00", timeEnd: "08:30", title: "Ganpati Darshan", titleMarathi: "गणपती दर्शन", category: "aarti" },
      { id: "7-3", time: "10:00", timeEnd: "11:00", title: "Vidai Aarti", titleMarathi: "विदाई आरती", category: "aarti", description: "गणपती बाप्पाला विदाई" },
      { id: "7-4", time: "11:00", timeEnd: "13:00", title: "Miravnuk", titleMarathi: "मिरवणूक", category: "visarjan", description: "विसर्जन मिरवणूक" },
      { id: "7-5", time: "13:00", timeEnd: "13:30", title: "Madhyanna Aarti", titleMarathi: "माध्यान्ह आरती", category: "aarti" },
      { id: "7-6", time: "14:00", timeEnd: "15:00", title: "Mahaprasad", titleMarathi: "महाप्रसाद", category: "prasad" },
      { id: "7-7", time: "15:00", timeEnd: "17:00", title: "Visarjan", titleMarathi: "विसर्जन", category: "visarjan", description: "गणपती विसर्जन" },
    ],
  },
];

export function getScheduleForDay(day: number): DailySchedule | undefined {
  return DAILY_SCHEDULES.find(s => s.day === day);
}

export function getTodaySchedule(): DailySchedule | undefined {
  const today = new Date();
  const dayIndex = today.getDate() - 14 + 1;
  if (dayIndex >= 1 && dayIndex <= 7) {
    return getScheduleForDay(dayIndex);
  }
  return undefined;
}
