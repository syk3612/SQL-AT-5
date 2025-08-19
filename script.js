// script.js
// Full lessons: multilingual (Marathi, Hindi, English, Varhadi, Mumbaiya, Hyderabadi)

const langNames = { 
  mr: "मराठी", 
  hi: "हिन्दी", 
  en: "English",
  vr: "वरहाडी",
  mb: "मुंबईया",
  hy: "हैदराबादी",
  np: "नागपुरी"
};

const startTexts = {
  mr: { title: "SQL शिकायला सुरू करा", sub: "डावीकडील विषय निवडा." },
  hi: { title: "SQL सीखना शुरू कीजिए", sub: "बाएँ तरफ से कोई विषय चुनें।" },
  en: { title: "Start Learning SQL", sub: "Pick a topic from the left." },
  vr: { title: "SQL शिकाय ला लागू करा रे", sub: "डावीकडचं टॉपिक निवड" },
  mb: { title: "SQL शिकायला चालू कर बे", sub: "डाव्या साईडचा टॉपिक सिलेक्ट कर" },
  hy: { title: "SQL सीखना चालू कर रे मियाँ", sub: "बायीं तरफ का टॉपिक चुन लो मियाँ" },
  np: { title: "SQL शिकय ला सुरू कर न मामा", sub: "डाव्या बाजूने टॉपिक निवड." }

  
};

let currentLang = "mr"; // default

/* -------------- Helpers -------------- */
function makeTable(headers, rows) {
  let html = '<table class="sql-output"><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach(r => {
    html += '<tr>';
    r.forEach(c => html += `<td>${c}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}


// Lessons
const lessons = {
  mr: [
    { id:"select", title:"SELECT स्टेटमेंट 🍀", emoji:"", desc:"SELECT म्हणजे डेटाबेस मधून माहिती घेण्यासाठी वापरतो.", longDesc:"SELECT स्टेटमेंटचा उपयोग table मधून हवे असलेले data मिळवण्यासाठी करतो, आपण specific columns निवडू शकतो", example:"SELECT नाव, वय FROM विद्यार्थी;", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
    { id:"where", title:"WHERE क्लॉज 🔍", emoji:"", desc:"WHERE म्हणजे अट लावणे.", longDesc:"WHERE क्लॉजचा उपयोग filter करण्यासाठी करतो. फक्त specific rows select करण्यासाठी." , example:"SELECT नाव FROM विद्यार्थी WHERE वय = 10;", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाव"], rows:[["स्नेहा"]]} },
    { id:"orderby", title:"ORDER BY 📑", emoji:"", desc:"ORDER BY म्हणजे क्रम लावणे.", longDesc:"ORDER BY वापरून डेटा ascending किंवा descending क्रमात दाखवतो. जसे वय ascending क्रमात पाहणे.", example:"SELECT नाव, वय FROM विद्यार्थी ORDER BY वय ASC;", before:{headers:["नाव","वय"], rows:[["रोहित","12"],["स्नेहा","10"]]}, after:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
    { id:"and", title:"AND क्लॉज ➕", emoji:"", desc:"AND म्हणजे दोन्ही अटी पूर्ण व्हायला हव्यात.", longDesc:"AND वापरून एकाहून अधिक अटी लागू केल्या जातात. सर्व अटी खऱ्या असाव्यात तर row select होतो.", example:"SELECT नाव FROM विद्यार्थी WHERE वय=10 AND नाव='स्नेहा';", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","10"]]}, after:{headers:["नाव"], rows:[["स्नेहा"]]} },
    { id:"or", title:"OR क्लॉज ⚡", emoji:"", desc:"OR म्हणजे एक अट पूर्ण झाली तरी चालते.", longDesc:"OR वापरून एखादी अट खऱ्या असल्यास row select होतो. जसे वय 10 किंवा नाव रोहित.", example:"SELECT नाव FROM विद्यार्थी WHERE वय=10 OR नाव='रोहित';", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]} },
    { id:"like", title:"LIKE क्लॉज 🔠", emoji:"", desc:"LIKE म्हणजे pattern match.", longDesc:"LIKE वापरून specific pattern match करून डेटा select करतो. जसे नाव 'र' ने सुरू होणारे.", example:"SELECT नाव FROM विद्यार्थी WHERE नाव LIKE 'र%';", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाव"], rows:[["रोहित"]]} },
    { id:"in", title:"IN क्लॉज 📦", emoji:"", desc:"IN म्हणजे list मधील value.", longDesc:"IN वापरून multiple values मधून data select करतो. जसे वय 10 किंवा 12.", example:"SELECT नाव FROM विद्यार्थी WHERE वय IN (10,12);", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]} },
    { id:"between", title:"BETWEEN क्लॉज 🎯", emoji:"", desc:"BETWEEN म्हणजे range मध्ये value.", longDesc:"BETWEEN वापरून two values मधील range select करतो. जसे 10 ते 12 वर्षांचे विद्यार्थी.", example:"SELECT नाव FROM विद्यार्थी WHERE वय BETWEEN 10 AND 12;", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["अमृता"],["रोहित"]]} },
    { id:"anyall", title:"ANY आणि ALL 🌍", emoji:"", desc:"ANY म्हणजे कुठलीही value, ALL म्हणजे सर्व अटी true.", longDesc:"ANY आणि ALL वापरून subquery results filter करतो. ANY म्हणजे कुठलीही value match, ALL म्हणजे सर्व match.", example:"SELECT नाव FROM विद्यार्थी WHERE वय = ANY (10,12);", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]} },
    { id:"union", title:"UNION 🤝", emoji:"", desc:"UNION म्हणजे two queries merge.", longDesc:"UNION वापरून दोन query results एकत्र करतो आणि duplicates काढतो.", example:"SELECT नाव FROM विद्यार्थीA UNION SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]} },
    { id:"unionall", title:"UNION ALL 🔗", emoji:"", desc:"UNION ALL म्हणजे merge but duplicates retain.", longDesc:"UNION ALL वापरून two query results एकत्र करतो पण duplicates ठेवतो.", example:"SELECT नाव FROM विद्यार्थीA UNION ALL SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]} },
    { id:"intersect", title:"INTERSECT ✂️", emoji:"", desc:"INTERSECT म्हणजे common values.", longDesc:"INTERSECT वापरून दोन queries मधील common rows select करतो.", example:"SELECT नाव FROM विद्यार्थीA INTERSECT SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाव"], rows:[["रोहित"]]} },
    { id:"minus", title:"MINUS ➖", emoji:"", desc:"MINUS म्हणजे first query मध्ये पण second मध्ये नाही.", longDesc:"MINUS वापरून first query मधील rows select करतो जे second query मध्ये नाहीत.", example:"SELECT नाव FROM विद्यार्थीA MINUS SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["अमृता"]]} },
    { id:"not", title:"NOT ❌", emoji:"", desc:"NOT म्हणजे उलट अट.", longDesc:"NOT वापरून अटी invert करतो. जसे, NOT IN वापरून specific values वगळतो.", example:"SELECT नाव FROM विद्यार्थी WHERE वय NOT IN (10);", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाव"], rows:[["रोहित"]]} },
    { id:"exists", title:"EXISTS ✅", emoji:"", desc:"EXISTS म्हणजे subquery result आहे का तपासणे.", longDesc:"EXISTS वापरून तपासतो की subquery काही rows return करते का.", example:"SELECT नाव FROM विद्यार्थी WHERE EXISTS (SELECT 1 FROM गुण WHERE गुण>80);", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]} },
    { id:"notexists", title:"NOT EXISTS 🚫", emoji:"", desc:"NOT EXISTS म्हणजे result नाही का तपासणे.", longDesc:"NOT EXISTS वापरून तपासतो की subquery काही rows return करत नाही.", example:"SELECT नाव FROM विद्यार्थी WHERE NOT EXISTS (SELECT 1 FROM गुण WHERE गुण>90);", before:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]}, after:{headers:["नाव"], rows:[["स्नेहा"],["रोहित"]]} },
    { id:"null", title:"NULL Values 🕳️", emoji:"", desc:"NULL म्हणजे रिकामं value.", longDesc:"NULL values वापरून तपासतो की field मध्ये काही value नाही का.", example:"SELECT नाव FROM विद्यार्थी WHERE पत्ता IS NULL;", before:{headers:["नाव","पत्ता"], rows:[["स्नेहा","Mumbai"],["अमृता",null]]}, after:{headers:["नाव"], rows:[["अमृता"]]} },
    { id:"insert", title:"INSERT INTO ➕", emoji:"", desc:"INSERT म्हणजे नवीन data टाकणे.", longDesc:"INSERT INTO वापरून नवीन rows add करतो. columns आणि values specify करतो.", example:"INSERT INTO विद्यार्थी (नाव, वय) VALUES ('अजय', 11);", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अजय","11"]]} },
    { id:"update", title:"UPDATE ✏️", emoji:"", desc:"UPDATE म्हणजे जुना data बदलणे.", longDesc:"UPDATE वापरून table मधील existing data बदलतो. WHERE क्लॉजशिवाय सर्व rows update होतात.", example:"UPDATE विद्यार्थी SET वय = 13 WHERE नाव = 'रोहित';", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","13"]]} },
    { id:"delete", title:"DELETE 🗑️", emoji:"", desc:"DELETE म्हणजे जुना data काढून टाकणे.", longDesc:"DELETE वापरून table मधील rows remove करतो. WHERE क्लॉजशिवाय सर्व rows delete होतात.", example:"DELETE FROM विद्यार्थी WHERE नाव = 'अजय';", before:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"],["अजय","11"]]}, after:{headers:["नाव","वय"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
    { id:"innerjoin", title:"INNER JOIN 🔗", emoji:"", desc:"INNER JOIN म्हणजे दोन्ही tables मधल्या common rows.", longDesc:"INNER JOIN चा उपयोग दोन tables मधल्या matching rows काढण्यासाठी होतो. Common column च्या आधारावर data जोडला जातो.", example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी INNER JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता","4","88"]]}, after:{headers:["नाव","अंक"], rows:[["स्नेहा","85"],["रोहित","90"]]} },

{ id:"leftjoin", title:"LEFT JOIN ⬅️", emoji:"", desc:"LEFT JOIN म्हणजे left table मधल्या सगळ्या rows + right मधले matching.", longDesc:"LEFT JOIN चा उपयोग left table मधल्या सर्व rows आणण्यासाठी होतो, आणि जर right table मध्ये match नसेल तर NULL मिळतं.", example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी LEFT JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता",null,null]]}, after:{headers:["नाव","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],["अमृता",null]]} },

{ id:"rightjoin", title:"RIGHT JOIN ➡️", emoji:"", desc:"RIGHT JOIN म्हणजे right table मधल्या सगळ्या rows + left मधले matching.", longDesc:"RIGHT JOIN चा उपयोग right table मधल्या सर्व rows आणण्यासाठी होतो, आणि जर left table मध्ये match नसेल तर NULL मिळतं.", example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी RIGHT JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],[null,null,"4","88"]]}, after:{headers:["नाव","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],[null,"88"]]} },

{ id:"fulljoin", title:"FULL OUTER JOIN 🌐", emoji:"", desc:"FULL JOIN म्हणजे दोन्ही tables मधल्या सर्व rows.", longDesc:"FULL OUTER JOIN चा उपयोग दोन्ही tables मधल्या सर्व rows आणण्यासाठी होतो. जिथे match नाही तिथे NULL येतो.", example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी FULL OUTER JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता",null,null],[null,null,"4","88"]]}, after:{headers:["नाव","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],["अमृता",null],[null,"88"]]} },

{ id:"selfjoin", title:"SELF JOIN 🔄", emoji:"", desc:"SELF JOIN म्हणजे table ला स्वतःशी जोडणं.", longDesc:"SELF JOIN चा उपयोग जेव्हा एका table मधलं related data एकमेकांशी compare करायचं असतं तेव्हा होतो.", example:"SELECT A.नाव, B.नाव FROM विद्यार्थी A JOIN विद्यार्थी B ON A.उम्र = B.उम्र;", before:{headers:["id","नाव","उम्र"], rows:[["1","स्नेहा","10"],["2","रोहित","12"],["3","अमृता","12"]]}, after:{headers:["A.नाव","B.नाव"], rows:[["रोहित","अमृता"],["अमृता","रोहित"]]} },

// 🚀 Aggregate Functions
{ id:"count", title:"COUNT() 🔢", emoji:"", desc:"COUNT म्हणजे rows मोजणे.", longDesc:"COUNT function चा उपयोग एखाद्या table मध्ये किती rows आहेत हे शोधण्यासाठी होतो.", example:"SELECT COUNT(*) FROM विद्यार्थी;", before:{headers:["नाव","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["COUNT"], rows:[["3"]]} },

{ id:"sum", title:"SUM() ➕", emoji:"", desc:"SUM म्हणजे बेरीज.", longDesc:"SUM function चा उपयोग numeric column चा एकूण बेरीज काढण्यासाठी होतो.", example:"SELECT SUM(उम्र) FROM विद्यार्थी;", before:{headers:["नाव","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["SUM"], rows:[["33"]]} },

{ id:"avg", title:"AVG() 📊", emoji:"", desc:"AVG म्हणजे सरासरी.", longDesc:"AVG function चा उपयोग numeric column ची सरासरी काढण्यासाठी होतो.", example:"SELECT AVG(उम्र) FROM विद्यार्थी;", before:{headers:["नाव","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["AVG"], rows:[["11"]]} },

{ id:"min", title:"MIN() ⬇️", emoji:"", desc:"MIN म्हणजे सर्वात लहान value.", longDesc:"MIN function चा उपयोग column मधलं सर्वात कमी value काढण्यासाठी होतो.", example:"SELECT MIN(उम्र) FROM विद्यार्थी;", before:{headers:["नाव","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["MIN"], rows:[["10"]]} },

{ id:"max", title:"MAX() ⬆️", emoji:"", desc:"MAX म्हणजे सर्वात मोठं value.", longDesc:"MAX function चा उपयोग column मधलं सर्वात मोठं value काढण्यासाठी होतो.", example:"SELECT MAX(उम्र) FROM विद्यार्थी;", before:{headers:["नाव","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["MAX"], rows:[["12"]]} },

  ],

  hi: [
      { id:"select", title:"SELECT स्टेटमेंट 🍀", emoji:"", desc:"SELECT का मतलब है डेटाबेस से जानकारी निकालना।", longDesc:"SELECT स्टेटमेंट का उपयोग table से ज़रूरी data निकालने के लिए होता है। हम specific columns चुन सकते हैं।", example:"SELECT नाम, उम्र FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
      { id:"where", title:"WHERE क्लॉज 🔍", emoji:"", desc:"WHERE का मतलब है शर्त लगाना।", longDesc:"WHERE क्लॉज का उपयोग data filter करने के लिए होता है। सिर्फ वही rows चुने जाते हैं जो condition पूरी करते हैं।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र = 10;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाम"], rows:[["स्नेहा"]]} },
      { id:"orderby", title:"ORDER BY 📑", emoji:"", desc:"ORDER BY का मतलब है क्रम लगाना।", longDesc:"ORDER BY का उपयोग डेटा को ascending या descending क्रम में दिखाने के लिए होता है। जैसे उम्र ascending क्रम में।", example:"SELECT नाम, उम्र FROM विद्यार्थी ORDER BY उम्र ASC;", before:{headers:["नाम","उम्र"], rows:[["रोहित","12"],["स्नेहा","10"]]}, after:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
      { id:"and", title:"AND क्लॉज ➕", emoji:"", desc:"AND का मतलब है दोनों शर्तें पूरी होनी चाहिए।", longDesc:"AND का उपयोग एक से अधिक conditions को जोड़ने के लिए होता है। तभी row चुना जाता है जब सब conditions true हों।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र=10 AND नाम='स्नेहा';", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","10"]]}, after:{headers:["नाम"], rows:[["स्नेहा"]]} },
      { id:"or", title:"OR क्लॉज ⚡", emoji:"", desc:"OR का मतलब है कोई भी एक शर्त पूरी होनी चाहिए।", longDesc:"OR का उपयोग तब होता है जब कोई भी condition true हो तो row चुना जाता है। जैसे उम्र 10 या नाम रोहित।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र=10 OR नाम='रोहित';", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]} },
      { id:"like", title:"LIKE क्लॉज 🔠", emoji:"", desc:"LIKE का मतलब है pattern match।", longDesc:"LIKE का उपयोग pattern match करके rows चुनने के लिए होता है। जैसे नाम 'र' से शुरू हो।", example:"SELECT नाम FROM विद्यार्थी WHERE नाम LIKE 'र%';", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाम"], rows:[["रोहित"]]} },
      { id:"in", title:"IN क्लॉज 📦", emoji:"", desc:"IN का मतलब है list में से value चुनना।", longDesc:"IN का उपयोग multiple values में से rows चुनने के लिए होता है। जैसे उम्र 10 या 12।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र IN (10,12);", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]} },
      { id:"between", title:"BETWEEN क्लॉज 🎯", emoji:"", desc:"BETWEEN का मतलब है range के बीच का value।", longDesc:"BETWEEN का उपयोग दो values के बीच के rows चुनने के लिए होता है। जैसे 10 से 12 साल के विद्यार्थी।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र BETWEEN 10 AND 12;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["अमृता"],["रोहित"]]} },
      { id:"anyall", title:"ANY और ALL 🌍", emoji:"", desc:"ANY का मतलब है कोई भी value, ALL का मतलब है सभी शर्तें true।", longDesc:"ANY और ALL का उपयोग subquery results filter करने के लिए होता है। ANY का मतलब है कोई भी value match हो, ALL का मतलब है सब match हों।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र = ANY (10,12);", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]} },
      { id:"union", title:"UNION 🤝", emoji:"", desc:"UNION का मतलब है दो queries merge करना।", longDesc:"UNION का उपयोग दो query results को जोड़ने के लिए होता है और duplicates हटा देता है।", example:"SELECT नाम FROM विद्यार्थीA UNION SELECT नाम FROM विद्यार्थीB;", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]} },
      { id:"unionall", title:"UNION ALL 🔗", emoji:"", desc:"UNION ALL का मतलब है merge करना लेकिन duplicates रखना।", longDesc:"UNION ALL का उपयोग दो query results को जोड़ने के लिए होता है और duplicates भी रखते हैं।", example:"SELECT नाम FROM विद्यार्थीA UNION ALL SELECT नाम FROM विद्यार्थीB;", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"],["स्नेहा"]]} },
      { id:"intersect", title:"INTERSECT ✂️", emoji:"", desc:"INTERSECT का मतलब है common values।", longDesc:"INTERSECT का उपयोग दो queries में मौजूद common rows निकालने के लिए होता है।", example:"SELECT नाम FROM विद्यार्थीA INTERSECT SELECT नाम FROM विद्यार्थीB;", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाम"], rows:[["रोहित"]]} },
      { id:"minus", title:"MINUS ➖", emoji:"", desc:"MINUS का मतलब है first query में मौजूद लेकिन second में नहीं।", longDesc:"MINUS का उपयोग first query की rows चुनने के लिए होता है जो second query में नहीं हैं।", example:"SELECT नाम FROM विद्यार्थीA MINUS SELECT नाम FROM विद्यार्थीB;", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"],["अमृता"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["अमृता"]]} },
      { id:"not", title:"NOT ❌", emoji:"", desc:"NOT का मतलब है उलटी शर्त।", longDesc:"NOT का उपयोग शर्त को उलटने के लिए होता है। जैसे, NOT IN का उपयोग specific values हटाने के लिए।", example:"SELECT नाम FROM विद्यार्थी WHERE उम्र NOT IN (10);", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाम"], rows:[["रोहित"]]} },
      { id:"exists", title:"EXISTS ✅", emoji:"", desc:"EXISTS का मतलब है subquery का result है या नहीं।", longDesc:"EXISTS का उपयोग यह जांचने के लिए होता है कि subquery कुछ rows return करती है या नहीं।", example:"SELECT नाम FROM विद्यार्थी WHERE EXISTS (SELECT 1 FROM गुण WHERE गुण>80);", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]} },
      { id:"notexists", title:"NOT EXISTS 🚫", emoji:"", desc:"NOT EXISTS का मतलब है subquery result नहीं है।", longDesc:"NOT EXISTS का उपयोग यह जांचने के लिए होता है कि subquery कोई rows return नहीं करती।", example:"SELECT नाम FROM विद्यार्थी WHERE NOT EXISTS (SELECT 1 FROM गुण WHERE गुण>90);", before:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]}, after:{headers:["नाम"], rows:[["स्नेहा"],["रोहित"]]} },
      { id:"null", title:"NULL Values 🕳️", emoji:"", desc:"NULL का मतलब है खाली value।", longDesc:"NULL values का उपयोग यह जांचने के लिए होता है कि field में कुछ value है या नहीं।", example:"SELECT नाम FROM विद्यार्थी WHERE पता IS NULL;", before:{headers:["नाम","पता"], rows:[["स्नेहा","Mumbai"],["अमृता",null]]}, after:{headers:["नाम"], rows:[["अमृता"]]} },
      { id:"insert", title:"INSERT INTO ➕", emoji:"", desc:"INSERT का मतलब है नया data डालना।", longDesc:"INSERT INTO का उपयोग नए rows add करने के लिए होता है। columns और values specify किए जाते हैं।", example:"INSERT INTO विद्यार्थी (नाम, उम्र) VALUES ('अजय', 11);", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अजय","11"]]} },
      { id:"update", title:"UPDATE ✏️", emoji:"", desc:"UPDATE का मतलब है पुराना data बदलना।", longDesc:"UPDATE का उपयोग table में मौजूद data बदलने के लिए होता है। WHERE क्लॉज ना लगाने पर सभी rows बदल जाते हैं।", example:"UPDATE विद्यार्थी SET उम्र = 13 WHERE नाम = 'रोहित';", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]}, after:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","13"]]} },
      { id:"delete", title:"DELETE 🗑️", emoji:"", desc:"DELETE का मतलब है पुराना data हटाना।", longDesc:"DELETE का उपयोग table की rows हटाने के लिए होता है। WHERE क्लॉज ना लगाने पर सभी rows delete हो जाते हैं।", example:"DELETE FROM विद्यार्थी WHERE नाम = 'अजय';", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अजय","11"]]}, after:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"]]} },
      { id:"innerjoin", title:"INNER JOIN 🔗", emoji:"", desc:"INNER JOIN का मतलब है दोनों tables में common rows।", longDesc:"INNER JOIN का उपयोग दो tables के बीच matching rows निकालने के लिए होता है। Common column के आधार पर data जुड़ता है।", example:"SELECT विद्यार्थी.नाम, गुण.अंक FROM विद्यार्थी INNER JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाम","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता","4","88"]]}, after:{headers:["नाम","अंक"], rows:[["स्नेहा","85"],["रोहित","90"]]} },
      { id:"leftjoin", title:"LEFT JOIN ⬅️", emoji:"", desc:"LEFT JOIN का मतलब है left table की सारी rows + right की matching।", longDesc:"LEFT JOIN का उपयोग left table की सभी rows लाने के लिए होता है, और अगर right table में match न मिले तो NULL आता है।", example:"SELECT विद्यार्थी.नाम, गुण.अंक FROM विद्यार्थी LEFT JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाम","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता",null,null]]}, after:{headers:["नाम","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],["अमृता",null]]} },
      { id:"rightjoin", title:"RIGHT JOIN ➡️", emoji:"", desc:"RIGHT JOIN का मतलब है right table की सारी rows + left की matching।", longDesc:"RIGHT JOIN का उपयोग right table की सभी rows लाने के लिए होता है, और अगर left table में match न मिले तो NULL आता है।", example:"SELECT विद्यार्थी.नाम, गुण.अंक FROM विद्यार्थी RIGHT JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाम","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],[null,null,"4","88"]]}, after:{headers:["नाम","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],[null,"88"]]} },
      { id:"fulljoin", title:"FULL OUTER JOIN 🌐", emoji:"", desc:"FULL JOIN का मतलब है दोनों tables की सारी rows।", longDesc:"FULL OUTER JOIN का उपयोग दोनों tables की सभी rows लाने के लिए होता है। जहाँ match नहीं है वहाँ NULL आता है।", example:"SELECT विद्यार्थी.नाम, गुण.अंक FROM विद्यार्थी FULL OUTER JOIN गुण ON विद्यार्थी.id = गुण.vid;", before:{headers:["विद्यार्थी.id","नाम","गुण.vid","अंक"], rows:[["1","स्नेहा","1","85"],["2","रोहित","2","90"],["3","अमृता",null,null],[null,null,"4","88"]]}, after:{headers:["नाम","अंक"], rows:[["स्नेहा","85"],["रोहित","90"],["अमृता",null],[null,"88"]]} },
      { id:"selfjoin", title:"SELF JOIN 🔄", emoji:"", desc:"SELF JOIN का मतलब है table को खुद से जोड़ना।", longDesc:"SELF JOIN का उपयोग तब होता है जब एक ही table के अंदर से related data compare करना होता है।", example:"SELECT A.नाम, B.नाम FROM विद्यार्थी A JOIN विद्यार्थी B ON A.उम्र = B.उम्र;", before:{headers:["id","नाम","उम्र"], rows:[["1","स्नेहा","10"],["2","रोहित","12"],["3","अमृता","12"]]}, after:{headers:["A.नाम","B.नाम"], rows:[["रोहित","अमृता"],["अमृता","रोहित"]]} },

      // 🚀 Aggregate Functions
      { id:"count", title:"COUNT() 🔢", emoji:"", desc:"COUNT का मतलब है rows गिनना।", longDesc:"COUNT function का उपयोग किसी table में कितनी rows हैं यह पता करने के लिए होता है।", example:"SELECT COUNT(*) FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["COUNT"], rows:[["3"]]} },
      { id:"sum", title:"SUM() ➕", emoji:"", desc:"SUM का मतलब है जोड़।", longDesc:"SUM function का उपयोग numeric column का total निकालने के लिए होता है।", example:"SELECT SUM(उम्र) FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["SUM"], rows:[["33"]]} },
      { id:"avg", title:"AVG() 📊", emoji:"", desc:"AVG का मतलब है average निकालना।", longDesc:"AVG function का उपयोग किसी numeric column का औसत निकालने के लिए होता है।", example:"SELECT AVG(उम्र) FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["AVG"], rows:[["11"]]} },
      { id:"min", title:"MIN() ⬇️", emoji:"", desc:"MIN का मतलब है सबसे छोटा value।", longDesc:"MIN function का उपयोग किसी column का सबसे छोटा value निकालने के लिए होता है।", example:"SELECT MIN(उम्र) FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["MIN"], rows:[["10"]]} },
      { id:"max", title:"MAX() ⬆️", emoji:"", desc:"MAX का मतलब है सबसे बड़ा value।", longDesc:"MAX function का उपयोग किसी column का सबसे बड़ा value निकालने के लिए होता है।", example:"SELECT MAX(उम्र) FROM विद्यार्थी;", before:{headers:["नाम","उम्र"], rows:[["स्नेहा","10"],["रोहित","12"],["अमृता","11"]]}, after:{headers:["MAX"], rows:[["12"]]} },
  ],
  en: [
    { id:"select", title:"SELECT Statement 🍀", emoji:"", desc:"SELECT means fetching data from database.", longDesc:"The SELECT statement is used to fetch required data from a table. We can choose specific columns.", example:"SELECT name, age FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]} },

    { id:"where", title:"WHERE Clause 🔍", emoji:"", desc:"WHERE means applying condition.", longDesc:"The WHERE clause is used to filter data. Only those rows are chosen which satisfy the condition.", example:"SELECT name FROM Students WHERE age = 10;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["Name"], rows:[["Sneha"]]} },

    { id:"orderby", title:"ORDER BY 📑", emoji:"", desc:"ORDER BY means sorting.", longDesc:"ORDER BY is used to display data in ascending or descending order. For example, age in ascending order.", example:"SELECT name, age FROM Students ORDER BY age ASC;", before:{headers:["Name","Age"], rows:[["Rohit","12"],["Sneha","10"]]}, after:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]} },

    { id:"and", title:"AND Clause ➕", emoji:"", desc:"AND means both conditions must be true.", longDesc:"AND is used to combine multiple conditions. A row is chosen only if all conditions are true.", example:"SELECT name FROM Students WHERE age=10 AND name='Sneha';", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","10"]]}, after:{headers:["Name"], rows:[["Sneha"]]} },

    { id:"or", title:"OR Clause ⚡", emoji:"", desc:"OR means any one condition should be true.", longDesc:"OR is used when a row should be chosen if any condition is true. For example, age 10 or name Rohit.", example:"SELECT name FROM Students WHERE age=10 OR name='Rohit';", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"]]} },

    { id:"like", title:"LIKE Clause 🔠", emoji:"", desc:"LIKE means pattern match.", longDesc:"LIKE is used to match a pattern for choosing rows. For example, names starting with 'R'.", example:"SELECT name FROM Students WHERE name LIKE 'R%';", before:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["Name"], rows:[["Rohit"]]} },

    { id:"in", title:"IN Clause 📦", emoji:"", desc:"IN means choosing from a list of values.", longDesc:"IN is used to choose rows where values match any from a given list. For example, ages 10 or 12.", example:"SELECT name FROM Students WHERE age IN (10,12);", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"]]} },

    { id:"between", title:"BETWEEN Clause 🎯", emoji:"", desc:"BETWEEN means value within a range.", longDesc:"BETWEEN is used to choose rows with values between two numbers. For example, students aged 10 to 12.", example:"SELECT name FROM Students WHERE age BETWEEN 10 AND 12;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["Name"], rows:[["Sneha"],["Amruta"],["Rohit"]]} },

    { id:"anyall", title:"ANY and ALL 🌍", emoji:"", desc:"ANY means any one value, ALL means all conditions true.", longDesc:"ANY and ALL are used for filtering subquery results. ANY = match any value, ALL = match all values.", example:"SELECT name FROM Students WHERE age = ANY (10,12);", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"]]} },

    { id:"union", title:"UNION 🤝", emoji:"", desc:"UNION means merging two queries.", longDesc:"UNION is used to combine results of two queries and remove duplicates.", example:"SELECT name FROM StudentsA UNION SELECT name FROM StudentsB;", before:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"]]} },

    { id:"unionall", title:"UNION ALL 🔗", emoji:"", desc:"UNION ALL means merge but keep duplicates.", longDesc:"UNION ALL is used to combine results of two queries and also keep duplicates.", example:"SELECT name FROM StudentsA UNION ALL SELECT name FROM StudentsB;", before:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]} },

    { id:"intersect", title:"INTERSECT ✂️", emoji:"", desc:"INTERSECT means common values.", longDesc:"INTERSECT is used to get common rows between two queries.", example:"SELECT name FROM StudentsA INTERSECT SELECT name FROM StudentsB;", before:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["Name"], rows:[["Rohit"]]} },

    { id:"minus", title:"MINUS ➖", emoji:"", desc:"MINUS means present in first query but not in second.", longDesc:"MINUS is used to select rows that exist in the first query but not in the second.", example:"SELECT name FROM StudentsA MINUS SELECT name FROM StudentsB;", before:{headers:["Name"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["Name"], rows:[["Sneha"],["Amruta"]]} },

    { id:"not", title:"NOT ❌", emoji:"", desc:"NOT means opposite condition.", longDesc:"NOT is used to negate a condition. For example, NOT IN removes specific values.", example:"SELECT name FROM Students WHERE age NOT IN (10);", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["Name"], rows:[["Rohit"]]} },

    { id:"exists", title:"EXISTS ✅", emoji:"", desc:"EXISTS means subquery has result or not.", longDesc:"EXISTS is used to check if a subquery returns any rows.", example:"SELECT name FROM Students WHERE EXISTS (SELECT 1 FROM Marks WHERE Marks>80);", before:{headers:["Name"], rows:[["Sneha"],["Rohit"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"]]} },

    { id:"notexists", title:"NOT EXISTS 🚫", emoji:"", desc:"NOT EXISTS means subquery has no result.", longDesc:"NOT EXISTS is used to check if a subquery does not return any rows.", example:"SELECT name FROM Students WHERE NOT EXISTS (SELECT 1 FROM Marks WHERE Marks>90);", before:{headers:["Name"], rows:[["Sneha"],["Rohit"]]}, after:{headers:["Name"], rows:[["Sneha"],["Rohit"]]} },

    { id:"null", title:"NULL Values 🕳️", emoji:"", desc:"NULL means empty value.", longDesc:"NULL is used to check if a field has a value or not.", example:"SELECT name FROM Students WHERE address IS NULL;", before:{headers:["Name","Address"], rows:[["Sneha","Mumbai"],["Amruta",null]]}, after:{headers:["Name"], rows:[["Amruta"]]} },

    { id:"insert", title:"INSERT INTO ➕", emoji:"", desc:"INSERT means adding new data.", longDesc:"INSERT INTO is used to add new rows. Columns and values are specified.", example:"INSERT INTO Students (name, age) VALUES ('Ajay', 11);", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Ajay","11"]]} },

    { id:"update", title:"UPDATE ✏️", emoji:"", desc:"UPDATE means modifying old data.", longDesc:"UPDATE is used to modify existing data in a table. Without WHERE clause, all rows are updated.", example:"UPDATE Students SET age = 13 WHERE name = 'Rohit';", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","13"]]} },

    { id:"delete", title:"DELETE 🗑️", emoji:"", desc:"DELETE means removing old data.", longDesc:"DELETE is used to delete rows from a table. Without WHERE clause, all rows are deleted.", example:"DELETE FROM Students WHERE name = 'Ajay';", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Ajay","11"]]}, after:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"]]} },

    { id:"innerjoin", title:"INNER JOIN 🔗", emoji:"", desc:"INNER JOIN means common rows in both tables.", longDesc:"INNER JOIN is used to get matching rows between two tables based on a common column.", example:"SELECT Students.name, Marks.score FROM Students INNER JOIN Marks ON Students.id = Marks.sid;", before:{headers:["Students.id","Name","Marks.sid","Score"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta","4","88"]]}, after:{headers:["Name","Score"], rows:[["Sneha","85"],["Rohit","90"]]} },

    { id:"leftjoin", title:"LEFT JOIN ⬅️", emoji:"", desc:"LEFT JOIN means all rows from left + matching from right.", longDesc:"LEFT JOIN is used to return all rows from left table, with NULL if no match in right table.", example:"SELECT Students.name, Marks.score FROM Students LEFT JOIN Marks ON Students.id = Marks.sid;", before:{headers:["Students.id","Name","Marks.sid","Score"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta",null,null]]}, after:{headers:["Name","Score"], rows:[["Sneha","85"],["Rohit","90"],["Amruta",null]]} },

    { id:"rightjoin", title:"RIGHT JOIN ➡️", emoji:"", desc:"RIGHT JOIN means all rows from right + matching from left.", longDesc:"RIGHT JOIN is used to return all rows from right table, with NULL if no match in left table.", example:"SELECT Students.name, Marks.score FROM Students RIGHT JOIN Marks ON Students.id = Marks.sid;", before:{headers:["Students.id","Name","Marks.sid","Score"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],[null,null,"4","88"]]}, after:{headers:["Name","Score"], rows:[["Sneha","85"],["Rohit","90"],[null,"88"]]} },

    { id:"fulljoin", title:"FULL OUTER JOIN 🌐", emoji:"", desc:"FULL JOIN means all rows from both tables.", longDesc:"FULL OUTER JOIN is used to return all rows from both tables. Where there is no match, NULL is returned.", example:"SELECT Students.name, Marks.score FROM Students FULL OUTER JOIN Marks ON Students.id = Marks.sid;", before:{headers:["Students.id","Name","Marks.sid","Score"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta",null,null],[null,null,"4","88"]]}, after:{headers:["Name","Score"], rows:[["Sneha","85"],["Rohit","90"],["Amruta",null],[null,"88"]]} },

    { id:"selfjoin", title:"SELF JOIN 🔄", emoji:"", desc:"SELF JOIN means joining table with itself.", longDesc:"SELF JOIN is used when comparing related data within the same table.", example:"SELECT A.name, B.name FROM Students A JOIN Students B ON A.age = B.age;", before:{headers:["id","Name","Age"], rows:[["1","Sneha","10"],["2","Rohit","12"],["3","Amruta","12"]]}, after:{headers:["A.Name","B.Name"], rows:[["Rohit","Amruta"],["Amruta","Rohit"]]} },

    // 🚀 Aggregate Functions
    { id:"count", title:"COUNT() 🔢", emoji:"", desc:"COUNT means counting rows.", longDesc:"COUNT function is used to know how many rows are in a table.", example:"SELECT COUNT(*) FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["COUNT"], rows:[["3"]]} },

    { id:"sum", title:"SUM() ➕", emoji:"", desc:"SUM means addition.", longDesc:"SUM function is used to calculate the total of a numeric column.", example:"SELECT SUM(Age) FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["SUM"], rows:[["33"]]} },

    { id:"avg", title:"AVG() 📊", emoji:"", desc:"AVG means calculating average.", longDesc:"AVG function is used to calculate the average of a numeric column.", example:"SELECT AVG(Age) FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["AVG"], rows:[["11"]]} },

    { id:"min", title:"MIN() ⬇️", emoji:"", desc:"MIN means smallest value.", longDesc:"MIN function is used to find the smallest value in a column.", example:"SELECT MIN(Age) FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["MIN"], rows:[["10"]]} },

    { id:"max", title:"MAX() ⬆️", emoji:"", desc:"MAX means largest value.", longDesc:"MAX function is used to find the largest value in a column.", example:"SELECT MAX(Age) FROM Students;", before:{headers:["Name","Age"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["MAX"], rows:[["12"]]} },
]
,

  vr: [
{ id:"select", title:"SELECT स्टेटमेंट 🍀", emoji:"", desc:"Abe dengnya SELECT म्हंजे डेटाबेस मधनं माहिती उचलायचं काम.", longDesc:"भाईताड SELECT वापरतात टेबल मधनं हव ते data उचलाया. झकास columns निवडून तवंगून काढायचं.", example:"SELECT नाव, वय FROM विद्यार्थी;", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]} },

{ id:"where", title:"WHERE क्लॉज 🔍", emoji:"", desc:"Abe jhakola WHERE म्हंजे अट घालायची.", longDesc:"WHERE वापरून bhaitad data फिल्टर करतात. Row फक्त तेव्हाच दिसला जं अट खरं लागली.", example:"SELECT नाव FROM विद्यार्थी WHERE वय = 10;", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["नाव"], rows:[["Sneha"]]} },

{ id:"orderby", title:"ORDER BY 📑", emoji:"", desc:"ORDER BY म्हंजे abe pongya data ला लाइन लावणं.", longDesc:"ORDER BY टाकला की rows ascending वा descending म्हणजेच चढता-उतरता क्रम लावतात.", example:"SELECT नाव, वय FROM विद्यार्थी ORDER BY वय ASC;", before:{headers:["नाव","वय"], rows:[["Rohit","12"],["Sneha","10"]]}, after:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]} },

{ id:"and", title:"AND क्लॉज ➕", emoji:"", desc:"AND म्हंजे abe bhaitad दोनही अटी खरया लागल्या तरच चालतं.", longDesc:"AND क्लॉज टाकलं की झकास सगळ्या conditions खरं हव्यात, नाहीतर बोंबलं.", example:"SELECT नाव FROM विद्यार्थी WHERE वय=10 AND नाव='Sneha';", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","10"]]}, after:{headers:["नाव"], rows:[["Sneha"]]} },

{ id:"or", title:"OR क्लॉज ⚡", emoji:"", desc:"OR म्हंजे abe dengnya एक तरी अट खरं आलं की झालं.", longDesc:"OR वापरतात तेव्हा कोणतीही condition true असली तरी row दिसनार.", example:"SELECT नाव FROM विद्यार्थी WHERE वय=10 OR नाव='Rohit';", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]} },

{ id:"like", title:"LIKE क्लॉज 🔠", emoji:"", desc:"LIKE म्हंजे abe pongya pattern match करायचं.", longDesc:"LIKE वापरतो जं पॅटर्ननं rows ओळखायचेत. जसं नाव ‘R’ नं सुरू झालं का.", example:"SELECT नाव FROM विद्यार्थी WHERE नाव LIKE 'R%';", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["नाव"], rows:[["Rohit"]]} },

{ id:"in", title:"IN क्लॉज 📦", emoji:"", desc:"IN म्हंजे झकास list मध्नं निवडणं.", longDesc:"IN वापरून abe dengnya ठरावीक values पकडून row दिसतो. जसं वय 10 किंवा 12.", example:"SELECT नाव FROM विद्यार्थी WHERE वय IN (10,12);", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]} },

{ id:"between", title:"BETWEEN क्लॉज 🎯", emoji:"", desc:"BETWEEN म्हंजे दोन value मधलं भाईताड.", longDesc:"BETWEEN वापरलं की दोन value च्या हद्दीतलं data दिसतं. हेच झकास 10 ते 12 वय.", example:"SELECT नाव FROM विद्यार्थी WHERE वय BETWEEN 10 AND 12;", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Amruta"],["Rohit"]]} },

{ id:"anyall", title:"ANY आणि ALL 🌍", emoji:"", desc:"ANY म्हंजे abe pongya एक जुळलं तरी चालतं, ALL म्हंजे सगळं जुळायलाच हव.", longDesc:"ANY वा ALL subquery सोबत filter करतं. ANY = एक जरी match, ALL = सगळंच match.", example:"SELECT नाव FROM विद्यार्थी WHERE वय = ANY (10,12);", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]} },

{ id:"union", title:"UNION 🤝", emoji:"", desc:"UNION म्हंजे abe bhaitad दोन result मिक्स करायचे.", longDesc:"UNION दोन queries एकत्र करतो पण duplicates कागदासारखं फेकतो.", example:"SELECT नाव FROM विद्यार्थीA UNION SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"]]} },

{ id:"unionall", title:"UNION ALL 🔗", emoji:"", desc:"UNION ALL वापरलं की abe jhakola duplicate पण राहतात.", longDesc:"UNION ALL queries चिकटवतो सगल्यासकट.", example:"SELECT नाव FROM विद्यार्थीA UNION ALL SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"],["Sneha"]]} },

{ id:"intersect", title:"INTERSECT ✂️", emoji:"", desc:"INTERSECT म्हंजे कॉमन value, abe pongya.", longDesc:"दोन queries मधलं common झकास फक्त हाच देतो.", example:"SELECT नाव FROM विद्यार्थीA INTERSECT SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["नाव"], rows:[["Rohit"]]} },

{ id:"minus", title:"MINUS ➖", emoji:"", desc:"MINUS म्हंजे abe bhaitad पहिल्यातलं दुसऱ्यात नाही ते.", longDesc:"MINUS पहिल्यातलं data ठेवतो दुसऱ्यातलं काढून टाकतो.", example:"SELECT नाव FROM विद्यार्थीA MINUS SELECT नाव FROM विद्यार्थीB;", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"],["Amruta"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Amruta"]]} },

{ id:"not", title:"NOT ❌", emoji:"", desc:"NOT म्हंजे उलटी अट, abe dengnya.", longDesc:"NOT वापरलं की हे नको तं data उडवतो. उदा. NOT IN value काढून टाकतो.", example:"SELECT नाव FROM विद्यार्थी WHERE वय NOT IN (10);", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["नाव"], rows:[["Rohit"]]} },

{ id:"exists", title:"EXISTS ✅", emoji:"", desc:"EXISTS भाय, subquery कडं काही आलंय का नाही ते बघायचं.", longDesc:"EXISTS टाकलं की subquery result आला तरीच rows दिसतात.", example:"SELECT नाव FROM विद्यार्थी WHERE EXISTS (SELECT 1 FROM गुण WHERE गुण>80);", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]} },

{ id:"notexists", title:"NOT EXISTS 🚫", emoji:"", desc:"NOT EXISTS म्हंजे abe pongya subquery रिकामं आलं तर चालतं.", longDesc:"NOT EXISTS check करतो की काही data परत आलं नाही तरच row पकडतो.", example:"SELECT नाव FROM विद्यार्थी WHERE NOT EXISTS (SELECT 1 FROM गुण WHERE गुण>90);", before:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]}, after:{headers:["नाव"], rows:[["Sneha"],["Rohit"]]} },

{ id:"null", title:"NULL Values 🕳️", emoji:"", desc:"NULL म्हंजे रिकामं, भाय.", longDesc:"NULL check करतं की value नाही आली तर का आहे. Null मस्त सांगतो कुठं काहीच नाही.", example:"SELECT नाव FROM विद्यार्थी WHERE पत्ता IS NULL;", before:{headers:["नाव","पत्ता"], rows:[["Sneha","Mumbai"],["Amruta",null]]}, after:{headers:["नाव"], rows:[["Amruta"]]} },

{ id:"insert", title:"INSERT INTO ➕", emoji:"", desc:"INSERT म्हंजे abe dengnya नवं data घुसडायचं.", longDesc:"INSERT INTO वापरून झकास नया row टाकता येतो.", example:"INSERT INTO विद्यार्थी (नाव, वय) VALUES ('Ajay', 11);", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Ajay","11"]]} },

{ id:"update", title:"UPDATE ✏️", emoji:"", desc:"UPDATE म्हंजे जुना माल बदलायचं काम भाईताड.", longDesc:"UPDATE टाकलं की data बदलतो. WHERE नसलं तर सगळंच बदलतं पुंग्या.", example:"UPDATE विद्यार्थी SET वय = 13 WHERE नाव = 'Rohit';", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]}, after:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","13"]]} },

{ id:"delete", title:"DELETE 🗑️", emoji:"", desc:"DELETE टाकलं की abe jhakola जुना माल काढून टाकायचा.", longDesc:"DELETE rows उडवतो. WHERE नाही दिलं तर सगळचं खतम.", example:"DELETE FROM विद्यार्थी WHERE नाव = 'Ajay';", before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Ajay","11"]]}, after:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"]]} },

{ id:"innerjoin", title:"INNER JOIN 🔗", emoji:"", desc:"INNER JOIN म्हंजे abe jhakola दोन table मधलं कॉमन data.", 
longDesc:"INNER JOIN वापरलं की दोन table मधले common rows उचलतो. नाही match झालं तर दारातुन पळवलं जातं भाईताड.", 
example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी INNER JOIN गुण ON विद्यार्थी.id = गुण.vid;", 
before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta","4","88"]]}, 
after:{headers:["नाव","अंक"], rows:[["Sneha","85"],["Rohit","90"]]} },

{ id:"leftjoin", title:"LEFT JOIN ⬅️", emoji:"", desc:"LEFT JOIN म्हंजे abe dengnya left tableचं सगळं + right मधलं जुळलं तेवढं.", 
longDesc:"LEFT JOIN करतं left table ला full support bhaitad! Right table match नसलं तर NULL पाठवून देतो…पुंग्या.", 
example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी LEFT JOIN गुण ON विद्यार्थी.id = गुण.vid;", 
before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta",null,null]]}, 
after:{headers:["नाव","अंक"], rows:[["Sneha","85"],["Rohit","90"],["Amruta",null]]} },

{ id:"rightjoin", title:"RIGHT JOIN ➡️", emoji:"", desc:"RIGHT JOIN म्हंजे abe bhaitad right table राजा बनतो.", 
longDesc:"RIGHT JOIN टाकलं की right tableचं सगळं आलं. Left नसलं तर NULL टाकतं, pongya.", 
example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी RIGHT JOIN गुण ON विद्यार्थी.id = गुण.vid;", 
before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],[null,null,"4","88"]]}, 
after:{headers:["नाव","अंक"], rows:[["Sneha","85"],["Rohit","90"],[null,"88"]]} },

{ id:"fulljoin", title:"FULL OUTER JOIN 🌐", emoji:"", desc:"FULL JOIN म्हंजे abe pongya दोन्ही tables चं लग्न – सगळं आलं नाही match झालं तरी.", 
longDesc:"FULL OUTER JOIN भाय दोन्ही tables ला एकत्र आणतो, match नसलं तरी NULL देतो. झकास समेट.", 
example:"SELECT विद्यार्थी.नाव, गुण.अंक FROM विद्यार्थी FULL OUTER JOIN गुण ON विद्यार्थी.id = गुण.vid;", 
before:{headers:["विद्यार्थी.id","नाव","गुण.vid","अंक"], rows:[["1","Sneha","1","85"],["2","Rohit","2","90"],["3","Amruta",null,null],[null,null,"4","88"]]}, 
after:{headers:["नाव","अंक"], rows:[["Sneha","85"],["Rohit","90"],["Amruta",null],[null,"88"]]} },

{ id:"selfjoin", title:"SELF JOIN 🔄", emoji:"", desc:"SELF JOIN म्हंजे abe dengnya टेबलनं स्वत:लाच मिठी मारली.", 
longDesc:"SELF JOIN वापरलो की एकच table दुसऱ्या copy सोबत जोडतं… झकास तुलना होऊन जाते भाय!", 
example:"SELECT A.नाव, B.नाव FROM विद्यार्थी A JOIN विद्यार्थी B ON A.वय = B.वय;", 
before:{headers:["id","नाव","वय"], rows:[["1","Sneha","10"],["2","Rohit","12"],["3","Amruta","12"]]}, 
after:{headers:["A.नाव","B.नाव"], rows:[["Rohit","Amruta"],["Amruta","Rohit"]]} },

// 🚀 Aggregate Functions
{ id:"count", title:"COUNT() 🔢", emoji:"", desc:"COUNT म्हंजे abe bhaitad rows ची मोजदाद.", 
longDesc:"COUNT फंक्शन सांगतं table मध्ये किती ओळी आहेत. झकास हिशेब!", 
example:"SELECT COUNT(*) FROM विद्यार्थी;", 
before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, 
after:{headers:["COUNT"], rows:[["3"]]} },

{ id:"sum", title:"SUM() ➕", emoji:"", desc:"SUM म्हंजे abe pongya आकडा एकत्र करून जोडायचा.", 
longDesc:"SUM फंक्शन चक्क आकड्यांचा total देतो. एकदम झकास हिसाब.", 
example:"SELECT SUM(वय) FROM विद्यार्थी;", 
before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, 
after:{headers:["SUM"], rows:[["33"]]} },

{ id:"avg", title:"AVG() 📊", emoji:"", desc:"AVG म्हंजे abe dengnya सरासरी काढायची.", 
longDesc:"AVG फंक्शन डेटा चं सरासरी value देतो. एकदम शांत गणित.", 
example:"SELECT AVG(वय) FROM विद्यार्थी;", 
before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, 
after:{headers:["AVG"], rows:[["11"]]} },

{ id:"min", title:"MIN() ⬇️", emoji:"", desc:"MIN म्हंजे भाईताड सगळ्यात लहान value शोधायचं.", 
longDesc:"MIN फंक्शन डेटा मधलं कमीचं कमी value सांगतो. एकदम jhakola छोटा.", 
example:"SELECT MIN(वय) FROM विद्यार्थी;", 
before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, 
after:{headers:["MIN"], rows:[["10"]]} },

{ id:"max", title:"MAX() ⬆️", emoji:"", desc:"MAX म्हंजे abe bhaitad सगळ्यात मोठा value.", 
longDesc:"MAX फंक्शन data मधलं ultimate टाकाऊ मोठं value दाखवतो — एकदम raigadacha raja.", 
example:"SELECT MAX(वय) FROM विद्यार्थी;", 
before:{headers:["नाव","वय"], rows:[["Sneha","10"],["Rohit","12"],["Amruta","11"]]}, 
after:{headers:["MAX"], rows:[["12"]]} }

],
 // Placeholder for future content
  mb: [ "hi"], // Placeholder for future content  
  hy: [ "hi"], // Placeholder for future content
  np: [ "hi"], // Placeholder for future content
};  

// Add placeholder lessons for Mumbaiya, Hyderabadi, and Nagpuri
["mb", "hy", "np"].forEach(lang => {
  if (lang === "mb") {
    lessons[lang] = [
      {
        id: "comingsoon",
        title: "Lessons Coming Soon 🚀",
        emoji: "⏳",
        desc: "Abe bhidu, lessons jaldi aayenge!",
        longDesc: "Hum SQL lessons Mumbaiya style mein laane ki tayari kar rahe hain. Thoda intezaar karo!",
        example: "-- Abhi koi example nahi hai --",
        before: { headers: ["Column1", "Column2"], rows: [["--", "--"]] },
        after: { headers: ["Column1", "Column2"], rows: [["--", "--"]] }
      }
    ];
  } else if (lang === "hy") {
    lessons[lang] = [
      {
        id: "comingsoon",
        title: "Lessons Coming Soon 🚀",
        emoji: "⏳",
        desc: "Arrey miyan, lessons jaldi aane waale hain!",
        longDesc: "Hyderabadi style mein SQL lessons laane ki tayari ho rahi hai. Thoda sabr karo miyan!",
        example: "-- Abhi koi example nahi hai --",
        before: { headers: ["Column1", "Column2"], rows: [["--", "--"]] },
        after: { headers: ["Column1", "Column2"], rows: [["--", "--"]] }
      }
    ];
  } else if (lang === "np") {
    lessons[lang] = [
      {
        id: "comingsoon",
        title: "Lessons Coming Soon 🚀",
        emoji: "⏳",
        desc: "Abe mama, lessons jaldi aayenge!",
        longDesc: "Nagpuri style mein SQL lessons laane ki tayari ho rahi hai. Thoda ruk ja mama!",
        example: "-- Abhi koi example nahi hai --",
        before: { headers: ["Column1", "Column2"], rows: [["--", "--"]] },
        after: { headers: ["Column1", "Column2"], rows: [["--", "--"]] }
      }
    ];
  }
});
// DOM Elements
const landing = document.getElementById("landing");
const app = document.getElementById("app");
const topicList = document.getElementById("topicList");
const lessonArea = document.getElementById("lessonArea");
const contentTitle = document.querySelector(".content-title");
const contentSub = document.querySelector(".content-sub");
const langBtns = document.querySelectorAll(".btn");
document.addEventListener("DOMContentLoaded", function() {
  // ...your code here...
});

// Language selection
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang === "mr" || lang === "hi" || lang === "en" || lang === "vr"
    || lang === "mb" || lang === "hy" || lang === "np") {
      currentLang = lang;
      landing.classList.add("hide");
      app.classList.add("show");
      document.getElementById("topicsTitle").textContent = `SQL - ${langNames[lang]}`;
      loadTopics();

      // 👇 Reset main page text according to selected language
      contentTitle.textContent = startTexts[currentLang].title;
      contentSub.textContent = startTexts[currentLang].sub;
      lessonArea.innerHTML = ""; // clear any old lesson
    }
  });
});


// Load topics in sidebar
function loadTopics() {
  topicList.innerHTML = "";
  lessons[currentLang].forEach((lesson, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="emoji">${lesson.emoji}</span> ${lesson.title}`;
    li.addEventListener("click", () => selectLesson(idx, li));
    topicList.appendChild(li);
  });
}

// When topic is clicked
// ...existing code...
function selectLesson(index, element) {
  // Reset active
  topicList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");

  const lesson = lessons[currentLang][index];

  // Update lesson heading and description
  contentTitle.innerHTML = `${lesson.emoji} ${lesson.title}`;
  contentSub.innerHTML = `<p>${lesson.longDesc}</p>`;

  lessonArea.innerHTML = `
    <div class="example-block">
      <strong>SQL Example:</strong>
      <code>${lesson.example}</code>
      <p class="output-caption before">Before:</p>
      ${makeTable(lesson.before.headers, lesson.before.rows)}
      <p class="output-caption after">After:</p>
      ${makeTable(lesson.after.headers, lesson.after.rows)}
    </div>
  `;
}
// ...existing code...

// Generate table HTML
function generateTable(data) {
  let html = "<table class='sql-output'><thead><tr>";
  data.headers.forEach(h => html += `<th>${h}</th>`);
  html += "</tr></thead><tbody>";
  data.rows.forEach(row => {
    html += "<tr>";
    row.forEach(cell => html += `<td>${cell === null ? "NULL" : cell}</td>`);
    html += "</tr>";
  });
  html += "</tbody></table>";
  return html;
}




// Add responsive design for mobile
function setupResponsiveDesign() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.createElement("button");
  toggleButton.id = "sidebarToggle";
  toggleButton.textContent = "☰";
  toggleButton.classList.add("sidebar-toggle");

  // Add toggle button to the header
  document.querySelector("header").prepend(toggleButton);

  // Toggle sidebar visibility on button click
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      sidebar.classList.remove("show");
    }
  });
}

// Call the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", setupResponsiveDesign);
