import { RouteObject } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/404";
import WorkPage from "./pages/Work/[id]";
import ResumePage from "./pages/Resume";

// Loaders
import loadWork from "./loaders/Work";

// Content
import Works from "./content/Work";

const routes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },

  {
    path: "/work/:id",
    element: <WorkPage />,
    errorElement: <NotFoundPage />,
    loader: (args) => {
      const work = loadWork(args, Works);
      if (work === undefined) throw new Response("Not Found", { status: 404 });
      return work;
    },
  },

  {
    path: "/resume",
    element: <ResumePage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
