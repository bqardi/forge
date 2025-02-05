import path from "path";
import { config } from "../global.js";

class AssetManager {
  #assets;

  constructor() {
    this.#assets = [];
  }

  get assets() {
    return this.#assets;
  }

  async register(asset) {
    const themePath = await config.GET_THEME_PATH(...asset.filePath.split("/"));
    this.#assets.push({
      url: asset.url,
      filePath: themePath,
    });
  }

  generateRoutes(app) {
    this.#assets.forEach((asset) => {
      app.get(asset.url, (req, res) => {
        res.sendFile(path.resolve(asset.filePath));
      });
    });
  }
}

export const assetManager = new AssetManager();
