const appActions = {
  validateInput: (value, expresion) => expresion.test(value),
  showOrHideError(isValid, input) {
    if (isValid) {
      input.classList.remove("error");
      return;
    }
    input.classList.add("error");
  },
  onValidate(input, expression) {
    const isValid = this.validateInput(input.value, expression);
    this.showOrHideError(isValid, input);
    return { isValid };
  },
  createInfo(event, inputs, expresiones) {
    event.preventDefault();

    const info = Array.from(inputs).map((input) => {
      const { isValid } = this.onValidate(input, expresiones[input["name"]]);

      return {
        [input["name"]]: input.value,
        isValid,
      };
    });

    const somethingIsWrong = info.some(({ isValid }) => !isValid);

    somethingIsWrong
      ? console.error("hay campos inválidos")
      : console.info("Todo perfecto, se guardarán los datos...");
  },
};

const initApp = () => {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input");
  const sendButton = document.getElementById("botonsesion");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const createEventListeners = () => {
    sendButton.addEventListener("click", (event) =>
      appActions.createInfo(event, inputs, expresiones)
    );

    inputs.forEach((input) => {
      ["keyup", "blur"].forEach((eventName) => {
        input.addEventListener(eventName, ({ target: input }) =>
          appActions.onValidate(input, expresiones[input["name"]])
        );
      });
    });
  };

  createEventListeners();
};

window.addEventListener("DOMContentLoaded", initApp);
