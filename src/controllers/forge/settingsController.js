export function settingsController(req, res) {
  res.render("pages/settings", {
    page: "settings",
    layoutType: "settings",
    data: {},
  });
}

export function generalController(req, res) {
  res.render("pages/settings/general", {
    page: "general",
    parent: {
      title: "Settings",
      page: "settings",
      link: "/forge/settings",
    },
    layoutType: "grid",
    data: {},
  });
}
