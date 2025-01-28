import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Plugins = sequelize.define("Plugins", {
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Plugins;
