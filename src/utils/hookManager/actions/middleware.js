export function beforeMiddleware() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("Before Middleware");
}

export function onMiddleware(type) {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("On Middleware:", type);
}

export function afterMiddleware() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("After Middleware");
}
