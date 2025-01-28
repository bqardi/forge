export function beforeRouteBackend() {
  console.log("Before RouteBackend");
}

export function onRouteBackend(type) {
  console.log("On RouteBackend:", type);
}

export function afterRouteBackend() {
  console.log("After RouteBackend");
}
export function beforeRouteFrontend() {
  console.log("Before RouteFrontend");
}

export function onRouteFrontend(type) {
  console.log("On RouteFrontend:", type);
}

export function afterRouteFrontend() {
  console.log("After RouteFrontend");
}
