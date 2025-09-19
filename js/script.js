// === Inisialisasi header setelah dimuat ===
function initHeaderScripts() {
  const menuToggle = document.querySelector(".header-toggle");
  const nav = document.querySelector("nav ul");
  const auth = document.querySelector(".header-auth");
  const spans = document.querySelectorAll(".header-toggle span");
  const header = document.querySelector(".header");

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("slide");
    auth.classList.toggle("slide");
    spans.forEach((span) => span.classList.toggle("slide"));
  });

  // Tambahkan event click untuk hamburger menu
  document.querySelectorAll(".kelas").forEach(function (el) {
    el.addEventListener("click", function (e) {
      el.classList.toggle("open");
      e.stopPropagation();
    });
  });

  // Header hide on scroll
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// === Counter Animation ===
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
          animateCounter("stat-student", 10, 3000, 10, 1, { suffix: "+" });
        }

        if (entry.target.id === "stat-course") {
          animateCounter("stat-course", 1, 10, 1, 300, { suffix: " Online" });
        }
      }
    });
  },
  { threshold: 0.5 }
);

// Pasang observer ke elemen
observer.observe(document.getElementById("stat-student"));
observer.observe(document.getElementById("stat-course"));

const programCard = document.getElementById("circleCard");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// klik card -> tampilkan pop-up
programCard.addEventListener("click", function (e) {
  e.preventDefault();
  popup.style.display = "flex";
});

// klik tombol close -> tutup pop-up
closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

// klik di luar konten -> tutup pop-up
window.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faq-container");

  fetch("faq.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        const question = document.createElement("div");
        question.classList.add("faq-question");
        question.innerHTML = `
          <span>${item.question}</span>
          <span class="arrow">▼</span>
        `;

        const answer = document.createElement("div");
        answer.classList.add("faq-answer");
        answer.innerHTML = `<p>${item.answer.replace(/\n/g, "<br>")}</p>`;

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqContainer.appendChild(faqItem);

        question.addEventListener("click", () => {
          faqItem.classList.toggle("active");
        });
      });
    })
    .catch((err) => console.error("Gagal memuat FAQ:", err));
});
