import { event, hook } from "../../utils/hookManager/index.js";
import { getUploadedMedia } from "../../utils/uploads.js";

export async function mediaController(req, res) {
  await hook.action(event.onRouteBackend, "media");

  const fileList = getUploadedMedia();

  res.render("pages/media", {
    page: "media",
    layoutType: "media",
    formID: "form-media",
    data: {
      title: "Media",
      fileList,
    },
    component: {
      title: "File edit",
      partial: "media",
      props: {},
    },
  });
}
