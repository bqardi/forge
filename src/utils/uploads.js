import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mime from "mime-types";
import { config } from "./global.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getUploadedMedia() {
  const mediaDir = path.join(__dirname, "..", "public", "uploads");
  return fs.readdirSync(mediaDir).map((file) => {
    const filePath = path.join(mediaDir, file);
    const stats = fs.statSync(filePath);
    const mimeType = mime.lookup(filePath);
    const [type, subtype] = mimeType.split("/");

    return {
      name: file,
      url: config.GET_UPLOADS_URL(file),
      size: stats.size,
      mimeType,
      type,
      subtype,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime,
    };
  });
}
