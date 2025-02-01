import fs from "fs";
import path from "path";
import { getSetting } from "../services/setting.js";
import { config } from "./global.js";
import { prettifySlug } from "./stringHandler.js";
import { pathToFileURL } from "url";

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
  return themeFolders.map((theme) => {
    const themePath = path.join(config.THEMES_PATH, theme, "theme.config.json");
    const themeData = JSON.parse(fs.readFileSync(themePath, "utf8"));
    const rating = getThemeRating(theme);
    return {
      ...themeData,
      name: theme,
      title: themeData.title || prettifySlug(theme),
      isActive: activeTheme === theme,
      rating,
    };
  });
}

// TODO: Implement theme rating system (data from external API?)
export function getThemeRating(themeName) {
  const dummyList = {
    "base-theme": 5,
    "my-theme": 3,
  };

  return dummyList[themeName];
}

export async function initializeTheme(theme) {
  if (!theme) return;

  const themeConfig = await getCurrentThemeConfig(theme);
  if (!themeConfig) return;

  const themeEntry = path.join(config.THEMES_PATH, theme, themeConfig.entry);
  const themeEntryUrl = pathToFileURL(themeEntry).href;

  await import(themeEntryUrl);
}
