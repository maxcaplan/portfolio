import { Skill, Work } from "../../../types";
import body from "./body.md?raw";

const description = "Full Site redesign and implementation of connorbell.ca.";

const ConnorBell: Work = {
	title: "connorbell.ca",
	date: {
		month: 9,
		year: 2022,
	},
	description: description,
	body: body,
	skills: [Skill.ruby, Skill.javascript, Skill.tailwind],
	coverImage: `/assets/images/works/connor_bell/connor_bell_cover.webp`,
	images: [],
};

export default ConnorBell;
