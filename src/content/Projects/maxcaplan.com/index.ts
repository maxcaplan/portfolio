import { Project, Skill } from "../../../types";

import body from "./body.md?raw";

const project: Project = {
	id: 'maxcaplan.com',
	title: 'maxcaplan.com',
	date: { month: 5, year: 2023 },
	description: "A personal portfolio website for my design development work and projects.",
	body: body,
	coverImage: `/assets/images/projects/max_caplan/cover/`,
	images: [],
	skills: [Skill.javascript, Skill.react, Skill.tailwind, Skill.node],
	source: "https://github.com/maxcaplan/portfolio",
	demo: "https://maxcaplan.com"
}

export default project;
