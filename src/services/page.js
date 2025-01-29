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
      // TODO: Fetch page types from database
      types: [
        { key: "default", value: "Default" },
        { key: "frontpage", value: "Frontpage" },
      ],
    };
  } catch (err) {
    console.error("Failed to fetch page:", err);
    throw err;
  }
};

export const createPage = async (values) => {
  try {
    if (values.id) {
      delete values.id;
    }
    if (!values.title || !values.authorId) {
      throw new Error("Title, and author ID are required");
    }
    const page = await Page.create({
      ...values,
      slug: generateSlug(values.title),
    });
    return page;
  } catch (err) {
    console.error("Failed to create page:", err);
    throw err;
  }
};

export const updatePage = async (values) => {
  try {
    const { id } = values;
    const affectedRows = await Page.update(values, { where: { id } });
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
