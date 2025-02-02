(function () {
  const logoutButton = document.querySelector("[data-logout-button]");
  if (!logoutButton) return;
  logoutButton.addEventListener("click", logoutHandler);
})();

async function logoutHandler(e) {
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
