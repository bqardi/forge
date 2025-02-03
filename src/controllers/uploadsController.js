import path from "path";
import { config } from "../utils/global.js";
import { event, hook } from "../utils/hookManager/index.js";

export async function uploadsController(req, res) {
  await hook.action(event.onRouteBackend, "uploads");
}

export async function uploadController(req, res) {
  const filename = req.params.filename;
  const uploadsPath = config.GET_UPLOADS_PATH();

  await hook.action(event.onRouteBackend, "uploads");

  res.sendFile(path.join(uploadsPath, filename));
}
