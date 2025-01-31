export function dashboardController(req, res) {
  res.render("pages/dashboard", {
    page: "dashboard",
    layoutType: "dashboard",
  });
}
