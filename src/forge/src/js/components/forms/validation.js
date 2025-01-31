import { getViolator } from "../../utilities.js";

(function () {
  document.querySelectorAll("form").forEach((form) => {
    form.setAttribute("novalidate", true);
  });

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("invalid", (e) => {
      const { attribute } = getViolator(e.target.validity);
      const message = e.target.dataset[attribute];
      e.target.nextElementSibling.textContent = message;
      e.target.classList.add("error");
    });
  });
})();
