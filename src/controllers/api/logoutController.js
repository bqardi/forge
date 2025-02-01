import { event, hook } from "../../utils/hookManager/index.js";

export function logoutController(req, res) {
  hook.action(event.onRouteBackend, "logout");
  res
    .status(200)
    .clearCookie("auth_token")
    .json({ message: "Logged out successfully" });
}
