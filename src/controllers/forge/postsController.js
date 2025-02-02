import { getPost, getPosts } from "../../services/post.js";
import { event, hook } from "../../utils/hookManager/index.js";
import { firstCharacterToUppercase } from "../../utils/stringHandler.js";

export async function postsController(req, res) {
  const allPosts = await getPosts();
  const user = req.user;
  const posts = allPosts.map((post) => post.dataValues);

  await hook.action(event.onRouteBackend, "posts");

  const notification = req.session.notification || null;
  req.session.notification = null;

  res.render("pages/posts", {
    page: "posts",
    layoutType: "overview",
    data: {
      user,
      posts,
    },
    session: {
      ...req.session,
      notification,
    },
  });
}

export async function postController(req, res) {
  const reqID = req.params.id;

  let data = {
    reqID,
    user: req.user,
  };

  if (reqID !== "create") {
    const post = await getPost(reqID);
    data = {
      ...data,
      ...post.dataValues,
      statusPropercase: firstCharacterToUppercase(post.status),
    };
  }

  await hook.action(event.onRouteBackend, "childposts");

  res.render("pages/post", {
    id: reqID,
    page: "posts",
    layoutType: "single",
    type: "post",
    formID: "form-post",
    settings: {
      active: true,
      title: "Post settings",
      partial: "post",
    },
    publisher: {
      title: "Update post",
      draft: "Draft",
      publish:
        reqID === "create" || data.status === "draft" ? "Publish" : "Update",
    },
    data,
  });
}
