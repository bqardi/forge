import { config } from "../../utils/global.js";

export function setLocals(req, res, next) {
  res.locals.BASE_URL = config.BASE_URL;
  res.locals.THEMES_URL = config.THEMES_URL;
  res.locals.THEMES_PATH = config.THEMES_PATH;
  res.locals.GET_URL = config.GET_URL;
  next();
}
