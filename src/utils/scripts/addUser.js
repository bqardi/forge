import bcrypt from "bcrypt";
import sequelize from "../../config/database.js";
import User from "../../models/User.js";

export async function addUser(newUser) {
  try {
    await sequelize.sync();

    if (await User.findOne({ where: { username: newUser.username } })) {
      console.log("User already exists");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = await User.create({
      ...newUser,
      password: hashedPassword,
    });
    console.log("User created:", user.toJSON());

    process.exit(0);
  } catch (err) {
    console.error("Failed to add user:", err);
    process.exit(1);
  }
}
