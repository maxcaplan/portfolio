import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import Router from "./router";

interface RenderProps {
  path: string;
}

export const render = (props: RenderProps) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={props.path}>
      <Router />
    </StaticRouter>,
  );
};
