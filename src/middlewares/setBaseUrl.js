import { setGlobals } from "../utils/global.js";

export function setBaseUrl(req, res, next) {
  const protocol = req.protocol;
  const host = req.get("host");
  const domain = `${protocol}://${host}`;
  const config = setGlobals(domain);
  req.config = config;
  next();
}
