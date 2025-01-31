import { getUsers, getUser } from "../../services/user.js";

export async function usersController(req, res) {
  try {
    const users = await getUsers();
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

  res.render("pages/user", {
    id,
    page: "users",
    layoutType: "single",
    type: "user",
    data,
  });
}
