import { Skill, Work } from "../../../types";
// import loadMarkdown from "../../../utils/loadMarkdown";
import body from "./body.md?raw";

const description = "Full Site redesign and implementation of connorbell.ca.";

const ConnorBell: Work = {
  id: "connorbell.ca",
  title: "connorbell.ca",
  date: {
    month: 9,
    year: 2022,
  },
  description: description,
  // body: loadMarkdown("src/content/Work/connorbell.ca/body.md", "./body.md"),
  body: body,
  skills: [Skill.ruby, Skill.javascript, Skill.tailwind],
  coverImage: `/assets/images/works/connor_bell/cover/`,
  images: [],
};

export default ConnorBell;
