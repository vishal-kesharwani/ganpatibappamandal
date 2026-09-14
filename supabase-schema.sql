-- Supabase Schema for Ganpati Festival App
-- Run this in Supabase SQL Editor

-- Schedule Events (admin can add/edit/delete)
CREATE TABLE IF NOT EXISTS schedule_events (
  id BIGSERIAL PRIMARY KEY,
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 7),
  time TEXT NOT NULL,
  time_end TEXT,
  title TEXT NOT NULL,
  title_marathi TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aartis (admin can add/edit/delete)
CREATE TABLE IF NOT EXISTS aartis (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_marathi TEXT NOT NULL,
  title_hindi TEXT NOT NULL,
  title_hinglish TEXT NOT NULL,
  category TEXT NOT NULL,
  category_marathi TEXT NOT NULL,
  category_hindi TEXT NOT NULL,
  category_hinglish TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  lyrics_hindi TEXT NOT NULL,
  lyrics_hinglish TEXT NOT NULL,
  description TEXT,
  description_hindi TEXT,
  description_hinglish TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements (admin can add/edit/delete)
CREATE TABLE IF NOT EXISTS announcements (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_marathi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_marathi TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE aartis ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read schedule_events" ON schedule_events FOR SELECT USING (true);
CREATE POLICY "Public read aartis" ON aartis FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);

-- Admin write access (using anon key with service role for admin)
CREATE POLICY "Admin write schedule_events" ON schedule_events FOR ALL USING (true);
CREATE POLICY "Admin write aartis" ON aartis FOR ALL USING (true);
CREATE POLICY "Admin write announcements" ON announcements FOR ALL USING (true);

-- Insert default schedule events
INSERT INTO schedule_events (day, time, time_end, title, title_marathi, category, description, sort_order) VALUES
(1, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(1, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(1, '10:00', '12:00', 'Cultural Program', 'सांस्कृतिक कार्यक्रम', 'cultural', NULL, 3),
(1, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(1, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 5),
(1, '20:00', '21:00', 'Bhajan Sandhya', 'भजन संध्या', 'bhajan', NULL, 6),
(1, '21:30', '22:00', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 7),

(2, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(2, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(2, '10:00', '12:00', 'Drawing Competition', 'चित्र स्पर्धा', 'competition', NULL, 3),
(2, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(2, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 5),
(2, '20:00', '21:00', 'Dhol Tasha', 'ढोल-ताशा', 'dhol-tasha', NULL, 6),
(2, '21:30', '22:00', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 7),

(3, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(3, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(3, '10:00', '12:00', 'Children Activities', 'बाल कार्यक्रम', 'children', NULL, 3),
(3, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(3, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 5),
(3, '20:00', '21:00', 'Bhajan Sandhya', 'भजन संध्या', 'bhajan', NULL, 6),
(3, '21:30', '22:00', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 7),

(4, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(4, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(4, '10:00', '12:00', 'Lok Nritya', 'लोकनृत्य', 'cultural', NULL, 3),
(4, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(4, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 5),
(4, '20:00', '21:00', 'Singing Program', 'गायन कार्यक्रम', 'cultural', NULL, 6),
(4, '21:30', '22:00', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 7),

(5, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(5, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(5, '10:00', '13:00', 'Blood Donation Camp', 'रक्तदान शिबिर', 'social', NULL, 3),
(5, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(5, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 5),
(5, '20:00', '21:00', 'Bhajan Sandhya', 'भजन संध्या', 'bhajan', NULL, 6),
(5, '21:30', '22:00', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 7),

(6, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(6, '08:00', NULL, 'Ganpati Darshan', 'गणपती दर्शन', 'darshan', NULL, 2),
(6, '10:00', '12:00', 'Dindi Program', 'दिंडी कार्यक्रम', 'dindi', NULL, 3),
(6, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(6, '16:00', '18:00', 'Dhol Tasha Pathak', 'ढोल-ताशा पथक', 'dhol-tasha', NULL, 5),
(6, '18:00', '18:30', 'Sandhya Aarti', 'संध्या आरती', 'aarti', NULL, 6),
(6, '20:00', '21:30', 'Grand Cultural Evening', 'भव्य सांस्कृतिक संध्या', 'cultural', NULL, 7),
(6, '22:00', '22:30', 'Sheja Aarti', 'शेज आरती', 'aarti', NULL, 8),

(7, '06:00', '06:30', 'Kakad Aarti', 'काकड आरती', 'aarti', NULL, 1),
(7, '08:00', NULL, 'Final Darshan', 'अंतिम दर्शन', 'darshan', NULL, 2),
(7, '10:00', '11:00', 'Mahaprasad', 'महाप्रसाद', 'prasad', NULL, 3),
(7, '12:30', '13:00', 'Madhyan Aarti', 'मध्याह्न आरती', 'aarti', NULL, 4),
(7, '14:00', NULL, 'Visarjan Miravnuk Starts', 'विसर्जन मिरवणूक सुरू', 'visarjan', 'Procession starts from the mandal', 5),
(7, '16:00', NULL, 'Visarjan at River Bank', 'नदीकाठी विसर्जन', 'visarjan', 'Final immersion', 6);

-- Insert default aartis
INSERT INTO aartis (slug, title, title_marathi, title_hindi, title_hinglish, category, category_marathi, category_hindi, category_hinglish, lyrics, lyrics_hindi, lyrics_hinglish, description, description_hindi, description_hinglish, featured, sort_order) VALUES
('sukhkarta-dukhharta', 'Sukhkarta Dukhharta', 'सुखकर्ता दुःखहर्ता', 'सुखकर्ता दुःखहर्ता', 'Sukhkarta Dukhharta', 'ganpati', 'गणपतीची आरती', 'गणपती की आरती', 'Ganpati Aarti', E'sुखकर्ता दुःखहर्ता\nवार्ता विघ्नाची\nनिर्विघ्न करजे म्हणे\nमाऊली तुझी\n\nजय देव जय देव\nजय देव जय देव\n\nशेंदूर लाल चढायो\nअंबरी गळ सोहे\nवस्त्र पीता बरण्याला\nचंदन उडवेते\n\nजय देव जय देव\nजय देव जय देव\n\nरत्नाची फुलं कर्णी\nकुंडल चमचमीत\nलंबोदर विनती म्हणे\nवाहने उंदीरी\n\nजय देव जय देव\nजय देव जय देव\n\nएकदंत दयावंत\nचार भुजा धारी\nमाथें तिळक सोहे\nगणराज विठ्ठली\n\nजय देव जय देव\nजय देव जय देव\n\nरिद्धी सिद्धी प्रचंड\nकुंडी वरवरन्या\nपोत फुलांच्या सरोवर\nमाऊली तुझ्या पुढे\n\nजय देव जय देव\nजय देव जय देव\n\nएवढी तुजी आरती\nकोण वरवण्या\nभावे प्रेमें पाहे\nसदा वासुदेवा\n\nजय देव जय देव\nजय देव जय देव', E'सुखकर्ता दुःखहर्ता\nवार्ता विघ्नाची\nनिर्विघ्न करजे म्हणे\nमाऊली तुझी\n\nजय देव जय देव\nजय देव जय देव\n\nशेंदूर लाल चढायो\nअंबरी गळ सोहे\nवस्त्र पीता बरण्याला\nचंदन उडवेते\n\nजय देव जय देव\nजय देव जय देव\n\nरत्नाची फुलं कर्णी\nकुंडल चमचमीत\nलंबोदर विनती म्हणे\nवाहने उंदीरी\n\nजय देव जय देव\nजय देव जय देव\n\nएकदंत दयावंत\nचार भुजा धारी\nमाथें तिळक सोहे\nगणराज विठ्ठली\n\nजय देव जय देव\nजय देव जय देव\n\nरिद्धी सिद्धी प्रचंड\nकुंडी वरवरन्या\nपोत फुलांच्या सरोवर\nमाऊली तुझ्या पुढे\n\nजय देव जय देव\nजय देव जय देव\n\nएवढी तुजी आरती\nकोण वरवण्या\nभावे प्रेमें पाहे\nसदा वासुदेवा\n\nजय देव जय देव\nजय देव जय देव', E'Sukhkarta Dukhharta\nVarta Vighnachi\nNirvighna Karje Mhanee\nMauli Tujhi\n\nJai Dev Jai Dev\nJai Dev Jai Dev\n\nShendur Lal Chadhayo\nAmbri Gal Sohe\nVastra Pita Baranyala\nChandan Udavete\n\nJai Dev Jai Dev\nJai Dev Jai Dev\n\nRatnachi Phula Karni\nKundal Chamchamit\nLambodar Vinati Mhanee\nVahane Undiri\n\nJai Dev Jai Dev\nJai Dev Jai Dev\n\nEkadanta Dayavant\nChar Bhuja Dhari\nMathe Tilak Sohe\nGanraj Viththali\n\nJai Dev Jai Dev\nJai Dev Jai Dev\n\nRiddhi Siddhi Prachhand\nKundi Varvarya\nPot Phulanchya Sarovar\nMauli Tujhya Pudhe\n\nJai Dev Jai Dev\nJai Dev Jai Dev\n\nEvadhi Tuzhi Aarti\nKon Varvanya\nBhave Prene Pahue\nSada Vasudeva\n\nJai Dev Jai Dev\nJai Dev Jai Dev', 'The primary Ganpati Aarti', 'गणपती बाप्पांची प्रमुख आरती', 'Ganpati Bappa ki pramukh aarti', TRUE, 1),

('jay-dev-jay-dev', 'Jay Dev Jay Dev', 'जय देव जय देव', 'जय देव जय देव', 'Jai Dev Jai Dev', 'ganpati', 'गणपतीची आरती', 'गणपती की आरती', 'Ganpati Aarti', E'जय देव जय देव\nजय मंगलमूर्ती\nदर्शनमात्रे दुःखभंजन\nसुखकरी सदा\n\nजय देव जय देव\n\nबुद्धिविनायक बुद्धि दे\nबुद्धि विघ्नविनाशन\nश्री गणपती बाप्पा\nमोरया', E'जय देव जय देव\nजय मंगलमूर्ती\nदर्शनमात्रे दुःखभंजन\nसुखकरी सदा\n\nजय देव जय देव\n\nबुद्धिविनायक बुद्धि दे\nबुद्धि विघ्नविनाशन\nश्री गणपती बाप्पा\nमोरया', E'Jai Dev Jai Dev\nJai Mangalmurti\nDarshanmatre Dukhbhanjan\nSukhkari Sada\n\nJai Dev Jai Dev\n\nBuddhi Vinayak Buddhi De\nBuddhi Vighna Vinashan\nShri Ganpati Bappa\nMorya', NULL, NULL, NULL, FALSE, 2),

('mangal-murti-aarti', 'Mangal Murti Aarti', 'मंगलमूर्ती आरती', 'मंगलमूर्ति आरती', 'Mangal Murti Aarti', 'ganpati', 'गणपतीची आरती', 'गणपती की आरती', 'Ganpati Aarti', E'अष्टविनायक तुजला\nआरती उतरली\nतुजवर्णी लावणी झाली\nप्रेमें करीतली\n\nमंगलमूर्ती मोरया\nमंगलमूर्ती मोरया\n\nतुलसीच्या बेलपत्री\nसुगंधी धूप जळे\nगणराजा स्वीकारोनी\nसुख संपत्ती दे', E'अष्टविनायक तुजला\nआरती उतरली\nतुजवर्णी लावणी झाली\nप्रेमें करीतली\n\nमंगलमूर्ती मोरया\nमंगलमूर्ती मोरया\n\nतुलसीच्या बेलपत्री\nसुगंधी धूप जळे\nगणराजा स्वीकारोनी\nसुख संपत्ती दे', E'Ashtavinayak Tujla\nAarti Utarli\nTujvarni Lavani Zhali\nPremene Karitli\n\nMangalmurti Morya\nMangalmurti Morya\n\nTulsichya Belpatri\nSugandhi Dhoop Jale\nGanraja Swikaroni\nSukh Sampatti De', NULL, NULL, NULL, FALSE, 3),

('ganesha-aarti', 'Ganpati Bappa Morya', 'गणपती बाप्पा मोरया', 'गणपति बप्पा मोरया', 'Ganpati Bappa Morya', 'ganpati', 'गणपतीची आरती', 'गणपती की आरती', 'Ganpati Aarti', E'गणपती बाप्पा मोरया\nगणपती बाप्पा मोरया\n\nमंगलमूर्ती मोरया\nश्री गणराजा मोरया\n\nगणेश विघ्नहर्ता मोरया\nमोदकप्रिय मोरया\n\nएकदंत मोरया\nलंबोदर मोरया\n\nवक्रतुंड मोरया\nगणपती बाप्पा मोरया', E'गणपती बाप्पा मोरया\nगणपती बाप्पा मोरया\n\nमंगलमूर्ती मोरया\nश्री गणराजा मोरया\n\nगणेश विघ्नहर्ता मोरया\nमोदकप्रिय मोरया\n\nएकदंत मोरया\nलंबोदर मोरया\n\nवक्रतुंड मोरया\nगणपती बाप्पा मोरया', E'Ganpati Bappa Morya\nGanpati Bappa Morya\n\nMangalmurti Morya\nShri Ganraja Morya\n\nGanesh Vighnaharta Morya\nModakpriya Morya\n\nEkadanta Morya\nLambodar Morya\n\nVakratunda Morya\nGanpati Bappa Morya', NULL, NULL, NULL, FALSE, 4),

('sheja-aarti', 'Sheja Aarti', 'शेज आरती', 'शयन आरती', 'Sheja Aarti', 'sheja', 'शेज आरती', 'शयन आरती', 'Sheja Aarti', E'आरती उतरली शेजीं\nबाप्पा तुझ्या\nस्वप्नांत म्हणोनी\nआम्ही गातली\n\nसुखे झोपा बाप्पा\nस्वप्नांत रमा\nआमच्या मनाची\nप्रार्थना माना\n\nशेज आरती उतरली\nबाप्पा तुझ्या', E'आरती उतरली शेजीं\nबाप्पा तुझ्या\nस्वप्नांत म्हणोनी\nआम्ही गातली\n\nसुखे झोपा बाप्पा\nस्वप्नांत रमा\nआमच्या मनाची\nप्रार्थना माना\n\nशेज आरती उतरली\nबाप्पा तुझ्या', E'Aarti Utarli Shejinh\nBappa Tujhya\nSwapnathi Mhanoni\nAmhi Ghatli\n\nSukhe Zhopa Bappa\nSwapnathi Rama\nAamchya Manachi\nPrarthana Mana\n\nSheja Aarti Utarli\nBappa Tujhya', NULL, NULL, NULL, FALSE, 5),

('ganpati-atharvashirsha', 'Ganpati Atharvashirsha', 'गणपती अथर्वशीर्ष', 'गणपति अथर्वशीर्ष', 'Ganpati Atharvashirsha', 'mantra', 'मंत्र', 'मंत्र', 'Mantra', E'ॐ गणेशाय नमः\n\nवक्रतुंड महाकाय\nसूर्यकोटि समप्रभ\nनिर्विघ्नं कुरु मे देव\nसर्वकार्येषु सर्वदा\n\nॐ गणेशाय नमः', E'ॐ गणेशाय नमः\n\nवक्रतुंड महाकाय\nसूर्यकोटि समप्रभ\nनिर्विघ्नं कुरु मे देव\nसर्वकार्येषु सर्वदा\n\nॐ गणेशाय नमः', E'Om Ganeshaya Namah\n\nVakratunda Mahakaya\nSuryakoti Samaprabha\nNirvighnam Kuru Me Deva\nSarva Kaaryeshu Sarvada\n\nOm Ganeshaya Namah', NULL, NULL, NULL, FALSE, 6),

('shri-vishnu-aarti', 'Shri Vishnu Aarti', 'श्री विष्णू आरती', 'श्री विष्णु आरती', 'Shri Vishnu Aarti', 'vishnu', 'विष्णू आरती', 'विष्णु आरती', 'Vishnu Aarti', E'जय विष्णु भगवान\nजय विष्णु भगवान\n\nशंख चक्र गदा धारी\nकमल नयन श्री हरी\n\nजय विष्णु भगवान\nजय विष्णु भगवान\n\nजो विष्णु की भक्ति करे\nसो दुःख से मुक्त हो जाए\n\nजय विष्णु भगवान\nजय विष्णु भगवान\n\nआरती श्री विष्णु जी की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nजय विष्णु भगवान\nजय विष्णु भगवान', E'जय विष्णु भगवान\nजय विष्णु भगवान\n\nशंख चक्र गदा धारी\nकमल नयन श्री हरी\n\nजय विष्णु भगवान\nजय विष्णु भगवान\n\nजो विष्णु की भक्ति करे\nसो दुःख से मुक्त हो जाए\n\nजय विष्णु भगवान\nजय विष्णु भगवान\n\nआरती श्री विष्णु जी की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nजय विष्णु भगवान\nजय विष्णु भगवान', E'Jai Vishnu Bhagwan\nJai Vishnu Bhagwan\n\nShankh Chakra Gada Dhaari\nKamal Nayan Shri Hari\n\nJai Vishnu Bhagwan\nJai Vishnu Bhagwan\n\nJo Vishnu Ki Bhakti Kare\nSo Dukh Se Mukt Ho Jaaye\n\nJai Vishnu Bhagwan\nJai Vishnu Bhagwan\n\nAarti Shri Vishnu Ji Ki\nJo Koi Nar Gaaye\nSukh Sampatti Mil Jaaye\nSab Kasht Mit Jaaye\n\nJai Vishnu Bhagwan\nJai Vishnu Bhagwan', NULL, NULL, NULL, FALSE, 7),

('hanuman-aarti', 'Hanuman Aarti', 'हनुमान आरती', 'हनुमान आरती', 'Hanuman Aarti', 'hanuman', 'हनुमान आरती', 'हनुमान आरती', 'Hanuman Aarti', E'आरती कीजै हनुमान लला की\nदुष्ट दलन रघुनाथ कला की\n\nजके सिर पर राम दुष्ट दले\nविक्रम रघुनाथ जस गावत बलिहारी\n\nशंकर सुवन वीर हनुमाना\nप्रबल बुद्धि विशाल शरीरा\n\nसिंह प्रताप महा कपि सोई\nकांचन बरन शरीर सजाई', E'आरती कीजै हनुमान लला की\nदुष्ट दलन रघुनाथ कला की\n\nजके सिर पर राम दुष्ट दले\nविक्रम रघुनाथ जस गावत बलिहारी\n\nशंकर सुवन वीर हनुमाना\nप्रबल बुद्धि विशाल शरीरा\n\nसिंह प्रताप महा कपि सोई\nकांचन बरन शरीर सजाई', E'Aarti Kijai Hanuman Lala Ki\nDusht Dalan Ragunath Kala Ki\n\nJake Sir Par Ram Dusht Dale\nVikram Ragunath Jas Gaavat Bihari\n\nShankar Suvan Veer Hanumana\nPrabal Buddhi Vishal Sharira\n\nSingh Pratap Maha Kapi Soi\nKanchan Baran Sharir Sajai', NULL, NULL, NULL, FALSE, 8),

('saraswati-aarti', 'Saraswati Aarti', 'सरस्वती आरती', 'सरस्वती आरती', 'Saraswati Aarti', 'devi', 'देवी आरती', 'देवी आरती', 'Devi Aarti', E'जय सरस्वती माता\nजय सरस्वती माता\n\nवीणा वादिनी ज्ञान की दाता\nसुख का वरदान देती माता\n\nजय सरस्वती माता\nजय सरस्वती माता\n\nविद्या देती ज्ञान देती\nहर दुःख का नाश करती माता\n\nजय सरस्वती माता\nजय सरस्वती माता', E'जय सरस्वती माता\nजय सरस्वती माता\n\nवीणा वादिनी ज्ञान की दाता\nसुख का वरदान देती माता\n\nजय सरस्वती माता\nजय सरस्वती माता\n\nविद्या देती ज्ञान देती\nहर दुःख का नाश करती माता\n\nजय सरस्वती माता\nजय सरस्वती माता', E'Jai Saraswati Mata\nJai Saraswati Mata\n\nVeena Vadini Gyan Ki Data\nSukh Ka Vardaan Deti Mata\n\nJai Saraswati Mata\nJai Saraswati Mata\n\nVidya Deti Gyan Deti\nHar Dukh Ka Nash Karti Mata\n\nJai Saraswati Mata\nJai Saraswati Mata', NULL, NULL, NULL, FALSE, 9),

('lakshmi-aarti', 'Lakshmi Aarti', 'लक्ष्मी आरती', 'लक्ष्मी आरती', 'Lakshmi Aarti', 'devi', 'देवी आरती', 'देवी आरती', 'Devi Aarti', E'जय लक्ष्मी माता\nजय लक्ष्मी माता\n\nतुमको निशिदिन सेवत\nहर विष्य फल पाता\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता\n\nसुर्य चंद्रमा दीप जलत हैं\nअर्धं देव फल चढ़त हैं\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता\n\nदीन दयाल बुद्धि दिन दाता\nसंकट हरण मंगल दाता\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता', E'जय लक्ष्मी माता\nजय लक्ष्मी माता\n\nतुमको निशिदिन सेवत\nहर विष्य फल पाता\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता\n\nसुर्य चंद्रमा दीप जलत हैं\nअर्धं देव फल चढ़त हैं\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता\n\nदीन दयाल बुद्धि दिन दाता\nसंकट हरण मंगल दाता\n\nजय लक्ष्मी माता\nजय लक्ष्मी माता', E'Jai Lakshmi Mata\nJai Lakshmi Mata\n\nTumko Nishidin Sevat\nHar Vishya Fal Pata\n\nJai Lakshmi Mata\nJai Lakshmi Mata\n\nSurya Chandrama Deep Jalte Hain\nArdh Dev Phal Chadhte Hain\n\nJai Lakshmi Mata\nJai Lakshmi Mata\n\nDeen Dayal Buddhi Din Data\nSankat Haran Mangal Data\n\nJai Lakshmi Mata\nJai Lakshmi Mata', NULL, NULL, NULL, FALSE, 10),

('shri-ganesh-hindi', 'Shri Ganesh Aarti (Hindi)', 'श्री गणेश आरती (हिंदी)', 'श्री गणेश आरती', 'Shri Ganesh Aarti (Hindi)', 'ganpati', 'गणपतीची आरती', 'गणपती की आरती', 'Ganpati Aarti', E'जय गणेश जय गणेश जय गणेश देवा\nमाता जाकी पार्वती पिता महादेवा\n\nएक दंत दयावंत चार भुजा धारी\nमाथे पर तिलक सोहे मूसे की सवारी\n\nपान चढ़े फल चढ़े और चढ़े मेवा\nलड्डुअन का भोग लगे संत करें सेवा\n\nजय गणेश जय गणेश जय गणेश देवा\nमाता जाकी पार्वती पिता महादेवा', E'जय गणेश जय गणेश जय गणेश देवा\nमाता जाकी पार्वती पिता महादेवा\n\nएक दंत दयावंत चार भुजा धारी\nमाथे पर तिलक सोहे मूसे की सवारी\n\nपान चढ़े फल चढ़े और चढ़े मेवा\nलड्डुअन का भोग लगे संत करें सेवा\n\nजय गणेश जय गणेश जय गणेश देवा\nमाता जाकी पार्वती पिता महादेवा', E'Jai Ganesh Jai Ganesh Jai Ganesh Deva\nMaa Jaki Parvati Pita Mahadeva\n\nEk Dant Dayavant Char Bhuja Dhaari\nMathe Par Tilak Sohe Moose Ki Sawari\n\nPaan Chade Phal Chade Aur Chade Mewa\nLadduan Ka Bhog Lage Sant Kare Seva\n\nJai Ganesh Jai Ganesh Jai Ganesh Deva\nMaa Jaki Parvati Pita Mahadeva', NULL, NULL, NULL, FALSE, 11),

('hanuman-chalisa', 'Hanuman Chalisa', 'हनुमान चालीसा', 'हनुमान चालीसा', 'Hanuman Chalisa', 'hanuman', 'हनुमान आरती', 'हनुमान आरती', 'Hanuman Aarti', E'श्रीगुरु चरन सरोज रज\nनिज मनु मुकुरु सुधारि\nबरनउँ रघुबर बिमल जसु\nजो दायकु फल चारि\n\nजय हनुमान ज्ञान गुन सागर\nजय कपीस तिहुं लोक उजागर\n\nरामदूत अतुलित बल धामा\nअंजनि-पुत्र पवनसुत नामा\n\nमहाबीर बिक्रम बजरंगी\nकुमति निवार सुमति के संगी\n\nकञ्चन बरन विराज सुबेसा\nकानन लगुण उंगेसा\n\nजय हनुमान ज्ञान गुन सागर\nजय कपीस तिहुं लोक उजागर', E'श्रीगुरु चरन सरोज रज\nनिज मनु मुकुरु सुधारि\nबरनउँ रघुबर बिमल जसु\nजो दायकु फल चारि\n\nजय हनुमान ज्ञान गुन सागर\nजय कपीस तिहुं लोक उजागर\n\nरामदूत अतुलित बल धामा\nअंजनि-पुत्र पवनसुत नामा\n\nमहाबीर बिक्रम बजरंगी\nकुमति निवार सुमति के संगी\n\nकञ्चन बरन विराज सुबेसा\nकानन लगुण उंगेसा\n\nजय हनुमान ज्ञान गुन सागर\nजय कपीस तिहुं लोक उजागर', E'Shriguru Charan Saroj Raj\nNij Manu Mukuru Sudhari\nBaranaun Raghubar Bimal Jasu\nJo Dayaku Phal Chari\n\nJai Hanuman Gyan Gun Sagar\nJai Kapis Tihun Lok Ujagar\n\nRamdoot Atulit Bal Dhama\nAnjani-Putra Pavansut Nama\n\nMahabir Bikram Bajrangi\nKumati Nivar Sumati Ke Sange\n\nKanchan Baran Viraj Subesa\nKanan Laguṇ Ungesa\n\nJai Hanuman Gyan Gun Sagar\nJai Kapis Tihun Lok Ujagar', NULL, NULL, NULL, FALSE, 12),

('kunj-bihari-aarti', 'Kunj Bihari Aarti', 'कुंज बिहारी आरती', 'कुंज बिहारी आरती', 'Kunj Bihari Aarti', 'krishna', 'कृष्ण आरती', 'कृष्ण आरती', 'Krishna Aarti', E'आरती कुंज बिहारी की\nराधा रमण वर विहारी की\n\nस्वामी के मन भावे\nसेवक तेरे बिना अधूरे\n\nश्याम श्याम श्याम स्वामी\nबंशी बजावे गोपियां नाचे\n\nनंद के लाल यशोदा के लाल\nगोपियों के स्वामी नंद किशोर\n\nमोर मुकुट मुख चंद्र सा\nहरिद्रा चंदन शरीर सजे', E'आरती कुंज बिहारी की\nराधा रमण वर विहारी की\n\nस्वामी के मन भावे\nसेवक तेरे बिना अधूरे\n\nश्याम श्याम श्याम स्वामी\nबंशी बजावे गोपियां नाचे\n\nनंद के लाल यशोदा के लाल\nगोपियों के स्वामी नंद किशोर\n\nमोर मुकुट मुख चंद्र सा\nहरिद्रा चंदन शरीर सजे', E'Aarti Kunj Bihari Ki\nRadha Raman Var Vihari Ki\n\nSwami Ke Man Bhave\nSevak Tere Bina Adhoore\n\nShyam Shyam Shyam Swami\nBansi Bajave Gopiyan Naache\n\nNand Ke Laal Yashoda Ke Laal\nGopiyon Ke Swami Nand Kishor\n\nMor Mukut Mukh Chandra Sa\nHaridra Chandan Sharir Saje', NULL, NULL, NULL, FALSE, 13),

('santoshi-mata-aarti', 'Santoshi Mata Aarti', 'संतोषी माता आरती', 'संतोषी माता आरती', 'Santoshi Mata Aarti', 'devi', 'देवी आरती', 'देवी आरती', 'Devi Aarti', E'जय संतोषी माता\nजय संतोषी माता\n\nसिंह पर सवार पद्मासीन देवी\nशंख चक्र गदा धारी\n\nसेवक तेरे बिना अधूरे हैं\nहर कष्ट से मुक्त करो माता\n\nधूप दीप फल मेवा चढ़ावे\nसंतोषी हमें दर्शन दे माता\n\nजो नर संतोषी माता का गुण गाए\nसंतोषी माता उसका कल्याण करे', E'जय संतोषी माता\nजय संतोषी माता\n\nसिंह पर सवार पद्मासीन देवी\nशंख चक्र गदा धारी\n\nसेवक तेरे बिना अधूरे हैं\nहर कष्ट से मुक्त करो माता\n\nधूप दीप फल मेवा चढ़ावे\nसंतोषी हमें दर्शन दे माता\n\nजो नर संतोषी माता का गुण गाए\nसंतोषी माता उसका कल्याण करे', E'Jai Santoshi Mata\nJai Santoshi Mata\n\nSingh Par Sawar Padmasin Devi\nShankh Chakra Gada Dhaari\n\nSevak Tere Bina Adhoore Hain\nHar Kasht Se Mukto Karo Mata\n\nDhoop Deep Phal Mewa Chadhave\nSantoshi Hume Darshan De Mata\n\nJo Nar Santoshi Mata Ka Gun Gaaye\nSantoshi Mata Uska Kalyan Kare', NULL, NULL, NULL, FALSE, 14),

('ramchandra-aarti', 'Ramchandra Aarti', 'रामचंद्र आरती', 'रामचंद्र आरती', 'Ramchandra Aarti', 'ram', 'राम आरती', 'राम आरती', 'Ram Aarti', E'आरती श्री रामचंद्र की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nरावण का वध किया प्रभु ने\nअहिल्या का उद्धार किया\n\nसीता राम सीता राम\nसीता राम सीता राम\n\nआरती श्री रामचंद्र की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए', E'आरती श्री रामचंद्र की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nरावण का वध किया प्रभु ने\nअहिल्या का उद्धार किया\n\nसीता राम सीता राम\nसीता राम सीता राम\n\nआरती श्री रामचंद्र की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए', E'Aarti Shri Ramchandra Ki\nJo Koi Nar Gaaye\nSukh Sampatti Mil Jaaye\nSab Kasht Mit Jaaye\n\nRaavan Ka Vadh Kiya Prabhu Ne\nAhilya Ka Uddhar Kiya\n\nSita Ram Sita Ram\nSita Ram Sita Ram\n\nAarti Shri Ramchandra Ki\nJo Koi Nar Gaaye\nSukh Sampatti Mil Jaaye\nSab Kasht Mit Jaaye', NULL, NULL, NULL, FALSE, 15),

('ambe-mata-aarti', 'Ambe Mata Aarti', 'अंबे माता आरती', 'अंबे माता आरती', 'Ambe Mata Aarti', 'devi', 'देवी आरती', 'देवी आरती', 'Devi Aarti', E'जय अंबे माता\nजय अंबे माता\n\nशंख चक्र गदा धारी\nपद्म सिंहासन विराजित राजी\n\nस्वर्ण थार रत्न जड़ित\nसिंह पर सवारी आरती उतारे\n\nश्वेत चंदन सिंदूर चढ़ावे\nफूल चढ़ावे भक्ति से सजावे\n\nदेवी दुर्गा नाम तेरा\nदुष्ट दलन माँ तेरा', E'जय अंबे माता\nजय अंबे माता\n\nशंख चक्र गदा धारी\nपद्म सिंहासन विराजित राजी\n\nस्वर्ण थार रत्न जड़ित\nसिंह पर सवारी आरती उतारे\n\nश्वेत चंदन सिंदूर चढ़ावे\nफूल चढ़ावे भक्ति से सजावे\n\nदेवी दुर्गा नाम तेरा\nदुष्ट दलन माँ तेरा', E'Jai Ambe Mata\nJai Ambe Mata\n\nShankh Chakra Gada Dhaari\nPadma Singhasan Virajit Raji\n\nSwarna Thar Ratna Jadiit\nSingh Par Sawari Aarti Utare\n\nShwet Chandan Sindoor Chadhave\nPhool Chadhave Bhakti Se Sajave\n\nDevi Durga Naam Tera\nDusht Dalan Maa Tera', NULL, NULL, NULL, FALSE, 16),

('satyanarayan-aarti', 'Satyanarayan Aarti', 'सत्यनारायण आरती', 'सत्यनारायण आरती', 'Satyanarayan Aarti', 'vishnu', 'विष्णू आरती', 'विष्णु आरती', 'Vishnu Aarti', E'आरती सत्यनारायण देव की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nतुलसी दल चढ़े विष्णु भगवान को\nश्री फल का भोग लगे प्रेम से मन को\n\nचंदन का टीका लगे श्री फल चढ़े\nकेले फल का भोग लगे श्री फल चढ़े\n\nआरती सत्यनारायण देव की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए', E'आरती सत्यनारायण देव की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए\n\nतुलसी दल चढ़े विष्णु भगवान को\nश्री फल का भोग लगे प्रेम से मन को\n\nचंदन का टीका लगे श्री फल चढ़े\nकेले फल का भोग लगे श्री फल चढ़े\n\nआरती सत्यनारायण देव की\nजो कोई नर गाए\nसुख संपत्ति मिल जाए\nसब कष्ट मिट जाए', E'Aarti Satyanarayan Dev Ki\nJo Koi Nar Gaaye\nSukh Sampatti Mil Jaaye\nSab Kasht Mit Jaaye\n\nTulsi Dal Chadhe Vishnu Bhagwan Ko\nShri Fal Ka Bhog Lage Prem Se Man Ko\n\nChandan Ka Tika Lage Shri Fal Chadhe\nKele Fal Ka Bhog Lage Shri Fal Chadhe\n\nAarti Satyanarayan Dev Ki\nJo Koi Nar Gaaye\nSukh Sampatti Mil Jaaye\nSab Kasht Mit Jaaye', NULL, NULL, NULL, FALSE, 17);

-- Insert default announcements
INSERT INTO announcements (title, title_marathi, description, description_marathi, priority, active) VALUES
('Welcome to Ganeshotsav 2026!', 'गणेशोत्सव २०२६ मध्ये आपले स्वागत आहे!', 'OM SAI MITRA MANDAL welcomes you to the 7-day Ganpati celebration.', 'OM SAI MITRA MANDAL तुम्हाला ७ दिवसांच्या गणपती उत्सवात स्वागत करतो.', 'important', true);
