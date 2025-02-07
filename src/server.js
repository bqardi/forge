import "./utils/global.js";
import sequelize from "./config/database.js";
import { initializeApp } from "./app.js";
import { event, hook } from "./utils/hookManager/index.js";
import { databaseExists } from "./utils/scripts/firstTimeSetup.js";
import { addUser } from "./utils/scripts/addUser.js";
import { getCurrentThemeName, initializeTheme } from "./utils/themeHandler.js";

(async function () {
  const dbExists = databaseExists();

  await hook.action(event.beforeSystemInit);

  try {
    await sequelize.sync();
    await hook.action(event.onSystemInit, "database");

    // TODO: Replace this with a more user friendly setup process
    if (!dbExists) {
      console.log("\nFirst time setup detected!\n");
      await addUser({
        username: "ss",
        password: "asdf",
        email: "test@test.com",
      });
    }

    const activeTheme = await getCurrentThemeName();
    if (activeTheme) await initializeTheme(activeTheme);

    const app = await initializeApp();

    const PORT = process.env.SERVER_PORT || 3210;

    app.listen(PORT, async () => {
      await hook.action(event.onSystemInit, "server");
      if (process.env.NODE_ENV === "development") {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Open in browser at http://localhost:3000 (proxied)`);
      } else {
        console.log(`Server is running on http://localhost:${PORT}`);
      }
    });

    await hook.action(event.afterSystemInit);
  } catch (err) {
    console.error("Failed to sync database", err);
  }
})();
