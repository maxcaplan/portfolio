import { Project, Skill } from "../../../types";

import body from "./body.md?raw";

const project: Project = {
	id: 'toado',
	title: 'Toado',
	date: { month: 5, year: 2024 },
	description: "A simple interactive task and project manager for the command line built in rust.",
	body: body,
	coverImage: `/assets/images/projects/toado/cover/`,
	images: [],
	skills: [Skill.rust]
}

export default project;
