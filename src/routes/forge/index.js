import express from "express";
import { authenticateToken } from "../../utils/auth.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.render("pages/dashboard", {
    page: "dashboard",
    layoutType: "dashboard",
  });
});

router.get("/media", authenticateToken, (req, res) => {
  res.render("pages/media", {
    page: "media",
    layoutType: "media",
  });
});

export default router;
