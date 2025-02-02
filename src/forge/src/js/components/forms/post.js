import { responseNotifier } from "../../utilities.js";

(function () {
  const post = document.querySelector("[data-post]");
  if (!post) return;

  const formID = "form-post";
  const form = post.querySelector(`#${formID}`);
  if (!form) return;

  const draftButton = document.querySelector("#drafter");
  const publishButton = document.querySelector("#publisher");
  const deleteButton = document.querySelector("#deleter");

  draftButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  publishButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  deleteButton.addEventListener("click", (e) => handleDeleteClick(e, form));

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", (e) => handleChange(e, post));

  document.querySelectorAll(`[form=${formID}]`).forEach((input) => {
    input.addEventListener("input", (e) => handleChange(e, post));
  });
})();

async function handleDeleteClick(e, form) {
  const id = form.deleter.value;
  const method = "DELETE";

  const response = await fetch(`/api/post/${id}`, {
    method,
  });

  const ok = await responseNotifier(response);
  if (ok) {
    window.location.href = "/forge/posts";
  }
}

function handleSubmitClick(e, form) {
  const statusSelect = form.status;
  statusSelect.value = e.currentTarget.dataset.status;
  form.dispatchEvent(new Event("submit"));
}

async function handleSubmit(e) {
  if (!e.target.checkValidity()) return;

  const id = e.target.publisher.value;
  const method = id === "create" ? "POST" : "PUT";

  const formData = new FormData(e.target);
  const json = Object.fromEntries(formData);

  const response = await fetch("/api/post", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  const ok = await responseNotifier(response);
  if (ok) {
    window.location.href = "/forge/posts";
  }
}

function handleChange(e, post) {
  if (e.target.name !== "slug") return;
  const anchor = post.querySelector("[data-base-url]");
  const url = anchor.dataset.baseUrl + e.target.value;
  anchor.textContent = url;
  anchor.href = url;
}
