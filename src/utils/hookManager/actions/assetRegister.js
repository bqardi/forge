export function beforeAssetRegister() {
  console.log("Before AssetRegister");
}

export function onAssetRegister(type) {
  console.log("On AssetRegister:", type);
}

export function afterAssetRegister() {
  console.log("After AssetRegister");
}
