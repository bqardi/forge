import fs from "fs";
import path from "path";
import { getSetting } from "../services/setting.js";
import { config } from "./global.js";

export async function getCurrentTheme() {
  const activeTheme = await getSetting("active_theme");

  if (!activeTheme) {
    console.error("No active theme found");
    return;
  }

  console.log(`Active theme: ${activeTheme}`);

  return activeTheme.value;
}

getCurrentTheme();

const scanThemes = async () => {
  const activeTheme = await getSetting("active_theme");

  if (!activeTheme) {
    console.error("No active theme found");
    return;
  }

  const themeDir = path.join(config.THEMES_PATH, activeTheme.value);

  if (!fs.existsSync(themeDir)) {
    console.error("Theme not found (did you delete it?)");
    return;
  }

  const configFile = path.join(themeDir, "theme.config.json");

  if (!fs.existsSync(configFile)) {
    console.error("Theme config not found");
    return;
  }

  const configData = fs.readFileSync(configFile, "utf8");

  const data = JSON.parse(configData);

  if (!data) {
    console.error("Theme config is empty");
    return;
  }

  const entryFile = path.join(themeDir, data.entry);

  if (!fs.existsSync(entryFile)) {
    console.error("Entry file required, but not found!");
    return;
  }

  console.log(`Active theme: ${activeTheme.value}`);
  // await import(entryFile);
  console.log("Theme loaded");
};

export default scanThemes;
