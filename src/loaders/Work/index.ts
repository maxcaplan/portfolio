import { LoaderFunctionArgs } from "react-router-dom";
import { Work } from "../../types";

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
		return work.title.toLowerCase() === params.title;
	});

	return work;
};

export default loadWork;
