import express from "express";
import forge from "./routes/forge.js";
import login from "./routes/login.js";
import api from "./routes/api.js";
import uploads from "./routes/uploads.js";
import frontendPages from "./routes/frontend.js";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { event, hook } from "./utils/hookManager/index.js";
import { filemap } from "./middlewares/filemap.js";
import { setLocals } from "./middlewares/setLocals.js";
import { noCache } from "./middlewares/cacheControl.js";
import { setBaseUrl } from "./middlewares/setBaseUrl.js";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const redisClient =
  process.env.NODE_ENV === "production"
    ? createClient({
        url: process.env.REDIS_URL,
        legacyMode: true,
      })
    : undefined;

redisClient?.connect().catch(console.error);

export async function initializeApp() {
  const app = express();

  // Middlewares
  app.use(setBaseUrl);
  app.use(
    session({
      store:
        process.env.NODE_ENV === "production"
          ? new RedisStore({ client: redisClient })
          : undefined,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
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

  // Cache control
  app.use("/login", noCache);
  app.use("/forge", noCache);

  // Routes
  await hook.action(event.beforeRouteBackend);
  await hook.action(event.beforeAssetRegister);
  app.use("/forge", forge);
  await hook.action(event.afterAssetRegister, app);
  app.use("/login", login);
  app.use("/api", api);
  app.use("/uploads", uploads);
  await hook.action(event.afterRouteBackend);

  await hook.action(event.beforeRouteFrontend);
  app.use("/", frontendPages);
  await hook.action(event.onRouteFrontend, "forge");
  await hook.action(event.afterRouteFrontend);

  return app;
}
