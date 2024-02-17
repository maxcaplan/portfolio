import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import { Config as ConfigObject } from "./prerender.config.js";

import { Content } from "./src/types.ts";

const config = ConfigObject as Config;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);
const pages_dir = "src/pages";

const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const render = (await import("./dist/server/entry-server.js")).render;

interface Config {
  /** Website domain */
  domain?: string;
  /** Website protocol (http://, https://) */
  protocol?: string;
  /** Base page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Whether to render dynamic pages with a custom title from content */
  dynamic_titles?: boolean;
  /** Title prefix for dynamic page title */
  title_prefix?: string;
  /** Title suffix for dynamic page title */
  title_suffix?: string;
  /** Predefined titles for pages */
  page_titles?: {
    [key: string]: string;
  };
  /** Predefined descriptions for pages */
  page_descriptions?: {
    [key: string]: string;
  };
}

interface DynamicPage {
  path: string;
  params: string[];
}

const get_page_paths = (pages_dir: string) => {
  /**
   * Returns true if directory name is the following format: [name]
   * @param dir - The directory to check
   */
  const is_param_dir = (dir: string) => {
    if (dir.length === 0) return false;
    return dir.charAt(0) === "[" && dir.charAt(dir.length - 1) === "]";
  };

  /**
   * Returns an array of all the parameters in a path
   * @param path - The path to infer the parameters from
   */
  const get_params_from_path = (dir_path: string) => {
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

  let static_pages: string[] = [];
  let dynamic_pages: DynamicPage[] = [];

  // Seperate static pages and dynamic pages
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
 * Injects meta data into an html template string
 * @param template - The html template string
 * @param config - The prerenderer config object
 * @param path - The path for the path using this template
 * @param content - A content object for dynamic rendering
 */
const inject_meta = (
  template: string,
  config: Config,
  path: string,
  content?: Content,
): string => {
  let page_title = config.title || "My Website";

  // Create dynamic title if enabled and content suplied
  if (config.dynamic_titles && content) {
    page_title = `${config.title_prefix || ""}${content.title || "My Website"}${config.title_suffix || ""}`;
  }

  // Use predetermined title from config if present for path
  if (config.page_titles && config.page_titles[path]) {
    page_title = config.page_titles[path];
  }

  // Inject meta data into template
  return template
    .replace(new RegExp("<!--title-outlet-->", "g"), page_title)
    .replace(
      new RegExp("<!--description-outlet-->", "g"),
      config.description || "",
    );
};

/**
 * Renders static pages from given array of paths
 * @param paths - Array of paths to static pages to render
 * @param config - Prerenderer config object
 */
const render_static_pages = async (paths: string[], config: Config) => {
  console.log("\nRendering static pages: \n");

  await Promise.all(
    paths.map(async (page_path) => {
      console.log(`Rendering ${page_path} ...`);

      // Render app html
      const appHtml = await render("http://localhost" + page_path);

      // Inject meta data into template html
      let html = inject_meta(template, config, page_path);

      // Inject app html into template html
      html = html.replace(`<!--ssr-outlet-->`, appHtml);

      // Write html to file
      const filePath = `dist/static${page_path === "/" ? "/index" : page_path}.html`;
      fs.writeFileSync(toAbsolute(filePath), html);

      return;
    }),
  );
};

/**
 * Renders dynamic pages from given array of paths
 * @param paths - Array of paths to dynamic pages to render
 * @param config - Prerenderer config object
 */
const render_dynamic_pages = async (paths: DynamicPage[], config: Config) => {
  console.log("\nRendering dynamic pages: \n");

  // Open vite server
  const vite = await createViteServer();

  await Promise.all(
    paths.map(async (dynamic_path) => {
      const root = dynamic_path.path.split("/")[0];
      const root_path = "/" + root.replace(/\.tsx$/, "").toLowerCase();

      // Load array of all content for path
      const content_arr = (
        await vite.ssrLoadModule(`./src/content/${root}/index.ts`)
      ).default as Content[];

      // Create directory for rendered pages
      fs.mkdirSync(toAbsolute("dist/static" + root_path), { recursive: true });

      content_arr.forEach(async (content) => {
        const page_path = `${root_path}/${content.id}`;

        console.log(`Rendering ${page_path} ...`);

        // Render app html
        const appHtml = await render("http://localhost" + page_path);

        // Inject meta data into template html
        let html = inject_meta(template, config, page_path, content);

        // Inject app html into template html
        html = html.replace(`<!--ssr-outlet-->`, appHtml);

        // Write html to file
        const filePath = `dist/static${page_path === "/" ? "/index" : page_path}.html`;
        fs.writeFileSync(toAbsolute(filePath), html);
      });
    }),
  );

  // Close vite server
  vite.close();
};

/**
 * Generates a sitemap for static and dynamic paths
 * @param static_paths - Static site paths
 * @param dynamic_paths - Dynamic site paths
 * @param config - Prerenderer config object
 */
const generate_sitemap = async (
  static_paths: string[],
  dynamic_paths: DynamicPage[],
  config: Config,
) => {
  console.log("\nGenerating sitemap...\n");

  /** Wrapper for xml sitemap */
  const sitemap_wrapper = (body?: string): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body || ""}
</urlset>`;
  };

  /** Wrapper for xml sitemap url */
  const url_wrapper = (location: string): string => {
    return `	<url>
		<loc>${location}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
	</url>`;
  };

  // Create location root from config
  let location_root = `${config.protocol || "http://"}${config.domain || "localhost"}`;
  // Ensure root dosn't end with '/'
  if (location_root.charAt(location_root.length - 1) == "/")
    location_root = location_root.substring(0, location_root.length - 1);

  // Create xml sitemap url tags for static pages
  const static_urls = static_paths.map((page_path) => {
    return url_wrapper(location_root + page_path);
  });

  // Open vite server
  const vite = await createViteServer();

  // Create xml sitemap url tags for dynamic pages
  const dynamic_urls = (
    await Promise.all(
      dynamic_paths.map(async (dynamic_path) => {
        const root = dynamic_path.path.split("/")[0];
        const root_path = "/" + root.replace(/\.tsx$/, "").toLowerCase();

        // Load array of all content for path
        const content_arr = (
          await vite.ssrLoadModule(`./src/content/${root}/index.ts`)
        ).default as Content[];

        return content_arr.map((content) => {
          const page_path = `${root_path}/${content.id}`;
          return url_wrapper(location_root + page_path);
        });
      }),
    )
  ).flat();

  // Create sitemap
  const urls: string[] = [...static_urls, ...dynamic_urls];
  const sitemap = sitemap_wrapper(urls.join("\n"));

  // Create directory for sitemap
  fs.mkdirSync(toAbsolute("dist/static/"), { recursive: true });
  // Write sitemap to file
  fs.writeFileSync(toAbsolute("dist/static/sitemap.xml"), sitemap);

  vite.close();

  return;
};

(async () => {
  const start_time = Date.now();

  const { static_pages, dynamic_pages } = get_page_paths(pages_dir);
  await render_static_pages(static_pages, config);
  await render_dynamic_pages(dynamic_pages, config);
  await generate_sitemap(static_pages, dynamic_pages, config);

  const end_time = Date.now();
  console.log(
    `Prerender finished in ${Math.ceil((end_time - start_time) / 1000)}s`,
  );
})();
