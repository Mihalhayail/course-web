const menuToggle = document.querySelector(".header-toggle");
const nav = document.querySelector("nav ul");
const auth = document.querySelector(".header-auth");
const spans = document.querySelectorAll(".header-toggle span");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
  auth.classList.toggle("slide");
  spans.forEach((span) => span.classList.toggle("slide"));
});

// Header hide on scroll
let lastScrollTop = 0;
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

function animateCounter(
  elementId,
  start,
  target,
  step,
  speed,
  { prefix = "", suffix = "" } = {}
) {
  const el = document.getElementById(elementId);
  let angka = start;

  // reset isi elemen ke start biar animasi fresh
  el.textContent = `${prefix}${start}${suffix}`;

  const interval = setInterval(() => {
    angka += step;
    el.textContent = `${prefix}${angka}${suffix}`;

    if (angka >= target) {
      el.textContent = `${prefix}${target}${suffix}`;
      clearInterval(interval);
    }
  }, speed);
}

// === Observer supaya animasi jalan setiap kali elemen terlihat ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "stat-student") {
          animateCounter("stat-student", 10, 1229, 10, 5, { suffix: "+" });
        }

        if (entry.target.id === "stat-course") {
          animateCounter("stat-course", 1, 10, 1, 100, { suffix: " Online" });
        }
      }
    });
  },
  { threshold: 0.5 }
);

// Pasang observer ke elemen
observer.observe(document.getElementById("stat-student"));
observer.observe(document.getElementById("stat-course"));
