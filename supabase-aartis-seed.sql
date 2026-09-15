-- Ganpati Mandal - Complete Aarti Seed Data (50 aartis)
-- Run this ENTIRE file in Supabase SQL Editor

DROP TABLE IF EXISTS aartis CASCADE;

CREATE TABLE IF NOT EXISTS aartis (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_devanagari TEXT NOT NULL,
  deity TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  type TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  transliteration TEXT,
  description TEXT,
  source TEXT NOT NULL,
  source_url TEXT,
  content_status TEXT NOT NULL DEFAULT 'needs_verification',
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE aartis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published aartis" ON aartis
  FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admin full access on aartis" ON aartis
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

ALTER TABLE schedule_events ADD COLUMN IF NOT EXISTS time_end TIME;

INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sukhkarta-dukhharta', 'Sukhkarta Dukhharta', 'सुखकर्ता दुःखहर्ता', 'Ganpati', 'ganpati', 'marathi', 'aarti', 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची।
नुरवी पुरवी प्रेम कृपा जयाची।
सर्वांगी सुन्दर उटि शेंदुराची।
कण्ठी झळके माळ मुक्ताफळांची॥

जय देव जय देव जय मंगलमूर्ति।
दर्शनमात्रे मनकामना पुरती॥

रत्नखचित फरा तुज गौरीकुमरा।
चन्दनाची उटि कुंकुमकेशरा।
हिरे जडित मुकुट शोभतो बरा।
रुणझुणती नूपुरे चरणी घागरिया॥

जय देव जय देव जय मंगलमूर्ति।
दर्शनमात्रे मनकामना पुरती॥

लम्बोदर पीताम्बर फणिवर बन्धना।
सरळ सोण्ड वक्रतुण्ड त्रिनयना।
दास रामाचा वाट पाहे सदना।
संकटी पावावे निर्वाणी रक्षावे सुरवरवन्दना॥

जय देव जय देव जय मंगलमूर्ति।
दर्शनमात्रे मनकामना पुरती॥', NULL, 'Most popular Ganpati Aarti from Maharashtra', 'Traditional', NULL, 'verified', true, true, 1) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('jay-ganesh-jay-ganesh-deva', 'Jay Ganesh Jay Ganesh Deva', 'जय गणेश जय गणेश देवा', 'Ganpati', 'ganpati', 'hindi', 'aarti', 'जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

एक दंत दयावंत चार भुजा धारी।
माथे सिंदूर सोहे मूसे की सवारी॥

जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

पान चढ़े फल चढ़े और चढ़े मेवा।
लड्डुअन का भोग लगे संत करें सेवा॥

जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

अंधन को आँख देत कोढ़िन को काया।
बांझन को पुत्र देत निर्धन को माया॥

जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

सूर श्याम शरण आए सफल कीजे सेवा।
माता जाकी पार्वती पिता महादेवा॥

जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥', NULL, 'Popular Hindi Ganpati Aarti', 'Traditional', NULL, 'verified', true, true, 2) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('durga-durgat-bhari', 'Durga Durgat Bhari', 'दुर्गे दुर्घट भारी', 'Durga', 'devi', 'marathi', 'aarti', 'दुर्गे दुर्घट भारी तुजविण संसारी।
अनाथ नाथे अम्बे करुणा विस्तारी।
वारी वारी जन्म मरणांते वारी।
हारी पडलो आता संकट निवारी॥

जय देवी जय देवी महिषासुरमथिनी।
सुरवर ईश्वर वरदे तारक संजीवनी॥

त्रिभुवन-भुवनी पाहता तुज ऐसी नाही।
चारी श्रमले परन्तु न बोलवे काही।
साही विवाद करिता पडले प्रवाही।
ते तू भक्तालागी पावसि लवलाही॥

जय देवी जय देवी महिषासुरमथिनी।
सुरवर ईश्वर वरदे तारक संजीवनी॥

प्रसन्न वदने प्रसन्न होसी निजदासा।
क्लेशांपासुनि सोडवि तोडी भवपाशा।
अम्बे तुजवाचून कोण पुरविल आशा।
नरहरी तल्लिन झाला पदपंकजलेशा॥

जय देवी जय देवी महिषासुरमथिनी।
सुरवर ईश्वर वरदे तारक संजीवनी॥', NULL, 'Popular Marathi Durga Aarti', 'Traditional', NULL, 'verified', true, true, 3) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('yei-ho-vitthale', 'Yei Ho Vitthale Maje Mauli Ye', 'येई हो विठ्ठले माझे माऊली ये', 'Vitthal', 'vitthal', 'marathi', 'aarti', 'येई हो विठ्ठले माझे माऊली ये॥
निढळावरी कर ठेऊनी वाट मी पाहे॥ धृ.॥

आलिया गेलिया हातीं धाडी निरोप।
पंढरपुरी आहे माझा मायबाप॥ १॥

येई हो विठ्ठले माझे माऊली ये॥

पिंवळा पीतांबर कैसा गगनी झळकला।
गरुडावरी बैसून माझा कैवारी आला॥ २॥

येई हो विठ्ठले माझे माऊली ये॥

विठोबाचे राज आम्हां नित्य दिपवाळी।
विष्णुदास नामा जीवेंभावे ओंवाळी॥ ३॥

येई हो विठ्ठले माझे माऊली ये॥

असो नसो भाव आम्हां तुझिया ठायां।
कृपादृष्टी पाहें माझ्या पंढरीराया॥ ४॥

येई हो विठ्ठले माझे माऊली ये॥', NULL, 'Popular Vitthal/Pandurang Aarti from Warkari tradition', 'Traditional', NULL, 'verified', true, true, 4) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('om-jai-shiv-omkara', 'Om Jai Shiv Omkara', 'ॐ जय शिव ओंकारा', 'Shiva', 'shiva', 'hindi', 'aarti', 'कर के मध्य कमण्डलुचक्र त्रिशूलधारी।
सुखकारी दुखहारी जगपालन कारी॥

ॐ जय शिव ओंकारा॥

ब्रह्मा विष्णु सदाशिव जानत अविवेका।
प्रणवाक्षर मध्येये तीनों एका॥

ॐ जय शिव ओंकारा॥

लक्ष्मी व सावित्री पार्वती संगा।
पार्वती अर्द्धांगी, शिवलहरी गंगा॥

ॐ जय शिव ओंकारा॥

पर्वत सोहैं पार्वती, शंकर कैलासा।
भांग धतूर का भोजन, भस्मी में वासा॥

ॐ जय शिव ओंकारा॥

जटा में गंगा बहत है, गल मुण्डन माला।
शेष नाग लिपटावत, ओढ़त मृगछाला॥

ॐ जय शिव ओंकारा॥

काशी में विराजे विश्वनाथ, नन्दी ब्रह्मचारी।
नित उठ दर्शन पावत, महिमा अति भारी॥

ॐ जय शिव ओंकारा॥

त्रिगुणस्वामी जी की आरती जो कोइ नर गावे।
कहत शिवानन्द स्वामी, मनवान्छित फल पावे॥

ॐ जय शिव ओंकारा॥', NULL, 'Most popular Shiv Aarti', 'Traditional', NULL, 'verified', true, true, 5) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('aarti-kijai-hanuman-lala-ki', 'Aarti Kijai Hanuman Lala Ki', 'आरती कीजै हनुमान लला की', 'Hanuman', 'hanuman', 'hindi', 'aarti', 'आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥

अंजनि पुत्र महाबलदाई।
संतन के प्रभु सदा सहाई॥

दे बीरा रघुनाथ पठाए।
लंका जारि सिया सुधि लाए॥

लंका सो कोट समुद्र-सी खाई।
जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे।
सियारामजी के काज सँवारे॥

लक्ष्मण मूर्छित पड़े सकारे।
आनि संजीवन प्राण उबारे॥

पैठि पाताल तोरि जम-कारे।
अहिरावण की भुजा उखारे॥

बाएँ भुजा असुरदल मारे।
दाएँ भुजा संतजन तारे॥

सुर-नर-मुनि जन आरती उतारें।
जय जय जय हनुमान उचारें॥

कंचन थार कपूर लौ छाई।
आरती करत अंजना माई॥

जो हनुमानजी की आरती गावे।
बसि बैकुण्ठ परम पद पावे॥', NULL, 'Most popular Hanuman Aarti', 'Traditional', NULL, 'verified', true, true, 6) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('om-jai-jagdish-hare', 'Om Jai Jagdish Hare', 'ॐ जय जगदीश हरे', 'Vishnu', 'vishnu', 'hindi', 'aarti', 'ॐ जय जगदीश हरे।
स्वामी जय जगदीश हरे।
भक्त जनों के संकट,
दास जनों के संकट, क्षण में दूर करे॥

ॐ जय जगदीश हरे॥

जो ध्यावे फल पावे, दुःख बिनसे मन का।
सुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥

ॐ जय जगदीश हरे॥

मात-पिता तुम मेरे, शरण गहूँ मैं किसकी।
तुम बिन और न दूजा, आस करूँ मैं जिसकी॥

ॐ जय जगदीश हरे॥

तुम पूर्ण परमात्मा, तुम अन्तर्यामी।
पारब्रह्म परमेश्वर, तुम सबके स्वामी॥

ॐ जय जगदीश हरे॥

तुम करुणा के सागर, तुम पालनकर्ता।
मैं मूरख खल कामी, कृपा करो भर्ता॥

ॐ जय जगदीश हरे॥

तुम हो एक अगोचर, सबके प्राणपति।
किस विधि मिलूँ दयामय, तुमको मैं कुमति॥

ॐ जय जगदीश हरे॥

दीनबन्धु दुःखहर्ता, ठाकुर तुम मेरे।
अपने हाथ उठाओ, द्वार पड़ा तेरे॥

ॐ जय जगदीश हरे॥

विषय विकार मिटाओ, पाप हरो देवा।
श्रद्धा भक्ति बढ़ाओ, संतन की सेवा॥

ॐ जय जगदीश हरे॥', NULL, 'Most popular Vishnu/Hari Aarti', 'Traditional', NULL, 'verified', true, true, 7) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('om-jai-ambe-gauri', 'Om Jai Ambe Gauri', 'ॐ जय अम्बे गौरी', 'Ambe Gauri', 'devi', 'hindi', 'aarti', 'ॐ जय अम्बे गौरी, मैया जय श्यामा गौरी।
तुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥

ॐ जय अम्बे गौरी॥

माँग सिंदूर विराजत, टीको मृगमद को।
उज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥

ॐ जय अम्बे गौरी॥

कनक समान कलेवर, रक्ताम्बर राजै।
रक्तपुष्प गल माला, कण्ठन पर साजै॥

ॐ जय अम्बे गौरी॥

केहरि वाहन राजत, खड्ग कृपाण धारी।
सुर-नर-मुनिजन सेवत, तिनके दुःखहारी॥

ॐ जय अम्बे गौरी॥

कानन कुण्डल शोभित, नासाग्रे मोती।
कोटिक चन्द्र दिवाकर, राजत सम ज्योती॥

ॐ जय अम्बे गौरी॥

शुम्भ निशुम्भ बिदारे, महिषासुर घाती।
धूम्र विलोचन नैना, निशदिन मदमाती॥

ॐ जय अम्बे गौरी॥

चण्ड-मुण्ड संहारे, शोणित बीज हरे।
मधु कैटभ दोउ मारे, सुर भयहीन करे॥

ॐ जय अम्बे गौरी॥

ब्रह्माणी रुद्राणी, तुम कमला रानी।
आगम निगम बखानी, तुम शिव पटरानी॥

ॐ जय अम्बे गौरी॥', NULL, 'Popular Ambe Gauri/Parvati Aarti', 'Traditional', NULL, 'verified', true, true, 8) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('om-jai-lakshmi-mata', 'Om Jai Lakshmi Mata', 'ॐ जय लक्ष्मी माता', 'Lakshmi', 'devi', 'hindi', 'aarti', 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशदिन सेवत, हरि विष्णु विधाता॥

ॐ जय लक्ष्मी माता॥

उमा, रमा, ब्रह्माणी, तुम ही जग माता।
सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥

ॐ जय लक्ष्मी माता॥

दुर्गा रूप निरंजनी, सुख सम्पत्ति दाता।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥

ॐ जय लक्ष्मी माता॥

तुम पाताल निवासिनी, तुम ही शुभदाता।
कर्म-प्रभाव प्रकाशिनी, भवनिधि की त्राता॥

ॐ जय लक्ष्मी माता॥

जिस घर तुम रहतीं, सब सद्गुण आता।
सब सम्भव हो जाता, मन नहीं घबराता॥

ॐ जय लक्ष्मी माता॥

तुम बिन यज्ञ न होते, वस्त्र न कोई पाता।
खान-पान का वैभव, तुमसे ही आता॥

ॐ जय लक्ष्मी माता॥

शुभ गुण मन्दिर सुन्दर, क्षीरोदधि जाता।
रत्न चतुर्दश तुम बिन, कोई नहीं पाता॥

ॐ जय लक्ष्मी माता॥

धूप दीप फल मेवा, माता स्वीकार करो।
ज्ञान प्रकाश करो माता, त्रिविध ताप हरो॥

ॐ जय लक्ष्मी माता॥', NULL, 'Most popular Lakshmi Aarti', 'Traditional', NULL, 'verified', true, true, 9) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-ramchandra-kripalu', 'Sri Ramchandra Kripalu Bhaju Man', 'श्री रामचन्द्र कृपालु भजु मन', 'Rama', 'ram', 'sanskrit', 'aarti', 'श्री रामचन्द्र कृपालु भजु मन, हरण भवभय दारुणम्।
नव कंज लोचन, कंज मुख, कर कंज, पद कंजारुणम्॥

कंदर्प अगणित अमित छवि, नव नील नीरद सुन्दरम्।
पटपीत मानहुँ तड़ित रुचि शुचि, नौमि जनक सुतावरम्॥

भजु दीनबन्धु दिनेश दानव, दैत्यवंश निकन्दनम्।
रघुनन्द आनंदकन्द, कौशलचन्द दशरथ नन्दनम्॥

सिर मुकुट कुण्डल तिलक चारु, उदारु अंग विभूषणम्।
आजानुभुज शर चाप धर, संग्राम जित खरदूषणम्॥

इति वदति तुलसीदास, शंकर-शेष-मुनि-मन-रंजनम्।
मम हृदय कंज निवास कुरु, कामादि खलदल गंजनम्॥

मनु जाहिं राचेउ मिलिहि सो बरु, सहज सुन्दर साँवरो।
करुणानिधान सुजान सीलु, सनेहु जानत रावरो॥

एहि भाँति गौरी असीस सुनि, सिय सहित हियँ हरषीं अली।
तुलसी भवानिहि पूजि पुनि पुनि, मुदित मन मंदिर चली॥', NULL, 'Famous Ram Aarti by Tulsidas', 'Tulsidas', NULL, 'verified', true, true, 10) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganpati-ki-seva-mangal-meva', 'Ganpati Ki Seva Mangal Meva', 'गणपति की सेवा मंगल मेवा', 'Ganpati', 'ganpati', 'hindi', 'aarti', 'गणपति की सेवा मंगल मेवा।
सेवा से सब विघ्न टरें, तीन लोक के देवा॥

धूप दीप नैवेद्य आरती, पूजन करैं गणेशा।
सुमिरन करैं जो तुम्हरो, ताको मिले हमेशा॥

गणपति की सेवा मंगल मेवा।
सेवा से सब विघ्न टरें, तीन लोक के देवा॥

लड्डुअन का भोग लगावैं, मोदक अति मनभावन।
भक्त जनों की आस पुरावैं, विघ्न विनाशन पावन॥

गणपति की सेवा मंगल मेवा।
सेवा से सब विघ्न टरें, तीन लोक के देवा॥', NULL, 'Ganpati Seva Aarti', 'Traditional', NULL, 'needs_verification', false, true, 11) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('aarti-gajbadan-vinayak-ki', 'Aarti Gajbadan Vinayak Ki', 'आरती गजबदन विनायक की', 'Ganpati', 'ganpati', 'hindi', 'aarti', 'आरती गजबदन विनायक की।
सुर मुनि पूजत चरण नायक की॥

एकदंत गजवदन विराजत।
कर में मोदक सदा सुहाजत॥

जय जय जय गणराज गणपति।
मंगल मूर्ति विघ्न विनाशक॥', NULL, 'Short Ganpati Aarti', 'Traditional', NULL, 'needs_verification', false, true, 12) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('shendur-lal-chadhayo', 'Shendur Lal Chadhayo', 'शेंदूर लाल चढायो', 'Ganpati', 'ganpati', 'hindi', 'aarti', 'शेंदूर लाल चढायो अच्छा गजमुखको।
दोंदिल लाल बिराजे सुत गौरिहरको॥

हाथ लिये गुडलड्डु साईं सुरवरको।
महिमा कहे न जाय लागत हूँ पायको॥

जय देव जय देव जय मंगलमूर्ति।
दर्शनमात्रे मनकामना पुरती॥

अष्टौ सिद्धि दासी संकटको बैरी।
विघ्नविनाशन मंगल मूरत अधिकारी॥

जय देव जय देव जय मंगलमूर्ति।
दर्शनमात्रे मनकामना पुरती॥', NULL, 'Popular Ganpati Aarti', 'Traditional', NULL, 'needs_verification', false, true, 13) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ghalin-lotangan', 'Ghalin Lotangan', 'घालीन लोटांगण', 'Ganpati', 'ganpati', 'marathi', 'aarti', 'घालीन लोटांगण वंदीन चरण।
डोळ्यांनी पाहीन रूप तुझे॥
प्रेमें आलिंगीन आनंदे पूजीन।
भावे ओवाळीन म्हणे नामा॥

त्वमेव माता च पिता त्वमेव।
त्वमेव बंधुश्च सखा त्वमेव।
त्वमेव विद्या द्रविणं त्वमेव।
त्वमेव सर्वं मम देव देव॥

कायेन वाचा मनसेंद्रियैर्वा।
बुद्ध्यात्मना वा प्रकृतेः स्वभावात्।
करोमि यद्यत् सकलं परस्मै।
नारायणायेति समर्पयामि॥

अच्युतं केशवं रामनारायणम्।
कृष्णदामोदरं वासुदेवं हरिम्।
श्रीधरं माधवं गोपिकावल्लभम्।
जानकीनायकं रामचंद्रं भजे॥', NULL, 'Traditional Ganpati Aarti with Vedic mantras', 'Traditional', NULL, 'needs_verification', false, true, 14) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('mantra-pushpanjali', 'Mantra Pushpanjali', 'मंत्र पुष्पांजली', 'Multi', 'other', 'sanskrit', 'prayer', 'ॐ यज्ञेन यज्ञमयजन्त देवास्तानि धर्माणि प्रथमान्यासन्।
ते ह नाकं महिमानः सचन्त यत्र पूर्वे साध्याः सन्ति देवाः॥

ॐ राजाधिराजाय प्रसह्यसाहिने।
नमो वयं वैश्रवणाय कुर्महे।
स मे कामान् कामकामाय मह्यं।
कामेश्वरो वैश्रवणो ददातु॥

कुबेराय वैश्रवणाय महाराजाय नमः॥

ॐ स्वस्ति।
साम्राज्यं भौज्यं स्वाराज्यं वैराज्यं।
पारमेष्ठ्यं राज्यं महाराज्यमाधिपत्यमयं॥', NULL, 'Vedic Mantra Pushpanjali for worship', 'Vedas', NULL, 'needs_verification', false, true, 15) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('jayati-mangalagar', 'Jayati Mangalagar', 'जयति मंगलागार', 'Rama', 'ram', 'hindi', 'aarti', 'जयति मंगलागार, संसार भारापहार।
दशरथ राजकुमार, रघुकुल तिलक॥

जय जय श्रीराम॥

दीनदयाल दयासागर, भक्तन हितकारी।
संकट मोचन नाम तुम्हारा, शरण पड़े संसारी॥

जय जय श्रीराम॥', NULL, 'Short Ram Aarti', 'Traditional', NULL, 'needs_verification', false, true, 16) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('om-jai-hanumat-veera', 'Om Jai Hanumat Veera', 'ॐ जय हनुमत वीरा', 'Hanuman', 'hanuman', 'hindi', 'aarti', 'ॐ जय हनुमत वीरा, स्वामी जय हनुमत वीरा।
संकट मोचन स्वामी, भक्तन हितकारी॥

ॐ जय हनुमत वीरा॥

रामदूत बलधामा, अंजनि के लाला।
महाबली महावीरा, तुम जग रखवाला॥

ॐ जय हनुमत वीरा॥

लंका जारि सियासुधि लाए।
राम काज तुम कीन्हे॥

ॐ जय हनुमत वीरा॥', NULL, 'Short Hanuman Aarti', 'Traditional', NULL, 'needs_verification', false, true, 17) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('vishnu-aarti-om-jai-jagdish', 'Vishnu Aarti - Om Jai Jagdish Hare', 'विष्णु आरती', 'Vishnu', 'vishnu', 'hindi', 'aarti', 'ॐ जय जगदीश हरे।
स्वामी जय जगदीश हरे।
भक्त जनों के संकट,
दास जनों के संकट, क्षण में दूर करे॥

जो ध्यावे फल पावे, दुःख बिनसे मन का।
सुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥

मात-पिता तुम मेरे, शरण गहूँ मैं किसकी।
तुम बिन और न दूजा, आस करूँ मैं जिसकी॥

तुम पूर्ण परमात्मा, तुम अन्तर्यामी।
पारब्रह्म परमेश्वर, तुम सबके स्वामी॥', NULL, 'Vishnu Aarti - shorter version', 'Traditional', NULL, 'needs_verification', false, true, 18) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('santoshi-mata-aarti', 'Santoshi Mata Aarti', 'संतोषी माता आरती', 'Santoshi Mata', 'devi', 'hindi', 'aarti', 'जय संतोषी माता, मैया जय संतोषी माता।
अपने सेवक जन की, सुख सम्पत्ति दाता॥

सुंदर चीर सुनहरी, माँ धारण कीन्हो।
हीरा पन्ना जड़ित मुकुट, शीश धर लीन्हो॥

जय संतोषी माता॥

गेरू लाल छटा छबि, बदन कमल सोहे।
मंद हँसत करुणामयी, त्रिभुवन मन मोहे॥

जय संतोषी माता॥

स्वर्ण सिंहासन बैठी, चँवर डुलावे।
धूप दीप नैवेद्य आरती, भक्त चढ़ावे॥

जय संतोषी माता॥', NULL, 'Santoshi Mata Aarti', 'Traditional', NULL, 'needs_verification', false, true, 19) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('satyanarayan-aarti', 'Satyanarayan Aarti', 'सत्यनारायण आरती', 'Satyanarayan', 'vishnu', 'hindi', 'aarti', 'जय लक्ष्मी रमणा, स्वामी जय लक्ष्मी रमणा।
सत्यनारायण स्वामी, जन पातक हरणा॥

जय लक्ष्मी रमणा॥

रत्न जड़ित सिंहासन, अद्भुत छवि राजे।
नारद करत निरंतर, घंटा ध्वनि बाजे॥

जय लक्ष्मी रमणा॥

प्रगट भए कलिकारण, द्विज को दरस दियो।
बूढ़ो ब्राह्मण बनकर, कंचन महल कियो॥

जय लक्ष्मी रमणा॥

दुर्बल भील कठोर, जिन पर कृपा करी।
चंद्रचूड़ एक राजा, तिनकी विपत्ति हरी॥

जय लक्ष्मी रमणा॥', NULL, 'Satyanarayan Puja Aarti', 'Traditional', NULL, 'needs_verification', false, true, 20) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('lavathavati-vikrala-shiv', 'Lavathavati Vikrala', 'लावथवती विक्राळा', 'Shiva', 'shiva', 'marathi', 'aarti', 'लवथवती विक्राळा ब्रह्मांडी माळा।
वीषें कंठ काळा त्रिनेत्रीं ज्वाळा॥

लावण्यसुंदर मस्तकी बाळा।
तेथुनियां जळ निर्मळ वाहे झुळझुळा॥

जय देव जय देव जय श्री शंकरा।
आरती ओवाळूं तुज कर्पूरगौरा॥

कर्पूरगौरा भोळा नयनीं विशाळा।
अर्धांगी पार्वती सुमनांच्या माळा॥

विभुतीचें उधळण शितिकंठ नीळा।
ऐसा शंकर शोभे उमावेल्हाळा॥

जय देव जय देव जय श्री शंकरा।
आरती ओवाळूं तुज कर्पूरगौरा॥

देवीं दैत्यीं सागरमंथन पै केलें।
त्यामाजीं अवचित हळाहळ उठिलें॥

तें त्वां असुरपणें प्राशन केलें।
नीलकंठ नाम प्रसिद्ध झालें॥

जय देव जय देव जय श्री शंकरा।
आरती ओवाळूं तुज कर्पूरगौरा॥

व्याघ्रांबर फणिवरधर सुंदर मदनारी।
पंचानन मनमोहन मुनिजनसुखकारी॥

शतकोटींचें बीज वाचे उच्चारी।
रघुकुळटिळक रामदासा अंतरी॥

जय देव जय देव जय श्री शंकरा।
आरती ओवाळूं तुज कर्पूरगौरा॥', NULL, 'Marathi Shiv Aarti - Karpurgaura', 'Traditional', NULL, 'needs_verification', false, true, 21) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('trigunatmak-trimurti-datta', 'Trigunatmak Trimurti Datta', 'त्रिगुणात्मक त्रैमूर्ती दत्त', 'Dattatreya', 'dattatreya', 'marathi', 'aarti', 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा।
त्रिगुणी अवतार त्रैलोक्यराणा॥

नेति नेति शब्दें न ये अनुमाना।
सुरवर मुनिजन योगी समाधि न ध्याना॥

जय देव जय देव जय श्री गुरुदत्ता।
आरती ओवाळिता हरली भवचिंता॥

सबाह्य अभ्यंतरी तू एक दत्त।
अभाग्यासी कैची कळेल ही मात॥

पराही परतली तेथे कैचा हेत।
जन्ममरणाचा पुरलासे अंत॥

जय देव जय देव जय श्री गुरुदत्ता।
आरती ओवाळिता हरली भवचिंता॥

दत्त येऊनिया उभा ठाकला।
सद्भावे साष्टांगे प्रणिपात केला॥

प्रसन्न होऊनि आशीर्वाद दिधला।
जन्ममरणाचा फेरा चुकविला॥

जय देव जय देव जय श्री गुरुदत्ता।
आरती ओवाळिता हरली भवचिंता॥', NULL, 'Marathi Dattatreya Aarti', 'Traditional', NULL, 'needs_verification', false, true, 22) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ovalu-aarti-madan-gopala', 'Ovalu Aarti Madan Gopala', 'ओवाळू आरती मदनगोपाळा', 'Krishna', 'krishna', 'marathi', 'aarti', 'ओवाळू आरती मदनगोपाळा।
श्यामसुंदर गळां वैजयंतीमाळा॥

चरणकमळीं नूपुर वाजती रुणझुणा।
कटितटि पीतांबर शोभे नारायणा॥

ओवाळू आरती मदनगोपाळा॥

मोरमुकुट माथां कुंडले श्रवणी।
मुखकमळीं मुरली विराजे करणी॥

ओवाळू आरती मदनगोपाळा॥

गोपीजनवल्लभ नंदाचा बाळा।
यशोदेच्या अंगणी खेळे गोपाळा॥

ओवाळू आरती मदनगोपाळा॥', NULL, 'Marathi Krishna Aarti', 'Traditional', NULL, 'needs_verification', false, true, 23) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-ramachi-aarti', 'Sri Ramachi Aarti', 'श्री रामाची आरती', 'Rama', 'ram', 'marathi', 'aarti', 'त्रिभुवनमंडितमाळ गळां।
आरती ओवाळूं पाहूं ब्रह्मपुतळा॥

श्रीराम जय राम जय जय राम।
आरती ओवाळूं पाहूं सुंदर मेघश्यामा॥

श्रीराम जय राम जय जय राम॥

कौसल्येचा राम, दशरथाचा बाळ।
अयोध्येचा राजा, भक्तांचा प्रतिपाळ॥

श्रीराम जय राम जय जय राम॥

सीताराम लक्ष्मण हनुमंता।
चरणी ठेवितो माथा॥

श्रीराम जय राम जय जय राम॥', NULL, 'Marathi Ram Aarti', 'Traditional', NULL, 'needs_verification', false, true, 24) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ambe-tu-hai-jagdambe-kali', 'Ambe Tu Hai Jagdambe Kali', 'अंबे तू है जगदंबे काली', 'Durga', 'devi', 'hindi', 'aarti', 'अम्बे तू है जगदम्बे काली,
जय दुर्गे खप्पर वाली,
तेरे ही गुण गावें भारती,
ओ मैया हम सब उतारे तेरी आरती।

तेरे भक्त जनो पर माता भीर पड़ी है भारी।
दानव दल पर टूट पडो माँ करके सिंह सवारी॥
सौ-सौ सिहों से बलशाली, है अष्ट भुजाओं वाली,
दुष्टों को तू ही ललकारती।
ओ मैया हम सब उतारे तेरी आरती।

माँ-बेटे का है इस जग मे बडा ही निर्मल नाता।
पूत-कपूत सुने है पर ना माता सुनी कुमाता॥
सब पे करूणा दर्शाने वाली, अमृत बरसाने वाली,
दुखियों के दुखडे निवारती।
ओ मैया हम सब उतारे तेरी आरती।

नहीं मांगते धन और दौलत, न चांदी न सोना।
हम तो मांगें तेरे चरणों में छोटा सा कोना॥
सबकी बिगड़ी बनाने वाली, लाज बचाने वाली,
सतियों के सत को सवांरती।
ओ मैया हम सब उतारे तेरी आरती।

चरण शरण में खड़े तुम्हारी, ले पूजा की थाली।
वरद हस्त सर पर रख दो माँ संकट हरने वाली॥
माँ भर दो भक्ति रस प्याली, अष्ट भुजाओं वाली,
भक्तों के कारज तू ही सारती।
ओ मैया हम सब उतारे तेरी आरती।', NULL, 'Popular Jagdambe/Durga Aarti', 'Traditional', NULL, 'verified', true, true, 25) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('mahalakshmi-aarti', 'Mahalakshmi Aarti', 'महालक्ष्मी आरती', 'Lakshmi', 'devi', 'marathi', 'aarti', 'जय देवी जय देवी जय महालक्ष्मी।
वससी व्यापकरूपे तू स्थूलसूक्ष्मी॥

करवी संकटवारी।
करुणेची सागर माता॥

जय देवी जय देवी जय महालक्ष्मी॥

कमळावरती बैसूनि, शोभसी माते।
चतुर्भुज धारण करूनि, वरद हस्ते॥

अभय देसी भक्तांना।
संपत्ती देसी नित्य॥

जय देवी जय देवी जय महालक्ष्मी॥

धनधान्याची वृद्धी होवो।
सुखशांती घरामाजी॥

तुझी कृपा राहो माता।
सर्व भक्तांवरी॥

जय देवी जय देवी जय महालक्ष्मी॥', NULL, 'Marathi Mahalakshmi Aarti', 'Traditional', NULL, 'needs_verification', false, true, 26) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('saraswati-mata-aarti', 'Saraswati Mata Aarti', 'सरस्वती माता आरती', 'Saraswati', 'devi', 'hindi', 'aarti', 'जय सरस्वती माता।
मैया जय सरस्वती माता॥

सद्गुण वैभव शालिनी।
त्रिभुवन विख्याता॥

जय सरस्वती माता॥

चंद्रवदनी पद्मासिनी।
द्युतिमंगलकारी॥

सोहे शुभ हंस सवारी।
अतुल तेजधारी॥

जय सरस्वती माता॥

बाएं कर में वीणा।
दाएं कर माला॥

शीश मुकुट मणि सोहे।
गल मोतियन माला॥

जय सरस्वती माता॥

देवी शरण जो आए।
उनका उद्धार करो॥

ज्ञान प्रकाश भरो माता।
अज्ञान अंधकार हरो॥

जय सरस्वती माता॥', NULL, 'Saraswati Mata Aarti', 'Traditional', NULL, 'needs_verification', false, true, 27) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('jayati-jayati-jagdambe-mata', 'Jayati Jayati Jagdambe Mata', 'जयति जयति जगदंबे माता', 'Jagdambe', 'devi', 'hindi', 'aarti', 'जयति जयति जगदंबे माता।
जयति जयति जगदंबे॥

दीनन की तू दीनदयाला।
भक्तन की प्रतिपाला॥

जयति जयति जगदंबे॥

सिंह सवारी करके माता।
दुष्टन को संहारा॥

महिषासुर को मार गिराया।
देवन को सुखदायी॥

जयति जयति जगदंबे॥

जो कोई तेरी शरण में आवे।
मनवांछित फल पावे॥

दुःख संकट सब दूर भगावे।
माता कृपा बरसावे॥

जयति जयति जगदंबे॥', NULL, 'Jagdambe Mata Aarti', 'Traditional', NULL, 'needs_verification', false, true, 28) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('pandurangachi-aarti', 'Pandurangachi Aarti', 'पांडुरंगाची आरती', 'Vitthal', 'vitthal', 'marathi', 'aarti', 'पंढरीनाथा विठ्ठला।
रखुमाईच्या वल्लभा॥

भक्तजनांच्या संकटी।
धाव घेसी पांडुरंगा॥

जय देव जय देव जय पांडुरंगा।
रखुमाईच्या वल्लभा॥

कटीवरती हात ठेवुनी।
विटेवरी उभा राहसी॥

दीनानाथा दयाघना।
भक्तांवरी कृपा करसी॥

जय देव जय देव जय पांडुरंगा॥', NULL, 'Short Pandurang/Vitthal Aarti', 'Traditional', NULL, 'needs_verification', false, true, 29) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('dnyanadevachi-aarti', 'Dnyanadevachi Aarti', 'ज्ञानदेवाची आरती', 'Dnyaneshwar', 'vitthal', 'marathi', 'aarti', 'आरती ज्ञानराजा।
महाकैवल्यतेजा॥

सेविती साधुसंत।
मनु वेधला माझा॥

आरती ज्ञानराजा॥

लोपले ज्ञान जगी।
हित नेणती कोणी॥

अवतार पांडुरंग।
नाम ठेविले ज्ञानी॥

आरती ज्ञानराजा॥

कनकाचे ताट करी।
उभ्या गोपिका नारी॥

नारद तुंबर हो।
साम गाती गायन करी॥

आरती ज्ञानराजा॥

प्रकट गुह्य बोले।
विश्व ब्रह्म केले॥

राम जनार्दनी।
पायी मस्तक ठेविले॥

आरती ज्ञानराजा॥', NULL, 'Aarti of Sant Dnyaneshwar', 'Traditional', NULL, 'needs_verification', false, true, 30) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('tukaramachi-aarti', 'Tukaramachi Aarti', 'तुकारामाची आरती', 'Tukaram', 'vitthal', 'marathi', 'aarti', 'आरती तुकारामा।
स्वामी सद्गुरुधामा॥

सच्चिदानंद मूर्ती।
पाय दाखवी आम्हां॥

आरती तुकारामा॥

राघवाचा दास।
भक्तीचा प्रकाश॥

नामघोषे दुमदुमले।
पावन झाले आकाश॥

आरती तुकारामा॥

विठ्ठल नामाचा गजर।
अखंड चालला स्वर॥

तुका म्हणे पांडुरंगा।
तुझ्या चरणी माझा ठाव॥', NULL, 'Aarti of Sant Tukaram', 'Traditional', NULL, 'needs_verification', false, true, 31) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('niropachi-aarti', 'Niropachi Aarti', 'निरोपाची आरती', 'Ganpati', 'ganpati', 'marathi', 'nirop', 'घालीन लोटांगण तुझ्या चरणांसी।
आता निरोप देतो भक्तिभावेंसी॥

पुढल्या वर्षी लवकर या।
गणपती बाप्पा मोरया॥

मंगलमूर्ती मोरया।
पुढच्या वर्षी लवकर या॥

सुखकर्ता दुःखहर्ता।
वार्ता विघ्नाची॥

तुझ्या कृपेने बाप्पा।
सर्व संकटे टळती॥

गणपती बाप्पा मोरया।
पुढच्या वर्षी लवकर या॥', NULL, 'Ganpati Visarjan Nirop Aarti - farewell prayer', 'Traditional', NULL, 'needs_verification', false, true, 32) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-dattachi-aarti-dup', 'Sri Dattachi Aarti', 'श्री दत्ताची आरती', 'Dattatreya', 'dattatreya', 'marathi', 'aarti', 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा।
त्रिगुणी अवतार त्रैलोक्यराणा॥

नेति नेति शब्दें न ये अनुमाना।
सुरवर मुनिजन योगी समाधि न ध्याना॥

जय देव जय देव जय श्री गुरुदत्ता।
आरती ओवाळिता हरली भवचिंता॥

सबाह्य अभ्यंतरी तू एक दत्त।
अभाग्यासी कैची कळेल ही मात॥

पराही परतली तेथे कैचा हेत।
जन्ममरणाचा पुरलासे अंत॥

जय देव जय देव जय श्री गुरुदत्ता॥', NULL, 'Another version of Dattatreya Aarti', 'Traditional', NULL, 'needs_verification', false, true, 33) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-marutichi-aarti', 'Sri Marutichi Aarti', 'श्री मारुतीची आरती', 'Hanuman', 'hanuman', 'marathi', 'aarti', 'सत्राणे उड्डाणे हुंकार वदनी।
करी डळमळ भूमंडळ सिंधूजळ गगनी॥

कडाडिले ब्रह्मांड धाके त्रिभुवनी।
सुरवर नर निशाचर त्या झाल्या पळणी॥

जय देव जय देव जय हनुमंता।
तुमचेनि प्रतापे न भिये कृतांता॥

दुमदुमली पाताळे उठिला प्रतिशब्द।
थरथरला धरणीधर मानीला खेद॥

कडकडिले पर्वत उडुगण उच्छेद।
रामी रामदासा शक्तीचा शोध॥

जय देव जय देव जय हनुमंता॥', NULL, 'Marathi Hanuman/Maruti Aarti', 'Traditional', NULL, 'needs_verification', false, true, 34) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganpati-atharvashirsha', 'Ganpati Atharvashirsha', 'गणपती अथर्वशीर्ष', 'Ganpati', 'ganpati', 'sanskrit', 'stotra', 'ॐ नमस्ते गणपतये।
त्वमेव प्रत्यक्षं तत्त्वमसि।
त्वमेव केवलं कर्ताऽसि।
त्वमेव केवलं धर्ताऽसि।
त्वमेव केवलं हर्ताऽसि।
त्वमेव सर्वं खल्विदं ब्रह्मासि।
त्वं साक्षादात्मासि नित्यम्॥

ऋतं वच्मि। सत्यं वच्मि॥

अव त्वं माम्।
अव वक्तारम्।
अव श्रोतारम्।
अव दातारम्।
अव धातारम्।
अवानूचानमव शिष्यम्॥

सर्वतो मां पाहि पाहि समन्तात्॥

त्वं वाङ्मयस्त्वं चिन्मयः।
त्वमानन्दमयस्त्वं ब्रह्ममयः।
त्वं सच्चिदानन्दाद्वितीयोऽसि॥

त्वं प्रत्यक्षं ब्रह्मासि।
त्वं ज्ञानमयो विज्ञानमयोऽसि॥', NULL, 'Ganesh Atharvashirsha Upanishad', 'Atharva Veda', NULL, 'needs_verification', false, true, 35) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganesh-stotra', 'Ganesh Stotra', 'गणेश स्तोत्र', 'Ganpati', 'ganpati', 'sanskrit', 'stotra', 'गजाननं भूतगणादि सेवितं।
कपित्थजम्बूफलचारुभक्षणम्॥

उमासुतं शोकविनाशकारकम्।
नमामि विघ्नेश्वरपादपङ्कजम्॥

वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव शुभकार्येषु सर्वदा॥

एकदन्तं महाकायं लम्बोदरगजाननम्।
विघ्ननाशकरं देवं हेरम्बं प्रणमाम्यहम्॥', NULL, 'Ganesh Stotra with Vakratunda and Ekadantam', 'Traditional', NULL, 'needs_verification', false, true, 36) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganpati-mantra', 'Ganpati Mantra', 'गणपती मंत्र', 'Ganpati', 'ganpati', 'sanskrit', 'mantra', 'ॐ गं गणपतये नमः॥

वक्रतुण्डाय हुं।
एकदन्ताय विद्महे।
वक्रतुण्डाय धीमहि।
तन्नो दन्तिः प्रचोदयात्॥

ॐ श्री गणेशाय नमः॥

गणानां त्वा गणपतिं हवामहे।
कविं कवीनामुपमश्रवस्तमम्।
ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत।
आ नः शृण्वन्नूतिभिः सीदसादनम्॥', NULL, 'Ganpati Beej Mantra and Gayatri', 'Vedas', NULL, 'needs_verification', false, true, 37) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('hanuman-chalisa', 'Hanuman Chalisa', 'हनुमान चालीसा', 'Hanuman', 'hanuman', 'hindi', 'chalisa', 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।
बरनऊँ रघुबर बिमल जसु, जो दायकु फल चारि॥

बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।
बल बुधि विद्या देहु मोहिं, हरहु कलेस बिकार॥

जय हनुमान ज्ञान गुन सागर।
जय कपीस तिहुँ लोक उजागर॥

राम दूत अतुलित बल धामा।
अंजनि-पुत्र पवनसुत नामा॥

महाबीर बिक्रम बजरंगी।
कुमति निवार सुमति के संगी॥

कंचन बरन बिराज सुबेसा।
कानन कुंडल कुंचित केसा॥

हाथ बज्र औ ध्वजा बिराजै।
काँधे मूँज जनेऊ साजै॥

शंकर सुवन केसरी नंदन।
तेज प्रताप महा जग वंदन॥

विद्यावान गुनी अति चातुर।
राम काज करिबे को आतुर॥

प्रभु चरित्र सुनिबे को रसिया।
राम लखन सीता मन बसिया॥

सूक्ष्म रूप धरि सियहिं दिखावा।
बिकट रूप धरि लंक जरावा॥

भीम रूप धरि असुर संहारे।
रामचंद्र के काज सँवारे॥

लाय सजीवन लखन जियाए।
श्रीरघुबीर हरषि उर लाए॥

रघुपति कीन्ही बहुत बड़ाई।
तुम मम प्रिय भरतहि सम भाई॥

सहस बदन तुम्हरो जस गावैं।
अस कहि श्रीपति कंठ लगावैं॥

सनकादिक ब्रह्मादि मुनीसा।
नारद सारद सहित अहीसा॥

जम कुबेर दिगपाल जहाँ ते।
कवि कोविद कहि सके कहाँ ते॥

तुम उपकार सुग्रीवहिं कीन्हा।
राम मिलाय राज पद दीन्हा॥

तुम्हरो मंत्र बिभीषण माना।
लंकेश्वर भए सब जग जाना॥

जुग सहस्र योजन पर भानू।
लील्यो ताहि मधुर फल जानू॥

प्रभु मुद्रिका मेलि मुख माहीं।
जलधि लाँघि गए अचरज नाहीं॥

दुर्गम काज जगत के जेते।
सुगम अनुग्रह तुम्हरे तेते॥

राम दुआरे तुम रखवारे।
होत न आज्ञा बिनु पैसारे॥

सब सुख लहै तुम्हारी सरना।
तुम रक्षक काहू को डरना॥

आपन तेज सम्हारो आपै।
तीनों लोक हाँक तें काँपै॥

भूत पिशाच निकट नहिं आवै।
महाबीर जब नाम सुनावै॥

नासै रोग हरै सब पीरा।
जपत निरंतर हनुमत बीरा॥

संकट तें हनुमान छुड़ावै।
मन क्रम बचन ध्यान जो लावै॥

सब पर राम तपस्वी राजा।
तिन के काज सकल तुम साजा॥

और मनोरथ जो कोई लावै।
सोई अमित जीवन फल पावै॥

चारों जुग परताप तुम्हारा।
है परसिद्ध जगत उजियारा॥

साधु संत के तुम रखवारे।
असुर निकंदन राम दुलारे॥

अष्ट सिद्धि नौ निधि के दाता।
अस बर दीन जानकी माता॥

राम रसायन तुम्हरे पासा।
सदा रहो रघुपति के दासा॥

तुम्हरे भजन राम को पावै।
जनम जनम के दुख बिसरावै॥

अंतकाल रघुवर पुर जाई।
जहाँ जन्म हरिभक्त कहाई॥

और देवता चित्त न धरई।
हनुमत सेइ सर्व सुख करई॥

संकट कटै मिटै सब पीरा।
जो सुमिरै हनुमत बलबीरा॥

जय जय जय हनुमान गोसाईं।
कृपा करहु गुरुदेव की नाईं॥

जो सत बार पाठ कर कोई।
छूटहि बंदि महा सुख होई॥

जो यह पढ़ै हनुमान चालीसा।
होय सिद्धि साखी गौरीसा॥

तुलसीदास सदा हरि चेरा।
कीजै नाथ हृदय महँ डेरा॥

पवनतनय संकट हरण, मंगल मूरति रूप।
राम लखन सीता सहित, हृदय बसहु सुर भूप॥', NULL, 'Complete Hanuman Chalisa by Tulsidas', 'Tulsidas', NULL, 'needs_verification', false, true, 38) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('bajrang-baan', 'Bajrang Baan', 'बजरंग बाण', 'Hanuman', 'hanuman', 'hindi', 'stotra', 'निश्चय प्रेम प्रतीति ते, विनय करैं सनमान।
तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥

जय हनुमंत संत हितकारी।
सुन लीजै प्रभु अरज हमारी॥

जन के काज विलंब न कीजै।
आतुर दौरि महा सुख दीजै॥

जैसे कूदि सिंधु महिपारा।
सुरसा बदन पैठि विस्तारा॥

आगे जाय लंकिनी रोका।
मारेहु लात गई सुरलोका॥

जाय विभीषण को सुख दीन्हा।
सीता निरखि परम पद लीन्हा॥

बाग उजारि सिन्धु महँ बोरा।
अति आतुर जमकातर तोरा॥

अक्षय कुमार मारि संहारा।
लूम लपेट लंक को जारा॥

लाह समान लंक जरि गई।
जय जय धुनि सुरपुर नभ भई॥

अब विलंब केहि कारण स्वामी।
कृपा करहु उर अंतर्यामी॥

जय जय लखन प्राण के दाता।
आतुर होइ दुःख हरहु निपाता॥

जय गिरिधर जय जय सुख सागर।
सुरसमूह समरथ भट नागर॥

ॐ हनु हनु हनु हनुमंत हठीले।
बैरिहि मारु बज्र की कीले॥

गदा बज्र लै बैरिहिं मारो।
महाराज प्रभु दास उबारो॥

ॐकार हुंकार महाप्रभु धावो।
बज्र गदा हनु विलंब न लावो॥', NULL, 'Bajrang Baan - powerful Hanuman stotra', 'Traditional', NULL, 'needs_verification', false, true, 39) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sankat-mochan-hanumanashtak', 'Sankat Mochan Hanumanashtak', 'संकट मोचन हनुमानाष्टक', 'Hanuman', 'hanuman', 'hindi', 'stotra', 'बाल समय रवि भक्षि लियो तब, तीनहुँ लोक भयो अँधियारो।
ताहि सों त्रास भयो जग को, यह संकट काहु सों जात न टारो॥

देवन आनि करी विनती तब, छाँड़ि दियो रवि कष्ट निवारो।
को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥

बालि की त्रास कपीस बसैं गिरि, जात महाप्रभु पंथ निहारो।
चौंकि महा मुनि साप दियो तब, चाहत कौन विचार विचारो॥

कै द्विज रूप लिवाय महाप्रभु, सो तुम दास के सोक निवारो।
को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥

अंगद के संग लेन गए सिय, खोज कपीस यह बैन उचारो।
जीवत ना बचिहौ हम सो जु, बिना सुधि लाए इहाँ पगु धारो॥

हेरी थके तट सिंधु सबै तब, लाय सिया-सुधि प्राण उबारो।
को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥

रावण त्रास दई सिय को सब, राक्षसि सों कहि सोक निवारो।
ताहि समय हनुमान महाप्रभु, जाय महा रजनीचर मारो॥

चाहत सीय असोक सों आगि, सो दै प्रभु मुद्रिका सोक निवारो।
को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥', NULL, 'Sankat Mochan Hanumanashtak', 'Traditional', NULL, 'needs_verification', false, true, 40) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ashtavinayak-ganpati-stavan', 'Ashtavinayak Ganpati Stavan', 'अष्टविनायक गणपती स्तवन', 'Ganpati', 'ganpati', 'sanskrit', 'stotra', 'ॐ गण गणपतये नमः॥

वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव शुभकार्येषु सर्वदा॥

एकदन्तं महाकायं लम्बोदरगजाननम्।
विघ्ननाशकरं देवं हेरम्बं प्रणमाम्यहम्॥

गजाननं भूतगणादि सेवितं।
कपित्थजम्बूफलचारुभक्षणम्॥
उमासुतं शोकविनाशकारकम्।
नमामि विघ्नेश्वरपादपङ्कजम्॥', NULL, 'Ashtavinayak Ganpati Stotra', 'Traditional', NULL, 'needs_verification', false, true, 41) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganesh-panchratna-stotra', 'Ganesh Panchratna Stotra', 'गणेश पंचरत्न स्तोत्र', 'Ganpati', 'ganpati', 'sanskrit', 'stotra', 'मुदाकरात्तमोदकं सदा विमुक्तिसाधकम्।
कलाधरावतंसकं विलासिलोकरक्षकम्॥

अनायकैकनायकं विनाशितेभदैत्यकम्।
नताशुभाशुनाशकं नमामि तं विनायकम्॥

नतेतरातिभीकरं नवोदितार्कभास्वरम्।
नमत्सुरारिनिर्जरं नताधिकापदुद्धरम्॥

सुरेश्वरं निधीश्वरं गजेश्वरं गणेश्वरम्।
महेश्वरं तमाश्रये परात्परं निरन्तरम्॥', NULL, 'Ganesh Panchratna Stotra by Adi Shankaracharya', 'Adi Shankaracharya', NULL, 'needs_verification', false, true, 42) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('ganesh-gayatri-mantra', 'Ganesh Gayatri Mantra', 'गणेश गायत्री मंत्र', 'Ganpati', 'ganpati', 'sanskrit', 'mantra', 'ॐ एकदन्ताय विद्महे।
वक्रतुण्डाय धीमहि।
तन्नो दन्तिः प्रचोदयात्॥

ॐ गणाधिपतये नमः॥

ॐ विघ्नराजाय नमः॥

ॐ लंबोदराय नमः॥

ॐ गजाननाय नमः॥

ॐ सिद्धिविनायकाय नमः॥', NULL, 'Ganesh Gayatri and other Ganpati mantras', 'Vedas', NULL, 'needs_verification', false, true, 43) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-ganesh-dhyan-mantra', 'Sri Ganesh Dhyan Mantra', 'श्री गणेश ध्यान मंत्र', 'Ganpati', 'ganpati', 'sanskrit', 'mantra', 'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।
प्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥

वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव शुभकार्येषु सर्वदा॥', NULL, 'Ganesh Dhyan Mantra for meditation', 'Traditional', NULL, 'needs_verification', false, true, 44) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-vishnu-dhyan', 'Sri Vishnu Dhyan', 'श्री विष्णु ध्यान', 'Vishnu', 'vishnu', 'sanskrit', 'stotra', 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्।
विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥

लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यम्।
वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥', NULL, 'Vishnu Dhyan Shloka for meditation', 'Traditional', NULL, 'needs_verification', false, true, 45) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-krishna-prarthana', 'Sri Krishna Prarthana', 'श्री कृष्ण प्रार्थना', 'Krishna', 'krishna', 'sanskrit', 'prayer', 'कृष्णाय वासुदेवाय हरये परमात्मने।
प्रणतः क्लेशनाशाय गोविन्दाय नमो नमः॥

वसुदेवसुतं देवं कंसचाणूरमर्दनम्।
देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥

करारविन्देन पदारविन्दं।
मुखारविन्दे विनिवेशयन्तम्॥

वटस्य पत्रस्य पुटे शयानं।
बालं मुकुन्दं मनसा स्मरामि॥', NULL, 'Krishna Prarthana and Dhyan Shloka', 'Traditional', NULL, 'needs_verification', false, true, 46) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-vitthal-namasmaran', 'Sri Vitthal Namasmaran', 'श्री विठ्ठल नामस्मरण', 'Vitthal', 'vitthal', 'hindi', 'mantra', 'जय जय राम कृष्ण हरी।
जय जय राम कृष्ण हरी॥

विठ्ठल विठ्ठल विठ्ठल।
पांडुरंग हरी॥

राम कृष्ण हरी।
विठ्ठल रखुमाई॥

ज्ञानोबा तुकाराम।
पांडुरंग हरी॥

जय जय राम कृष्ण हरी॥', NULL, 'Vitthal Namasmaran - Bhajan/Kirtan style', 'Warkari Tradition', NULL, 'needs_verification', false, true, 47) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-ram-naam-dhun', 'Sri Ram Naam Dhun', 'श्री राम नाम धुन', 'Rama', 'ram', 'hindi', 'prayer', 'श्री राम जय राम जय जय राम।
श्री राम जय राम जय जय राम॥

राम राम राम राम।
राम राम राम राम॥

सीताराम सीताराम।
सीताराम सीताराम॥

श्री राम जय राम जय जय राम॥', NULL, 'Ram Naam Dhun - devotional chant', 'Traditional', NULL, 'needs_verification', false, true, 48) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('sri-sai-baba-prarthana', 'Sri Sai Baba Prarthana', 'श्री साई बाबा प्रार्थना', 'Sai Baba', 'sai', 'hindi', 'prayer', 'ॐ साईं राम।
ॐ साईं राम॥

सबका मालिक एक।
सबका मालिक एक॥

साईं नाथ महाराज की जय।
श्री सच्चिदानंद सद्गुरु साईनाथ महाराज की जय॥

हे साईंनाथ दयाघना।
चरणी ठेवितो माथा॥

कृपादृष्टी ठेवावी नाथा।
दूर करावी सर्व व्यथा॥

ॐ साईं राम।
ॐ साईं राम॥', NULL, 'Sai Baba Prarthana', 'Traditional', NULL, 'needs_verification', false, true, 49) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;
INSERT INTO aartis (slug, title, title_devanagari, deity, category, language, type, lyrics, transliteration, description, source, source_url, content_status, verified, published, sort_order) VALUES ('annapurna-mata-prarthana', 'Annapurna Mata Prarthana', 'अन्नपूर्णा माता प्रार्थना', 'Annapurna', 'other', 'sanskrit', 'prayer', 'अन्नपूर्णे सदापूर्णे शंकरप्राणवल्लभे।
ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति॥

माता च पार्वती देवी।
पिता देवो महेश्वरः॥

बान्धवाः शिवभक्ताश्च।
स्वदेशो भुवनत्रयम्॥

ॐ अन्नपूर्णायै नमः॥', NULL, 'Annapurna Mata Prarthana - prayer for food and nourishment', 'Traditional', NULL, 'needs_verification', false, true, 50) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, title_devanagari=EXCLUDED.title_devanagari, deity=EXCLUDED.deity, category=EXCLUDED.category, language=EXCLUDED.language, type=EXCLUDED.type, lyrics=EXCLUDED.lyrics, description=EXCLUDED.description, source=EXCLUDED.source, content_status=EXCLUDED.content_status, verified=EXCLUDED.verified, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order;

-- Done! 50 aartis seeded.
