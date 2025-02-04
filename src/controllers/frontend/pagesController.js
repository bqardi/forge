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

  const { status, type } = page.dataValues;

  if (status !== "published") {
    return res.status(404).send("Page not found");
  }

  const found = theme.views.find((view) => view.key === type);
  const renderPath = path.join(
    theme.path,
    "views",
    found.filename ?? theme.config.default
  );
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

  const { status, type } = page.dataValues;

  if (status !== "published") {
    return res.status(404).send("Page not found");
  }

  const filename =
    type === "default"
      ? theme.config.default
      : theme.views.find((view) => view.key === type).filename;

  const renderPath = path.join(theme.path, "views", filename);
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
