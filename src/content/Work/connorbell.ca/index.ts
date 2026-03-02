import { Skill, Work } from "../../../types";
import body from "./body.md?raw";

const ConnorBell: Work = {
  id: "connorbell.ca",
  title: "connorbell.ca",
  date: {
    month: 9,
    year: 2022,
  },
  description:
    "A full site redesign of connorbell.ca improving responsiveness and presentation",
  body: body,
  skills: [Skill.ruby, Skill.javascript, Skill.tailwind],
  coverImage: `/assets/images/works/connor_bell/cover/`,
  images: [],
  source: "https://github.com/maxcaplan/connor-bell",
  demo: "http://connorbell.ca/",
};

export default ConnorBell;
