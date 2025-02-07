import { broadcaster } from "./broadcaster.js";

(function () {
  const form = document.querySelector("[data-forge-setup-form]");
  if (!form) return;
  form.addEventListener("submit", setup);
})();

async function setup(e) {
  e.preventDefault();

  if (!e.target.checkValidity()) return;

  const username = e.target.username.value;
  const password = e.target.password.value;
  const email = e.target.email.value;

  const response = await fetch("/first-time-setup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
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
