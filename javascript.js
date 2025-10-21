const lomake = document.querySelector("#lomake");
const lista = document.querySelector("#lista");

let aktiiviset = JSON.parse(localStorage.getItem("active")) || [];
let valmiit = JSON.parse(localStorage.getItem("done")) || [];

lisaaRivi(aktiiviset, "active")
lisaaRivi(valmiit, "done")

// TIEDON LISÄSY
lomake.addEventListener("submit", function () {
    let tieto = lomake.elements["kentta1"].value;

    // Tarkistetaan onko syöttöruutu tyhjä
    // Jos on niin annetaan virhe
    if (tieto.length < 1) {
    alert("Kenttä ei voi olla tyhjä");
    lomake.elements["kentta1"].style.border = "solid";
    lomake.elements["kentta1"].style.borderColor = "red";
    } 
    // Jos ei niin lisätään tieto "aktiiviset" listaan
    else {
    // lisätään tieto ushiftillä, jotta uusin tieto näkyy ylimpänä
    aktiiviset.unshift(tieto);
    localStorage.setItem("active", JSON.stringify(aktiiviset));
    };
});


// Lisätään tehtävät taulukkoon
function lisaaRivi(locallist, listnimi){
    if (locallist.length > 0){
        locallist.forEach(i => {
            const rivi = lista.insertRow();
            const tekstisolu = rivi.insertCell();
            const nappisolu = rivi.insertCell();

            // Lisätään teksti soluun
            tekstisolu.textContent = i; 

            // Luodaan nappi ja toiminnallisuus
            const nappi = document.createElement("button");
            nappi.textContent = "Poista";
            // Poista rivi taulukosta ja rivin teksti js-listasta sekä localstoragesta
            nappi.addEventListener("click", function() {
                rivi.remove();
                locallist = locallist.filter(item => item !== i);
                localStorage.setItem(listnimi, JSON.stringify(locallist));
                location.reload()
            });
            // Lisätään nappi taulukkoon
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

    localStorage.setItem("active", JSON.stringify(aktiiviset));
    localStorage.setItem("done", JSON.stringify(valmiit));

    location.reload()
  });
});