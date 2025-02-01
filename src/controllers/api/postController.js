import { createPost, updatePost } from "../../services/post.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function createPostController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const affectedRows = await createPost(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await hook.action(event.onRouteBackend, "post-create");
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Failed to update post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePostController(req, res) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const affectedRows = await updatePost(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await hook.action(event.onRouteBackend, "post-update");
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Failed to update post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
