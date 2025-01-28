import Post from "../models/Post.js";
import { generateSlug } from "../utils/stringHandler.js";

export const getPosts = async () => {
  try {
    const posts = await Post.findAll();
    return posts;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err;
  }
};

export const getPost = async (id) => {
  try {
    const post = await Post.findOne({ where: { id } });
    return post;
  } catch (err) {
    console.error("Failed to fetch post:", err);
    throw err;
  }
};

export const createPost = async (values) => {
  try {
    if (values.id) {
      delete values.id;
    }
    if (!values.title || !values.authorId) {
      throw new Error("Title, and author ID are required");
    }
    const post = await Post.create({
      ...values,
      slug: generateSlug(values.title),
    });
    return post;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};

export const updatePost = async (values) => {
  try {
    const { id } = values;
    const affectedRows = await Post.update(values, { where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to update post:", err);
    throw err;
  }
};

export const deletePost = async (id) => {
  try {
    const affectedRows = await Post.destroy({ where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to delete post:", err);
    throw err;
  }
};
