import { getPost, getPosts } from "../../services/post.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function postsController(req, res) {
  const allPosts = await getPosts();
  const user = req.user;
  const posts = allPosts.map((post) => post.dataValues);

  await hook.action(event.onRouteBackend, "posts");

  res.render("pages/posts", {
    page: "posts",
    layoutType: "overview",
    data: {
      user,
      posts,
    },
  });
}

export async function postController(req, res) {
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

  await hook.action(event.onRouteBackend, "childposts");

  res.render("pages/post", {
    id,
    page: "posts",
    layoutType: "single",
    type: "post",
    data,
  });
}
