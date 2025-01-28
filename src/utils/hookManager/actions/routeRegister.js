export function beforeRouteBackend() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("Before RouteBackend");
}

export function onRouteBackend(type) {
  process.env.LOG_HOOK_EVENTS === "true" &&
    console.log("On RouteBackend:", type);
}

export function afterRouteBackend() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("After RouteBackend");
}
export function beforeRouteFrontend() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("Before RouteFrontend");
}

export function onRouteFrontend(type) {
  process.env.LOG_HOOK_EVENTS === "true" &&
    console.log("On RouteFrontend:", type);
}

export function afterRouteFrontend() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("After RouteFrontend");
}
