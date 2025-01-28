(function () {
  const themeButtons = document.querySelectorAll("[data-theme]");
  if (!themeButtons) return;
  themeButtons.forEach((button) => {
    button.addEventListener("click", activateTheme);
  });
})();

async function activateTheme(e) {
  e.preventDefault();

  const currentButton = e.currentTarget;
  const isActive = currentButton.classList.contains("active");

  const response = await fetch("/api/activate-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theme: currentButton.dataset.theme,
      isActive,
    }),
  });

  if (response.ok) {
    window.location.href = "/forge/appearance/themes";
  } else {
    alert("Attempt to activate theme failed");
    console.log(response);
  }
}
