export const FESTIVAL_CONFIG = {
  name: "OM SAI MITRA MANDAL",
  location: "Triveni Sangam Apartment",
  festival: "Ganpati Mahotsav 2026",
  year: 2026,
  startDate: "2026-09-14",
  endDate: "2026-09-20",
  totalDays: 7,
  mantras: ["श्री गणेशाय नमः", "गणपती बाप्पा मोरया!"],
  marathiFestivalName: "गणेशोत्सव २०२६",
  dateRangeMarathi: "१४ सप्टेंबर — २० सप्टेंबर",
  upiId: "omsaimitramandal@upi",
  address: "Triveni Sangam Apartment, Kaneri, Bhiwandi, Maharashtra 421302",
  mapUrl: "https://maps.app.goo.gl/k1WtrcRubSinUwau5",
  instagram: "https://www.instagram.com/omsaimitramandalbhiwandi/",
};

export interface FestivalDay {
  day: number;
  date: string;
  dayOfWeek: string;
  dateMarathi: string;
  dayOfWeekMarathi: string;
  theme?: string;
  themeDescription?: string;
  specialEvent?: string;
  specialEventTime?: string;
  description?: string;
}

export const FESTIVAL_DAYS: FestivalDay[] = [
  {
    day: 1,
    date: "2026-09-14",
    dayOfWeek: "Monday",
    dateMarathi: "१४ सप्टेंबर २०२६",
    dayOfWeekMarathi: "सोमवार",
    specialEvent: "गणपती स्थापना समारंभ",
    specialEventTime: "10:00 AM",
    description: "गणपती बाप्पाची स्थापना आणि काकड आरती.",
  },
  {
    day: 2,
    date: "2026-09-15",
    dayOfWeek: "Tuesday",
    dateMarathi: "१५ सप्टेंबर २०२६",
    dayOfWeekMarathi: "मंगळवार",
    description: "दैनिक पूजा आणि आरती.",
  },
  {
    day: 3,
    date: "2026-09-16",
    dayOfWeek: "Wednesday",
    dateMarathi: "१६ सप्टेंबर २०२६",
    dayOfWeekMarathi: "बुधवार",
    specialEvent: "बाल स्पर्धा आणि खेळ",
    specialEventTime: "4:00 PM",
    description: "मुलांसाठी विशेष कार्यक्रम.",
  },
  {
    day: 4,
    date: "2026-09-17",
    dayOfWeek: "Thursday",
    dateMarathi: "१७ सप्टेंबर २०२६",
    dayOfWeekMarathi: "गुरुवार",
    specialEvent: "लोकनृत्य स्पर्धा",
    specialEventTime: "6:00 PM",
    description: "सांस्कृतिक कार्यक्रम.",
  },
  {
    day: 5,
    date: "2026-09-18",
    dayOfWeek: "Friday",
    dateMarathi: "१८ सप्टेंबर २०२६",
    dayOfWeekMarathi: "शुक्रवार",
    specialEvent: "रक्तदान शिबिर",
    specialEventTime: "10:00 AM",
    description: "सामाजिक उपक्रम.",
  },
  {
    day: 6,
    date: "2026-09-19",
    dayOfWeek: "Saturday",
    dateMarathi: "१९ सप्टेंबर २०२६",
    dayOfWeekMarathi: "शनिवार",
    specialEvent: "दिंडी आणि ढोल-ताशा",
    specialEventTime: "4:00 PM",
    description: "उत्साहाचे वातावरण.",
  },
  {
    day: 7,
    date: "2026-09-20",
    dayOfWeek: "Sunday",
    dateMarathi: "२० सप्टेंबर २०२६",
    dayOfWeekMarathi: "रविवार",
    specialEvent: "विसर्जन मिरवणूक",
    specialEventTime: "11:00 AM",
    description: "विसर्जनाच्या दिवशी गणपती बाप्पाला विदाई.",
  },
];
