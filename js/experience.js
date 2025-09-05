const experiences = [
  {
    startDate: "9 September 2024",
    title: "Hari Lahir",
    description: "Fahim Turast resmi berdiri",
  },
  {
    startDate: "November 2024",
    title: "Layanan Aktif",
    description:
      "Mulai aktif memberikan layanan pendidikan, termasuk pembuatan sosial media.",
  },
  {
    startDate: "19 Januari 2025",
    title: "Perkembangan Sosmed",
    description:
      "Pencapaian followers media sosial mencapai 8600+, Subscriber Youtube 2,1K.",
  },
  {
    startDate: "",
    title: "Peserta dari Berbagai Negara",
    description:
      "Sebagian besar peserta merupakan Mahasiswa Al-Azhar Kairo dan sebagian pelajar dari Yaman, serta Kalangan umum dari seluruh penjuru Indonesia dan Malaysia.",
  },
];

// Render cards
const timeline = document.getElementById("timeline");
const toggleBtn = document.getElementById("toggleBtn");

let showAll = false;

function renderCards() {
  timeline.innerHTML = "";
  const data = showAll ? experiences : experiences.slice(0, 2);

  data.forEach((exp) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <p class="date">${exp.startDate}</p>
      <h3 class="title">${exp.title}</h3>
      <p class="description">${exp.description}</p>
    `;

    timeline.appendChild(card);
    // trigger animation
    setTimeout(() => card.classList.add("visible"), 50);
  });

  toggleBtn.textContent = showAll ? "Lebih Sedikit" : "Lihat Semua";
}

toggleBtn.addEventListener("click", () => {
  showAll = !showAll;
  renderCards();
});

// Initial render
renderCards();
