import "./utils/global.js";
import app from "./app.js";
import sequelize from "./config/database.js";
import { event, hook } from "./utils/hookManager/index.js";
import { databaseExists } from "./utils/scripts/firstTimeSetup.js";
import { addUser } from "./utils/scripts/addUser.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3210;
const isProduction = process.env.NODE_ENV === "production";

(async function () {
  const dbExists = databaseExists();

  hook.action(event.beforeSystemInit);

  try {
    await sequelize.sync();
    hook.action(event.onSystemInit, "database");

    // TODO: Replace this with a more user friendly setup process
    if (!dbExists) {
      console.log("\nFirst time setup detected!\n");
      await addUser({
        username: "ss",
        password: "asdf",
        email: "test@test.com",
      });
    }

    app.listen(PORT, () => {
      console.log(`\nServer is running on localhost:${PORT}`);
      console.log("Open in browser at http://localhost:3000 (proxied)");
      console.log(
        `Environment: ${isProduction ? "production" : "development"}\n`
      );
      hook.action(event.onSystemInit, "server");
    });

    hook.action(event.afterSystemInit);
  } catch (err) {
    console.error("Failed to sync database", err);
  }
})();
