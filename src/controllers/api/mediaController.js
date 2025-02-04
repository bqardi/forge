import { event, hook } from "../../utils/hookManager/index.js";
import { getUploadedMedia } from "../../utils/uploads.js";

export async function uploadController(req, res) {
  try {
    await hook.action(event.onRouteBackend, "media-upload");
    res.redirect("/forge/media");
  } catch (err) {
    console.error("Failed to upload media:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function mediaController(req, res) {
  const filename = req.body.filename;

  if (!filename) {
    return res.status(400).json({ message: "Filename is required" });
  }

  const fileList = getUploadedMedia();
  const file = fileList.find((file) => file.name === filename);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json(file);
}
