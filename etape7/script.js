
"use strict"; // Mode strict : slide 51

// Tableau contenant les participants et leurs points
// Tableaux et objets : slides 38 à 40
let persons = [
    { nom: "Nom1", prenom: "Prenom1", points: 18 },
    { nom: "Nom2", prenom: "Prenom2", points: 12 },
    { nom: "Nom3", prenom: "Prenom3", points: 8 },
    { nom: "Nom4", prenom: "Prenom4", points: 20 },
    { nom: "Nom5", prenom: "Prenom5", points: 5 }
];

// Récupération des éléments HTML : slides 61 à 64
let podium = document.getElementById("podium");
let performances = document.getElementById("performances");
let rewards = document.getElementById("rewards");


// ==========================================
// FONCTIONNALITÉ 1 : PODIUM DES CHAMPIONS
// ==========================================

// Fonction de classement des participants : slide 45
function afficherPodium() {

    // Copie et tri du tableau par ordre décroissant des points
    // Méthode sort() et fonction fléchée : slide 46
    let classement = [...persons].sort(
        (a, b) => b.points - a.points
    );

    // Les trois premiers participants
    let meilleurs = classement.slice(0, 3);

    let medailles = ["🥇", "🥈", "🥉"];
    let classes = ["first", "second", "third"];

    podium.innerHTML = "";

    // Parcours du tableau : slide 44
    meilleurs.forEach((person, index) => {

        let carte = document.createElement("div");

        carte.className = "champion " + classes[index];

        carte.innerHTML = `
            <div class="medal">${medailles[index]}</div>
            <h3>${person.prenom} ${person.nom}</h3>
            <p>${person.points} points</p>
        `;

        podium.appendChild(carte);
    });
}


// ==========================================
// FONCTIONNALITÉ 2 : RADAR DE PERFORMANCE
// ==========================================

// Fonction qui détermine le niveau selon les points
// Conditions if / else : slide 42
function obtenirNiveau(points) {

    if (points >= 18) {
        return {
            niveau: "Excellent",
            classe: "excellent"
        };
    } else if (points >= 12) {
        return {
            niveau: "Bon",
            classe: "good"
        };
    } else if (points >= 6) {
        return {
            niveau: "Moyen",
            classe: "medium"
        };
    } else {
        return {
            niveau: "À améliorer",
            classe: "low"
        };
    }
}

// Affichage des indicateurs de performance
function afficherPerformances() {

    performances.innerHTML = "";

    persons.forEach(person => {

        let resultat = obtenirNiveau(person.points);

        // Calcul du pourcentage sur une base de 20 points
        let pourcentage = Math.min(
            (person.points / 20) * 100,
            100
        );

        let bloc = document.createElement("div");
        bloc.className = "person-performance";

        bloc.innerHTML = `
            <div class="performance-info">
                <strong>${person.prenom} ${person.nom}</strong>
                <span>${person.points}/20 - ${resultat.niveau}</span>
            </div>

            <div class="progress">
                <div class="progress-bar ${resultat.classe}"
                     style="width: ${pourcentage}%">
                </div>
            </div>
        `;

        performances.appendChild(bloc);
    });
}


// ==========================================
// FONCTIONNALITÉ 3 : BADGES ET RÉCOMPENSES
// ==========================================

// Attribution automatique d'un badge selon les points
function obtenirBadge(points) {

    if (points >= 18) {
        return {
            nom: "Génie",
            emoji: "🏆",
            description: "Performance exceptionnelle"
        };
    } else if (points >= 12) {
        return {
            nom: "Excellent",
            emoji: "🌟",
            description: "Très bon résultat"
        };
    } else if (points >= 6) {
        return {
            nom: "Persévérant",
            emoji: "💪",
            description: "Continue tes efforts"
        };
    } else {
        return {
            nom: "À encourager",
            emoji: "🌱",
            description: "Chaque progrès compte"
        };
    }
}

// Affichage de la galerie des récompenses
function afficherRecompenses() {

    rewards.innerHTML = "";

    persons.forEach(person => {

        let badge = obtenirBadge(person.points);

        let carte = document.createElement("div");
        carte.className = "reward-card";

        carte.innerHTML = `
            <div class="reward-icon">${badge.emoji}</div>
            <h3>${person.prenom} ${person.nom}</h3>
            <strong>${badge.nom}</strong>
            <p>${badge.description}</p>
        `;

        rewards.appendChild(carte);
    });
}


// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================

// Appel des trois fonctions d'affichage
afficherPodium();
afficherPerformances();
afficherRecompenses();
