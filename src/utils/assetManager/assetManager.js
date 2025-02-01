class AssetManager {
  constructor() {
    this.assets = { css: [], js: [] }; // Store assets
  }

  // Register a CSS or JS file
  register(type, url) {
    if (!["css", "js"].includes(type)) {
      throw new Error('Invalid asset type. Use "css" or "js".');
    }
    this.assets[type].push(url);
  }

  // Get all assets (can be filtered by route)
  getAssets(route) {
    // Optionally filter assets based on route or other logic
    return this.assets;
  }
}

export const assetManager = new AssetManager();
