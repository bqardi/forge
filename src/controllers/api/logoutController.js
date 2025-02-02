import { event, hook } from "../../utils/hookManager/index.js";

export async function logoutController(req, res) {
  await hook.action(event.onRouteBackend, "logout");
  res
    .status(200)
    .clearCookie("auth_token")
    .json({ message: "Logged out successfully" });
}
