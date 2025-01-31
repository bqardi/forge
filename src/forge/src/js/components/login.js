import { broadcaster } from "./broadcaster.js";

(function () {
  const form = document.querySelector("[data-forge-login-form]");
  if (!form) return;
  form.addEventListener("submit", activateTheme);
})();

async function activateTheme(e) {
  e.preventDefault();

  if (!e.target.checkValidity()) return;

  const username = e.target.username.value;
  const password = e.target.password.value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    await response.json();
    window.location.href = "/forge";
  } else {
    broadcaster.emit("notify", {
      type: "error",
      title: `Error ${response.status}`,
      message: response.statusText,
    });
  }
}
