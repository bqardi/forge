import { event, hook } from "../../utils/hookManager/index.js";

export async function settingsController(req, res) {
  await hook.action(event.onRouteBackend, "settings");

  res.render("pages/settings", {
    page: "settings",
    layoutType: "settings",
    data: {},
  });
}

export async function generalController(req, res) {
  await hook.action(event.onRouteBackend, "general");

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
