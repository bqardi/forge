import { getCurrentThemeName } from "../utils/themeHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../utils/global.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
