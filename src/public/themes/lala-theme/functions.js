import { assetManager } from "../../../utils/assetManager/assetManager.js";
import { config } from "../../../utils/global.js";
import { event, hook } from "../../../utils/hookManager/index.js";

hook.register(
  event.beforeAssetRegister,
  async () => {
    const themeCSSPath = await config.GET_THEME_PATH("style.css");
    const themeJSPath = await config.GET_THEME_PATH("script.js");
    assetManager.register({
      url: "/style.css",
      filePath: themeCSSPath,
    });
    assetManager.register({
      url: "/script.js",
      filePath: themeJSPath,
    });
  },
  10
);

hook.register(
  event.onRouteFrontend,
  async (event, page) => {
    console.log({ event, page, message: "On Route Frontend by USER" });
  },
  10
);
