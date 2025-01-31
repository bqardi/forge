import express from "express";
import { logoutController } from "../controllers/logoutController";

const router = express.Router();

router.post("/logout", logoutController);

export default router;
