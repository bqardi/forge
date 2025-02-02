import { createPage, deletePage, updatePage } from "../../services/page.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function createPageController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const affectedRows = await createPage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    await hook.action(event.onRouteBackend, "page-create");
    req.session.notification = {
      type: "success",
      message: "Page created successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePageController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const affectedRows = await updatePage(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await hook.action(event.onRouteBackend, "page-update");
    req.session.notification = {
      type: "success",
      message: "Page updated successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    console.error("Failed to update page:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletePageController(req, res) {
  try {
    const id = req.params.id;

    const affectedRows = await deletePage(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    await hook.action(event.onRouteBackend, "page-delete");
    req.session.notification = {
      type: "success",
      message: "Page deleted successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    console.error("Failed to update page:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
