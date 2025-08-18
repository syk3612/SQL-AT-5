const langNames = { mr: "मराठी", hi: "हिन्दी" };
let currentLang = "mr"; // default

const startTexts = {
  mr: {
    title: "SQL शिकायला सुरू करा",
    sub: "डावीकडील विषय निवडा."
  },
  hi: {
    title: "SQL सीखना शुरू कीजिए",
    sub: "बाएँ तरफ से कोई विषय चुनें।"
  }
};


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
    // ---- Joins, Aggregate functions (same as before in Marathi) ----
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
    // 👉 बाकी सारे lessons Marathi जैसे ही Hindi में अनुवाद करके इसी array में डालें
  ]
};

// DOM Elements
const landing = document.getElementById("landing");
const app = document.getElementById("app");
const topicList = document.getElementById("topicList");
const lessonArea = document.getElementById("lessonArea");
const contentTitle = document.querySelector(".content-title");
const contentSub = document.querySelector(".content-sub");
const langBtns = document.querySelectorAll(".btn");

// Language selection
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang === "mr" || lang === "hi") {
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
      ${generateTable(lesson.before)}
      <p class="output-caption after">After:</p>
      ${generateTable(lesson.after)}
    </div>
  `;
}

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
