import {
  beforeMiddleware,
  onMiddleware,
  afterMiddleware,
} from "./actions/middleware.js";
import {
  beforeSystemInit,
  onSystemInit,
  afterSystemInit,
} from "./actions/systemInit.js";
import {
  beforeRouteBackend,
  onRouteBackend,
  afterRouteBackend,
  beforeRouteFrontend,
  onRouteFrontend,
  afterRouteFrontend,
} from "./actions/routeRegister.js";
import {
  beforeAssetRegister,
  onAssetRegister,
  afterAssetRegister,
} from "./actions/assetRegister.js";
import hook from "./hook.js";

const event = {
  // System Init
  beforeSystemInit: "beforeSystemInit",
  onSystemInit: "onSystemInit",
  afterSystemInit: "afterSystemInit",
  // Middleware
  beforeMiddleware: "beforeMiddleware",
  onMiddleware: "onMiddleware",
  afterMiddleware: "afterMiddleware",
  // Route Register (Backend)
  beforeRouteBackend: "beforeRouteBackend",
  onRouteBackend: "onRouteBackend",
  afterRouteBackend: "afterRouteBackend",
  // Route Register (Frontend)
  beforeRouteFrontend: "beforeRouteFrontend",
  onRouteFrontend: "onRouteFrontend",
  afterRouteFrontend: "afterRouteFrontend",
  // Asset Register
  beforeAssetRegister: "beforeAssetRegister",
  onAssetRegister: "onAssetRegister",
  afterAssetRegister: "afterAssetRegister",
};

hook.register(event.beforeSystemInit, beforeSystemInit, 10);
hook.register(event.onSystemInit, onSystemInit, 10);
hook.register(event.afterSystemInit, afterSystemInit, 10);

hook.register(event.beforeMiddleware, beforeMiddleware, 10);
hook.register(event.onMiddleware, onMiddleware, 10);
hook.register(event.afterMiddleware, afterMiddleware, 10);

hook.register(event.beforeRouteBackend, beforeRouteBackend, 10);
hook.register(event.onRouteBackend, onRouteBackend, 10);
hook.register(event.afterRouteBackend, afterRouteBackend, 10);

hook.register(event.beforeRouteFrontend, beforeRouteFrontend, 10);
hook.register(event.onRouteFrontend, onRouteFrontend, 10);
hook.register(event.afterRouteFrontend, afterRouteFrontend, 10);

hook.register(event.beforeAssetRegister, beforeAssetRegister, 10);
hook.register(event.onAssetRegister, onAssetRegister, 10);
hook.register(event.afterAssetRegister, afterAssetRegister, 10);

export { event, hook };
