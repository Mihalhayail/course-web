// Fungsi untuk load komponen
function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error("Error loading component:", err));
}

// Panggil komponen
loadComponent("header", "components/header.html");
loadComponent("buttom-container", "components/bottom.html");
loadComponent("footer", "components/footer.html");
