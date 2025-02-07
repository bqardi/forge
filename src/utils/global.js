import path from "path";
import { fileURLToPath, URL } from "url";
import dotenv from "dotenv";
import { getCurrentThemeName } from "./themeHandler.js";
dotenv.config({
  path: [".env.local", ".env"],
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..");

export function setGlobalBaseUrl(baseUrl) {
  config.BASE_URL = baseUrl;
  config.THEMES_URL = new URL("themes", config.BASE_URL);
  config.GET_URL = (...subpages) => {
    const url = new URL(config.BASE_URL);
    url.pathname = path.join(url.pathname, ...subpages);
    return url.href;
  };
  config.GET_UPLOADS_URL = (...folders) => {
    const url = new URL(config.BASE_URL);
    url.pathname = path.join(url.pathname, "uploads", ...folders);
    return url.href;
  };
}

export const config = {
  BASE_URL: null,
  THEMES_URL: null,
  THEMES_PATH: path.join(src, "public", "themes"),
  GET_URL: null,
  GET_THEME_PATH: async (...folders) => {
    const themeName = await getCurrentThemeName();
    return path.join(config.THEMES_PATH, themeName, ...folders);
  },
  GET_UPLOADS_PATH: (...folders) =>
    path.join(src, "public", "uploads", ...folders),
  GET_UPLOADS_URL: null,
};
