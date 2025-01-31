import { broadcaster } from "../broadcaster.js";

(function () {
  const form = document.getElementById("form-user");
  if (!form) return;
  form.addEventListener("submit", handleSubmit);
})();

async function handleSubmit(e) {
  e.preventDefault();

  if (!e.target.checkValidity()) return;

  const id = e.target.publisher.value;
  const method = id === "create" ? "POST" : "PUT";

  const formData = new FormData(e.target);
  const json = Object.fromEntries(formData);

  const response = await fetch("/api/user", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  const { message } = await response.json();

  if (response.ok) {
    broadcaster.emit("notify", {
      type: "success",
      title: `Success ${response.status} - ${response.statusText}`,
      message,
    });
  } else {
    broadcaster.emit("notify", {
      type: "error",
      title: `Error ${response.status} - ${response.statusText}`,
      message,
    });
  }
}
