export function beforeAssetRegister() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("Before AssetRegister");
}

export function onAssetRegister(type) {
  process.env.LOG_HOOK_EVENTS === "true" &&
    console.log("On AssetRegister:", type);
}

export function afterAssetRegister() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("After AssetRegister");
}
