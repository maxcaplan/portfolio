import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);
const pages_dir = "src/pages";

const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const render = (await import("./dist/server/entry-server.js")).render;

const get_page_paths = (pages_dir) => {
  /**
   * Returns true if directory name is the following format: [name]
   * @param dir - The directory to check
   */
  const is_param_dir = (dir) => {
    if (dir.length === 0) return false;
    return dir.charAt(0) === "[" && dir.charAt(dir.length - 1) === "]";
  };

  /**
   * Returns an array of all the parameters in a path
   * @param path - The path to infer the parameters from
   */
  const get_params_from_path = (dir_path) => {
    return dir_path
      .split("/")
      .filter((dir) => is_param_dir(dir))
      .map((dir) => dir.slice(1, dir.length - 1));
  };

  // Get all directory paths in pages_dir
  const dirs = fs
    .readdirSync(toAbsolute(pages_dir), {
      recursive: true,
      encoding: "utf8",
    })
    .filter((dir_path) => {
      if (fs.statSync(path.join(pages_dir, dir_path)).isDirectory()) {
        return dir_path;
      }
    });

  // Filter out all direcories that don't contain an index.tsx file
  const page_dirs = dirs.filter((dir_path) => {
    return fs.existsSync(path.join(pages_dir, dir_path, "index.tsx"));
  });

  // Seperate static pages and dynamic pages
  let static_pages = [];
  let dynamic_pages = [];

  page_dirs.forEach((dir_path) => {
    const params = get_params_from_path(dir_path);
    if (params.length <= 0) static_pages.push(dir_path);
    else dynamic_pages.push({ path: dir_path, params: params });
  });

  // Format static page paths
  static_pages = static_pages.map((dir_path) => {
    const name = dir_path.replace(/\.tsx$/, "").toLowerCase();
    return name === "home" ? `/` : `/${name}`;
  });

  console.log(
    `Found ${static_pages.length} static ${static_pages.length === 1 ? "page" : "pages"}`,
  );

  console.log(
    `Found ${dynamic_pages.length} dynamic ${dynamic_pages.length === 1 ? "page" : "pages"}`,
  );

  return { static_pages, dynamic_pages };
};

/**
 * Renders static pages from given array of paths
 * @param paths - Array of paths to static pages to render
 */
const render_static_pages = async (paths) => {
  console.log("Rendering static pages: \n");

  await paths.forEach(async (path) => {
    console.log(`Rendering ${path}...`);

    // Render app html
    const appHtml = await render("http://localhost" + path);

    // Inject app html into template html
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);

    // Write html to file
    const filePath = `dist/static${path === "/" ? "/index" : path}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
  });
};

const { static_pages, dynamic_pages } = get_page_paths(pages_dir);
render_static_pages(static_pages);
