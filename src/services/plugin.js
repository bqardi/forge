import Plugins from "../models/Plugin.js";
import { generateSlug } from "../utils/generate-slug.js";

export const getPlugins = async () => {
  try {
    const plugins = await Plugins.findAll();
    return plugins;
  } catch (err) {
    console.error("Failed to fetch plugins:", err);
    throw err;
  }
};

export const getPlugin = async (id) => {
  try {
    const plugin = await Plugins.findOne({ where: { id } });
    return plugin;
  } catch (err) {
    console.error("Failed to fetch plugin:", err);
    throw err;
  }
};

export const createPlugin = async (values) => {
  try {
    if (values.id) {
      delete values.id;
    }
    if (!values.title || !values.authorId) {
      throw new Error("Title, and author ID are required");
    }
    const plugin = await Plugins.create({
      ...values,
      slug: generateSlug(values.title),
    });
    return plugin;
  } catch (err) {
    console.error("Failed to create plugin:", err);
    throw err;
  }
};

export const updatePlugin = async (values) => {
  try {
    const { id } = values;
    const affectedRows = await Plugins.update(values, { where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to update plugin:", err);
    throw err;
  }
};

export const deletePlugin = async (id) => {
  try {
    const affectedRows = await Plugins.destroy({ where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to delete plugin:", err);
    throw err;
  }
};
