import { LoaderFunctionArgs, RouteObject } from "react-router-dom";

import { Work } from "./types";

import Works from "./content/work";

import HomePage from "./pages/Home";
import NotFoundPage from "./pages/404";
import WorkPage from "./pages/Work/[title]";

const routes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },

  {
    path: "/work/:title",
    element: <WorkPage />,
    errorElement: <NotFoundPage />,
    loader: (args) => {
      const work = loadWork(args, Works);
      if (work === undefined) throw new Response("Not Found", { status: 404 });
      return work;
    },
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

/**
 * Loads a work from and array of works
 * @param args.params - The route params
 * @param works - The array of works to load from
 */
const loadWork = (
  { params }: LoaderFunctionArgs<{ params: { title: string } }>,
  works: Work[],
) => {
  let work = works.find((work) => {
    return work.title === params.title;
  });
  console.log("Work");

  return work;
};

export default routes;
