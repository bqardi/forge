(function () {
  const logoutButton = document.querySelector("[data-logout-button]");
  if (!logoutButton) return;
  logoutButton.addEventListener("click", activateTheme);
})();

async function activateTheme(e) {
  e.preventDefault();

  const response = await fetch("/api/logout", {
    method: "POST",
  });

  if (response.ok) {
    window.location.href = "/login";
  } else {
    alert("Logout failed");
    console.log(response);
  }
}
