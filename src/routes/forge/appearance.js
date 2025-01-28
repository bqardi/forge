import fs from "fs";
import path from "path";
import express from "express";
import { authenticateToken } from "../../utils/auth.js";
import { getSetting } from "../../services/setting.js";
import { config } from "../../utils/global.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.render("pages/appearance", {
    page: "appearance",
    layoutType: "appearance",
  });
});

router.get("/themes", authenticateToken, async (req, res) => {
  const activeTheme = await getSetting("active_theme");
  const themeFolders = fs.readdirSync(config.THEMES_PATH);
  const themes = themeFolders.map((theme) => {
    const themePath = path.join(config.THEMES_PATH, theme, "theme.config.json");
    const themeData = JSON.parse(fs.readFileSync(themePath, "utf8"));

    return {
      ...themeData,
      name: theme,
      isActive: activeTheme?.value === theme,
    };
  });
  res.render("pages/appearance/themes", {
    page: "themes",
    layoutType: "grid",
    data: {
      themes,
    },
  });
});

export default router;
