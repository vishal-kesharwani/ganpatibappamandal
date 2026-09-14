export interface Announcement {
  id: string;
  title: string;
  titleMarathi: string;
  description: string;
  descriptionMarathi: string;
  priority: "important" | "event" | "general";
  date: string;
  active: boolean;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Maharatri tonight at 8:30 PM",
    titleMarathi: "आज संध्याकाळी ८:३० वाजता महाआरती",
    description: "Today's evening aarti will be performed as Maharatri. All devotees are requested to join.",
    descriptionMarathi: "आजची संध्याकाळची आरती महाआरती म्हणून साजरी करण्यात आली आहे. सर्व भक्तजन भाग घ्यावा.",
    priority: "important",
    date: "2026-09-14",
    active: true,
  },
  {
    id: "2",
    title: "Children's Competition tomorrow",
    titleMarathi: "उद्या बाल स्पर्धेचे आयोजन करण्यात आले आहे",
    description: "Tomorrow various competitions for children will be organized. Register at the mandal office.",
    descriptionMarathi: "उद्या बालकांसाठी विविध स्पर्धा आयोजित करण्यात आल्या आहेत. मंडळ कार्यालयात नोंदणी करा.",
    priority: "event",
    date: "2026-09-15",
    active: true,
  },
  {
    id: "3",
    title: "Visarjan Procession on 20th September",
    titleMarathi: "विसर्जन मिरवणूक २० सप्टेंबर रोजी",
    description: "The visarjan procession will start from Triveni Sangam Apartment at 11:00 AM.",
    descriptionMarathi: "विसर्जन मिरवणूक २० सप्टेंबर रोजी सकाळी ११:०० वाजता त्रिवेणी संगम अपार्टमेंटपासून सुरू होईल.",
    priority: "important",
    date: "2026-09-18",
    active: true,
  },
  {
    id: "4",
    title: "Blood Donation Camp on 18th September",
    titleMarathi: "१८ सप्टेंबर रोजी रक्तदान शिबिर",
    description: "A blood donation camp will be organized on 18th September from 9 AM to 1 PM.",
    descriptionMarathi: "१८ सप्टेंबर रोजी सकाळी ९ ते १ पर्यंत रक्तदान शिबिराचे आयोजन करण्यात आले आहे.",
    priority: "event",
    date: "2026-09-17",
    active: true,
  },
];
