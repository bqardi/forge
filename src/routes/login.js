import express from "express";
import {
  loginAttemptController,
  loginController,
} from "../controllers/loginController.js";

const router = express.Router();

router.get("/", loginController);
router.post("/", loginAttemptController);

export default router;
