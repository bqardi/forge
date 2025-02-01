import { event, hook } from "../../utils/hookManager/index.js";

export async function mediaController(req, res) {
  await hook.action(event.onRouteBackend, "media");

  res.render("pages/media", {
    page: "media",
    layoutType: "media",
  });
}
