const lomake = document.querySelector("#lomake");
const lista = document.querySelector("#lista");
let localid = 1;


// Lisää uusi rivi taulukkoon (tekstin + poistonappi)
function lisaaRivi(id, value) {
  const row = lista.insertRow();
  const cellText = row.insertCell();
  const cellButton = row.insertCell();

  // Lisätään riveille näkymätön id
  row.dataset.id = id;
  // Tekstisolu
  cellText.textContent = value;

  // Poistonappi
  const btn = document.createElement("button");
  btn.textContent = "Poista";
  btn.addEventListener("click", function() {
    // Poista rivi taulukosta ja LocalStoragesta
    localStorage.removeItem(id);
    row.remove();
  });

  // Lisätään nappi taulukkoon
  cellButton.appendChild(btn);
}

// Lataa LocalStoragesta tiedot sivun latauksessa
const keys = Object.keys(localStorage)
  .map(Number)
  .sort((a, b) => a - b);

for (let key of keys) {
  const value = localStorage.getItem(key);
  lisaaRivi(key, value);
}

// Lisätään kuuntelia listan riveille
let tehdyt = []

// Kun riviä klikkaa merkataan se tehdyksi (jos klikattu rivi on tehty muutetaan se takaisin tekemättömäksi)
document.querySelectorAll("tr").forEach(rivi => {
  rivi.addEventListener("click", function() {

    if (tehdyt.includes(rivi.dataset.id)) {
      tehdyt = tehdyt.filter(item => item !== rivi.dataset.id);
      this.style.backgroundColor = "#192841";
      this.style.textDecoration = "none";
    } else {
      tehdyt.push(rivi.dataset.id);
      this.style.backgroundColor = "red";
      this.style.textDecoration = "line-through";
    }

  });
});

// Päivitä seuraava id
if (localStorage.length > 0) {
  localid = Math.max(...keys) + 1; // varmistetaan ettei mene sekaisin poistojen jälkeen
}

// Lomakkeen käsittely
lomake.addEventListener("submit", function (event) {
  let tieto = lomake.elements["kentta1"].value.trim();

  if (tieto.length < 1) {
    event.preventDefault();
    alert("Kenttä ei voi olla tyhjä");
    lomake.elements["kentta1"].style.border = "solid";
    lomake.elements["kentta1"].style.borderColor = "red";

  } else {
    // Tallenna tieto LocalStorageen
    localStorage.setItem(localid, tieto);
    // Näytä se listassa
    lisaaRivi(localid, tieto);
    localid++;
  }
});