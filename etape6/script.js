
"use strict";

/*
    TP4 - ETAPE 6
    CRUD PERSONS

    Étape 3 : tableau d'objets et boucle d'initialisation.
    Étape 4 : résumé et calcul du total.
    Étape 5 : insertion via formulaire.
    Étape 6 : suppression des lignes sélectionnées.
*/


// ==========================================
// 1. TABLEAU DES PERSONNES
// ==========================================

// Tableau d'objets : chaque personne possède
// un nom, un prénom et un nombre de points.

const persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];


// Compteurs
let lignes = 0;
let total_points = 0;


// ==========================================
// 2. INSERTION D'UNE LIGNE DANS LE TABLEAU
// ==========================================

// Création dynamique des lignes HTML
// avec insertRow() et insertCell().

function doInsertRowTable(num, nom, prenom, points) {

    let tableau = document.getElementById("tableau");

    let ligne = tableau.insertRow(-1);

    let cellNum = ligne.insertCell(0);
    let cellNom = ligne.insertCell(1);
    let cellPrenom = ligne.insertCell(2);
    let cellPoints = ligne.insertCell(3);
    let cellSelect = ligne.insertCell(4);

    cellNum.textContent = num;
    cellNom.textContent = nom;
    cellPrenom.textContent = prenom;
    cellPoints.textContent = points;

    // Création de la case à cocher
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    cellSelect.appendChild(checkbox);

    // Application des classes CSS
    cellNum.className = "col_number";
    cellNom.className = "col_text";
    cellPrenom.className = "col_text";
    cellPoints.className = "col_number";
    cellSelect.className = "col_chkbox";
}


// ==========================================
// 3. FONCTION D'INSERTION
// ==========================================

// Incrémentation du compteur et du total.

function doInsert(nom, prenom, points) {

    lignes++;

    total_points += Number(points);

    doInsertRowTable(lignes, nom, prenom, points);

    update_summary();
}


// ==========================================
// 4. MISE À JOUR DU RÉSUMÉ
// ==========================================

// Mise à jour du nombre de lignes et du total.

function update_summary() {

    document.getElementById("p1").textContent =
        lignes + " ligne(s)";

    document.getElementById("p3").textContent =
        "Totale point(s)= " + total_points;
}


// ==========================================
// 5. INITIALISATION DU TABLEAU
// ==========================================

// Parcours du tableau persons avec for...of.

function init() {

    for (const person of persons) {

        doInsert(
            person.nom,
            person.prenom,
            person.points
        );
    }
}


// ==========================================
// 6. AFFICHAGE DU TABLEAU DANS LA CONSOLE
// ==========================================

function consoleTableau() {

    console.log(persons);
}


// ==========================================
// 7. AJOUT VIA LE FORMULAIRE
// ==========================================

// Récupération des valeurs des champs HTML.

function doNewData() {

    let nom = document.getElementById("form_nom").value.trim();

    let prenom = document.getElementById("form_prenom").value.trim();

    let points = document.getElementById("form_points").value.trim();


    // Vérification des champs vides.

    if (nom === "" || prenom === "" || points === "") {

        alert("Veuillez remplir tous les champs.");

        return;
    }


    // Conversion de la valeur en nombre.

    points = Number(points);


    // Vérification de la validité des points.

    if (!Number.isFinite(points)) {

        alert("Veuillez saisir un nombre valide.");

        return;
    }


    // Vérification des doublons avant insertion.

    const doublon = persons.some(function(person) {

        return person.nom.toLowerCase() === nom.toLowerCase()
            && person.prenom.toLowerCase() === prenom.toLowerCase();

    });


    if (doublon) {

        alert("Cette personne existe déjà.");

        return;
    }


    // Ajout dans le tableau persons.

    persons.push({
        nom: nom,
        prenom: prenom,
        points: points
    });


    // Reconstruction du tableau HTML.

    renderTable();


    // Vidage des champs.

    document.getElementById("form_nom").value = "";
    document.getElementById("form_prenom").value = "";
    document.getElementById("form_points").value = "";

}


// ==========================================
// 8. SUPPRESSION DES LIGNES SÉLECTIONNÉES
// ==========================================

function deleteRow() {

    // Étape 1 : vérifier si le tableau est vide.

    if (lignes === 0) {

        alert("Le tableau est vide.");

        return;
    }


    // Étape 2 : récupérer toutes les cases à cocher.

    let checkboxes = document.querySelectorAll(
        "#tableau tbody .col_chkbox input"
    );


    // Étape 3 : vérifier si une case est cochée.

    let selection = false;

    for (const checkbox of checkboxes) {

        if (checkbox.checked) {

            selection = true;

            break;
        }
    }


    if (!selection) {

        alert("Sélectionnez au moins une ligne !");

        return;
    }


    // Étape 4 : demander confirmation.

    if (!confirm("Voulez-vous supprimer les lignes sélectionnées ?")) {

        return;
    }


    // Étape 5 : récupérer les lignes HTML.

    let tbody = document.querySelector("#tableau tbody");

    let rows = tbody.querySelectorAll("tr");


    // Étape 6 : parcourir les lignes en sens inverse.

    for (let i = rows.length - 1; i >= 0; i--) {

        let checkbox = rows[i].querySelector(
            ".col_chkbox input"
        );


        if (checkbox.checked) {

            // Récupérer les points.

            let points = Number(rows[i].cells[3].textContent);


            // Actualiser les compteurs.

            total_points -= points;

            lignes--;


            // Supprimer la ligne HTML.

            rows[i].remove();


            // Supprimer la personne du tableau persons.

            persons.splice(i, 1);

        }
    }


    // Réactualiser le résumé.

    update_summary();

    alert("Suppression effectuée !");
}


// ==========================================
// FONCTIONNALITÉ SUPPLÉMENTAIRE 1 : TRI
// ==========================================

// Trier les personnes par nom, prénom ou points.
// sort() permet de modifier l'ordre du tableau.

function sortPersons() {

    const field = document.getElementById("sort_field").value;

    persons.sort(function(a, b) {

        if (field === "points") {

            return a.points - b.points;
        }

        return a[field].localeCompare(b[field]);

    });

    renderTable();
}


// ==========================================
// FONCTIONNALITÉ SUPPLÉMENTAIRE 2 : FILTRAGE
// ==========================================

// Afficher seulement les personnes correspondant
// au nom ou au prénom recherché.

function filterPersons() {

    const search = document.getElementById("search_field")
        .value.toLowerCase();

    const rows = document.querySelectorAll("#tableau tbody tr");

    rows.forEach(function(row) {

        const nom = row.cells[1].textContent.toLowerCase();

        const prenom = row.cells[2].textContent.toLowerCase();


        if (nom.includes(search) || prenom.includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }

    });
}


// ==========================================
// FONCTIONNALITÉ SUPPLÉMENTAIRE 3 : DOUBLONS
// ==========================================

// Deux personnes sont considérées comme doublons
// si elles ont le même nom et le même prénom.

function removeDuplicates() {

    const personnesUniques = [];


    // Parcourir les personnes.

    for (const person of persons) {

        // Vérifier si la personne existe déjà.

        const existe = personnesUniques.some(function(p) {

            return p.nom.toLowerCase() === person.nom.toLowerCase()
                && p.prenom.toLowerCase() === person.prenom.toLowerCase();

        });


        // Garder uniquement les personnes uniques.

        if (!existe) {

            personnesUniques.push(person);
        }

    }


    const nombreSupprime = persons.length - personnesUniques.length;


    // Remplacer les anciennes données par les données uniques.

    persons.splice(0, persons.length, ...personnesUniques);


    // Reconstruire le tableau HTML.

    renderTable();


    alert(nombreSupprime + " doublon(s) supprimé(s).");
}


// ==========================================
// 9. RECONSTRUCTION DU TABLEAU HTML
// ==========================================

// Vider le tableau puis recréer les lignes
// à partir du tableau persons.

function renderTable() {

    const tbody = document.querySelector("#tableau tbody");

    tbody.innerHTML = "";


    // Réinitialiser les compteurs.

    lignes = 0;

    total_points = 0;


    // Recréer les lignes.

    for (const person of persons) {

        doInsert(
            person.nom,
            person.prenom,
            person.points
        );
    }


    // Réappliquer le filtre après reconstruction.

    filterPersons();
}


// ==========================================
// 10. LANCEMENT DU PROGRAMME
// ==========================================

// Appel de init() au chargement du script.

init();
