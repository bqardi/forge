import { createPage, updatePage } from "../../services/page.js";

export async function createPageController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.body.slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const affectedRows = await createPage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Page updated successfully" });
  } catch (err) {
    console.error("Failed to update page:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePageController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.body.slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const affectedRows = await updatePage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Page updated successfully" });
  } catch (err) {
    console.error("Failed to update page:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
