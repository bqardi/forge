import fs from "fs";
import path from "path";
import Page from "../../models/Page.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function frontpageController(req, res) {
  const theme = req.theme;
  if (!theme.name) {
    return res.status(500).send("No active theme found");
  }

  const page = await Page.findOne({ where: { type: "frontpage" } });
  if (!page) {
    return res.status(404).send("Page not found");
  }

  const renderPath = path.join(theme.path, "views", "index.ejs");
  const themeLayout = path.join(theme.path, "views", "layout.ejs");

  await hook.action(event.onRouteFrontend, "frontpage", page.dataValues);
  res.render(renderPath, {
    layout: fs.existsSync(themeLayout) ? themeLayout : false,
    page: page.dataValues,
  });
}

export async function pageController(req, res) {
  const slug = req.params[0].replace(/\/$/, "");

  const theme = req.theme;
  if (!theme.name) {
    return res.status(500).send("No active theme found");
  }
  const page = await Page.findOne({ where: { slug } });

  if (!page) {
    return res.status(404).send("Page not found");
  }

  const renderPath = path.join(theme.path, "views", "page.ejs");
  if (!renderPath) {
    return res.status(404).send("Template not found");
  }

  const themeLayout = path.join(theme.path, "views", "layout.ejs");

  await hook.action(event.onRouteFrontend, "page", page.dataValues);
  res.render(renderPath, {
    layout: fs.existsSync(themeLayout) ? themeLayout : false,
    page: page.dataValues,
  });
}
