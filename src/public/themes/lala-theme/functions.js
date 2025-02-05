import { assetManager } from "../../../utils/assetManager/assetManager.js";
import { event, hook } from "../../../utils/hookManager/index.js";

hook.register(
  event.beforeAssetRegister,
  async () => {
    await assetManager.register({
      url: "/style.css",
      filePath: "assets/style.css",
    });
    await assetManager.register({
      url: "/script.js",
      filePath: "assets/script.js",
    });
  },
  10
);

hook.register(
  event.onRouteFrontend,
  async (event, page) => {
    if (page)
      console.log({ event, page, message: "On Route Frontend by USER" });
  },
  10
);
