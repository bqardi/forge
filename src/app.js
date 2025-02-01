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
import { assetManager } from "./utils/assetManager/assetManager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function initializeApp() {
  const app = express();

  // Middlewares
  hook.action(event.beforeMiddleware);
  app.use(express.json());
  hook.action(event.onMiddleware, "json");
  app.use(cookieParser());
  hook.action(event.onMiddleware, "cookieParser");
  app.use(express.urlencoded({ extended: true }));
  hook.action(event.onMiddleware, "urlencoded");
  app.use(expressLayouts);
  hook.action(event.onMiddleware, "expressLayouts");
  app.use(filemap);
  hook.action(event.onMiddleware, "filemap");
  app.use(setLocals);
  hook.action(event.onMiddleware, "setLocals");
  hook.action(event.afterMiddleware);

  // EJS views
  app.set("views", path.join(__dirname, "forge", "views"));
  app.set("view engine", "ejs");

  // Static files (for themes and assets)
  hook.action(event.beforeAssetRegister, assetManager);
  app.use(express.static(path.join(__dirname, "forge", "assets")));
  // TODO: Make this hook work so the registered assets are loaded:
  hook.action(event.afterAssetRegister, assetManager);

  // Routes
  hook.action(event.beforeRouteBackend);
  app.use("/forge", forge);
  app.use("/login", login);
  app.use("/api", api);
  hook.action(event.afterRouteBackend);

  hook.action(event.beforeRouteFrontend);
  app.use("/", frontendPages);
  hook.action(event.onRouteFrontend, "forge");
  hook.action(event.afterRouteFrontend);

  return app;
}
