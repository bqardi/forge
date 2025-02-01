import Page from "../models/Page.js";
import { generateSlug } from "../utils/stringHandler.js";

export const getPages = async () => {
  try {
    const pages = await Page.findAll();
    return pages;
  } catch (err) {
    console.error("Failed to fetch pages:", err);
    throw err;
  }
};

export const getPage = async (id) => {
  try {
    const page = await Page.findOne({ where: { id } });

    if (!page) {
      throw new Error("Page not found");
    }

    return {
      ...page.dataValues,
    };
  } catch (err) {
    console.error("Failed to fetch page:", err);
    throw err;
  }
};

export const createPage = async (values) => {
  try {
    if (values.id || values.id === "") {
      delete values.id;
    }

    if (!values.title || !values.authorId) {
      throw new Error("Title, and author ID are required");
    }

    const authorId = parseInt(values.authorId, 10);
    if (isNaN(authorId)) {
      throw new Error("Invalid author ID");
    }

    const page = await Page.create({
      slug: values.slug || generateSlug(values.title),
      title: values.title,
      type: values.type || "default",
      template: values.template || null,
      parentId: values.parentId || null,
      authorId: authorId,
    });
    return page;
  } catch (err) {
    console.error("Failed to create page:", err);
    throw err;
  }
};

export const updatePage = async (values) => {
  try {
    const { id, slug, ...rest } = values;

    const updatedSlug = slug || generateSlug(rest.title);

    const affectedRows = await Page.update(
      {
        ...rest,
        slug: updatedSlug,
      },
      { where: { id } }
    );
    return affectedRows;
  } catch (err) {
    console.error("Failed to update page:", err);
    throw err;
  }
};

export const deletePage = async (id) => {
  try {
    const affectedRows = await Page.destroy({ where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to delete page:", err);
    throw err;
  }
};
