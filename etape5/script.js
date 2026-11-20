
"use strict";

const persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];

let lignes = 0;
let total_points = 0;

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

function doInsert(nom, prenom, points) {

    lignes++;
    total_points += Number(points);

    doInsertRowTable(lignes, nom, prenom, points);

    update_summary();
}

function update_summary() {

    document.getElementById("p1").innerHTML =
        lignes + " ligne(s)";

    document.getElementById("p3").innerHTML =
        "Totale point(s)= " + total_points;
}

function init() {

    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

function consoleTableau() {
    console.log(persons);
}

// Lire les champs et ajouter une personne
function doNewData() {

    let nom = document.getElementById("form_nom").value.trim();
    let prenom = document.getElementById("form_prenom").value.trim();
    let points = document.getElementById("form_points").value.trim();

    // Vérifier que les champs ne sont pas vides
    if (nom === "" || prenom === "" || points === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Convertir les points en nombre
    points = Number(points);

    // Ajouter au tableau HTML
    doInsert(nom, prenom, points);

    // Ajouter aussi dans le tableau persons
    persons.push({
        nom: nom,
        prenom: prenom,
        points: points
    });

    // Vider les champs
    document.getElementById("form_nom").value = "";
    document.getElementById("form_prenom").value = "";
    document.getElementById("form_points").value = "";
}

init();
