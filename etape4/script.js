
"use strict";

// Tableau des personnes
const persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];

// Compteurs
let lignes = 0;
let total_points = 0;

// Insérer une ligne dans le tableau HTML
function doInsertRowTable(num, nom, prenom, points) {

    let tableau = document.getElementById("tableau");
    let ligne = tableau.insertRow(-1);

    let cellNum = ligne.insertCell(0);
    let cellNom = ligne.insertCell(1);
    let cellPrenom = ligne.insertCell(2);
    let cellPoints = ligne.insertCell(3);
    let cellSelect = ligne.insertCell(4);

    cellNum.innerHTML = num;
    cellNom.innerHTML = nom;
    cellPrenom.innerHTML = prenom;
    cellPoints.innerHTML = points;
    cellSelect.innerHTML = '<input type="checkbox">';

    cellNum.className = "col_number";
    cellNom.className = "col_text";
    cellPrenom.className = "col_text";
    cellPoints.className = "col_number";
    cellSelect.className = "col_chkbox";
}

// Insérer une personne
function doInsert(nom, prenom, points) {

    lignes++;
    total_points += Number(points);

    doInsertRowTable(lignes, nom, prenom, points);

    update_summary();
}

// Mettre à jour le résumé
function update_summary() {

    document.getElementById("p1").innerHTML =
        lignes + " ligne(s)";

    document.getElementById("p3").innerHTML =
        "Totale point(s)= " + total_points;
}

// Initialiser le tableau
function init() {

    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Afficher le tableau persons dans la console
function consoleTableau() {
    console.log(persons);
}

init();
