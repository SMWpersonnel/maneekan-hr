const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const toast = document.getElementById("placeholder-toast");
let toastTimer;

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!toast) return;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3800);
  });
});

const sections = [...document.querySelectorAll("main section[id]")];

const updateActiveNav = () => {
  const position = window.scrollY + 180;
  let currentId = "home";

  sections.forEach((section) => {
    if (position >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href");
    if (!target || !target.startsWith("#")) return;
    link.classList.toggle("active", target === `#${currentId}`);
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

document.getElementById("current-year").textContent =
  new Date().toLocaleDateString("th-TH", { year: "numeric" });
