import { config } from "../utils/global.js";

export function setLocals(req, res, next) {
  res.locals.config = config;
  next();
}
