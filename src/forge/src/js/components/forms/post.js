(function () {
  const form = document.getElementById("form-post");
  if (!form) return;
  form.addEventListener("submit", handleSubmit);
})();

async function handleSubmit(e) {
  e.preventDefault();

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

  const data = await response.json();

  if (response.ok) {
    broadcaster.emit("notify", {
      type: "success",
      title: "Post updated",
      message: "Post was updated successfully",
    });
  } else {
    alert("Update failed");
  }
}
