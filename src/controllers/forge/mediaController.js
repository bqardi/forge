import { event, hook } from "../../utils/hookManager/index.js";

export function mediaController(req, res) {
  hook.action(event.onRouteBackend, "media");

  res.render("pages/media", {
    page: "media",
    layoutType: "media",
  });
}
