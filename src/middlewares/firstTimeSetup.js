import { getUsers } from "../services/user.js";

export async function firstTimeSetup(req, res, next) {
  const users = await getUsers();
  const hasUsers = users.length > 0;
  if (!hasUsers) {
    if (
      req.url !== "/first-time-setup" &&
      req.url !== "/forge/assets/css/style.css" &&
      req.url !== "/forge/assets/js/app.js"
    ) {
      return res.redirect("/first-time-setup");
    }
  }
  next();
}
