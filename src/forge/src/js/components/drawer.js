(function () {
  const drawers = document.querySelectorAll("[data-drawer]");

  if (!drawers) return;

  drawers.forEach((drawer) => {
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("[data-trigger]")) toggleDrawer(e);
      if (e.target.closest("[data-close]")) closeDrawer(e);
    });
  });
})();

function toggleDrawer(e) {
  e.preventDefault();
  e.currentTarget.classList.toggle("active");
}

function closeDrawer(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("active");
}
