(function () {
  const user = document.querySelector("[data-user]");
  if (!user) return;

  const formID = "form-user";
  const form = user.querySelector(`#${formID}`);
  if (!form) return;

  const publishButton = document.querySelector("#publisher");
  const deleteButton = document.querySelector("#deleter");

  publishButton.addEventListener("click", (e) => handleSubmitClick(e, form));
  deleteButton.addEventListener("click", (e) => handleDeleteClick(e, form));

  form.addEventListener("submit", handleSubmit);
})();

async function handleDeleteClick(e, form) {
  const id = form.deleter.value;
  const method = "DELETE";

  const response = await fetch(`/api/user/${id}`, {
    method,
  });

  const { message } = await response.json();
  if (message) {
    window.location.href = "/forge/users";
  }
}

function handleSubmitClick(e, form) {
  form.dispatchEvent(new Event("submit"));
}

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
  if (message) {
    window.location.href = "/forge/users";
  }
}
