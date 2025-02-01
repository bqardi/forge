import express from "express";
import {
  pageController,
  frontpageController,
} from "../controllers/frontend/pagesController.js";
import { themeMiddleware } from "../middlewares/themeMiddleware.js";

const router = express.Router();

router.get("/", themeMiddleware, frontpageController);
router.get("/*", themeMiddleware, pageController);

export default router;
