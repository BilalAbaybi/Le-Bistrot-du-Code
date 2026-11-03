"use strict";

// Partie 1 : sélectionner les éléments du DOM et vérifier le chargement.



const plusBurger = document.querySelector("#plus-burger");
const moinsBurger = document.querySelector("#moins-burger");
const spanQuantiteBurger = document.querySelector("#quantite-burger");


const plusDessert = document.querySelector("#plus-dessert");
const moinsDessert = document.querySelector("#moins-dessert");
const spanQuantiteDessert = document.querySelector("#quantite-dessert");


const client = document.querySelector("#client");
const titreCommande = document.querySelector("#titre-commande");


const service = document.querySelector("#service");
const infoService = document.querySelector("#info-service");


const nombreArticles = document.querySelector("#nombre-articles");
const total = document.querySelector("#total");
const statutPanier = document.querySelector("#statut-panier");


const vider = document.querySelector("#vider");
const formCommande = document.querySelector("#form-commande");


const message = document.querySelector("#message");
const commandes = document.querySelector("#commandes");

const recapitulatif = document.querySelector("#recapitulatif");


console.log(plusBurger, spanQuantiteBurger);

// Partie 2 : personnaliser le titre avec l’événement input.

client.addEventListener("input", () => {
    const nom = client.value.trim();
  if (nom === "") {
    titreCommande.textContent = "Commande de Client anonyme";
  } else {
    titreCommande.textContent = `Commande de ${nom}`;
  }
});

// Partie 3 : gérer les deux quantités avec les boutons click.

let quantiteBurger = 0;
let quantiteDessert = 0;

const PRIX_BURGER = 1200;
const PRIX_DESSERT = 500;

plusBurger.addEventListener("click", () => {
    quantiteBurger++;
    afficherPanier();
});

plusDessert.addEventListener("click", () => {
    quantiteDessert++;
    afficherPanier();
});

moinsBurger.addEventListener("click", () => {
    if (quantiteBurger > 0) {
        quantiteBurger--;
        afficherPanier();
    }
});

moinsDessert.addEventListener("click", () => {
    if (quantiteDessert > 0) {
        quantiteDessert--;
        afficherPanier();
    }
});

// Partie 4 : créer afficherPanier(), calculer le total et gérer les classes.

function afficherPanier() {
    spanQuantiteBurger.textContent = quantiteBurger;
    spanQuantiteDessert.textContent = quantiteDessert;

    const totalArticles = quantiteBurger + quantiteDessert;
    nombreArticles.textContent = totalArticles;

    const totalCentimes =
        quantiteBurger * PRIX_BURGER +
        quantiteDessert * PRIX_DESSERT;

    total.textContent =
        (totalCentimes / 100).toFixed(2).replace(".", ",") + " €";

    if (totalArticles === 0) {
        statutPanier.textContent = "Votre panier est vide.";
    } else if (totalCentimes < 3000) {
        statutPanier.textContent = "Commande en cours.";
    } else {
        statutPanier.textContent = "Commande importante.";
    }

    if (totalCentimes >= 3000) {
        recapitulatif.classList.add("commande-importante");
    } else {
        recapitulatif.classList.remove("commande-importante");
    }
}


afficherPanier();

// Partie 5 : écouter change sur le service et gérer le bouton Vider.

service.addEventListener("change", () => {
    if (service.value === "sur-place") {
        infoService.textContent = "La commande sera servie à table.";
    } else {
        infoService.textContent = "La commande sera préparée à emporter.";
    }
});

vider.addEventListener("click", () => {
    quantiteBurger = 0;
    quantiteDessert = 0;

    afficherPanier();

    message.textContent = "";
    message.classList.remove("erreur");
    message.classList.remove("succes");
});

// Partie 6 : écouter submit, contrôler puis enregistrer une commande.

formCommande.addEventListener("submit", (event) => {
    event.preventDefault();

    const nom = client.value.trim();

    if (nom === "") {
        message.textContent = "Veuillez saisir un nom.";
        message.classList.add("erreur");
        message.classList.remove("succes");
        return;
    }

    if (quantiteBurger + quantiteDessert === 0) {
        message.textContent = "Ajoutez au moins un article.";
        message.classList.add("erreur");
        message.classList.remove("succes");
        return;
    }

    const totalCentimes =
        quantiteBurger * PRIX_BURGER +
        quantiteDessert * PRIX_DESSERT;

    const serviceTexte =
        service.value === "sur-place"
            ? "Sur place"
            : "À emporter";
const li = document.createElement("li");

li.textContent =
    `${nom} — Burgers : ${quantiteBurger} — Desserts : ${quantiteDessert} — Total : ${(totalCentimes / 100).toFixed(2).replace(".", ",")} € — ${serviceTexte} `;

const boutonSupprimer = document.createElement("button");
boutonSupprimer.textContent = "Supprimer";
boutonSupprimer.type = "button";

boutonSupprimer.addEventListener("click", () => {
    li.remove();
});

li.append(boutonSupprimer);

commandes.append(li);

    message.textContent = "Commande enregistrée";
    message.classList.add("succes");
    message.classList.remove("erreur");

    quantiteBurger = 0;
    quantiteDessert = 0;

    afficherPanier();
});


// Partie 7 : supprimer une commande avec un bouton créé en JavaScript.
