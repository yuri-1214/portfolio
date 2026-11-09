const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isOpen);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));

const copyButton = document.querySelector("#copy-email");
const emailAddress = document.querySelector("#email-address");
const copyFeedback = document.querySelector("#copy-feedback");

copyButton.addEventListener("click", async () => {
  const email = emailAddress.textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = "Email address copied to clipboard.";
  } catch {
    copyFeedback.textContent = `Copy this email address: ${email}`;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
