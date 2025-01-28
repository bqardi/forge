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
});

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Post, { foreignKey: "authorId", as: "posts" });

export default Post;
