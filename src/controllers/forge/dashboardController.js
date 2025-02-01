import { event, hook } from "../../utils/hookManager/index.js";

export function dashboardController(req, res) {
  hook.action(event.onRouteBackend, "dashboard");
  res.render("pages/dashboard", {
    page: "dashboard",
    layoutType: "dashboard",
  });
}
