import express from "express";
import Page from "../../models/Page.js";
import path from "path";
import { getSetting } from "../../services/setting.js";
import fs from "fs";
import { config } from "../../utils/global.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const activeTheme = await getSetting("active_theme");
  if (!activeTheme) {
    return res.status(500).send("No active theme found");
  }

  const page = await Page.findOne({ where: { type: "frontpage" } });
  if (!page) {
    return res.status(404).send("Page not found");
  }

  const themeDir = path.join(config.THEMES_PATH, activeTheme.value);
  const themeTemplate = path.join(themeDir, "index.html");

  res.sendFile(themeTemplate);
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const activeTheme = await getSetting("active_theme");
  if (!activeTheme) {
    return res.status(500).send("No active theme found");
  }

  const page = await Page.findOne({ where: { slug } });
  if (!page) {
    return res.status(404).send("Page not found");
  }

  const activeThemePath = path.join(config.THEMES_PATH, activeTheme.value);
  const folderFile = path.join(activeThemePath, slug, "index.html");
  const fileHtml = path.join(activeThemePath, `${slug}.html`);
  if (fs.existsSync(folderFile)) {
    res.sendFile(folderFile);
  } else if (fs.existsSync(fileHtml)) {
    res.sendFile(fileHtml);
  }
});

export default router;
