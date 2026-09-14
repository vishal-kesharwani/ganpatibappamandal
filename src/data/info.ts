export interface InfoSection {
  id: string;
  title: string;
  titleMarathi: string;
  content: string;
  contentMarathi: string;
}

export const GANPATI_INFO: InfoSection[] = [
  {
    id: "ganpati-bappa",
    title: "Lord Ganesha",
    titleMarathi: "गणपती बाप्पा",
    content: "Lord Ganesha, also known as Ganpati, is one of the most worshipped deities in Hinduism. He is the son of Lord Shiva and Goddess Parvati. Ganesha is revered as the remover of obstacles, the patron of arts and sciences, and the deva of intellect and wisdom.",
    contentMarathi: "गणपती बाप्पा हे हिंदू धर्मातील सर्वाधिक पूजले जाणारे देवता आहेत. ते भगवान शंकर आणि देवी पार्वतीचे नाती आहेत. गणपती हे विघ्नहर्ता, कलाआणि विज्ञानाचे रक्षक, आणि बुद्धी व ज्ञानाचे देवता म्हणून प्रसिद्ध आहेत.",
  },
  {
    id: "ganesh-chaturthi",
    title: "Ganesh Chaturthi",
    titleMarathi: "गणेश चतुर्थी",
    content: "Ganesh Chaturthi is a Hindu festival that celebrates the birth of Lord Ganesha. The festival, which lasts about 10 days, is celebrated with great pomp and devotion across India, especially in Maharashtra. It starts on the fourth day of the Hindu luni-solar calendar month Bhadrapada.",
    contentMarathi: "गणेश चतुर्थी हा हिंदू सण आहे जो भगवान गणपतींच्या जन्माचा उत्सव मानतो. हा सण साधारणतः १० दिवस चालतो आणि भारतात, विशेषतः महाराष्ट्रात, खूप धूमधामाने साजरा होतो. हा सण हिंदू पंचांगानुसार भाद्रपद महिन्याच्या चतुर्थीला सुरू होतो.",
  },
  {
    id: "aarti-importance",
    title: "Importance of Aarti",
    titleMarathi: "आरतीचे महत्त्व",
    content: "Aarti is a devotional song that is performed during worship. It involves the waving of lit lamps before the deity. Aarti is performed to invoke the blessings of the deity and to express gratitude. The word Aarti comes from the Sanskrit word 'Aratrika', meaning 'that which removes darkness'.",
    contentMarathi: "आरती ही पूजेदरम्यान वाचली जाणारी भक्तिगीतं आहेत. यात देवतेसमोर दिवे धूप दिले जातात. आरती देवतेच्या आशीर्वाद मिळवण्यासाठी आणि कृतज्ञता व्यक्त करण्यासाठी केली जाते. 'आरती' हा शब्द संस्कृत 'अरात्रिका' या शब्दापासून आला आहे, ज्याचा अर्थ 'अंधार दूर करणारा'.",
  },
  {
    id: "modak",
    title: "Modak",
    titleMarathi: "मोदक",
    content: "Modak is a sweet dumpling that is considered Lord Ganesha's favorite food. The modak is made with rice flour or wheat flour and filled with jaggery and grated coconut. The shape of the modak is said to represent the spiritual knowledge.",
    contentMarathi: "मोदक हा एक गोड पदार्थ आहे जो भगवान गणपतींचा आवडता अन्न मानला जातो. मोदक तांदूळाच्या पिठी किंवा गहू पिठ्यापासून बनवला जातो आणि त्यात गूळ आणि कोथिंबीर मिसळले जाते. मोदकाचा आकार आध्यात्मिक ज्ञानाचे प्रतीक असल्याचे मानले जाते.",
  },
  {
    id: "visarjan",
    title: "Ganpati Visarjan",
    titleMarathi: "गणपती विसर्जन",
    content: "Ganpati Visarjan is the immersion of the Ganesha idol in a river, sea, or water body. It signifies the cycle of creation and dissolution in nature. On the final day, devotees bid farewell to Lord Ganesha with great devotion, dancing and singing through the streets.",
    contentMarathi: "गणपती विसर्जन म्हणजे गणपती मूर्तीचे नदी, समुद्र किंवा जलाशयात विसर्जन करणे. हे निसर्गातील सर्जन आणि विलय या चक्राचे प्रतीक आहे. अंतिम दिवशी भक्तगण भगवान गणपतींना खूप भक्तीने विदाई देतात, रस्त्यांवर नाचत आणि गात.",
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly Ganpati",
    titleMarathi: "पर्यावरणपूरक गणपती",
    content: "Eco-friendly Ganpati celebrations use idols made from natural clay and eco-friendly colors. These idols dissolve easily in water without harming aquatic life. The use of natural materials helps protect our water bodies and environment.",
    contentMarathi: "पर्यावरणपूरक गणपती साजरा करताना नैसर्गिक माती आणि पर्यावरणपूरक रंगांपासून बनवलेल्या मूर्ती वापरल्या जातात. ही मूर्ती जलजीवांना हानी न पोहोचवता पाण्यात सहज विरघळतात. नैसर्गिक साहित्याचा वापर आपल्या जलाशयांना आणि पर्यावरणाचे संरक्षण करतो.",
  },
];

export interface Contact {
  name: string;
  phone: string;
  role: string;
}

export const CONTACTS: Contact[] = [
  { name: "Suraj Gupta", phone: "918286328273", role: "Contact" },
  { name: "Sahil Mali", phone: "919082412135", role: "Contact" },
  { name: "Anand Jaiswal", phone: "917447469741", role: "Contact" },
  { name: "Krishna Kesharwani", phone: "918788250462", role: "Contact" },
];

export interface MandalInfo {
  name: string;
  location: string;
  address: string;
  about: string;
  mission: string;
  establishedYear: number;
  activities: string[];
  socialInitiatives: string[];
  contacts: Contact[];
  committee: {
    name: string;
    role: string;
  }[];
}

export const MANDAL_INFO: MandalInfo = {
  name: "OM SAI MITRA MANDAL",
  location: "Triveni Sangam Apartment",
  address: "Triveni Sangam Apartment, Kaneri, Bhiwandi, Maharashtra 421302",
  about: "OM SAI MITRA MANDAL is a community organization established in the heart of Triveni Sangam Apartment, Kaneri, Bhiwandi. For years, we have been celebrating Ganesh Chaturthi with great devotion and community participation. Our mission is to bring people together through faith, culture, and social service.",
  mission: "To foster community spirit through religious celebrations, cultural activities, and social initiatives. We believe in bringing people together under the blessings of Lord Ganesha.",
  establishedYear: 2010,
  activities: [
    "Annual Ganesh Chaturthi Celebration",
    "Cultural Programs and Competitions",
    "Social Service Initiatives",
    "Blood Donation Camps",
    "Health Check-up Camps",
    "Educational Support for Underprivileged",
  ],
  socialInitiatives: [
    "Blood Donation Drives",
    "Free Health Check-up Camps",
    "Educational Scholarships",
    "Environmental Awareness Programs",
    "Senior Citizen Care",
    "Women Empowerment Programs",
  ],
  contacts: CONTACTS,
  committee: [
    { name: "President Name", role: "अध्यक्ष" },
    { name: "Secretary Name", role: "सचिव" },
    { name: "Treasurer Name", role: "उपाध्यक्ष" },
    { name: "Member 1", role: "सदस्य" },
    { name: "Member 2", role: "सदस्य" },
    { name: "Member 3", role: "सदस्य" },
    { name: "Member 4", role: "सदस्य" },
  ],
};

export interface VisarjanInfo {
  date: string;
  dateMarathi: string;
  time: string;
  processionStart: string;
  route: string[];
  meetingPoint: string;
  instructions: string[];
  emergencyContact: string;
}

export const VISARJAN_INFO: VisarjanInfo = {
  date: "2026-09-20",
  dateMarathi: "२० सप्टेंबर २०२६",
  time: "15:00",
  processionStart: "11:00",
  route: [
    "Triveni Sangam Apartment, Kaneri (Starting Point)",
    "Main Road",
    "Temple Chowk",
    "Market Area",
    "River Bank (Visarjan Point)",
  ],
  meetingPoint: "Triveni Sangam Apartment Main Gate, Kaneri",
  instructions: [
    "Please reach the meeting point by 10:30 AM",
    "Carry water bottles and stay hydrated",
    "Follow the volunteer instructions",
    "Keep children supervised at all times",
    "Do not throw colors or powder on others",
    "Help keep the route clean",
    "Emergency numbers will be shared on WhatsApp",
  ],
  emergencyContact: "918286328273",
};
