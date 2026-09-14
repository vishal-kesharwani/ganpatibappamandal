export interface Aarti {
  id: string;
  slug: string;
  title: string;
  titleMarathi: string;
  titleHindi: string;
  titleHinglish: string;
  category: string;
  categoryMarathi: string;
  categoryHindi: string;
  categoryHinglish: string;
  lyrics: string;
  lyricsHindi: string;
  lyricsHinglish: string;
  audioUrl?: string;
  description?: string;
  descriptionHindi?: string;
  descriptionHinglish?: string;
}

export const AARTI_CATEGORIES = [
  { id: "ganpati", label: "गणपतीची आरती", labelEn: "Ganpati Aarti" },
  { id: "sukhkarta", label: "सुखकर्ता दुःखहर्ता", labelEn: "Sukhkarta Dukhharta" },
  { id: "jaydev", label: "जय देव जय देव", labelEn: "Jay Dev Jay Dev" },
  { id: "ghalin", label: "घालीन लोटांगण", labelEn: "Ghalin Lotangan" },
  { id: "mantra", label: "मंत्रपुष्पांजली", labelEn: "Mantra Pushpanjali" },
  { id: "atharvashirsha", label: "गणपती अथर्वशीर्ष", labelEn: "Ganpati Atharvashirsha" },
  { id: "sheja", label: "शेज आरती", labelEn: "Sheja Aarti" },
  { id: "other", label: "इतर आरत्या", labelEn: "Other Aartis" },
  { id: "vishnu", label: "विष्णु आरती", labelEn: "Vishnu Aarti" },
  { id: "hanuman", label: "हनुमान आरती", labelEn: "Hanuman Aarti" },
  { id: "devi", label: "देवी आरती", labelEn: "Devi Aarti" },
  { id: "krishna", label: "कृष्ण आरती", labelEn: "Krishna Aarti" },
  { id: "ram", label: "राम आरती", labelEn: "Ram Aarti" },
];

export const AARTIS: Aarti[] = [
  {
    id: "1",
    slug: "sukhkarta-dukhharta",
    title: "Sukhkarta Dukhharta",
    titleMarathi: "सुखकर्ता दुःखहर्ता",
    titleHindi: "सुखकर्ता दुःखहर्ता",
    titleHinglish: "Sukhkarta Dukhharta",
    category: "sukhkarta",
    categoryMarathi: "सुखकर्ता दुःखहर्ता",
    categoryHindi: "सुखकर्ता दुःखहर्ता",
    categoryHinglish: "Sukhkarta Dukhharta",
    lyrics: `सुखकर्ता दुःखहर्ता वारण विघ्नविनाशन ।
मूर्ति चि तुझी पाहिली मना माझ्या अशा आनंदी ॥

कर्णविभूषण तुझी विदले मनी माझे ।
होई अनादि तुझी वंदन बुद्धिनाशे ॥

लंबोदर विघ्नहर्ता मंगलमूर्ती ।
तुजविण देवा मनोरथ माझे होती ॥

गणेश देव तुज विनावी वरदे ।
तूच आम्हा सर्वांचा जीव वसे आता ॥

आज सुवर्णवर्णी सरोवर जली उभारली ।
तुझी पूजा करिती घरी घरी उभारली ॥

आज सुहासिनी पूजा तुझी गाठीली ।
सर्व मंगळ झाली सुर्वाच्या भान उभारली ॥`,
    lyricsHindi: `सुखकर्ता दुःखहर्ता वारण विघ्नविनाशन ।
मूर्ति चि तुझी पाहिली मना माझ्या अशा आनंदी ॥

कर्णविभूषण तुझी विदले मनी माझे ।
होई अनादि तुझी वंदन बुद्धिनाशे ॥

लंबोदर विघ्नहर्ता मंगलमूर्ती ।
तुजविण देवा मनोरथ माझे होती ॥

गणेश देव तुज विनावी वरदे ।
तूच आम्हा सर्वांचा जीव वसे आता ॥

आज सुवर्णवर्णी सरोवर जली उभारली ।
तुझी पूजा करिती घरी घरी उभारली ॥

आज सुहासिनी पूजा तुझी गाठीली ।
सर्व मंगळ झाली सुर्वाच्या भान उभारली ॥`,
    lyricsHinglish: `Sukhkarta Dukhharta Vaaran Vighnvinashan
Murti chi tuzhi paahili manaa maajhyaa ashaa aanandee

Karnavibhushan tuzhi vidale manee maajhe
Hooee anaadi tuzhi vandan buddhinaashe

Lambodar Vighnaharta Mangalamurti
Tujavin devaa manorath maajhe hotee

Ganesh Dev tuj vinaavi varade
Tuuch aamhaa sarvanchaa jeev vase aataa

Aaj suvarnvarnee sarovar jali ubhaaralee
Tujhee pooja karitee gharee gharree ubhaaralee

Aaj suhaasinee pooja tujhee gaatheeli
Sarva mangal jhaalee survchaa bhaan ubhaaralee`,
    description: "गणपती बाप्पाच्या सर्वात प्रसिद्ध आरती. सुखकर्ता दुःखहर्ता म्हणजे आनंद देणारा आणि दुःख हरणारा. ही आरती सर्व गणपती पूजेत वाचली जाते.",
    descriptionHindi: "गणपती बाप्पा की सबसे प्रसिद्ध आरती। सुखकर्ता दुःखहर्ता यानी सुख देने वाला और दुःख हरने वाला। यह आरती सभी गणपती पूजा में पढ़ी जाती है।",
    descriptionHinglish: "Ganpati Bappa ki sabse prasiddh aarti. Sukhkarta Dukhharta yani sukh dene wala aur dukh harne wala. Yeh aarti sabhi Ganpati pooja mein padhi jaati hai.",
  },
  {
    id: "2",
    slug: "jay-dev-jay-dev",
    title: "Jay Dev Jay Dev",
    titleMarathi: "जय देव जय देव",
    titleHindi: "जय देव जय देव",
    titleHinglish: "Jay Dev Jay Dev",
    category: "jaydev",
    categoryMarathi: "जय देव जय देव",
    categoryHindi: "जय देव जय देव",
    categoryHinglish: "Jay Dev Jay Dev",
    lyrics: `जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

सुस्वर तुझी फरफटी वरदानी ।
निर्वाण दिलें दिंडी वरदानी ॥

तुष्ट प्रसन्न वदनी सुवर्ण वरणी ।
नमस्कार तुज आणी रिकामी करुनी ॥

नमस्कार तुज आणी रिकामी करुनी ।
नाम घेतों अखंड प्रमाणे वाहिनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

प्रथम तुझ नमन मी करितों ।
अवघ्या विघ्नांचा नाश करितों ॥

द्वितीय तुज नमन मी करितों ।
सकल सिद्धी प्राप्त करितों ॥

तृतीय तुज नमन मी करितों ।
सुख संपत्ती प्राप्त करितों ॥

चतुर्थ तुज नमन मी करितों ।
शरण तुजी म्हणुनी करितों ॥

नमस्कार तुज आणी रिकामी करुनी ।
नाम घेतों अखंड प्रमाणे वाहिनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

पाहती तुझे नयने दूर होती दुःखे ।
सोयरे करिते संकटे तुवांचे एकच टुके ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

वेद नाम संग पूजा केली ।
आनंद प्राप्त झाला शेठी ॥

पाठ रोज करिता पूजा तुझी ।
तर संकटे दूर होती आणी करुनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥`,
    lyricsHindi: `जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

सुस्वर तुझी फरफटी वरदानी ।
निर्वाण दिलें दिंडी वरदानी ॥

तुष्ट प्रसन्न वदनी सुवर्ण वरणी ।
नमस्कार तुज आणी रिकामी करुनी ॥

नमस्कार तुज आणी रिकामी करुनी ।
नाम घेतों अखंड प्रमाणे वाहिनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

प्रथम तुझ नमन मी करितों ।
अवघ्या विघ्नांचा नाश करितों ॥

द्वितीय तुज नमन मी करितों ।
सकल सिद्धी प्राप्त करितों ॥

तृतीय तुझ नमन मी करितों ।
सुख संपत्ती प्राप्त करितों ॥

चतुर्थ तुझ नमन मी करितों ।
शरण तुझी म्हणुनी करितों ॥

नमस्कार तुज आणी रिकामी करुनी ।
नाम घेतों अखंड प्रमाणे वाहिनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

पाहती तुझे नयने दूर होती दुःखे ।
सोयरे करिते संकटे तुवांचे एकच टुके ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥

वेद नाम संग पूजा केली ।
आनंद प्राप्त झाला शेठी ॥

पाठ रोज करिता पूजा तुझी ।
तर संकटे दूर होती आणी करुनी ॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शन मात्रे पापहर्ती पूर्ण करती कृती ॥`,
    lyricsHinglish: `Jay Dev Jay Dev Jay Mangalamurti
Darshan matre papaharti purn karti kruti

Susvar tujhi farphati vardani
Nirvaan dile dindi vardani

Tusht prasanna vadnee suvarn varnee
Namaskar tuj aani rikaamee karuni

Pratham tuj naman mee karito
Avghyaa vighnaanchaa naash karito

DvitIy tuj naman mee karito
Sakal siddhi praapt karito

TritIy tuj naman mee karito
Sukh sampatti praapt karito

Chaturth tuj naman mee karito
Sharan tujee mhanuni karito

Jay Dev Jay Dev Jay Mangalamurti
Darshan matre papaharti purn karti kruti`,
    description: "जय देव जय देव ही आरती गणेश चतुर्थीला विशेष वाचली जाते. यात चार नमस्कार आहेत.",
    descriptionHindi: "जय देव जय देव यह आरती गणेश चतुर्थी में विशेष पढ़ी जाती है। इसमें चार नमस्कार हैं।",
    descriptionHinglish: "Jay Dev Jay Dev yeh aarti Ganesh Chaturthi mein vishesh padhi jaati hai. Ismein chaar namaskar hain.",
  },
  {
    id: "3",
    slug: "ghalin-lotangan",
    title: "Ghalin Lotangan",
    titleMarathi: "घालीन लोटांगण",
    titleHindi: "घालीन लोटांगण",
    titleHinglish: "Ghalin Lotangan",
    category: "ghalin",
    categoryMarathi: "घालीन लोटांगण",
    categoryHindi: "घालीन लोटांगण",
    categoryHinglish: "Ghalin Lotangan",
    lyrics: `घालीन लोटांगण वंदन चरण ।
तुझे आहे माझ्या कुटुंबाचे पूर्ण ॥

आज सुवर्णवर्णी वारण विघ्नविनाशन ।
तुजवर्ती चरण नमन केलें आज ॥

सुवर्णवर्णी सरोवर जली उभारली ।
नित्य पूजा तुझी घरी घरी केली ॥

सुवर्णतुलसी मंत्रपुष्पांजली केली ।
साजणी चरणी तुझ्या कुंकुम लावलें ॥

तुलसीवन मंजरी तुजवर्ती आणलें ।
विघ्नहर्ता मंगलमूर्ती तुझी पहिलें ॥

कुंदे हे फुल तुझ्या चरणी उभारली ।
बुद्धि प्राप्त करावी सुरुवातीला आली ॥

जांभूळ फुलं हे चरणी तुझ्या उभारलें ।
विघ्नहर्ता मंगलमूर्ती तुझी पहिलें ॥

रक्तचंदन तुज आणी उभारलें ।
चंद्रमा तुझा सहवास झाला पावन ॥

आंबा फुल तुझ्या चरणी आणलें ।
चरणी तुझ्या कुंकूम लावलें ॥

घालीन लोटांगण वंदन चरण ।
तुझे आहे माझ्या कुटुंबाचे पूर्ण ॥`,
    lyricsHindi: `घालीन लोटांगण वंदन चरण ।
तुझे आहे माझ्या कुटुंबाचे पूर्ण ॥

आज सुवर्णवर्णी वारण विघ्नविनाशन ।
तुजवर्ती चरण नमन केलें आज ॥

सुवर्णवर्णी सरोवर जली उभारली ।
नित्य पूजा तुझी घरी घरी केली ॥

सुवर्णतुलसी मंत्रपुष्पांजली केली ।
साजणी चरणी तुझ्या कुंकुम लावलें ॥

तुलसीवन मंजरी तुजवर्ती आणलें ।
विघ्नहर्ता मंगलमूर्ती तुझी पहिलें ॥

कुंदे हे फुल तुझ्या चरणी उभारली ।
बुद्धि प्राप्त करावी सुरुवातीला आली ॥

जांभूळ फुलं हे चरणी तुझ्या उभारलें ।
विघ्नहर्ता मंगलमूर्ती तुझी पहिलें ॥

रक्तचंदन तुज आणी उभारलें ।
चंद्रमा तुझा सहवास झाला पावन ॥

आंबा फुल तुझ्या चरणी आणलें ।
चरणी तुझ्या कुंकूम लावलें ॥

घालीन लोटांगण वंदन चरण ।
तुझे आहे माझ्या कुटुंबाचे पूर्ण ॥`,
    lyricsHinglish: `Ghaaleen Lotangan Vandan Charan
Tujhe aahaa maajhyaa kutumbache purn

Aaj suvarnvarnee vaaran vighnvinashan
Tujvarti charan naman kele aaj

Suvarnvarnee sarovar jali ubhaaralee
Nitya pooja tujhee gharee gharree kelee

Suvarn tulsi mantra pushpanjali kelee
Saajani charanee tujhyaa kunkum laavle

Tulseevan manjri tujvarti aanaalee
Vighnaharta Mangalamurti tujhee pahile

Kunde he phul tujhyaa charanee ubhaaralee
Buddhi praapt karaavee suruvaatila aalee

Jaambhool phulan he charanee tujhyaa ubhaaralee
Vighnaharta Mangalamurti tujhee pahile

Raktachandan tuj aani ubhaaralee
Chandrama tujhaa sahavaas jhaalaa paavan

Aamba phul tujhyaa charanee aanaalee
Charanee tujhyaa kunkum laavle`,
    description: "घालीन लोटांगण या आरतीत गणपती बाप्पाच्या चरणी विविध फुलं आणि पूजा साहित्य उभारले जाते.",
    descriptionHindi: "घालीन लोटांगण इस आरती में गणपती बाप्पा के चरणों में विभिन्न फूल और पूजा सामग्री चढ़ाई जाती है।",
    descriptionHinglish: "Ghalin Lotangan is aarti mein Ganpati Bappa ke charanon mein vibhinn phool aur pooja samagri chadhayi jaati hai.",
  },
  {
    id: "4",
    slug: "mantra-pushpanjali",
    title: "Mantra Pushpanjali",
    titleMarathi: "मंत्रपुष्पांजली",
    titleHindi: "मंत्र पुष्पांजलि",
    titleHinglish: "Mantra Pushpanjali",
    category: "mantra",
    categoryMarathi: "मंत्रपुष्पांजली",
    categoryHindi: "मंत्र पुष्पांजलि",
    categoryHinglish: "Mantra Pushpanjali",
    lyrics: `ॐ असतो मा सद्गमय ।
तमसो मा ज्योतिर्गमय ।
मृत्योर्मा अमृतं गमय ।
ॐ शान्तिः शान्तिः शान्तिः ॥

ॐ गणानां त्वा गणपतिं हवामहे ।
कविं कवीनामुपमाश्रवस्तमम् ।
ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत ।
आ नो भ्राविष्णु सचमित्र समुद्रे ॥

ॐ एकदन्ताय विद्महे ।
वक्रतुण्डाय धीमहि ।
तन्नो दन्ती प्रचोदयात् ॥

ॐ गं गणपतये नमः ॥`,
    lyricsHindi: `ॐ असतो मा सद्गमय ।
तमसो मा ज्योतिर्गमय ।
मृत्योर्मा अमृतं गमय ।
ॐ शान्तिः शान्तिः शान्तिः ॥

ॐ गणानां त्वा गणपतिं हवामहे ।
कविं कवीनामुपमाश्रवस्तमम् ।
ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत ।
आ नो भ्राविष्णु सचमित्र समुद्रे ॥

ॐ एकदन्ताय विद्महे ।
वक्रतुण्डाय धीमहि ।
तन्नो दन्ती प्रचोदयात् ॥

ॐ गं गणपतये नमः ॥`,
    lyricsHinglish: `Om Asato Maa Sadgamaya
Tamaso Maa Jyotirgamaya
Mrityormaa Amritam Gamaya
Om Shanti Shanti Shanti

Om Ganaanaam Tvaa Ganapatim Havaamahi
Kavin Kavinamupamashravastamam
Jyeshttharaajam Brahmanaam Brahmanaspata
Aa No Bhraavishnu Sachamitra Samudre

Om Ekdantaaya Vidmahe
Vakratundaaya Dheemahi
Tanno Danti Prachodayaat

Om Gam Ganapataye Namah`,
    description: "मंत्रपुष्पांजली म्हणजे मंत्रांच्या माध्यमातून गणपती बाप्पाला पुष्पे अर्पण करणे.",
    descriptionHindi: "मंत्र पुष्पांजलि यानी मंत्रों के माध्यम से गणपती बाप्पा को पुष्प अर्पित करना।",
    descriptionHinglish: "Mantra Pushpanjali yani mantron ke madhyam se Ganpati Bappa ko pushp arpit karna.",
  },
  {
    id: "5",
    slug: "sheja-aarti",
    title: "Sheja Aarti",
    titleMarathi: "शेज आरती",
    titleHindi: "शयन आरती",
    titleHinglish: "Sheja Aarti",
    category: "sheja",
    categoryMarathi: "शेज आरती",
    categoryHindi: "शयन आरती",
    categoryHinglish: "Sheja Aarti",
    lyrics: `उभी राहिली आरती शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

काय झालं तू झोपलास का बाप्पा ।
दिवसभराची थकलास का बाप्पा ॥

उठ बाप्पा उठ बाप्पा झोपू नकोस ।
आरती बाकी आहे आता जागे हो ॥

तुलसीवन आणले चरणी तुझ्या ।
हळदी कुंकूम लावले तुझ्या ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

कर्ता विघ्नहर्ता मंगलमूर्ती ।
तुवाच्या चरणी माझी अर्जी ॥

रिकामा करुनी केला नमस्कार ।
सदा सुखी रहा तुम्ही देव आपुला ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

बाप्पा तुझ्या चरणी फुले उभारली ।
तुलसी मंजरी आणि कुंकुम लावलें ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥`,
    lyricsHindi: `उभी राहिली आरती शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

काय झालं तू झोपलास का बाप्पा ।
दिवसभराची थकलास का बाप्पा ॥

उठ बाप्पा उठ बाप्पा झोपू नकोस ।
आरती बाकी आहे आता जागे हो ॥

तुलसीवन आणले चरणी तुझ्या ।
हळदी कुंकूम लावले तुझ्या ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

कर्ता विघ्नहर्ता मंगलमूर्ती ।
तुवाच्या चरणी माझी अर्जी ॥

रिकामा करुनी केला नमस्कार ।
सदा सुखी रहा तुम्ही देव आपुला ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥

बाप्पा तुझ्या चरणी फुले उभारली ।
तुलसी मंजरी आणि कुंकुम लावलें ॥

आरती उभी राहिली शेजीला ।
गणपती बाप्पा झोपला शेजीला ॥`,
    lyricsHinglish: `Ubhi Raahili Aarti Shejilaa
Ganpati Bappa Jhoplaa Shejilaa

Kaay Jhaalaa Tu Jhoplaas Kaa Bappaa
Divasbhrachee Thaklaas Kaa Bappaa

Uth Bappaa Uth Bappaa Jhopoo Nakos
Aarti Baaki Aahaa Aataa Jaage Ho

Tulseevan Aanaale Charanee Tujhyaa
Haldee Kunkum Laavle Tujhyaa

Aarti Ubhi Raahili Shejilaa
Ganpati Bappa Jhoplaa Shejilaa

Kartaa Vighnaharta Mangalamurti
Tuvaa Chyaa Charanee Maajhee Arjee

Rikaamaa Karuni Kelaa Namaskar
Sadaa Sukhee Raha Tumhee Dev Aapulaa

Aarti Ubhi Raahili Shejilaa
Ganpati Bappa Jhoplaa Shejilaa

Bappaa Tujhyaa Charanee Phule Ubhaaralee
Tulsi Manjri Aani Kunkum Laavle`,
    description: "शेज आरती म्हणजे रात्रीच्या वेळी गणपती बाप्पाला झोपवताना वाचली जाणारी आरती.",
    descriptionHindi: "शयन आरती यानी रात के समय गणपती बाप्पा को सुलाते समय पढ़ी जाने वाली आरती।",
    descriptionHinglish: "Sheja Aarti yani raat ke samay Ganpati Bappa ko sulate samay padhi jaane wali aarti.",
  },
  {
    id: "6",
    slug: "ganpati-atharvashirsha",
    title: "Ganpati Atharvashirsha",
    titleMarathi: "गणपती अथर्वशीर्ष",
    titleHindi: "गणपति अथर्वशीर्ष",
    titleHinglish: "Ganpati Atharvashirsha",
    category: "atharvashirsha",
    categoryMarathi: "गणपती अथर्वशीर्ष",
    categoryHindi: "गणपति अथर्वशीर्ष",
    categoryHinglish: "Ganpati Atharvashirsha",
    lyrics: `ॐ नमस्ते गणपतये त्वमेव प्रत्यक्षं ब्रह्मासि ।
त्वामेव प्रत्यक्षं विष्णुः त्वामेव प्रत्यक्षं रुद्रः प्रणोमि ॥

सत्यं शिवं सुन्दरं चतुर्भुजं गजाननं ।
भक्तानुग्रहकारं वन्दे विघ्नविनाशनम् ॥

नमस्ते सिद्धिविनायकाय सर्वकार्यकृते सर्वविघ्नप्रशमनाय सर्वराज्यवश्यकरणाय सर्वजनसर्वस्त्रीपुरुषाकर्षणाय श्रेष्ठाय श्रेष्ठाय महागणाधिपतये नमस्ते नमस्ते नमस्ते ॥

ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नो भ्राविष्णु सचमित्र समुद्रे ॥

वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥

वक्रतुण्डः पिंगलो यस्य नेत्रं त्रिनेत्रो भक्तजनप्रियः स्यात् ।
विघ्नेश्वरो विघ्नविनाशनो वा सिद्धिविनायको मंगलप्रदो भूत् ॥

आदित्या नमस्तुभ्यं प्रकाशं वै प्रजापते ।
त्वमेव प्रत्यक्षं तत्त्वं ब्रह्मासि सत्यमीश्वरः ॥

ॐ गणपतये नमः ।
ॐ महागणपतये नमः ।
ॐ विघ्नविनाशनाय नमः ।
ॐ सिद्धिविनायकाय नमः ॥

ॐ शान्तिः शान्तिः शान्तिः ॥`,
    lyricsHindi: `ॐ नमस्ते गणपतये त्वमेव प्रत्यक्षं ब्रह्मासि ।
त्वामेव प्रत्यक्षं विष्णुः त्वामेव प्रत्यक्षं रुद्रः प्रणोमि ॥

सत्यं शिवं सुन्दरं चतुर्भुजं गजाननं ।
भक्तानुग्रहकारं वन्दे विघ्नविनाशनम् ॥

नमस्ते सिद्धिविनायकाय सर्वकार्यकृते सर्वविघ्नप्रशमनाय सर्वराज्यवश्यकरणाय सर्वजनसर्वस्त्रीपुरुषाकर्षणाय श्रेष्ठाय श्रेष्ठाय महागणाधिपतये नमस्ते नमस्ते नमस्ते ॥

ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नो भ्राविष्णु सचमित्र समुद्रे ॥

वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥

वक्रतुण्डः पिंगलो यस्य नेत्रं त्रिनेत्रो भक्तजनप्रियः स्यात् ।
विघ्नेश्वरो विघ्नविनाशनो वा सिद्धिविनायको मंगलप्रदो भूत् ॥

आदित्या नमस्तुभ्यं प्रकाशं वै प्रजापते ।
त्वमेव प्रत्यक्षं तत्त्वं ब्रह्मासि सत्यमीश्वरः ॥

ॐ गणपतये नमः ।
ॐ महागणपतये नमः ।
ॐ विघ्नविनाशनाय नमः ।
ॐ सिद्धिविनायकाय नमः ॥

ॐ शान्तिः शान्तिः शान्तिः ॥`,
    lyricsHinglish: `Om Namaste Ganapataye Tvameva Pratyaksham Brahmaasi
Tvaameva Pratyaksham Vishnuh Tvaameva Pratyaksham Rudrah Pranoomi

Satyam Shivam Sundaram Chaturbhujam Gajanana
Bhaktanugrahakaaram Vande Vighnavinashanam

Namaste Siddhivinayaakaya Sarvakaryakrite Sarvavighnaprashamanaaya Sarvarajyavashyakaranaaya Sarvajanasarvastree Purushaakarshanaya Shresthaaya Shresthaaya Mahaaganadhipataye Namaste Namaste Namaste

Vakratunda Mahaakaaya Suryakoti Samaprabha
Nirvighnam Kuru Me Deva Sarvaaryeshu Sarvadaa`,
    description: "गणपती अथर्वशीर्ष हा सर्वात पवित्र मंत्र मानला जातो. याचे वाचन विशेष पुण्यदायी आहे.",
    descriptionHindi: "गणपति अथर्वशीर्ष यह सबसे पवित्र मंत्र माना जाता है। इसका वाचन विशेष पुण्यदायी है।",
    descriptionHinglish: "Ganpati Atharvashirsha yeh sabse pavitra mantra maana jaata hai. Iska vachan vishesh punyadaayi hai.",
  },
  {
    id: "7",
    slug: "mangal-murti-aarti",
    title: "Mangal Murti Aarti",
    titleMarathi: "मंगलमूर्ती आरती",
    titleHindi: "मंगलमूर्ति आरती",
    titleHinglish: "Mangal Murti Aarti",
    category: "ganpati",
    categoryMarathi: "गणपतीची आरती",
    categoryHindi: "गणपति की आरती",
    categoryHinglish: "Ganpati Ki Aarti",
    lyrics: `जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥

एक दन्ता दयावंता चार भुजा धारी ।
माथे परी तिलक साजे लम्बोदर श्री गणराजी ॥

मोदकांची भोग लागे संदर लाडू मोदक आनंदी ।
तुझ्या भक्तांच्या गोडीला देवा आणले जन्मभर आनंदी ॥

दुष्टांच्या डोक्यावर तू असशील लम्बोदरा ।
शहाणे तू आहेस गणराजा हो गणराजा ॥

जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥`,
    lyricsHindi: `जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥

एक दन्ता दयावंता चार भुजा धारी ।
माथे परी तिलक साजे लम्बोदर श्री गणराजी ॥

मोदकांची भोग लागे संदर लाडू मोदक आनंदी ।
तुझ्या भक्तांच्या गोडीला देवा आणले जन्मभर आनंदी ॥

दुष्टांच्या डोक्यावर तू असशील लम्बोदरा ।
शहाणे तू आहेस गणराजा हो गणराजा ॥

जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥`,
    lyricsHinglish: `Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maata Jaakee Parvati Pitaa Mahadeva

Ek Danta Dayaavantaa Chaar Bhujaa Dhaaree
Maathe Pari Tilak Saaje Lambodar Shri Ganraaji

Modakanchi Bhog Laage Sandar Laadoo Modak Aanandee
Tujhyaa Bhaktanchyaa Godila Devaa Aanaale Janmabhar Aanandee

Dushtanchyaa Dokhyavar Tu Asaseel Lambodara
Shaahane Tu Aahes Ganraajaa Ho Ganraajaa`,
    description: "मंगलमूर्ती आरती गणपती बाप्पाच्या स्तुतीतून सुरू होते.",
    descriptionHindi: "मंगलमूर्ति आरती गणपती बाप्पा की स्तुति से शुरू होती है।",
    descriptionHinglish: "Mangal Murti Aarti Ganpati Bappa ki stuti se shuru hoti hai.",
  },
  {
    id: "8",
    slug: "ganpati-bappa-morya-aarti",
    title: "Ganpati Bappa Morya Aarti",
    titleMarathi: "गणपती बाप्पा मोरया आरती",
    titleHindi: "गणपति बप्पा मोरया आरती",
    titleHinglish: "Ganpati Bappa Morya Aarti",
    category: "other",
    categoryMarathi: "इतर आरत्या",
    categoryHindi: "अन्य आरतियाँ",
    categoryHinglish: "Other Aartis",
    lyrics: `गणपती बाप्पा मोरया ।
मंगलमूर्ती मोरया ॥

एकदन्त चतुर्भुज ।
भक्तांचे रक्षक देव ॥

मोदकाचा प्रिय बाप्पा ।
लड्डू भोग लावला आज ॥

सिद्धिविनायक प्रिय ।
सर्व संकट हर्ता देव ॥

गणपती बाप्पा मोरया ।
मंगलमूर्ती मोरया ॥`,
    lyricsHindi: `गणपती बाप्पा मोरया ।
मंगलमूर्ती मोरया ॥

एकदन्त चतुर्भुज ।
भक्तांचे रक्षक देव ॥

मोदकाचा प्रिय बाप्पा ।
लड्डू भोग लावला आज ॥

सिद्धिविनायक प्रिय ।
सर्व संकट हर्ता देव ॥

गणपती बाप्पा मोरया ।
मंगलमूर्ती मोरया ॥`,
    lyricsHinglish: `Ganpati Bappa Morya
Mangalamurti Morya

Ek Danta Chaturbhuj
Bhaktanche Rakshak Dev

Modakachaa Priya Bappaa
Ladoo Bhog Laavlaa Aaj

Siddhivinayak Priya
Sarva Sankat Harta Dev`,
    description: "गणपती बाप्पा मोरया हा सर्वात लोकप्रिय उद्घोष आहे.",
    descriptionHindi: "गणपती बाप्पा मोरया यह सबसे लोकप्रिय उद्घोष है।",
    descriptionHinglish: "Ganpati Bappa Morya yeh sabse lokapriya udghosh hai.",
  },
  {
    id: "9",
    slug: "ratrigriha-aarti",
    title: "Ratrigriha Aarti",
    titleMarathi: "रात्रिगृह आरती",
    titleHindi: "रात्रिगृह आरती",
    titleHinglish: "Ratrigriha Aarti",
    category: "sheja",
    categoryMarathi: "शेज आरती",
    categoryHindi: "शयन आरती",
    categoryHinglish: "Sheja Aarti",
    lyrics: `आरती उभी राहिली ।
शेजीला गणपती बाप्पा ।
झोपला शेजीला ॥

काय झालं तू झोपलास का बाप्पा ।
दिवसभराची थकलास का बाप्पा ॥

उठ बाप्पा उठ बाप्पा ।
झोपू नकोस बाप्पा ।
आरती बाकी आहे आता जागे हो ॥

आरती उभी राहिली ।
शेजीला गणपती बाप्पा ।
झोपला शेजीला ॥`,
    lyricsHindi: `आरती उभी राहिली ।
शेजीला गणपती बाप्पा ।
झोपला शेजीला ॥

काय झालं तू झोपलास का बाप्पा ।
दिवसभराची थकलास का बाप्पा ॥

उठ बाप्पा उठ बाप्पा ।
झोपू नकोस बाप्पा ।
आरती बाकी आहे आता जागे हो ॥

आरती उभी राहिली ।
शेजीला गणपती बाप्पा ।
झोपला शेजीला ॥`,
    lyricsHinglish: `Aarti Ubhi Raahili
Shejilaa Ganpati Bappaa
Jhoplaa Shejilaa

Kaay Jhaalaa Tu Jhoplaas Kaa Bappaa
Divasbhrachee Thaklaas Kaa Bappaa

Uth Bappaa Uth Bappaa
Jhopoo Nakos Bappaa
Aarti Baaki Aahaa Aataa Jaage Ho

Aarti Ubhi Raahili
Shejilaa Ganpati Bappaa
Jhoplaa Shejilaa`,
    description: "रात्रिगृह आरती रात्रीच्या वेळी गणपती बाप्पाला झोपवताना वाचली जाते.",
    descriptionHindi: "रात्रिगृह आरती रात के समय गणपती बाप्पा को सुलाते समय पढ़ी जाती है।",
    descriptionHinglish: "Ratrigriha Aarti raat ke samay Ganpati Bappa ko sulate samay padhi jaati hai.",
  },
  {
    id: "10",
    slug: "shri-vishnu-aarti",
    title: "Shri Vishnu Aarti",
    titleMarathi: "श्री विष्णू आरती",
    titleHindi: "श्री विष्णु आरती",
    titleHinglish: "Shri Vishnu Aarti",
    category: "vishnu",
    categoryMarathi: "विष्णू आरती",
    categoryHindi: "विष्णु आरती",
    categoryHinglish: "Vishnu Aarti",
    lyrics: `जय विष्णु भगवान
जय विष्णु भगवान

शंख चक्र गदा धारी
कमल नयन श्री हरी
शंख चक्र गदा धारी
कमल नयन श्री हरी

जय विष्णु भगवान
जय विष्णु भगवान

जो विष्णु की भक्ति करे
सो दुःख से मुक्त हो जाए
जो विष्णु की भक्ति करे
सो दुःख से मुक्त हो जाए

जय विष्णु भगवान
जय विष्णु भगवान

आरती श्री विष्णु जी की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

जय विष्णु भगवान
जय विष्णु भगवान`,
    lyricsHindi: `जय विष्णु भगवान
जय विष्णु भगवान

शंख चक्र गदा धारी
कमल नयन श्री हरी
शंख चक्र गदा धारी
कमल नयन श्री हरी

जय विष्णु भगवान
जय विष्णु भगवान

जो विष्णु की भक्ति करे
सो दुःख से मुक्त हो जाए
जो विष्णु की भक्ति करे
सो दुःख से मुक्त हो जाए

जय विष्णु भगवान
जय विष्णु भगवान

आरती श्री विष्णु जी की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

जय विष्णु भगवान
जय विष्णु भगवान`,
    lyricsHinglish: `Jai Vishnu Bhagwan
Jai Vishnu Bhagwan

Shankh Chakra Gada Dhaari
Kamal Nayan Shri Hari
Shankh Chakra Gada Dhaari
Kamal Nayan Shri Hari

Jai Vishnu Bhagwan
Jai Vishnu Bhagwan

Jo Vishnu Ki Bhakti Kare
So Dukh Se Mukt Ho Jaaye
Jo Vishnu Ki Bhakti Kare
So Dukh Se Mukt Ho Jaaye

Jai Vishnu Bhagwan
Jai Vishnu Bhagwan

Aarti Shri Vishnu Ji Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Jai Vishnu Bhagwan
Jai Vishnu Bhagwan`,
    description: "श्री विष्णू आरती भगवान विष्णूंची स्तुती करते.",
    descriptionHindi: "श्री विष्णु आरती भगवान विष्णु की स्तुति करती है।",
    descriptionHinglish: "Shri Vishnu Aarti Bhagwan Vishnu ki stuti karti hai.",
  },
  {
    id: "11",
    slug: "shri-ganesh-hindi",
    title: "Shri Ganesh Aarti (Hindi)",
    titleMarathi: "श्री गणेश आरती (हिंदी)",
    titleHindi: "श्री गणेश आरती (हिंदी)",
    titleHinglish: "Shri Ganesh Aarti (Hindi)",
    category: "ganpati",
    categoryMarathi: "गणपतीची आरती",
    categoryHindi: "गणपती की आरती",
    categoryHinglish: "Ganpati Aarti",
    lyrics: `जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

एक दंत दयावंत चार भुजा धारी
माथे पर तिलक सोहे मूसे की सवारी

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

पान चढ़े फल चढ़े और चढ़े मेवा
लड्डुअन का भोग लगे संत करें सेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा`,
    lyricsHindi: `जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

एक दंत दयावंत चार भुजा धारी
माथे पर तिलक सोहे मूसे की सवारी

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

पान चढ़े फल चढ़े और चढ़े मेवा
लड्डुअन का भोग लगे संत करें सेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा

जय गणेश जय गणेश जय गणेश देवा
माता जाकी पार्वती पिता महादेवा`,
    lyricsHinglish: `Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maa Jaki Parvati Pita Mahadeva

Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maa Jaki Parvati Pita Mahadeva

Ek Dant Dayavant Char Bhuja Dhaari
Mathe Par Tilak Sohe Moose Ki Sawari

Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maa Jaki Parvati Pita Mahadeva

Paan Chade Phal Chade Aur Chade Mewa
Ladduan Ka Bhog Lage Sant Kare Seva

Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maa Jaki Parvati Pita Mahadeva

Jai Ganesh Jai Ganesh Jai Ganesh Deva
Maa Jaki Parvati Pita Mahadeva`,
    description: "हिंदी गणेश आरती भगवान गणेश की स्तुति करती है.",
    descriptionHindi: "हिंदी गणेश आरती भगवान गणेश की स्तुति करती है।",
    descriptionHinglish: "Hindi Ganesh Aarti Bhagwan Ganesh ki stuti karti hai.",
  },
  {
    id: "12",
    slug: "hanuman-aarti",
    title: "Hanuman Aarti",
    titleMarathi: "हनुमान आरती",
    titleHindi: "हनुमान आरती",
    titleHinglish: "Hanuman Aarti",
    category: "hanuman",
    categoryMarathi: "हनुमान आरती",
    categoryHindi: "हनुमान आरती",
    categoryHinglish: "Hanuman Aarti",
    lyrics: `आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

जके सिर पर राम दुष्ट दले
विक्रम रघुनाथ जस गावत बलिहारी

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

शंकर सुवन वीर हनुमाना
प्रबल बुद्धि विशाल शरीरा

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

सिंह प्रताप महा कपि सोई
कांचन बरन शरीर सजाई

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

जो बरबर पढ़े हनुमान चालीसा
होय सिद्धि साखी गौरीसा

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की`,
    lyricsHindi: `आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

जके सिर पर राम दुष्ट दले
विक्रम रघुनाथ जस गावत बलिहारी

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

शंकर सुवन वीर हनुमाना
प्रबल बुद्धि विशाल शरीरा

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

सिंह प्रताप महा कपि सोई
कांचन बरन शरीर सजाई

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की

जो बरबर पढ़े हनुमान चालीसा
होय सिद्धि साखी गौरीसा

आरती कीजै हनुमान लला की
दुष्ट दलन रघुनाथ कला की`,
    lyricsHinglish: `Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki

Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki

Jake Sir Par Ram Dusht Dale
Vikram Ragunath Jas Gaavat Bihari

Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki

Shankar Suvan Veer Hanumana
Prabal Buddhi Vishal Sharira

Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki

Singh Pratap Maha Kapi Soi
Kanchan Baran Sharir Sajai

Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki

Jo Barbar Padhe Hanuman Chalisa
Hoy Siddhi Sakhi Gaurisa

Aarti Kijai Hanuman Lala Ki
Dusht Dalan Ragunath Kala Ki`,
    description: "हनुमान आरती बजरंगबली की स्तुति करती है.",
    descriptionHindi: "हनुमान आरती बजरंगबली की स्तुति करती है।",
    descriptionHinglish: "Hanuman Aarti Bajrangbali ki stuti karti hai.",
  },
  {
    id: "13",
    slug: "shyam-sundar-aarti",
    title: "Khatu Shyam Sundar Aarti",
    titleMarathi: "खाटू श्याम सुंदर आरती",
    titleHindi: "खाटू श्याम सुंदर आरती",
    titleHinglish: "Khatu Shyam Sundar Aarti",
    category: "krishna",
    categoryMarathi: "कृष्ण आरती",
    categoryHindi: "कृष्ण आरती",
    categoryHinglish: "Krishna Aarti",
    lyrics: `जय श्री श्याम हरि
जय श्री श्याम हरि

खाटू धाम में विराजे श्री श्याम सुंदर
सेवक तेरे बिना अधूरे हैं

जय श्री श्याम हरि
जय श्री श्याम हरि

बाल रूप तेरा मन मोह लेता है
हर मोड़ पर तू ही साथ देता है

जय श्री श्याम हरि
जय श्री श्याम हरि

बांके बिहारी की जय हो
खाटू नाथ की जय हो
श्री श्याम सुंदर की जय हो

जय श्री श्याम हरि
जय श्री श्याम हरि

शरण में आए हैं श्री श्याम सुंदर
अब तो कर दो कृपा हम पर हरि

जय श्री श्याम हरि
जय श्री श्याम हरि`,
    lyricsHindi: `जय श्री श्याम हरि
जय श्री श्याम हरि

खाटू धाम में विराजे श्री श्याम सुंदर
सेवक तेरे बिना अधूरे हैं

जय श्री श्याम हरि
जय श्री श्याम हरि

बाल रूप तेरा मन मोह लेता है
हर मोड़ पर तू ही साथ देता है

जय श्री श्याम हरि
जय श्री श्याम हरि

बांके बिहारी की जय हो
खाटू नाथ की जय हो
श्री श्याम सुंदर की जय हो

जय श्री श्याम हरि
जय श्री श्याम हरि

शरण में आए हैं श्री श्याम सुंदर
अब तो कर दो कृपा हम पर हरि

जय श्री श्याम हरि
जय श्री श्याम हरि`,
    lyricsHinglish: `Jai Shri Shyam Hari
Jai Shri Shyam Hari

Khatu Dham Mein Viraje Shri Shyam Sundar
Sevak Tere Bina Adhoore Hain

Jai Shri Shyam Hari
Jai Shri Shyam Hari

Baal Roop Tera Man Moh Leta Hai
Har Mod Par Tu Hi Saath Deta Hai

Jai Shri Shyam Hari
Jai Shri Shyam Hari

Baankhe Bihari Ki Jai Ho
Khatu Nath Ki Jai Ho
Shri Shyam Sundar Ki Jai Ho

Jai Shri Shyam Hari
Jai Shri Shyam Hari

Sharan Mein Aaye Hain Shri Shyam Sundar
Ab To Kar Do Kripa Hum Par Hari

Jai Shri Shyam Hari
Jai Shri Shyam Hari`,
    description: "खाटू श्याम सुंदर आरती बाबा श्याम की स्तुति करती है.",
    descriptionHindi: "खाटू श्याम सुंदर आरती बाबा श्याम की स्तुति करती है।",
    descriptionHinglish: "Khatu Shyam Sundar Aarti Baba Shyam ki stuti karti hai.",
  },
  {
    id: "14",
    slug: "saraswati-aarti",
    title: "Saraswati Aarti",
    titleMarathi: "सरस्वती आरती",
    titleHindi: "सरस्वती आरती",
    titleHinglish: "Saraswati Aarti",
    category: "devi",
    categoryMarathi: "देवी आरती",
    categoryHindi: "देवी आरती",
    categoryHinglish: "Devi Aarti",
    lyrics: `जय सरस्वती माता
जय सरस्वती माता

सफल सिद्ध हो जाता
बुद्धि का दीप जलाता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

वीणा वादिनी ज्ञान की दाता
सुख का वरदान देती माता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

विद्या देती ज्ञान देती
हर दुःख का नाश करती माता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

श्वेत वस्त्र धारिणी श्वेत माता
सरस्वती वीणा वादिनी ज्ञान दाता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता`,
    lyricsHindi: `जय सरस्वती माता
जय सरस्वती माता

सफल सिद्ध हो जाता
बुद्धि का दीप जलाता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

वीणा वादिनी ज्ञान की दाता
सुख का वरदान देती माता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

विद्या देती ज्ञान देती
हर दुःख का नाश करती माता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता

श्वेत वस्त्र धारिणी श्वेत माता
सरस्वती वीणा वादिनी ज्ञान दाता
जय सरस्वती माता

जय सरस्वती माता
जय सरस्वती माता`,
    lyricsHinglish: `Jai Saraswati Mata
Jai Saraswati Mata

Saphal Siddh Ho Jata
Buddhi Ka Deep Jalata
Jai Saraswati Mata

Jai Saraswati Mata
Jai Saraswati Mata

Veena Vadini Gyan Ki Data
Sukh Ka Vardaan Deti Mata
Jai Saraswati Mata

Jai Saraswati Mata
Jai Saraswati Mata

Vidya Deti Gyan Deti
Har Dukh Ka Nash Karti Mata
Jai Saraswati Mata

Jai Saraswati Mata
Jai Saraswati Mata

Shwet Vastra Dharini Shwet Mata
Saraswati Veena Vadini Gyan Data
Jai Saraswati Mata

Jai Saraswati Mata
Jai Saraswati Mata`,
    description: "सरस्वती आरती माँ सरस्वती की स्तुति करती है.",
    descriptionHindi: "सरस्वती आरती माँ सरस्वती की स्तुति करती है।",
    descriptionHinglish: "Saraswati Aarti Maa Saraswati ki stuti karti hai.",
  },
  {
    id: "15",
    slug: "lakshmi-aarti",
    title: "Lakshmi Aarti",
    titleMarathi: "लक्ष्मी आरती",
    titleHindi: "लक्ष्मी आरती",
    titleHinglish: "Lakshmi Aarti",
    category: "devi",
    categoryMarathi: "देवी आरती",
    categoryHindi: "देवी आरती",
    categoryHinglish: "Devi Aarti",
    lyrics: `जय लक्ष्मी माता
जय लक्ष्मी माता

तुमको निशिदिन सेवत
हर विष्य फल पाता
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

चंदन सुगंध फुलबन महके
सेवत नारिन नैन तुम्हारे
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

सुर्य चंद्रमा दीप जलत हैं
अर्धं देव फल चढ़त हैं
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

दीन दयाल बुद्धि दिन दाता
संकट हरण मंगल दाता
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता`,
    lyricsHindi: `जय लक्ष्मी माता
जय लक्ष्मी माता

तुमको निशिदिन सेवत
हर विष्य फल पाता
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

चंदन सुगंध फुलबन महके
सेवत नारिन नैन तुम्हारे
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

सुर्य चंद्रमा दीप जलत हैं
अर्धं देव फल चढ़त हैं
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता

दीन दयाल बुद्धि दिन दाता
संकट हरण मंगल दाता
जय लक्ष्मी माता

जय लक्ष्मी माता
जय लक्ष्मी माता`,
    lyricsHinglish: `Jai Lakshmi Mata
Jai Lakshmi Mata

Tumko Nishidin Sevat
Har Vishya Fal Pata
Jai Lakshmi Mata

Jai Lakshmi Mata
Jai Lakshmi Mata

Chandan Sugandh Phulban Mahke
Sevat Narin Nain Tumhare
Jai Lakshmi Mata

Jai Lakshmi Mata
Jai Lakshmi Mata

Surya Chandrama Deep Jalte Hain
Ardh Dev Phal Chadhte Hain
Jai Lakshmi Mata

Jai Lakshmi Mata
Jai Lakshmi Mata

Deen Dayal Buddhi Din Data
Sankat Haran Mangal Data
Jai Lakshmi Mata

Jai Lakshmi Mata
Jai Lakshmi Mata`,
    description: "लक्ष्मी आरती माँ लक्ष्मी की स्तुति करती है.",
    descriptionHindi: "लक्ष्मी आरती माँ लक्ष्मी की स्तुति करती है।",
    descriptionHinglish: "Lakshmi Aarti Maa Lakshmi ki stuti karti hai.",
  },
  {
    id: "16",
    slug: "satyanarayan-aarti",
    title: "Satyanarayan Aarti",
    titleMarathi: "सत्यनारायण आरती",
    titleHindi: "सत्यनारायण आरती",
    titleHinglish: "Satyanarayan Aarti",
    category: "vishnu",
    categoryMarathi: "विष्णू आरती",
    categoryHindi: "विष्णु आरती",
    categoryHinglish: "Vishnu Aarti",
    lyrics: `आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

तुलसी दल चढ़े विष्णु भगवान को
श्री फल का भोग लगे प्रेम से मन को
आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

चंदन का टीका लगे श्री फल चढ़े
केले फल का भोग लगे श्री फल चढ़े
आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए`,
    lyricsHindi: `आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

तुलसी दल चढ़े विष्णु भगवान को
श्री फल का भोग लगे प्रेम से मन को
आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

चंदन का टीका लगे श्री फल चढ़े
केले फल का भोग लगे श्री फल चढ़े
आरती सत्यनारायण देव की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए`,
    lyricsHinglish: `Aarti Satyanarayan Dev Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Aarti Satyanarayan Dev Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Tulsi Dal Chadhe Vishnu Bhagwan Ko
Shri Fal Ka Bhog Lage Prem Se Man Ko
Aarti Satyanarayan Dev Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Chandan Ka Tika Lage Shri Fal Chadhe
Kele Fal Ka Bhog Lage Shri Fal Chadhe
Aarti Satyanarayan Dev Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye`,
    description: "सत्यनारायण आरती भगवान सत्यनारायण की स्तुति करती है.",
    descriptionHindi: "सत्यनारायण आरती भगवान सत्यनारायण की स्तुति करती है।",
    descriptionHinglish: "Satyanarayan Aarti Bhagwan Satyanarayan ki stuti karti hai.",
  },
  {
    id: "17",
    slug: "ambe-mata-aarti",
    title: "Ambe Mata Aarti",
    titleMarathi: "अंबे माता आरती",
    titleHindi: "अंबे माता आरती",
    titleHinglish: "Ambe Mata Aarti",
    category: "devi",
    categoryMarathi: "देवी आरती",
    categoryHindi: "देवी आरती",
    categoryHinglish: "Devi Aarti",
    lyrics: `जय अंबे माता
जय अंबे माता

शंख चक्र गदा धारी
पद्म सिंहासन विराजित राजी
जय अंबे माता

जय अंबे माता
जय अंबे माता

स्वर्ण थार रत्न जड़ित
सिंह पर सवारी आरती उतारे
जय अंबे माता

जय अंबे माता
जय अंबे माता

श्वेत चंदन सिंदूर चढ़ावे
फूल चढ़ावे भक्ति से सजावे
जय अंबे माता

जय अंबे माता
जय अंबे माता

देवी दुर्गा नाम तेरा
दुष्ट दलन माँ तेरा
जय अंबे माता

जय अंबे माता
जय अंबे माता`,
    lyricsHindi: `जय अंबे माता
जय अंबे माता

शंख चक्र गदा धारी
पद्म सिंहासन विराजित राजी
जय अंबे माता

जय अंबे माता
जय अंबे माता

स्वर्ण थार रत्न जड़ित
सिंह पर सवारी आरती उतारे
जय अंबे माता

जय अंबे माता
जय अंबे माता

श्वेत चंदन सिंदूर चढ़ावे
फूल चढ़ावे भक्ति से सजावे
जय अंबे माता

जय अंबे माता
जय अंबे माता

देवी दुर्गा नाम तेरा
दुष्ट दलन माँ तेरा
जय अंबे माता

जय अंबे माता
जय अंबे माता`,
    lyricsHinglish: `Jai Ambe Mata
Jai Ambe Mata

Shankh Chakra Gada Dhaari
Padma Singhasan Virajit Raji
Jai Ambe Mata

Jai Ambe Mata
Jai Ambe Mata

Swarna Thar Ratna Jadiit
Singh Par Sawari Aarti Utare
Jai Ambe Mata

Jai Ambe Mata
Jai Ambe Mata

Shwet Chandan Sindoor Chadhave
Phool Chadhave Bhakti Se Sajave
Jai Ambe Mata

Jai Ambe Mata
Jai Ambe Mata

Devi Durga Naam Tera
Dusht Dalan Maa Tera
Jai Ambe Mata

Jai Ambe Mata
Jai Ambe Mata`,
    description: "अंबे माता आरती माँ दुर्गा की स्तुति करती है.",
    descriptionHindi: "अंबे माता आरती माँ दुर्गा की स्तुति करती है।",
    descriptionHinglish: "Ambe Mata Aarti Maa Durga ki stuti karti hai.",
  },
  {
    id: "18",
    slug: "kunj-bihari-aarti",
    title: "Kunj Bihari Aarti",
    titleMarathi: "कुंज बिहारी आरती",
    titleHindi: "कुंज बिहारी आरती",
    titleHinglish: "Kunj Bihari Aarti",
    category: "krishna",
    categoryMarathi: "कृष्ण आरती",
    categoryHindi: "कृष्ण आरती",
    categoryHinglish: "Krishna Aarti",
    lyrics: `आरती कुंज बिहारी की
राधा रमण वर विहारी की
स्वामी के मन भावे
सेवक तेरे बिना अधूरे

आरती कुंज बिहारी की
राधा रमण वर विहारी की

श्याम श्याम श्याम स्वामी
बंशी बजावे गोपियां नाचे
आरती कुंज बिहारी की
राधा रमण वर विहारी की

नंद के लाल यशोदा के लाल
गोपियों के स्वामी नंद किशोर
आरती कुंज बिहारी की
राधा रमण वर विहारी की

मोर मुकुट मुख चंद्र सा
हरिद्रा चंदन शरीर सजे
आरती कुंज बिहारी की
राधा रमण वर विहारी की`,
    lyricsHindi: `आरती कुंज बिहारी की
राधा रमण वर विहारी की
स्वामी के मन भावे
सेवक तेरे बिना अधूरे

आरती कुंज बिहारी की
राधा रमण वर विहारी की

श्याम श्याम श्याम स्वामी
बंशी बजावे गोपियां नाचे
आरती कुंज बिहारी की
राधा रमण वर विहारी की

नंद के लाल यशोदा के लाल
गोपियों के स्वामी नंद किशोर
आरती कुंज बिहारी की
राधा रमण वर विहारी की

मोर मुकुट मुख चंद्र सा
हरिद्रा चंदन शरीर सजे
आरती कुंज बिहारी की
राधा रमण वर विहारी की`,
    lyricsHinglish: `Aarti Kunj Bihari Ki
Radha Raman Var Vihari Ki
Swami Ke Man Bhave
Sevak Tere Bina Adhoore

Aarti Kunj Bihari Ki
Radha Raman Var Vihari Ki

Shyam Shyam Shyam Swami
Bansi Bajave Gopiyan Naache
Aarti Kunj Bihari Ki
Radha Raman Var Vihari Ki

Nand Ke Laal Yashoda Ke Laal
Gopiyon Ke Swami Nand Kishor
Aarti Kunj Bihari Ki
Radha Raman Var Vihari Ki

Mor Mukut Mukh Chandra Sa
Haridra Chandan Sharir Saje
Aarti Kunj Bihari Ki
Radha Raman Var Vihari Ki`,
    description: "कुंज बिहारी आरती भगवान कृष्ण की स्तुति करती है.",
    descriptionHindi: "कुंज बिहारी आरती भगवान कृष्ण की स्तुति करती है।",
    descriptionHinglish: "Kunj Bihari Aarti Bhagwan Krishna ki stuti karti hai.",
  },
  {
    id: "19",
    slug: "santoshi-mata-aarti",
    title: "Santoshi Mata Aarti",
    titleMarathi: "संतोषी माता आरती",
    titleHindi: "संतोषी माता आरती",
    titleHinglish: "Santoshi Mata Aarti",
    category: "devi",
    categoryMarathi: "देवी आरती",
    categoryHindi: "देवी आरती",
    categoryHinglish: "Devi Aarti",
    lyrics: `जय संतोषी माता
जय संतोषी माता

सिंह पर सवार पद्मासीन देवी
शंख चक्र गदा धारी
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

सेवक तेरे बिना अधूरे हैं
हर कष्ट से मुक्त करो माता
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

धूप दीप फल मेवा चढ़ावे
संतोषी हमें दर्शन दे माता
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

जो नर संतोषी माता का गुण गाए
संतोषी माता उसका कल्याण करे
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता`,
    lyricsHindi: `जय संतोषी माता
जय संतोषी माता

सिंह पर सवार पद्मासीन देवी
शंख चक्र गदा धारी
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

सेवक तेरे बिना अधूरे हैं
हर कष्ट से मुक्त करो माता
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

धूप दीप फल मेवा चढ़ावे
संतोषी हमें दर्शन दे माता
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता

जो नर संतोषी माता का गुण गाए
संतोषी माता उसका कल्याण करे
जय संतोषी माता

जय संतोषी माता
जय संतोषी माता`,
    lyricsHinglish: `Jai Santoshi Mata
Jai Santoshi Mata

Singh Par Sawar Padmasin Devi
Shankh Chakra Gada Dhaari
Jai Santoshi Mata

Jai Santoshi Mata
Jai Santoshi Mata

Sevak Tere Bina Adhoore Hain
Har Kasht Se Mukto Karo Mata
Jai Santoshi Mata

Jai Santoshi Mata
Jai Santoshi Mata

Dhoop Deep Phal Mewa Chadhave
Santoshi Hume Darshan De Mata
Jai Santoshi Mata

Jai Santoshi Mata
Jai Santoshi Mata

Jo Nar Santoshi Mata Ka Gun Gaaye
Santoshi Mata Uska Kalyan Kare
Jai Santoshi Mata

Jai Santoshi Mata
Jai Santoshi Mata`,
    description: "संतोषी माता आरती माँ संतोषी की स्तुति करती है.",
    descriptionHindi: "संतोषी माता आरती माँ संतोषी की स्तुति करती है।",
    descriptionHinglish: "Santoshi Mata Aarti Maa Santoshi ki stuti karti hai.",
  },
  {
    id: "20",
    slug: "ramchandra-aarti",
    title: "Ramchandra Aarti",
    titleMarathi: "रामचंद्र आरती",
    titleHindi: "रामचंद्र आरती",
    titleHinglish: "Ramchandra Aarti",
    category: "ram",
    categoryMarathi: "राम आरती",
    categoryHindi: "राम आरती",
    categoryHinglish: "Ram Aarti",
    lyrics: `आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

जनकपुर में सीता के साथ
वन में वन में वन में वन में
रामचंद्र प्रभु की जय हो
आरती श्री रामचंद्र की

जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

रावण का वध किया प्रभु ने
अहिल्या का उद्धार किया
आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

सीता राम सीता राम
सीता राम सीता राम
आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए`,
    lyricsHindi: `आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

जनकपुर में सीता के साथ
वन में वन में वन में वन में
रामचंद्र प्रभु की जय हो
आरती श्री रामचंद्र की

जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

रावण का वध किया प्रभु ने
अहिल्या का उद्धार किया
आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए

सीता राम सीता राम
सीता राम सीता राम
आरती श्री रामचंद्र की
जो कोई नर गाए
सुख संपत्ति मिल जाए
सब कष्ट मिट जाए`,
    lyricsHinglish: `Aarti Shri Ramchandra Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Aarti Shri Ramchandra Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Janakpur Mein Sita Ke Saath
Van Mein Van Mein Van Mein Van Mein
Ramchandra Prabhu Ki Jai Ho
Aarti Shri Ramchandra Ki

Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Raavan Ka Vadh Kiya Prabhu Ne
Ahilya Ka Uddhar Kiya
Aarti Shri Ramchandra Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye

Sita Ram Sita Ram
Sita Ram Sita Ram
Aarti Shri Ramchandra Ki
Jo Koi Nar Gaaye
Sukh Sampatti Mil Jaaye
Sab Kasht Mit Jaaye`,
    description: "रामचंद्र आरती भगवान श्री राम की स्तुति करती है.",
    descriptionHindi: "रामचंद्र आरती भगवान श्री राम की स्तुति करती है।",
    descriptionHinglish: "Ramchandra Aarti Bhagwan Shri Ram ki stuti karti hai.",
  },
];
