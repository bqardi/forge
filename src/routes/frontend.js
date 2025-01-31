import express from "express";
import {
  pageController,
  pagesController,
} from "../controllers/frontend/pagesController.js";
import { themeMiddleware } from "../middlewares/themeMiddleware.js";

const router = express.Router();

router.get("/", themeMiddleware, pagesController);
router.get("/*", themeMiddleware, pageController);

export default router;
