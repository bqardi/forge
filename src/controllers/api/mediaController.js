import { event, hook } from "../../utils/hookManager/index.js";

export async function mediaUploadController(req, res) {
  try {
    console.log(req.file);

    const { filename } = req.file;

    await hook.action(event.onRouteBackend, "media-upload");
    res.redirect("/forge/media");
  } catch (err) {
    console.error("Failed to upload media:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
