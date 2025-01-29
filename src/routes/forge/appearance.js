import express from "express";
import { authenticateToken } from "../../utils/auth.js";
import { getThemesConfig } from "../../utils/themeHandler.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  // res.redirect("/forge/appearance/themes");
  res.render("pages/appearance", {
    page: "appearance",
    layoutType: "overview",
    data: {},
  });
});

router.get("/themes", authenticateToken, async (req, res) => {
  const themes = await getThemesConfig();

  res.render("pages/appearance/themes", {
    page: "themes",
    parent: {
      title: "Appearance",
      link: "/forge/appearance",
    },
    layoutType: "grid",
    data: {
      themes,
    },
  });
});

export default router;
