import path from "path";

class AssetManager {
  #assets;

  constructor() {
    this.#assets = [];
  }

  get assets() {
    return this.#assets;
  }

  register(asset) {
    this.#assets.push(asset);
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
