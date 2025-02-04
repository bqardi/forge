import {
  getCurrentThemeName,
  getCurrentThemeConfig,
} from "../utils/themeHandler.js";
import path from "path";
import { config } from "../utils/global.js";

export async function themeMiddleware(req, res, next) {
  const activeTheme = await getCurrentThemeName();
  const themeConfig = await getCurrentThemeConfig(activeTheme);
  let themePath = null;
  let views = [];

  if (activeTheme) {
    themePath = path.join(config.THEMES_PATH, activeTheme);
    views = themeConfig.views;
  }

  req.theme = {
    name: activeTheme,
    path: themePath,
    config: themeConfig,
    views,
  };
  next();
}
