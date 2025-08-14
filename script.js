// script.js
const langNames = { mr: "MARATHI", hi: "HINDI", en: "ENGLISH" };

/* -------------------------
   Helpers
   ------------------------- */
function makeTable(headers, rows) {
  let html = '<table class="sql-output"><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach(row => {
    html += '<tr>';
    row.forEach(cell => html += `<td>${cell === null ? 'NULL' : escapeHtml(cell)}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

function escapeHtml(str) {
  if (str === null) return 'NULL';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function lesson(title, explanation, examples) {
  return `
    <h1 class="content-title">${title}</h1>
    <p class="lesson-text">${explanation}</p>
    ${examples.map(ex => `
      <div class="example-block">
        <p class="lesson-text">📌 <code>${escapeHtml(ex.query)}</code></p>
        <div class="output-table">${ex.output}</div>
      </div>
    `).join('')}
  `;
}

/* -------------------------
   Sample data will be used to build outputs
   ------------------------- */
const TOYS_ROWS = [
  [1, 'Car', 'Red', 'Car', 200],
  [2, 'Train', 'Blue', 'Train', 150],
  [3, 'Ball', 'Green', 'Ball', 50],
  [4, 'Puzzle', 'Red', 'Puzzle', 300],
  [5, 'Doll', 'Pink', 'Doll', 100]
];

const CUSTOMERS_ROWS = [
  [1, 'Sahil', 'Pune'],
  [2, 'Anita', 'Mumbai'],
  [3, 'Ravi', 'Delhi']
];

const ORDERS_ROWS = [
  [101, 1, 1],
  [102, 1, 3],
  [103, 2, 2]
];

const STUDENTS_ROWS = [
  [1, 'Asha'],
  [2, 'Vikram'],
  [3, 'Neha']
];

const SPORTS_ROWS = [
  ['Vikram'],
  ['Rahul'],
  ['Asha']
];

/* prebuilt HTML table snippets (for brief reuse) */
const TOYS_TABLE = makeTable(['ID', 'Name', 'Color', 'Type', 'Price'], TOYS_ROWS);
const CUSTOMERS_TABLE = makeTable(['ID','Name','City'], CUSTOMERS_ROWS);
const ORDERS_TABLE = makeTable(['OrderID','CustomerID','ToyID'], ORDERS_ROWS);
const STUDENTS_TABLE = makeTable(['ID','Name'], STUDENTS_ROWS);
const SPORTS_TABLE = makeTable(['Name'], SPORTS_ROWS);

/* -------------------------
   Language click handling
   ------------------------- */
document.querySelectorAll('.btn[data-lang]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const lang = btn.dataset.lang;
    document.querySelector('.lang-name').textContent = langNames[lang] || "ENGLISH";
    document.getElementById('landing').classList.add('hide');
    const app = document.getElementById('app');
    app.removeAttribute('aria-hidden');
    app.classList.add('show');
    window.scrollTo(0, 0);
  });
});

/* -------------------------
   Topic click handler — all lessons
   ------------------------- */
document.getElementById('topicList').addEventListener('click', e => {
  if (!(e.target && e.target.tagName === 'LI')) return;
  const topic = e.target.textContent.trim();
  let contentHTML = '';

  /* SELECT */
  if (topic === "SELECT Statement") {
    contentHTML = lesson(
      "SELECT Statement",
      "👶 SELECT म्हणजे SQL मध्ये विचारायचं की 'मला कुठली माहिती पाहिजे?' — जसे तुला फक्त खेळणीची नावं हवी आहेत तर SELECT वापरतो. SELECT * म्हणजे सगळं दाखव, SELECT Name म्हणजे फक्त नाव दाखव.",
      [
        { query: "SELECT * FROM Toys;", output: TOYS_TABLE },
        { query: "SELECT Name, Price FROM Toys;", output: makeTable(['Name','Price'], TOYS_ROWS.map(r => [r[1], r[4]])) }
      ]
    );
  }

  /* WHERE */
  else if (topic === "WHERE Clause") {
    contentHTML = lesson(
      "WHERE Clause",
      "👶 WHERE म्हणजे 'अट लावणे' — फक्त ती नोंदी दाखवा ज्या एका विशिष्ट अटीला लागतात (उदा., लाल खेळणी, किंमत मोठी असलेली).",
      [
        { query: "SELECT * FROM Toys WHERE Color = 'Red';",
          output: makeTable(['ID','Name','Color','Price'], TOYS_ROWS.filter(r => r[2]==='Red').map(r => [r[0], r[1], r[2], r[4]]))
        },
        { query: "SELECT Name FROM Toys WHERE Price > 150;",
          output: makeTable(['Name','Price'], TOYS_ROWS.filter(r => r[4] > 150).map(r => [r[1], r[4]]))
        }
      ]
    );
  }

  /* ORDER BY */
  else if (topic === "ORDER BY") {
    contentHTML = lesson(
      "ORDER BY",
      "👶 ORDER BY वापरून आपली माहिती क्रमबद्ध करतो — नावानुसार A→Z किंवा किमतीनुसार वरून खाली (DESC) इ. जसे खेळण्यांना सुबक रांगेत लावणे.",
      [
        { query: "SELECT * FROM Toys ORDER BY Name ASC;",
          output: makeTable(['ID','Name'], TOYS_ROWS.slice().sort((a,b)=> a[1].localeCompare(b[1])).map(r=>[r[0], r[1]]))
        },
        { query: "SELECT * FROM Toys ORDER BY Price DESC;",
          output: makeTable(['Name','Price'], TOYS_ROWS.slice().sort((a,b)=> b[4]-a[4]).map(r=>[r[1], r[4]]))
        }
      ]
    );
  }

  /* AND */
  else if (topic === "AND") {
    contentHTML = lesson(
      "AND",
      "👶 AND म्हणजे 'दोन्ही अटी खर्या असायला हव्यात' — जसे लाल आणि Car प्रकार दोन्ही हवे असले पाहिजे.",
      [
        { query: "SELECT * FROM Toys WHERE Color='Red' AND Type='Car';",
          output: makeTable(['ID','Name','Color','Type'], TOYS_ROWS.filter(r=> r[2]==='Red' && r[3]==='Car').map(r=>[r[0],r[1],r[2],r[3]]))
        },
        { query: "SELECT * FROM Toys WHERE Price>100 AND Color='Blue';",
          output: makeTable(['ID','Name','Price','Color'], TOYS_ROWS.filter(r=> r[4]>100 && r[2]==='Blue').map(r=>[r[0],r[1],r[4],r[2]]))
        }
      ]
    );
  }

  /* OR */
  else if (topic === "OR") {
    contentHTML = lesson(
      "OR",
      "👶 OR म्हणजे 'किंवा' — जरी एक अट खरी असली तरी चालते. (उदा., लाल किंवा Car).",
      [
        { query: "SELECT * FROM Toys WHERE Color='Red' OR Type='Car';",
          output: makeTable(['ID','Name','Color','Type'],
            TOYS_ROWS.filter(r=> r[2]==='Red' || r[3]==='Car').map(r=>[r[0],r[1],r[2],r[3]]))
        },
        { query: "SELECT * FROM Toys WHERE Price<100 OR Color='Green';",
          output: makeTable(['Name','Price','Color'],
            TOYS_ROWS.filter(r=> r[4]<100 || r[2]==='Green').map(r=>[r[1], r[4], r[2]]))
        }
      ]
    );
  }

  /* LIKE */
  else if (topic === "LIKE") {
    contentHTML = lesson(
      "LIKE",
      "👶 LIKE वापरून आपण नावाचा पॅटर्न शोधतो. '%' म्हणजे 'काहीही अक्षरे'. उदा., 'C%' म्हणजे 'C' ने सुरू होणारे.",
      [
        { query: "SELECT * FROM Toys WHERE Name LIKE 'C%';",
          output: makeTable(['ID','Name'], TOYS_ROWS.filter(r=> r[1].startsWith('C')).map(r=>[r[0], r[1]]))
        },
        { query: "SELECT * FROM Toys WHERE Name LIKE '%l';",
          output: makeTable(['ID','Name'], TOYS_ROWS.filter(r=> r[1].endsWith('l')).map(r=>[r[0], r[1]]))
        }
      ]
    );
  }

  /* IN */
  else if (topic === "IN") {
    contentHTML = lesson(
      "IN",
      "👶 IN म्हणजे 'त्यातला आहे का?' — एकाच वेळी अनेक मूल्ये तपासता येतात.",
      [
        { query: "SELECT * FROM Toys WHERE Color IN ('Red','Blue');",
          output: makeTable(['ID','Name','Color'], TOYS_ROWS.filter(r=> ['Red','Blue'].includes(r[2])).map(r=>[r[0], r[1], r[2]]))
        },
        { query: "SELECT Name FROM Toys WHERE Type IN ('Car','Ball');",
          output: makeTable(['Name'], TOYS_ROWS.filter(r=> ['Car','Ball'].includes(r[3])).map(r=>[r[1]]))
        }
      ]
    );
  }

  /* BETWEEN */
  else if (topic === "BETWEEN") {
    contentHTML = lesson(
      "BETWEEN",
      "👶 BETWEEN म्हणजे 'दरम्यान' — दोन मूल्यांच्या मधल्या नोंदी (दोन्ही बाजू समाविष्ट).",
      [
        { query: "SELECT * FROM Toys WHERE Price BETWEEN 100 AND 250;",
          output: makeTable(['ID','Name','Price'], TOYS_ROWS.filter(r=> r[4]>=100 && r[4]<=250).map(r=>[r[0], r[1], r[4]]))
        },
        { query: "SELECT Name FROM Toys WHERE Price BETWEEN 50 AND 150;",
          output: makeTable(['Name'], TOYS_ROWS.filter(r=> r[4]>=50 && r[4]<=150).map(r=>[r[1]]))
        }
      ]
    );
  }

  /* ANY and ALL */
  else if (topic === "ANY and ALL") {
    contentHTML = lesson(
      "ANY and ALL",
      "👶 ANY म्हणजे 'यादीतील कोणतेही एक' पुरेसे आहे; ALL म्हणजे 'सर्वांपेक्षा' म्हणून तुलना होते. (हे subquery/array संदर्भात कामी येते).",
      [
        { query: "SELECT * FROM Toys WHERE Price > ANY (100,200);",
          output: makeTable(['Name','Price'], TOYS_ROWS.filter(r=> r[4] > 100).map(r=>[r[1], r[4]]))
        },
        { query: "SELECT * FROM Toys WHERE Price > ALL (50,100);",
          output: makeTable(['Name','Price'], TOYS_ROWS.filter(r=> r[4] > 100).map(r=>[r[1], r[4]]))
        }
      ]
    );
  }

  /* UNION */
  else if (topic === "UNION") {
    contentHTML = lesson(
      "UNION",
      "👶 UNION दोन SELECT चा योग करतो आणि duplicate काढून टाकतो — म्हणजे unique नोंदी परत.",
      [
        { query: "SELECT Name FROM Students UNION SELECT Name FROM Sports;",
          output: makeTable(['Name'], Array.from(new Set(STUDENTS_ROWS.map(r=>r[1]).concat(SPORTS_ROWS.map(r=>r[0])))).map(n=>[n]))
        },
        { query: "SELECT Color FROM Toys UNION SELECT Color FROM Gifts;",
          output: makeTable(['Color'], Array.from(new Set(TOYS_ROWS.map(r=>r[2]).concat(['Purple','Red']))).map(c=>[c]))
        }
      ]
    );
  }

  /* UNION ALL */
  else if (topic === "UNION ALL") {
    contentHTML = lesson(
      "UNION ALL",
      "👶 UNION ALL एकत्र करते परंतु duplicates ठेवते — म्हणजे सर्व नोंदी जश्या आहेत तशा परत येतात.",
      [
        { query: "SELECT Name FROM Students UNION ALL SELECT Name FROM Sports;",
          output: makeTable(['Name'], STUDENTS_ROWS.map(r=>[r[1]]).concat(SPORTS_ROWS.map(r=>[r[0]])))
        },
        { query: "SELECT Color FROM Toys UNION ALL SELECT Color FROM Gifts;",
          output: makeTable(['Color'], TOYS_ROWS.map(r=>[r[2]]).concat([['Red']]))
        }
      ]
    );
  }

  /* INTERSECT */
  else if (topic === "INTERSECT") {
    contentHTML = lesson(
      "INTERSECT",
      "👶 INTERSECT म्हणजे दोन्ही lists मधील common items परत करतो — म्हणजे common भाग.",
      [
        { query: "SELECT Name FROM Students INTERSECT SELECT Name FROM Sports;",
          output: makeTable(['Name'], STUDENTS_ROWS.map(r=>r[1]).filter(n => SPORTS_ROWS.some(s=> s[0]===n)).map(n=>[n]))
        },
        { query: "SELECT Color FROM Toys INTERSECT SELECT Color FROM Gifts;",
          output: makeTable(['Color'], ['Red'].map(c=>[c]))
        }
      ]
    );
  }

  /* MINUS */
  else if (topic === "MINUS") {
    contentHTML = lesson(
      "MINUS",
      "👶 MINUS म्हणजे पहिल्या यादीतील जे items दुसऱ्या यादीत नाहीत ते परत करणे.",
      [
        { query: "SELECT Name FROM Toys MINUS SELECT Name FROM BrokenToys;",
          output: makeTable(['Name'], TOYS_ROWS.map(r=>[r[1]])) // simplified example: show toys (pretend BrokenToys empty)
        },
        { query: "SELECT Color FROM Toys MINUS SELECT Color FROM Gifts;",
          output: makeTable(['Color'], TOYS_ROWS.map(r=>[r[2]]).filter((v,i,self)=> self.indexOf(v)===i)) // unique toy colors
        }
      ]
    );
  }

  /* NOT */
  else if (topic === "NOT") {
    contentHTML = lesson(
      "NOT",
      "👶 NOT म्हणजे अट उलट करणे — जिथे अट लागू होत नाही तिथल्या नोंदी परत करा.",
      [
        { query: "SELECT * FROM Toys WHERE NOT Color='Red';",
          output: makeTable(['ID','Name','Color'], TOYS_ROWS.filter(r=> r[2] !== 'Red').map(r=>[r[0], r[1], r[2]]))
        },
        { query: "SELECT Name FROM Toys WHERE NOT Price>200;",
          output: makeTable(['Name'], TOYS_ROWS.filter(r=> r[4] <= 200).map(r=>[r[1]]))
        }
      ]
    );
  }

  /* EXISTS */
  else if (topic === "EXISTS") {
    contentHTML = lesson(
      "EXISTS",
      "👶 EXISTS तपासतो की दुसऱ्या टेबलमध्ये संबंधित नोंद आहे का — उदा., एखाद्या customer ने order दिलाय की नाही.",
      [
        { query: "SELECT Name FROM Customers c WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.CustomerID = c.ID);",
          output: makeTable(['Name'], CUSTOMERS_ROWS.filter(c => ORDERS_ROWS.some(o=> o[1] === c[0])).map(c=>[c[1]]))
        },
        { query: "SELECT * FROM Toys t WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.ToyID = t.ID);",
          output: makeTable(['ID','Name'], TOYS_ROWS.filter(t=> ORDERS_ROWS.some(o=> o[2] === t[0])).map(t=>[t[0],t[1]]))
        }
      ]
    );
  }

  /* NOT EXISTS */
  else if (topic === "NOT EXISTS") {
    contentHTML = lesson(
      "NOT EXISTS",
      "👶 NOT EXISTS म्हणजे दुसऱ्या टेबलमध्ये जुळणारी नोंद नाही — जशी ग्राहकाने कोणतीही ऑर्डर दिलेली नाही.",
      [
        { query: "SELECT Name FROM Customers c WHERE NOT EXISTS (SELECT 1 FROM Orders o WHERE o.CustomerID = c.ID);",
          output: makeTable(['Name'], CUSTOMERS_ROWS.filter(c => !ORDERS_ROWS.some(o=> o[1] === c[0])).map(c=>[c[1]]))
        },
        { query: "SELECT * FROM Toys t WHERE NOT EXISTS (SELECT 1 FROM Orders o WHERE o.ToyID = t.ID);",
          output: makeTable(['ID','Name'], TOYS_ROWS.filter(t=> !ORDERS_ROWS.some(o=> o[2] === t[0])).map(t=>[t[0], t[1]]))
        }
      ]
    );
  }

  /* NULL Values */
  else if (topic === "NULL Values") {
    contentHTML = lesson(
      "NULL Values",
      "👶 NULL म्हणजे माहिती उपलब्ध नाही — काही cell रिकामी (unknown). IS NULL आणि IS NOT NULL वापरून शोधता येते.",
      [
        { query: "SELECT * FROM Toys WHERE Price IS NULL;",
          output: makeTable(['ID','Name','Price'], [[6, 'Robot', null]]) // example showing a NULL row
        },
        { query: "SELECT Name FROM Customers WHERE Phone IS NULL;",
          output: makeTable(['Name'], [['Ravi']])
        }
      ]
    );
  }

  /* INSERT INTO */
  else if (topic === "INSERT INTO") {
    contentHTML = lesson(
      "INSERT INTO",
      "👶 INSERT म्हणजे नवीन row टेबलमध्ये घालणे — जसे नवीन खेळणी बॉक्समध्ये ठेवणे. Before/After दाखवतो.",
      [
        {
          query: "INSERT INTO Toys (ID,Name,Color,Type,Price) VALUES (6,'Robot','Silver','Robot',400);",
          output: `<div class="output-caption"><strong>Before:</strong></div>${TOYS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name','Color','Type','Price'], TOYS_ROWS.concat([[6,'Robot','Silver','Robot',400]]))}`
        },
        {
          query: "INSERT INTO Customers (ID,Name,City) VALUES (4,'Priya','Pune');",
          output: `<div class="output-caption"><strong>Before:</strong></div>${CUSTOMERS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name','City'], CUSTOMERS_ROWS.concat([[4,'Priya','Pune']]))}`
        }
      ]
    );
  }

  /* UPDATE */
  else if (topic === "UPDATE") {
    contentHTML = lesson(
      "UPDATE",
      "👶 UPDATE म्हणजे आधीच असलेल्या row ची माहिती बदलणे — जसे खेळण्याचा रंग बदलला तर तो बदल नोंदीत करता येतो.",
      [
        {
          query: "UPDATE Toys SET Color='Blue' WHERE Name='Car';",
          output: `<div class="output-caption"><strong>Before:</strong></div>${TOYS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name','Color'], TOYS_ROWS.map(r => r[1] === 'Car' ? [r[0], r[1], 'Blue'] : [r[0], r[1], r[2]]))}`
        },
        {
          query: "UPDATE Customers SET City='Mumbai' WHERE Name='Sahil';",
          output: `<div class="output-caption"><strong>Before:</strong></div>${CUSTOMERS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name','City'], CUSTOMERS_ROWS.map(c => c[1] === 'Sahil' ? [c[0], c[1], 'Mumbai'] : c))}`
        }
      ]
    );
  }

  /* DELETE */
  else if (topic === "DELETE") {
    contentHTML = lesson(
      "DELETE",
      "👶 DELETE म्हणजे एखादी row काढून टाकणे — जशी खराब झालेली खेळणी काढून टाकतो.",
      [
        {
          query: "DELETE FROM Toys WHERE Name='Car';",
          output: `<div class="output-caption"><strong>Before:</strong></div>${TOYS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name'], TOYS_ROWS.filter(r => r[1] !== 'Car').map(r=>[r[0], r[1]]))}`
        },
        {
          query: "DELETE FROM Customers WHERE City='Delhi';",
          output: `<div class="output-caption"><strong>Before:</strong></div>${CUSTOMERS_TABLE}
                   <div class="output-caption"><strong>After:</strong></div>
                   ${makeTable(['ID','Name','City'], CUSTOMERS_ROWS.filter(c=> c[2] !== 'Delhi'))}`
        }
      ]
    );
  }

  /* fallback */
  else {
    contentHTML = lesson(topic, "ही माहिती लवकरच भरली जाईल.", [
      { query: `-- Example for ${topic}`, output: `<p class="lesson-text">उदाहरण लवकर येईल.</p>` },
      { query: `-- Another example for ${topic}`, output: `<p class="lesson-text">उदाहरण 2 लवकर येईल.</p>` }
    ]);
  }

  document.getElementById('contentArea').innerHTML = contentHTML;
  document.querySelectorAll('#topicList li').forEach(li => li.classList.remove('active'));
  e.target.classList.add('active');
});
