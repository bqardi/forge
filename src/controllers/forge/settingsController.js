import { event, hook } from "../../utils/hookManager/index.js";

export function settingsController(req, res) {
  hook.action(event.onRouteBackend, "settings");

  res.render("pages/settings", {
    page: "settings",
    layoutType: "settings",
    data: {},
  });
}

export function generalController(req, res) {
  hook.action(event.onRouteBackend, "general");

  res.render("pages/settings/general", {
    page: "general",
    parent: {
      title: "Settings",
      page: "settings",
      link: "/forge/settings",
    },
    layoutType: "grid",
    data: {},
  });
}
