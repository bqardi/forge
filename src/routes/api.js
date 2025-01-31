import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { updateUserController } from "../controllers/api/userController.js";
import {
  createPostController,
  updatePostController,
} from "../controllers/api/postController.js";
import {
  createPageController,
  updatePageController,
} from "../controllers/api/pageController.js";
import { themeToggleController } from "../controllers/api/themeControlle.js";

const router = express.Router();

router.put("/profile", authenticateToken, updateUserController);
router.post("/post", authenticateToken, createPostController);
router.put("/post", authenticateToken, updatePostController);
router.post("/page", authenticateToken, createPageController);
router.put("/page", authenticateToken, updatePageController);
router.post("/activate-theme", authenticateToken, themeToggleController);

export default router;
