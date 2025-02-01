import express from "express";
import forge from "./routes/forge.js";
import login from "./routes/login.js";
import api from "./routes/api.js";
import frontendPages from "./routes/frontend.js";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { event, hook } from "./utils/hookManager/index.js";
import { filemap } from "./middlewares/filemap.js";
import { setLocals } from "./middlewares/setLocals.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initializeApp() {
  const app = express();

  // Middlewares
  await hook.action(event.beforeMiddleware);
  app.use(express.json());
  await hook.action(event.onMiddleware, "json");
  app.use(cookieParser());
  await hook.action(event.onMiddleware, "cookieParser");
  app.use(express.urlencoded({ extended: true }));
  await hook.action(event.onMiddleware, "urlencoded");
  app.use(expressLayouts);
  await hook.action(event.onMiddleware, "expressLayouts");
  app.use(filemap);
  await hook.action(event.onMiddleware, "filemap");
  app.use(setLocals);
  await hook.action(event.onMiddleware, "setLocals");
  await hook.action(event.afterMiddleware);

  // EJS views
  app.set("views", path.join(__dirname, "forge", "views"));
  app.set("view engine", "ejs");

  // Static files for Forge (backend css, js, images)
  await hook.action(event.beforeAssetRegister);
  app.get("/forge-assets/:type/:file", (req, res) => {
    const { type, file } = req.params;
    res.sendFile(path.join(__dirname, "forge", "assets", type, file));
  });
  await hook.action(event.afterAssetRegister);

  // Routes
  await hook.action(event.beforeRouteBackend);
  app.use("/forge", forge);
  app.use("/login", login);
  app.use("/api", api);
  await hook.action(event.afterRouteBackend);

  await hook.action(event.beforeRouteFrontend);
  app.use("/", frontendPages);
  await hook.action(event.onRouteFrontend, "forge");
  await hook.action(event.afterRouteFrontend);

  return app;
}
