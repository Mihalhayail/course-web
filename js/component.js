// Fungsi untuk load komponen dengan optional callback
function loadComponent(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // jalankan callback kalau ada
    })
    .catch((err) => console.error("Error loading component:", err));
}

// Panggil komponen
loadComponent("header", "components/header.html", initHeaderScripts);
loadComponent("buttom-container", "components/bottom.html");
loadComponent("footer", "components/footer.html");
