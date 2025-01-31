export function mediaController(req, res) {
  res.render("pages/media", {
    page: "media",
    layoutType: "media",
  });
}
