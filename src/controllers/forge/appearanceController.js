import { getThemesConfig } from "../../utils/themeHandler.js";

export function appearanceController(req, res) {
  res.render("pages/appearance", {
    page: "appearance",
    layoutType: "overview",
    data: {},
  });
}

export async function themesController(req, res) {
  const themes = await getThemesConfig();

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
