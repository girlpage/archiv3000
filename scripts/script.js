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

    // 8️⃣ Debugging-Log
    console.log(`🚀 Script loaded on ${window.location.pathname} & Animations initialized.`);
});
