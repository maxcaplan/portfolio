import { RouteObject } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/404";
import WorkPage from "./pages/Work/[title]";

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

export default routes;
