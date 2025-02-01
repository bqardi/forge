import { event, hook } from "../../utils/hookManager/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function assetsController(req, res) {
  const { type, file } = req.params;

  await hook.action(event.onRouteBackend, "asset");
  await hook.action(event.onAssetRegister, "asset");
  res.sendFile(path.join(__dirname, "..", "..", "forge", "assets", type, file));
}
