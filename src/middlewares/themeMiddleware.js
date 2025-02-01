import { getCurrentThemeName } from "../utils/themeHandler.js";
import path from "path";
import { config } from "../utils/global.js";

export async function themeMiddleware(req, res, next) {
  const activeTheme = await getCurrentThemeName();
  let themePath = null;

  if (activeTheme) {
    themePath = path.join(config.THEMES_PATH, activeTheme);
  }

  req.theme = {
    name: activeTheme,
    path: themePath,
  };
  next();
}
