import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "database.sqlite"),
  logging:
    process.env.NODE_ENV !== "development" &&
    process.env.LOG_SEQUELIZE === "true",
});

export default sequelize;
