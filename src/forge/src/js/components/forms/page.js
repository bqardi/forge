(function () {
  const page = document.querySelector("[data-page]");
  if (!page) return;
  const form = page.querySelector("#form-page");
  if (!form) return;
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", (e) => handleChange(e, page));
})();

async function handleSubmit(e) {
  e.preventDefault();

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

  const data = await response.json();

  if (response.ok) {
    console.log(data);
  } else {
    alert("Update failed");
  }
}

function handleChange(e, page) {
  if (e.target.name !== "slug") return;
  const anchor = page.querySelector("[data-base-url]");
  const url = anchor.dataset.baseUrl + e.target.value;
  anchor.textContent = url;
  anchor.href = url;
}
