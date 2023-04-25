// On pointe vers tout les inputs :
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

// on pointe la progress bar :
const progressBar = document.getElementById("progress-bar")


// on stock les valeur qui seront envoyé dans des variables :
let pseudo, email, password, confirmPass;

// fonction gestion de l'affichage des erreurs
const errorDisplay = (tag, message, valid) => {
  // on pointe les éléments de manière dynamique :
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  // Si l'entrée n'est pas valide ..
  if (!valid) {
    // on ajoute la classe .error
    container.classList.add("error");
    // et un message d'erreur (dynamique) dans le span dedié
    span.textContent = message;
    // sinon
  } else {
    // on retire la class .error au container
    container.classList.remove("error");
    // et on peut aussi afficher un message dans le span
    span.textContent = message;
  }
};

// Validation du Pseudo :
const pseudoChecker = (value) => {
  // on teste la longeur du Pseudo saisi
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit contenir entre 3 et 20 caractères");
    pseudo = null; // pour ne pas incrémenter un pseudo non valide

    // on vérifie qu'il n'a pas de caractères spéciaux
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null; // pour ne pas incrémenter un pseudo non valide

    // si il n'y a pas d'erreurs
  } else {
    // on retire la class .error et on dit valid=true
    errorDisplay("pseudo", "", true);
    // passe la valeur (valide) a la variable pseudo
    pseudo = value;
  }
};

// Plutot que de mettre tout ce code dans chaque fonction,
// on va créer un fonction errorDisplay() qui va gérer l'affichage des erreurs

const emailChecker = (value) => {
  // si l'email n'est pas valide (regex email)
  if (!value.match(/^[\w_-]+@[\w_-]+\.[a-z]{2,4}$/i)) {
    // on affiche le message d'erreur
    errorDisplay("email", "L'adresse mail n'est pas valide");
    // on n'incrémente pas la variable email
    email = null;
  } else {
    // on retire la class .error et on dit valid=true
    errorDisplay("email", "", true);
    // on incrémente la variable email
    pseudo = value;
  }
};

const passwordChecker = (value) => {};

const confirmChecker = (value) => {};

// On ajoute un évènement à chaque input :
inputs.forEach((input) =>
  input.addEventListener("input", (e) => {
    // console.log(e.target.id); // on vérifie sur quel input on travail
    // console.log(e.target.value); // on vérifie la valeur de l'input
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  })
);
