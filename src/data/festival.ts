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
  whatsapp: "+91XXXXXXXXXX",
  upiId: "omsaimitramandal@upi",
  phone: "+91XXXXXXXXXX",
  address: "Triveni Sangam Apartment, Bhiwandi, Maharashtra",
  mapUrl: "https://maps.google.com/?q=Triveni+Sangam+Apartment+Bhiwandi",
  instagram: "https://www.instagram.com/omsaimitramandalbhiwandi/",
};

export interface FestivalDay {
  day: number;
  date: string;
  dayOfWeek: string;
  dateMarathi: string;
  dayOfWeekMarathi: string;
  theme: string;
  themeDescription: string;
  specialAttraction: string;
  dressCode: string;
  specialAarti: string;
  highlights: string[];
}

export const FESTIVAL_DAYS: FestivalDay[] = [
  {
    day: 1,
    date: "2026-09-14",
    dayOfWeek: "Monday",
    dateMarathi: "१४ सप्टेंबर २०२६",
    dayOfWeekMarathi: "सोमवार",
    theme: "राजेशाही गणपती",
    themeDescription: "आजच्या सजावटीची संकल्पना राजेशाही आणि भव्य गणपतीवर आधारित आहे. मंडपात रंगबिरंगी फुलं आणि दिव्यांची सजावट केली आहे.",
    specialAttraction: "विशेष गणपती स्थापना समारंभ",
    dressCode: "पारंपरिक वेशभूषा",
    specialAarti: "महाआरती",
    highlights: ["गणपती स्थापना", "काकड आरती", "मोदक प्रसाद"],
  },
  {
    day: 2,
    date: "2026-09-15",
    dayOfWeek: "Tuesday",
    dateMarathi: "१५ सप्टेंबर २०२६",
    dayOfWeekMarathi: "मंगळवार",
    theme: "शेतकरी गणपती",
    themeDescription: "गावी शेतकऱ्यांच्या जीवनावर आधारित सजावट. शेतीतील विविध वनस्पती आणि उपकरणांची सजावट.",
    specialAttraction: "शेतकरी सन्मान समारंभ",
    dressCode: "शेतकरी पोशाख",
    specialAarti: "विशेष आरती",
    highlights: ["शेतकरी सन्मान", "लोकगीत", "शेती उपकरणे"],
  },
  {
    day: 3,
    date: "2026-09-16",
    dayOfWeek: "Wednesday",
    dateMarathi: "१६ सप्टेंबर २०२६",
    dayOfWeekMarathi: "बुधवार",
    theme: "बाल गणपती",
    themeDescription: "मुलांसाठी विशेष सजावट. रंगीबेरंगी बेलून, चित्रं आणि मुलांच्या खेळांचा आयोजन.",
    specialAttraction: "बाल स्पर्धा आणि खेळ",
    dressCode: "रंगीबेरंगी वेशभूषा",
    specialAarti: "बाल आरती",
    highlights: ["बाल स्पर्धा", "चित्र स्पर्धा", "खेळ"],
  },
  {
    day: 4,
    date: "2026-09-17",
    dayOfWeek: "Thursday",
    dateMarathi: "१७ सप्टेंबर २०२६",
    dayOfWeekMarathi: "गुरुवार",
    theme: "सांस्कृतिक गणपती",
    themeDescription: "महाराष्ट्रीय संस्कृतीवर आधारित सजावट. लोकनृत्य, लोकगीत आणि पारंपरिक कार्यक्रम.",
    specialAttraction: "लोकनृत्य स्पर्धा",
    dressCode: "पारंपरिक नागरी पोशाख",
    specialAarti: "विशेष सांस्कृतिक आरती",
    highlights: ["लोकनृत्य", "भजन", "पारंपरिक संगीत"],
  },
  {
    day: 5,
    date: "2026-09-18",
    dayOfWeek: "Friday",
    dateMarathi: "१८ सप्टेंबर २०२६",
    dayOfWeekMarathi: "शुक्रवार",
    theme: "सामाजिक गणपती",
    themeDescription: "समाजसेवेवर आधारित कार्यक्रम. रक्तदान शिबिर, निदान शिबिर आणि सामाजिक उपक्रम.",
    specialAttraction: "रक्तदान शिबिर",
    dressCode: "सादर वेशभूषा",
    specialAarti: "विशेष प्रार्थना आरती",
    highlights: ["रक्तदान शिबिर", "निदान शिबिर", "सामाजिक उपक्रम"],
  },
  {
    day: 6,
    date: "2026-09-19",
    dayOfWeek: "Saturday",
    dateMarathi: "१९ सप्टेंबर २०२६",
    dayOfWeekMarathi: "शनिवार",
    theme: "दिंडी गणपती",
    themeDescription: "ढोल-ताशा आणि दिंडीच्या सजावटीवर भर. उत्साहाचे वातावरण.",
    specialAttraction: "दिंडी आणि ढोल-ताशा",
    dressCode: "ताशाच्या रंगात",
    specialAarti: "दिंडी आरती",
    highlights: ["दिंडी", "ढोल-ताशा", "नाचगाणा"],
  },
  {
    day: 7,
    date: "2026-09-20",
    dayOfWeek: "Sunday",
    dateMarathi: "२० सप्टेंबर २०२६",
    dayOfWeekMarathi: "रविवार",
    theme: "विसर्जन दिवस",
    themeDescription: "विसर्जनाच्या दिवशी गणपती बाप्पाला विदाई दिली जाते. मिरवणूकसह विसर्जन कार्यक्रम.",
    specialAttraction: "विसर्जन मिरवणूक",
    dressCode: "पारंपरिक वेशभूषा",
    specialAarti: "विदाई आरती",
    highlights: ["विसर्जन मिरवणूक", "विदाई आरती", "महाप्रसाद"],
  },
];
