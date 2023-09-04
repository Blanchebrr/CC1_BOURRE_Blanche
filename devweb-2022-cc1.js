"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  // Supprimez les gestionnaires d'événements existants avant d'en ajouter de nouveaux
  $guessBtn.removeEventListener("click", VerifGuess);
  $numUsr.removeEventListener("keydown", ToucheEnter);

  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  const ValueMaxSaisie = parseInt($maxUsr.value);

  if (!isNaN(ValueMaxSaisie) && ValueMaxSaisie > 0) {
    secretNumber = Math.floor(Math.random() * ValueMaxSaisie) + 1;
    nbGuesses = 0;
    $guessBtn.disabled = false;

    $output.innerHTML += `<br>Le jeu a été lancé. Vous avez ${maxGuesses} tentatives pour trouver le nombre secret entre 1 et ${ValueMaxSaisie}. Entrez un nombre et cliquez sur Vérifier.`;

    // Ajoutez de nouveaux gestionnaires d'événements
    $guessBtn.addEventListener("click", VerifGuess);
    $numUsr.addEventListener("keydown", ToucheEnter);
  } else {
    $output.innerHTML += `<br>Veuillez saisir un nombre positif comme limite supérieure.`;
  }

  function VerifGuess() {
    const userGuess = parseInt($numUsr.value);

    if (!isNaN(userGuess)) {
      nbGuesses++;

      if (userGuess === secretNumber) {
        $output.innerHTML += `<br>Félicitations ! Vous avez trouvé le nombre secret ${userGuess} en ${nbGuesses} tentatives.`;
      } else if (userGuess < secretNumber) {
        $output.innerHTML += `<br>${nbGuesses} / ${maxGuesses} tentatives | ${userGuess} est trop bas.`;
      } else {
        $output.innerHTML += `<br>${nbGuesses} / ${maxGuesses} tentatives | ${userGuess} est trop élevé.`;
      }

      if (userGuess < 1 || userGuess > ValueMaxSaisie) {
        $output.innerHTML += `<br>${nbGuesses} / ${maxGuesses} | ${userGuess} est invalide veuillez entrer un chiffre compris entre 1 et ${ValueMaxSaisie}`;
      } 

      if (nbGuesses >= maxGuesses) {
        $guessBtn.disabled = true;
        $output.innerHTML += `<br>Perdu... Le nombre secret était ${secretNumber}.`;
      }
    } else {
      $output.innerHTML += `<br>Veuillez saisir un nombre valide.`;
    }
  }

  function ToucheEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      VerifGuess();
    }
  }
}

$startBtn.addEventListener("click", launchGame);














function addCow(evt) {
  console.debug(evt.x, evt.y);
  const VacheImage = document.createElement("img");
  VacheImage.src ="https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  VacheImage.className = "cow";

  // Positionner l'image à l'endroit du clic de la souris
  VacheImage.style.left = `${evt.x + window.scrollX}px`;
  VacheImage.style.top = `${evt.y + window.scrollY}px`;

  // Faire tourner l'image aléatoirement
  const rotation = Math.random() * 360; // Angle aléatoire entre 0 et 360 degrés
  VacheImage.style.transform = `rotate(${rotation}deg)`;

  // Ajouter l'image à la fin de la page
  document.body.appendChild(VacheImage);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
