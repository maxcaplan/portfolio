import { LoaderFunctionArgs } from "react-router-dom";
import { Project } from "../../types";

/**
 * Loads a project from and array of projeccts 
 * @param args.params - The route params
 * @param projects - The array of projects to load from
 */
const loadProject = (
	{ params }: LoaderFunctionArgs<{ params: { id: string } }>,
	projects: Project[],
) => {
	let project = projects.find((project) => {
		return project.id.toLowerCase() === params.id;
	});

	return project;
};

export default loadProject;
