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
  const reqID = req.params.id;

  let data = {
    reqID,
  };

  if (reqID !== "create") {
    const user = await getUser(reqID);
    data = {
      ...data,
      ...user.dataValues,
    };
  }

  await hook.action(event.onRouteBackend, "user");

  res.render("pages/user", {
    id: reqID,
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
      publish: reqID === "create" ? "Create user" : "Update user",
    },
    data,
  });
}
