import express from "express";
import { authenticateToken } from "../../utils/auth.js";
import { getPost, getPosts } from "../../services/post.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const allPosts = await getPosts();
  const user = req.user;
  const posts = allPosts.map((post) => post.dataValues);
  res.render("pages/posts", {
    page: "posts",
    layoutType: "overview",
    data: {
      user,
      posts,
    },
  });
});

router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  let data = {
    id,
    user: req.user,
  };

  if (id !== "create") {
    const post = await getPost(id);
    data = {
      ...data,
      ...post.dataValues,
    };
  }

  res.render("pages/post", {
    id,
    page: "posts",
    layoutType: "single",
    type: "post",
    data,
  });
});

export default router;
