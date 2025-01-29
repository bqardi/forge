import express from "express";
import forge from "./routes/forge/index.js";
import pages from "./routes/forge/pages.js";
import posts from "./routes/forge/posts.js";
import users from "./routes/forge/users.js";
import plugins from "./routes/forge/plugins.js";
import appearance from "./routes/forge/appearance.js";
import settings from "./routes/forge/settings.js";
import login from "./routes/login.js";
import api from "./routes/api.js";
import frontendPages from "./routes/frontend/pages.js";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { event, hook } from "./utils/hookManager/index.js";
import { filemap } from "./routes/middleware/filemap.js";
import path from "path";
import { fileURLToPath } from "url";
import { setLocals } from "./routes/middleware/setLocals.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.use(express.static(path.join(__dirname, "forge", "assets")));

// Routes
hook.action(event.beforeRouteBackend);
app.use("/forge", forge);
hook.action(event.onRouteBackend, "forge");
app.use("/forge/pages", pages);
hook.action(event.onRouteBackend, "pages");
app.use("/forge/posts", posts);
hook.action(event.onRouteBackend, "posts");
app.use("/forge/users", users);
hook.action(event.onRouteBackend, "users");
app.use("/forge/plugins", plugins);
hook.action(event.onRouteBackend, "plugins");
app.use("/forge/appearance", appearance);
hook.action(event.onRouteBackend, "appearance");
app.use("/forge/settings", settings);
hook.action(event.onRouteBackend, "settings");
app.use("/login", login);
hook.action(event.onRouteBackend, "login");
app.use("/api", api);
hook.action(event.onRouteBackend, "api");
hook.action(event.afterRouteBackend);

hook.action(event.beforeRouteFrontend);
app.use("/", frontendPages);
hook.action(event.onRouteFrontend, "forge");
hook.action(event.afterRouteFrontend);

export default app;
