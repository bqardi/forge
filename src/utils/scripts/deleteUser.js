import sequelize from "../../config/database.js";
import User from "../../models/User.js";

(async () => {
  try {
    await sequelize.sync();

    const username = "admin";

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    await user.destroy();
    console.log("User deleted:", user.toJSON());

    process.exit(0);
  } catch (err) {
    console.error("Failed to delete user:", err);
    process.exit(1);
  }
})();
