import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Post, { foreignKey: "authorId", as: "posts" });

export default Post;
