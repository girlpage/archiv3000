document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Alle Bilder automatisch mit `loading="lazy"` und `draggable="false"` versehen
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
        img.setAttribute("draggable", "false");
    });

    // 2️⃣ Smooth Fade-In Effekt beim Laden der Seite
    document.body.classList.add("fade-in");

    // 3️⃣ Smooth Fade-Out Effekt beim Wechsel der Seite
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#")) {
                document.body.style.opacity = "0";
                setTimeout(() => {
                    window.location.href = href; 
                }, 200);
            }
        });
    });

    // 4️⃣ Bilder zufällig einblenden (schnell & randomisiert)
    const images = document.querySelectorAll(".img_archiv");
    function animateImagesRandom() {
        let imageArray = Array.from(images);
        let shuffledImages = imageArray.sort(() => Math.random() - 0.5);
        shuffledImages.forEach((image, index) => {
            setTimeout(() => {
                image.classList.add("visible");
            }, Math.random() * 600);
        });
    }

    // 5️⃣ Tree-Animation (Absätze erscheinen nacheinander nur von oben)
    const projectText = document.querySelectorAll(".lauftext-tree p");
    function checkScrollText() {
        const rect = document.querySelector(".lauftext-tree")?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            projectText.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add("visible");
                }, index * 50);
            });
        } else {
            projectText.forEach((element) => {
                element.classList.remove("visible");
            });
        }
    }

    // 6️⃣ Event Listener für beide Animationen setzen
    if (projectText.length > 0) {
        window.addEventListener("scroll", checkScrollText);
        checkScrollText();
    }

    if (images.length > 0) {
        animateImagesRandom();
    }

    // 7️⃣ ASCII-Effekt für Cursor (nur im Kontakt-Bereich)
    const contactSection = document.querySelector(".container-kontakt");
    if (contactSection) {
        document.addEventListener("mousemove", (e) => {
            // Limitiert die Anzahl der Symbole → Weniger Überlagerung
            if (Math.random() < 0.4) { // Nur 40% der Bewegungen erzeugen ein Zeichen
                createAsciiEffect(e.clientX, e.clientY);
            }
        });
    }

    function createAsciiEffect(x, y) {
        const asciiChars = ["3", "0", "✱", " ", "0"]; // Mehr Variation
        const char = asciiChars[Math.floor(Math.random() * asciiChars.length)]; // Zufälliges Zeichen

        const asciiElement = document.createElement("span");
        asciiElement.classList.add("ascii-cursor");
        asciiElement.innerText = char;
        asciiElement.style.left = `${x}px`;
        asciiElement.style.top = `${y}px`;

        document.body.appendChild(asciiElement);

        // Weiter auseinander → Große Bewegungsspanne
        setTimeout(() => {
            asciiElement.style.transform = `translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px)`;
            asciiElement.style.opacity = "0.8";
        }, 500);

        setTimeout(() => {
            asciiElement.style.opacity = "0";
        }, 500);

        setTimeout(() => {
            asciiElement.remove();
        }, 2000);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const navProjectTitle = document.getElementById("project-title");
        
        if (navProjectTitle) {
          // Initiale Einstellungen: volle Opazität und Transition
          navProjectTitle.style.opacity = "1";
          navProjectTitle.style.transition = "opacity 0.5s ease";
      
          window.addEventListener("scroll", function () {
            if (window.scrollY > 0) {
              // Beim Scrollen: sanft ausblenden
              navProjectTitle.style.opacity = "0";
            } else {
              // Wenn der Nutzer wieder nach oben scrollt: wieder einblenden
              navProjectTitle.style.opacity = "1";
            }
          });
        }
      });

    // 8️⃣ Debugging-Log
    console.log(`🚀 Script loaded on ${window.location.pathname} & Animations initialized.`);
});

(function() {
    const devToolsOpen = new Function("debugger");
    setInterval(() => {
        try {
            devToolsOpen();
        } catch (e) {
            document.body.innerHTML = `<pre class="matrix-mode">
            🟢 Developer Detected 🟢
            Welcome to the system, Operator.
            Access: GRANTED
            Loading archives...
            </pre>`;
        }
    }, 500);
})();

function setupHoverTitles() {
  const isLargeScreen = window.matchMedia('(min-width: 431px)').matches;
  const buttonProjekt = document.getElementById('button-projekt');
  const imageLinks = document.querySelectorAll('.img_archiv');

  imageLinks.forEach(link => {
    const img = link.querySelector('img');
    const caption = link.querySelector('.figcaption_index');

    img.onmouseenter = null;
    img.onmouseleave = null;

    if (isLargeScreen) {
      img.onmouseenter = () => {
        buttonProjekt.textContent = caption.textContent;
        buttonProjekt.classList.add('visible');
      };

      img.onmouseleave = () => {
        buttonProjekt.textContent = '';
        buttonProjekt.classList.remove('visible');
      };
    }
  });

  if (!isLargeScreen) {
    buttonProjekt.textContent = '';
    buttonProjekt.classList.remove('visible');
  }
}

setupHoverTitles();
window.addEventListener('resize', setupHoverTitles);

console.log("%c 🚀 Welcome to archiv3000! ", "background: black; color: cyan; font-size: 16px;");
console.log("%c You found the hidden console message! If you want to collaborate, email me at leandra.tmn@gmail.com", "background: black; color: limegreen;");

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById('main-content');

  // Links abfangen
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');

      // Prüfen ob interner Link (kein #, kein externes http)
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        e.preventDefault();
        loadPage(href);
      }
    });
  });

  async function loadPage(url) {
    try {
      const response = await fetch(url);
      const text = await response.text();

      // Neues DOM parsen
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const newMain = doc.querySelector('main');

      if (newMain) {
        // Übergang: ausblenden
        mainContent.style.opacity = '0';

        setTimeout(() => {
          mainContent.innerHTML = newMain.innerHTML; // Inhalt ersetzen
          mainContent.style.opacity = '1';
          history.pushState({ path: url }, '', url);

          // Falls du nachladen musst, z.B. Events neu binden
          rebindLinks();
        }, 200);
      }
    } catch (err) {
      console.error('Fehler beim Laden:', err);
    }
  }

  // Back- und Forward-Buttons
  window.addEventListener('popstate', e => {
    if (e.state && e.state.path) {
      loadPage(e.state.path);
    }
  });

  function rebindLinks() {
    // Nach jedem Seitenwechsel erneut Links abfangen
    document.querySelectorAll('a').forEach(link => {
      link.onclick = event => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
          event.preventDefault();
          loadPage(href);
        }
      };
    });
  }
});