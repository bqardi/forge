export function beforeMiddleware() {
  console.log("Before Middleware");
}

export function onMiddleware(type) {
  console.log("On Middleware:", type);
}

export function afterMiddleware() {
  console.log("After Middleware");
}
