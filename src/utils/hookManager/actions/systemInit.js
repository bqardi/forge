export function beforeSystemInit() {
  console.log("Before System Init");
}

export function onSystemInit(type) {
  console.log("On System Init:", type);
}

export function afterSystemInit() {
  console.log("After System Init");
}
