
"use strict";

// 1. Déclaration du tableau persons
const persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];

// 2. Compteur du nombre de lignes
let lignes = 0;

// 3. Fonction qui insère une ligne dans le tableau HTML
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

// 4. Fonction doInsert
function doInsert(nom, prenom, points) {

    lignes++;

    doInsertRowTable(lignes, nom, prenom, points);
}

// 5. Fonction init : parcourir persons
function init() {

    for (const person of persons) {

        doInsert(
            person.nom,
            person.prenom,
            person.points
        );
    }
}

// 6. Afficher le tableau persons dans la console
function consoleTableau() {

    console.log(persons);
}

// 7. Lancer l'initialisation
init();
