document.addEventListener("DOMContentLoaded", () => {
    // Elemente initialisieren
    const buttons = document.querySelectorAll(".toggleButton");
    const contentSections = document.querySelectorAll(".content");
    const images = document.querySelectorAll('.img_archiv');
    const links = document.querySelectorAll(".liste_archiv a");
    const menue = document.querySelector('.menue'); 

document.querySelectorAll("a").forEach(link => {
    let url = link.getAttribute("href");
    if (url) {
        link.setAttribute("data-href", url);
        link.removeAttribute("href");
        link.addEventListener("click", () => {
            window.location.href = link.getAttribute("data-href");
        });
    }
});