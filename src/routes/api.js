import express from "express";
import { authenticateToken } from "../utils/auth.js";
import { updateUser } from "../services/user.js";
import { createPost, updatePost } from "../services/post.js";
import { createPage, updatePage } from "../services/page.js";
import { setSetting } from "../services/setting.js";

const router = express.Router();

router.post("/logout", (req, res) => {
  res
    .status(200)
    .clearCookie("auth_token")
    .json({ message: "Logged out successfully" });
});

router.put("/profile", async (req, res) => {
  try {
    const affectedRows = await updateUser(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/post", authenticateToken, async (req, res) => {
  try {
    const affectedRows = await createPost(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/post", authenticateToken, async (req, res) => {
  try {
    const affectedRows = await updatePost(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/page", authenticateToken, async (req, res) => {
  try {
    const affectedRows = await createPage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/page", authenticateToken, async (req, res) => {
  try {
    const affectedRows = await updatePage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/activate-theme", authenticateToken, async (req, res) => {
  try {
    const { theme, isActive } = req.body;

    const setting = await setSetting({
      key: "active_theme",
      value: theme,
      isActive,
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
