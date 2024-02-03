[![Netlify Status](https://api.netlify.com/api/v1/badges/49f2ed15-a9df-4ec3-8085-6131915c8a86/deploy-status)](https://app.netlify.com/sites/maxcaplan/deploys)

    ==================================================================
         __    __  ______  __  __
        /\ "-./  \/\  __ \/\_\_\_\
        \ \ \-./\ \ \  __ \/_/\_\/_
         \ \_\ \ \_\ \_\ \_\/\_\/\_\
          \/_/  \/_/\/_/\/_/\/_/\/_/__  __      ______  __   __
               /\  ___\/\  __ \/\  == \/\ \    /\  __ \/\ "-.\ \
               \ \ \___\ \  __ \ \  _-/\ \ \___\ \  __ \ \ \-.  \
                \ \_____\ \_\ \_\ \_\   \ \_____\ \_\ \_\ \_\\"\_\
                 \/_____/\/_/\/_/\/_/    \/_____/\/_/\/_/\/_/ \/_/

    ======================= Developer/Designer =======================

## >\_ Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                        |
| :--------------------- | :------------------------------------------------------------ |
| `npm run dev`          | Starts local dev server at `localhost:5173`                   |
| `npm run build`        | Builds the client and server as an SSR application to `dist/` |
| `npm run build:client` | Builds the client side files for SSR to `dist/client/`        |
| `npm run build:server` | Builds the server side files for SSR to `dist/server`         |
| `npm run generate`     | Generates a static version of the site to `dist/static`       |
| `npm run serve`        | Serves the production built SSR application                   |
| `npm run serve-static` | Serves the production built static site                       |
| `npm run preview`      | Preview your build locally, before deploying                  |

## Setup

To setup the site for local development, clone the repo and install the dependencies with the following commands:

```
git clone https://github.com/maxcaplan/portfolio.git
cd portfolio
npm install
```

Start the local development server with the following command:

```
npm run dev
```

You can then view the local site at `localhost:5173`
Optionally, you can run the following command instead to have the site available to any device on your network:

```
npm run dev -- --host
```

The local site will now be available at `<your-local-ip>:5173`

## File Structure

The file structure of the project is as follows:

```
.
├── public <-- Static files
│   └── assets
│       ├── favicons
│       ├── fonts
│       └── images
└── src
    ├── assets <-- Asset files
    ├── components <-- React components
    │   ├── common <-- Generic components
    ├── content <-- Content to be displayed
    │   └── work
    ├── css
    ├── pages <-- Site pages
    └── utils <-- Utility functions
```

## Deploying

To deploy a static version of the site first create a `.env` file at the root of the repository. Make sure the following fields are defined with the appropriate information in this file:

```
# .env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Next run the following command:

```
npm run generate
```

This will generate a static version of the production site to `dist/static/`
Upload the contents of this directory to the static site host of your choosing.

## Project Details

This site is proudly open source and made using `Typescript` with the following technologies:

- [Vite](https://vitejs.dev/) for SSR and SSG
- [Express](https://expressjs.com/) for HTTP server
- [sirv](https://github.com/lukeed/sirv) for static file serving
- [React](https://react.dev/) for UI
- [TailwindCSS](https://tailwindcss.com/) for styling
- And several other libraries
