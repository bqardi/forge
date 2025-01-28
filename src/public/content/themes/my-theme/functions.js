import { event, hook } from "../../../../utils/hookManager/index.js";

hook.register(
  event.onMiddleware,
  (type) => {
    if (type !== "urlencoded") return;
    console.log("On Middleware by USER:", type);
  },
  10
);

hook.register(
  event.beforeRouteRegister,
  (assetManager) => {
    assetManager.register(
      "css",
      "/src/public/content/themes/base-theme/style.css"
    );
    assetManager.register(
      "js",
      "/src/public/content/themes/base-theme/script.js"
    );
    console.log(assetManager.getAssets());
  },
  10
);

console.log("Base theme loaded");
