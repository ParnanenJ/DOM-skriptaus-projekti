// valitaan html tiedostosta lomake ja lista jatkoa varten
const lomake = document.querySelector("#lomake");
const lista = document.querySelector("#lista");

// luodaan kaksi taulukkoa valmiit ja aktiiviset
let aktiiviset = JSON.parse(localStorage.getItem("active")) || [];
let valmiit = JSON.parse(localStorage.getItem("done")) || [];

// kun sivu ladataan luodaan html-taulukkoon rivit
lisaaRivi(aktiiviset, "active")
lisaaRivi(valmiit, "done")

// TIEDON LISÄSY
// kun lomake lähetetään...
lomake.addEventListener("submit", function (event) {
    let tieto = lomake.elements["kentta1"].value;

    // Tarkistetaan onko syöttöruutu tyhjä
    // Jos on niin annetaan virhe
    if (tieto.length < 1) {
        event.preventDefault();
        alert("Kenttä ei voi olla tyhjä");
        lomake.elements["kentta1"].style.border = "solid";
        lomake.elements["kentta1"].style.borderColor = "red";
        } 
    // Jos ei niin lisätään tieto "aktiiviset" listaan
    else {
        // lisätään tieto unshiftillä, jotta uusin tieto näkyy ylimpänä
        aktiiviset.unshift(tieto);
        localStorage.setItem("active", JSON.stringify(aktiiviset));
        };
});


// Lisätään tehtävät taulukkoon
function lisaaRivi(locallist, listnimi){
    if (locallist.length > 0){
        // luodaan jokaiselle js-listan elementille oma rivi ja kaksi solua
        locallist.forEach(i => {
            const rivi = lista.insertRow();
            const tekstisolu = rivi.insertCell();
            const nappisolu = rivi.insertCell();

            // Lisätään teksti soluun
            tekstisolu.textContent = i; 

            // Luodaan nappi ja toiminnallisuus
            const nappi = document.createElement("button");
            nappi.textContent = "Poista";
            // kun nappia painetaan -> poistetaan rivi taulukosta ja rivin teksti js-listasta sekä localstoragesta
            nappi.addEventListener("click", function() {
                rivi.remove();
                locallist = locallist.filter(item => item !== i);
                localStorage.setItem(listnimi, JSON.stringify(locallist));
                location.reload()
            });
            // Lisätään nappi soluun
            nappisolu.appendChild(nappi);

            // Lisätään css tyyli kaikille "valmiit"-listan elementeille
            if (listnimi === "done"){
                rivi.style.backgroundColor = "red";
                rivi.style.textDecoration = "line-through";
            }
        });
    }
}

// LISTAN MUUTOS KUN TEHTÄVÄ MERKATAAN TEHDYKSI TAI TEKEMÄTTÖMÄKSI
document.querySelectorAll("tr").forEach(rivi => {
  const ekaSolu = rivi.cells[0];

  // lisätään kuuntelia tekstisolulle jotta voidaan vaihtaa tehtävän tilaa
  ekaSolu.addEventListener("click", function() {
    const teksti = ekaSolu.textContent;

    // katsotaan kumpaan listaan rivin teksti kuuluu ja vaihdetaan se toiseen listaan
    if (valmiit.includes(teksti)) {
        aktiiviset.unshift(teksti);
        valmiit = valmiit.filter(item => item !== teksti);
    } 
    else {
        valmiit.unshift(teksti);
        aktiiviset = aktiiviset.filter(item => item !== teksti);
    }
    // päivitetään kumpikin lista localstorageen
    localStorage.setItem("active", JSON.stringify(aktiiviset));
    localStorage.setItem("done", JSON.stringify(valmiit));

    location.reload()
  });
});