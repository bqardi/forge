import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./global.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getUploadedMedia() {
  const mediaDir = path.join(__dirname, "..", "public", "uploads");
  return fs.readdirSync(mediaDir).map((file) => {
    return {
      name: file,
      url: config.GET_UPLOADS_URL(file),
    };
  });
}
