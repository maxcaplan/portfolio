// Node standard libs
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Server libs
import express from "express";
import { createServer as createViteServer } from "vite";
import sirv from "sirv";

// Console formatting libs
import chalk from "chalk";
import boxen from "boxen";

// Other libs
import { program } from "commander";

// CLI Arguments
program.option("-p, --port <value>");
program.option("-h, --host <value>");
program.parse();
const options = program.opts();

// Constants
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = parseInt(options.port) || 5173;
const host = options.host || "localhost";

/**
 * formats a log message for a server request
 * @param req - The server request object
 */
function logRequest(req) {
  const protocol = chalk.bgBlueBright
    .hex("#FFF")
    .bold(` ${req.protocol.toUpperCase()} `);
  const date_string = new Date().toLocaleString().replace(",", "");
  const client_ip = chalk.yellow(req.ip.replace("::ffff:", ""));
  const request = chalk.cyan(`${req.method} ${req.originalUrl}`);
  return `${protocol} ${date_string} ${client_ip} ${request}`;
}

/**
 * Gets the IP address(s) of the server
 */
function getIps() {
  let net_faces = os.networkInterfaces();

  let ips = [];

  // Iterate over network interfaces
  Object.values(net_faces).forEach((net_face) => {
    if (net_face === undefined) return;

    // Iterate over network interface info
    net_face.forEach((net_face_info) => {
      // Skip over internal and non-IPv4 addresses
      if (net_face_info.family !== "IPv4" || net_face_info.internal) return;

      ips.push(net_face_info.address);
    });
  });

  return ips;
}

/** Creates an http server for serving an SSR app */
async function createServer() {
  const app = express();

  let vite;

  if (!isProduction) {
    // Use vite dev server if in development environment
    console.log(chalk.blue("Starting server in development mode..."));

    // Create Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Disables vites HTML serving logic
    });

    app.use(vite.middlewares);
  } else {
    // Use sirv for static asset serving if in production environment
    console.log(chalk.blue("Starting server in production mode..."));

    app.use(sirv("dist/client", { gzip: true }));
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (!isProduction) console.log(logRequest(req));

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
      const appHtml = await render(req);

      // Inject rendered app html into index.html template
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      // Send rendered html to client
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html").end(html);
    } catch (e) {
      if (!isProduction) vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e);
    }
  });

  return app;
}

// Create server and start listening for http requests
createServer().then((app) => {
  app.listen(port, host);

  const server_host = host === "0.0.0.0" ? getIps()[0] : host;

  let start_message = `${chalk.bold("- Local:")} http://localhost:${port}`;
  if (host === "0.0.0.0")
    start_message += `\n${chalk.bold("- Network:")} http://${server_host}:${port}`;

  console.log("");
  console.log(
    boxen(start_message, {
      margin: 1,
      padding: 1,
      borderColor: "green",
      title: "Server Started",
      titleAlignment: "center",
    }),
  );
});
