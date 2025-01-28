import express from "express";
import { authenticateToken } from "../../utils/auth.js";
import { getPlugin, getPlugins } from "../../services/plugin.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const allPlugins = await getPlugins();
  const user = req.user;
  const plugins = allPlugins.map((page) => page.dataValues);
  res.render("pages/plugins", {
    page: "plugins",
    layoutType: "overview",
    data: {
      user,
      plugins,
    },
  });
});

router.get("/browse", authenticateToken, async (req, res) => {
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  res.render("pages/plugin-browse", {
    id,
    page: "plugins",
    layoutType: "overview",
    type: "browse",
    data,
  });
});

export default router;
