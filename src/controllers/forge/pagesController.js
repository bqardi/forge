import { getPage, getPages } from "../../services/page.js";
import { formatDate } from "../../utils/date.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function pagesController(req, res) {
  const allPages = await getPages();
  const user = req.user;
  const pages = allPages.map((page) => page.dataValues);

  await hook.action(event.onRouteBackend, "pages");

  res.render("pages/pages", {
    page: "pages",
    layoutType: "overview",
    data: {
      user,
      pages,
    },
  });
}

export async function pageController(req, res) {
  const reqID = req.params.id;

  // TODO: Fetch page types from database
  const types = [
    { key: "default", value: "Default" },
    { key: "frontpage", value: "Frontpage" },
  ];

  let data = {
    reqID,
    user: req.user,
    types,
  };

  if (reqID !== "create") {
    const page = await getPage(reqID);
    data = {
      ...data,
      ...page,
      status: ["Published", "Draft"][0], // TODO: Implement page status (Published/Draft/(other?))
      publishedAt: formatDate(page.createdAt, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }),
    };
  }

  await hook.action(event.onRouteBackend, "childpages");

  res.render("pages/page", {
    id: reqID,
    page: "pages",
    layoutType: "single",
    type: "page",
    formID: "form-page",
    settings: {
      active: true,
      title: "Page settings",
      partial: "page",
    },
    data,
  });
}
