import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Page = sequelize.define("Page", {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "default",
  },
  template: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Pages",
      key: "id",
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "draft",
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Page.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Page, { foreignKey: "authorId", as: "pages" });

export default Page;
