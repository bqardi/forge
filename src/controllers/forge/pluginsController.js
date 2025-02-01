import { getPlugin, getPlugins } from "../../services/plugin.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function pluginsController(req, res) {
  const allPlugins = await getPlugins();
  const user = req.user;
  const plugins = allPlugins.map((page) => page.dataValues);

  hook.action(event.onRouteBackend, "plugins");

  res.render("pages/plugins", {
    page: "plugins",
    layoutType: "overview",
    data: {
      user,
      plugins,
    },
  });
}

export function pluginController(req, res) {
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  hook.action(event.onRouteBackend, "plugin-browse");

  res.render("pages/plugin-browse", {
    id,
    page: "plugins",
    layoutType: "overview",
    type: "browse",
    data,
  });
}
