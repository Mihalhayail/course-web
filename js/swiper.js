(function () {
  const deck = document.getElementById("deck");
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dots = document.getElementById("dots");
  let i = 0; // current index
  const n = slides.length;

  slides.forEach((_, idx) => {
    const b = document.createElement("button");
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => go(idx));
    dots.appendChild(b);
  });

  function clampIndex(x) {
    return ((x % n) + n) % n;
  }
  function go(next) {
    i = clampIndex(next);
    layout();
  }
  function next() {
    go(i + 1);
  }
  function prev() {
    go(i - 1);
  }

  function layout() {
    dots.querySelectorAll("button").forEach((b, idx) => {
      b.classList.toggle("active", idx === i);
      b.ariaSelected = idx === i ? "true" : "false";
    });

    const W = deck.clientWidth;
    const base = 0;
    const nearOffset = W * 0.18;
    const farOffset = W * 0.34;

    slides.forEach((s, idx) => {
      const delta = circularDelta(idx, i, n);
      let tx = 0,
        sc = 1,
        blur = 0,
        op = 1,
        z = 1,
        br = 1;
      if (delta === 0) {
        tx = base;
        sc = 1;
        blur = 0;
        z = 30;
        op = 1;
        br = 1;
      } else if (Math.abs(delta) === 1) {
        tx = Math.sign(delta) * nearOffset;
        sc = 0.88;
        blur = 2;
        z = 20;
        op = 0.95;
        br = 0.92;
      } else if (Math.abs(delta) === 2) {
        tx = Math.sign(delta) * farOffset;
        sc = 0.82;
        blur = 4;
        z = 10;
        op = 0.75;
        br = 0.85;
      } else {
        tx = Math.sign(delta) * (farOffset + W * 0.15);
        sc = 0.75;
        blur = 6;
        z = 0;
        op = 0;
        br = 0.8;
      }
      s.style.transform = `translateX(${tx}px) scale(${sc})`;
      s.style.filter = `blur(${blur}px) brightness(${br})`;
      s.style.opacity = op;
      s.style.zIndex = z;
      s.inert = !(delta === 0 || Math.abs(delta) === 1);
    });
  }

  function circularDelta(from, to, len) {
    let d = from - to;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    return d;
  }

  slides.forEach((s, idx) => {
    s.addEventListener("click", () => {
      const d = circularDelta(idx, i, n);
      if (d === 0) return;
      if (d === 1 || d === -(n - 1)) next();
      else if (d === -1 || d === n - 1) prev();
      else go(idx);
    });
  });

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  let startX = 0,
    startY = 0,
    isTouch = false;
  const el = document.getElementById("carousel");

  el.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = Math.abs(e.clientY - startY);
    if (Math.abs(dx) > 2 && dy < 100) {
      slides.forEach((s, idx) => {
        const delta = circularDelta(idx, i, n);
        const factor = Math.max(0, 1 - Math.min(1, Math.abs(delta) / 3));
        s.style.transform += ` translateX(${dx * 0.05 * factor}px)`;
      });
    }
  });
  el.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - startX;
    const dy = Math.abs(e.clientY - startY);
    if (Math.abs(dx) > 40 && dy < 80) {
      dx < 0 ? next() : prev();
    }
    layout();
  });
  el.addEventListener("pointercancel", () => {
    isDragging = false;
    layout();
  });

  // Tambahan: dukungan scroll horizontal dengan touchpad (dua jari)
  let wheelAccum = 0;
  el.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        wheelAccum += e.deltaX;
        if (wheelAccum > 40) {
          next();
          wheelAccum = 0;
        } else if (wheelAccum < -40) {
          prev();
          wheelAccum = 0;
        }
      }
    },
    { passive: false }
  );

  const ro = new ResizeObserver(layout);
  ro.observe(deck);

  slides.forEach((s) => {
    const img = s.querySelector("img");
    img.loading = "lazy";
    img.decoding = "async";
  });

  layout();
})();

// Fitur drag horizontal dengan mouse pada carousel
const elCarousel = document.getElementById("carousel");
let isMouseDown = false;
let mouseStartX = 0;
let scrollStart = 0;

if (elCarousel) {
  elCarousel.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    mouseStartX = e.clientX;
    scrollStart = elCarousel.scrollLeft;
    elCarousel.style.cursor = "grabbing";
  });
  elCarousel.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    const dx = e.clientX - mouseStartX;
    elCarousel.scrollLeft = scrollStart - dx;
  });
  elCarousel.addEventListener("mouseup", () => {
    isMouseDown = false;
    elCarousel.style.cursor = "";
  });
  elCarousel.addEventListener("mouseleave", () => {
    isMouseDown = false;
    elCarousel.style.cursor = "";
  });

  // Event touch untuk swipe di layar sentuh/hp
  let touchStartX = 0;
  let touchEndX = 0;
  elCarousel.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    touchEndX = touchStartX;
  });
  elCarousel.addEventListener("touchmove", function (e) {
    touchEndX = e.touches[0].clientX;
  });
  elCarousel.addEventListener("touchend", function (e) {
    const dx = touchEndX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        if (typeof next === "function") next();
      } else {
        if (typeof prev === "function") prev();
      }
    }
  });
}
