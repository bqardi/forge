import express from "express";
import { authenticateToken } from "../../utils/auth.js";
import { getUsers, getUser } from "../../services/user.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
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
});

router.get("/:id", authenticateToken, async (req, res) => {
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
});

export default router;
