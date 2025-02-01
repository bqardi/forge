import { getUsers, getUser } from "../../services/user.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function usersController(req, res) {
  try {
    const users = await getUsers();

    hook.action(event.onRouteBackend, "users");

    res.render("pages/users", {
      page: "users",
      layoutType: "overview",
      users,
    });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
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

  hook.action(event.onRouteBackend, "user");

  res.render("pages/user", {
    id,
    page: "users",
    layoutType: "single",
    type: "user",
    data,
  });
}
