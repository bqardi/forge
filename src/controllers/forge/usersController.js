import { getUsers, getUser } from "../../services/user.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function usersController(req, res) {
  const users = await getUsers();

  await hook.action(event.onRouteBackend, "users");

  const notification = req.session.notification || null;
  req.session.notification = null;

  res.render("pages/users", {
    page: "users",
    layoutType: "overview",
    users,
    session: {
      ...req.session,
      notification,
    },
  });
}

export async function userController(req, res) {
  const id = req.params.id;

  let data = {
    id,
  };

  if (id !== "create") {
    const user = await getUser(id);
    data = {
      ...data,
      ...user.dataValues,
    };
  }

  await hook.action(event.onRouteBackend, "user");

  res.render("pages/user", {
    id,
    page: "users",
    layoutType: "single",
    type: "user",
    formID: "form-user",
    settings: {
      active: true,
      title: "User settings",
      partial: "user",
    },
    publisher: {
      title: "Update user",
      draft: "",
      publish: "Update user",
    },
    data,
  });
}
