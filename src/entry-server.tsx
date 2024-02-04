import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import express from "express";

import routes from "./router";

import createFetchRequest from "./utils/createFetchRequest";

/**
 * Staticly renders a route given a request
 * @param req - The request object for the route to be rendered
 */
export const render = async (
  req: string | express.Request,
): Promise<string> => {
  const fetchRequest =
    typeof req === "string"
      ? new Request(new URL(req))
      : createFetchRequest(req);

  const handler = createStaticHandler(routes);
  const context = await handler.query(fetchRequest);

  if (context instanceof Response) throw new Error();

  const router = createStaticRouter(handler.dataRoutes, context);

  return ReactDOMServer.renderToString(
    <StaticRouterProvider router={router} context={context} />,
  );
};
