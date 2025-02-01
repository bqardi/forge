import { event, hook } from "../../utils/hookManager/index.js";
import { getThemesConfig } from "../../utils/themeHandler.js";

export function appearanceController(req, res) {
  hook.action(event.onRouteBackend, "appearance");

  res.render("pages/appearance", {
    page: "appearance",
    layoutType: "overview",
    data: {},
  });
}

export async function themesController(req, res) {
  const themes = await getThemesConfig();

  hook.action(event.onRouteBackend, "themes");

  res.render("pages/appearance/themes", {
    page: "themes",
    parent: {
      title: "Appearance",
      page: "appearance",
      link: "/forge/appearance",
    },
    layoutType: "grid",
    data: {
      themes,
    },
  });
}
