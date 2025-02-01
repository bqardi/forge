import { config } from "../../../../utils/global.js";
import { event, hook } from "../../../../utils/hookManager/index.js";

hook.register(
  event.beforeAssetRegister,
  async (assetManager) => {
    const themeCSSPath = await config.GET_THEME_PATH("style.css");
    const themeJSPath = await config.GET_THEME_PATH("script.css");
    assetManager.register("css", themeCSSPath);
    assetManager.register("js", themeJSPath);
    const registeredAssets = assetManager.getAssets();
    console.log(registeredAssets);
  },
  10
);
