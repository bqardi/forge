import express from "express";
import {
  firstTimeSetupAttemptController,
  firstTimeSetupController,
} from "../controllers/firstTimeSetupController.js";

const router = express.Router();

router.get("/", firstTimeSetupController);
router.post("/", firstTimeSetupAttemptController);

export default router;
