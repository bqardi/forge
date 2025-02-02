import { getPlugins } from "../../services/plugin.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function pluginsController(req, res) {
  const allPlugins = await getPlugins();
  const user = req.user;
  const plugins = allPlugins.map((page) => page.dataValues);

  await hook.action(event.onRouteBackend, "plugins");

  res.render("pages/plugins", {
    page: "plugins",
    layoutType: "overview",
    data: {
      user,
      plugins,
    },
  });
}

export async function browseController(req, res) {
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  await hook.action(event.onRouteBackend, "browse-plugins");

  res.render("pages/plugins/browse", {
    page: "browse",
    parent: {
      title: "Plugins",
      page: "plugins",
      link: "/forge/plugins",
    },
    layoutType: "grid",
    data,
  });
}

export async function installedController(req, res) {
  const id = req.params.id;

  const allPlugins = await getPlugins();
  const user = req.user;
  const plugins = allPlugins.map((page) => page.dataValues);

  let data = {
    id,
    user,
    plugins,
  };

  await hook.action(event.onRouteBackend, "installed-plugins");

  res.render("pages/plugins/installed", {
    page: "installed",
    parent: {
      title: "Plugins",
      page: "plugins",
      link: "/forge/plugins",
    },
    layoutType: "overview",
    data,
  });
}

export async function uploadController(req, res) {
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  await hook.action(event.onRouteBackend, "upload-plugins");

  res.render("pages/plugins/upload", {
    page: "upload",
    parent: {
      title: "Plugins",
      page: "plugins",
      link: "/forge/plugins",
    },
    layoutType: "overview",
    data,
  });
}
