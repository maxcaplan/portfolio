import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import express from "express";

import routes from "./router";

import createFetchRequest from "./utils/createFetchRequest";

export const render = async (req: express.Request) => {
  const handler = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);

  const context = await handler.query(fetchRequest);

  if (context instanceof Response) throw new Error();

  const router = createStaticRouter(handler.dataRoutes, context);

  return ReactDOMServer.renderToString(
    <StaticRouterProvider router={router} context={context} />,
  );
};
