import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { dashboardController } from "../controllers/forge/dashboardController.js";
import {
  pageController,
  pagesController,
} from "../controllers/forge/pagesController.js";
import {
  postController,
  postsController,
} from "../controllers/forge/postsController.js";
import {
  userController,
  usersController,
} from "../controllers/forge/usersController.js";
import {
  browseController,
  installedController,
  pluginsController,
  uploadController,
} from "../controllers/forge/pluginsController.js";
import {
  appearanceController,
  themesController,
} from "../controllers/forge/appearanceController.js";
import {
  generalController,
  settingsController,
} from "../controllers/forge/settingsController.js";
import { mediaController } from "../controllers/forge/mediaController.js";
import { assetsController } from "../controllers/forge/assetsController.js";

const router = express.Router();

router.get("/", authenticateToken, dashboardController);
router.get("/assets/:type/:file", assetsController);
router.get("/pages", authenticateToken, pagesController);
router.get("/pages/:id", authenticateToken, pageController);
router.get("/posts", authenticateToken, postsController);
router.get("/posts/:id", authenticateToken, postController);
router.get("/users", authenticateToken, usersController);
router.get("/users/:id", authenticateToken, userController);
router.get("/plugins", authenticateToken, pluginsController);
router.get("/plugins/installed", authenticateToken, installedController);
router.get("/plugins/browse", authenticateToken, browseController);
router.get("/plugins/upload", authenticateToken, uploadController);
router.get("/appearance", authenticateToken, appearanceController);
router.get("/appearance/themes", authenticateToken, themesController);
router.get("/settings", authenticateToken, settingsController);
router.get("/settings/general", authenticateToken, generalController);
router.get("/media", authenticateToken, mediaController);

export default router;
