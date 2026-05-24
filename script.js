/* ─────────────────────────────────────────────────────────
   ARIA — Minimal Halo · script.js
   Full Apple Music–inspired player engine
───────────────────────────────────────────────────────── */
 
'use strict';
 
/* ══════════════════════════════════════════════════════════
   1. DATA — Playlists & Songs
══════════════════════════════════════════════════════════ */
 
const PLAYLISTS = [
  { id: 'telugu-essential', name: 'Telugu Essentials',    emoji: '🎭', color: '#e74c3c' },
  { id: 'hindi-essential',  name: 'Hindi Essentials',     emoji: '🎪', color: '#e67e22' },
  { id: 'telugu-hits',      name: 'Telugu Hit Songs',     emoji: '🌟', color: '#f39c12' },
  { id: 'telugu-melody',    name: 'Telugu Melody Mix',    emoji: '🌸', color: '#2ecc71' },
  { id: 'arijit',           name: 'Arijit Singh Essentials', emoji: '🎤', color: '#3498db' },
  { id: 'sid-sriram',       name: 'Sid Sriram Hits',      emoji: '✨', color: '#9b59b6' },
  { id: 'trending',         name: 'Trending Now',         emoji: '🔥', color: '#e74c3c' },
  { id: 'chill',            name: 'Chill Vibes',          emoji: '🌊', color: '#1abc9c' },
  { id: 'workout',          name: 'Workout Mix',          emoji: '💪', color: '#e67e22' },
  { id: 'romantic',         name: 'Romantic Songs',       emoji: '💕', color: '#e91e63' },
];
 
const SONGS = [
  // Telugu Essentials
  { id:1,  title: 'Samajavaragamana',  artist: 'Sid Sriram',       album: 'Ala Vaikunthapurramuloo',   cover:'public/ala.jpg', duration: 228, playlist: 'telugu-essential',   src:'public/samajavaragamana.mp3', lyrics: LYRICS_SAMAJAVARA() },
  { id:2,  title: 'Butta Bomma',       artist: 'Armaan Malik',     album: 'Ala Vaikunthapurramuloo', cover:'public/ala.jpg', duration: 191, playlist: 'telugu-essential',   src:'public/Buttabomma.mp3', lyrics: LYRICS_BUTTABOMMA() },
  { id:3,  title: 'Ramuloo Ramulaa',   artist: 'Mangli & Anurag',  album: 'Ala Vaikunthapurramuloo', cover:'public/ala.jpg', duration: 243, playlist: 'telugu-essential',  src:'public/Ramuloo Ramula.mp3', lyrics: LYRICS_RAMULOO() },
  { id:4,  title: 'Naatu Naatu',       artist: 'Rahul Sipligunj',  album: 'RRR',                   cover:'public/rrr.webp', duration: 201, playlist: 'telugu-essential',  src:'public/Naatu-Naatu.mp3', lyrics: LYRICS_NAATU() },
  
  // Hindi Essentials
  { id:5,  title: 'Tum Hi Ho',         artist: 'Arijit Singh',     album: 'Aashiqui 2',             cover:'public/tum.jpg',  duration: 261, playlist: 'hindi-essential',  src:'public/tum.mp3', lyrics: LYRICS_TUMHIHO() },
  { id:6,  title: 'Channa Mereya',     artist: 'Arijit Singh',     album: 'Ae Dil Hai Mushkil',     cover:'public/ae dil.webp', duration: 289, playlist: 'hindi-essential', src:'public/Channa Mereya.mp3',lyrics: LYRICS_CHANNA() },
  { id:7,  title: 'Kesariya',          artist: 'Arijit Singh',     album: 'Brahmastra',             cover:'public/Kesariya.jpg',duration: 268, playlist: 'arijit',         src:'public/Kesariya.mp3', lyrics: LYRICS_KESARIYA() },
  { id:8,  title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal',    album: 'Shershaah',              cover:'public/raataan.jpg', duration: 230, playlist: 'hindi-essential',src:'public/Raataan Lambiyan.mp3', lyrics: LYRICS_RAATAAN() },
  { id:9, title: 'Tera Ban Jaunga',   artist: 'Akhil & Tulsi Kumar', album: 'Kabir Singh',         cover:'public/tera.jpg', duration: 236, playlist: 'romantic',     src:'public/tera.mp3',   lyrics: LYRICS_TERA_BAN_JAUNGA() },
  // Arijit Singh
  { id:10, title: 'Hawayein',          artist: 'Arijit Singh',     album: 'Jab Harry Met Sejal',    cover:'public/hawayein.webp', duration: 289, playlist: 'arijit', src:'public/Hawayein.mp3',         lyrics: LYRICS_HAWAYEIN() },
  { id:11, title: 'Agar Tum Saath Ho', artist: 'Arijit Singh',     album: 'Tamasha',                cover:'public/agar.jpg', duration: 341, playlist: 'arijit', src:'public/Agar Tum Saath Ho.mp3',        lyrics: LYRICS_AGAR_TUM_SAATH_HO() },
  { id:12, title: 'Ae Dil Hai Mushkil',artist: 'Arijit Singh',     album: 'ADHM',                  cover:'public/channa.webp', duration: 268, playlist: 'arijit', src:'public/Ae Dil Hai Mushkil.mp3',         lyrics: LYRICS_AE_DIL_HAI_MUSHKIL() },
  // Sid Sriram
  { id:13, title: 'Dooram Karigina',         artist: 'Sid Sriram',       album: 'Sid Sriram',             cover:'public/dooram.webp', duration: 241, playlist: 'sid-sriram', src:'public/Dooram Karigina.mp3',     lyrics: LYRICS_DOORAM_KARIGINA() },
  { id:14, title: 'Kannaane Kannaane', artist: 'Sid Sriram',       album: 'Soorarai Pottru',        cover:'public/Kannaana.jpg', duration: 270, playlist: 'sid-sriram', src:'public/Kannaana Kanney.mp3',     lyrics: LYRICS_KANNAANA() },
  // Trending / Chill / Workout
  { id:15, title: 'Calm Down',         artist: 'Rema & Selena G',  album: 'Rave & Roses',           cover:'public/calm down.jpeg', duration: 240, playlist: 'trending', src:'public/clam down.mp3',       lyrics: LYRICS_CALM_DOWN() },
  { id:16, title: 'Levitating',        artist: 'Dua Lipa',         album: 'Future Nostalgia',       cover:'public/levitating1.jpeg', duration: 203, playlist: 'chill',  src:'public/Levitating.mp3',         lyrics: LYRICS_LEVITATING() },
  { id:17, title: 'Blinding Lights',   artist: 'The Weeknd',       album: 'After Hours',           cover:'public/blind.jpg', duration: 200, playlist: 'workout',src:'public/Blinding Lights.mp3',         lyrics: LYRICS_BLINDING_LIGHTS() },
  { id:18, title: 'Peaches',           artist: 'Justin Bieber',    album: 'Justice',                cover:'public/peaches.jpg', duration: 198, playlist: 'chill',  src:'public/peaches.mp3',         lyrics:LYRICS_PEACHES() },
  { id:19, title: 'Save Your Tears',   artist: 'The Weeknd',       album: 'After Hours',            cover:'public/save the tears.jpg', duration: 215, playlist: 'romantic', src:'public/Save Your Tears.mp3',       lyrics:LYRICS_SAVE_YOUR_TEARS() },
];
 
/* ── LYRICS GENERATORS ─────────────────────────────────── */
   function LYRICS_SAMAJAVARA() {
  return [
    {time:0, text:'♪ Instrumental Intro...'},
    
    {time:12, text:'Nee kaallani pattuku vadalanannavi'},
    {time:20, text:'Choode naa kallu'},
    
    {time:28, text:'Aa choopulanalla thokkuku vellaku'},
    {time:36, text:'Dayaledha asalu'},
    
    {time:45, text:'Nee kallaki kaavaali'},
    {time:52, text:'Kaasthaaye kaatukala naa kalalu'},
    
    {time:61, text:'Nuvvu nulumuthunte yerraga kandi'},
    {time:69, text:'Chindhene segalu'},
    
    {time:78, text:'Naa oopiri gaaliki'},
    {time:85, text:'Uyyaalalooguthu unte mungurulu'},
    
    {time:94, text:'Nuvvu nettesthe ela nittoorchavatte'},
    {time:102, text:'Nishtoorapu vilavilalu'},
    
    {time:112, text:'Samajavaragamana'},
    {time:120, text:'Ninu choosi aaga galana'},
    
    {time:129, text:'Manasu meeda vayasu kunna'},
    {time:137, text:'Adupu cheppa thaguna'},
    
    {time:147, text:'Samajavaragamana'},
    {time:155, text:'Ninu choosi aaga galana'},
    
    {time:164, text:'Manasu meeda vayasu kunna'},
    {time:172, text:'Adupu cheppa thaguna'},
    
    {time:182, text:'♪ Instrumental Bridge...'},
    
    {time:194, text:'Mallela maasama'},
    {time:200, text:'Manjula haasama'},
    
    {time:206, text:'Prathi malupulona'},
    {time:212, text:'Yeduru padina vannela vanamaa'},
    
    {time:218, text:'Virisina pinchamaa'},
    {time:223, text:'♪ Outro...'}
  ];
}
function LYRICS_TUMHIHO() {
  return [
    { time: 0, text: '♪ Instrumental...' },

    { time: 8, text: 'Hum tere bin ab reh nahi sakte' },
    { time: 16, text: 'Tere bina kya wajood mera' },

    { time: 24, text: 'Hum tere bin ab reh nahi sakte' },
    { time: 32, text: 'Tere bina kya wajood mera' },

    { time: 40, text: 'Tujh se juda agar ho jaayenge' },
    { time: 49, text: 'To khud se hi ho jaayenge juda' },

    { time: 58, text: 'Kyun ki Tum hi ho, ab tum hi ho' },
    { time: 67, text: 'Zindagi ab tum hi ho' },
    { time: 75, text: 'Chain bhi, mera dard bhi' },
    { time: 83, text: 'Meri aashiqui ab tum hi ho' },

    { time: 94, text: 'Tera mera rishta hai kaisa' },
    { time: 102, text: 'Ek pal door gawara nahi' },
    { time: 110, text: 'Tere liye har roz hain jeete' },
    { time: 118, text: 'Tujhko diya mera waqt sabhi' },

    { time: 128, text: 'Koi lamha mera na ho tere bina' },
    { time: 137, text: 'Har saans pe naam tera' },

    { time: 146, text: 'Kyun ki tum hi ho, ab tum hi ho' },
    { time: 155, text: 'Zindagi ab tum hi ho' },
    { time: 163, text: 'Chain bhi, mera dard bhi' },
    { time: 171, text: 'Meri aashiqui ab tum hi ho' },

    { time: 181, text: 'Tum hi ho, tumhi ho' },

    { time: 192, text: 'Tere liye hi jiyaa main' },
    { time: 200, text: 'Khud ko jo yoon de diya hai' },
    { time: 209, text: 'Teri wafaa ne mujhko sambhala' },
    { time: 218, text: 'Saare gamon ko dil se nikaala' },

    { time: 228, text: 'Tere sath mera hai naseeb judaa' },
    { time: 237, text: 'Tujhe paa ke adhoora na raha' },

    { time: 246, text: 'Hmm Kyun ki Tum hi ho, ab tum hi ho' },
    { time: 254, text: 'Zindagi ab tum hi ho' },

    { time: 261, text: '♪ Outro...' }
  ];
}
function LYRICS_BUTTABOMMA() {
  return [
    {time:0, text:'Inthakana manchi polikedi'},
    {time:5, text:'Naku thattaledu gaani ammu'},
    {time:10, text:'Ee love anedi bubble-u gum-u'},
    {time:15, text:'Antukunadhante podhu nammu'},

    {time:20, text:'Mundu nunchi andarana maate gaani'},
    {time:25, text:'Malli antunnane ammu'},
    {time:30, text:'Idhi chepakunda vache thummo'},
    {time:35, text:'Premanaapaleru nannu nammu'},

    {time:40, text:'Yetaga anai yeduru choopu ki'},
    {time:45, text:'Thaginattuga nuvvu badhulu chebithivai'},
    {time:50, text:'Ori devuda idhendhanentha lopate'},
    {time:55, text:'Pilladanta degarai nannu cheradhistivae'},

    {time:60, text:'Buttabomma buttabomma'},
    {time:65, text:'Nannu suttukuntive'},
    {time:70, text:'Zindagi ke atabommai'},
    {time:75, text:'Janta kattu kuntive'},

    {time:80, text:'Buttabomma buttabomma'},
    {time:85, text:'Nannu suttukuntive'},
    {time:90, text:'Zindagi ke atabommai'},
    {time:95, text:'Janta kattu kuntive'},

    {time:100, text:'Multiplex loni audience laga'},
    {time:105, text:'Mounamguna gaani ammu'},
    {time:110, text:'Lona dandanaka jariginde nammu'},
    {time:115, text:'Dimma diriginaade mind sim-u'},

    {time:120, text:'Rajula kaalam kaadhu'},
    {time:125, text:'Rathamo gurran levu'},
    {time:130, text:'Addham mundara natho nene'},
    {time:135, text:'Yudham chestaante'},

    {time:140, text:'Gaajula chethulu jaapi'},
    {time:145, text:'Deggarakochina nuvvu'},
    {time:150, text:'Chepallo chitikesi'},
    {time:155, text:'Chakkaravarthini chesave'},

    {time:160, text:'Chinnaga chinnkku thumparadigithe'},
    {time:165, text:'Kundapothaga tufaan thestive'},
    {time:170, text:'Maataga ho malle poovunadigithe'},
    {time:175, text:'Mutaga pula thotaga painochi padithive'},

    {time:180, text:'Buttabomma buttabomma'},
    {time:184, text:'Nannu suttukuntive'},
    {time:188, text:'♪ Outro...'}
  ];
}
function LYRICS_RAMULOO() {
  return [
    {time:0, text:'బంటు గానికి ట్వెంటీ టూ'},
    {time:5, text:'బస్తిల మస్తు కటౌటూ'},
    {time:10, text:'బచ్చగండ్ల బ్యాచ్ ఉండేదీ'},
    {time:15, text:'వచ్చినమంటే సుట్టు'},

    {time:20, text:'కిక్కే సాలక ఓ నైటు'},
    {time:25, text:'ఎక్కి దొక్కు బుల్లెట్టు'},
    {time:30, text:'సంధు సందుల మందు కోసం'},
    {time:35, text:'ఎతుకుతంటే రౌటు'},

    {time:40, text:'సిల్కు చీర కట్టుకోని'},
    {time:45, text:'చిల్డూ బీరు మెరిసినట్టు'},
    {time:50, text:'పొట్లం కట్టిన బిర్యానీకీ'},
    {time:55, text:'బొట్టు బిల్లా పెట్టినట్టు'},

    {time:60, text:'బంగ్ల మీద నించొనుందిరో'},
    {time:65, text:'ఓ సందమామ'},
    {time:70, text:'సుక్క తగక చెక్కరోచరో'},
    {time:75, text:'ఏం అందం మామ'},

    {time:80, text:'జింకలేక ధుంకుతుంటేరో'},
    {time:85, text:'ఆ సందమావా'},
    {time:90, text:'జున్కి జారి చిక్కుకున్నదిరో నా'},
    {time:95, text:'ధిలుక్కు మావా'},

    {time:100, text:'రాములో రాములా'},
    {time:105, text:'నన్ను ఆగం చేసిందిరో'},
    {time:110, text:'రాములో రాములా'},
    {time:115, text:'నా పణం తీసిందిరా'},

    {time:120, text:'రాములో రాములా'},
    {time:125, text:'నన్ను ఆగం చేసిందిరో'},
    {time:130, text:'రాములో రాములా'},
    {time:135, text:'నా పణం తీసిందిరా'},

    {time:140, text:'హే తమ్మలపాకే ఇస్తుంటే'},
    {time:145, text:'కమ్మగా వాసన వస్తావే'},
    {time:150, text:'ఎర్రగా పండిన బుగ్గలు రెండు'},
    {time:155, text:'ఎదికి వస్తాయే'},

    {time:160, text:'అరే పువ్వుల అంగీ ఇస్తుంటే'},
    {time:165, text:'గుండి నువ్వై పోస్తావే'},
    {time:170, text:'పండుకున్న గుండెలో దూరి'},
    {time:175, text:'లొల్లే చేస్తావే'},

    {time:180, text:'అరే ఇంటు ముందు లైటు'},
    {time:185, text:'మినుకు మినుకు మంటంటే'},
    {time:190, text:'నువ్వు కన్ను కొట్టినట్టు సిగ్గుపుట్టిందే'},
    {time:195, text:'సీరకొంగ తలుపు సాటు చిక్కుకుంటంటే'},

    {time:200, text:'నువ్వు లాగినట్టు వొళ్ళు జల్లు మంటందే'},
    {time:205, text:'నాగస్వరం ఊదుతుంటే నాగుపాము ఉగినట్టు'},
    {time:210, text:'ఎంతపడి వస్తున్నానే'},
    {time:215, text:'పట్టగొలుసు సప్పుడింటూ'},

    {time:220, text:'పట్టినట్టు తిరుగుతున్నావే'},
    {time:225, text:'ఓ సందమావా'},
    {time:230, text:'పక్కకు పోయి తొంగిచూస్తావే'},
    {time:235, text:'ఏం తిక్కురా మావా'},

    {time:240, text:'♪ Outro...'}
  ];
}
function LYRICS_NAATU() {
  return [
    {time:0, text:'పొలం గట్టు దుమ్ములోన'},
    {time:5, text:'పోట్ల గిత్త దూకినట్టు'},
    {time:10, text:'పోలేరమ్మ జాతరలో'},
    {time:15, text:'పోతరాజు ఊగినట్టు'},

    {time:20, text:'కిర్రు సెప్పులేసుకుని'},
    {time:25, text:'కర్రసాము సేసినట్టు'},
    {time:30, text:'మర్రిసెట్టు నీడలోన'},
    {time:35, text:'కుర్రగుంపు కూడినట్టు'},

    {time:40, text:'ఎర్రజొన్న రొట్టెలోన'},
    {time:45, text:'మిరప తొక్కు కలిపినట్టు'},
    {time:50, text:'నా పాట సూడు'},
    {time:55, text:'నా పాట సూడు'},

    {time:60, text:'నా పాట సూడు'},
    {time:65, text:'నాటు నాటు నాటు'},
    {time:70, text:'నాటు నాటు నాటు వీర నాటు'},
    {time:75, text:'నాటు నాటు నాటు'},

    {time:80, text:'నాటు నాటు నాటు ఊర నాటు'},
    {time:85, text:'నాటు నాటు నాటు'},
    {time:90, text:'పచ్చి మిరప లాగ పిచ్చ నాటు'},
    {time:95, text:'నాటు నాటు నాటు'},

    {time:100, text:'విచ్చు కత్తి లాగ వెర్రి నాటు'},
    {time:105, text:'గుండెలదిరిపోయేలా'},
    {time:110, text:'డండనకర మోగినట్టు'},
    {time:115, text:'సెవులు సిల్లు పడేలా'},

    {time:120, text:'కీసు పిట్ట కూసినట్టు'},
    {time:125, text:'ఏలు సిటికెలేసేలా'},
    {time:130, text:'యవ్వారం సాగినట్టు'},
    {time:135, text:'కాలు సిందు తొక్కేలా'},

    {time:140, text:'దుమారం రేగినట్టు'},
    {time:145, text:'ఒల్లు సెమటపట్టేలా'},
    {time:150, text:'వీరంగం సేసినట్టు'},
    {time:155, text:'నా పాట సూడు'},

    {time:160, text:'నా పాట సూడు'},
    {time:165, text:'నా పాట సూడు'},
    {time:170, text:'నాటు నాటు నాటు'},
    {time:175, text:'నాటు నాటు నాటు వీర నాటు'},

    {time:180, text:'నాటు నాటు నాటు'},
    {time:185, text:'నాటు నాటు నాటు ఊర నాటు'},
    {time:190, text:'నాటు నాటు గడ్డపార లాగ చెడ్డ నాటు'},
    {time:195, text:'నాటు నాటు ఉక్కపోత లాగ తిక్క నాటు'},

    {time:200, text:'♪ Outro...'}
  ];
}
function LYRICS_CHANNA() {
  return [
    {time:0, text:'अच्छा चलता हूँ दुआओं में याद रखना'},
    {time:6, text:'मेरे ज़िकर का ज़ुबां पे स्वाद रखना'},
    {time:12, text:'अच्छा चलता हूँ दुआओँ में याद रखना'},
    {time:18, text:'मेरे ज़िकर का ज़ुबां पे स्वाद रखना'},

    {time:24, text:'दिल के संदूकों में मेरे अच्छे काम रखना'},
    {time:30, text:'चिट्टी तारों में भी मेरा तू सलाम रखना'},
    {time:36, text:'अँधेरा तेरा'},
    {time:42, text:'मैंने ले लिया मेरा उजला सितारा तेरे नाम किया'},

    {time:50, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:57, text:'चन्ना मेरेया मेरेया बेलिया ओ पिया'},
    {time:64, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:71, text:'चन्ना मेरेया मेरेया बेलिया ओ पिया'},

    {time:78, text:'ओ ओ ओ ओ पिया आ आ आ'},
    {time:84, text:'पिया पिया'},
    {time:89, text:'ओ पिया उ उ उ उ'},
    {time:95, text:'हम्म महफ़िल में तेरी'},

    {time:101, text:'हम न रहें जो ग़म तो नहीं है'},
    {time:107, text:'ग़म तो नहीं है'},
    {time:112, text:'क़िस्से हमारे नज़दीकियों के'},
    {time:118, text:'कम तो नहीं हैं कम तो नहीं हैं'},

    {time:124, text:'कितनी दफ़ा'},
    {time:129, text:'सुबहा को मेरी तेरे आँगन में बैठे मैंने शाम किया'},
    {time:137, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:144, text:'चन्ना मेरेया मेरेया बेलिया ओ पीया'},

    {time:151, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:158, text:'चन्ना मेरेया मेरेया बेलिया ओ पीया'},
    {time:165, text:'ओ पीया ओ पीया'},
    {time:170, text:'चन्ना मेरेया मेरेया'},

    {time:176, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:183, text:'ओ पीया'},
    {time:188, text:'चन्ना मेरेया मेरेया चन्ना मेरेया मेरेया'},
    {time:195, text:'चन्ना मेरेया मेरेया ओ पीया'},

    {time:202, text:'तेरे रुख से अपना रास्ता'},
    {time:208, text:'मोड़ के चला आ आ आ'},
    {time:214, text:'चन्दन हूँ मैं अपनी खुशबू'},
    {time:220, text:'छोड़ के चला'},

    {time:226, text:'मन की माया रख के तेरे'},
    {time:232, text:'तकिये तले'},
    {time:237, text:'बैरागी बैरागी का सूती चौला'},
    {time:244, text:'ओढ़ के चला'},

    {time:250, text:'चन्ना मेरेया मेरेया'},
    {time:256, text:'चन्ना मेरेया मेरेया'},
    {time:262, text:'चन्ना मेरेया मेरेया ओ पिया'},
    {time:270, text:'♪ Outro...'}

  ];
}
function LYRICS_KESARIYA() {
  return [
    {time:0, text:'Mujhko itna bataaye koyi'},
    {time:6, text:'Kaise tujh se dil na lagaaye koyi'},
    {time:12, text:'Rabba ne tujhko banaane mein'},
    {time:18, text:'Kar di hain husn ki khali tijoriyaan'},

    {time:24, text:'Kaajal ki siyaahi se likhi'},
    {time:30, text:'Hain tune jaane kitno ki love storiyan'},
    {time:36, text:'Kesariya tera ishq hai, piya'},
    {time:42, text:'Rang jaaun jo main haath lagaaun'},

    {time:48, text:'Din beete saara teri fikr mein'},
    {time:54, text:'Rain saari teri khair manaaun'},
    {time:60, text:'Kesariya tera ishq hai, piya'},
    {time:66, text:'Rang jaaun jo main haath lagaaun'},

    {time:72, text:'Din beete saara teri fikr mein'},
    {time:78, text:'Rain saari teri khair manaaun'},
    {time:84, text:'Patjhad ke mausam mein bhi rangi chanaaron jaisi'},
    {time:92, text:'Jhanke sannaaton mein tu veena ke taaron jaisi'},

    {time:100, text:'Mmm, sadiyon se bhi lambi ye mann ki amaavasein hain'},
    {time:108, text:'Aur tu phuljhadiyon waale tyohaaron jaisi'},
    {time:116, text:'Chanda bhi deewaana hai tera'},
    {time:122, text:'Jalti hain tujhse saari chakoriyaan'},

    {time:128, text:'Kaajal ki siyaahi se likhi'},
    {time:134, text:'Hain tune jaane kitnon ki love storiyan'},
    {time:140, text:'Kesariya tera ishq hai, piya'},
    {time:146, text:'Rang jaaun jo main haath lagaaun'},

    {time:152, text:'Din beete saara teri fikr mein'},
    {time:158, text:'Rain saari teri khair manaaun'},
    {time:164, text:'Kesariya tera ishq hai, piya'},
    {time:170, text:'Rang jaaun jo main haath lagaaun'},

    {time:176, text:'Din beete saara teri fikr mein'},
    {time:182, text:'Rain saari teri khair manaaun'},
    {time:188, text:'Kesariya tera ishq hai, piya, ishq hai, piya'},
    {time:196, text:'Kesariya tera ishq hai, piya, ishq hai, piya'},

    {time:204, text:'Piya, ishq hai, piya, ishq hai, piya'},
    {time:212, text:'Kesariya tera ishq hai, piya'},
    {time:220, text:'Rang jaaun jo main haath lagaaun'},
    {time:228, text:'♪ Instrumental...'},

    {time:240, text:'Kesariya tera ishq hai, piya'},
    {time:248, text:'Rang jaaun jo main haath lagaaun'},
    {time:256, text:'♪ Outro...'}
  ];
}
function LYRICS_RAATAAN() {
  return [
    {time:0, text:'Teri Meri Gallan Ho Gayi Mashhoor'},
    {time:8, text:'Kar Na Kabhi Tu Mujhe Nazron Se Door'},
    {time:16, text:'Kithe Chali Ae Tu Kithe Chali Ae Tu'},
    {time:24, text:'Kithe Chali Ae Kithe Chali Ae'},

    {time:32, text:'Jaanda Ae Dil Yeh Toh Jaandi Ae Tu'},
    {time:40, text:'Tere Bin Main Na Rahun Mere Bina Tu'},
    {time:48, text:'Kithe Chali Ae Tu Kithe Chali Ae Tu'},
    {time:56, text:'Kithe Chali Ae, Jaan Chali Ae'},

    {time:64, text:'Kaatun Kaise Raatan Oh Saawre?'},
    {time:72, text:'Jiya Nahi Jaata Sunn Baawre?'},

    {time:80, text:'Ke Raataan Lambiyan Lambiyan Re'},
    {time:88, text:'Kate Tere Sangeyan Sangeyan Re'},
    {time:96, text:'Ke Raatan Lambiyan Lambiyan Re'},
    {time:104, text:'Kate Tere Sangeyan Sangeyan Re'},

    {time:112, text:'Cham Cham Cham Ambran De Taare'},
    {time:120, text:'Kehnde Ne Sajjna'},
    {time:128, text:'Tu Hi Chan Mere Is Dil Da'},
    {time:136, text:'Mann Le Ve Sajjna'},

    {time:144, text:'Tere Bina Mera Howe Na Guzara'},
    {time:152, text:'Chhad Ke Na Jawin Mainu'},
    {time:160, text:'Tu Hi Hai Sahara'},

    {time:168, text:'Kaatun Kaise Raatan Oh Saawre?'},
    {time:176, text:'Jiya Nahi Jaata Sunn Baawre?'},

    {time:184, text:'Ke Raatan Lambiyan Lambiyan Re'},
    {time:192, text:'Kate Tere Sangeyan Sangeyan Re'},
    {time:200, text:'Ke Raataan Lambiyan Lambiyan Re'},
    {time:208, text:'Kate Tere Sangeyan Sangeyan Re'},

    {time:216, text:'Teri Meri Gallan Ho Gayi Mashhoor'},
    {time:223, text:'Kar Na Kabhi Tu Mainu Nazron Se Door'}
  ];
}
function LYRICS_TERA_BAN_JAUNGA() {
  return [
    {time:0, text:'मेरी राहें तेरे तक हैं'},
    {time:8, text:'तुझपे ही तो मेरा हक़ है'},
    {time:16, text:'इश्क़ मेरा तू बेशक़ है'},
    {time:24, text:'तुझपे ही तो मेरा हक़ है'},

    {time:32, text:'साथ छोड़ूँगा ना तेरे पीछे आऊँगा'},
    {time:40, text:'छीन लूँगा या खुदा से माँग लाउँगा'},
    {time:48, text:'तेरे नाल तक़दीरां लिखवाउंगा'},

    {time:56, text:'मैं तेरा बन जाऊँगा'},
    {time:64, text:'मैं तेरा बन जाऊँगा'},

    {time:72, text:'सोंह तेरी मैं क़सम यही खाऊँगा'},
    {time:80, text:'कित्ते वादेया नू उमरा निभाऊँगा'},
    {time:88, text:'तुझे हर वारी अपना बनाऊँगा'},

    {time:96, text:'मैं तेरा बन जाऊँगा'},
    {time:104, text:'मैं तेरा बन जाऊँगा'},

    {time:112, text:'रा रा रा रा रा रा'},
    {time:118, text:'ओह ये ये ये'},
    {time:124, text:'रा रा रा रा रा रा'},
    {time:130, text:'ओह ये ये ये'},

    {time:136, text:'लखाँ तों जुदा मैं हुई तेरे ख़ातिर'},
    {time:144, text:'तू ही मंज़िल दिल तेरा मुसाफ़िर'},
    {time:152, text:'लखाँ तों जुदा मैं हुई तेरे ख़ातिर'},
    {time:160, text:'तू ही मंज़िल मैं तेरा मुसाफ़िर'},

    {time:168, text:'रब नू भुला बेठा तेरे करके'},
    {time:176, text:'मैं हो गया काफ़िर'},

    {time:184, text:'तेरे लिए मैं जहाँ से टकराऊँगा'},
    {time:192, text:'सब कुछ खोके तुझको ही पाउँगा'},
    {time:200, text:'दिल बन के दिल धडकाऊँगा'},

    {time:208, text:'मैं तेरा बन जाऊँगा'},
    {time:216, text:'मैं तेरा बन जाऊँगा'},

    {time:224, text:'सोंह तेरी मैं क़सम यही खाऊँगा'},
    {time:230, text:'कित्ते वादेया नू मैं निभाऊँगा'}
  ];
}
function LYRICS_HAWAYEIN() {
  return [
    {time:0, text:'तुझको मैं रख लूं वहाँ'},
    {time:8, text:'जहां पे कहीं है मेरा यकीन'},
    {time:16, text:'मैं जो तेरा ना हुआ'},
    {time:24, text:'किसी का नहीं किसी का नहीं'},

    {time:32, text:'ले जाए जाने कहाँ'},
    {time:40, text:'हवाएं हवाएं'},
    {time:48, text:'ले जाये तुझे कहाँ'},
    {time:56, text:'हवाएं हवाएं'},

    {time:64, text:'बेगानी है ये बाघी'},
    {time:72, text:'हवाएं हवाएं'},
    {time:80, text:'ले जाए मुझे कहाँ'},
    {time:88, text:'हवाएं हवाएं'},

    {time:96, text:'ले जाए जाने कहाँ'},
    {time:104, text:'ना मुझको खबर'},
    {time:112, text:'ना तुझको पता'},
    {time:120, text:'ओ ओ ओ ओ'},

    {time:128, text:'बनाती है जो तू वो यादें'},
    {time:136, text:'जाने संग मेरे कब तक चले'},
    {time:144, text:'इन्ही में तो मेरी'},
    {time:152, text:'सुबह भी ढले'},

    {time:160, text:'शामें ढले मौसम ढले'},
    {time:168, text:'ख्यालों का शहर तू जाने'},
    {time:176, text:'तेरे होने से ही आबाद है'},

    {time:184, text:'हवाएँ हक में वही है'},
    {time:192, text:'आते जाते जो तेरा नाम ले'},
    {time:200, text:'देती है जो सदायें हवाएं हवाएं'},
    {time:208, text:'न जाने क्या बताएँ हवाएं हवाएं'},

    {time:216, text:'ले जाए तुझे कहाँ'},
    {time:224, text:'हवाएं हवाएं'},
    {time:232, text:'ले जाए मुझे कहाँ'},
    {time:240, text:'हवाएं हवाएं'},

    {time:248, text:'चेहरा क्यूँ मिलता तेरा'},
    {time:256, text:'यूँ ख़्वाबों से मेरे'},
    {time:264, text:'तेरी है मेरी सारी वफ़ाएँ'},
    {time:272, text:'मांगी हे तेरे लिए दुआएँ'},

    {time:280, text:'ओ ओ ओ ओ ओ ओ ओ'}
  ];
}
function LYRICS_AGAR_TUM_SAATH_HO() {
  return [
    {time:0, text:'पल भर ठहर जाओ'},
    {time:10, text:'दिल ये संभल जाये'},
    {time:20, text:'कैसे तुम्हें रोका करूँ'},
    {time:30, text:'मेरी तरफ आता'},
    {time:40, text:'हर गम फिसल जाये'},
    {time:50, text:'आँखों में तुम को भरूं'},

    {time:60, text:'बिन बोले बातें तुमसे करूँ'},
    {time:70, text:'अगर तुम साथ हो'},
    {time:80, text:'अगर तुम साथ हो'},

    {time:90, text:'बहती रहती'},
    {time:100, text:'नहर नदिया सी तेरी दुनिया में'},
    {time:110, text:'मेरी दुनिया है तेरी चाहतो में'},
    {time:120, text:'मैं ढल जाती हूँ तेरी आदतो में'},
    {time:130, text:'अगर तुम साथ हो'},

    {time:140, text:'तेरी नजरों में है तेरे सपने'},
    {time:150, text:'तेरे सपनों में है नाराजी'},
    {time:160, text:'मुझे लगता है के बातें दिल की'},
    {time:170, text:'होती लफ्जों की धोखेबाजी'},

    {time:180, text:'तुम साथ हो या ना हो'},
    {time:190, text:'क्या फर्क है'},
    {time:200, text:'बेदर्द थी जिन्दगी बेदर्द है'},
    {time:210, text:'अगर तुम साथ हो'},
    {time:220, text:'अगर तुम साथ हो'},

    {time:230, text:'पलकें झपकते ही'},
    {time:240, text:'दिन ये निकल जाए'},
    {time:250, text:'बैठी बैठी भागी फिरूँ'},
    {time:260, text:'मेरी तरफ आता'},
    {time:270, text:'हर गम फिसल जाए'},
    {time:280, text:'आँखों में तुम को भरूं'},

    {time:290, text:'बिन बोले बातें तुमसे करूँ'},
    {time:300, text:'अगर तुम साथ हो'},
    {time:310, text:'अगर तुम साथ हो'},

    {time:320, text:'दिल ये संभल जाये'},
    {time:327, text:'अगर तुम साथ हो'},
    {time:334, text:'हर गम फिसल जाये'}
  ];
}
function LYRICS_AE_DIL_HAI_MUSHKIL() {
  return [
    {time:0, text:'Tu safar mera'},
    {time:8, text:'Hai tu hi meri manzil'},
    {time:16, text:'Tere bina guzara'},
    {time:24, text:'Ae dil hai mushkil'},

    {time:32, text:'Tu mera khuda'},
    {time:40, text:'Tu hi duaa mein shaamil'},
    {time:48, text:'Tere bina guzara'},
    {time:56, text:'Ae dil hai mushkil'},

    {time:64, text:'Mujhe aazmaati hai teri kami'},
    {time:72, text:'Meri har kami ko hai tu laazmi'},
    {time:80, text:'Junoon hai mera'},
    {time:88, text:'Banoon main tere qaabil'},
    {time:96, text:'Tere bina guzaara'},
    {time:104, text:'Ae Dil Hai Mushkil'},

    {time:112, text:'Yeh rooh bhi meri'},
    {time:120, text:'Yeh jism bhi mera'},
    {time:128, text:'Utna mera nahi'},
    {time:136, text:'Jitna hua tera'},

    {time:144, text:'Tune diya hai jo'},
    {time:152, text:'Woh dard hi sahi'},
    {time:160, text:'Tujhse mila hai toh'},
    {time:168, text:'Inaam hai mera'},

    {time:176, text:'Mera aasmaan dhoondhe teri zameen'},
    {time:184, text:'Meri har kami ko hai tu laazmi'},

    {time:192, text:'Zameen pe na sahi'},
    {time:200, text:'Toh aasmaan mein aa mil'},
    {time:208, text:'Tere bina guzara'},
    {time:216, text:'Ae dil hai mushkil'},

    {time:224, text:'Maana ki teri maujoodgi se'},
    {time:232, text:'Ye zindagani mehroom hai'},
    {time:240, text:'Jeene ka koi dooja tareeka'},
    {time:248, text:'Na mere dil ko maaloom hai'},

    {time:256, text:'Adhura hoke bhi'},
    {time:262, text:'Hai ishq mera kaamil'}
  ];
}
function LYRICS_DOORAM_KARIGINA() {
  return [
    {time:0, text:'దూరం కరిగినా మది మౌనం కరుగునా'},
    {time:10, text:'తీపి తీపి మాటలెన్నో పెదవి దాటుతున్నా'},
    {time:20, text:'గుండెలోని తీపి భావం చెప్పలేనిదేనా'},

    {time:30, text:'దూరం కరిగినా మౌనం కరుగునా'},
    {time:40, text:'మౌనం కరిగినా అభిమానం కరుగునా'},
    {time:50, text:'కొంటె కొంటె చూపులెన్నో రెప్ప గడప దాటుతున్నా'},

    {time:60, text:'గుండెలోన ఉన్న ప్రేమ చూపలేనిదేనా'},
    {time:70, text:'నా కలలే సెలవే'},
    {time:80, text:'నీ కలలే కొలువే'},

    {time:90, text:'మూగ కడలై పొంగె మనసే మూగ అలలే ఎగసెనే'},
    {time:100, text:'మేఘమదిలో చినుకు వరసే కరిగి కురిసేదెపుడులే'},

    {time:110, text:'చిన్ని చిన్ని అడుగులెన్నో నువు వెళ్ళే దారిలోనా'},
    {time:120, text:'మధ్యానున్న అడ్డుగీత దాటలేనిదేనా'},

    {time:130, text:'నీ పిలుపే మధురం'},
    {time:140, text:'నీ తలపే కథనం'},

    {time:150, text:'తేనె ఉనికే ఏది అంటే పూవు ఎదలో స్థానమే'},
    {time:160, text:'నాకు ఉనికే ఏది అంటే నువ్వు నడిచే తీరమే'},

    {time:170, text:'కొత్త కొత్త రోజులన్నీ కాలమల్లి జల్లుతున్నా'},
    {time:180, text:'నువ్వు నేను అందులోన రేయి పగలమేనా'}
  ];
}
function LYRICS_KANNAANA() {
  return [
    {time:0, text:'Kannaana kanney kannaana kanney'},
    {time:8, text:'En meethu saaya vaa'},
    {time:16, text:'Punnana nenjai ponnana kaiyal'},
    {time:24, text:'Poo pola neeva vaa'},

    {time:32, text:'Naan kathu nindren'},
    {time:40, text:'Kaalangal thoorum'},
    {time:48, text:'En yeakkam thirumma'},

    {time:56, text:'Naan parthu nindren'},
    {time:64, text:'Ponvaanam engum'},
    {time:72, text:'En minnal thondruma'},

    {time:80, text:'Thaneerai megam thoorum'},
    {time:88, text:'Kanneer serum'},
    {time:96, text:'Karkandai maarumma'},

    {time:104, text:'Aaraariraaroo'},
    {time:112, text:'Raaroo raaroo aaraariraaroo'},
    {time:120, text:'Aaraariraaroo raaroo raaroo'},
    {time:128, text:'Aaraariraaroo'},

    {time:136, text:'Kannaana kanney kannaana kanney'},
    {time:144, text:'En meethu saaya vaa'},
    {time:152, text:'Punnana nenjai ponnana kaiyal'},
    {time:160, text:'Poo pola neeva vaa'},

    {time:168, text:'Alai kadalil naduve'},
    {time:176, text:'Alainthidava thaniye'},
    {time:184, text:'Padaganave unaiye parthen kanne'},

    {time:192, text:'Puthai manalil veezhunthu'},
    {time:200, text:'Puthainthadave irunthen'},
    {time:208, text:'Koorunagayai yerinthen'},
    {time:216, text:'Meettaai ennai'},

    {time:224, text:'Mayil ondre paarkiren'},
    {time:232, text:'Mazhaiyagi aadinen'},
    {time:240, text:'Intha urchagam pothum'},
    {time:248, text:'Saaga thondrum ithe vinaadi'},

    {time:256, text:'Nee thoogum bothu'},
    {time:262, text:'Un netri meethu muththangal vaikkanum'}
  ];
}
function LYRICS_CALM_DOWN() {
  return [
    {time:0, text:'Another banger'},
    {time:8, text:'Baby, calm down, calm down'},
    {time:16, text:'Girl, this your body e put my heart for lockdown'},
    {time:24, text:'For lockdown, oh, lockdown'},

    {time:32, text:'Girl, you sweet like Fanta o, Fanta o'},
    {time:40, text:'If I tell you say I love you, no dey form yanga o'},
    {time:48, text:'No tell me no, no, no, no'},
    {time:56, text:'Oh-oh-oh-oh-oh-oh-oh-oh-oh-oh-oh'},

    {time:64, text:'Baby, come gimme your lo-lo-lo-lo-lo-lo-lo-lo'},
    {time:72, text:'You got me like "Whoa-whoa-whoa-whoa-whoa"'},
    {time:80, text:'Shawty, come gimme your lo-lo-lo-lo-lo-lo-lo-lo'},

    {time:88, text:'I see this fine girl for my party, she wear yellow'},
    {time:96, text:'Every other girl, they dey do too much, but this girl mellow'},
    {time:104, text:'Finally, I find way to talk to the girl but she no wan follow'},

    {time:112, text:'Who you come dey form for?'},
    {time:120, text:'Why you no wan conform?'},
    {time:128, text:'Then I start to feel her bum-bum, warm'},
    {time:136, text:'But she dey gimme small-small'},

    {time:144, text:'I know say she sabi pass that one'},
    {time:152, text:'But she feeling insecure'},
    {time:160, text:'Go dey gum her like chewing gum'},

    {time:168, text:'Baby, calm down, calm down'},
    {time:176, text:'Girl, this your body e put my heart for lockdown'},
    {time:184, text:'Girl, you sweet like Fanta o, Fanta o'},

    {time:192, text:'As I reach my house, I say make I rest small'},
    {time:200, text:'As me I wake up, na she dey my mind'},
    {time:208, text:'Day one, day two, I no fit focus'},
    {time:216, text:'Na so me I call am, say make we link up'},

    {time:224, text:'Baby girl, if you leave me, I no go love again'},
    {time:232, text:'Because e get many girls wey put my heart for pain'}
  ];
}
function LYRICS_LEVITATING() {
  return [
    {time:0, text:'Billboard Baby, Dua Lipa make em dance when it come on'},
    {time:8, text:'Everybody lookin for a dance floor to run on'},
    {time:16, text:'If you wanna run away with me, I know a galaxy'},
    {time:24, text:'And I can take you for a ride'},

    {time:32, text:'I had a premonition that we fell into a rhythm'},
    {time:40, text:'Where the music dont stop for life'},
    {time:48, text:'Glitter in the sky, glitter in my eyes'},
    {time:56, text:'Shining just the way I like'},

    {time:64, text:'If youre feeling like you need a little bit of company'},
    {time:72, text:'You met me at the perfect time'},
    {time:80, text:'You want me, I want you, baby'},
    {time:88, text:'My sugarboo, Im levitating'},

    {time:96, text:'The Milky Way, were renegading'},
    {time:104, text:'Yeah, yeah, yeah, yeah, yeah'},
    {time:112, text:'I got you, moonlight, youre my starlight'},
    {time:120, text:'I need you all night, come on, dance with me'},

    {time:128, text:'Im levitating'},
    {time:136, text:'You, moonlight, youre my starlight'},
    {time:144, text:'I need you all night, come on, dance with me'},
    {time:152, text:'Im levitating'},

    {time:160, text:'Im one of the greatest, aint no debatin on it'},
    {time:168, text:'Im still levitatin, Im heavily medicated'},
    {time:176, text:'I gave em love, and they end up hatin on me'},
    {time:184, text:'She told me she love me, and shed been waitin'},

    {time:192, text:'Been fightin hard for your love'},
    {time:200, text:'Needed someone to hug'},
    {time:208, text:'You see what you got me out here doin'},
    {time:216, text:'Cant nobody stop the movement'},

    {time:224, text:'Lets go, left foot, right foot, levitatin'},
    {time:232, text:'Pop stars, Dua Lipa with DaBaby'},
    {time:240, text:'I had to lace my shoes for all the blessings'},
    {time:248, text:'If I ever slip, Ill fall into a better situation'},

    {time:256, text:'You want me, I want you, baby'},
    {time:264, text:'My sugarboo, Im levitating'},
    {time:272, text:'The Milky Way, were renegading'},
    {time:280, text:'I got you, moonlight, youre my starlight'},

    {time:288, text:'I need you all night, come on, dance with me'},
    {time:296, text:'Im levitating'}
  ];
}
function LYRICS_BLINDING_LIGHTS() {
  return [
    {time:0, text:'Yeah'},
    {time:8, text:'Ive been tryna call'},
    {time:16, text:'Ive been on my own for long enough'},
    {time:24, text:'Maybe you can show me how to love, maybe'},

    {time:32, text:'Im goin through withdrawals'},
    {time:40, text:'You dont even have to do too much'},
    {time:48, text:'You can turn me on with just a touch, baby'},
    {time:56, text:'I look around and'},

    {time:64, text:'Sin Citys cold and empty'},
    {time:72, text:'No ones around to judge me'},
    {time:80, text:'I cant see clearly when youre gone'},
    {time:88, text:'I said ooh, Im blinded by the lights'},

    {time:96, text:'No, I cant sleep until I feel your touch'},
    {time:104, text:'I said ooh, Im drowning in the night'},
    {time:112, text:'Oh, when Im like this, youre the one I trust'},
    {time:120, text:'Hey, hey, hey'},

    {time:128, text:'Im running out of time'},
    {time:136, text:'Cause I can see the sunlight up the sky'},
    {time:144, text:'So I hit the road in overdrive, baby'},
    {time:152, text:'The citys cold and empty'},

    {time:160, text:'No ones around to judge me'},
    {time:168, text:'I cant see clearly when youre gone'},
    {time:176, text:'I said ooh, Im blinded by the lights'},
    {time:184, text:'No, I cant sleep until I feel your touch'},

    {time:192, text:'I said ooh, Im drowning in the night'}
  ];
}
function LYRICS_PEACHES() {
  return [
    {time:0, text:'I got my peaches out in Georgia'},
    {time:8, text:'I get my weed from California'},
    {time:16, text:'I took my chick up to the North, yeah'},
    {time:24, text:'I get my light right from the source, yeah'},

    {time:32, text:'And I see you, the way I breathe you in'},
    {time:40, text:'Its the texture of your skin'},
    {time:48, text:'I wanna wrap my arms around you, baby'},
    {time:56, text:'Never let you go'},

    {time:64, text:'Theres nothing like your touch'},
    {time:72, text:'Its the way you lift me up'},
    {time:80, text:'And Ill be right here with you til the end'},
    {time:88, text:'I got my peaches out in Georgia'},

    {time:96, text:'I get my weed from California'},
    {time:104, text:'I took my chick up to the North, yeah'},
    {time:112, text:'I get my light right from the source, yeah'},

    {time:120, text:'You aint sure yet, but Im for ya'},
    {time:128, text:'All I could want, all I can wish for'},
    {time:136, text:'Nights alone that we miss more'},
    {time:144, text:'And days we save as souvenirs'},

    {time:152, text:'Theres no time, I wanna make more time'},
    {time:160, text:'And give you my whole life'},
    {time:168, text:'I left my girl, Im in Mallorca'},
    {time:176, text:'Hate to leave her, call it torture'},

    {time:184, text:'Remember when I couldnt hold her'},
    {time:192, text:'Left her baggage for Rimowa'}
  ];
}
function LYRICS_SAVE_YOUR_TEARS() {
  return [
    {time:0, text:'Na-na, yeah'},
    {time:8, text:'I saw you dancing in a crowded room'},
    {time:16, text:'You look so happy when Im not with you'},
    {time:24, text:'But then you saw me, caught you by surprise'},

    {time:32, text:'A single teardrop falling from your eye'},
    {time:40, text:'I dont know why I run away'},
    {time:48, text:'Ill make you cry when I run away'},
    {time:56, text:'You couldve asked me why I broke your heart'},

    {time:64, text:'You couldve told me that you fell apart'},
    {time:72, text:'But you walked past me like I wasnt there'},
    {time:80, text:'And just pretended like you didnt care'},
    {time:88, text:'I dont know why I run away'},

    {time:96, text:'Ill make you cry when I run away'},
    {time:104, text:'Take me back cause I wanna stay'},
    {time:112, text:'Save your tears for another day'},
    {time:120, text:'Save your tears for another day'},

    {time:128, text:'I made you think that I would always stay'},
    {time:136, text:'I said some things that I should never say'},
    {time:144, text:'Yeah, I broke your heart like someone did to mine'},
    {time:152, text:'And now you wont love me for a second time'},

    {time:160, text:'I dont know why I run away'},
    {time:168, text:'Girl, take me back cause I wanna stay'},
    {time:176, text:'I realize that Im much too late'},
    {time:184, text:'And you deserve someone better'},

    {time:192, text:'Save your tears for another day'},
    {time:200, text:'I dont know why I run away'},
    {time:208, text:'Save your tears for another day'}
  ];
}
function applyTheme(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        STATE.isLightTheme = false;
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = 'Dark ●';
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        STATE.isLightTheme = true;
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = 'Light ●';
    }
}
/* ══════════════════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════════════════ */
const STATE = {
  currentSongIndex: -1,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 0,           // 0=off 1=all 2=one
  volume: 0.7,
  isMuted: false,
  favorites: new Set(),
  queue: [...SONGS],
  currentPlaylist: null,
  currentSection: 'home',
  vizEnabled: true,
  isLightTheme: false,
  miniPlayerVisible: false,
  lastPlayed: [],
};
 window.addEventListener("DOMContentLoaded", () => {
    applyTheme("dark");
});
/* ══════════════════════════════════════════════════════════
   3. AUDIO + WEB AUDIO
══════════════════════════════════════════════════════════ */
const audio = document.getElementById('audio-player');
audio.addEventListener('timeupdate', () => {
  updateProgress(audio.currentTime, audio.duration);
  updateLyricHighlight(audio.currentTime);
});

audio.addEventListener('ended', () => {
  onSongEnd();
});

audio.addEventListener('loadedmetadata', () => {
  updateProgress(0, audio.duration);
});
let audioCtx, analyser, source, dataArray, animFrameId;
 
function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  drawVisualizer();
}
 
/* ══════════════════════════════════════════════════════════
   4. VISUALIZER
══════════════════════════════════════════════════════════ */
const canvas = document.getElementById('visualizer');
const ctx2d  = canvas.getContext('2d');
 
function drawVisualizer() {
  animFrameId = requestAnimationFrame(drawVisualizer);
  if (!STATE.isPlaying) {
  ctx2d.clearRect(0,0,canvas.width,canvas.height);
  return;
}
  if (!STATE.vizEnabled) { ctx2d.clearRect(0,0,canvas.width,canvas.height); return; }
  if (!analyser)         { ctx2d.clearRect(0,0,canvas.width,canvas.height); return; }
 
  analyser.getByteFrequencyData(dataArray);
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);
 
  const W = canvas.width, H = canvas.height;
  const bars = dataArray.length;
  const bw   = W / bars;
 
  for (let i = 0; i < bars; i++) {
    const v  = dataArray[i] / 255;
    const bh = v * H;
    const x  = i * bw;
 
    const alpha = 0.35 + v * 0.65;
    const r = 201, g = 168, b = 76;
    ctx2d.fillStyle = `rgba(${r},${g},${b},${alpha})`;
 
    const radius = Math.min(bw * 0.4, 3);
    ctx2d.beginPath();
    ctx2d.roundRect(x + bw * 0.15, H - bh, bw * 0.7, bh, radius);
    ctx2d.fill();
  }
}
 
// Fake visualizer when no real audio
function fakeVisualizer() {
  if (!STATE.isPlaying) return;
  if (!STATE.vizEnabled) return;
 
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height;
  const bars = 32;
  const bw = W / bars;
  const t  = Date.now() / 600;
 
  for (let i = 0; i < bars; i++) {
    const v  = (0.2 + 0.5 * Math.abs(Math.sin(t + i * 0.4))) * (0.5 + 0.5 * Math.random());
    const bh = v * H;
    const x  = i * bw;
    const alpha = 0.3 + v * 0.7;
    ctx2d.fillStyle = `rgba(201,168,76,${alpha})`;
    ctx2d.beginPath();
    ctx2d.roundRect(x + bw * 0.15, H - bh, bw * 0.7, bh, 3);
    ctx2d.fill();
  }
  requestAnimationFrame(() => { if (STATE.isPlaying) fakeVisualizer(); });
}
 
/* ══════════════════════════════════════════════════════════
   5. PLAYBACK CONTROLS
══════════════════════════════════════════════════════════ */
function playSong(indexInQueue) {
  if (indexInQueue < 0 || indexInQueue >= STATE.queue.length) return;
 
  STATE.currentSongIndex = indexInQueue;
  const song = STATE.queue[indexInQueue];
 
  // Track recently played
  STATE.lastPlayed = [song, ...STATE.lastPlayed.filter(s => s.id !== song.id)].slice(0, 12);
 
  // Update ambient background colors
  updateAmbient(song);
 
  // Reset & attempt audio
audio.pause();

audio.src = song.src;
audio.currentTime = 0;
audio.volume = STATE.isMuted ? 0 : STATE.volume;

audio.play().catch(err => {
  console.log('Playback blocked:', err);
});

initAudio();
 
  updateNowPlayingUI(song);
  updatePlayerBar(song);
  updateLyrics(song);
  updateQueue();
  updateRelated(song);
  updateSongLists();
  animateAlbumArt(song);
 
  STATE.isPlaying = true;
  document.getElementById('btn-play').textContent = '⏸';
  document.getElementById('btn-play').classList.add('playing');
 
  // Album scene playing state
  document.querySelector('.album-scene')?.classList.add('playing');
  document.getElementById('vinyl')?.classList.add('spinning');
 
  fakeVisualizer();
 
  showToast(`Now Playing: ${song.title}`);
}
 

 


 
function seekTo(e) {
  const track = document.getElementById('progress-track');
  const rect = track.getBoundingClientRect();

  const pct = Math.max(
    0,
    Math.min(1, (e.clientX - rect.left) / rect.width)
  );

  if (!audio.duration) return;

  audio.currentTime = pct * audio.duration;
}
 
window.seekForward = function () {
  if (!audio.duration) return;

  audio.currentTime = Math.min(
    audio.duration - 1,
    audio.currentTime + 10
  );

  showSeekIndicator('+10');
};

window.seekBackward = function () {
  audio.currentTime = Math.max(
    0,
    audio.currentTime - 10
  );

  showSeekIndicator('-10');
};
 
function showSeekIndicator(label) {
  showToast(`${label}s`);
}
 
function updateProgress(cur, total) {
  const pct  = total ? (cur / total * 100) : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-thumb').style.right = (-5) + 'px';
  document.getElementById('pbar-current').textContent  = formatTime(cur);
  document.getElementById('pbar-duration').textContent = formatTime(total);
}
 
function onSongEnd() {
  if (STATE.repeatMode === 2) { playSong(STATE.currentSongIndex); return; }
  nextSong();
}
 
window.seekToLyric = function(t) {
  audio.currentTime = t;
};
window.toggleTheme = function() {
  STATE.isLightTheme = !STATE.isLightTheme;
  document.body.classList.toggle('light-theme', STATE.isLightTheme);
  // Show the CURRENT mode, not what you're switching to
  document.getElementById('theme-toggle').textContent = STATE.isLightTheme ? 'Light ●' : 'Dark ●';
  showToast(STATE.isLightTheme ? 'Light Theme' : 'Dark Theme');
};
window.togglePlay = function () {
  if (STATE.currentSongIndex === -1) {
    playSong(0);
    return;
  }

  STATE.isPlaying = !STATE.isPlaying;

  if (STATE.isPlaying) {
    initAudio();
    audio.play().catch(err => console.log(err));
    document.getElementById('btn-play').textContent = '⏸';
    document.getElementById('btn-play').classList.add('playing');
    fakeVisualizer();
  } else {
    audio.pause();
    document.getElementById('btn-play').textContent = '▶';
    document.getElementById('btn-play').classList.remove('playing');
  }
};
 
window.nextSong = function() {
  const n = STATE.queue.length;
  if (!n) return;
  let next;
  if (STATE.isShuffle) { next = Math.floor(Math.random() * n); }
  else                  { next = (STATE.currentSongIndex + 1) % n; }
  playSong(next);
};
 
window.prevSong = function() {

  // If current song played more than 3 sec,
  // restart same song
  if (audio.currentTime > 3) {

    audio.currentTime = 0;

    return;
  }

  const n = STATE.queue.length;

  if (!n) return;

  let prev = (STATE.currentSongIndex - 1 + n) % n;

  playSong(prev);
};
 
window.toggleShuffle = function() {
  STATE.isShuffle = !STATE.isShuffle;
  document.getElementById('btn-shuffle').classList.toggle('active', STATE.isShuffle);
  showToast(STATE.isShuffle ? 'Shuffle On' : 'Shuffle Off');
};
 
window.toggleRepeat = function() {
  STATE.repeatMode = (STATE.repeatMode + 1) % 3;
  const btn = document.getElementById('btn-repeat');
  btn.classList.toggle('active', STATE.repeatMode > 0);
  btn.style.color = STATE.repeatMode === 2 ? 'var(--gold-1)' : '';
  const labels = ['Repeat Off', 'Repeat All', 'Repeat One'];
  showToast(labels[STATE.repeatMode]);
};
 
window.setVolume = function(v) {
  STATE.volume = parseFloat(v);
  audio.volume = STATE.isMuted ? 0 : STATE.volume;
  const icon = document.querySelector('.vol-icon');
  if (icon) icon.textContent = STATE.volume > 0.5 ? '🔊' : STATE.volume > 0 ? '🔉' : '🔇';
};
 
window.toggleMute = function() {
  STATE.isMuted = !STATE.isMuted;
  audio.volume  = STATE.isMuted ? 0 : STATE.volume;
  document.querySelector('.vol-icon').textContent = STATE.isMuted ? '🔇' : STATE.volume > 0.5 ? '🔊' : '🔉';
};
 
window.toggleFavorite = function() {
  const song = STATE.queue[STATE.currentSongIndex];
  if (!song) return;
  if (STATE.favorites.has(song.id)) {
    STATE.favorites.delete(song.id);
    showToast('Removed from Favorites');
  } else {
    STATE.favorites.add(song.id);
    showToast('Added to Favorites ♡');
  }
  const active = STATE.favorites.has(song.id);
  document.getElementById('btn-fav')?.classList.toggle('active', active);
  document.getElementById('pbar-fav')?.classList.toggle('active', active);
  if (document.getElementById('section-favorites').classList.contains('active')) {
    renderFavoritesList();
  }
};
 
window.playAll = function() {
  if (STATE.queue.length) playSong(0);
};
 
/* ══════════════════════════════════════════════════════════
   6. UI UPDATE FUNCTIONS
══════════════════════════════════════════════════════════ */
function updateNowPlayingUI(song) {
  // Center player
  const el = (id) => document.getElementById(id);
  [el('song-title'), el('song-artist'), el('song-album')].forEach(e => e?.classList.add('fade-transition'));
  setTimeout(() => [el('song-title'), el('song-artist'), el('song-album')].forEach(e => e?.classList.remove('fade-transition')), 400);
 
  el('song-title').textContent  = song.title;
  el('song-artist').textContent = song.artist;
  el('song-album').textContent  = song.album;
el('album-art').innerHTML = `
  <img src="${song.cover}" alt="${song.title}">
`;  
 
  // Set album art gradient
  const art = el('album-art');
  const colors = getColorsForSong(song);
  art.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
 
  // Fav state
  const isFav = STATE.favorites.has(song.id);
  el('btn-fav')?.classList.toggle('active', isFav);
  el('pbar-fav')?.classList.toggle('active', isFav);
}
 
function updatePlayerBar(song) {
  document.getElementById('pbar-title').textContent  = song.title;
  document.getElementById('pbar-art').innerHTML = `
  <img src="${song.cover}" alt="${song.title}">
`;
 document.getElementById('pbar-art').innerHTML = `
  <img src="${song.cover}" alt="${song.title}">
`;
  document.getElementById('pbar-art').style.background = `linear-gradient(135deg, ${getColorsForSong(song)[0]}, ${getColorsForSong(song)[1]})`;
  document.getElementById('pbar-duration').textContent = formatTime(song.duration);
  document.getElementById('pbar-current').textContent  = '0:00';
 
  // Mini player
  document.getElementById('mini-title').textContent  = song.title;
  document.getElementById('mini-artist').textContent = song.artist;
  document.getElementById('mini-art').textContent    = song.emoji;
}
 
function animateAlbumArt(song) {
  const art = document.getElementById('album-art');
  if (!art) return;
  art.innerHTML = `<img src="${song.cover}" alt="${song.title}">`;

  const card = document.getElementById('album-card');
  if (!card) return;
  card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s';
  card.style.opacity    = '0';
  card.style.transform  = 'scale(0.92)';
  setTimeout(() => {
    card.style.opacity   = '1';
    card.style.transform = 'scale(1)';
  }, 50);
}
 
function updateAmbient(song) {
  const colors = getColorsForSong(song);
  document.getElementById('amb1').style.background = `radial-gradient(circle, ${colors[0]}, transparent)`;
  document.getElementById('amb2').style.background = `radial-gradient(circle, ${colors[1]}, transparent)`;
}
 
function getColorsForSong(song) {
  const map = {
    '🌺': ['#8b2252','#c0392b'], '🌼': ['#d4a000','#e67e22'], '🎊': ['#e74c3c','#c0392b'],
    '🥁': ['#16a085','#1abc9c'], '🎆': ['#2980b9','#3498db'], '❤️': ['#c0392b','#e74c3c'],
    '💙': ['#1a5276','#2980b9'], '🧡': ['#d35400','#e67e22'], '🌙': ['#1a237e','#283593'],
    '🌹': ['#880e4f','#ad1457'], '🍃': ['#1b5e20','#2e7d32'], '🌤': ['#e65100','#f57c00'],
    '💔': ['#311b92','#4527a0'], '🌟': ['#f57f17','#f9a825'], '✨': ['#4a148c','#6a1b9a'],
    '🌴': ['#1b5e20','#2e7d32'], '🪐': ['#4a148c','#7b1fa2'], '🌃': ['#1a237e','#283593'],
    '🍑': ['#bf360c','#d84315'], '💧': ['#0d47a1','#1565c0'],
  };
  return map[song.emoji] || ['#2c3e50','#34495e'];
}
 
/* ══════════════════════════════════════════════════════════
   7. LYRICS
══════════════════════════════════════════════════════════ */
function updateLyrics(song) {
  const empty  = document.getElementById('lyrics-empty');
  const lines  = document.getElementById('lyrics-lines');
  const lyricsArr = song.lyrics || [];
 
  if (!lyricsArr.length) {
    empty.style.display = 'block';
    lines.innerHTML = '';
    return;
  }
  empty.style.display = 'none';
  lines.innerHTML = lyricsArr.map((l, i) =>
    `<div class="lyric-line" data-index="${i}" data-time="${l.time}" onclick="seekToLyric(${l.time})">${l.text}</div>`
  ).join('');
}
 
function updateLyricHighlight(currentTime) {
  // Highlight disabled
  return;
}
 
window.seekToLyric = function(t) {
  audio.currentTime = t;
};
 
/* ══════════════════════════════════════════════════════════
   8. QUEUE & RELATED
══════════════════════════════════════════════════════════ */
function updateQueue() {
  const song = STATE.queue[STATE.currentSongIndex];
  const now  = document.getElementById('queue-now');
  if (now && song) {
    now.innerHTML = `
      <div class="queue-item">
        <div class="qi-art">
  <img src="${song.cover}" alt="${song.title}">
</div>
        <div class="qi-info">
          <div class="qi-title">${song.title}</div>
          <div class="qi-artist">${song.artist}</div>
        </div>
      </div>`;
  }
 
  const list = document.getElementById('queue-list');
  if (!list) return;
  const next5 = [];
  for (let i = 1; i <= 5; i++) {
    const idx = (STATE.currentSongIndex + i) % STATE.queue.length;
    next5.push(STATE.queue[idx]);
  }
  list.innerHTML = next5.map((s, i) => `
    <div class="queue-item" onclick="playSong(${(STATE.currentSongIndex + i + 1) % STATE.queue.length})">
      <div class="qi-art">
  <img src="${song.cover}" alt="${song.title}">
</div>
      <div class="qi-info">
        <div class="qi-title">${song.title}</div>
        <div class="qi-artist">${song.artist}</div>
      </div>
    </div>`).join('');
}
 
function updateRelated(song) {
  const list = document.getElementById('related-list');
  if (!list) return;
  const related = SONGS.filter(s => s.artist === song.artist && s.id !== song.id)
    .slice(0, 6);
  if (!related.length) { list.innerHTML = '<p style="color:var(--text-muted);padding:16px 12px;font-size:0.78rem;">No related songs found</p>'; return; }
  list.innerHTML = `
    <div class="queue-label" style="padding:16px 12px 8px">More by ${song.artist}</div>
    ${related.map(s => `
    <div class="queue-item" onclick="playSongById(${s.id})">
     <div class="qi-art">
  <img src="${song.cover}" alt="${song.title}">
</div>
      <div class="qi-info">
        <div class="qi-title">${song.title}</div>
        <div class="qi-artist">${song.album}</div>
      </div>
    </div>`).join('')}`;
}
 
window.playSongById = function(id) {
  const idx = STATE.queue.findIndex(s => s.id === id);
  if (idx >= 0) playSong(idx);
};
 
/* ══════════════════════════════════════════════════════════
   9. SONG LISTS RENDERING
══════════════════════════════════════════════════════════ */
function updateSongLists() {
  renderRecentRow();
  renderLibraryList();
  renderFavoritesList();
  renderRecentList();
}
 
function renderSongRow(song, index, listId, useIndex=true) {
  const dur   = formatTime(song.duration);
  const isFav = STATE.favorites.has(song.id);
  const isNow = STATE.queue[STATE.currentSongIndex]?.id === song.id && STATE.isPlaying;
  return `
    <div class="song-row${isNow?' playing':''}" onclick="playSongById(${song.id})">
      <div class="now-playing-bar"></div>
      <div class="sr-num">${useIndex ? index+1 : '♪'}</div>
      <div class="song-card-art">
  <img src="${song.cover}" alt="${song.title}">
</div>
      <div class="sr-info">
        <div class="sr-title">${song.title}</div>
        <div class="sr-artist">${song.artist} · ${song.album}</div>
      </div>
      <div class="sr-duration">${dur}</div>
      <button class="sr-fav${isFav?' active':''}" onclick="event.stopPropagation(); toggleFavById(${song.id})">${isFav?'♥':'♡'}</button>
    </div>`;
}
 
window.toggleFavById = function(id) {
  if (STATE.favorites.has(id)) STATE.favorites.delete(id);
  else STATE.favorites.add(id);
  updateSongLists();
  const song = STATE.queue[STATE.currentSongIndex];
  if (song) {
    const isFav = STATE.favorites.has(song.id);
    document.getElementById('btn-fav')?.classList.toggle('active', isFav);
    document.getElementById('pbar-fav')?.classList.toggle('active', isFav);
  }
};
 
function renderRecentRow() {
  const el = document.getElementById('recent-row');
  if (!el) return;

  el.innerHTML = SONGS.map(s => {
    const idx = STATE.queue.findIndex(q => q.id === s.id);
    return `
      <div class="song-card" onclick="playSongById(${s.id})">
        <div class="song-cover">
          <img src="${s.cover}" alt="${s.title}">
        </div>
        <div class="song-name">${s.title}</div>
      </div>
    `;
  }).join('');
}
 
function renderLibraryList() {
  const el = document.getElementById('library-list');
  if (!el) return;
  el.innerHTML = SONGS.map((s, i) => renderSongRow(s, i, 'library-list')).join('');
}
 
function renderFavoritesList() {
  const el = document.getElementById('favorites-list');
  if (!el) return;
  const favs = SONGS.filter(s => STATE.favorites.has(s.id));
  if (!favs.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">♡</div><p>No favorites yet. Heart a song to add it here.</p></div>';
  } else {
    el.innerHTML = favs.map((s, i) => renderSongRow(s, i, 'favorites-list')).join('');
  }
}
 
function renderRecentList() {
  const el = document.getElementById('recent-list');
  if (!el) return;
  const songs = STATE.lastPlayed.length ? STATE.lastPlayed : SONGS.slice(0, 10);
  el.innerHTML = songs.map((s, i) => renderSongRow(s, i, 'recent-list')).join('');
}
 
/* ══════════════════════════════════════════════════════════
   10. SIDEBAR PLAYLISTS
══════════════════════════════════════════════════════════ */
function renderSidebarPlaylists() {
  const el = document.getElementById('sidebar-playlists');
  if (!el) return;
  el.innerHTML = PLAYLISTS.map(p => `
    <div class="playlist-item" data-pid="${p.id}" onclick="openPlaylist('${p.id}')">
      <div class="playlist-thumb" style="background:${p.color}22;border-color:${p.color}33">
        <span>${p.emoji}</span>
      </div>
      <div class="playlist-meta">
        <div class="playlist-name">${p.name}</div>
        <div class="playlist-count">${SONGS.filter(s=>s.playlist===p.id).length} songs</div>
      </div>
    </div>`).join('');
}
 
window.openPlaylist = function(pid) {
  const playlist = PLAYLISTS.find(p => p.id === pid);
  if (!playlist) return;
  const songs = SONGS.filter(s => s.playlist === pid);
 
  // Update queue to this playlist
  STATE.queue = [...songs, ...SONGS.filter(s => s.playlist !== pid)];
  STATE.currentSongIndex = -1;
 
  // Update hero
  document.getElementById('playlist-hero-art').textContent  = playlist.emoji;
  document.getElementById('playlist-hero-art').style.fontSize = '5rem';
  document.getElementById('playlist-hero-name').textContent = playlist.name;
  document.getElementById('playlist-hero-meta').textContent = `${songs.length} songs · ARIA Music`;
 
  // Songs list
  const list = document.getElementById('playlist-songs-list');
  list.innerHTML = songs.map((s, i) => renderSongRow(s, i, 'playlist-songs-list')).join('');
 
  // Sidebar active
  document.querySelectorAll('.playlist-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-pid="${pid}"]`)?.classList.add('active');
 
  showSection('playlist');
};
 
/* ══════════════════════════════════════════════════════════
   11. FEATURED GRID
══════════════════════════════════════════════════════════ */
function renderFeaturedGrid() {
  const el = document.getElementById('featured-grid');
  if (!el) return;
  el.innerHTML = PLAYLISTS.map(p => `
    <div class="grid-card" onclick="openPlaylist('${p.id}')">
      <div class="card-art" style="background:linear-gradient(135deg,${p.color}44,${p.color}11)">${p.emoji}</div>
      <div class="card-meta">
        <div class="card-name">${p.name}</div>
        <div class="card-sub">${SONGS.filter(s=>s.playlist===p.id).length} songs</div>
      </div>
      <div class="play-overlay">▶</div>
    </div>`).join('');
 
  // Browse & Radio grids
  const browse = document.getElementById('browse-grid');
  if (browse) browse.innerHTML = el.innerHTML;
  const radio  = document.getElementById('radio-grid');
  if (radio) {
    const stations = [
      {emoji:'📻',name:'ARIA Radio 1',sub:'Top Hits',color:'#e74c3c'},
      {emoji:'🎵',name:'Chill FM',sub:'Lo-fi & More',color:'#3498db'},
      {emoji:'🥁',name:'Beats 24/7',sub:'Non-stop Beats',color:'#9b59b6'},
      {emoji:'🌊',name:'Wave Radio',sub:'Ambient & Chill',color:'#1abc9c'},
    ];
    radio.innerHTML = stations.map(s => `
  <div class="grid-card" onclick="showToast('${s.name} — Coming Soon')">

    <div class="card-art" style="background:linear-gradient(135deg,${s.color}44,${s.color}11)">
      ${s.emoji}
    </div>

    <div class="card-meta">
      <div class="card-name">${s.name}</div>
      <div class="card-sub">${s.sub}</div>
    </div>

    <div class="play-overlay">▶</div>

  </div>
`).join('');
  }
}
 
/* ══════════════════════════════════════════════════════════
   12. NAV / SECTIONS
══════════════════════════════════════════════════════════ */
function showSection(id) {
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${id}`)?.classList.add('active');
  STATE.currentSection = id;
 
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === id);
  });
 
  if (id === 'library')   renderLibraryList();
  if (id === 'favorites') renderFavoritesList();
  if (id === 'recent')    renderRecentList();
}
 
// Nav click handlers
document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showSection(el.dataset.section);
  });
});
 
/* ══════════════════════════════════════════════════════════
   13. RIGHT PANEL TABS
══════════════════════════════════════════════════════════ */
window.switchRTab = function(el, tab) {
  if (typeof el === 'string') {
    tab = el;
    el  = document.querySelector(`[data-tab="${tab}"]`);
  }
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.rtab-content').forEach(c => c.classList.remove('active'));
  el?.classList.add('active');
  document.getElementById(`rtab-${tab}`)?.classList.add('active');
};
 
/* ══════════════════════════════════════════════════════════
   14. SEARCH
══════════════════════════════════════════════════════════ */
let searchTimeout;
document.getElementById('search-input').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  const q = e.target.value.trim().toLowerCase();
  if (!q) { showSection(STATE.currentSection); return; }
  searchTimeout = setTimeout(() => performSearch(q), 200);
});
 
function performSearch(q) {
  const results = SONGS.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q)
  );
 
  STATE.queue = results.length ? results : SONGS;
  STATE.currentSongIndex = -1;
 
  const list = document.getElementById('library-list');
  if (list) {
    list.innerHTML = results.length
      ? results.map((s, i) => renderSongRow(s, i)).join('')
      : '<div class="empty-state"><div class="empty-icon">⌕</div><p>No results found</p></div>';
  }
  showSection('library');
 
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
}
 
/* ══════════════════════════════════════════════════════════
   15. MOUSE PARALLAX / 3D TILT
══════════════════════════════════════════════════════════ */
document.addEventListener('mousemove', e => {
  // Cursor glow
  const glow = document.getElementById('cursor-glow');
  if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
 
  // Album art 3D tilt
  const card  = document.getElementById('album-card');
  const scene = document.getElementById('album-scene');
  if (!card || !scene) return;
 
  const rect  = scene.getBoundingClientRect();
  const cx    = rect.left + rect.width  / 2;
  const cy    = rect.top  + rect.height / 2;
  const dx    = (e.clientX - cx) / rect.width;
  const dy    = (e.clientY - cy) / rect.height;
 
  const rotX  = -dy * 14;
  const rotY  =  dx * 14;
  card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
});
 
document.addEventListener('mouseleave', () => {
  const card = document.getElementById('album-card');
  if (card) card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
});
 
/* ══════════════════════════════════════════════════════════
   16. KEYBOARD SHORTCUTS
══════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const tag = e.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;
 
  switch (e.code) {
    case 'Space':      e.preventDefault(); togglePlay();     break;
    case 'ArrowRight': e.preventDefault(); seekForward();    break;
    case 'ArrowLeft':  e.preventDefault(); seekBackward();   break;
    case 'ArrowUp':    e.preventDefault(); adjustVolume(0.1);break;
    case 'ArrowDown':  e.preventDefault(); adjustVolume(-0.1);break;
    case 'KeyN':       nextSong();      break;
    case 'KeyP':       prevSong();      break;
    case 'KeyS':       toggleShuffle(); break;
    case 'KeyR':       toggleRepeat();  break;
    case 'KeyF':       toggleFavorite();break;
    case 'KeyM':       toggleMute();    break;
  }
});
 
function adjustVolume(delta) {
  const vol = Math.max(0, Math.min(1, STATE.volume + delta));
  document.getElementById('volume-slider').value = vol;
  setVolume(vol);
}
 
/* ══════════════════════════════════════════════════════════
   17. THEME TOGGLE
══════════════════════════════════════════════════════════ */
window.toggleTheme = function() {
  STATE.isLightTheme = !STATE.isLightTheme;
  document.body.classList.toggle('light-theme', STATE.isLightTheme);
  document.getElementById('theme-toggle').textContent = STATE.isLightTheme ? 'Light ●' : 'Dark ●';
  showToast(STATE.isLightTheme ? 'Light Theme' : 'Dark Theme');
};
 
window.toggleViz = function() {
  STATE.vizEnabled = !STATE.vizEnabled;
  document.getElementById('viz-toggle').textContent = STATE.vizEnabled ? 'On ●' : 'Off ●';
  document.getElementById('viz-toggle').classList.toggle('active', STATE.vizEnabled);
};
 
/* ══════════════════════════════════════════════════════════
   18. FULLSCREEN
══════════════════════════════════════════════════════════ */
window.toggleFullscreen = function() {
  document.body.classList.toggle('fullscreen');
};
 
/* ══════════════════════════════════════════════════════════
   19. MINI PLAYER
══════════════════════════════════════════════════════════ */
window.toggleMiniPlayer = function() {
  STATE.miniPlayerVisible = !STATE.miniPlayerVisible;
  document.getElementById('mini-player').classList.toggle('hidden', !STATE.miniPlayerVisible);
};
 
/* ══════════════════════════════════════════════════════════
   20. TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════ */
window.showToast = function(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
};
 
/* ══════════════════════════════════════════════════════════
   21. UTILITY
══════════════════════════════════════════════════════════ */
function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}
 
function setDateGreeting() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
  const el = document.getElementById('section-greeting');
  if (el) el.textContent = greet;
 
  const d = new Date();
  const opts = { weekday:'long', month:'long', day:'numeric' };
  const dateEl = document.getElementById('date-display');
  if (dateEl) dateEl.textContent = d.toLocaleDateString('en-US', opts);
}
 
/* ══════════════════════════════════════════════════════════
   22. PROGRESS BAR DRAG
══════════════════════════════════════════════════════════ */
let isDragging = false;
const progressTrack = document.getElementById('progress-track');
 
progressTrack.addEventListener('mousedown', e => {
  isDragging = true;
  seekTo(e);
});
document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  seekTo(e);
});
document.addEventListener('mouseup', () => { isDragging = false; });
 
/* ══════════════════════════════════════════════════════════
   23. SPLASH → INIT
══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // Render all static UI
  renderSidebarPlaylists();
  renderFeaturedGrid();
  renderRecentRow();
  renderLibraryList();
  setDateGreeting();
 
  // Splash removal
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.classList.add('fade-out');
    document.getElementById('app').classList.remove('hidden');
 
    setTimeout(() => splash.remove(), 800);
 
    // Auto-play first song after splash
    setTimeout(() => {
  STATE.queue = [...SONGS];
}, 1000);
  }, 3000);
 
  // Start fake visualizer loop even before song
  requestAnimationFrame(function loop() {
    if (!STATE.isPlaying) {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(loop);
  });
});
 
/* Handle resize: fix canvas width */
function resizeCanvas() {
  const stage = document.querySelector('.player-stage');
  if (stage) {
    canvas.width = stage.offsetWidth;
  }
}
window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 3200);