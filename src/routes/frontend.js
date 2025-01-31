import express from "express";
import {
  pageController,
  pagesController,
} from "../controllers/frontend/pagesController.js";

const router = express.Router();

router.get("/", pagesController);
router.get("/:slug", pageController);

export default router;
