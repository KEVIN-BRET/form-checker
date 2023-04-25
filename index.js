// On pointe vers tout les inputs :
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

const pseudoChecker = (value) => {
  const pseudoContainer = document.querySelector(".pseudo-container");
  const errorDisplay = document.querySelector(".pseudo-container > span");

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    pseudoContainer.classList.add("error");
    errorDisplay.textContent = "Le pseudo doit faire entre 3 et 20 caractères";
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    pseudoContainer.classList.add("error");
    errorDisplay.textContent =
      "Le pseudo ne doit pas contenir de caractères spéciaux";
  } else {
    pseudoContainer.classList.remove("error");
  }
};

// Plutot que de mettre tout ce code dans chaque fonction,
// on va créer un fonction errorDisplay() qui va gérer l'affichage des erreurs

const emailChecker = (value) => {};

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
