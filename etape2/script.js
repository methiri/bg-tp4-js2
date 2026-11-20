
"use strict";

// Étape 2 : Insertion d'une nouvelle ligne

function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer le tableau HTML
    let tableau = document.getElementById("tableau");

    // Créer une nouvelle ligne à la fin du tableau
    let ligne = tableau.insertRow(-1);

    // Créer les cinq cellules
    let cellNum = ligne.insertCell(0);
    let cellNom = ligne.insertCell(1);
    let cellPrenom = ligne.insertCell(2);
    let cellPoints = ligne.insertCell(3);
    let cellSelect = ligne.insertCell(4);

    // Remplir les cellules
    cellNum.innerHTML = num;
    cellNom.innerHTML = nom;
    cellPrenom.innerHTML = prenom;
    cellPoints.innerHTML = points;

    // Ajouter une case à cocher
    cellSelect.innerHTML = '<input type="checkbox">';

    // Appliquer les classes CSS
    cellNum.className = "col_number";
    cellNom.className = "col_text";
    cellPrenom.className = "col_text";
    cellPoints.className = "col_number";
    cellSelect.className = "col_chkbox";
}
