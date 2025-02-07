import "./utils/global.js";
import sequelize from "./config/database.js";
import { initializeApp } from "./app.js";
import { event, hook } from "./utils/hookManager/index.js";
import { getCurrentThemeName, initializeTheme } from "./utils/themeHandler.js";

(async function () {
  await hook.action(event.beforeSystemInit);

  try {
    await sequelize.sync();
    await hook.action(event.onSystemInit, "database");

    const activeTheme = await getCurrentThemeName();
    if (activeTheme) await initializeTheme(activeTheme);

    const app = await initializeApp();

    const PORT = process.env.PORT || 10000;

    app.listen(PORT, async () => {
      await hook.action(event.onSystemInit, "server");
      if (process.env.NODE_ENV === "development") {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Open in browser at http://localhost:3000 (proxied)`);
      } else {
        console.log(`Server is running on port ${PORT}`);
      }
    });

    await hook.action(event.afterSystemInit);
  } catch (err) {
    console.error("Failed to sync database", err);
  }
})();
