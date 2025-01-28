(function () {
  const themeToggles = document.querySelectorAll("[data-theme]");
  if (!themeToggles) return;
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", activateTheme);
  });
})();

let timeout = null;

async function activateTheme(e) {
  if (e.target.tagName !== "INPUT") return;

  const currentToggle = e.currentTarget;
  const checkbox = e.target;

  const response = await fetch("/api/activate-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theme: currentToggle.dataset.theme,
      isActive: !checkbox.checked,
    }),
  });

  if (response.ok) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.location.href = "/forge/appearance/themes";
    }, 150);
  } else {
    alert("Attempt to activate theme failed");
    console.log(response);
  }
}
