// On pointe le formulaire :
const form = document.querySelector("form");

// On pointe vers tout les inputs :
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

// on pointe la progress-bar :
const progressBar = document.getElementById("progress-bar");

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
  if (!value.match(/^[\w_.-]+@[\w_-]+\.[a-z]{2,4}$/i)) {
    // on affiche le message d'erreur
    errorDisplay("email", "L'adresse mail n'est pas valide");
    // on n'incrémente pas la variable email
    email = null;
  } else {
    // on retire la class .error et on dit valid=true
    errorDisplay("email", "", true);
    // on incrémente la variable email
    email = value;
  }
};

// validation du MDP :
const passwordChecker = (value) => {
  // on réinitialise la progess-bar
  progressBar.classList = "";
  // si invalid (regex MDP contenant au minimum : 1 Maj 1 Min 1 Chiffre 1 Symbol)
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "8 caractères minimum dont une Maj, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
    // si le MPD a moins de 12 caractères on valide , mais avec une progress-bar a 67%
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressBlue");
    password = value;
    // si le MPD a plus de 12 caractères on valide avec une progress-bar a 100%
  } else {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressGreen");
    password = value;
  }
  // on applique le confirmChecker() seulement si confirmPass() est true
  if (confirmPass) confirmChecker(confirmPass);
};

// confirmation du MDP :
const confirmChecker = (value) => {
  // si la valeur est différent du MDP
  if (value !== password) {
    // on affiche un msg d'erreur
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    // sinon on valide
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo, // = pseudo: pseudo,
      email, // = email: email,
      password, // = password: password
    };

    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validé !");
  } else {
    alert("Veuillez remplir les champs correctement");
  }
});
