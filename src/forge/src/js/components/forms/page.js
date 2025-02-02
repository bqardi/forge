import { broadcaster } from "../broadcaster.js";

(function () {
  const page = document.querySelector("[data-page]");
  if (!page) return;

  const formID = "form-page";
  const form = page.querySelector(`#${formID}`);
  if (!form) return;

  const draftButton = document.querySelector("#drafter");
  const publishButton = document.querySelector("#publisher");

  draftButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  publishButton.addEventListener("click", (e) => handleSubmitClick(e, form));

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", (e) => handleChange(e, page));

  document.querySelectorAll(`[form=${formID}]`).forEach((input) => {
    input.addEventListener("input", (e) => handleChange(e, page));
  });
})();

function handleSubmitClick(e, form) {
  const statusSelect = form.status;
  statusSelect.value = e.currentTarget.dataset.status;
  form.dispatchEvent(new Event("submit"));
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!e.target.checkValidity()) return;

  const id = e.target.publisher.value;
  const method = id === "create" ? "POST" : "PUT";

  const formData = new FormData(e.target);
  const json = Object.fromEntries(formData);

  const response = await fetch("/api/page", {
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

function handleChange(e, page) {
  if (e.target.name !== "slug") return;
  const anchor = page.querySelector("[data-base-url]");
  const url = anchor.dataset.baseUrl + e.target.value;
  anchor.textContent = url;
  anchor.href = url;
}
