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
