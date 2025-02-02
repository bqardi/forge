import { Sequelize } from "sequelize";
import sequelize from "../src/config/database.js";

(async () => {
  try {
    const queryInterface = sequelize.getQueryInterface();

    // await queryInterface.addColumn("Pages", "status", {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    //   defaultValue: "draft",
    // });

    // await queryInterface.addColumn("Pages", "publishedAt", {
    //   type: Sequelize.DATE,
    //   allowNull: true,
    // });

    // await queryInterface.addColumn("Posts", "status", {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    //   defaultValue: "draft",
    // });

    await queryInterface.addColumn("Posts", "publishedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    console.log("Columns added successfully.");
  } catch (error) {
    console.error("Error adding columns:", error.name);
  } finally {
    await sequelize.close();
  }
})();
