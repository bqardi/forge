import express from "express";
import { authenticateToken } from "../../utils/auth.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.render("pages/settings", {
    page: "settings",
    layoutType: "settings",
    data: {},
  });
});

router.get("/general", authenticateToken, async (req, res) => {
  res.render("pages/settings/general", {
    page: "general",
    parent: {
      title: "Settings",
      page: "settings",
      link: "/forge/settings",
    },
    layoutType: "grid",
    data: {},
  });
});

export default router;
