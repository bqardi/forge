import bcrypt from "bcrypt";
import User from "../models/User.js";

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error("Failed to fetch users:", err);
    throw err;
  }
};

export const getUser = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
};

export const createUser = async (values) => {
  try {
    const user = await User.create(values);
    return user;
  } catch (err) {
    console.error("Failed to create user:", err);
    throw err;
  }
};

export const updateUser = async (values) => {
  const { id, password } = values;

  console.log(id, password);

  if (!id) {
    throw new Error("User ID is required");
  }

  if (!password) -1;

  const newPassword = await bcrypt.hash(password, 10);

  try {
    const [affectedRows] = await User.update(
      { password: newPassword },
      {
        where: { id },
      }
    );

    if (affectedRows === 0) {
      throw new Error("User not found");
    }

    return affectedRows;
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const affectedRows = await User.destroy({ where: { id } });
    return affectedRows;
  } catch (err) {
    console.error("Failed to delete user:", err);
    throw err;
  }
};
