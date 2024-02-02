import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createServer as createViteServer } from "vite";
import sirv from "sirv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;

/** Creates an http server for serving an SSR app */
async function createServer() {
  const app = express();

  let vite;

  if (!isProduction) {
    // Use vite dev server if in development environment
    console.log("Starting server in development mode");

    // Create Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Disables vites HTML serving logic
    });

    app.use(vite.middlewares);
  } else {
    // Use sirv for static asset serving if in production environment
    console.log("Starting server in production mode");
    app.use(sirv("dist/client", { gzip: true }));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (!isProduction) {
        // Read index.html
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf8",
        );

        // Apply vite HTML transforms
        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8",
        );

        render = (await import("./dist/server/entry-server.js")).render;
      }

      // Render app html
      const appHtml = await render({ path: url });

      // Inject rendered app html into index.html template
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      // Send rendered html to client
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html").end(html);
    } catch (e) {
      if (!isProduction) vite.ssrFixStacktrace(e);
      console.log(e);
      res.status(500).end(e);
    }
  });

  return app;
}

// Create server and start listening for http requests
createServer().then((app) => app.listen(port));
