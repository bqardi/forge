import { getPage, getPages } from "../../services/page.js";

export async function pagesController(req, res) {
  const allPages = await getPages();
  const user = req.user;
  const pages = allPages.map((page) => page.dataValues);
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
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  if (id !== "create") {
    const page = await getPage(id);
    data = {
      ...data,
      ...page,
    };
  }

  res.render("pages/page", {
    id,
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
