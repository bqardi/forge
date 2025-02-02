import { getPage, getPages } from "../../services/page.js";
import { event, hook } from "../../utils/hookManager/index.js";
import { firstCharacterToUppercase } from "../../utils/stringHandler.js";

export async function pagesController(req, res) {
  const allPages = await getPages();
  const user = req.user;
  const pages = allPages.map((page) => page.dataValues);

  await hook.action(event.onRouteBackend, "pages");

  const notification = req.session.notification || null;
  req.session.notification = null;

  res.render("pages/pages", {
    page: "pages",
    layoutType: "overview",
    data: {
      user,
      pages,
    },
    session: {
      ...req.session,
      notification,
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
      statusPropercase: firstCharacterToUppercase(page.status),
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
    publisher: {
      title: "Update page",
      draft: "Draft",
      publish:
        reqID === "create" || data.status === "draft" ? "Publish" : "Update",
    },
    data,
    session: req.session,
  });
}
