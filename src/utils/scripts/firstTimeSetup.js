import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function databaseExists() {
  const dbPath = path.join(__dirname, "../../config/database.sqlite");
  const dbExists = fs.existsSync(dbPath);
  return dbExists;
}
