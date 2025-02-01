import { event, hook } from "../../utils/hookManager/index.js";

export async function dashboardController(req, res) {
  await hook.action(event.onRouteBackend, "dashboard");

  res.render("pages/dashboard", {
    page: "dashboard",
    layoutType: "dashboard",
  });
}
