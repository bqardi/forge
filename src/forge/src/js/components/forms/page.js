(function () {
  const page = document.querySelector("[data-page]");
  if (!page) return;

  const formID = "form-page";
  const form = page.querySelector(`#${formID}`);
  if (!form) return;

  const draftButton = document.querySelector("#drafter");
  const publishButton = document.querySelector("#publisher");
  const deleteButton = document.querySelector("#deleter");

  draftButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  publishButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  deleteButton.addEventListener("click", (e) => handleDeleteClick(e, form));

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", (e) => handleChange(e, page));

  document.querySelectorAll(`[form=${formID}]`).forEach((input) => {
    input.addEventListener("input", (e) => handleChange(e, page));
  });
})();

async function handleDeleteClick(e, form) {
  const id = form.deleter.value;
  const method = "DELETE";

  const response = await fetch(`/api/page/${id}`, {
    method,
  });

  const { message } = await response.json();
  if (message) {
    window.location.href = "/forge/pages";
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

  const response = await fetch("/api/page", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  const { message } = await response.json();
  if (message) {
    window.location.href = "/forge/pages";
  }
}

function handleChange(e, page) {
  if (e.target.name !== "slug") return;
  const anchor = page.querySelector("[data-base-url]");
  const url = anchor.dataset.baseUrl + e.target.value;
  anchor.textContent = url;
  anchor.href = url;
}
