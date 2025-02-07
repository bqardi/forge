# Forge

Forge – A Modern CMS for Node.js

Forge is a lightweight, modular CMS built with Express.js and EJS, offering a WordPress-like structure for theme-based public views and an admin dashboard for content management.

Key features: File-based themes, authentication for admin access, and JSON Web Token (JWT) security.

## Resources

- [Forge on GitHub](https://github.com/bqardi/forge)
- [Forge Project on GitHub](https://github.com/users/bqardi/projects/5)

## Table of Contents

- [Features](#features)
- [Installation / First-Time Setup](#installation--first-time-setup)
- [Usage / Daily Use](#usage--daily-use)
- [Configuration & Customization](#configuration--customization)
  - [Custom routes and controllers](#custom-routes-and-controllers)
    - [Forge Routes (Admin panel routes)](#forge-routes-admin-panel-routes)
    - [Public Routes (Frontend routes)](#public-routes-frontend-routes)
  - [Middleware setup](#middleware-setup)
    - [Create a new middleware function](#create-a-new-middleware-function)
  - [API endpoints overview](#api-endpoints-overview)

## Features

- **File-based themes**: Themes are stored in the `themes` directory and is configured with the `theme.config.json` file.

- **Forge dashboard**: The forge dashboard is accessible at `/forge` and requires authentication to access.

## Installation / First-Time Setup

1. Clone the repository:

```bash
git clone git@github.com:bqardi/forge.git .
```

2. Install dependencies:

```bash
npm install
```

3. Install Forge dependencies:

```bash
cd src/forge
npm install
```

4. Create a `.env.local` file in the root directory:

Easiest is to copy the `.env` file and rename it to `.env.local`.
Replace the values with your own (especially "dummy" values. Read the comment above for the "how to").

## Usage / Daily Use

1. Start the server (and everything else):

```bash
npm run dev
```

## Configuration & Customization

### Custom routes and controllers

The `src/routes` folder contains all the route definitions for the application. You can add custom routes and controllers by creating new files in this folder.

#### Forge Routes (Admin panel routes)

These routes are defined in the `src/routes/forge` folder. Each file represents a different page, such as `appearance.js`, `plugins.js`, `posts.js`, `users.js`, and `settings.js`.

To add a new route for a page, create a new file in `src/routes/forge` and define your route in `src\app.js`. For example:

```javascript
// filepath: src/routes/forge/newRoute.js
import express from "express";
import { authenticateToken } from "../../utils/auth.js"; // (relative path to the auth.js file)

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.render("pages/new-route", {
    page: "new-route", // used for the active state in the menu (see: src\forge\views\partials\menu.ejs)
    layoutType: "overview", // determines the layout for the content (see: src\forge\views\partials\content.ejs)
    data: {
      something: "Any js data can be passed to the rendered view",
    },
  });
});

router.get("/a-child-path", authenticateToken, (req, res) => {
  res.render("pages/appearance/themes", {
    page: "a-child-path",
    parent: {
      title: "New Route",
      page: "new-route",
      link: "/forge/new-route",
    },
    layoutType: "grid",
    data: {
      something: "Any js data can be passed to the rendered view",
    },
  });
});

export default router;
```

```javascript
// filepath: src/app.js
import newRoute from "./routes/forge/newRoute.js";

// Routes
await hook.action(event.beforeRouteBackend);
...
app.use("/forge/new-route", newRoute);
await hook.action(event.afterRouteBackend);
```

#### Public Routes (Frontend routes)

These routes are defined in the `src/routes/frontend` folder. The `pages.js` file is designed to route to the theme folder of the currently active theme.

### Middleware setup.

The src/middleware folder contains middleware functions that are used to process requests before they reach the route handlers. Middleware functions can perform various tasks such as logging, authentication, and setting local variables.

filemap.js: Maps .html file extensions to "" for routing purposes (allows `/about` and `/about.html` to point at the same route).
setLocals.js: Sets local variables that are available in all EJS templates (eg. `config.GET_URL('about')` or `config.THEMES_PATH`...).

#### Create a new middleware function.

To create a middleware function, create it as a new file in `src/middleware` and export it as a function that takes `req`, `res`, and `next` as arguments. For example:

```javascript
// filepath: src/middleware/doStuff.js
export default function doStuff(req, res, next) {
  // Do something
  next();
}
```

```javascript
// filepath: src/app.js
import express from "express";
import doStuff from "./middleware/doStuff.js";

const app = express();

// Middlewares
...
app.use(doStuff);
```

### API endpoints overview.

API endpoints overview
The src/routes/api folder contains the API endpoints for the application. These endpoints provide data and functionality to the frontend.

appearance.js: Handles API requests related to appearance settings, such as themes.
plugins.js: Manages API requests for plugins.
posts.js: Provides API endpoints for managing posts.
users.js: Handles API requests related to user management.
settings.js: Manages API requests for application settings.
Each API endpoint is defined using Express.js and follows RESTful principles. For example, the posts.js file might contain endpoints for Creating, Reading, Updating, and Deleting posts (CRUD operations):

```javascript
// filepath: src/routes/api/posts.js
import express from "express";
const router = express.Router();

router.get("/posts", (req, res) => {
  // Get all posts
});

router.post("/posts", (req, res) => {
  // Create a new post
});

router.put("/posts/:id", (req, res) => {
  // Update a post
});

router.delete("/posts/:id", (req, res) => {
  // Delete a post
});

export default router;
```

By organizing your routes, middleware, and API endpoints in this way, you can maintain a clean and modular structure for your application.

## Good to know

### Create new subpage

In this example we will create a new subpage under the "Appearance" page in the Forge dashboard.

1. Create a new file in `src/forge/views/pages/appearance` called `newSubpage.ejs`.
2. Add the content for the new subpage in the `newSubpage.ejs` file.
3. Create a new controller in `src/controllers/forge/appearanceController.js`:

```javascript
// filepath: src/controllers/forge/appearanceController.js
export const newSubpageController = (req, res) => {
  res.render("pages/appearance/newSubpage", {
    page: "newSubpage",
    parent: {
      title: "Appearance",
      page: "appearance",
      link: "/forge/appearance",
    },
    layoutType: "grid",
    data: {
      something: "Any js data can be passed to the rendered view",
    },
  });
};
```

4. Create a new route in `src/routes/forge.js`:

```javascript
// filepath: src/routes/forge.js
import {
  appearanceController,
  themesController,
  newSubpageController,
} from "../controllers/forge/appearanceController.js";

router.get("/appearance/new-sub-page", authenticateToken, newSubpageController);
```

5. Add a link to the new subpage in the `src/forge/views/partials/menu.ejs` file:

```ejs
<!-- filepath: src/forge/views/partials/menu.ejs -->

<%
const childPages = [
  { href: "/forge/appearance/themes", label: "Themes", icon: "themes", page: "themes", parent: "appearance" },
  { href: "/forge/appearance/new-sub-page", label: "New Sub Page", icon: "some-icon", page: "new-sub-page", parent: "appearance" },
  ...
]
%>
```

6. Navigate to the new subpage in the Forge dashboard to see it :-).
