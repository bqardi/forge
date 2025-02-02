import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import { updateUserController } from "../controllers/api/userController.js";
import {
  createPostController,
  deletePostController,
  updatePostController,
} from "../controllers/api/postController.js";
import {
  createPageController,
  deletePageController,
  updatePageController,
} from "../controllers/api/pageController.js";
import { themeToggleController } from "../controllers/api/themeController.js";
import { logoutController } from "../controllers/api/logoutController.js";

const router = express.Router();

router.post("/logout", authenticateToken, logoutController);
router.put("/user", authenticateToken, updateUserController);
router.post("/post", authenticateToken, createPostController);
router.put("/post", authenticateToken, updatePostController);
router.delete("/post/:id", authenticateToken, deletePostController);
router.post("/page", authenticateToken, createPageController);
router.put("/page", authenticateToken, updatePageController);
router.delete("/page/:id", authenticateToken, deletePageController);
router.post("/activate-theme", authenticateToken, themeToggleController);

export default router;
