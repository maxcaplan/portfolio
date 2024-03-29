import { LoaderFunctionArgs } from "react-router-dom";
import { Work } from "../../types";

/**
 * Loads a work from and array of works
 * @param args.params - The route params
 * @param works - The array of works to load from
 */
const loadWork = (
	{ params }: LoaderFunctionArgs<{ params: { id: string } }>,
	works: Work[],
) => {
	let work = works.find((work) => {
		return work.id.toLowerCase() === params.id;
	});

	return work;
};

export default loadWork;
