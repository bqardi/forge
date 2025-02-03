import express from "express";
import {
  uploadController,
  uploadsController,
} from "../controllers/uploadsController.js";

const router = express.Router();

router.get("/", uploadsController);
router.get("/:filename", uploadController);

export default router;
