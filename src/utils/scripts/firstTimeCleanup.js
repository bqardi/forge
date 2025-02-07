import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function firstTimeCleanup() {
  const srcPath = path.join(__dirname, "../../");

  // Remove controllers, forge, middleware, and routes
  const remove = [
    path.join(srcPath, "controllers/firstTimeSetupController.js"),
    path.join(srcPath, "forge/src/js/components/firstTimeSetup.js"),
    path.join(srcPath, "forge/views/first-time-setup.ejs"),
    path.join(srcPath, "middlewares/firstTimeSetup.js"),
    path.join(srcPath, "routes/firstTimeSetup.js"),
  ];

  remove.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });

  const appPath = path.join(srcPath, "app.js");
  const app = fs.readFileSync(appPath, "utf8");
  const appCleaned = app.replace(
    /\/\/ FIRST_TIME_SETUP_DELETE_WHEN_DONE__FROM[\s\S]*?\/\/ FIRST_TIME_SETUP_DELETE_WHEN_DONE__TO/g,
    ""
  );
  fs.writeFileSync(appPath, appCleaned);

  const appFrontendPath = path.join(srcPath, "forge/src/js/app.js");
  const appFrontend = fs.readFileSync(appFrontendPath, "utf8");
  const appFrontendCleaned = appFrontend.replace(
    /\/\/ FIRST_TIME_SETUP_DELETE_WHEN_DONE__FROM[\s\S]*?\/\/ FIRST_TIME_SETUP_DELETE_WHEN_DONE__TO/g,
    ""
  );
  fs.writeFileSync(appFrontendPath, appFrontendCleaned);
}
