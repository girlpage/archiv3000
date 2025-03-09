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

    // 7️⃣ Debugging-Log
    console.log(`🚀 Script loaded on ${window.location.pathname} & Scroll + Image + Tree Animation initialized.`);
});
