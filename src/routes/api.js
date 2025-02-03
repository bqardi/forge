import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import {
  createUserController,
  deleteUserController,
  updateUserController,
} from "../controllers/api/userController.js";
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
import { mediaUploadController } from "../controllers/api/mediaController.js";
import { multerUpload } from "../middlewares/multerUpload.js";

const router = express.Router();

router.post("/logout", authenticateToken, logoutController);
router.post("/user", authenticateToken, createUserController);
router.put("/user", authenticateToken, updateUserController);
router.delete("/user/:id", authenticateToken, deleteUserController);
router.post("/post", authenticateToken, createPostController);
router.put("/post", authenticateToken, updatePostController);
router.delete("/post/:id", authenticateToken, deletePostController);
router.post("/page", authenticateToken, createPageController);
router.put("/page", authenticateToken, updatePageController);
router.delete("/page/:id", authenticateToken, deletePageController);
router.post("/activate-theme", authenticateToken, themeToggleController);
router.post("/media", authenticateToken, multerUpload, mediaUploadController);

export default router;
