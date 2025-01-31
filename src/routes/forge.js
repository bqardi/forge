import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { dashboardController } from "../controllers/forge/dashboardController.js";
import { event, hook } from "../utils/hookManager/index.js";
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
import { pluginsController } from "../controllers/forge/pluginsController.js";
import {
  appearanceController,
  themesController,
} from "../controllers/forge/appearanceController.js";
import {
  generalController,
  settingsController,
} from "../controllers/forge/settingsController.js";
import { mediaController } from "../controllers/forge/mediaController.js";

const router = express.Router();

router.get("/", authenticateToken, dashboardController);

router.get("/pages", authenticateToken, pagesController);
hook.action(event.onRouteBackend, "pages");
router.get("/pages/:id", authenticateToken, pageController);
hook.action(event.onRouteBackend, "childpages");
router.get("/posts", authenticateToken, postsController);
hook.action(event.onRouteBackend, "posts");
router.get("/posts/:id", authenticateToken, postController);
hook.action(event.onRouteBackend, "childposts");
router.get("/users", authenticateToken, usersController);
hook.action(event.onRouteBackend, "users");
router.get("/users/:id", authenticateToken, userController);
hook.action(event.onRouteBackend, "user");
router.get("/plugins", authenticateToken, pluginsController);
hook.action(event.onRouteBackend, "plugins");
router.get("/appearance", authenticateToken, appearanceController);
hook.action(event.onRouteBackend, "appearance");
router.get("/appearance/themes", authenticateToken, themesController);
hook.action(event.onRouteBackend, "themes");
router.get("/settings", authenticateToken, settingsController);
hook.action(event.onRouteBackend, "settings");
router.get("/settings/general", authenticateToken, generalController);
hook.action(event.onRouteBackend, "general");
router.get("/media", authenticateToken, mediaController);
hook.action(event.onRouteBackend, "media");

export default router;
