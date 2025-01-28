import fs from "fs";
import path from "path";
import { getSetting } from "../services/setting.js";
import { config } from "./global.js";

export async function getCurrentThemeName() {
  const activeTheme = await getSetting("active_theme");

  if (!activeTheme) {
    console.error("No active theme found");
    return null;
  }

  return activeTheme.value;
}

export async function getCurrentThemeConfig(themeName) {
  if (themeName === null) {
    console.error("No theme name provided!");
    return null;
  }

  const themeDir = path.join(config.THEMES_PATH, themeName);

  if (!fs.existsSync(themeDir)) {
    console.error("Theme not found (did you delete it?)");
    return null;
  }

  const configFile = path.join(themeDir, "theme.config.json");

  if (!fs.existsSync(configFile)) {
    console.error("Theme config not found in theme directory");
    return null;
  }

  const configData = fs.readFileSync(configFile, "utf8");
  const data = JSON.parse(configData);

  if (!data) {
    console.error("Theme config is empty");
    return null;
  }

  const entryFile = path.join(themeDir, data.entry);

  if (!fs.existsSync(entryFile)) {
    console.error("Entry file required, but not found!");
    return null;
  }

  return data;
}

export async function getThemesConfig() {
  const activeTheme = await getCurrentThemeName();
  const themeFolders = fs.readdirSync(config.THEMES_PATH);
  const themes = themeFolders.map((theme) => {
    const themePath = path.join(config.THEMES_PATH, theme, "theme.config.json");
    const themeData = JSON.parse(fs.readFileSync(themePath, "utf8"));
    return {
      ...themeData,
      name: theme,
      isActive: activeTheme === theme,
    };
  });

  return themes;
}
