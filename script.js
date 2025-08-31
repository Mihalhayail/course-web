const menuToggle = document.querySelector(".header-toggle");
const nav = document.querySelector("nav ul");
const auth = document.querySelector(".header-auth");
const spans = document.querySelectorAll(".header-toggle span");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
  auth.classList.toggle("slide");
  spans.forEach((span) => span.classList.toggle("slide"));
});
