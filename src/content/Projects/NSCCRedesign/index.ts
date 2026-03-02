import { Project, Skill } from "../../../types";

import body from "./body.md?raw";

const project: Project = {
  id: "nscc-redesign",
  title: "NSCC Redesign",
  date: { month: 12, year: 2025 },
  description:
    "An exercise in accessibility driven design with a comprehensive redesign of the nscc.ca homepage.",
  body: body,
  coverImage: `/assets/images/projects/nscc_redesign/cover/`,
  images: [],
  skills: [Skill.javascript, Skill.react, Skill.sass],
  source: "https://github.com/maxcaplan/NSCC-Homepage-Redesign-Demo",
  demo: "https://maxcaplan.github.io/NSCC-Homepage-Redesign-Demo/",
};

export default project;
