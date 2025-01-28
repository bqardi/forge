export function beforeSystemInit() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("Before System Init");
}

export function onSystemInit(type) {
  process.env.LOG_HOOK_EVENTS === "true" &&
    console.log("On System Init:", type);
}

export function afterSystemInit() {
  process.env.LOG_HOOK_EVENTS === "true" && console.log("After System Init");
}
